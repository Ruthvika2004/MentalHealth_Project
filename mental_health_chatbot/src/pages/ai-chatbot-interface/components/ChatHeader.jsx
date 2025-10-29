import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ChatHeader = ({ userName }) => {
  return (
    <header className="bg-white shadow-sm p-4 rounded-t-xl flex justify-between items-center">
      <Link to="/home-dashboard" className="flex items-center text-neutral-600">
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        <span className="body-medium">Back</span>
      </Link>
      <h1 className="heading-medium text-neutral-800">AI Companion</h1>
      <Link to="/user-profile-settings" className="text-neutral-600">
        <Icon name="Settings" size={20} />
      </Link>
    </header>
  );
};

export default ChatHeader;