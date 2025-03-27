
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MoodEntry, MoodChartData } from '@/types/mood';
import { generateMockData, getMoodColor } from '@/utils/moodUtils';
import MoodChart from '@/components/mood/MoodChart';
import MoodSelector from '@/components/mood/MoodSelector';
import RecentEntries from '@/components/mood/RecentEntries';
import { Award } from 'lucide-react';

const MoodTracker = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [note, setNote] = useState('');
  const [viewType, setViewType] = useState<'week' | 'month'>('week');
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  
  useEffect(() => {
    // Load mock data on mount
    setEntries(generateMockData());
    
    // Initialize streak (in a real app, this would come from backend)
    setStreak(5);
    setPoints(75);
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
    
    // Update streak & points when a mood is logged
    setStreak(prev => prev + 1);
    setPoints(prev => prev + 15);
    
    toast.success("Mood logged successfully! +15 points", {
      description: "Keep the streak going for bonus points!",
      action: {
        label: "View Rewards",
        onClick: () => navigate('/store')
      },
    });
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

  const goToStore = () => {
    navigate('/store');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <MoodChart 
        chartData={getChartData()} 
        viewType={viewType} 
        setViewType={setViewType} 
      />
      
      <div className="grid grid-cols-1 gap-6">
        <MoodSelector
          selectedMood={selectedMood}
          handleMoodSelect={handleMoodSelect}
          note={note}
          setNote={setNote}
          handleSubmit={handleSubmit}
          streak={streak}
        />
        
        <RecentEntries
          entries={entries}
          points={points}
          goToStore={goToStore}
        />
      </div>
    </div>
  );
};

export default MoodTracker;
