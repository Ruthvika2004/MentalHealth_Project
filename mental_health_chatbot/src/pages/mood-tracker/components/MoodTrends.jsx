import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-neutral-200">
        <p className="label-medium">{label}</p>
        <p className="body-medium font-medium" style={{ color: data.color }}>
          {data.mood}
        </p>
        {data.notes && (
          <p className="body-small text-neutral-500 mt-1">{data.notes}</p>
        )}
      </div>
    );
  }

  return null;
};

const MoodTrends = ({ moodData, timeRange, onChangeTimeRange }) => {
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

  // Get color based on mood
  const getMoodColor = (mood) => {
    switch(mood) {
      case "Happy": return "var(--color-happy)";
      case "Calm": return "var(--color-calm)";
      case "Anxious": return "var(--color-anxious)";
      case "Angry": return "var(--color-angry)";
      case "Low": return "var(--color-low)";
      default: return "var(--color-neutral-400)";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="heading-medium text-neutral-700">Your Mood Trends</h3>
        <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
          <button 
            className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600'}`}
            onClick={() => onChangeTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-sm ${timeRange === 'month' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-600'}`}
            onClick={() => onChangeTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-400)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-primary-100)" stopOpacity={0.2}/>
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
            <Line 
              type="monotone" dataKey="value" stroke="var(--color-primary-500)" 
              strokeWidth={2}
              dot={{ 
                r: 6, 
                stroke: 'white', 
                strokeWidth: 2,
                fill: ({ payload }) => getMoodColor(payload.mood)
              }} 
              activeDot={{ 
                r: 8, 
                stroke: 'white', 
                strokeWidth: 2,
                fill: ({ payload }) => getMoodColor(payload.mood)
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-2 px-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-happy mr-1"></div>
          <span className="body-small text-neutral-600">Happy</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-calm mr-1"></div>
          <span className="body-small text-neutral-600">Calm</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-anxious mr-1"></div>
          <span className="body-small text-neutral-600">Anxious</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-low mr-1"></div>
          <span className="body-small text-neutral-600">Low</span>
        </div>
      </div>
    </div>
  );
};

export default MoodTrends;