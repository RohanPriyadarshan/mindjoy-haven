
import React, { useState } from 'react';
import { assessmentTypes } from './assessment/assessmentData';
import { AssessmentType } from './assessment/types';
import { getResultInterpretation } from './assessment/assessmentUtils';
import AssessmentSelection from './assessment/AssessmentSelection';
import QuestionView from './assessment/QuestionView';
import ResultsView from './assessment/ResultsView';

const SelfAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const startAssessment = (assessment: AssessmentType) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const handleAnswer = (value: number) => {
    if (!selectedAssessment) return;
    
    setAnswers(prev => ({
      ...prev,
      [selectedAssessment.questions[currentQuestion].id]: value
    }));
    
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
    
  return (
    <div>
      {!selectedAssessment && (
        <AssessmentSelection 
          assessmentTypes={assessmentTypes} 
          onSelectAssessment={startAssessment}
        />
      )}
      
      {selectedAssessment && !showResults && (
        <QuestionView 
          selectedAssessment={selectedAssessment}
          currentQuestion={currentQuestion}
          answers={answers}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
          onCancel={resetAssessment}
        />
      )}
      
      {showResults && selectedAssessment && (
        <ResultsView 
          selectedAssessment={selectedAssessment}
          result={getResultInterpretation(selectedAssessment, answers)}
          answers={answers}
          onReset={resetAssessment}
        />
      )}
    </div>
  );
};

export default SelfAssessment;
