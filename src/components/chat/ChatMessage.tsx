
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatMessage = ({ id, text, sender, timestamp }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      key={id}
      className={cn(
        "flex gap-3 animate-fade-in",
        sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      {sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] py-2 px-4 rounded-2xl",
          sender === 'user'
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm break-words">{text}</p>
        <p className="text-xs opacity-70 mt-1 text-right">
          {formatTime(timestamp)}
        </p>
      </div>
      
      {sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
