import React from "react";
import Icon from "../../../components/AppIcon";

const DailyQuote = ({ quote, onSave }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative mb-6">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => onSave(quote)}
          className="text-neutral-400 hover:text-primary-500 transition-quick"
        >
          <Icon name={quote.isSaved ? "Bookmark" : "BookmarkPlus"} size={20} />
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
          <Icon name="Quote" size={20} className="text-primary-600" />
        </div>
        <div>
          <h3 className="heading-small text-neutral-800">Daily Inspiration</h3>
          <p className="body-small text-neutral-500">Refresh your mind</p>
        </div>
      </div>
      
      <blockquote className="quote text-neutral-700 mb-3 px-2">
        "{quote.text}"
      </blockquote>
      
      <p className="body-small text-neutral-600 text-right">— {quote.author}</p>
    </div>
  );
};

export default DailyQuote;