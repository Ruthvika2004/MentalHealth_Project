import React from "react";
import Icon from "../../../components/AppIcon";

const UsageStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <h3 className="heading-small text-neutral-700 mb-3">Your Progress</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={20} className="text-primary-600" />
          </div>
          <p className="heading-medium text-neutral-800">{stats.streak}</p>
          <p className="body-small text-neutral-500">Day streak</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-calm bg-opacity-10 flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={20} className="text-calm" />
          </div>
          <p className="heading-medium text-neutral-800">{stats.totalMinutes}</p>
          <p className="body-small text-neutral-500">Minutes</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-happy bg-opacity-10 flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={20} className="text-happy" />
          </div>
          <p className="heading-medium text-neutral-800">{stats.completedSessions}</p>
          <p className="body-small text-neutral-500">Sessions</p>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;