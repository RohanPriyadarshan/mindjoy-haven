
export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

export interface AssessmentType {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  icon: React.ReactNode;
}

export interface AssessmentResult {
  level: string;
  description: string;
  color: string;
}
