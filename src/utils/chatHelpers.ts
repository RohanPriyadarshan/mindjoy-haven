
import { Message } from '@/types/chat';
import { ChatMessage as ChatMessageType } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

// Convert database chat messages to the Message format used by the UI
export function formatChatMessages(chatHistory: ChatMessageType[]): Message[] {
  if (!chatHistory || chatHistory.length === 0) return [];
  
  return chatHistory.map((msg: ChatMessageType) => ({
    id: msg.id,
    text: msg.text,
    sender: msg.sender as 'user' | 'bot',
    timestamp: new Date(msg.timestamp),
  }));
}

// Create a welcome message for new users
export function createWelcomeMessage(): Message {
  return {
    id: '1',
    text: "Hello! I'm your supportive AI companion. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  };
}

// Set up realtime updates for chat messages
export function setupChatRealtimeUpdates(
  userId: string | null, 
  messages: Message[], 
  onNewMessage: (message: Message) => void
) {
  // Only set up real-time updates for logged-in users
  if (!userId) return null;
  
  try {
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
            const formattedMessage: Message = {
              id: newMsg.id,
              text: newMsg.text,
              sender: newMsg.sender as 'user' | 'bot',
              timestamp: new Date(newMsg.timestamp),
            };
            onNewMessage(formattedMessage);
          }
        }
      )
      .subscribe();
      
    return channel;
  } catch (error) {
    console.error("Error setting up realtime updates:", error);
    return null;
  }
}

// Get AI response for a message
export async function getAIResponse(input: string, contextMessages: Message[]) {
  // Get the last 5 messages for context
  const recentMessages = contextMessages.slice(-5);
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
  
  return {
    id: (Date.now() + 1).toString(),
    text: response.data.response || "I'm sorry, I couldn't process that right now.",
    sender: 'bot' as const,
    timestamp: new Date(),
  };
}

// Handle errors in chat processing
export function handleChatError(error: any): Message {
  console.error("Error getting AI response:", error);
  toast.error("Failed to get response. Please try again.");
  
  return {
    id: (Date.now() + 2).toString(),
    text: "I'm sorry, I couldn't process your message. Please try again later.",
    sender: 'bot',
    timestamp: new Date(),
  };
}
