
import { MoodEntry } from '@/types/mood';

// Generate mock data for mood entries
export const generateMockData = (): MoodEntry[] => {
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

export const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
  switch (mood) {
    case 'happy': return 'happy';
    case 'neutral': return 'neutral';
    case 'sad': return 'sad';
  }
};

export const getMoodColor = (mood: 'happy' | 'neutral' | 'sad') => {
  switch (mood) {
    case 'happy': return 'rgb(34, 197, 94)';
    case 'neutral': return 'rgb(234, 179, 8)';
    case 'sad': return 'rgb(239, 68, 68)';
  }
};
