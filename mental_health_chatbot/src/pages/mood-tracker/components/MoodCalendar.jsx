import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const MoodCalendar = ({ moodEntries, onSelectDay, currentMonth, onChangeMonth }) => {
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Create array of day numbers for the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Create array of empty slots for days before first day of month
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  // Combine empty days and actual days
  const allDays = [...emptyDays, ...days];
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthName = monthNames[month];
  
  // Get current date for highlighting
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const currentDate = today.getDate();

  // Handle previous month
  const handlePrevMonth = () => {
    const newMonth = new Date(year, month - 1, 1);
    onChangeMonth(newMonth);
  };

  // Handle next month
  const handleNextMonth = () => {
    const newMonth = new Date(year, month + 1, 1);
    onChangeMonth(newMonth);
  };

  // Get mood color for a specific day
  const getMoodColor = (day) => {
    const entry = moodEntries.find(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getDate() === day && 
             entryDate.getMonth() === month && 
             entryDate.getFullYear() === year;
    });
    
    if (!entry) return null;
    
    switch(entry.mood) {
      case "Happy": return "var(--color-happy)";
      case "Calm": return "var(--color-calm)";
      case "Anxious": return "var(--color-anxious)";
      case "Angry": return "var(--color-angry)";
      case "Low": return "var(--color-low)";
      default: return "var(--color-neutral-400)";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-neutral-100 transition-quick"
        >
          <Icon name="ChevronLeft" size={20} className="text-neutral-600" />
        </button>
        
        <h2 className="heading-medium text-neutral-800">
          {monthName} {year}
        </h2>
        
        <button 
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-neutral-100 transition-quick"
        >
          <Icon name="ChevronRight" size={20} className="text-neutral-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="text-center body-small font-medium text-neutral-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10"></div>;
          }
          
          const isToday = isCurrentMonth && day === currentDate;
          const moodColor = getMoodColor(day);
          
          return (
            <button
              key={`day-${day}`}
              className={`h-10 rounded-full flex items-center justify-center relative transition-gentle
                ${isToday ? 'border-2 border-primary-500' : ''}
                ${moodColor ? '' : 'hover:bg-neutral-100'}
              `}
              onClick={() => onSelectDay(new Date(year, month, day))}
            >
              {moodColor && (
                <div 
                  className="absolute inset-1 rounded-full opacity-70"
                  style={{ backgroundColor: moodColor }}
                ></div>
              )}
              <span className={`z-10 body-medium ${isToday ? 'font-medium' : ''}`}>
                {day}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodCalendar;