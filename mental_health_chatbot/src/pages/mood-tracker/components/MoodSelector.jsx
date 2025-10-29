import React from "react";
import Icon from "../../../components/AppIcon";

const MoodSelector = ({ onSelectMood, onClose, selectedDate }) => {
  const moods = [
    { id: "happy", label: "Happy", color: "var(--color-happy)", icon: "Smile", description: "Joyful, content, excited" },
    { id: "calm", label: "Calm", color: "var(--color-calm)", icon: "Coffee", description: "Peaceful, relaxed, centered" },
    { id: "anxious", label: "Anxious", color: "var(--color-anxious)", icon: "Wind", description: "Worried, tense, nervous" },
    { id: "angry", label: "Angry", color: "var(--color-angry)", icon: "Flame", description: "Frustrated, irritated, upset" },
    { id: "low", label: "Low", color: "var(--color-low)", icon: "Cloud", description: "Sad, tired, unmotivated" },
  ];

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="fixed inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="heading-medium text-neutral-800">How did you feel?</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-quick"
          >
            <Icon name="X" size={20} className="text-neutral-600" />
          </button>
        </div>
        
        <p className="body-medium text-neutral-600 mb-4">
          {formatDate(selectedDate)}
        </p>
        
        <div className="space-y-3 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className="w-full flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-gentle border border-neutral-200"
              onClick={() => onSelectMood(mood)}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: mood.color + "33" }}
              >
                <Icon 
                  name={mood.icon} 
                  size={24} 
                  color={mood.color} 
                />
              </div>
              <div className="text-left">
                <p className="body-medium font-medium text-neutral-800">{mood.label}</p>
                <p className="body-small text-neutral-500">{mood.description}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="pt-3 border-t border-neutral-200">
          <button 
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-neutral-100 text-neutral-700 transition-gentle hover:bg-neutral-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;