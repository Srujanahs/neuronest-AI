import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
  );
}

/**
 * Reusable Supabase client for the application.
 * 
 * This client provides access to:
 * - Authentication (supabase.auth)
 * - Database operations (supabase.from('table').select(), .insert(), etc.)
 * - Real-time subscriptions
 * - Storage
 */
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Helper types for common database operations
export type SupabaseResponse<T> = {
  data: T | null;
  error: any;
};

/**
 * Example usage for fetching data:
 * const { data, error } = await supabase.from('profiles').select('*');
 * 
 * Example usage for inserting data:
 * const { data, error } = await supabase.from('activity_logs').insert([{ user_id: '...', action: '...' }]);
 * 
 * Example usage for auth:
 * const { user, error } = await supabase.auth.signInWithPassword({ email, password });
 */
