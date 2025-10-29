import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PrivacyToggle = ({ isPrivate, onToggle, onPasscodeSet }) => {
  const [showPasscodeModal, setShowPasscodeModal] = React.useState(false);
  const [passcode, setPasscode] = React.useState("");
  const [confirmPasscode, setConfirmPasscode] = React.useState("");
  const [error, setError] = React.useState("");

  const handleToggle = () => {
    if (!isPrivate) {
      setShowPasscodeModal(true);
    } else {
      onToggle(false);
    }
  };

  const handlePasscodeSubmit = () => {
    if (passcode.length < 4) {
      setError("Passcode must be at least 4 digits");
      return;
    }
    
    if (passcode !== confirmPasscode) {
      setError("Passcodes don't match");
      return;
    }
    
    onPasscodeSet(passcode);
    onToggle(true);
    setShowPasscodeModal(false);
    setPasscode("");
    setConfirmPasscode("");
    setError("");
  };

  const handleCancel = () => {
    setShowPasscodeModal(false);
    setPasscode("");
    setConfirmPasscode("");
    setError("");
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            isPrivate ? "bg-primary-500" : "bg-neutral-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isPrivate ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center">
        <Icon 
          name={isPrivate ? "Lock" : "Unlock"} 
          size={16} 
          className={isPrivate ? "text-primary-500" : "text-neutral-500"} 
        />
        <span className={`body-small ml-1 ${isPrivate ? "text-primary-500 font-medium" : "text-neutral-500"}`}>
          {isPrivate ? "Private" : "Public"}
        </span>
      </div>

      {showPasscodeModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <h3 className="heading-medium text-neutral-800 mb-4">Set Journal Passcode</h3>
            <p className="body-small text-neutral-600 mb-4">
              This passcode will be required to view your private journal entries.
            </p>
            
            {error && (
              <div className="mb-4 p-2 bg-error bg-opacity-10 rounded-lg text-error body-small">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="label-medium text-neutral-700 mb-1 block">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Enter passcode"
              />
            </div>
            
            <div className="mb-6">
              <label className="label-medium text-neutral-700 mb-1 block">Confirm Passcode</label>
              <input
                type="password"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Confirm passcode"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 transition-gentle hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasscodeSubmit}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white transition-gentle hover:bg-primary-600"
              >
                Set Passcode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyToggle;