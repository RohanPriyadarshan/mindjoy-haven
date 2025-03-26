
import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import FeedbackForm from './FeedbackForm';
import ChatInput from './ChatInput';
import { getAdvancedResponse } from '@/utils/chatUtils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your supportive AI companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (input: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Generate response based on input
    setTimeout(() => {
      const responseText = getAdvancedResponse(userMessage.text);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // After every 3 bot messages, request feedback
      if (messages.filter(m => m.sender === 'bot').length % 3 === 0) {
        setShowFeedback(true);
      }
    }, 1500);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-xl glass dark:glass-dark">
      <div className="p-4 border-b border-border/20 backdrop-blur">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot size={20} className="text-primary" />
          Mental Health Assistant
        </h2>
      </div>
      
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
          <FeedbackForm onClose={handleCloseFeedback} />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isTyping={isTyping} 
      />
    </div>
  );
};

export default ChatBot;
