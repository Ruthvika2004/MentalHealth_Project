import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const EmergencySettings = ({ contacts, onAddContact, onRemoveContact, onUpdateContact }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  
  const handleAddContact = () => {
    onAddContact({
      ...newContact,
      id: Date.now().toString()
    });
    setNewContact({ name: "", phone: "", relationship: "" });
    setShowAddModal(false);
  };

  return (
    <div id="emergency">
      <h3 className="heading-small text-neutral-700 mb-4">Emergency Contacts</h3>
      
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={contact.id} className="p-3 bg-neutral-50 rounded-lg">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <Icon name="User" size={16} className="text-neutral-500 mr-2" />
                  <span className="body-medium font-medium text-neutral-800">{contact.name}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Icon name="Phone" size={16} className="text-neutral-500 mr-2" />
                  <span className="body-small text-neutral-600">{contact.phone}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Icon name="Heart" size={16} className="text-neutral-500 mr-2" />
                  <span className="body-small text-neutral-600">{contact.relationship}</span>
                </div>
              </div>
              <button 
                className="text-error"
                onClick={() => onRemoveContact(contact.id)}
              >
                <Icon name="Trash2" size={18} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          className="w-full p-3 flex items-center justify-center rounded-lg border border-dashed border-primary-300 text-primary-600 hover:bg-primary-50 transition-gentle"
          onClick={() => setShowAddModal(true)}
        >
          <Icon name="Plus" size={18} className="mr-2" />
          <span className="body-medium font-medium">Add Emergency Contact</span>
        </button>
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-80 max-w-full">
            <h3 className="heading-medium text-neutral-700 mb-4">Add Emergency Contact</h3>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block label-medium text-neutral-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Contact name"
                />
              </div>
              
              <div>
                <label className="block label-medium text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none" placeholder="Phone number"
                />
              </div>
              
              <div>
                <label className="block label-medium text-neutral-700 mb-1">Relationship</label>
                <select
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:ring-2 focus:outline-none"
                >
                  <option value="">Select relationship</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Therapist">Therapist</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="flex-1 p-2 rounded-lg border border-neutral-300 text-neutral-700"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className={`flex-1 p-2 rounded-lg ${
                  newContact.name && newContact.phone
                    ? 'bg-primary-500 text-white' :'bg-primary-200 text-white cursor-not-allowed'
                }`}
                onClick={handleAddContact}
                disabled={!newContact.name || !newContact.phone}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencySettings;