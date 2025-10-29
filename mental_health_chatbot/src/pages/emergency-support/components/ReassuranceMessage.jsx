import React, { useState, useEffect } from "react";

const ReassuranceMessage = () => {
  const messages = [
    "You're not alone",
    "This feeling will pass",
    "Take one breath at a time",
    "You are safe right now",
    "Focus on the present moment",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-8">
      <h2 className="display-medium text-white mb-2">{messages[currentMessage]}</h2>
      <p className="body-medium text-white text-opacity-80">
        We're here to help you through this moment
      </p>
    </div>
  );
};

export default ReassuranceMessage;