
import { supabase } from '@/integrations/supabase/client';

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
