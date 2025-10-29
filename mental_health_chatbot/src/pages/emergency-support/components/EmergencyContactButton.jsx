import React from "react";
import Icon from "../../../components/AppIcon";

const EmergencyContactButton = ({ icon, label, action, color = "white" }) => {
  return (
    <button
      onClick={action}
      className="w-full bg-white bg-opacity-20 rounded-xl p-6 flex flex-col items-center justify-center transition-gentle hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
    >
      <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-3">
        <Icon name={icon} size={32} color={color} />
      </div>
      <span className="heading-medium text-white text-center">{label}</span>
    </button>
  );
};

export default EmergencyContactButton;