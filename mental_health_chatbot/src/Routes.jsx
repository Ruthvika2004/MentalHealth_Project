import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";

// Import pages
import HomeDashboard from "./pages/home-dashboard";
import MoodTracker from "./pages/mood-tracker";
import Journal from "./pages/journal";
import MentalWellnessTools from "./pages/mental-wellness-tools";
import Resources from "./pages/resources";
import UserProfileSettings from "./pages/user-profile-settings";
import MyCardsCollection from "./pages/my-cards-collection";
import AIChatbotInterface from "./pages/ai-chatbot-interface";
import EmergencySupport from "./pages/emergency-support";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomeDashboard /> },
    { path: "/home-dashboard", element: <HomeDashboard /> },
    { path: "/mood-tracker", element: <MoodTracker /> },
    { path: "/journal", element: <Journal /> },
    { path: "/mental-wellness-tools", element: <MentalWellnessTools /> },
    { path: "/resources", element: <Resources /> },
    { path: "/user-profile-settings", element: <UserProfileSettings /> },
    { path: "/my-cards-collection", element: <MyCardsCollection /> },
    { path: "/ai-chatbot-interface", element: <AIChatbotInterface /> },
    { path: "/emergency-support", element: <EmergencySupport /> },
  ]);

  return element;
};

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <ProjectRoutes />
        <Navigation />
      </div>
    </Router>
  );
};

export default Routes;