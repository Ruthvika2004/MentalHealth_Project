import React, { useState } from "react";
import Header from "./components/Header";
import MoodCalendar from "./components/MoodCalendar";
import MoodSelector from "./components/MoodSelector";
import MoodEntryForm from "./components/MoodEntryForm";
import MoodTrends from "./components/MoodTrends";
import InsightsCard from "./components/InsightsCard";
import QuickAddButton from "./components/QuickAddButton";

const MoodTracker = () => {
  // State for current month in calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(null);
  
  // State for selected mood
  const [selectedMood, setSelectedMood] = useState(null);
  
  // State for showing mood selector
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  // State for showing mood entry form
  const [showMoodEntryForm, setShowMoodEntryForm] = useState(false);
  
  // State for time range in trends
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock mood entries data
  const [moodEntries, setMoodEntries] = useState([
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      mood: "Happy",
      moodId: "happy",
      notes: "Had a great day at work!",
      color: "var(--color-happy)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      mood: "Anxious",
      moodId: "anxious",
      notes: "Worried about upcoming presentation",
      color: "var(--color-anxious)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      mood: "Calm",
      moodId: "calm",
      notes: "Meditation session helped a lot",
      color: "var(--color-calm)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 7)),
      mood: "Low",
      moodId: "low",
      notes: "Feeling tired and unmotivated",
      color: "var(--color-low)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 9)),
      mood: "Angry",
      moodId: "angry",
      notes: "Frustrated with project delays",
      color: "var(--color-angry)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 11)),
      mood: "Happy",
      moodId: "happy",
      notes: "Weekend trip was amazing!",
      color: "var(--color-happy)"
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 14)),
      mood: "Calm",
      moodId: "calm",
      notes: "Peaceful day at home",
      color: "var(--color-calm)"
    }
  ]);

  // Mock trend data
  const weekTrendData = [
    { day: "Mon", mood: "Happy", value: 5, color: "var(--color-happy)", notes: "Great day!" },
    { day: "Tue", mood: "Calm", value: 4, color: "var(--color-calm)", notes: "Productive" },
    { day: "Wed", mood: "Anxious", value: 2, color: "var(--color-anxious)", notes: "Work stress" },
    { day: "Thu", mood: "Low", value: 1, color: "var(--color-low)", notes: "Tired" },
    { day: "Fri", mood: "Calm", value: 4, color: "var(--color-calm)", notes: "Better" },
    { day: "Sat", mood: "Happy", value: 5, color: "var(--color-happy)", notes: "Weekend!" },
    { day: "Sun", mood: "Calm", value: 4, color: "var(--color-calm)", notes: "Relaxed" },
  ];

  const monthTrendData = [
    { day: "Week 1", mood: "Happy", value: 5, color: "var(--color-happy)", notes: "Great start" },
    { day: "Week 2", mood: "Calm", value: 4, color: "var(--color-calm)", notes: "Steady" },
    { day: "Week 3", mood: "Anxious", value: 2, color: "var(--color-anxious)", notes: "Stressful" },
    { day: "Week 4", mood: "Calm", value: 4, color: "var(--color-calm)", notes: "Improving" },
  ];

  // Mock insights
  const insights = [
    "You tend to feel more energetic on weekends",
    "Anxiety levels decrease after meditation sessions",
    "Your mood is generally better in the morning"
  ];

  // Handle day selection in calendar
  const handleSelectDay = (date) => {
    setSelectedDate(date);
    setShowMoodSelector(true);
  };

  // Handle mood selection
  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    setShowMoodEntryForm(true);
  };

  // Handle saving mood entry
  const handleSaveMoodEntry = (entry) => {
    // Check if there's already an entry for this date
    const existingEntryIndex = moodEntries.findIndex(item => {
      const itemDate = new Date(item.date);
      const entryDate = new Date(entry.date);
      return itemDate.getDate() === entryDate.getDate() && 
             itemDate.getMonth() === entryDate.getMonth() && 
             itemDate.getFullYear() === entryDate.getFullYear();
    });

    // Update or add the entry
    if (existingEntryIndex !== -1) {
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = entry;
      setMoodEntries(updatedEntries);
    } else {
      setMoodEntries([...moodEntries, entry]);
    }

    // Close the form
    setShowMoodEntryForm(false);
    setSelectedMood(null);
    setSelectedDate(null);
  };

  // Handle quick add button click
  const handleQuickAdd = () => {
    setSelectedDate(new Date());
    setShowMoodSelector(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header />
        
        {/* Calendar */}
        <div className="mb-6">
          <MoodCalendar 
            moodEntries={moodEntries}
            onSelectDay={handleSelectDay}
            currentMonth={currentMonth}
            onChangeMonth={setCurrentMonth}
          />
        </div>
        
        {/* Mood Trends */}
        <div className="mb-6">
          <MoodTrends 
            moodData={timeRange === 'week' ? weekTrendData : monthTrendData}
            timeRange={timeRange}
            onChangeTimeRange={setTimeRange}
          />
        </div>
        
        {/* Insights */}
        <div className="mb-6">
          <InsightsCard insights={insights} />
        </div>
        
        {/* Quick Add Button */}
        <QuickAddButton onClick={handleQuickAdd} />
        
        {/* Mood Selector Modal */}
        {showMoodSelector && (
          <MoodSelector 
            onSelectMood={handleSelectMood}
            onClose={() => setShowMoodSelector(false)}
            selectedDate={selectedDate}
          />
        )}
        
        {/* Mood Entry Form Modal */}
        {showMoodEntryForm && (
          <MoodEntryForm 
            selectedDate={selectedDate}
            selectedMood={selectedMood}
            onSave={handleSaveMoodEntry}
            onClose={() => setShowMoodEntryForm(false)}
          />
        )}
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small mt-8">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Track your moods to improve wellbeing</p>
        </footer>
      </div>
    </div>
  );
};

export default MoodTracker;