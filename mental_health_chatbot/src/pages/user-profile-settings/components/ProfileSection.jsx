import React from "react";
import Icon from "../../../components/AppIcon";

const ProfileSection = ({ user, onEditProfile }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="relative">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-20 h-20 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80";
              }}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
              <Icon name="User" size={32} className="text-primary-600" />
            </div>
          )}
          <button 
            className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-1"
            onClick={onEditProfile}
          >
            <Icon name="Edit" size={16} />
          </button>
        </div>
        <div className="ml-4">
          <h2 className="heading-medium text-neutral-800">{user.name}</h2>
          <p className="body-medium text-neutral-500">Member since {user.joinDate}</p>
          <button 
            className="mt-2 flex items-center text-primary-500 body-medium font-medium"
            onClick={onEditProfile}
          >
            <Icon name="Edit2" size={16} className="mr-1" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;