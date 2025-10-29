import React from "react";
import Icon from "../../../components/AppIcon";

const WeeklyMoodSummary = ({ moodData }) => {
  const getMoodIcon = (mood) => {
    switch(mood) {
      case "Happy": return "Smile";
      case "Calm": return "Coffee";
      case "Anxious": return "Wind";
      case "Angry": return "Flame";
      case "Low": return "Cloud";
      default: return "HelpCircle";
    }
  };

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
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="heading-medium text-neutral-700">Weekly Mood Summary</h3>
        <button className="text-primary-500 flex items-center body-small">
          View Details
        </button>
      </div>
      
      <div className="flex justify-between">
        {moodData.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ backgroundColor: getMoodColor(day.mood) + "33" }}
            >
              <Icon 
                name={getMoodIcon(day.mood)} 
                size={20} 
                color={getMoodColor(day.mood)} 
              />
            </div>
            <span className="body-small text-neutral-600">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMoodSummary;