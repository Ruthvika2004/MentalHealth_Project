import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ResourceDetail = ({ resource, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="relative h-48">
          <Image 
            src={resource.imageUrl} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center transition-quick hover:bg-opacity-100"
          >
            <Icon name="X" size={16} className="text-neutral-600" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-block bg-primary-100 text-primary-600 rounded-full px-3 py-1 body-small">
              {resource.category}
            </span>
            <div className="flex items-center">
              <Icon name="Clock" size={14} className="text-neutral-500 mr-1" />
              <span className="body-small text-neutral-500">{resource.readTime} min read</span>
            </div>
          </div>
          
          <h2 className="heading-medium text-neutral-800 mb-4">{resource.title}</h2>
          
          <div className="prose prose-sm max-w-none text-neutral-700 mb-6">
            {resource.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {resource.tips && (
            <div className="bg-primary-50 rounded-lg p-4 mb-6">
              <h3 className="heading-small text-neutral-800 mb-2">Quick Tips</h3>
              <ul className="space-y-2">
                {resource.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <Icon name="CheckCircle" size={16} className="text-primary-500 mt-0.5 mr-2" />
                    <span className="body-medium text-neutral-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-neutral-200 flex justify-between">
          <button 
            onClick={() => onSave(resource)}
            className="px-4 py-2 rounded-lg border border-primary-500 text-primary-600 flex items-center transition-gentle hover:bg-primary-50"
          >
            <Icon 
              name={resource.isSaved ? "Bookmark" : "BookmarkPlus"} 
              size={18} 
              className="mr-2" 
            />
            {resource.isSaved ? "Saved" : "Save for Later"}
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 transition-gentle hover:bg-neutral-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;