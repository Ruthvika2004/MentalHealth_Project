import React from "react";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
        <Icon name="BookHeart" size={32} className="text-primary-500" />
      </div>
      <h3 className="heading-medium text-neutral-800 mb-2">Your collection is empty</h3>
      <p className="body-medium text-neutral-600 mb-6">
        Save motivational cards from your daily feed to build your personal collection of inspiration.
      </p>
      <Link 
        to="/home-dashboard" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white transition-gentle hover:bg-primary-600"
      >
        <Icon name="Home" size={18} className="mr-2" />
        Go to Dashboard
      </Link>
    </div>
  );
};

export default EmptyState;