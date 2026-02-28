import { supabase } from '../lib/supabase';
import { User } from '../types';

/**
 * SupabaseService provides high-level wrappers for common database and auth operations.
 * This is designed to be easily integrated into the existing NeuroNest AI app.
 */
export const supabaseService = {
  supabase,
  // --- Authentication ---
  
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // --- Database: Fetching ---

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async getCodingChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getCodingResults(userId: string) {
    const { data, error } = await supabase
      .from('coding_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true });
    return { data, error };
  },

  async getQuizResults(userId: string) {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true });
    return { data, error };
  },

  // --- Database: Inserting ---

  async logActivity(userId: string, activityType: string, details: any) {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert([
        { 
          user_id: userId, 
          activity_type: activityType, 
          details,
          created_at: new Date().toISOString()
        }
      ]);
    return { data, error };
  },

  async saveQuizResult(userId: string, score: number, total: number, category: string) {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id: userId,
          score,
          total_questions: total,
          category,
          completed_at: new Date().toISOString()
        }
      ]);
    return { data, error };
  }
};
