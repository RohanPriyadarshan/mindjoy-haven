
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface UseChatReturn {
  messages: Message[];
  isTyping: boolean;
  showFeedback: boolean;
  isLoading: boolean;
  handleSendMessage: (input: string) => Promise<void>;
  handleCloseFeedback: () => void;
}
