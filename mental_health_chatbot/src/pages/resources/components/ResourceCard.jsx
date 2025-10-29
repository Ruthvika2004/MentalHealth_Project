import React from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ResourceCard = ({ resource, onSave, onView }) => {
  const getDifficultyIcons = (level) => {
    const icons = [];
    for (let i = 0; i < 3; i++) {
      icons.push(
        <Icon 
          key={i}
          name="Circle" 
          size={12} 
          className={i < level ? "text-primary-500" : "text-neutral-300"}
        />
      );
    }
    return icons;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-gentle hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <Image 
          src={resource.imageUrl} 
          alt={resource.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={() => onSave(resource)}
            className="w-8 h-8 rounded-full bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center transition-quick hover:bg-opacity-100"
          >
            <Icon 
              name={resource.isSaved ? "Bookmark" : "BookmarkPlus"} 
              size={16} 
              className={resource.isSaved ? "text-primary-500" : "text-neutral-600"}
            />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Icon name="Clock" size={12} className="text-neutral-600 mr-1" />
          <span className="body-small text-neutral-700">{resource.readTime} min</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block bg-primary-100 text-primary-600 rounded-full px-2 py-1 body-small">
            {resource.category}
          </span>
          <div className="flex space-x-1">
            {getDifficultyIcons(resource.difficulty)}
          </div>
        </div>
        
        <h3 className="heading-medium text-neutral-800 mb-1">{resource.title}</h3>
        <p className="body-small text-neutral-600 mb-3 line-clamp-2">{resource.description}</p>
        
        <button 
          onClick={() => onView(resource)}
          className="w-full py-2 rounded-lg border border-primary-500 text-primary-600 flex items-center justify-center transition-gentle hover:bg-primary-50"
        >
          <span className="body-medium font-medium">Read More</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;