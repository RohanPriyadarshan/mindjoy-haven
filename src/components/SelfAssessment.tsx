import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

interface AssessmentType {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  icon: React.ReactNode;
}

const SelfAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const assessmentTypes: AssessmentType[] = [
    {
      id: 'anxiety',
      title: 'Anxiety Assessment',
      description: 'Evaluate symptoms of anxiety with this clinically-informed assessment',
      icon: <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      questions: [
        {
          id: 1,
          text: 'How often do you feel restless or on edge?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 2,
          text: 'How often do you have trouble relaxing?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 3,
          text: 'How often do you worry too much about different things?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 4,
          text: 'How often do you have trouble concentrating?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 5,
          text: 'How often do you feel afraid something awful might happen?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
      ],
    },
    {
      id: 'mood',
      title: 'Mood Assessment',
      description: 'Evaluate symptoms of depression with this clinically-informed assessment',
      icon: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
      questions: [
        {
          id: 1,
          text: 'How often do you feel little interest or pleasure in doing things?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 2,
          text: 'How often do you feel down, depressed, or hopeless?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 3,
          text: 'How often do you have trouble falling or staying asleep, or sleeping too much?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 4,
          text: 'How often do you feel tired or have little energy?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
        {
          id: 5,
          text: 'How often do you have poor appetite or overeating?',
          options: [
            { text: 'Not at all', value: 0 },
            { text: 'Several days', value: 1 },
            { text: 'More than half the days', value: 2 },
            { text: 'Nearly every day', value: 3 },
          ]
        },
      ],
    },
    {
      id: 'wellbeing',
      title: 'Well-being Check',
      description: 'Assess your overall psychological well-being',
      icon: <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      questions: [
        {
          id: 1,
          text: "I've been feeling optimistic about the future",
          options: [
            { text: 'None of the time', value: 0 },
            { text: 'Rarely', value: 1 },
            { text: 'Some of the time', value: 2 },
            { text: 'Often', value: 3 },
            { text: 'All of the time', value: 4 },
          ]
        },
        {
          id: 2,
          text: "I've been feeling useful",
          options: [
            { text: 'None of the time', value: 0 },
            { text: 'Rarely', value: 1 },
            { text: 'Some of the time', value: 2 },
            { text: 'Often', value: 3 },
            { text: 'All of the time', value: 4 },
          ]
        },
        {
          id: 3,
          text: "I've been feeling relaxed",
          options: [
            { text: 'None of the time', value: 0 },
            { text: 'Rarely', value: 1 },
            { text: 'Some of the time', value: 2 },
            { text: 'Often', value: 3 },
            { text: 'All of the time', value: 4 },
          ]
        },
        {
          id: 4,
          text: "I've been dealing with problems well",
          options: [
            { text: 'None of the time', value: 0 },
            { text: 'Rarely', value: 1 },
            { text: 'Some of the time', value: 2 },
            { text: 'Often', value: 3 },
            { text: 'All of the time', value: 4 },
          ]
        },
        {
          id: 5,
          text: "I've been thinking clearly",
          options: [
            { text: 'None of the time', value: 0 },
            { text: 'Rarely', value: 1 },
            { text: 'Some of the time', value: 2 },
            { text: 'Often', value: 3 },
            { text: 'All of the time', value: 4 },
          ]
        },
      ],
    },
  ];
  
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
  
  const calculateScore = () => {
    if (!selectedAssessment) return 0;
    
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
  
  const getResultInterpretation = () => {
    if (!selectedAssessment) return { level: '', description: '' };
    
    const score = calculateScore();
    
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
  
  const renderAssessmentSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {assessmentTypes.map((assessment) => (
        <button
          key={assessment.id}
          onClick={() => startAssessment(assessment)}
          className="glass hover:card-shadow transition-all p-6 rounded-xl text-left animate-slide-up opacity-0"
          style={{ animationDelay: `${assessmentTypes.indexOf(assessment) * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <div className="mb-4">{assessment.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
          <p className="text-muted-foreground mb-4">{assessment.description}</p>
          <div className="flex items-center text-primary">
            <span className="text-sm font-medium">Start assessment</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </button>
      ))}
    </div>
  );
  
  const renderQuestion = () => {
    if (!selectedAssessment) return null;
    
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
                onClick={() => handleAnswer(option.value)}
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
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button variant="outline" onClick={resetAssessment}>
            Cancel
          </Button>
        </div>
      </div>
    );
  };
  
  const renderResults = () => {
    if (!selectedAssessment) return null;
    
    const result = getResultInterpretation();
    const totalScore = calculateScore();
    const maxPossibleScore = selectedAssessment.id === 'wellbeing' 
      ? selectedAssessment.questions.length * 4 
      : selectedAssessment.questions.length * 3;
    
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
          <Button variant="outline" onClick={resetAssessment}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Take Another Assessment
          </Button>
          
          <Button onClick={resetAssessment}>
            <Check className="mr-2 h-4 w-4" />
            Done
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {!selectedAssessment && renderAssessmentSelection()}
      {selectedAssessment && !showResults && renderQuestion()}
      {showResults && renderResults()}
    </div>
  );
};

export default SelfAssessment;
