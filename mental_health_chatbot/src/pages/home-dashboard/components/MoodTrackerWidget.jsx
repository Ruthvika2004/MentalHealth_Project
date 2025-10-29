import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import { MoodIllustration } from "../../../components/Illustrations";

const MoodTrackerWidget = ({ currentMood, onMoodUpdate }) => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const moods = [
    { id: "happy", label: "Happy", color: "var(--color-happy)", icon: "Smile" },
    { id: "calm", label: "Calm", color: "var(--color-calm)", icon: "Coffee" },
    { id: "anxious", label: "Anxious", color: "var(--color-anxious)", icon: "Wind" },
    { id: "angry", label: "Angry", color: "var(--color-angry)", icon: "Flame" },
    { id: "low", label: "Low", color: "var(--color-low)", icon: "Cloud" },
  ];

  const handleMoodSelect = (mood) => {
    onMoodUpdate(mood);
    setShowMoodSelector(false);
  };

  const getCurrentMoodIcon = () => {
    const mood = moods.find(m => m.id === currentMood.id);
    return mood ? mood.icon : "HelpCircle";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="heading-medium text-neutral-700">How are you feeling?</h3>
        <Link to="/mood-tracker" className="text-primary-500 flex items-center">
          <span className="body-small mr-1">History</span>
          <Icon name="ChevronRight" size={16} />
        </Link>
      </div>
      
      {/* Mood Illustration */}
      <div className="mb-4 flex justify-center">
        <MoodIllustration mood={currentMood.id} />
      </div>

      <div 
        className="flex items-center p-3 bg-neutral-50 rounded-lg cursor-pointer transition-gentle"
        onClick={() => setShowMoodSelector(!showMoodSelector)}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: currentMood.color + "33" }} // Adding transparency
        >
          <Icon 
            name={getCurrentMoodIcon()} 
            size={24} 
            color={currentMood.color} 
          />
        </div>
        <div>
          <p className="body-medium font-medium text-neutral-800">{currentMood.label}</p>
          <p className="body-small text-neutral-500">Updated {currentMood.time}</p>
        </div>
        <Icon name="ChevronDown" size={20} className="ml-auto text-neutral-400" />
      </div>

      {showMoodSelector && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg p-3 z-10 border border-neutral-200">
          <p className="label-medium text-neutral-600 mb-2">Select your current mood:</p>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-neutral-50 transition-quick"
                onClick={() => handleMoodSelect({
                  id: mood.id,
                  label: mood.label,
                  color: mood.color,
                  time: "Just now"
                })}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ backgroundColor: mood.color + "33" }}
                >
                  <Icon name={mood.icon} size={20} color={mood.color} />
                </div>
                <span className="body-small">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerWidget;