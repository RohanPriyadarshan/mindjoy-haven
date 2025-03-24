
import React from 'react';
import { RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, AssessmentResult } from './types';
import { calculateScore, getMaxPossibleScore } from './assessmentUtils';

interface ResultsViewProps {
  selectedAssessment: AssessmentType;
  result: AssessmentResult;
  answers: Record<number, number>;
  onReset: () => void;
}

const ResultsView = ({
  selectedAssessment,
  result,
  answers,
  onReset
}: ResultsViewProps) => {
  const totalScore = calculateScore(selectedAssessment, answers);
  const maxPossibleScore = getMaxPossibleScore(selectedAssessment);
  
  return (
    <div className="glass rounded-xl p-8 max-w-3xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">{selectedAssessment.title} Results</h2>
        <p className="text-muted-foreground">
          Thank you for completing the assessment. Here's your result:
        </p>
      </div>
      
      <div className="bg-background rounded-lg p-6 mb-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Your score</h3>
          <span className="text-2xl font-bold">{totalScore}/{maxPossibleScore}</span>
        </div>
        
        <div className="h-3 bg-secondary rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full ${result.color} transition-all duration-1000 ease-out`} 
            style={{ width: `${(totalScore / maxPossibleScore) * 100}%` }}
          ></div>
        </div>
        
        <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-semibold mb-1">{result.level}</h4>
          <p className="text-sm text-muted-foreground">{result.description}</p>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-6">
        <p>
          <strong>Important note:</strong> This assessment is not a diagnostic tool. 
          If you're concerned about your mental health, please consult with a qualified healthcare professional.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Take Another Assessment
        </Button>
        
        <Button onClick={onReset}>
          <Check className="mr-2 h-4 w-4" />
          Done
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
