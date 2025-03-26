
import React from 'react';
import { Bot } from 'lucide-react';

const ChatLoading = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <Bot size={48} className="text-primary mb-4" />
        <p className="text-lg">Loading chat history...</p>
      </div>
    </div>
  );
};

export default ChatLoading;
