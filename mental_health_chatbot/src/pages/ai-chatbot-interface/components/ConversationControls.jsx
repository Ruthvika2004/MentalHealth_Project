import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const ConversationControls = ({ onClearChat }) => {
  return (
    <div className="bg-white p-3 border-t border-b border-neutral-200 flex justify-end items-center">
      <div className="flex space-x-3">
        <button 
          onClick={onClearChat}
          className="flex items-center text-neutral-600 body-small"
        >
          <Icon name="RefreshCw" size={16} className="mr-1" />
          New chat
        </button>
        
        <Link 
          to="/emergency-support" className="flex items-center text-error body-small"
        >
          <Icon name="LifeBuoy" size={16} className="mr-1" />
          Emergency
        </Link>
      </div>
    </div>
  );
};

export default ConversationControls;