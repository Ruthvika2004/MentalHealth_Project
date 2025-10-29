import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const SavedCardsGallery = ({ cards }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="heading-medium text-neutral-700">Saved Cards</h3>
        <Link to="/my-cards-collection" className="text-primary-500 flex items-center body-small">
          View All <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto pb-2 -mx-1">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="min-w-[200px] p-3 mx-1 bg-neutral-50 rounded-lg border border-neutral-200"
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: "var(--color-primary-100)" }}
              >
                <Icon name={card.icon} size={16} className="text-primary-600" />
              </div>
              <span className="body-medium font-medium text-neutral-700">{card.title}</span>
            </div>
            <p className="body-small text-neutral-600 line-clamp-3">{card.message}</p>
            <div className="mt-2 text-right">
              <span className="body-small text-neutral-500">{card.savedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCardsGallery;