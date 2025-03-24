
import { AssessmentType, AssessmentResult } from './types';

export const calculateScore = (
  selectedAssessment: AssessmentType,
  answers: Record<number, number>
): number => {
  const totalQuestions = selectedAssessment.questions.length;
  let answeredQuestions = 0;
  let totalScore = 0;
  
  selectedAssessment.questions.forEach(question => {
    if (answers[question.id] !== undefined) {
      answeredQuestions++;
      totalScore += answers[question.id];
    }
  });
  
  if (answeredQuestions === 0) return 0;
  
  return totalScore;
};

export const getResultInterpretation = (
  selectedAssessment: AssessmentType,
  answers: Record<number, number>
): AssessmentResult => {
  if (!selectedAssessment) return { level: '', description: '', color: '' };
  
  const score = calculateScore(selectedAssessment, answers);
  
  if (selectedAssessment.id === 'anxiety' || selectedAssessment.id === 'mood') {
    if (score <= 4) {
      return { 
        level: 'Minimal', 
        description: 'Your responses indicate minimal symptoms.',
        color: 'bg-green-500'
      };
    } else if (score <= 9) {
      return { 
        level: 'Mild', 
        description: 'Your responses indicate mild symptoms that may benefit from monitoring.',
        color: 'bg-yellow-500'
      };
    } else if (score <= 14) {
      return { 
        level: 'Moderate', 
        description: 'Your responses indicate moderate symptoms. Consider speaking with a mental health professional.',
        color: 'bg-orange-500'
      };
    } else {
      return { 
        level: 'Severe', 
        description: "Your responses indicate severe symptoms. It's recommended to consult with a mental health professional.",
        color: 'bg-red-500'
      };
    }
  } else { // wellbeing
    const maxScore = selectedAssessment.questions.length * 4; // Each question has max value of 4
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 75) {
      return { 
        level: 'Flourishing', 
        description: 'You appear to be experiencing positive mental wellbeing.',
        color: 'bg-green-500'
      };
    } else if (percentage >= 50) {
      return { 
        level: 'Moderate', 
        description: 'You appear to have moderate mental wellbeing.',
        color: 'bg-blue-500'
      };
    } else {
      return { 
        level: 'Struggling', 
        description: 'Your wellbeing may benefit from support. Consider healthy activities and possibly speaking with someone.',
        color: 'bg-purple-500'
      };
    }
  }
};

export const getMaxPossibleScore = (selectedAssessment: AssessmentType): number => {
  return selectedAssessment.id === 'wellbeing' 
    ? selectedAssessment.questions.length * 4 
    : selectedAssessment.questions.length * 3;
};
