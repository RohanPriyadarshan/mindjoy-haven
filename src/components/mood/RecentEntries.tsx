
import React from 'react';
import { Smile, Frown, Meh, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MoodEntry } from '@/types/mood';

interface RecentEntriesProps {
  entries: MoodEntry[];
  points: number;
  goToStore: () => void;
}

const RecentEntries = ({ entries, points, goToStore }: RecentEntriesProps) => {
  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return <Smile className="h-6 w-6" />;
      case 'neutral': return <Meh className="h-6 w-6" />;
      case 'sad': return <Frown className="h-6 w-6" />;
    }
  };

  return (
    <div className="glass rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Recent Entries</h3>
        <div className="flex items-center gap-1">
          <Gift className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{points} points</span>
        </div>
      </div>
      
      <ScrollArea className="h-[180px]">
        <div className="space-y-3 pr-4">
          {entries.slice(-5).reverse().map(entry => (
            <div key={entry.id} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                entry.mood === 'happy' ? "bg-green-100 text-green-500" :
                entry.mood === 'neutral' ? "bg-yellow-100 text-yellow-500" :
                "bg-red-100 text-red-500"
              )}>
                {getMoodIcon(entry.mood)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium capitalize">{entry.mood}</span>
                  <span className="text-xs text-muted-foreground">{entry.date} - {entry.time}</span>
                </div>
                {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <Button 
        onClick={goToStore}
        variant="outline" 
        className="w-full mt-4 bg-primary/5 border-primary/10 hover:bg-primary/10"
      >
        <Gift className="h-4 w-4 mr-2" />
        Redeem Points in Store
      </Button>
    </div>
  );
};

export default RecentEntries;
