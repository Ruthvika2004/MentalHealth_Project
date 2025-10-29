import React from "react";
import Icon from "../../../components/AppIcon";

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  const moods = [
    { id: "happy", label: "Happy", color: "var(--color-happy)", icon: "Smile" },
    { id: "calm", label: "Calm", color: "var(--color-calm)", icon: "Coffee" },
    { id: "anxious", label: "Anxious", color: "var(--color-anxious)", icon: "Wind" },
    { id: "angry", label: "Angry", color: "var(--color-angry)", icon: "Flame" },
    { id: "low", label: "Low", color: "var(--color-low)", icon: "Cloud" },
  ];

  return (
    <div className="bg-white p-3 shadow-sm">
      <p className="body-small text-neutral-500 mb-2">How are you feeling right now?</p>
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className={`flex flex-col items-center p-2 rounded-lg transition-quick min-w-[60px] ${
              selectedMood === mood.id ? "bg-neutral-100" : "hover:bg-neutral-50"
            }`}
            onClick={() => onMoodSelect(mood.id)}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ backgroundColor: `${mood.color}33` }}
            >
              <Icon name={mood.icon} size={20} color={mood.color} />
            </div>
            <span className="body-small">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;