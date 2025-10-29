import React from "react";
import Icon from "../../../components/AppIcon";

const QuickAddButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center hover:bg-primary-600 transition-gentle"
      aria-label="Quick add mood"
    >
      <Icon name="Plus" size={24} />
    </button>
  );
};

export default QuickAddButton;