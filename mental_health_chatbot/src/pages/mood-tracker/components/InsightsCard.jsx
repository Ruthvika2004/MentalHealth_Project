import React from "react";
import Icon from "../../../components/AppIcon";

const InsightsCard = ({ insights }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
          <Icon name="Lightbulb" size={20} className="text-primary-600" />
        </div>
        <h3 className="heading-small text-neutral-700">Mood Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="p-3 bg-neutral-50 rounded-lg"
          >
            <p className="body-medium text-neutral-700">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsCard;