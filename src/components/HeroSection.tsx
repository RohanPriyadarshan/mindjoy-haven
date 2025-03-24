
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, BarChart2, ClipboardCheck, Award } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  to,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  buttonText: string; 
  to: string;
  delay: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`glass card-shadow rounded-2xl p-6 flex flex-col items-center text-center animate-slide-up opacity-0`}
      style={{ animationDelay: delay, animationFillMode: 'forwards' }}
    >
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button 
        onClick={() => navigate(to)}
        className="mt-auto"
        variant="outline"
      >
        {buttonText}
      </Button>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "AI Assistant",
      description: "Chat with our supportive AI to discuss thoughts, get insights, and receive personalized guidance.",
      buttonText: "Start Chatting",
      to: "/chat",
      delay: "0.1s"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Mood Tracker",
      description: "Track your emotional wellbeing over time and identify patterns to better understand yourself.",
      buttonText: "Track Mood",
      to: "/mood",
      delay: "0.2s"
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-primary" />,
      title: "Self-Assessment",
      description: "Discover more about your mental health with our clinically-informed self-assessment tools.",
      buttonText: "Take Assessment",
      to: "/assessment",
      delay: "0.3s"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Achievements",
      description: "Stay motivated with achievement badges that celebrate your progress and consistency.",
      buttonText: "View Achievements",
      to: "/achievements",
      delay: "0.4s"
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Your Personal Mental Health Companion
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A supportive space to nurture your mental wellbeing through conversation, 
          tracking, and self-discovery.
        </p>
        <Button 
          onClick={() => navigate('/chat')} 
          size="lg" 
          className="animate-pulse-subtle"
        >
          Get Started
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
