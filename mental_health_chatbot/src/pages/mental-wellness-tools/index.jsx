import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Components
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";
import ToolCard from "./components/ToolCard";
import ToolModal from "./components/ToolModal";
import UsageStats from "./components/UsageStats";

const MentalWellnessTools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mock usage stats
  const usageStats = {
    streak: 5,
    totalMinutes: 120,
    completedSessions: 14
  };

  // Mock tools data
  const toolsData = [
    // Breathing Exercises
    {
      id: "breathing1",
      name: "4-7-8 Breathing",
      description: "Calm your nervous system with this simple breathing pattern",
      duration: "10 minutes",
      type: "breathing",
      category: "breathing",
      icon: "Lungs",
      color: "var(--color-primary-500)",
      audio: "/4-7-8 Calm Breathing Exercise _ 10 Minutes of Deep Relaxation _ Anxiety Relief _ Pranayama Exercise [LiUnFJ8P4gM].mp3",
      benefits: [
        "Reduces anxiety and stress",
        "Helps with falling asleep",
        "Improves focus and concentration"
      ]
    },
    {
      id: "breathing2",
      name: "Box Breathing",
      description: "Equal inhale, hold, exhale, and pause for balance",
      duration: "5 minutes",
      type: "breathing",
      category: "breathing",
      icon: "Square",
      color: "var(--color-calm)",
      audio: "/Box Breathing Relaxation Exercise _ 5 Minutes Beginner Pace _ Anxiety Reduction Pranayama Technique [oN8xV3Kb5-Q].mp3",
      benefits: [
        "Used by Navy SEALs for stress management",
        "Improves mental clarity",
        "Balances oxygen and carbon dioxide levels"
      ]
    },
    {
      id: "breathing3",
      name: "Diaphragmatic Breathing",
      description: "Deep belly breathing for relaxation",
      duration: "5 minutes",
      type: "breathing",
      category: "breathing",
      icon: "Wind",
      color: "var(--color-info)",
      benefits: [
        "Activates the parasympathetic nervous system",
        "Reduces blood pressure",
        "Improves core muscle stability"
      ]
    },
    
    // Grounding Techniques
    {
      id: "grounding1",
      name: "5-4-3-2-1 Technique",
      description: "Use your senses to ground yourself in the present moment",
      duration: "3 minutes",
      type: "grounding",
      category: "grounding",
      icon: "Eye",
      color: "var(--color-happy)",
      steps: [
        "Notice 5 things you can see around you",
        "Notice 4 things you can touch or feel",
        "Notice 3 things you can hear",
        "Notice 2 things you can smell",
        "Notice 1 thing you can taste"
      ],
      benefits: [
        "Helps during anxiety attacks",
        "Brings awareness to the present moment",
        "Interrupts racing thoughts"
      ]
    },
    {
      id: "grounding2",
      name: "Body Scan",
      description: "Progressively relax your body from head to toe",
      duration: "7 minutes",
      type: "grounding",
      category: "grounding",
      icon: "Scan",
      color: "var(--color-anxious)",
      steps: [
        "Find a comfortable position sitting or lying down",
        "Close your eyes and take a few deep breaths",
        "Bring awareness to your feet and notice any sensations",
        "Slowly move your attention up through your legs",
        "Continue through your torso, arms, and head",
        "Notice any areas of tension and try to release them",
        "Take a final deep breath and slowly open your eyes"
      ],
      benefits: [
        "Reduces physical tension",
        "Improves body awareness",
        "Can help with chronic pain management"
      ]
    },
    {
      id: "grounding3",
      name: "Object Focus",
      description: "Anchor yourself by focusing on a single object",
      duration: "2 minutes",
      type: "grounding",
      category: "grounding",
      icon: "Focus",
      color: "var(--color-low)",
      steps: [
        "Choose any object in your surroundings",
        "Examine it closely, noticing its color, texture, and shape",
        "Consider its weight, temperature, and how it feels in your hand",
        "Think about its purpose and how it was made",
        "If your mind wanders, gently bring your focus back to the object"
      ],
      benefits: [
        "Simple technique that can be done anywhere",
        "Helps interrupt anxious thought patterns",
        "Improves mindfulness and present-moment awareness"
      ]
    },
    
    // Guided Meditations
    {
      id: "meditation1",
      name: "Loving-Kindness Meditation",
      description: "Develop compassion for yourself and others",
      duration: "5 minutes",
      type: "meditation",
      category: "meditation",
      icon: "Heart",
      color: "var(--color-error)",
      audio:"/5 Minute Loving Kindness Meditation _ Open Your Heart to Warmth and Loving Kindness [5f6OQPQSxek].mp3",
      benefits: [
        "Increases positive emotions",
        "Reduces self-criticism",
        "Improves relationships with others"
      ]
    },
    {
      id: "meditation2",
      name: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      duration: "10 minutes",
      type: "meditation",
      category: "meditation",
      icon: "Activity",
      color: "var(--color-anxious)",
      audio:"/10 Minute Guided Body Scan Meditation with Music [nnVCadMo3qI].mp3",
      benefits: [
        "Reduces physical tension",
        "Improves sleep quality",
        "Increases body awareness"
      ]
    },
    {
      id: "meditation3",
      name: "Mindful Awareness",
      description: "Focus on the present moment without judgment",
      duration: "10 minutes",
      type: "meditation",
      category: "meditation",
      icon: "Sparkles",
      color: "var(--color-happy)",
      audio:"\Daily Calm _ 10 Minute Mindfulness Meditation _ Be Present [ZToicYcHIOU].mp3",
      benefits: [
        "Reduces stress and anxiety",
        "Improves focus and attention",
        "Helps manage difficult emotions"
      ]
    },
    
    // Calming Media
    {
      id: "media1",
      name: "Nature Sounds Playlist",
      description: "Immerse yourself in calming natural soundscapes",
      duration: "30 minutes",
      type: "media",
      category: "media",
      icon: "Music",
      color: "var(--color-calm)",
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      link: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
      benefits: [
        "Masks distracting background noise",
        "Creates a calming environment",
        "Helps with focus and relaxation"
      ]
    },
    {
      id: "media2",
      name: "Guided Visualization",
      description: "Journey to a peaceful place through guided imagery",
      duration: "12 minutes",
      type: "media",
      category: "media",
      icon: "Mountain",
      color: "var(--color-info)",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      link: "https://www.youtube.com/watch?v=t1rRo6cgM_E",
      benefits: [
        "Reduces stress and anxiety",
        "Provides mental escape from difficult situations",
        "Improves creative thinking"
      ]
    },
    {
      id: "media3",
      name: "Calming Music for Sleep",
      description: "Gentle melodies to help you drift off to sleep",
      duration: "45 minutes",
      type: "media",
      category: "media",
      icon: "Moon",
      color: "var(--color-low)",
      thumbnail: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
      link: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
      benefits: [
        "Improves sleep quality",
        "Reduces time to fall asleep",
        "Creates a consistent bedtime routine"
      ]
    }
  ];

  // Group tools by category
  const breathingExercises = toolsData.filter(tool => tool.category === "breathing");
  const groundingTechniques = toolsData.filter(tool => tool.category === "grounding");
  const guidedMeditations = toolsData.filter(tool => tool.category === "meditation");
  const calmingMedia = toolsData.filter(tool => tool.category === "media");
  
  // Get favorite tools
  const favoriteTools = toolsData.filter(tool => favorites.includes(tool.id));

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleFavorite = (toolId) => {
    setFavorites(prev => {
      if (prev.includes(toolId)) {
        return prev.filter(id => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTools');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteTools', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        
        {/* Usage Stats */}
        <UsageStats stats={usageStats} />
        
        {/* My Toolkit (Favorites) */}
        {favoriteTools.length > 0 && (
          <div className="mb-8">
            <h2 className="heading-medium text-neutral-700 mb-4">My Toolkit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onSelect={handleSelectTool}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Breathing Exercises */}
        <CategorySection 
          title="Breathing Exercises" 
          tools={breathingExercises}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        
        {/* Grounding Techniques */}
        <CategorySection 
          title="Grounding Techniques" 
          tools={groundingTechniques}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        
        {/* Guided Meditations */}
        <CategorySection 
          title="Guided Meditations" 
          tools={guidedMeditations}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        
        {/* Calming Media */}
        <CategorySection 
          title="Calming Media" 
          tools={calmingMedia}
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        
        {/* Back to Home */}
        <div className="flex justify-center mt-8 mb-6">
          <Link 
            to="/home-dashboard" className="flex items-center text-primary-500 hover:text-primary-600 transition-gentle"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            <span className="body-medium font-medium">Back to Dashboard</span>
          </Link>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small mt-8">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Your digital companion for wellbeing</p>
        </footer>
      </div>
      
      {/* Tool Modal */}
      {showModal && selectedTool && (
        <ToolModal 
          tool={selectedTool} 
          onClose={handleCloseModal}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(selectedTool.id)}
        />
      )}
    </div>
  );
};

export default MentalWellnessTools;