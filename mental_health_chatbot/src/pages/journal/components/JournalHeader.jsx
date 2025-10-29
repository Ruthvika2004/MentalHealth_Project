import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const JournalHeader = ({ toggleSearch }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="display-small text-neutral-800">Journal</h1>
        <p className="body-medium text-neutral-500">Express your thoughts and feelings</p>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={toggleSearch}
          className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
        >
          <Icon name="Search" size={20} className="text-neutral-600" />
        </button>
        <Link 
          to="/home-dashboard" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
        >
          <Icon name="Home" size={20} className="text-neutral-600" />
        </Link>
      </div>
    </header>
  );
};

export default JournalHeader;