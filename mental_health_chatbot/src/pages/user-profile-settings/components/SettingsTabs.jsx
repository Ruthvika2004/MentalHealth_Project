import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SettingsTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState("account");
  
  const tabs = [
    { id: "account", label: "Account", icon: "User" },
    { id: "chatbot", label: "Chatbot", icon: "MessageSquare" },
    { id: "behavior", label: "Behavior", icon: "BarChart3" },
    { id: "privacy", label: "Privacy", icon: "Lock" },
    { id: "emergency", label: "Emergency", icon: "LifeBuoy" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-2 flex flex-col items-center transition-gentle ${
              activeTab === tab.id 
                ? "text-primary-600 border-b-2 border-primary-500" :"text-neutral-500 hover:bg-neutral-50"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              className={activeTab === tab.id ? "text-primary-600" : "text-neutral-500"} 
            />
            <span className="body-small mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4">
        {React.Children.map(children, (child) => {
          if (child.props.id === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SettingsTabs;