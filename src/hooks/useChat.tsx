
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { saveChatMessage, getUserChatHistory } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage as ChatMessageType } from '@/types/database';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  showFeedback: boolean;
  isLoading: boolean;
  handleSendMessage: (input: string) => Promise<void>;
  handleCloseFeedback: () => void;
}

export function useChat(userId: string | null = null): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize chat and load history if user is logged in
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      
      try {
        if (userId) {
          // If logged in, load chat history
          const chatHistory = await getUserChatHistory(userId);
          
          if (chatHistory.length > 0) {
            // Convert to the expected format
            const formattedMessages = chatHistory.map((msg: ChatMessageType) => ({
              id: msg.id,
              text: msg.text,
              sender: msg.sender as 'user' | 'bot',
              timestamp: new Date(msg.timestamp),
            }));
            
            setMessages(formattedMessages);
          } else {
            addWelcomeMessage();
            
            // Save welcome message to database for logged in users
            if (userId) {
              await saveChatMessage(userId, messages[0].text, 'bot');
            }
          }
          
          // Set up real-time updates for logged in users
          setupRealtimeUpdates();
        } else {
          // For non-logged in users, just show welcome message
          addWelcomeMessage();
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Failed to load chat");
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeChat();
    
    return () => {
      // Cleanup real-time subscription if it exists
      if (userId) {
        const channel = supabase.channel('schema-db-changes');
        supabase.removeChannel(channel);
      }
    };
  }, [userId, navigate]);

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm your supportive AI companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const setupRealtimeUpdates = () => {
    // Only set up real-time updates for logged-in users
    if (!userId) return;
    
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          // Only add messages that aren't from this session
          const newMsg = payload.new as ChatMessageType;
          if (!messages.some(msg => msg.id === newMsg.id)) {
            setMessages(prev => [...prev, {
              id: newMsg.id,
              text: newMsg.text,
              sender: newMsg.sender as 'user' | 'bot',
              timestamp: new Date(newMsg.timestamp),
            }]);
          }
        }
      )
      .subscribe();
  };

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
    
    // Save user message to database if logged in
    if (userId) {
      await saveChatMessage(userId, userMessage.text, 'user');
    }
    
    try {
      // Get the last 5 messages for context (excluding the one just added)
      const recentMessages = messages.slice(-5);
      const contextString = recentMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
      
      // Call the AI function to get response
      const response = await supabase.functions.invoke('chat-ai', {
        body: { 
          message: input,
          context: contextString
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to get AI response');
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message to database if logged in
      if (userId) {
        await saveChatMessage(userId, botMessage.text, 'bot');
        
        // After every 3 bot messages, request feedback from logged-in users
        if (messages.filter(m => m.sender === 'bot').length % 3 === 0) {
          setShowFeedback(true);
        }
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get response. Please try again.");
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "I'm sorry, I couldn't process your message. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Save error message to database if logged in
      if (userId) {
        await saveChatMessage(userId, errorMessage.text, 'bot');
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return {
    messages,
    isTyping,
    showFeedback,
    isLoading,
    handleSendMessage,
    handleCloseFeedback
  };
}
