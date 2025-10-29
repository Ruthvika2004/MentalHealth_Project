import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Components
import BreathingExercise from "./components/BreathingExercise";
import EmergencyContactButton from "./components/EmergencyContactButton";
import ReassuranceMessage from "./components/ReassuranceMessage";
import SoundControl from "./components/SoundControl";
import GuidedExerciseModal from "./components/GuidedExerciseModal";

const EmergencySupport = () => {
  const [showGuidedExercise, setShowGuidedExercise] = useState(false);
  const [pulseBackground, setPulseBackground] = useState(true);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  // Mock emergency contacts
  const emergencyContacts = [
    { id: 1, name: "National Crisis Hotline", number: "1-800-273-8255" },
    { id: 2, name: "Crisis Text Line", number: "Text HOME to 741741" },
    { id: 3, name: "Suicide Prevention Lifeline", number: "988" }
  ];

  // Mock trusted contacts
  const trustedContacts = [
    { id: 1, name: "Sarah (Friend)", number: "555-123-4567" },
    { id: 2, name: "Mom", number: "555-987-6543" },
    { id: 3, name: "Therapist", number: "555-456-7890" }
  ];

  useEffect(() => {
    // Set document background color
    document.body.style.backgroundColor = "var(--color-primary-600)";
    
    // Restore original background on unmount
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleCallHelpline = () => {
    setShowCallOptions(true);
  };

  const handleTextCrisisLine = () => {
    // In a real app, this would integrate with SMS or messaging
    alert("In a real app, this would open your messaging app with the crisis text line number pre-filled.");
  };

  const handleContactTrusted = () => {
    setShowContactOptions(true);
  };

  const handleGuidedExercise = () => {
    setShowGuidedExercise(true);
  };

  const simulateCall = (contact) => {
    alert(`In a real app, this would call ${contact.name} at ${contact.number}`);
    setShowCallOptions(false);
    setShowContactOptions(false);
  };

  return (
    <div 
      className={`min-h-screen bg-primary-600 ${pulseBackground ? 'animate-pulse' : ''} transition-gentle`}
    >
      <div className="max-w-xl mx-auto px-4 py-8 relative">
        {/* Sound control */}
        <SoundControl />
        
        {/* Back button */}
        <Link 
          to="/home-dashboard" className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center transition-gentle hover:bg-opacity-30" aria-label="Return to home"
        >
          <Icon name="ArrowLeft" size={24} color="white" />
        </Link>
        
        {/* Main content */}
        <div className="pt-16">
          {/* Reassurance messages */}
          <ReassuranceMessage />
          
          {/* Breathing exercise */}
          <div className="mb-8">
            <BreathingExercise />
          </div>
          
          {/* Emergency contact options */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <EmergencyContactButton 
              icon="Phone" label="Call Helpline" 
              action={handleCallHelpline} 
            />
            <EmergencyContactButton 
              icon="MessageSquare" label="Text Crisis Line" 
              action={handleTextCrisisLine} 
            />
            <EmergencyContactButton 
              icon="Users" label="Contact Trusted Person" 
              action={handleContactTrusted} 
            />
            <EmergencyContactButton 
              icon="Heart" label="Guided Calming Exercise" 
              action={handleGuidedExercise} 
            />
          </div>
          
          {/* I'm feeling better button */}
          <div className="text-center">
            <Link 
              to="/home-dashboard" className="inline-block px-8 py-4 rounded-xl bg-white text-primary-600 heading-medium transition-gentle hover:shadow-lg"
            >
              I'm Feeling Better
            </Link>
            <button 
              onClick={() => setPulseBackground(!pulseBackground)}
              className="block mx-auto mt-4 text-white text-opacity-80 body-small"
            >
              {pulseBackground ? "Stop" : "Start"} breathing guide
            </button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {showGuidedExercise && (
        <GuidedExerciseModal onClose={() => setShowGuidedExercise(false)} />
      )}
      
      {showCallOptions && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-primary-600 rounded-2xl p-6 max-w-md w-full">
            <button 
              onClick={() => setShowCallOptions(false)}
              className="absolute top-4 right-4 text-white"
            >
              <Icon name="X" size={24} />
            </button>
            <h2 className="heading-large text-white mb-6 text-center">Call Helpline</h2>
            <div className="space-y-3">
              {emergencyContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => simulateCall(contact)}
                  className="w-full bg-white bg-opacity-20 rounded-xl p-4 flex items-center transition-gentle hover:bg-opacity-30 text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Icon name="Phone" size={24} color="white" />
                  </div>
                  <div>
                    <p className="heading-small text-white">{contact.name}</p>
                    <p className="body-medium text-white text-opacity-80">{contact.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {showContactOptions && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-primary-600 rounded-2xl p-6 max-w-md w-full">
            <button 
              onClick={() => setShowContactOptions(false)}
              className="absolute top-4 right-4 text-white"
            >
              <Icon name="X" size={24} />
            </button>
            <h2 className="heading-large text-white mb-6 text-center">Contact Trusted Person</h2>
            <div className="space-y-3">
              {trustedContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => simulateCall(contact)}
                  className="w-full bg-white bg-opacity-20 rounded-xl p-4 flex items-center transition-gentle hover:bg-opacity-30 text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                    <Icon name="User" size={24} color="white" />
                  </div>
                  <div>
                    <p className="heading-small text-white">{contact.name}</p>
                    <p className="body-medium text-white text-opacity-80">{contact.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencySupport;