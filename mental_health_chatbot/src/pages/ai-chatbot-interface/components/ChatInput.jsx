import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const ChatInput = ({ onSendMessage, isRecording, onToggleRecording, speechError, onClearSpeechError }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      // Clear any speech errors when sending a text message
      if (onClearSpeechError) onClearSpeechError();
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-40">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <button 
            type="button"
            className={`p-3 rounded-full flex-shrink-0 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : speechError 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            } transition-colors`}
            onClick={onToggleRecording}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            <Icon name="Mic" size={20} />
          </button>
          
          <div className="flex-1 bg-neutral-100 rounded-2xl px-4 py-3 min-h-[48px] flex items-center">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Express how you're feeling..."
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-neutral-800 placeholder-neutral-500 min-h-[20px] max-h-[120px]"
              rows={1}
              disabled={isRecording}
              style={{ lineHeight: '20px' }}
            />
          </div>
          
          <button 
            type="submit"
            className="p-3 bg-purple-500 text-white rounded-full flex-shrink-0 shadow-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim() && !isRecording}
          >
            <Icon name="Send" size={20} />
          </button>
        </form>

        {isRecording && (
          <div className="mt-3 flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-neutral-600">Listening...</span>
          </div>
        )}
      </div>
    </div>

  );
};

export default ChatInput;