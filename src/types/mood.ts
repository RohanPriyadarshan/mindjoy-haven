
// Interface for mood entries
export interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  date: string;
  time: string;
  note: string;
}

// Interface for chart data
export interface MoodChartData {
  date: string;
  value: number;
  mood: 'happy' | 'neutral' | 'sad';
}
