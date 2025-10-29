import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";

// Components
import Header from "./components/Header";
import DailyQuote from "./components/DailyQuote";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import ResourceCard from "./components/ResourceCard";
import RecentlyViewed from "./components/RecentlyViewed";
import ResourceDetail from "./components/ResourceDetail";

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Mock data for categories
  const categories = [
    { id: "articles", name: "Articles", icon: "FileText" },
    { id: "self-care", name: "Self-Care", icon: "Heart" },
    { id: "anxiety", name: "Anxiety", icon: "Wind" },
    { id: "depression", name: "Depression", icon: "Cloud" },
    { id: "sleep", name: "Sleep", icon: "Moon" },
  ];

  // Mock data for suggested keywords
  const suggestedKeywords = [
    "Meditation", "Breathing exercises", "Anxiety relief", 
    "Sleep improvement", "Stress management", "Mindfulness",
    "Depression coping", "Self-care routine", "Positive thinking"
  ];

  // Mock data for daily quote
  const [dailyQuote, setDailyQuote] = useState({
    id: "quote1",
    text: "You don\'t have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    isSaved: false
  });

  // Mock data for resources
  const resourcesData = [
    {
      id: "r1",
      title: "Understanding Anxiety: Causes and Coping Mechanisms",
      description: "Learn about the root causes of anxiety and discover effective strategies to manage anxious thoughts and feelings in daily life.",
      category: "Anxiety",
      readTime: 8,
      difficulty: 2,
      imageUrl: "https://images.unsplash.com/photo-1474418397713-2f1091853e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: false,
      content: `Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily activities. This article explores the biological and psychological factors that contribute to anxiety disorders.

      The body's fight-or-flight response plays a crucial role in anxiety. When we perceive a threat, our amygdala (the brain's fear center) triggers a cascade of hormones that prepare us for danger. In anxiety disorders, this system becomes overactive, responding to situations that aren't actually threatening.

      Cognitive factors also contribute significantly to anxiety. Negative thought patterns, catastrophizing, and overestimating threats can maintain and worsen anxiety. Understanding these patterns is the first step toward changing them.

      Effective coping strategies include mindfulness meditation, which helps bring awareness to the present moment rather than worrying about the future. Regular practice can actually change brain structures associated with anxiety and stress.

      Cognitive-behavioral techniques focus on identifying and challenging anxious thoughts. By questioning the evidence for your fears and considering alternative perspectives, you can reduce anxiety's grip.

      Physical exercise is another powerful tool, releasing endorphins and reducing stress hormones. Even a short daily walk can make a significant difference in anxiety levels.

      Deep breathing exercises activate the parasympathetic nervous system, countering the fight-or-flight response. Try breathing in for a count of four, holding for seven, and exhaling for eight.`,
      tips: [
        "Practice the 5-4-3-2-1 grounding technique when feeling anxious",
        "Schedule 'worry time' to contain anxious thoughts",
        "Limit caffeine and alcohol which can worsen anxiety",
        "Maintain a consistent sleep schedule",
        "Connect with supportive people regularly"
      ]
    },
    {
      id: "r2",
      title: "The Science of Sleep: Improving Your Rest Quality",
      description: "Discover the latest research on sleep cycles and practical tips to improve your sleep quality for better mental health.",
      category: "Sleep",
      readTime: 6,
      difficulty: 1,
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: false,
      content: `Sleep is fundamental to our mental and physical wellbeing, yet many of us struggle to get quality rest. This article explores the science behind sleep and offers practical strategies for improvement.

      Sleep occurs in cycles of approximately 90 minutes, moving through different stages including light sleep, deep sleep, and REM (rapid eye movement) sleep. Each stage serves important functions, from physical restoration to memory consolidation and emotional processing.

      The circadian rhythm, our internal body clock, regulates sleep-wake cycles primarily through the hormone melatonin. Exposure to light, especially blue light from screens, can disrupt melatonin production and make falling asleep more difficult.

      Creating an optimal sleep environment is essential. Your bedroom should be cool (around 65°F/18°C), dark, and quiet. Consider blackout curtains, white noise machines, or earplugs if needed.

      Establishing a consistent sleep schedule helps regulate your body clock. Try to go to bed and wake up at the same times every day, even on weekends. This consistency reinforces your circadian rhythm.

      A calming bedtime routine signals to your body that it's time to wind down. Activities might include reading (not on a screen), gentle stretching, or a warm bath. Avoid stimulating activities or difficult conversations before bed.

      What you consume affects sleep quality. Limit caffeine after noon, avoid large meals close to bedtime, and be aware that while alcohol might help you fall asleep initially, it disrupts sleep cycles later in the night.`,
      tips: [
        "Establish a consistent sleep schedule, even on weekends",
        "Create a relaxing bedtime routine",
        "Keep your bedroom cool, dark, and quiet",
        "Avoid screens 1-2 hours before bed",
        "Limit caffeine and alcohol"
      ]
    },
    {
      id: "r3",
      title: "Mindfulness Practices for Everyday Life",
      description: "Simple mindfulness techniques you can incorporate into your daily routine to reduce stress and increase present-moment awareness.",
      category: "Self-Care",
      readTime: 5,
      difficulty: 1,
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: true,
      content: `Mindfulness is the practice of paying attention to the present moment with openness, curiosity, and acceptance. This article explores how to integrate mindfulness into everyday activities for greater wellbeing.

      Mindfulness doesn't require hours of meditation or special equipment. You can practice it while doing routine activities like brushing your teeth, washing dishes, or walking. The key is to fully engage your senses and notice details you might normally overlook.

      When eating mindfully, for example, slow down and notice the colors, textures, smells, and flavors of your food. Put away distractions like phones or television, and pay attention to how the food makes you feel.

      Mindful breathing is perhaps the simplest practice. Pause for a moment and bring your attention to your breath. Notice the sensation of air moving in and out of your body without trying to change anything. When your mind wanders (which is natural), gently bring your focus back to your breath.

      Mindful listening transforms conversations. Give your full attention to the speaker without planning what you'll say next. Notice not just their words but their tone, facial expressions, and body language. This deepens connection and understanding.The STOP practice is useful during stressful moments: Stop what you're doing, Take a breath, Observe what's happening in your body and mind, and Proceed with awareness.

      Research shows that regular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, and even strengthen immune function. The benefits build over time, so consistency matters more than duration.`,
      tips: [
        "Start with just 5 minutes of mindful breathing daily",
        "Use daily activities as mindfulness triggers",
        "Practice the STOP technique during stressful moments",
        "Try a body scan before sleep to release tension",
        "Use mindful walking during breaks"
      ]
    },
    {
      id: "r4",
      title: "Building Resilience Through Difficult Times",
      description: "Strategies to develop emotional resilience and bounce back stronger when facing life\'s challenges and setbacks.",
      category: "Self-Care",
      readTime: 7,
      difficulty: 2,
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: false,
      content: `Resilience is the ability to adapt and bounce back when things don't go as planned. This article explores practical ways to build this crucial skill for mental wellbeing.

      Resilience isn't about avoiding difficulties or always being strong. Rather, it's about developing the tools and mindset to navigate challenges effectively and grow from them. Research shows that resilience can be developed with practice.

      Maintaining perspective during difficult times is essential. Ask yourself: "Will this matter in five years?" and "What\'s the worst that could realistically happen?" This helps prevent catastrophizing and keeps challenges in proportion.

      Building a support network provides both practical help and emotional backing during tough times. Cultivate relationships with people who lift you up, and don\'t hesitate to reach out when you need support.

      Self-compassion is a cornerstone of resilience. Treat yourself with the same kindness you would offer a good friend facing difficulty. Remember that imperfection and struggle are part of the shared human experience.

      Finding meaning in adversity transforms how we experience it. Ask what you can learn from the situation or how it might help you grow. Many resilient people report that their greatest growth came from their most difficult experiences.

      Taking care of physical needs supports emotional resilience. Adequate sleep, regular exercise, and good nutrition provide the energy needed to cope with challenges. Even small improvements in these areas can significantly impact resilience.`,
      tips: [
        "Practice reframing negative situations to find opportunities",
        "Develop a regular gratitude practice",
        "Set small, achievable goals during difficult periods",
        "Create a self-care emergency plan for tough times",
        "Learn from role models who demonstrate resilience"
      ]
    },
    {
      id: "r5",
      title: "Understanding Depression: Signs, Causes, and Treatment",
      description: "An informative guide to recognizing depression symptoms, understanding potential causes, and exploring effective treatment options.",
      category: "Depression",
      readTime: 10,
      difficulty: 3,
      imageUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: false,
      content: `Depression is more than just feeling sad—it's a complex mental health condition that affects how you think, feel, and handle daily activities. This article provides an overview of depression, its symptoms, causes, and treatment approaches.

      Common symptoms of depression include persistent sadness, loss of interest in activities once enjoyed, changes in appetite or weight, sleep disturbances, fatigue, feelings of worthlessness or guilt, difficulty concentrating, and thoughts of death or suicide. Depression can also manifest physically as headaches, digestive problems, or chronic pain.

      Depression has multiple potential causes, often working in combination. Biological factors include genetics, brain chemistry imbalances, and certain medical conditions. Psychological factors involve personality traits like pessimism or low self-esteem, while environmental factors include trauma, loss, chronic stress, or major life changes.

      Professional treatment typically involves psychotherapy, medication, or a combination of both. Cognitive-behavioral therapy (CBT) helps identify and change negative thought patterns, while interpersonal therapy focuses on improving relationships and social functioning. Medications like selective serotonin reuptake inhibitors (SSRIs) can help correct chemical imbalances in the brain.

      Lifestyle changes can significantly support recovery. Regular physical activity increases endorphins and can be as effective as medication for mild to moderate depression. Social connection, even when it feels difficult, provides crucial support. Setting small, achievable goals helps rebuild confidence and a sense of control.

      If you're experiencing symptoms of depression, remember that seeking help is a sign of strength, not weakness. Depression is highly treatable, and most people who receive appropriate treatment experience improvement in their symptoms.`,
      tips: [
        "Reach out to a healthcare provider if symptoms persist for more than two weeks",
        "Move your body daily, even if just for a short walk",
        "Maintain social connections even when you don't feel like it","Break tasks into small, manageable steps","Challenge negative thoughts by looking for evidence against them"
      ]
    },
    {
      id: "r6",title: "Effective Communication in Relationships",description: "Learn key communication skills to improve understanding, resolve conflicts, and deepen connections in your relationships.",category: "Articles",
      readTime: 6,
      difficulty: 2,
      imageUrl: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      isSaved: false,
      content: `Effective communication forms the foundation of healthy relationships, yet it's a skill many of us never formally learn. This article explores practical techniques to improve how you connect with others.

      Active listening is perhaps the most important communication skill. It involves fully focusing on the speaker, acknowledging their message, and responding thoughtfully. Put away distractions, maintain appropriate eye contact, and resist the urge to formulate your response while the other person is still speaking.

      "I" statements help express feelings without blaming or criticizing. Instead of saying "You always ignore me," try "I feel overlooked when my ideas aren't acknowledged." This approach reduces defensiveness and opens the door to productive conversation.

      Nonverbal communication—facial expressions, body language, tone of voice—often conveys more than words. Ensure your nonverbal cues match your message, and pay attention to others' nonverbal signals which may reveal unspoken feelings.

      Timing matters in communication. Bringing up sensitive topics when someone is tired, hungry, or stressed typically leads to poor outcomes. Ask if it's a good time to talk, or schedule a conversation when both parties can be fully present.Conflict is inevitable in relationships, but how we handle it determines whether it strengthens or damages the connection. Approach disagreements with curiosity rather than combativeness. Seek to understand the other person's perspective before advocating for your own.

      Emotional awareness enables better communication. Recognize your own emotional triggers and learn to pause before responding when activated. Similarly, validate others' emotions even when you don't share their perspective.`,
      tips: [
        "Practice reflective listening by paraphrasing what you've heard",
        "Take a timeout if emotions become too intense during conflicts",
        "Ask open-ended questions to deepen understanding",
        "Notice and name your emotions before responding",
        "Express appreciation regularly to balance difficult conversations"
      ]
    }
  ];

  useEffect(() => {
    // Initialize resources
    setResources(resourcesData);
    
    // Initialize recently viewed with 3 random resources
    const randomResources = [...resourcesData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRecentlyViewed(randomResources);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    
    // Add to recently viewed if not already there
    if (!recentlyViewed.some(item => item.id === resource.id)) {
      setRecentlyViewed(prev => [resource, ...prev].slice(0, 3));
    }
  };

  const handleCloseResource = () => {
    setSelectedResource(null);
  };

  const handleSaveResource = (resource) => {
    setResources(prev => 
      prev.map(item => 
        item.id === resource.id 
          ? { ...item, isSaved: !item.isSaved } 
          : item
      )
    );
    
    if (selectedResource && selectedResource.id === resource.id) {
      setSelectedResource({ ...selectedResource, isSaved: !selectedResource.isSaved });
    }
  };

  const handleSaveQuote = (quote) => {
    setDailyQuote({ ...dailyQuote, isSaved: !dailyQuote.isSaved });
  };

  // Filter resources based on active category and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === "all" || 
      resource.category.toLowerCase() === activeCategory;
    
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header />
        
        {/* Daily Quote */}
        <DailyQuote quote={dailyQuote} onSave={handleSaveQuote} />
        
        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch} 
          suggestedKeywords={suggestedKeywords} 
        />
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {/* Recently Viewed */}
        <RecentlyViewed 
          recentItems={recentlyViewed} 
          onViewItem={handleViewResource} 
        />
        
        {/* Resources Grid */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-medium text-neutral-700">
              {activeCategory === "all" ? "All Resources" : categories.find(c => c.id === activeCategory)?.name || "Resources"}
            </h2>
            <Link to="/my-cards-collection" className="text-primary-500 flex items-center body-small">
              Saved items <Icon name="ChevronRight" size={16} className="ml-1" />
            </Link>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map(resource => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  onSave={handleSaveResource}
                  onView={handleViewResource}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Icon name="Search" size={32} className="mx-auto mb-3 text-neutral-400" />
              <h3 className="heading-small text-neutral-700 mb-2">No resources found</h3>
              <p className="body-medium text-neutral-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="text-center text-neutral-500 body-small mt-8">
          <p>© {new Date().getFullYear()} Mental Health Chatbot</p>
          <p className="mt-1">Your digital companion for wellbeing</p>
        </footer>
      </div>
      
      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetail 
          resource={selectedResource} 
          onClose={handleCloseResource}
          onSave={handleSaveResource}
        />
      )}
    </div>
  );
};

export default Resources;