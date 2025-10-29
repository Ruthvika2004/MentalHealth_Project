import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SearchBar = ({ onSearch, suggestedKeywords }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (keyword) => {
    setSearchTerm(keyword);
    onSearch(keyword);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for resources..."
          className="w-full py-3 pl-10 pr-4 rounded-xl border border-neutral-200 focus:ring-primary-500 focus:ring-2 focus:border-primary-500 focus:outline-none"
        />
        <button
          type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
        >
          <Icon name="Search" size={18} />
        </button>
      </form>

      {showSuggestions && suggestedKeywords.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-200 py-2">
          <p className="px-4 py-1 body-small text-neutral-500">Suggested keywords:</p>
          <div className="max-h-48 overflow-y-auto">
            {suggestedKeywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(keyword)}
                className="w-full text-left px-4 py-2 body-medium hover:bg-neutral-50 transition-quick"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;