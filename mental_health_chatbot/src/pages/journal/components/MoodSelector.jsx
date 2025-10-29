import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const moods = [
    { id: "happy", label: "Happy", color: "var(--color-happy)", icon: "Smile" },
    { id: "calm", label: "Calm", color: "var(--color-calm)", icon: "Coffee" },
    { id: "anxious", label: "Anxious", color: "var(--color-anxious)", icon: "Wind" },
    { id: "angry", label: "Angry", color: "var(--color-angry)", icon: "Flame" },
    { id: "low", label: "Low", color: "var(--color-low)", icon: "Cloud" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (mood) => {
    onMoodSelect(mood);
    setIsOpen(false);
  };

  const currentMood = moods.find(m => m.id === selectedMood.id) || moods[0];

  return (
    <div className="relative">
      <button
        className="flex items-center p-2 rounded-lg border border-neutral-200 bg-white"
        onClick={toggleDropdown}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
          style={{ backgroundColor: currentMood.color + "33" }}
        >
          <Icon 
            name={currentMood.icon} 
            size={18} 
            color={currentMood.color} 
          />
        </div>
        <span className="body-medium text-neutral-700 mr-2">{currentMood.label}</span>
        <Icon name="ChevronDown" size={16} className="text-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-md p-2 z-10 border border-neutral-200 w-48">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className="flex items-center w-full p-2 rounded-lg hover:bg-neutral-50 transition-quick"
              onClick={() => handleSelect(mood)}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: mood.color + "33" }}
              >
                <Icon name={mood.icon} size={18} color={mood.color} />
              </div>
              <span className="body-medium text-neutral-700">{mood.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;