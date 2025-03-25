
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FeedbackData {
  rating: 'positive' | 'negative' | null;
  comment: string;
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
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: null,
    comment: '',
  });
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAdvancedResponse = (userInput: string): string => {
    // Convert to lowercase for easier pattern matching
    const input = userInput.toLowerCase();
    
    // Check for emotional patterns
    if (input.includes('sad') || input.includes('depressed') || input.includes('unhappy')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would it help to talk about what's causing these feelings?";
    } else if (input.includes('anxious') || input.includes('worried') || input.includes('stressed')) {
      return "Anxiety can be really challenging. Have you tried any breathing exercises or mindfulness techniques? Sometimes taking a few deep breaths can help in the moment.";
    } else if (input.includes('happy') || input.includes('great') || input.includes('good')) {
      return "I'm glad to hear you're feeling positive! What's been going well for you recently?";
    } else if (input.includes('tired') || input.includes('exhausted') || input.includes('sleep')) {
      return "Rest is so important for mental wellbeing. Have you been able to maintain a regular sleep schedule? Even small improvements in sleep quality can have big effects.";
    } else if (input.includes('angry') || input.includes('frustrated') || input.includes('mad')) {
      return "It sounds like you're feeling frustrated. Sometimes taking a short break from what's bothering you can help provide perspective. Would you like to talk more about what's causing these feelings?";
    } else if (input.includes('help') || input.includes('support') || input.includes('advice')) {
      return "I'm here to support you. While I'm not a replacement for professional help, I can listen and offer some guidance. What specific area would you like support with?";
    } else if (input.includes('thank') || input.includes('thanks')) {
      return "You're very welcome. I'm here whenever you need someone to talk to.";
    } else if (input.length < 10) {
      return "I'd love to hear more about that. Could you elaborate a bit so I can better understand what you're experiencing?";
    } else {
      // Generic supportive responses for inputs that don't match patterns
      const genericResponses = [
        "Thank you for sharing that with me. How does this situation affect your daily life?",
        "I understand. Have you noticed any patterns in when these feelings occur?",
        "That's important to acknowledge. How long have you been experiencing this?",
        "I appreciate you opening up. Is there a specific aspect of this that you find most challenging?",
        "I'm here to listen and support you. Would it help to explore some coping strategies for this?",
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Generate more advanced response based on input
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

  const handleFeedbackSubmit = () => {
    if (feedback.rating) {
      toast.success("Thank you for your feedback!", {
        description: "Your input helps us improve our service."
      });
      
      // Here you would typically send the feedback to your backend
      console.log("Feedback submitted:", feedback);
      
      // Reset feedback state
      setFeedback({ rating: null, comment: '' });
      setShowFeedback(false);
    } else {
      toast.error("Please select a rating before submitting.");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] py-2 px-4 rounded-2xl",
                message.sender === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <p className="text-sm break-words">{message.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-primary" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
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
        )}
        
        {showFeedback && !isTyping && (
          <div className="bg-secondary/50 rounded-lg p-4 animate-fade-in">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Star size={16} className="text-primary" />
              How was your experience?
            </h3>
            <div className="flex gap-2 mb-3">
              <Button
                variant={feedback.rating === 'positive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedback(prev => ({ ...prev, rating: 'positive' }))}
                className="flex items-center gap-1"
              >
                <ThumbsUp size={14} />
                Helpful
              </Button>
              <Button
                variant={feedback.rating === 'negative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFeedback(prev => ({ ...prev, rating: 'negative' }))}
                className="flex items-center gap-1"
              >
                <ThumbsDown size={14} />
                Not Helpful
              </Button>
            </div>
            <Textarea
              placeholder="Any additional feedback? (optional)"
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              className="mb-3 resize-none"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowFeedback(false);
                  setFeedback({ rating: null, comment: '' });
                }}
              >
                Skip
              </Button>
              <Button
                size="sm"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border/20 backdrop-blur">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            autoFocus
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
