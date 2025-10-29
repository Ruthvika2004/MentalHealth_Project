import React from "react";
import ToolCard from "./ToolCard";

const CategorySection = ({ title, tools, onSelectTool, favorites, onToggleFavorite }) => {
  return (
    <div className="mb-8">
      <h2 className="heading-medium text-neutral-700 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            onSelect={onSelectTool}
            isFavorite={favorites.includes(tool.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;