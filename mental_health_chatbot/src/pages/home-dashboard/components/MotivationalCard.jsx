import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const MotivationalCard = ({ card, onSave, onDiscard }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isDiscarded, setIsDiscarded] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSave(card);
  };

  const handleDiscard = () => {
    setIsDiscarded(true);
    onDiscard(card);
  };

  if (isDiscarded) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <Icon name="Check" size={32} className="mx-auto mb-3 text-success" />
        <p className="body-medium text-neutral-600 mb-4">Card discarded. We'll show you a new one tomorrow.</p>
        <button 
          onClick={() => setIsDiscarded(false)} 
          className="text-primary-500 body-medium font-medium"
        >
          Undo
        </button>
      </div>
    );
  }

  if (isSaved) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <Icon name="Check" size={32} className="mx-auto mb-3 text-success" />
        <p className="body-medium text-neutral-600 mb-4">Card saved to your collection!</p>
        <Link 
          to="/my-cards-collection" className="text-primary-500 body-medium font-medium flex items-center justify-center"
        >
          View collection <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      <div className="absolute top-3 right-3 text-neutral-400 body-small">
        Daily Card
      </div>
      
      <div className="mb-4 text-center">
        <div 
          className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4"
        >
          <Icon name={card.icon} size={32} className="text-primary-600" />
        </div>
        <h3 className="heading-medium text-neutral-800 mb-2">{card.title}</h3>
      </div>
      
      <p className="quote text-neutral-700 text-center mb-6 px-4">{card.message}</p>
      
      <div className="flex justify-center space-x-3">
        <button 
          onClick={handleDiscard}
          className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 flex items-center transition-gentle hover:bg-neutral-50"
        >
          <Icon name="X" size={16} className="mr-2" />
          Discard
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center transition-gentle hover:bg-primary-600"
        >
          <Icon name="Save" size={16} className="mr-2" />
          Save
        </button>
      </div>
    </div>
  );
};

export default MotivationalCard;