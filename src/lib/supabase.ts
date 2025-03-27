
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, MoodEntry, NewMoodEntry, StoreItem, UserPurchase, UserStats } from '@/types/database';

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

// Store functions
export async function getStoreItems(): Promise<StoreItem[]> {
  const response = await fetch(`${supabase.supabaseUrl}/rest/v1/store_items?order=price.asc`, {
    headers: {
      'apikey': supabase.supabaseKey,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    console.error('Error fetching store items:', response.statusText);
    return [];
  }
  
  return response.json();
}

export async function getUserPurchases(userId: string): Promise<UserPurchase[]> {
  const response = await fetch(
    `${supabase.supabaseUrl}/rest/v1/user_purchases?user_id=eq.${userId}&order=purchased_at.desc`, 
    {
      headers: {
        'apikey': supabase.supabaseKey,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    console.error('Error fetching user purchases:', response.statusText);
    return [];
  }
  
  const purchases = await response.json();
  
  // Fetch store items for each purchase
  const itemsPromises = purchases.map(async (purchase: UserPurchase) => {
    const itemResponse = await fetch(
      `${supabase.supabaseUrl}/rest/v1/store_items?id=eq.${purchase.item_id}&limit=1`,
      {
        headers: {
          'apikey': supabase.supabaseKey,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!itemResponse.ok) return purchase;
    
    const items = await itemResponse.json();
    return {
      ...purchase,
      item: items[0]
    };
  });
  
  return Promise.all(itemsPromises);
}

export async function purchaseItem(userId: string, itemId: string, currentPoints: number, itemPrice: number) {
  // Insert purchase record
  const purchaseResponse = await fetch(`${supabase.supabaseUrl}/rest/v1/user_purchases`, {
    method: 'POST',
    headers: {
      'apikey': supabase.supabaseKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      user_id: userId,
      item_id: itemId
    })
  });
  
  if (!purchaseResponse.ok) {
    console.error('Error creating purchase:', purchaseResponse.statusText);
    throw new Error('Failed to create purchase');
  }
  
  // Update user points
  const statsResponse = await fetch(
    `${supabase.supabaseUrl}/rest/v1/user_stats?user_id=eq.${userId}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': supabase.supabaseKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        points: currentPoints - itemPrice
      })
    }
  );
  
  if (!statsResponse.ok) {
    console.error('Error updating points:', statsResponse.statusText);
    throw new Error('Failed to update points');
  }
  
  return true;
}
