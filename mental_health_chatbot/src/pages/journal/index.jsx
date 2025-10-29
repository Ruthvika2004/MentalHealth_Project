import React, { useState, useEffect } from "react";
import JournalHeader from "./components/JournalHeader";
import MoodSelector from "./components/MoodSelector";
import TagInput from "./components/TagInput";
import PrivacyToggle from "./components/PrivacyToggle";
import JournalEditor from "./components/JournalEditor";
import JournalEntryCard from "./components/JournalEntryCard";
import SearchBar from "./components/SearchBar";
import ReflectionPrompt from "./components/ReflectionPrompt";
import Icon from "../../components/AppIcon";

const Journal = () => {
  // State for the current entry being edited
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    content: "",
    mood: { id: "calm", label: "Calm" },
    tags: [],
    date: new Date().toISOString(),
    isPrivate: false
  });

  // State for journal entries
  const [entries, setEntries] = useState([]);
  
  // UI states
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState(null); // null, 'saving', 'saved'
  const [showReflection, setShowReflection] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  // Load mock data on component mount
  useEffect(() => {
    const mockEntries = [
      {
        id: "entry1",
        content: "Today was a really productive day. I managed to complete all my tasks at work and even had time for a short walk in the park. The fresh air really helped clear my mind.",
        mood: { id: "happy", label: "Happy" },
        tags: ["work", "productivity", "nature"],
        date: new Date(Date.now() - 86400000).toISOString(), // yesterday
        isPrivate: false
      },
      {
        id: "entry2",
        content: "I\'m feeling a bit anxious about the upcoming presentation. I keep worrying about all the things that could go wrong. Need to practice some breathing exercises to calm down.",
        mood: { id: "anxious", label: "Anxious" },
        tags: ["work", "stress", "presentation"],
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        isPrivate: true
      },
      {
        id: "entry3",
        content: "Had a disagreement with my friend today. I was probably too harsh with my words. I should apologize and try to see things from their perspective.",
        mood: { id: "angry", label: "Angry" },
        tags: ["relationships", "conflict"],
        date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        isPrivate: false
      },
      {
        id: "entry4",
        content: "Feeling a bit down today for no particular reason. The weather is gloomy which isn\'t helping. Maybe I\'ll watch a comfort movie tonight to lift my spirits.",
        mood: { id: "low", label: "Low" },
        tags: ["mood", "self-care"],
        date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
        isPrivate: false
      },
      {
        id: "entry5",
        content: "Spent the morning meditating and reading. It\'s amazing how much difference a slow, mindful start to the day can make. I feel centered and ready for whatever comes my way.",
        mood: { id: "calm", label: "Calm" },
        tags: ["meditation", "mindfulness", "morning-routine"],
        date: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        isPrivate: false
      }
    ];
    
    setEntries(mockEntries);
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (currentEntry.content && currentEntry.id) {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      const timer = setTimeout(() => {
        setAutoSaveStatus('saving');
        
        // Simulate saving delay
        setTimeout(() => {
          handleSaveEntry();
          setAutoSaveStatus('saved');
          
          // Reset status after a while
          setTimeout(() => {
            setAutoSaveStatus(null);
          }, 2000);
        }, 1000);
      }, 2000);
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [currentEntry.content]);

  const handleNewEntry = () => {
    setCurrentEntry({
      id: `entry${Date.now()}`,
      content: "",
      mood: { id: "calm", label: "Calm" },
      tags: [],
      date: new Date().toISOString(),
      isPrivate: false
    });
    setShowReflection(false);
  };

  const handleSelectEntry = (entryId) => {
    const selectedEntry = entries.find(entry => entry.id === entryId);
    
    if (selectedEntry) {
      if (selectedEntry.isPrivate && !verifyPasscode()) {
        return;
      }
      
      setCurrentEntry(selectedEntry);
      setShowReflection(true);
    }
  };

  const verifyPasscode = () => {
    if (!passcode) {
      const enteredPasscode = prompt("This entry is private. Please enter your passcode:");
      if (enteredPasscode !== "1234") { // Mock passcode
        alert("Incorrect passcode");
        return false;
      }
    }
    return true;
  };

  const handleContentChange = (content) => {
    setCurrentEntry(prev => ({ ...prev, content }));
  };

  const handleMoodSelect = (mood) => {
    setCurrentEntry(prev => ({ ...prev, mood }));
  };

  const handleAddTag = (tag) => {
    if (!currentEntry.tags.includes(tag)) {
      setCurrentEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setCurrentEntry(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handlePrivacyToggle = (isPrivate) => {
    setCurrentEntry(prev => ({ ...prev, isPrivate }));
  };

  const handlePasscodeSet = (code) => {
    setPasscode(code);
  };

  const handleSaveEntry = () => {
    const updatedEntries = entries.some(e => e.id === currentEntry.id)
      ? entries.map(e => e.id === currentEntry.id ? { ...currentEntry, date: new Date().toISOString() } : e)
      : [{ ...currentEntry, date: new Date().toISOString() }, ...entries];
    
    setEntries(updatedEntries);
    setAutoSaveStatus('saved');
    
    // Reset status after a while
    setTimeout(() => {
      setAutoSaveStatus(null);
    }, 2000);
  };

  const handleSearch = (term, type) => {
    if (!term.trim()) {
      setSearchResults(null);
      return;
    }
    
    let results;
    const normalizedTerm = term.toLowerCase();
    
    switch (type) {
      case 'content':
        results = entries.filter(entry => 
          entry.content.toLowerCase().includes(normalizedTerm)
        );
        break;
      case 'tags':
        results = entries.filter(entry => 
          entry.tags.some(tag => tag.toLowerCase().includes(normalizedTerm))
        );
        break;
      case 'mood':
        results = entries.filter(entry => 
          entry.mood.label.toLowerCase().includes(normalizedTerm)
        );
        break;
      case 'date':
        results = entries.filter(entry => {
          const date = new Date(entry.date);
          const dateStr = date.toLocaleDateString();
          return dateStr.includes(normalizedTerm);
        });
        break;
      case 'all':
      default:
        results = entries.filter(entry => 
          entry.content.toLowerCase().includes(normalizedTerm) ||
          entry.tags.some(tag => tag.toLowerCase().includes(normalizedTerm)) ||
          entry.mood.label.toLowerCase().includes(normalizedTerm) ||
          new Date(entry.date).toLocaleDateString().includes(normalizedTerm)
        );
    }
    
    setSearchResults(results);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchResults(null);
    }
  };

  const closeReflection = () => {
    setShowReflection(false);
  };

  // Filter entries that should be displayed
  const displayEntries = searchResults !== null ? searchResults : entries;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <JournalHeader toggleSearch={toggleSearch} />
        
        {showSearch ? (
          <SearchBar 
            onSearch={handleSearch} 
            onClose={toggleSearch} 
          />
        ) : (
          <>
            {/* Entry Controls */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="heading-medium text-neutral-700">
                  {currentEntry.id ? "Edit Entry" : "New Entry"}
                </h3>
                <button
                  onClick={handleNewEntry}
                  className="px-3 py-1 rounded-lg bg-primary-500 text-white text-sm flex items-center transition-gentle hover:bg-primary-600"
                >
                  <Icon name="Plus" size={16} className="mr-1" />
                  New Entry
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <MoodSelector 
                  selectedMood={currentEntry.mood} 
                  onMoodSelect={handleMoodSelect} 
                />
                <PrivacyToggle 
                  isPrivate={currentEntry.isPrivate} 
                  onToggle={handlePrivacyToggle}
                  onPasscodeSet={handlePasscodeSet}
                />
              </div>
              
              <TagInput 
                tags={currentEntry.tags} 
                onAddTag={handleAddTag} 
                onRemoveTag={handleRemoveTag} 
              />
            </div>
            
            {/* Reflection Prompt */}
            {showReflection && (
              <ReflectionPrompt 
                entry={currentEntry} 
                onClose={closeReflection} 
              />
            )}
            
            {/* Journal Editor */}
            <JournalEditor 
              content={currentEntry.content} 
              onContentChange={handleContentChange}
              onSave={handleSaveEntry}
              autoSaveStatus={autoSaveStatus}
            />
          </>
        )}
        
        {/* Journal Entries List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="heading-medium text-neutral-700">
              {searchResults !== null 
                ? `Search Results (${searchResults.length})` 
                : "Previous Entries"}
            </h3>
            {searchResults !== null && (
              <button
                onClick={() => setSearchResults(null)}
                className="text-primary-500 flex items-center body-small"
              >
                <Icon name="ArrowLeft" size={16} className="mr-1" />
                Back to all entries
              </button>
            )}
          </div>
          
          {displayEntries.length > 0 ? (
            displayEntries.map(entry => (
              <JournalEntryCard 
                key={entry.id} 
                entry={entry} 
                onSelect={handleSelectEntry}
                isSelected={currentEntry.id === entry.id}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Icon name="Book" size={32} className="mx-auto mb-3 text-neutral-400" />
              <p className="body-medium text-neutral-600 mb-2">
                {searchResults !== null 
                  ? "No entries match your search" :"No journal entries yet"}
              </p>
              <p className="body-small text-neutral-500">
                {searchResults !== null 
                  ? "Try a different search term or filter" 
                  : "Start writing to create your first entry"}
              </p>
            </div>
          )}
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

export default Journal;