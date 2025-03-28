
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import StoreItemsList from '@/components/store/StoreItemsList';
import UserPurchases from '@/components/store/UserPurchases';
import { getCurrentUser, getUserStats } from '@/lib/supabase';
import { UserStats } from '@/types/database';
import { Coins } from 'lucide-react';

const Store = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          setUserId(user.id);
          const stats = await getUserStats(user.id);
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Use mock data for demonstration - corrected to match UserStats type
        setUserStats({
          user_id: 'mock-user',
          streak: 5,
          points: 100,
          last_entry_date: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          id: 'mock-id'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePurchaseComplete = async () => {
    try {
      if (userId) {
        const stats = await getUserStats(userId);
        setUserStats(stats);
      }
    } catch (error) {
      console.error('Error refreshing user stats:', error);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Rewards Store</h1>
        <p className="text-muted-foreground mt-2">
          Earn points by logging your moods and completing activities, then redeem them for rewards!
        </p>
      </div>

      {!isLoading && (
        <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3 mb-6">
          <Coins className="text-primary h-6 w-6" />
          <div>
            <p className="text-sm font-medium">Available Points</p>
            <p className="text-2xl font-bold">{userStats?.points || 0}</p>
          </div>
        </div>
      )}

      <div className="space-y-10">
        <StoreItemsList 
          userId={userId} 
          userPoints={userStats?.points || 0} 
          onPurchase={handlePurchaseComplete} 
        />
        
        {userId && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Purchases</h2>
            <UserPurchases userId={userId} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Store;
