// src/components/MoodChart.tsx
import React, { useEffect, useRef } from 'react';
import { MoodEntry } from '@/types';
import { Card } from '@/components/ui/card';
import { format, subDays } from 'date-fns';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Map mood to numerical value for charting
const moodToValue = {
  'happy': 5,
  'energetic': 4,
  'calm': 3,
  'sad': 2,
  'angry': 1,
};

// Map numerical value back to mood for tooltip
const valueToMood = {
  5: 'Happy 😊',
  4: 'Energetic ⚡',
  3: 'Calm 😌',
  2: 'Sad 😢',
  1: 'Angry 😠',
};

type MoodChartProps = {
  entries: MoodEntry[];
};

export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  const chartRef = useRef<Chart | null>(null);

  // Get data for the last 10 days
  const getChartData = () => {
    const today = new Date();
    const lastTenDays = Array.from({ length: 10 }, (_, i) => {
      const date = subDays(today, 9 - i);
      return format(date, 'MMM dd');
    });

    // Create a map of dates to mood values from entries
    const moodByDate = new Map<string, number[]>();
    
    entries.forEach(entry => {
      const entryDate = format(new Date(entry.timestamp), 'MMM dd');
      const moodValue = moodToValue[entry.mood] || 3; // Default to 'calm' if unknown
      
      if (!moodByDate.has(entryDate)) {
        moodByDate.set(entryDate, []);
      }
      moodByDate.get(entryDate)?.push(moodValue);
    });
    
    // Calculate average mood for each day (if multiple entries exist)
    const moodData = lastTenDays.map(date => {
      const moods = moodByDate.get(date);
      if (!moods || moods.length === 0) return null;
      
      // Calculate average mood for the day
      const sum = moods.reduce((a, b) => a + b, 0);
      return sum / moods.length;
    });

    return {
      labels: lastTenDays,
      datasets: [
        {
          label: 'Mood',
          data: moodData,
          borderColor: 'rgba(79, 70, 229, 0.8)',
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(79, 70, 229, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0.5,
        max: 5.5,
        ticks: {
          callback: function(value) {
            return valueToMood[value as keyof typeof valueToMood] || '';
          },
          stepSize: 1
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const moodKey = Math.round(value) as keyof typeof valueToMood;
            return valueToMood[moodKey] || 'Unknown';
          },
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  if (entries.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>No mood data yet. Add entries to see your mood chart.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Line
        data={getChartData()}
        options={chartOptions}
        className="h-full w-full"
      />
    </div>
  );
};