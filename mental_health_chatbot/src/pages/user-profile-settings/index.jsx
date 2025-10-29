import React, { useState } from "react";

import Icon from "../../components/AppIcon";

// Components
import ProfileHeader from "./components/ProfileHeader";
import ProfileSection from "./components/ProfileSection";
import WeeklyMoodSummary from "./components/WeeklyMoodSummary";
import SavedCardsGallery from "./components/SavedCardsGallery";
import SettingsTabs from "./components/SettingsTabs";
import AccountSettings from "./components/AccountSettings";
import ChatbotSettings from "./components/ChatbotSettings";
import BehaviorReport from "./components/BehaviorReport";
import PrivacySettings from "./components/PrivacySettings";
import EmergencySettings from "./components/EmergencySettings";

const UserProfileSettings = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    id: "user123",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    joinDate: "March 2023"
  });

  // Mock weekly mood data
  const weeklyMoodData = [
    { day: "Mon", mood: "Happy" },
    { day: "Tue", mood: "Calm" },
    { day: "Wed", mood: "Anxious" },
    { day: "Thu", mood: "Low" },
    { day: "Fri", mood: "Calm" },
    { day: "Sat", mood: "Happy" },
    { day: "Sun", mood: "Calm" }
  ];

  // Mock saved cards
  const savedCards = [
    {
      id: "card1",
      title: "Mindful Moment",
      message: "You don\'t have to control your thoughts. You just have to stop letting them control you.",
      icon: "Sparkles",
      savedDate: "2 days ago"
    },
    {
      id: "card2",
      title: "Self-Care Tip",
      message: "Take a moment to breathe deeply. Inhale for 4 counts, hold for 7, exhale for 8. Repeat 3 times.",
      icon: "Heart",
      savedDate: "1 week ago"
    },
    {
      id: "card3",
      title: "Positive Affirmation",
      message: "I am capable of handling whatever comes my way today. I have the strength and wisdom within me.",
      icon: "Sun",
      savedDate: "2 weeks ago"
    }
  ];

  // Mock settings
  const [settings, setSettings] = useState({
    // Account settings
    email: "sarah.j@example.com",
    dailyReminders: true,
    weeklyReports: false,
    notificationTime: "20:00",
    
    // Chatbot settings
    chatbotPersonality: "supportive",
    responseLength: 2,
    
    // Privacy settings
    journalPasscodeEnabled: false,
    journalPasscode: "",
    dataAnonymization: true,
    dataRetention: "6months",
    
    // Theme settings
    darkMode: false,
    colorTheme: "default"
  });

  // Mock emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: "contact1",
      name: "John Smith",
      phone: "(555) 123-4567",
      relationship: "Family"
    }
  ]);

  const handleEditProfile = () => {
    // In a real app, this would open a modal or navigate to edit profile page
    console.log("Edit profile clicked");
  };

  const handleToggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleUpdateSetting = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleAddEmergencyContact = (contact) => {
    setEmergencyContacts([...emergencyContacts, contact]);
  };

  const handleRemoveEmergencyContact = (contactId) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== contactId));
  };

  const handleUpdateEmergencyContact = (contactId, updatedContact) => {
    setEmergencyContacts(emergencyContacts.map(contact => 
      contact.id === contactId ? { ...contact, ...updatedContact } : contact
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <ProfileHeader user={userData} />
        
        {/* Profile Section */}
        <ProfileSection 
          user={userData} 
          onEditProfile={handleEditProfile} 
        />
        
        {/* Weekly Mood Summary */}
        <WeeklyMoodSummary moodData={weeklyMoodData} />
        
        {/* Saved Cards Gallery */}
        <SavedCardsGallery cards={savedCards} />
        
        {/* Settings Tabs */}
        <SettingsTabs>
          <AccountSettings 
            id="account"
            settings={settings}
            onToggle={handleToggleSetting}
            onUpdate={handleUpdateSetting}
          />
          
          <ChatbotSettings 
            id="chatbot"
            settings={settings}
            onUpdate={handleUpdateSetting}
          />
          
          <BehaviorReport id="behavior" />
          
          <PrivacySettings 
            id="privacy"
            settings={settings}
            onToggle={handleToggleSetting}
            onUpdate={handleUpdateSetting}
          />
          
          <EmergencySettings 
            id="emergency"
            contacts={emergencyContacts}
            onAddContact={handleAddEmergencyContact}
            onRemoveContact={handleRemoveEmergencyContact}
            onUpdateContact={handleUpdateEmergencyContact}
          />
        </SettingsTabs>
        
        {/* Logout Button */}
        <button className="w-full p-4 mb-6 flex items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-gentle">
          <Icon name="LogOut" size={18} className="mr-2" />
          <span className="body-medium font-medium">Log Out</span>
        </button>
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Your digital companion for wellbeing</p>
        </footer>
      </div>
    </div>
  );
};

export default UserProfileSettings;