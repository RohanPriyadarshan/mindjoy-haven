
import React from 'react';
import { Smile, Meh, Frown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  selectedMood: 'happy' | 'neutral' | 'sad' | null;
  handleMoodSelect: (mood: 'happy' | 'neutral' | 'sad') => void;
  note: string;
  setNote: (note: string) => void;
  handleSubmit: () => void;
  streak: number;
}

const MoodSelector = ({ 
  selectedMood, 
  handleMoodSelect, 
  note, 
  setNote, 
  handleSubmit,
  streak 
}: MoodSelectorProps) => {
  return (
    <div className="glass rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">How are you feeling?</h2>
        <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
          <Award className="h-4 w-4 text-primary mr-1" />
          <span className="text-xs font-medium">{streak} day streak</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleMoodSelect('happy')}
          className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all",
            selectedMood === 'happy' 
              ? "bg-green-100 border-2 border-green-500" 
              : "bg-white hover:bg-green-50 border border-border hover:border-green-300"
          )}
        >
          <Smile className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-sm font-medium">Happy</span>
        </button>
        
        <button
          onClick={() => handleMoodSelect('neutral')}
          className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all",
            selectedMood === 'neutral' 
              ? "bg-yellow-100 border-2 border-yellow-500" 
              : "bg-white hover:bg-yellow-50 border border-border hover:border-yellow-300"
          )}
        >
          <Meh className="h-8 w-8 text-yellow-500 mb-2" />
          <span className="text-sm font-medium">Neutral</span>
        </button>
        
        <button
          onClick={() => handleMoodSelect('sad')}
          className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all",
            selectedMood === 'sad' 
              ? "bg-red-100 border-2 border-red-500" 
              : "bg-white hover:bg-red-50 border border-border hover:border-red-300"
          )}
        >
          <Frown className="h-8 w-8 text-red-500 mb-2" />
          <span className="text-sm font-medium">Sad</span>
        </button>
      </div>
      
      {selectedMood && (
        <div className="animate-fade-in">
          <label className="block text-sm font-medium mb-2">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-border rounded-lg bg-background/50 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Why do you feel this way?"
          ></textarea>
          
          <Button 
            onClick={handleSubmit}
            className="w-full mt-4"
          >
            Save Mood
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
