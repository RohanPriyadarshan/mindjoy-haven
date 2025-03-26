
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import FeedbackForm from './FeedbackForm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  showFeedback: boolean;
  onCloseFeedback: () => void;
}

const ChatMessages = ({ messages, isTyping, showFeedback, onCloseFeedback }: ChatMessagesProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showFeedback]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          text={message.text}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
      
      {isTyping && <TypingIndicator />}
      
      {showFeedback && !isTyping && (
        <FeedbackForm onClose={onCloseFeedback} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
