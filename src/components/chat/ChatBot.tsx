
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatLoading from './ChatLoading';
import { useChat } from '@/hooks/useChat';

interface ChatBotProps {
  userId: string | null;
}

const ChatBot = ({ userId }: ChatBotProps) => {
  const {
    messages,
    isTyping,
    showFeedback,
    isLoading,
    handleSendMessage,
    handleCloseFeedback
  } = useChat(userId);

  if (isLoading) {
    return <ChatLoading />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark">
      <ChatHeader isLoggedIn={!!userId} />
      
      <ChatMessages 
        messages={messages} 
        isTyping={isTyping} 
        showFeedback={showFeedback}
        onCloseFeedback={handleCloseFeedback}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isTyping={isTyping} 
      />
    </div>
  );
};

export default ChatBot;
