
import { supabase } from '@/integrations/supabase/client';
import { MoodEntry, NewMoodEntry } from '@/types/database';

// Mood entry functions
export async function saveMoodEntry(entry: NewMoodEntry) {
  return supabase.from('mood_entries').insert(entry);
}

export async function getUserMoodEntries(userId: string): Promise<MoodEntry[]> {
  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Error fetching mood entries:', error);
    return [];
  }
  
  return data || [];
}
