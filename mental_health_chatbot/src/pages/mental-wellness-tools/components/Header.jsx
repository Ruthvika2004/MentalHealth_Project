import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="display-small text-neutral-800">Mental Wellness Tools</h1>
        <p className="body-medium text-neutral-500">Interactive exercises for your wellbeing</p>
      </div>
      <Link 
        to="/home-dashboard" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
      >
        <Icon name="Home" size={20} className="text-neutral-600" />
      </Link>
    </header>
  );
};

export default Header;