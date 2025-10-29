import React from 'react';
import Icon from '../../../components/AppIcon';

const CrisisResponseBubble = ({ onClose }) => {
  const crisisNumbers = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "14416",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "1234567890",
      description: "Text HOME to 1234567890"
    },
    {
      name: "Emergency Services",
      number: "1-8008914416",
      description: "For immediate danger"
    }
  ];

  const handleCall = (number) => {
    // Create a phone call link
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-4 shadow-lg animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={28} className="text-red-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-800 mb-3">
            🆘 Crisis Support Available
          </h3>
          <p className="text-red-700 mb-6 text-lg">
            <strong>You're not alone.</strong> Please reach out to these crisis support services right now:
          </p>
          
          <div className="space-y-4">
            {crisisNumbers.map((service, index) => (
              <div key={index} className="bg-white border-2 border-red-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{service.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <p className="text-2xl font-bold text-red-600">{service.number}</p>
                  </div>
                  <button
                    onClick={() => handleCall(service.number)}
                    className="ml-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Icon name="Phone" size={20} />
                    <span className="font-semibold">Call Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t-2 border-red-200">
            <p className="text-base text-red-600 font-medium">
              <strong>💙 Remember:</strong> Your life has value, and there are people who want to help you through this difficult time.
            </p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800 text-sm underline font-medium"
            >
              I understand, close this message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisResponseBubble;
