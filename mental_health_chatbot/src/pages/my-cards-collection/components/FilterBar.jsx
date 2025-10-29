import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const FilterBar = ({ onFilterChange, onSearch, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const themes = [
    { id: "all", label: "All" },
    { id: "courage", label: "Courage" },
    { id: "calm", label: "Calm" },
    { id: "gratitude", label: "Gratitude" },
    { id: "motivation", label: "Motivation" },
    { id: "mindfulness", label: "Mindfulness" },
  ];
  
  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "alphabetical", label: "A-Z" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterClick = (themeId) => {
    onFilterChange(themeId);
    setShowFilters(false);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div className="relative flex-1 mr-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} className="text-neutral-400" />
          </div>
          <input
            type="text" placeholder="Search your cards..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:ring-primary-500 focus:ring-2 focus:border-primary-500 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-quick" aria-label="Filter cards"
        >
          <Icon name="Filter" size={20} className="text-neutral-600" />
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-neutral-200">
          <div className="mb-4">
            <h4 className="label-medium text-neutral-700 mb-2">Filter by Theme</h4>
            <div className="flex flex-wrap gap-2">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleFilterClick(theme.id)}
                  className="px-3 py-1 rounded-full text-sm bg-neutral-100 hover:bg-primary-100 transition-quick"
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="label-medium text-neutral-700 mb-2">Sort by</h4>
            <select
              onChange={handleSortChange}
              className="w-full p-2 rounded-lg border border-neutral-200 focus:ring-primary-500 focus:ring-2 focus:border-primary-500 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;