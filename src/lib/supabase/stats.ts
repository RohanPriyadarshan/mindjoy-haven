
import { supabase } from '@/integrations/supabase/client';
import { UserStats } from '@/types/database';

// User stats functions
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
  
  return data;
}
