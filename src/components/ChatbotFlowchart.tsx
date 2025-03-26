
import React from 'react';
import { cn } from '@/lib/utils';

interface FlowchartNodeProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: 'left' | 'right' | 'center';
  isStart?: boolean;
  isEnd?: boolean;
  hasAlternate?: boolean;
}

const FlowchartNode: React.FC<FlowchartNodeProps> = ({
  id,
  title,
  description,
  icon,
  position,
  isStart = false,
  isEnd = false,
  hasAlternate = false,
}) => {
  return (
    <div 
      id={id}
      className={cn(
        "relative p-5 border rounded-xl shadow-sm bg-card transition-all",
        position === 'left' ? "mr-auto" : position === 'right' ? "ml-auto" : "mx-auto",
        isStart ? "border-l-4 border-l-primary" : isEnd ? "border-l-4 border-l-primary/50" : "",
        hasAlternate ? "border-r-4 border-r-amber-500" : "",
        "w-full md:w-[80%] mb-2"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ChatbotFlowchart = () => {
  return (
    <div className="space-y-8 mb-16">
      <div className="flowchart relative border-l-2 border-dashed border-primary/30 ml-5 pl-12 space-y-12 py-6">
        {/* User Input */}
        <div>
          <FlowchartNode
            id="user-input"
            title="User Input Stage"
            description="User enters a message or query through the chat interface"
            icon={<span className="text-primary">1</span>}
            position="left"
            isStart={true}
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">1</span>
          </div>
        </div>

        {/* Text Processing */}
        <div>
          <FlowchartNode
            id="text-processing"
            title="Text Processing"
            description="The chatbot analyzes and processes the input text"
            icon={<span className="text-primary">2</span>}
            position="right"
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">2</span>
          </div>
        </div>

        {/* Intent Recognition */}
        <div>
          <FlowchartNode
            id="intent-recognition"
            title="Intent Recognition"
            description="Identifying user's intent using NLP pattern matching techniques"
            icon={<span className="text-primary">3</span>}
            position="left"
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">3</span>
          </div>
        </div>

        {/* Database/AI Lookup */}
        <div>
          <FlowchartNode
            id="database-lookup"
            title="Database/AI Lookup"
            description="Searching for relevant responses based on the recognized intent"
            icon={<span className="text-primary">4</span>}
            position="right"
            hasAlternate={true}
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">4</span>
          </div>
        </div>

        {/* Response Generation */}
        <div>
          <FlowchartNode
            id="response-generation"
            title="Response Generation"
            description="Forming a suitable reply for the user based on the identified intent and context"
            icon={<span className="text-primary">5</span>}
            position="left"
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">5</span>
          </div>
        </div>

        {/* Bot Response */}
        <div>
          <FlowchartNode
            id="bot-response"
            title="Bot Response"
            description="Displaying the chatbot's message to the user through the chat interface"
            icon={<span className="text-primary">6</span>}
            position="right"
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">6</span>
          </div>
        </div>

        {/* User Feedback Collection */}
        <div>
          <FlowchartNode
            id="user-feedback"
            title="User Feedback Collection"
            description="Allowing users to rate or provide feedback on the chatbot's response"
            icon={<span className="text-primary">7</span>}
            position="left"
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">7</span>
          </div>
        </div>

        {/* Continuous Learning */}
        <div>
          <FlowchartNode
            id="continuous-learning"
            title="Continuous Learning"
            description="Using feedback to improve future responses and enhance chatbot performance"
            icon={<span className="text-primary">8</span>}
            position="right"
            isEnd={true}
          />
          <div className="w-10 h-10 absolute -left-4 bg-background flex items-center justify-center rounded-full border-2 border-primary z-10">
            <span className="text-primary font-medium">8</span>
          </div>
        </div>
      </div>

      {/* Feedback Loop Arrow */}
      <div className="relative bg-muted/30 p-4 rounded-lg border border-dashed">
        <div className="flex gap-2 items-center justify-center">
          <div className="h-0.5 w-16 bg-primary/50"></div>
          <div className="h-6 w-6 rounded-full border-2 border-primary/70 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <div className="h-0.5 w-16 bg-primary/50"></div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Feedback Loop: User feedback improves the model over time, enhancing future responses
        </p>
      </div>

      {/* Detailed Flow Explanation */}
      <div className="space-y-4 bg-card p-6 rounded-xl border mt-10">
        <h3 className="font-semibold text-xl">Detailed Flow Explanation</h3>
        <ol className="space-y-3 list-decimal list-inside text-sm">
          <li className="text-muted-foreground"><span className="font-medium text-foreground">User Input:</span> The user enters their message in the chat interface.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Text Processing:</span> The system analyzes and cleans the input text, preparing it for intent analysis.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Intent Recognition:</span> Pattern matching algorithms identify the user's intent and emotional context.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Database/AI Lookup:</span> The system searches for appropriate responses based on the recognized intent.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Response Generation:</span> A response is formulated that addresses the user's needs and context.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Bot Response:</span> The generated response is displayed to the user in the chat interface.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">User Feedback:</span> The user can provide feedback on the helpfulness of the response.</li>
          <li className="text-muted-foreground"><span className="font-medium text-foreground">Continuous Learning:</span> Feedback data is used to improve the system's future responses.</li>
        </ol>
      </div>
    </div>
  );
};

export default ChatbotFlowchart;
