
import React, { useState, useEffect } from 'react';
import { Lock, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'chat' | 'mood' | 'assessment' | 'consistency';
  unlocked: boolean;
  progress?: {
    current: number;
    total: number;
  };
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<'all' | 'chat' | 'mood' | 'assessment' | 'consistency'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  // Mock achievement data
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: 'chat-1',
        title: 'First Chat',
        description: 'Started your first conversation with the AI assistant',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E0F2FE" />
            <path d="M8 12L11 15L16 10" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'chat',
        unlocked: true,
      },
      {
        id: 'chat-2',
        title: 'Deep Conversations',
        description: 'Had 5 meaningful conversations with the AI assistant',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E0F2FE" />
            <path d="M12 8V16M8 12H16" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'chat',
        unlocked: false,
        progress: {
          current: 2,
          total: 5,
        },
      },
      {
        id: 'mood-1',
        title: 'Mood Tracker',
        description: 'Tracked your mood for the first time',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#DCFCE7" />
            <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9H9.01M15 9H15.01" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'mood',
        unlocked: true,
      },
      {
        id: 'mood-2',
        title: 'Mood Streak',
        description: 'Tracked your mood for 7 consecutive days',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#DCFCE7" />
            <path d="M16 8L12 12L8 16M8 8L16 16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'mood',
        unlocked: false,
        progress: {
          current: 3,
          total: 7,
        },
      },
      {
        id: 'assessment-1',
        title: 'Self-Discovery',
        description: 'Completed your first self-assessment',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FEF3C7" />
            <path d="M12 16V16.01M12 8V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'assessment',
        unlocked: true,
      },
      {
        id: 'assessment-2',
        title: 'Assessment Master',
        description: 'Completed all types of self-assessments',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FEF3C7" />
            <path d="M9 12L11 14L15 10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'assessment',
        unlocked: false,
        progress: {
          current: 1,
          total: 3,
        },
      },
      {
        id: 'consistency-1',
        title: 'First Steps',
        description: 'Used the app for 3 consecutive days',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E0E7FF" />
            <path d="M12 6V12L16 14" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'consistency',
        unlocked: true,
      },
      {
        id: 'consistency-2',
        title: 'Wellness Warrior',
        description: 'Used the app for 30 consecutive days',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#E0E7FF" />
            <path d="M16 8L8 16M8 8L16 16" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        category: 'consistency',
        unlocked: false,
        progress: {
          current: 7,
          total: 30,
        },
      },
    ];
    
    setAchievements(mockAchievements);
  }, []);
  
  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(a => a.category === filter);
    
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  
  const handleClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="glass card-shadow rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Achievements</h2>
              <p className="text-muted-foreground">
                Track your progress and earn badges as you use the app.
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg px-4 py-2 text-center">
              <span className="block text-3xl font-bold text-primary">{unlockedCount}/{totalCount}</span>
              <span className="text-sm text-muted-foreground">Achievements Unlocked</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'chat' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('chat')}
          >
            Chat
          </Button>
          <Button
            variant={filter === 'mood' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('mood')}
          >
            Mood
          </Button>
          <Button
            variant={filter === 'assessment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('assessment')}
          >
            Assessment
          </Button>
          <Button
            variant={filter === 'consistency' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('consistency')}
          >
            Consistency
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAchievements.map((achievement) => (
          <button
            key={achievement.id}
            onClick={() => handleClick(achievement)}
            className={cn(
              "flex flex-col items-center text-center p-6 rounded-xl transition-all border",
              achievement.unlocked
                ? "glass hover:card-shadow"
                : "bg-background/50 border-border"
            )}
          >
            <div className="relative mb-4">
              {achievement.icon}
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-medium mb-1">{achievement.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
            
            {achievement.progress && !achievement.unlocked && (
              <div className="w-full mt-auto">
                <div className="flex justify-between text-xs mb-1">
                  <span>{achievement.progress.current}</span>
                  <span>{achievement.progress.total}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {achievement.unlocked && (
              <div className="flex items-center mt-auto text-green-500 text-sm">
                <Check className="w-4 h-4 mr-1" />
                <span>Unlocked</span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {filteredAchievements.length === 0 && (
        <div className="glass rounded-xl p-8 text-center">
          <Info className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No achievements found</h3>
          <p className="text-muted-foreground">
            There are no achievements in this category yet.
          </p>
        </div>
      )}
      
      {selectedAchievement && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass card-shadow rounded-xl p-8 max-w-md w-full animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {selectedAchievement.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{selectedAchievement.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedAchievement.description}</p>
              
              {selectedAchievement.progress && !selectedAchievement.unlocked && (
                <div className="w-full mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{selectedAchievement.progress.current}/{selectedAchievement.progress.total}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${(selectedAchievement.progress.current / selectedAchievement.progress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {selectedAchievement.unlocked && (
                <div className="flex items-center mb-6 text-green-500">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Achievement Unlocked</span>
                </div>
              )}
              
              <Button onClick={() => setSelectedAchievement(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
