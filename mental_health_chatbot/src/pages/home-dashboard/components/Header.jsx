import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = ({ userName }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="display-small text-neutral-800">Hello, {userName}</h1>
        <p className="body-medium text-neutral-500">How are you feeling today?</p>
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