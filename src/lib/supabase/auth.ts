
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/database';

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
