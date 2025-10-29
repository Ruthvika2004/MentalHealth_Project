import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center mb-6">
      <Link to="/home-dashboard" className="mr-4">
        <Icon name="ArrowLeft" size={24} className="text-neutral-600" />
      </Link>
      <div>
        <h1 className="display-small text-neutral-800">Profile & Settings</h1>
        <p className="body-medium text-neutral-500">Customize your experience</p>
      </div>
    </div>
  );
};

export default ProfileHeader;