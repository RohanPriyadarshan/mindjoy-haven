
import React from 'react';
import { Bot, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  isLoggedIn: boolean;
}

const ChatHeader = ({ isLoggedIn }: ChatHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 border-b border-border/20 backdrop-blur flex justify-between items-center">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Bot size={20} className="text-primary" />
        Mental Health Assistant
      </h2>
      
      {!isLoggedIn && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/login')}
          className="flex items-center gap-1"
        >
          <LogIn size={16} />
          <span>Login to save chats</span>
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
