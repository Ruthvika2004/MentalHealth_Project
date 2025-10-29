import React from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RecentlyViewed = ({ recentItems, onViewItem }) => {
  if (recentItems.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="heading-small text-neutral-700">Recently Viewed</h3>
        <button className="text-primary-500 body-small flex items-center">
          See all <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="space-y-3">
        {recentItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => onViewItem(item)}
            className="flex items-center p-2 rounded-lg hover:bg-neutral-50 transition-quick cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="body-medium font-medium text-neutral-800 truncate">{item.title}</h4>
              <p className="body-small text-neutral-500 flex items-center">
                <Icon name="Clock" size={12} className="mr-1" />
                {item.readTime} min read
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-neutral-400 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;