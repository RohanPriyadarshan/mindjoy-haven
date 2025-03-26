
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { toast } from "sonner";

interface FeedbackData {
  rating: 'positive' | 'negative' | null;
  comment: string;
}

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm = ({ onClose }: FeedbackFormProps) => {
  const [feedback, setFeedback] = React.useState<FeedbackData>({
    rating: null,
    comment: '',
  });

  const handleFeedbackSubmit = () => {
    if (feedback.rating) {
      toast.success("Thank you for your feedback!", {
        description: "Your input helps us improve our service."
      });
      
      // Here you would typically send the feedback to your backend
      console.log("Feedback submitted:", feedback);
      
      // Reset feedback state and close
      onClose();
    } else {
      toast.error("Please select a rating before submitting.");
    }
  };

  return (
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
          onClick={onClose}
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
  );
};

export default FeedbackForm;
