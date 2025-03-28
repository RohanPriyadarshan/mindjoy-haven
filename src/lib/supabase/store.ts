
import { StoreItem, UserPurchase } from '@/types/database';

// Supabase URL and anon key for fetching data directly
const SUPABASE_URL = "https://xesnchbfalqiqfgedhgn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlc25jaGJmYWxxaXFmZ2VkaGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTA2MjIsImV4cCI6MjA1ODU4NjYyMn0.OxxNwak2MB4UN7zHDVMhf4yIV-zSh86Hde7ThLqPfEY";

// Store functions
export async function getStoreItems(): Promise<StoreItem[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/store_items?order=price.asc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('Error fetching store items:', response.statusText);
      return getMockStoreItems(); // Fallback to mock data
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return getMockStoreItems(); // Fallback to mock data if empty
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching store items:', error);
    return getMockStoreItems(); // Fallback to mock data
  }
}

// Mock data for store items if database is empty
function getMockStoreItems(): StoreItem[] {
  return [
    {
      id: '1',
      name: 'Premium Chat Access',
      description: 'Unlock unlimited AI chat sessions with advanced features',
      price: 50,
      category: 'feature',
      image_url: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '2',
      name: 'Dark Theme',
      description: 'Unlock a beautiful dark theme for the entire application',
      price: 25,
      category: 'theme',
      image_url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '3',
      name: 'Mood Insights Pro',
      description: 'Get detailed analytics and insights about your mood patterns',
      price: 75,
      category: 'feature',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '4',
      name: 'Achievement Badge: Early Adopter',
      description: 'A special badge to show you were among the first users',
      price: 10,
      category: 'badge',
      image_url: 'https://images.unsplash.com/photo-1591196128302-3f0c4e915daa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '5',
      name: 'Custom App Icon',
      description: 'Choose from a selection of custom icons for the app',
      price: 30,
      category: 'customization',
      image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '6',
      name: 'Meditation Sessions Pack',
      description: 'Unlock a pack of 10 guided meditation sessions',
      price: 100,
      category: 'content',
      image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];
}

export async function getUserPurchases(userId: string): Promise<UserPurchase[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/user_purchases?user_id=eq.${userId}&order=purchased_at.desc`, 
    {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
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
      `${SUPABASE_URL}/rest/v1/store_items?id=eq.${purchase.item_id}&limit=1`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
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
  const purchaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/user_purchases`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
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
    `${SUPABASE_URL}/rest/v1/user_stats?user_id=eq.${userId}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
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
