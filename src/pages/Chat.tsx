
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ChatBot from '@/components/chat/ChatBot';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { getCurrentUser } from '@/lib/supabase';

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
  }, []);

  // Render loading state
  if (isAuthenticated === null) {
    return (
      <Layout className="p-0 md:py-6">
        <div className="animate-pulse h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  // Render login prompt if not authenticated
  if (isAuthenticated === false) {
    return (
      <Layout className="p-0 md:py-6">
        <div className="h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark flex flex-col justify-center items-center p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6">You need to log in to access the chat feature.</p>
          <Button onClick={() => navigate('/login')} className="flex items-center gap-2">
            <LogIn size={16} />
            Log In
          </Button>
        </div>
      </Layout>
    );
  }

  // Render chat if authenticated
  return (
    <Layout className="p-0 md:py-6">
      <ChatBot />
    </Layout>
  );
};

export default Chat;
