
import React from 'react';
import { Bot } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="p-4 border-b border-border/20 backdrop-blur">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Bot size={20} className="text-primary" />
        Mental Health Assistant
      </h2>
    </div>
  );
};

export default ChatHeader;
