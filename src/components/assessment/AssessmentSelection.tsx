
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AssessmentType } from './types';

interface AssessmentSelectionProps {
  assessmentTypes: AssessmentType[];
  onSelectAssessment: (assessment: AssessmentType) => void;
}

const AssessmentSelection = ({ assessmentTypes, onSelectAssessment }: AssessmentSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {assessmentTypes.map((assessment) => (
        <button
          key={assessment.id}
          onClick={() => onSelectAssessment(assessment)}
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
};

export default AssessmentSelection;
