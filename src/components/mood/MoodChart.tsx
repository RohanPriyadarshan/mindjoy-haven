
import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { MoodChartData } from '@/types/mood';
import { getMoodColor } from '@/utils/moodUtils';

interface MoodChartProps {
  chartData: MoodChartData[];
  viewType: 'week' | 'month';
  setViewType: (viewType: 'week' | 'month') => void;
}

const MoodChart = ({ chartData, viewType, setViewType }: MoodChartProps) => {
  return (
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
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name, props) => {
                  const mood = props.payload.mood;
                  return [mood.charAt(0).toUpperCase() + mood.slice(1), ''];
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={(props) => {
                  const mood = props.payload.mood;
                  return (
                    <svg 
                      x={props.cx - 6} 
                      y={props.cy - 6} 
                      width={12} 
                      height={12} 
                      fill={getMoodColor(mood)} 
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="6" />
                    </svg>
                  );
                }}
                activeDot={{ r: 8, fill: 'hsl(var(--primary))', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No mood data available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodChart;
