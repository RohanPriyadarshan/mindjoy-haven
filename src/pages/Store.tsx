
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import StoreItemsList from '@/components/store/StoreItemsList';
import UserPurchases from '@/components/store/UserPurchases';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser, getUserStats } from '@/lib/supabase';
import { UserStats } from '@/types/database';
import { toast } from 'sonner';

const Store = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user?.id || null);
        
        if (user?.id) {
          const stats = await getUserStats(user.id);
          setUserStats(stats);
        } else {
          // Redirect to login if not authenticated
          toast.error("Please login to access the store");
          navigate('/login');
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        toast.error("Error loading user data");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout className="py-6">
        <div className="animate-pulse h-[calc(100vh-12rem)] rounded-xl glass dark:glass-dark flex justify-center items-center">
          <p>Loading store...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="py-6">
      <div className="flex flex-col gap-6">
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-2">Rewards Store</h1>
          <p className="text-muted-foreground">
            Use your points to unlock special features and items
          </p>
          
          <div className="mt-4 p-4 bg-secondary/30 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-xl font-bold">{userStats?.points || 0} points</p>
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-xl font-bold">{userStats?.streak || 0} days</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="glass dark:glass-dark w-full mb-4">
            <TabsTrigger value="items" className="flex-1">Store Items</TabsTrigger>
            <TabsTrigger value="purchases" className="flex-1">My Purchases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items">
            <StoreItemsList 
              userId={userId} 
              userPoints={userStats?.points || 0} 
              onPurchase={() => {
                // Refresh stats after purchase
                if (userId) {
                  getUserStats(userId).then(stats => setUserStats(stats));
                }
              }} 
            />
          </TabsContent>
          
          <TabsContent value="purchases">
            <UserPurchases userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Store;
