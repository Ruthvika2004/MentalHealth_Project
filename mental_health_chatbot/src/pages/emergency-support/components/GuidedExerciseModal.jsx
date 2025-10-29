import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const GuidedExerciseModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Find 5 things you can see",
      instruction: "Look around you and name 5 things you can see right now.",
      icon: "Eye"
    },
    {
      title: "Find 4 things you can touch",
      instruction: "Notice 4 things you can physically feel right now.",
      icon: "Hand"
    },
    {
      title: "Find 3 things you can hear",
      instruction: "Listen for 3 different sounds around you.",
      icon: "Ear"
    },
    {
      title: "Find 2 things you can smell",
      instruction: "Notice 2 scents in your environment.",
      icon: "Wind"
    },
    {
      title: "Find 1 thing you can taste",
      instruction: "Notice 1 taste in your mouth right now.",
      icon: "Coffee"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-800 bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-primary-600 rounded-2xl p-6 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white" aria-label="Close exercise"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
            <Icon name={steps[currentStep].icon} size={32} color="white" />
          </div>
          <h2 className="heading-large text-white mb-2">{steps[currentStep].title}</h2>
          <p className="body-medium text-white text-opacity-80">
            {steps[currentStep].instruction}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`w-8 h-2 rounded-full ${index === currentStep ? 'bg-white' : 'bg-white bg-opacity-30'}`}
              ></div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-lg bg-white text-primary-600 heading-small"
          >
            {currentStep < steps.length - 1 ? "Next" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedExerciseModal;