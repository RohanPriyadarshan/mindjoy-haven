
import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Meh, Sun, Moon, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Interface for mood entries
interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  date: string;
  time: string;
  note: string;
}

// Interface for chart data
interface MoodChartData {
  date: string;
  value: number;
  mood: 'happy' | 'neutral' | 'sad';
}

// Mock data
const generateMockData = (): MoodEntry[] => {
  const moods: ('happy' | 'neutral' | 'sad')[] = ['happy', 'neutral', 'sad'];
  const mockData: MoodEntry[] = [];
  
  // Last 10 days
  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    mockData.push({
      id: `entry-${i}`,
      mood: moods[Math.floor(Math.random() * moods.length)],
      date: date.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      note: ''
    });
  }
  
  return mockData;
};

const MoodTracker = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [note, setNote] = useState('');
  const [viewType, setViewType] = useState<'week' | 'month'>('week');
  
  useEffect(() => {
    // Load mock data on mount
    setEntries(generateMockData());
  }, []);
  
  const handleMoodSelect = (mood: 'happy' | 'neutral' | 'sad') => {
    setSelectedMood(mood);
  };
  
  const handleSubmit = () => {
    if (!selectedMood) return;
    
    const now = new Date();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      note: note
    };
    
    setEntries(prev => [...prev, newEntry]);
    setSelectedMood(null);
    setNote('');
  };
  
  // Transform entries for the chart
  const getChartData = (): MoodChartData[] => {
    const moodValues = {
      'happy': 3,
      'neutral': 2,
      'sad': 1
    };
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get only the last 7 entries for week view or all for month
    const filteredEntries = viewType === 'week' 
      ? sortedEntries.slice(-7) 
      : sortedEntries;
    
    return filteredEntries.map(entry => ({
      date: entry.date.split('-').slice(1).join('/'), // Format as MM/DD
      value: moodValues[entry.mood],
      mood: entry.mood
    }));
  };
  
  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return <Smile className="h-6 w-6" />;
      case 'neutral': return <Meh className="h-6 w-6" />;
      case 'sad': return <Frown className="h-6 w-6" />;
    }
  };
  
  const getMoodColor = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return 'rgb(34, 197, 94)';
      case 'neutral': return 'rgb(234, 179, 8)';
      case 'sad': return 'rgb(239, 68, 68)';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass rounded-xl p-6 card-shadow animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mood History</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewType === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewType('week')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Week
            </Button>
            <Button 
              variant={viewType === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewType('month')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Month
            </Button>
          </div>
        </div>
        
        <div className="h-80">
          {entries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis 
                  domain={[0, 4]} 
                  ticks={[1, 2, 3]} 
                  tickFormatter={(value) => {
                    switch (value) {
                      case 1: return 'Sad';
                      case 2: return 'Neutral';
                      case 3: return 'Happy';
                      default: return '';
                    }
                  }}
                />
                <Tooltip 
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value, name, props) => {
                    const mood = props.payload.mood;
                    return [mood.charAt(0).toUpperCase() + mood.slice(1), ''];
                  }}
                />
                <Bar dataKey="value" maxBarSize={60}>
                  {getChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No mood data available yet.
            </div>
          )}
        </div>
      </div>
      
      <div className="glass rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-semibold mb-6">How are you feeling?</h2>
        
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
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Recent Entries</h3>
          <div className="space-y-3 max-h-[200px] overflow-y-auto">
            {entries.slice(-3).reverse().map(entry => (
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
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
