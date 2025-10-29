import React from "react";
import Icon from "../../../components/AppIcon";

const ReflectionPrompt = ({ entry, onClose }) => {
  const getTimeDifference = (dateString) => {
    const entryDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 7) {
      return "this week";
    } else if (diffInDays < 30) {
      return "this month";
    } else if (diffInDays < 90) {
      return "in the last few months";
    } else {
      return "since then";
    }
  };

  const getReflectionPrompt = (entry) => {
    const timeFrame = getTimeDifference(entry.date);
    const moodBasedPrompts = {
      happy: [
        `Looking back at this happy moment, what can you carry forward into today?`,
        `What contributed to your happiness ${timeFrame}? How can you recreate those conditions?`
      ],
      calm: [
        `Reflect on what brought you this sense of calm. How might you find that peace again today?`,
        `What practices helped you maintain balance ${timeFrame}?`
      ],
      anxious: [
        `How have you grown in managing anxiety ${timeFrame}?`,
        `What would you tell your past self about this worry now?`
      ],
      angry: [
        `Looking back, what perspective have you gained on this situation ${timeFrame}?`,
        `How have you channeled this energy differently ${timeFrame}?`
      ],
      low: [
        `What small steps have helped you move forward ${timeFrame}?`,
        `What would you say to comfort your past self now?`
      ]
    };
    
    const defaultPrompts = [
      `How have your thoughts on this evolved ${timeFrame}?`,
      `What growth do you notice in yourself ${timeFrame}?`
    ];
    
    const prompts = moodBasedPrompts[entry.mood.id] || defaultPrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="bg-primary-50 rounded-xl p-4 mb-6 border-l-4 border-primary-300">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
            <Icon name="Lightbulb" size={18} className="text-primary-600" />
          </div>
          <div>
            <h4 className="heading-small text-primary-700 mb-1">Reflection</h4>
            <p className="body-medium text-primary-800">
              {getReflectionPrompt(entry)}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-primary-400 hover:text-primary-600"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ReflectionPrompt;