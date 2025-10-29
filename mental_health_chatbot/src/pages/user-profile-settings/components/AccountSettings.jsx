import React from "react";


const AccountSettings = ({ settings, onToggle, onUpdate }) => {
  return (
    <div id="account">
      <h3 className="heading-small text-neutral-700 mb-4">Account Settings</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-1">Email Address</label>
          <div className="flex">
            <input
              type="email"
              value={settings.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Your email address"
            />
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="block label-medium text-neutral-700">Daily Reminders</label>
              <p className="body-small text-neutral-500">Receive daily check-in reminders</p>
            </div>
            <button 
              className={`w-12 h-6 rounded-full flex items-center transition-gentle ${
                settings.dailyReminders ? 'bg-primary-500 justify-end' : 'bg-neutral-300 justify-start'
              }`}
              onClick={() => onToggle('dailyReminders')}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm mx-0.5"></span>
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="block label-medium text-neutral-700">Weekly Reports</label>
              <p className="body-small text-neutral-500">Get weekly mood summary reports</p>
            </div>
            <button 
              className={`w-12 h-6 rounded-full flex items-center transition-gentle ${
                settings.weeklyReports ? 'bg-primary-500 justify-end' : 'bg-neutral-300 justify-start'
              }`}
              onClick={() => onToggle('weeklyReports')}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm mx-0.5"></span>
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-1">Notification Time</label>
          <input
            type="time"
            value={settings.notificationTime}
            onChange={(e) => onUpdate('notificationTime', e.target.value)}
            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none"
          />
          <p className="body-small text-neutral-500 mt-1">Time for daily check-in reminders</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;