import React from "react";
import Icon from "../../../components/AppIcon";

const JournalEntryCard = ({ entry, onSelect, isSelected }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getMoodIcon = (moodId) => {
    switch(moodId) {
      case 'happy': return 'Smile';
      case 'calm': return 'Coffee';
      case 'anxious': return 'Wind';
      case 'angry': return 'Flame';
      case 'low': return 'Cloud';
      default: return 'HelpCircle';
    }
  };

  const getMoodColor = (moodId) => {
    switch(moodId) {
      case 'happy': return 'var(--color-happy)';
      case 'calm': return 'var(--color-calm)';
      case 'anxious': return 'var(--color-anxious)';
      case 'angry': return 'var(--color-angry)';
      case 'low': return 'var(--color-low)';
      default: return 'var(--color-neutral-400)';
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-4 mb-3 border-l-4 cursor-pointer transition-gentle hover:shadow-md ${
        isSelected ? 'border-primary-500' : `border-${entry.mood.id}`
      }`}
      style={{ borderLeftColor: isSelected ? 'var(--color-primary-500)' : getMoodColor(entry.mood.id) }}
      onClick={() => onSelect(entry.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
            style={{ backgroundColor: getMoodColor(entry.mood.id) + '33' }}
          >
            <Icon 
              name={getMoodIcon(entry.mood.id)} 
              size={16} 
              color={getMoodColor(entry.mood.id)} 
            />
          </div>
          <div>
            <p className="body-medium font-medium text-neutral-800">{formatDate(entry.date)}</p>
            <p className="body-small text-neutral-500">{formatTime(entry.date)}</p>
          </div>
        </div>
        {entry.isPrivate && (
          <div className="flex items-center text-primary-500">
            <Icon name="Lock" size={14} />
            <span className="body-small ml-1">Private</span>
          </div>
        )}
      </div>
      
      <p className="body-medium text-neutral-700 mb-2">{truncateContent(entry.content)}</p>
      
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {entry.tags.map((tag, index) => (
            <span 
              key={index} 
              className="body-small bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalEntryCard;