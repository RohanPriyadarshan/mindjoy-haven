
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AssessmentType, Question } from './types';

interface QuestionViewProps {
  selectedAssessment: AssessmentType;
  currentQuestion: number;
  answers: Record<number, number>;
  onAnswer: (value: number) => void;
  onPrevious: () => void;
  onCancel: () => void;
}

const QuestionView = ({
  selectedAssessment,
  currentQuestion,
  answers,
  onAnswer,
  onPrevious,
  onCancel
}: QuestionViewProps) => {
  const question = selectedAssessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedAssessment.questions.length) * 100;
  
  return (
    <div className="glass rounded-xl p-8 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">{selectedAssessment.title}</h2>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {selectedAssessment.questions.length}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-6">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={cn(
                "w-full text-left p-4 rounded-lg transition-all border",
                answers[question.id] === option.value
                  ? "bg-primary/10 border-primary"
                  : "bg-background hover:bg-secondary/50 border-border"
              )}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionView;
