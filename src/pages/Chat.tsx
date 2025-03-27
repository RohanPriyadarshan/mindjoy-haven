
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ChatBot from '@/components/chat/ChatBot';
import { getCurrentUser } from '@/lib/supabase';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user?.id || null);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <Layout className="p-0 md:py-6">
        <div className="animate-pulse h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="p-0 md:py-6">
      <ChatBot userId={userId} />
    </Layout>
  );
};

export default Chat;
