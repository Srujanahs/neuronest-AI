import { supabase } from '../lib/supabase';

export interface UserProgress {
  coding_score: number;
  aptitude_score: number;
  communication_score: number;
  weekly_goal_percentage: number;
  last_updated: string;
}

class UserService {
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    return data;
  }

  async updateUserProgress(userId: string, progress: Partial<UserProgress>) {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        ...progress,
        last_updated: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  async logActivity(userId: string, activityType: string, details: any) {
    const { error } = await supabase
      .from('activity_logs')
      .insert([
        {
          user_id: userId,
          activity_type: activityType,
          details,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error logging activity:', error);
    }
  }
}

export const userService = new UserService();
