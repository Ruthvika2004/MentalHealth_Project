import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const CardItem = ({ card, onRemove, onFavorite, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md transition-gentle ${isExpanded ? 'transform scale-105 z-10' : ''}`}
      onClick={toggleExpand}
    >
      <div className="p-5">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
          style={{ backgroundColor: card.color + "20" }}
        >
          <Icon name={card.icon} size={24} color={card.color} />
        </div>
        <h3 className="heading-small text-neutral-800 mb-2">{card.title}</h3>
        <p className="quote text-neutral-700 mb-4">{card.message}</p>
        
        <div className="flex justify-between items-center">
          <span className="body-small text-neutral-500">
            Saved {formatDate(card.dateSaved)}
          </span>
          {card.isFavorite && (
            <Icon name="Star" size={16} className="text-warning" />
          )}
        </div>
      </div>
      
      <div className="border-t border-neutral-100 p-3 flex justify-between">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(card.id);
          }}
          className="p-2 rounded-lg hover:bg-neutral-50 transition-quick" aria-label={card.isFavorite ?"Remove from favorites" : "Add to favorites"}
        >
          <Icon 
            name={card.isFavorite ? "Star" : "StarOutline"} 
            size={18} 
            className={card.isFavorite ? "text-warning" : "text-neutral-400"} 
          />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onShare(card.id);
          }}
          className="p-2 rounded-lg hover:bg-neutral-50 transition-quick" aria-label="Share card"
        >
          <Icon name="Share2" size={18} className="text-neutral-400" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(card.id);
          }}
          className="p-2 rounded-lg hover:bg-neutral-50 transition-quick" aria-label="Remove card"
        >
          <Icon name="Trash2" size={18} className="text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default CardItem;