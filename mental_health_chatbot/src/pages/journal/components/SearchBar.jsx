import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SearchBar = ({ onSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");

  const handleSearch = () => {
    onSearch(searchTerm, searchType);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="heading-small text-neutral-700">Search Journal</h3>
        <button 
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      <div className="flex items-center mb-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} className="text-neutral-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search entries..." className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-gentle"
        >
          Search
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSearchType("all")}
          className={`px-3 py-1 rounded-full text-sm ${
            searchType === "all" ?"bg-primary-500 text-white" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSearchType("content")}
          className={`px-3 py-1 rounded-full text-sm ${
            searchType === "content" ?"bg-primary-500 text-white" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setSearchType("tags")}
          className={`px-3 py-1 rounded-full text-sm ${
            searchType === "tags" ?"bg-primary-500 text-white" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Tags
        </button>
        <button
          onClick={() => setSearchType("mood")}
          className={`px-3 py-1 rounded-full text-sm ${
            searchType === "mood" ?"bg-primary-500 text-white" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Mood
        </button>
        <button
          onClick={() => setSearchType("date")}
          className={`px-3 py-1 rounded-full text-sm ${
            searchType === "date" ?"bg-primary-500 text-white" :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Date
        </button>
      </div>
    </div>
  );
};

export default SearchBar;