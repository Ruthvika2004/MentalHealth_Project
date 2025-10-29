import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const TagInput = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  const handleAddTag = () => {
    if (inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-neutral-200 bg-white">
      <div className="flex items-center mr-1">
        <Icon name="Tag" size={16} className="text-neutral-500 mr-1" />
        <span className="body-small text-neutral-500">Tags:</span>
      </div>
      
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="flex items-center bg-primary-100 text-primary-700 rounded-full px-2 py-1"
        >
          <span className="body-small">{tag}</span>
          <button 
            onClick={() => onRemoveTag(index)}
            className="ml-1 text-primary-500 hover:text-primary-700"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      
      <div className="flex-1 min-w-[120px]">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Add tag..." className="w-full body-small py-1 px-2 border-none focus:ring-0 focus:outline-none bg-transparent"
          />
          {inputValue && (
            <button
              onClick={handleAddTag}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-primary-500"
            >
              <Icon name="Plus" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagInput;