
import { Database } from '@/integrations/supabase/types';

// Type definitions for our database tables
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type MoodEntry = Database['public']['Tables']['mood_entries']['Row'];
export type UserStats = Database['public']['Tables']['user_stats']['Row']; 
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];

// Type for inserting new mood entries
export type NewMoodEntry = {
  user_id: string;
  mood: 'happy' | 'neutral' | 'sad';
  note?: string | null;
  date?: string;
  time?: string;
};

// Type for mood with additional information
export interface MoodWithMetadata extends MoodEntry {
  points?: number;
  streakIncreased?: boolean;
}

// Store related types
export type StoreItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at?: string;
};

export type UserPurchase = {
  id: string;
  user_id: string;
  item_id: string;
  purchased_at: string;
  item?: StoreItem;
};

// Custom types for the frontend
export type AuthUser = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
};
