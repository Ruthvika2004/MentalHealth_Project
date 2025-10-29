import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const EmergencyBanner = ({ onClose }) => {
  return (
    <div className="bg-error bg-opacity-10 p-3 rounded-lg mb-4">
      <div className="flex items-start">
        <Icon name="AlertCircle" size={20} className="text-error mr-2 mt-0.5" />
        <div className="flex-1">
          <p className="body-medium text-neutral-800 mb-1">
            If you're experiencing a crisis or emergency, please reach out for immediate help.
          </p>
          <Link 
            to="/emergency-support" className="inline-flex items-center bg-error text-white px-3 py-1.5 rounded-lg body-small mr-2"
          >
            <Icon name="LifeBuoy" size={14} className="mr-1" />
            Emergency Resources
          </Link>
        </div>
        <button onClick={onClose} className="text-neutral-500">
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default EmergencyBanner;