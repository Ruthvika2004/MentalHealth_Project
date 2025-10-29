import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MoodEntryForm = ({ selectedDate, selectedMood, onSave, onClose }) => {
  const [notes, setNotes] = useState("");

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    onSave({
      date: selectedDate,
      mood: selectedMood.label,
      moodId: selectedMood.id,
      notes: notes,
      color: selectedMood.color
    });
  };

  return (
    <div className="fixed inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="heading-medium text-neutral-800">Add Details</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-quick"
          >
            <Icon name="X" size={20} className="text-neutral-600" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="body-medium text-neutral-600">
            {formatDate(selectedDate)}
          </p>
          
          <div className="flex items-center mt-2 p-3 bg-neutral-50 rounded-lg">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: selectedMood.color + "33" }}
            >
              <Icon 
                name={selectedMood.icon} 
                size={24} 
                color={selectedMood.color} 
              />
            </div>
            <p className="body-medium font-medium text-neutral-800">{selectedMood.label}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block label-medium text-neutral-700 mb-2">
            What's on your mind? (optional)
          </label>
          <textarea
            id="notes" className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-primary-500 focus:ring-2 focus:outline-none h-32" placeholder="Add some notes about how you're feeling..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-neutral-100 text-neutral-700 transition-gentle hover:bg-neutral-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-2 rounded-lg bg-primary-500 text-white transition-gentle hover:bg-primary-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodEntryForm;