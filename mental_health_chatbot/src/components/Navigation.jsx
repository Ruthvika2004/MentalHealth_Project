import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'Home',
      path: '/home-dashboard',
      color: 'pink'
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: 'MessageCircle',
      path: '/ai-chatbot-interface',
      color: 'purple'
    },
    {
      id: 'meditate',
      label: 'Meditate',
      icon: 'Lungs',
      path: '/mental-wellness-tools',
      color: 'blue'
    },
    {
      id: 'journal',
      label: 'Journal',
      icon: 'BookOpen',
      path: '/journal',
      color: 'yellow'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: 'Book',
      path: '/resources',
      color: 'green'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colorMap = {
      pink: {
        bg: isActive ? 'bg-pink-200' : 'bg-pink-50',
        text: isActive ? 'text-pink-700' : 'text-pink-600',
        border: isActive ? 'border-pink-300' : 'border-pink-100',
        icon: isActive ? 'text-pink-600' : 'text-pink-500'
      },
      purple: {
        bg: isActive ? 'bg-purple-200' : 'bg-purple-50',
        text: isActive ? 'text-purple-700' : 'text-purple-600',
        border: isActive ? 'border-purple-300' : 'border-purple-100',
        icon: isActive ? 'text-purple-600' : 'text-purple-500'
      },
      blue: {
        bg: isActive ? 'bg-blue-200' : 'bg-blue-50',
        text: isActive ? 'text-blue-700' : 'text-blue-600',
        border: isActive ? 'border-blue-300' : 'border-blue-100',
        icon: isActive ? 'text-blue-600' : 'text-blue-500'
      },
      yellow: {
        bg: isActive ? 'bg-yellow-200' : 'bg-yellow-50',
        text: isActive ? 'text-yellow-700' : 'text-yellow-600',
        border: isActive ? 'border-yellow-300' : 'border-yellow-100',
        icon: isActive ? 'text-yellow-600' : 'text-yellow-500'
      },
      green: {
        bg: isActive ? 'bg-green-200' : 'bg-green-50',
        text: isActive ? 'text-green-700' : 'text-green-600',
        border: isActive ? 'border-green-300' : 'border-green-100',
        icon: isActive ? 'text-green-600' : 'text-green-500'
      }
    };
    return colorMap[color] || colorMap.pink;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-neutral-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-around items-center py-3 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const colors = getColorClasses(item.color, isActive);
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 transform hover:scale-105 ${colors.bg} ${colors.border} border-2 min-w-[64px] max-w-[80px]`}
              >
                <div className={`w-6 h-6 flex items-center justify-center mb-1 ${colors.icon}`}>
                  <Icon name={item.icon} size={18} />
                </div>
                <span className={`text-xs font-medium leading-tight ${colors.text}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;

