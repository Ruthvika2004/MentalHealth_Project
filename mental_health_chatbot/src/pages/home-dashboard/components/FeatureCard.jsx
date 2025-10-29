import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const FeatureCard = ({ title, description, icon, color, route }) => {
  return (
    <Link 
      to={route} 
      className="block bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-gentle"
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: color + "20" }} // Light background
      >
        <Icon name={icon} size={24} color={color} />
      </div>
      <h3 className="heading-small text-neutral-800 mb-1">{title}</h3>
      <p className="body-small text-neutral-500">{description}</p>
    </Link>
  );
};

export default FeatureCard;