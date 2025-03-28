
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { saveChatMessage, getUserChatHistory } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import { Message, UseChatReturn } from '@/types/chat';
import { 
  formatChatMessages,
  createWelcomeMessage,
  setupChatRealtimeUpdates,
  getAIResponse,
  handleChatError
} from '@/utils/chatHelpers';

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
          
          if (chatHistory && chatHistory.length > 0) {
            // Convert to the expected format
            const formattedMessages = formatChatMessages(chatHistory);
            setMessages(formattedMessages);
          } else {
            setMessages([createWelcomeMessage()]);
          }
        } else {
          // For non-logged in users, just show welcome message
          setMessages([createWelcomeMessage()]);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        setMessages([createWelcomeMessage()]);
        toast.error("Failed to load chat history", {
          description: "Using default welcome message instead"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeChat();
  }, [userId, navigate]);

  // Set up real-time updates
  useEffect(() => {
    if (!userId) return;
    
    const channel = setupChatRealtimeUpdates(
      userId, 
      messages, 
      (newMessage) => setMessages(prev => [...prev, newMessage])
    );
    
    // Cleanup real-time subscription if it exists
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [userId, messages]);

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
      try {
        await saveChatMessage(userId, userMessage.text, 'user');
      } catch (error) {
        console.error("Error saving user message:", error);
      }
    }
    
    try {
      // Get AI response
      const botMessage = await getAIResponse(input, messages);
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
      // Handle error and add error message
      const errorMessage = handleChatError(error);
      setMessages(prev => [...prev, errorMessage]);
      
      // Save error message to database if logged in
      if (userId) {
        try {
          await saveChatMessage(userId, errorMessage.text, 'bot');
        } catch (err) {
          console.error("Error saving error message:", err);
        }
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
