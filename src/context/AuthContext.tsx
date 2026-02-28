import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || session.user.user_metadata?.full_name || 'User',
            avatar: profile?.avatar_url || `https://picsum.photos/seed/${session.user.id}/100/100`
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
          // Still set the user even if profile fails, using metadata as fallback
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || 'User',
            avatar: `https://picsum.photos/seed/${session.user.id}/100/100`
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) {
      // Fallback for demo if password not provided
      const newUser = { id: 'demo-1', name: 'Demo User', email, avatar: 'https://picsum.photos/seed/user/100/100' };
      setUser(newUser);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (name: string, email: string, password?: string) => {
    if (!password) {
      const newUser = { id: 'demo-1', name, email, avatar: 'https://picsum.photos/seed/user/100/100' };
      setUser(newUser);
      return;
    }

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: name }
      }
    });
    
    if (error) throw error;

    if (data.user) {
      // Create profile record
      await supabase.from('profiles').insert([
        { id: data.user.id, full_name: name, avatar_url: `https://picsum.photos/seed/${data.user.id}/100/100` }
      ]);
      
      // Initialize progress record
      await supabase.from('user_progress').insert([
        { user_id: data.user.id, coding_score: 0, aptitude_score: 0, communication_score: 0, weekly_goal_percentage: 0 }
      ]);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
