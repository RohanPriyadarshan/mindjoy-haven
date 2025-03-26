
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { saveChatMessage, getUserChatHistory, getCurrentUser } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage as ChatMessageType } from '@/types/database';
import { getAdvancedResponse } from '@/utils/chatUtils';

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
  userId: string | null;
  handleSendMessage: (input: string) => Promise<void>;
  handleCloseFeedback: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check authentication and load chat history
  useEffect(() => {
    const loadUserAndHistory = async () => {
      setIsLoading(true);
      
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          // Redirect to login if not authenticated
          toast.error("Please log in to use the chat feature");
          navigate('/login');
          return;
        }
        
        setUserId(user.id);
        
        // Load chat history
        const chatHistory = await getUserChatHistory(user.id);
        
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
          // Add welcome message if no history
          const welcomeMessage: Message = {
            id: '1',
            text: "Hello! I'm your supportive AI companion. How are you feeling today?",
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
          
          // Save welcome message to database
          if (user.id) {
            await saveChatMessage(user.id, welcomeMessage.text, 'bot');
          }
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        toast.error("Failed to load chat history");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserAndHistory();
    
    // Listen for real-time updates to chat messages
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
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const handleSendMessage = async (input: string) => {
    if (!userId) {
      toast.error("You must be logged in to send messages");
      navigate('/login');
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Save user message to database
    await saveChatMessage(userId, userMessage.text, 'user');
    
    // Generate response based on input
    setTimeout(async () => {
      const responseText = getAdvancedResponse(userMessage.text);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Save bot message to database
      await saveChatMessage(userId, botMessage.text, 'bot');
      
      // After every 3 bot messages, request feedback
      if (messages.filter(m => m.sender === 'bot').length % 3 === 0) {
        setShowFeedback(true);
      }
    }, 1500);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return {
    messages,
    isTyping,
    showFeedback,
    isLoading,
    userId,
    handleSendMessage,
    handleCloseFeedback
  };
}
