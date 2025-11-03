import React from 'react';

// Animated SVG Illustrations for the mental health app
export const WelcomeIllustration = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <svg viewBox="0 0 400 200" className="w-full h-full">
      {/* Background gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="400" height="200" fill="url(#bgGradient)" />
      
      {/* Sun */}
      <circle cx="320" cy="60" r="25" fill="url(#sunGradient)" opacity="0.9">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Sun rays */}
      <g stroke="url(#sunGradient)" strokeWidth="2" opacity="0.6">
        <line x1="320" y1="20" x2="320" y2="35">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="350" y1="50" x2="340" y2="60">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </line>
        <line x1="360" y1="80" x2="350" y2="85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </line>
        <line x1="350" y1="110" x2="340" y2="105">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </line>
        <line x1="320" y1="130" x2="320" y2="120">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.8s" />
        </line>
        <line x1="290" y1="110" x2="300" y2="105">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s" />
        </line>
        <line x1="280" y1="80" x2="290" y2="85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1.2s" />
        </line>
        <line x1="290" y1="50" x2="300" y2="60">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1.4s" />
        </line>
      </g>
      
      {/* Clouds */}
      <g fill="url(#cloudGradient)" opacity="0.8">
        <ellipse cx="80" cy="50" rx="25" ry="15" />
        <ellipse cx="100" cy="50" rx="30" ry="18" />
        <ellipse cx="120" cy="50" rx="20" ry="12" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 5,0; 0,0" dur="8s" repeatCount="indefinite" />
      </g>
      
      <g fill="url(#cloudGradient)" opacity="0.6">
        <ellipse cx="250" cy="40" rx="20" ry="12" />
        <ellipse cx="270" cy="40" rx="25" ry="15" />
        <ellipse cx="290" cy="40" rx="18" ry="10" />
        <animateTransform attributeName="transform" type="translate" values="0,0; -3,0; 0,0" dur="10s" repeatCount="indefinite" />
      </g>
      
      {/* Mountains */}
      <polygon points="0,150 50,100 100,120 150,80 200,100 250,70 300,90 350,60 400,80 400,200 0,200" 
               fill="#c7d2fe" opacity="0.7" />
      
      {/* Trees */}
      <g fill="#10b981">
        <polygon points="60,180 70,160 80,180" />
        <rect x="68" y="180" width="4" height="20" fill="#92400e" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-2; 0,0" dur="4s" repeatCount="indefinite" />
      </g>
      
      <g fill="#10b981">
        <polygon points="150,180 160,150 170,180" />
        <rect x="158" y="180" width="4" height="20" fill="#92400e" />
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-1; 0,0" dur="5s" repeatCount="indefinite" />
      </g>
      
      {/* Floating hearts */}
      <g fill="#f472b6" opacity="0.7">
        <path d="M50,120 C50,110 60,100 70,100 C80,100 90,110 90,120 C90,130 70,150 70,150 C70,150 50,130 50,120 Z">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M180,100 C180,90 190,80 200,80 C210,80 220,90 220,100 C220,110 200,130 200,130 C200,130 180,110 180,100 Z">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="4s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  </div>
);

export const MoodIllustration = ({ mood = "happy" }) => {
  const moodConfig = {
    happy: { color: "#e965b0ff", emoji: "😊", bgColor: "#ffd2f1ff" },
    calm: { color: "#3b82f6", emoji: "😌", bgColor: "#bed4f1ff" },
    anxious: { color: "#d3ea07ff", emoji: "😰", bgColor: "#f5ff96ff" },
    low: { color: "#66a31cff", emoji: "😢", bgColor: "#d2fea0d4" },
    angry: { color: "#ed7676ff", emoji: "😠", bgColor: "#fee2e2" }
  };
  
  const config = moodConfig[mood] || moodConfig.happy;
  
  return (
    <div className="w-24 h-24 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id={`moodGradient-${mood}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={config.bgColor} />
            <stop offset="100%" stopColor={config.color} />
          </radialGradient>
        </defs>
        
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill={`url(#moodGradient-${mood})`} opacity="0.3" />
        
        {/* Face */}
        <circle cx="50" cy="50" r="35" fill={config.bgColor} stroke={config.color} strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="40" cy="40" r="4" fill={config.color} />
        <circle cx="60" cy="40" r="4" fill={config.color} />
        
        {/* Mouth based on mood */}
        {mood === "happy" && (
          <path d="M 35 60 Q 50 75 65 60" stroke={config.color} strokeWidth="3" fill="none" />
        )}
        {mood === "calm" && (
          <path d="M 35 60 Q 50 65 65 60" stroke={config.color} strokeWidth="3" fill="none" />
        )}
        {mood === "anxious" && (
          <path d="M 35 60 Q 50 70 65 60" stroke={config.color} strokeWidth="3" fill="none" />
        )}
        {mood === "low" && (
          <path d="M 35 70 Q 50 60 65 70" stroke={config.color} strokeWidth="3" fill="none" />
        )}
        {mood === "angry" && (
          <path d="M 35 60 Q 50 70 65 60" stroke={config.color} strokeWidth="3" fill="none" />
        )}
        
        {/* Floating particles */}
        <g fill={config.color} opacity="0.6">
          <circle cx="20" cy="20" r="2">
            <animate attributeName="cy" values="20;10;20" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80" cy="25" r="1.5">
            <animate attributeName="cy" values="25;15;25" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="15" cy="80" r="1">
            <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export const WellnessIllustration = () => (
<div className="w-full h-32 flex items-center justify-center overflow-hidden">
      <img
        src="\videos\Self-care Checklist.gif"
        alt="Chat cloud animation"
        className="w-64 h-auto rounded-xl object-cover"
      />
    </div>);

export const ChatIllustration = () => (
 <div className="w-full h-32 flex items-center justify-center overflow-hidden">
      <img
        src="\videos\Kumo Emoji Collection.gif"
        alt="Chat cloud animation"
        className="w-64 h-auto rounded-xl object-cover"
      />
    </div>);

export const JournalIllustration = () => (
<div className="w-full h-32 flex items-center justify-center overflow-hidden">
      <img
        src="\videos\Book Write GIF - Find & Share on GIPHY.gif"
        alt="Chat cloud animation"
        className="w-64 h-auto rounded-xl object-cover"
      />
    </div>);

export const ResourcesIllustration = () => (
  <div className="w-full h-32 flex items-center justify-center overflow-hidden">
      <img
        src="\videos\Screenshot 2025-10-26 151239.png"
        alt="Chat cloud animation"
        className="w-64 h-auto rounded-xl object-cover"
      />
    </div>
);

export default {
  WelcomeIllustration,
  MoodIllustration,
  WellnessIllustration,
  ChatIllustration,
  JournalIllustration,
  ResourcesIllustration
};
