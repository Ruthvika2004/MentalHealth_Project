import React from "react";


const ChatbotSettings = ({ settings, onUpdate }) => {
  const personalityOptions = [
    { id: "supportive", label: "Supportive", description: "Warm, encouraging, and empathetic" },
    { id: "practical", label: "Practical", description: "Direct, solution-focused, and efficient" },
    { id: "motivational", label: "Motivational", description: "Energetic, positive, and inspiring" },
    { id: "educational", label: "Educational", description: "Informative, detailed, and explanatory" }
  ];

  return (
    <div id="chatbot">
      <h3 className="heading-small text-neutral-700 mb-4">Chatbot Customization</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-2">Chatbot Personality</label>
          <div className="space-y-2">
            {personalityOptions.map((option) => (
              <div 
                key={option.id}
                className={`p-3 border rounded-lg cursor-pointer transition-gentle ${
                  settings.chatbotPersonality === option.id 
                    ? 'border-primary-500 bg-primary-50' :'border-neutral-200 hover:border-primary-200'
                }`}
                onClick={() => onUpdate('chatbotPersonality', option.id)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    settings.chatbotPersonality === option.id 
                      ? 'border-primary-500' :'border-neutral-400'
                  }`}>
                    {settings.chatbotPersonality === option.id && (
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    )}
                  </div>
                  <span className="ml-2 body-medium font-medium text-neutral-800">{option.label}</span>
                </div>
                <p className="body-small text-neutral-500 ml-6">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-2">Response Length</label>
          <div className="px-2">
            <input
              type="range" min="1" max="3"
              value={settings.responseLength}
              onChange={(e) => onUpdate('responseLength', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="body-small text-neutral-500">Brief</span>
              <span className="body-small text-neutral-500">Balanced</span>
              <span className="body-small text-neutral-500">Detailed</span>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg">
          <label className="block label-medium text-neutral-700 mb-2">Example Response</label>
          <div className="p-3 bg-white border border-neutral-200 rounded-lg">
            <p className="body-small text-neutral-600">
              {settings.chatbotPersonality === "supportive" && "I understand this is difficult. You're doing really well by acknowledging these feelings, and I'm here to support you through this process."}
              {settings.chatbotPersonality === "practical" && "Let's break this down into manageable steps. First, identify the trigger. Then, try this breathing technique. After that, we can evaluate how you feel."}
              {settings.chatbotPersonality === "motivational" && "You've got this! Every small step is progress, and I believe in your ability to overcome this challenge. Let's focus on your strengths!"}
              {settings.chatbotPersonality === "educational" && "Anxiety activates your sympathetic nervous system. The techniques we're discussing help activate your parasympathetic system, which counteracts the stress response."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettings;