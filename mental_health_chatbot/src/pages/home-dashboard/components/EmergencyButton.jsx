import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const EmergencyButton = () => {
  return (
    <Link 
      to="/emergency-support" className="flex items-center justify-center p-4 bg-white rounded-xl shadow-md border border-error border-opacity-20 hover:shadow-lg transition-gentle"
    >
      <div className="w-10 h-10 rounded-full bg-error bg-opacity-10 flex items-center justify-center mr-3">
        <Icon name="LifeBuoy" size={20} color="var(--color-error)" />
      </div>
      <div>
        <p className="body-medium font-medium text-error">Need urgent help?</p>
        <p className="body-small text-neutral-600">Access emergency resources</p>
      </div>
    </Link>
  );
};

export default EmergencyButton;