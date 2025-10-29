import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-neutral-200">
        <p className="label-medium">{label}</p>
        <p className="body-medium font-medium" style={{ color: data.color }}>
          {data.mood}
        </p>
        <p className="body-small text-neutral-500">{data.note}</p>
      </div>
    );
  }

  return null;
};

const MoodTrendGraph = ({ moodData }) => {
  // Map mood values to numerical values for the chart
  const moodValues = {
    "Happy": 5,
    "Calm": 4,
    "Neutral": 3,
    "Anxious": 2,
    "Low": 1,
    "Angry": 0
  };

  const chartData = moodData.map(item => ({
    ...item,
    value: moodValues[item.mood]
  }));

  // Pastel palette
  const pastelPalette = {
    Happy: '#FDE68A',
    Calm: '#BFDBFE',
    Neutral: '#E5E7EB',
    Anxious: '#FBCFE8',
    Low: '#C7D2FE',
    Angry: '#FECACA'
  };

  const getMoodColor = (mood) => pastelPalette[mood] || pastelPalette.Neutral;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="heading-medium text-neutral-700">Your Mood Trend</h3>
        <button className="text-primary-500 flex items-center body-small">
          Last 7 days
        </button>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7E1FF" stopOpacity={0.9} />
                <stop offset="60%" stopColor="#E6D9FF" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#FDF2F8" stopOpacity={0.25} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-200)" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-neutral-500)' }}
            />
            <YAxis 
              domain={[0, 5]} 
              axisLine={false}
              tickLine={false}
              tick={false}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" dataKey="value" stroke="#A5B4FC" 
              fillOpacity={1} 
              fill="url(#colorMood)" 
              activeDot={{ 
                r: 6, 
                stroke: 'white', 
                strokeWidth: 2,
                fill: ({ payload }) => getMoodColor(payload.mood)
              }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-2 px-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: pastelPalette.Happy }}></div>
          <span className="body-small text-neutral-600">Happy</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: pastelPalette.Calm }}></div>
          <span className="body-small text-neutral-600">Calm</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: pastelPalette.Anxious }}></div>
          <span className="body-small text-neutral-600">Anxious</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: pastelPalette.Low }}></div>
          <span className="body-small text-neutral-600">Low</span>
        </div>
      </div>
    </div>
  );
};

export default MoodTrendGraph;