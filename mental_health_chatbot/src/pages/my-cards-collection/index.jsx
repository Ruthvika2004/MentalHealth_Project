import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Components
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import CardItem from "./components/CardItem";
import EmptyState from "./components/EmptyState";

const MyCardsCollection = () => {
  // Mock saved cards data
  const initialCards = [
    {
      id: "card1",
      title: "Mindful Moment",
      message: "You don\'t have to control your thoughts. You just have to stop letting them control you.",
      icon: "Sparkles",
      color: "var(--color-primary-500)",
      theme: "mindfulness",
      dateSaved: "2023-05-15T14:30:00Z",
      isFavorite: true
    },
    {
      id: "card2",
      title: "Courage",
      message: "Courage doesn\'t always roar. Sometimes courage is the quiet voice at the end of the day saying, \'I will try again tomorrow.'",
      icon: "Shield",
      color: "var(--color-happy)",
      theme: "courage",
      dateSaved: "2023-06-02T09:15:00Z",
      isFavorite: false
    },
    {
      id: "card3",
      title: "Gratitude",
      message: "Gratitude turns what we have into enough, and more. It turns denial into acceptance, chaos into order, confusion into clarity.",
      icon: "Heart",
      color: "var(--color-calm)",
      theme: "gratitude",
      dateSaved: "2023-06-10T16:45:00Z",
      isFavorite: true
    },
    {
      id: "card4",
      title: "Self-Compassion",
      message: "Be kinder to yourself. And then let your kindness flood the world.",
      icon: "HeartHandshake",
      color: "var(--color-info)",
      theme: "mindfulness",
      dateSaved: "2023-06-18T11:20:00Z",
      isFavorite: false
    },
    {
      id: "card5",
      title: "Motivation",
      message: "The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle.",
      icon: "Rocket",
      color: "var(--color-anxious)",
      theme: "motivation",
      dateSaved: "2023-07-05T13:10:00Z",
      isFavorite: false
    },
    {
      id: "card6",
      title: "Calm",
      message: "Peace is the result of retraining your mind to process life as it is, rather than as you think it should be.",
      icon: "Cloud",
      color: "var(--color-calm)",
      theme: "calm",
      dateSaved: "2023-07-12T10:30:00Z",
      isFavorite: false
    },
    {
      id: "card7",
      title: "Growth",
      message: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      icon: "Sprout",
      color: "var(--color-success)",
      theme: "motivation",
      dateSaved: "2023-07-20T15:45:00Z",
      isFavorite: true
    }
  ];

  const [cards, setCards] = useState(initialCards);
  const [filteredCards, setFilteredCards] = useState(initialCards);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(null);

  useEffect(() => {
    let result = [...cards];
    
    // Apply theme filter
    if (activeFilter !== "all") {
      result = result.filter(card => card.theme === activeFilter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        card => 
          card.title.toLowerCase().includes(query) || 
          card.message.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.dateSaved) - new Date(a.dateSaved));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.dateSaved) - new Date(b.dateSaved));
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredCards(result);
  }, [cards, activeFilter, searchQuery, sortOption]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleRemoveCard = (cardId) => {
    setCardToRemove(cardId);
    setShowRemoveConfirm(true);
  };

  const confirmRemoveCard = () => {
    setCards(cards.filter(card => card.id !== cardToRemove));
    setShowRemoveConfirm(false);
    setCardToRemove(null);
  };

  const handleFavoriteCard = (cardId) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, isFavorite: !card.isFavorite } 
        : card
    ));
  };

  const handleShareCard = (cardId) => {
    // In a real app, this would implement sharing functionality
    console.log("Sharing card:", cardId);
    alert("Sharing functionality would be implemented here!");
  };

  const handleRandomCard = () => {
    if (filteredCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      const randomCard = filteredCards[randomIndex];
      
      // Scroll to the random card and highlight it
      const element = document.getElementById(`card-${randomCard.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('animate-pulse');
        setTimeout(() => {
          element.classList.remove('animate-pulse');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header />
        
        {/* Filter and Search */}
        <FilterBar 
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
        />
        
        {/* Random Card Button */}
        {filteredCards.length > 0 && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={handleRandomCard}
              className="flex items-center px-4 py-2 rounded-lg bg-primary-100 text-primary-700 transition-gentle hover:bg-primary-200"
            >
              <Icon name="Shuffle" size={18} className="mr-2" />
              Random Card
            </button>
          </div>
        )}
        
        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredCards.map(card => (
              <div key={card.id} id={`card-${card.id}`}>
                <CardItem 
                  card={card}
                  onRemove={handleRemoveCard}
                  onFavorite={handleFavoriteCard}
                  onShare={handleShareCard}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        
        {/* Navigation Links */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="heading-small text-neutral-700 mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/resources" className="flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-quick"
            >
              <div className="w-10 h-10 rounded-full bg-info bg-opacity-10 flex items-center justify-center mr-3">
                <Icon name="Lightbulb" size={20} className="text-info" />
              </div>
              <span className="body-medium">Resources</span>
            </Link>
            <Link 
              to="/user-profile-settings" className="flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-quick"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                <Icon name="Settings" size={20} className="text-neutral-600" />
              </div>
              <span className="body-medium">Settings</span>
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Your digital companion for wellbeing</p>
        </footer>
      </div>
      
      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="heading-medium text-neutral-800 mb-3">Remove Card</h3>
            <p className="body-medium text-neutral-600 mb-6">
              Are you sure you want to remove this card from your collection?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 transition-gentle hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveCard}
                className="px-4 py-2 rounded-lg bg-error text-white transition-gentle hover:bg-opacity-90"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCardsCollection;