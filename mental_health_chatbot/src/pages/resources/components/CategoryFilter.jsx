import React from "react";
import Icon from "../../../components/AppIcon";

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-6 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-2 pb-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-full body-medium transition-gentle ${
            activeCategory === "all" ?"bg-primary-500 text-white" :"bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
          }`}
        >
          All Resources
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full body-medium transition-gentle flex items-center ${
              activeCategory === category.id
                ? "bg-primary-500 text-white" :"bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            <Icon name={category.icon} size={16} className="mr-1" />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;