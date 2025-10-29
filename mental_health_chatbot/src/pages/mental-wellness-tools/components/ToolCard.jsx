import React from "react";
import Icon from "../../../components/AppIcon";

const ToolCard = ({ tool, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-gentle"
      onClick={() => onSelect(tool)}
    >
      <div className="flex justify-between items-start mb-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: tool.color + "20" }} // Light background
        >
          <Icon name={tool.icon} size={24} color={tool.color} />
        </div>
        <button 
          className="text-neutral-400 hover:text-happy transition-quick"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(tool.id);
          }}
        >
          <Icon 
            name={isFavorite ? "Star" : "StarOutline"} 
            size={20} 
            color={isFavorite ? "var(--color-happy)" : "currentColor"} 
          />
        </button>
      </div>
      <h3 className="heading-small text-neutral-800 mb-1">{tool.name}</h3>
      <p className="body-small text-neutral-500 mb-3">{tool.description}</p>
      <div className="flex items-center">
        <Icon name="Clock" size={14} className="text-neutral-400 mr-1" />
        <span className="body-small text-neutral-500">{tool.duration}</span>
      </div>
    </div>
  );
};

export default ToolCard;