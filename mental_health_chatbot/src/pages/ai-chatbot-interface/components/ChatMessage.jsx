import React from "react";
import Icon from "../../../components/AppIcon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ChatMessage = ({ message, isUser }) => {
  const navigate = useNavigate();
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Parse text to handle markdown formatting
  const parseText = (text) => {
    if (!text) return '';
    
    // Handle bold text **text** or __text__
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Handle italic text *text* or _text_
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    parsed = parsed.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Handle line breaks
    parsed = parsed.replace(/\n/g, '<br/>');
    
    return parsed;
  };

  // Handle meditation navigation
  const handleMeditationClick = () => {
    navigate('/mental-wellness-tools');
  };

  // Render different message types
  const renderMessageContent = () => {
    if (message.type === "crisis") {
      return (
        <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 mb-4 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={24} className="text-pink-500" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-pink-700 mb-3">💙 Support is Here</h4>
              <p className="text-pink-600 mb-6 text-base">{message.content}</p>
              
              <div className="space-y-4">
                {message.crisisNumbers?.map((service, index) => (
                  <div key={index} className="bg-white border border-pink-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800 text-lg">{service.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <p className="text-2xl font-bold text-pink-500">{service.number}</p>
                      </div>
                      <button
                        onClick={() => window.location.href = `tel:${service.number}`}
                        className="ml-6 bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <Icon name="Phone" size={18} />
                        <span className="font-medium">Call Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-pink-200">
                <p className="text-base text-pink-600 font-medium">
                  <strong>💜 Remember:</strong> Your life has value, and there are people who want to help you through this difficult time.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (message.type === "meditation") {
      return (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <Icon name="Lungs" size={20} className="text-purple-500" />
            </div>
            <h4 className="text-xl font-semibold text-purple-700">{message.meditationTitle || "Meditation Exercise"}</h4>
          </div>
          <p className="text-purple-600 mb-6 text-base" dangerouslySetInnerHTML={{ __html: parseText(message.content) }}></p>
          <button 
            onClick={handleMeditationClick}
            className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Icon name="Play" size={18} />
            <span>Start Meditation</span>
          </button>
        </div>
      );
    }
    
    if (message.type === "exercise") {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Icon name={message.exerciseIcon} size={20} className="text-blue-500" />
            </div>
            <h4 className="text-xl font-semibold text-blue-700">{message.exerciseTitle}</h4>
          </div>
          <p className="text-blue-600 mb-6 text-base" dangerouslySetInnerHTML={{ __html: parseText(message.content) }}></p>
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
            Start {message.exerciseTitle}
          </button>
        </div>
      );
    }
    
    if (message.type === "options") {
      return (
        <div>
          <p className="text-base mb-4" dangerouslySetInnerHTML={{ __html: parseText(message.content) }}></p>
          <div className="flex flex-wrap gap-3">
            {message.options.map((option, index) => (
              <button 
                key={index} 
                className="bg-yellow-100 hover:bg-yellow-200 border border-yellow-200 transition-all duration-200 px-4 py-3 rounded-xl text-sm font-medium text-yellow-700 hover:shadow-md transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
    
    return <p className="body-medium" dangerouslySetInnerHTML={{ __html: parseText(message.content) }}></p>;
  };

  return (
    <motion.div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div 
          className={`p-4 rounded-2xl shadow-sm ${
            isUser 
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-tr-none' :'bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 rounded-tl-none border border-blue-100'
          }`}
        >
          {renderMessageContent()}
        </div>
        <div className={`flex items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="body-small text-neutral-500">{formatTime(message.timestamp)}</span>
        </div>
      </div>
      
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mr-3 order-1 shadow-sm">
          <Icon name="Bot" size={18} className="text-purple-600" />
        </div>
      )}
      
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center ml-3 order-2 shadow-sm">
          <Icon name="User" size={18} className="text-pink-600" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;