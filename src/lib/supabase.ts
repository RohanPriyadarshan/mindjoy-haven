
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, MoodEntry, NewMoodEntry, UserStats } from '@/types/database';

// User-related functions
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return {
    id: user.id,
    email: user.email,
    first_name: profile?.first_name,
    last_name: profile?.last_name
  };
}

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

// Chat functions
export async function saveChatMessage(userId: string, text: string, sender: 'user' | 'bot') {
  return supabase.from('chat_messages').insert({
    user_id: userId,
    text,
    sender
  });
}

export async function getUserChatHistory(userId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: true });
    
  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
  
  return data || [];
}
