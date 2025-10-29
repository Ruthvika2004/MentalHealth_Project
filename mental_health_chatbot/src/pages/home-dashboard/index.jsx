import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Components
import Header from "./components/Header";
import MoodTrackerWidget from "./components/MoodTrackerWidget";
import FeatureCard from "./components/FeatureCard";
import MotivationalCard from "./components/MotivationalCard";
import MoodTrendGraph from "./components/MoodTrendGraph";
import EmergencyButton from "./components/EmergencyButton";

// Illustrations
import { 
  WelcomeIllustration, 
  MoodIllustration, 
  WellnessIllustration, 
  ChatIllustration, 
  JournalIllustration, 
  ResourcesIllustration 
} from "../../components/Illustrations";

const HomeDashboard = () => {
  // Mock user data
  const userData = {
    name: "Sarah",
    id: "user123",
  };

  // Mock current mood
  const [currentMood, setCurrentMood] = useState({
    id: "calm",
    label: "Calm",
    color: "var(--color-calm)",
    time: "2 hours ago"
  });

  // Mock mood trend data
  const moodTrendData = [
    { day: "Mon", mood: "Happy", value: 5, color: "var(--color-happy)", note: "Great day!" },
    { day: "Tue", mood: "Calm", value: 4, color: "var(--color-calm)", note: "Productive" },
    { day: "Wed", mood: "Anxious", value: 2, color: "var(--color-anxious)", note: "Work stress" },
    { day: "Thu", mood: "Low", value: 1, color: "var(--color-low)", note: "Tired" },
    { day: "Fri", mood: "Calm", value: 4, color: "var(--color-calm)", note: "Better" },
    { day: "Sat", mood: "Happy", value: 5, color: "var(--color-happy)", note: "Weekend!" },
    { day: "Sun", mood: "Calm", value: 4, color: "var(--color-calm)", note: "Relaxed" },
  ];

  // Mock feature cards
  const featureCards = [
    {
      id: 1,
      title: "Chat",
      description: "Talk with your AI companion",
      icon: "MessageSquare",
      color: "var(--color-primary-500)",
      route: "/ai-chatbot-interface"
    },
    {
      id: 2,
      title: "Journal",
      description: "Record your thoughts & feelings",
      icon: "BookOpen",
      color: "var(--color-calm)",
      route: "/journal"
    },
    {
      id: 3,
      title: "Wellness Tools",
      description: "Exercises for mental wellbeing",
      icon: "Heart",
      color: "var(--color-happy)",
      route: "/mental-wellness-tools"
    },
    {
      id: 4,
      title: "Resources",
      description: "Articles, tips & guidance",
      icon: "Lightbulb",
      color: "var(--color-info)",
      route: "/resources"
    }
  ];

  // Mock motivational card
  const [motivationalCard, setMotivationalCard] = useState({
    id: "card123",
    title: "Mindful Moment",
    message: "You don\'t have to control your thoughts. You just have to stop letting them control you.",
    icon: "Sparkles",
    date: new Date().toISOString()
  });

  const handleMoodUpdate = (newMood) => {
    setCurrentMood(newMood);
  };

  const handleSaveCard = (card) => {
    console.log("Card saved:", card);
    // In a real app, this would save to user's collection
  };

  const handleDiscardCard = (card) => {
    console.log("Card discarded:", card);
    // In a real app, this would mark as seen and not show again
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header userName={userData.name} />
        
        {/* Welcome Illustration */}
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
          <WelcomeIllustration />
        </div>
        
        {/* Mood Tracker Widget */}
        <div className="mb-6">
          <MoodTrackerWidget 
            currentMood={currentMood} 
            onMoodUpdate={handleMoodUpdate} 
          />
        </div>
        
        {/* Feature Cards with Illustrations */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/ai-chatbot-interface" className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <ChatIllustration />
              </div>
              <div className="px-4 pb-4">
                <h3 className="heading-small text-neutral-800 mb-1">Chat</h3>
                <p className="body-small text-neutral-600">Talk with your AI companion</p>
              </div>
            </div>
          </Link>
          
          <Link to="/journal" className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <JournalIllustration />
              </div>
              <div className="px-4 pb-4">
                <h3 className="heading-small text-neutral-800 mb-1">Journal</h3>
                <p className="body-small text-neutral-600">Record your thoughts & feelings</p>
              </div>
            </div>
          </Link>
          
          <Link to="/mental-wellness-tools" className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <WellnessIllustration />
              </div>
              <div className="px-4 pb-4">
                <h3 className="heading-small text-neutral-800 mb-1">Wellness Tools</h3>
                <p className="body-small text-neutral-600">Exercises for mental wellbeing</p>
              </div>
            </div>
          </Link>
          
          <Link to="/resources" className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <ResourcesIllustration />
              </div>
              <div className="px-4 pb-4">
                <h3 className="heading-small text-neutral-800 mb-1">Resources</h3>
                <p className="body-small text-neutral-600">Articles, tips & guidance</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Motivational Card */}
        <div className="mb-6">
          <MotivationalCard 
            card={motivationalCard}
            onSave={handleSaveCard}
            onDiscard={handleDiscardCard}
          />
        </div>
        
        {/* Mood Trend Graph */}
        <div className="mb-6">
          <MoodTrendGraph moodData={moodTrendData} />
        </div>
        
        {/* Emergency Button */}
        <div className="mb-6">
          <EmergencyButton />
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="heading-small text-neutral-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <Link 
              to="/mental-wellness-tools" className="flex flex-col items-center p-3 rounded-lg hover:bg-neutral-50 transition-quick"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-1">
                <Icon name="Lungs" size={20} className="text-primary-600" />
              </div>
              <span className="body-small text-center">Breathing</span>
            </Link>
            <Link 
              to="/mental-wellness-tools" className="flex flex-col items-center p-3 rounded-lg hover:bg-neutral-50 transition-quick"
            >
              <div className="w-10 h-10 rounded-full bg-calm bg-opacity-10 flex items-center justify-center mb-1">
                <Icon name="Headphones" size={20} className="text-calm" />
              </div>
              <span className="body-small text-center">Meditation</span>
            </Link>
            <Link 
              to="/mood-tracker" className="flex flex-col items-center p-3 rounded-lg hover:bg-neutral-50 transition-quick"
            >
              <div className="w-10 h-10 rounded-full bg-happy bg-opacity-10 flex items-center justify-center mb-1">
                <Icon name="BarChart2" size={20} className="text-happy" />
              </div>
              <span className="body-small text-center">Mood Log</span>
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Your digital companion for wellbeing</p>
        </footer>
      </div>
    </div>
  );
};

export default HomeDashboard;