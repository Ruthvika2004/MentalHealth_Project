import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const PrivacySettings = ({ settings, onToggle, onUpdate }) => {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  
  const handleSavePasscode = () => {
    if (passcode.length === 4) {
      onUpdate('journalPasscode', passcode);
      setShowPasscodeModal(false);
    }
  };

  return (
    <div id="privacy">
      <h3 className="heading-small text-neutral-700 mb-4">Privacy Controls</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="block label-medium text-neutral-700">Journal Passcode</label>
              <p className="body-small text-neutral-500">Protect your journal entries</p>
            </div>
            <button 
              className={`w-12 h-6 rounded-full flex items-center transition-gentle ${
                settings.journalPasscodeEnabled ? 'bg-primary-500 justify-end' : 'bg-neutral-300 justify-start'
              }`}
              onClick={() => {
                if (!settings.journalPasscodeEnabled) {
                  setShowPasscodeModal(true);
                } else {
                  onToggle('journalPasscodeEnabled');
                }
              }}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm mx-0.5"></span>
            </button>
          </div>
          {settings.journalPasscodeEnabled && (
            <button 
              className="mt-2 text-primary-500 body-small font-medium"
              onClick={() => setShowPasscodeModal(true)}
            >
              Change passcode
            </button>
          )}
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <label className="block label-medium text-neutral-700">Data Anonymization</label>
              <p className="body-small text-neutral-500">Remove personal identifiers from analytics</p>
            </div>
            <button 
              className={`w-12 h-6 rounded-full flex items-center transition-gentle ${
                settings.dataAnonymization ? 'bg-primary-500 justify-end' : 'bg-neutral-300 justify-start'
              }`}
              onClick={() => onToggle('dataAnonymization')}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow-sm mx-0.5"></span>
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-2">Data Retention</label>
          <select
            value={settings.dataRetention}
            onChange={(e) => onUpdate('dataRetention', e.target.value)}
            className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none"
          >
            <option value="1month">1 Month</option>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
            <option value="forever">Keep Forever</option>
          </select>
          <p className="body-small text-neutral-500 mt-1">How long to keep your mood and journal data</p>
        </div>
        
        <button className="w-full p-3 text-error flex items-center justify-center rounded-lg border border-error border-opacity-20 hover:bg-error hover:bg-opacity-5 transition-gentle">
          <Icon name="Trash2" size={16} className="mr-2" />
          <span className="body-medium font-medium">Delete All My Data</span>
        </button>
      </div>
      
      {showPasscodeModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-80 max-w-full">
            <h3 className="heading-medium text-neutral-700 mb-4">Set Journal Passcode</h3>
            <p className="body-small text-neutral-600 mb-4">Enter a 4-digit passcode to protect your journal entries</p>
            
            <div className="flex justify-center space-x-2 mb-4">
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index}
                  className="w-12 h-12 border-2 rounded-lg flex items-center justify-center text-lg font-medium"
                  style={{ 
                    borderColor: passcode.length > index ? 'var(--color-primary-500)' : 'var(--color-neutral-300)',
                    backgroundColor: passcode.length > index ? 'var(--color-primary-50)' : 'transparent'
                  }}
                >
                  {passcode.length > index ? '•' : ''}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'delete'].map((num, index) => (
                <button
                  key={index}
                  className={`w-full h-12 rounded-lg flex items-center justify-center ${
                    num === null 
                      ? 'invisible' : num ==='delete' ?'text-neutral-700' :'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                  }`}
                  onClick={() => {
                    if (num === 'delete') {
                      setPasscode(prev => prev.slice(0, -1));
                    } else if (num !== null && passcode.length < 4) {
                      setPasscode(prev => prev + num);
                    }
                  }}
                >
                  {num === 'delete' ? <Icon name="Delete" size={20} /> : num}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="flex-1 p-2 rounded-lg border border-neutral-300 text-neutral-700"
                onClick={() => setShowPasscodeModal(false)}
              >
                Cancel
              </button>
              <button 
                className={`flex-1 p-2 rounded-lg ${
                  passcode.length === 4 
                    ? 'bg-primary-500 text-white' :'bg-primary-200 text-white cursor-not-allowed'
                }`}
                onClick={handleSavePasscode}
                disabled={passcode.length !== 4}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;