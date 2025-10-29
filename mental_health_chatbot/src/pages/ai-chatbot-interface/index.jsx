import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import ConversationControls from "./components/ConversationControls";
import EmergencyBanner from "./components/EmergencyBanner";
import Icon from "../../components/AppIcon";
import { callOpenRouterStream, clearConversationFromSupabase, checkForEmergencyKeywords, checkForCrisisIndicators, getCrisisResponseMessage, checkForMeditationSuggestions } from "../../services/chatService";
import speechToTextService from "../../services/speechToTextService";

const AIChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [speechError, setSpeechError] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const chatContainerRef = useRef(null);

  // Start with a clean chat - no fake conversation
  const initialMessages = [
    {
      id: 1,
      sender: "bot",
      content: "Hello! I'm your mental wellness companion. How are you feeling today?",
      timestamp: new Date(),
      type: "text"
    }
  ];

  // Load initial messages
  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Setup speech recognition service
  useEffect(() => {
    // Set up speech recognition callbacks
    speechToTextService.setCallbacks({
      onResult: (result) => {
        if (result.isFinal && result.finalTranscript) {
          // Send the final transcript as a message
          handleSendMessage(result.finalTranscript);
          setInterimTranscript("");
        } else if (result.interimTranscript) {
          // Show interim results
          setInterimTranscript(result.interimTranscript);
        }
      },
      onError: (error) => {
        console.error('Speech recognition error:', error);
        setSpeechError(error);
        setIsRecording(false);
        setInterimTranscript("");
      },
      onStart: () => {
        console.log('Speech recognition started');
        setIsRecording(true);
        setSpeechError(null);
        setInterimTranscript("");
      },
      onEnd: () => {
        console.log('Speech recognition ended');
        setIsRecording(false);
        setInterimTranscript("");
      }
    });

    // Cleanup on unmount
    return () => {
      if (speechToTextService.getRecordingState().isRecording) {
        speechToTextService.abortRecording();
      }
    };
  }, []);

  // Check for emergency keywords (now imported from service)

  // Handle sending a new message
  const handleSendMessage = async (content) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content,
      timestamp: new Date(),
      type: "text"
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Check for emergency keywords and crisis indicators
    const isEmergency = checkForEmergencyKeywords(content);
    const isCrisis = checkForCrisisIndicators(content);
    
    console.log('Crisis detection in main component:', { content, isEmergency, isCrisis });
    
    if (isEmergency) {
      setShowEmergencyBanner(true);
    }
    
    // Set loading state
    setIsLoading(true);
    setCurrentBotMessage("");
    
    // Create a placeholder bot message for streaming
    const botMessageId = messages.length + 2;
    const botMessage = {
      id: botMessageId,
          sender: "bot",
      content: "",
          timestamp: new Date(),
      type: "text"
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    try {
      // If crisis indicators are detected, provide immediate crisis response
      if (isEmergency || isCrisis) {
        console.log('Crisis detected! Creating crisis response...');
        const crisisResponse = getCrisisResponseMessage();
        const crisisNumbers = [
          {
            name: "National Suicide Prevention Lifeline",
            number: "988",
            description: "24/7 crisis support"
          },
          {
            name: "Crisis Text Line",
            number: "741741",
            description: "Text HOME to 741741"
          },
          {
            name: "Emergency Services",
            number: "911",
            description: "For immediate danger"
          }
        ];
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { 
                  ...msg, 
                  content: crisisResponse,
                  type: "crisis",
                  crisisNumbers: crisisNumbers
                }
              : msg
          )
        );
        setIsLoading(false);
        return;
      }
      
      await callOpenRouterStream(
        content,
        // onChunk - called for each chunk of the response
        (chunk) => {
          setCurrentBotMessage(prev => prev + chunk);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        // onComplete - called when the response is complete
        (fullResponse) => {
          setCurrentBotMessage(fullResponse);
          
          // Check if the response suggests meditation
          if (checkForMeditationSuggestions(fullResponse)) {
            // Convert to meditation message type
            setMessages(prev => 
              prev.map(msg => 
                msg.id === botMessageId 
                  ? { 
                      ...msg, 
                      type: "meditation",
                      meditationTitle: "Guided Meditation",
                      content: fullResponse
                    }
                  : msg
              )
            );
          }
          
          setIsLoading(false);
        },
        // onError - called if there's an error
        (error) => {
          console.error('Error getting AI response:', error);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }
                : msg
            )
          );
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Error calling AI service:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  // Toggle voice recording
  const handleToggleRecording = () => {
    if (!speechToTextService.isSpeechRecognitionSupported()) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      // Stop recording
      speechToTextService.stopRecording();
    } else {
      // Start recording
      setSpeechError(null);
      setInterimTranscript("");
      speechToTextService.startRecording();
    }
  };


  // Clear chat history
  const handleClearChat = async () => {
    setMessages(initialMessages);
    setShowEmergencyBanner(false);
    await clearConversationFromSupabase(); // Clear the AI conversation history from Supabase
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <ChatHeader userName="Sarah" />
      
      <ConversationControls 
        onClearChat={handleClearChat}
      />
      
      <div 
      ref={chatContainerRef}
      className="flex-1 p-4 overflow-y-auto pb-40" // increased bottom padding
      style={{ maxHeight:"calc(100vh - 200px)" }} // adjust based on navbar height
      >

        {showEmergencyBanner && (
          <EmergencyBanner onClose={() => setShowEmergencyBanner(false)} />
        )}
        
        {/* Debug panel for crisis detection
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gradient-to-r from-yellow-100 to-pink-100 border border-yellow-200 rounded-xl p-3 mb-4 text-sm shadow-sm">
            <strong className="text-yellow-700">Debug:</strong> <span className="text-pink-600">Check console for crisis detection logs</span>
          </div>
        )} */}
        
        {messages.map(message => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          isUser={message.sender === "user"} 
        />
        ))}
        
        {/* Show interim transcript while recording */}
        {interimTranscript && (
          <div className="flex justify-end mb-4">
            <div className="bg-purple-100 border border-purple-200 rounded-2xl px-4 py-3 max-w-xs lg:max-w-md">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-700 italic">{interimTranscript}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Show speech recognition error */}
        {speechError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} className="text-red-500" />
              <span className="text-sm text-red-700">{speechError}</span>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 p-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm text-purple-600 font-medium">AI is thinking...</span>
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        speechError={speechError}
        onClearSpeechError={() => setSpeechError(null)}
      />
    </div>
  );
};

export default AIChatbotInterface;