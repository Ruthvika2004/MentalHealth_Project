import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Link 
          to="/home-dashboard" className="mr-3 p-2 rounded-full hover:bg-neutral-100 transition-quick"
        >
          <Icon name="ChevronLeft" size={20} className="text-neutral-600" />
        </Link>
        <h1 className="display-small text-neutral-800">Mood Tracker</h1>
      </div>
      <Link 
        to="/user-profile-settings" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
      >
        <Icon name="User" size={20} className="text-neutral-600" />
      </Link>
    </header>
  );
};

export default Header;