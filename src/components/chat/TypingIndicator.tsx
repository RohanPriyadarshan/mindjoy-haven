
import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot size={16} className="text-primary" />
      </div>
      <div className="bg-secondary text-secondary-foreground py-2 px-4 rounded-2xl">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
