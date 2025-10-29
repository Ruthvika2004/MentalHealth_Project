import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const ToolModal = ({ tool, onClose, onToggleFavorite, isFavorite }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const totalSteps = tool.steps ? tool.steps.length : 0;

  useEffect(() => {
    if (tool.type === "breathing" && isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, tool.type]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlayPause = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (tool.audio && audioRef.current) {
      if (next) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch(_) {}
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: tool.color + "20" }}
              >
                <Icon name={tool.icon} size={24} color={tool.color} />
              </div>
              <div>
                <h2 className="heading-medium text-neutral-800">{tool.name}</h2>
                <p className="body-small text-neutral-500">{tool.duration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className="mr-2 text-neutral-400 hover:text-happy transition-quick"
                onClick={() => onToggleFavorite(tool.id)}
              >
                <Icon 
                  name={isFavorite ? "Star" : "StarOutline"} 
                  size={20} 
                  color={isFavorite ? "var(--color-happy)" : "currentColor"} 
                />
              </button>
              <button 
                className="text-neutral-400 hover:text-neutral-600 transition-quick"
                onClick={onClose}
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Tool content based on type */}
          {tool.type === "breathing" && (
            <div className="text-center mb-6">
              {tool.audio && (
                <audio ref={audioRef} src={tool.audio} preload="auto" />
              )}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full aura-glow"></div>
                <div
                  className="absolute inset-3 rounded-full overflow-hidden shadow-xl shadow-primary-500/10"
                  style={{ 
                    transform: `scale(${0.85 + (progress / 500)})`,
                    transition: "transform 0.25s ease-in-out"
                  }}
                >
                  <div className="fluid-sphere"></div>
                  <div className="fluid-sphere layer2"></div>
                </div>
                <svg className="absolute inset-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="ring" x1="0" x2="1">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0.4)" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ring)" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 290, strokeDashoffset: 290 - (290 * (progress / 100)) }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="heading-large text-neutral-700 drop-shadow-sm">
                      {progress < 33 ? "Inhale" : progress < 66 ? "Hold" : "Exhale"}
                  </p>
                    <p className="body-small text-neutral-500 tracking-wide">Breathe with the circle</p>
                  </div>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center mx-auto transition-gentle hover:bg-primary-600"
                onClick={handlePlayPause}
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={16} className="mr-2" />
                {isPlaying ? "Pause" : "Start"} Exercise
              </button>
              <style>{`
                .fluid-sphere {
                  position: absolute;
                  inset: -10%;
                  border-radius: 50%;
                  background: radial-gradient(120% 120% at 30% 30%, rgba(99, 102, 241, 0.35), rgba(99, 102, 241, 0.15) 40%, rgba(99, 102, 241, 0.05) 70%, transparent 100%),
                              radial-gradient(100% 100% at 70% 70%, rgba(56, 189, 248, 0.35), rgba(56, 189, 248, 0.15) 45%, rgba(56, 189, 248, 0.05) 75%, transparent 100%);
                  filter: blur(8px) saturate(120%);
                  animation: wobble1 7s ease-in-out infinite;
                  mix-blend-mode: normal;
                }
                .fluid-sphere.layer2 {
                  inset: -5%;
                  background: radial-gradient(110% 110% at 60% 35%, rgba(244, 114, 182, 0.25), rgba(244, 114, 182, 0.12) 45%, rgba(244, 114, 182, 0.04) 80%, transparent 100%),
                              radial-gradient(100% 100% at 35% 70%, rgba(99, 102, 241, 0.25), rgba(99, 102, 241, 0.1) 50%, rgba(99, 102, 241, 0.04) 80%, transparent 100%);
                  filter: blur(10px) saturate(120%);
                  animation: wobble2 9s ease-in-out infinite;
                }
                .aura-glow {
                  background: radial-gradient(60% 60% at 50% 40%, rgba(56, 189, 248, 0.25), transparent 60%),
                              radial-gradient(70% 70% at 55% 60%, rgba(99, 102, 241, 0.25), transparent 65%);
                  filter: blur(18px);
                  animation: pulse 6s ease-in-out infinite;
                }
                @keyframes wobble1 {
                  0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); border-radius: 55% 45% 60% 40%/55% 45% 60% 40%; }
                  25% { transform: translate3d(-4%, 3%, 0) scale(1.03) rotate(8deg); border-radius: 45% 55% 50% 50%/48% 52% 58% 42%; }
                  50% { transform: translate3d(3%, -3%, 0) scale(0.98) rotate(-6deg); border-radius: 60% 40% 55% 45%/50% 50% 45% 55%; }
                  75% { transform: translate3d(2%, 4%, 0) scale(1.02) rotate(6deg); border-radius: 50% 50% 45% 55%/58% 42% 52% 48%; }
                  100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); border-radius: 55% 45% 60% 40%/55% 45% 60% 40%; }
                }
                @keyframes wobble2 {
                  0% { transform: translate3d(0, 0, 0) scale(1.02) rotate(0deg); border-radius: 48% 52% 50% 50%/52% 48% 50% 50%; }
                  20% { transform: translate3d(4%, -2%, 0) scale(0.99) rotate(-5deg); border-radius: 58% 42% 45% 55%/46% 54% 50% 50%; }
                  50% { transform: translate3d(-3%, 3%, 0) scale(1.03) rotate(7deg); border-radius: 50% 50% 60% 40%/55% 45% 60% 40%; }
                  80% { transform: translate3d(-2%, -4%, 0) scale(1.01) rotate(4deg); border-radius: 45% 55% 50% 50%/48% 52% 58% 42%; }
                  100% { transform: translate3d(0, 0, 0) scale(1.02) rotate(0deg); border-radius: 48% 52% 50% 50%/52% 48% 50% 50%; }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.65; transform: scale(0.95); }
                  50% { opacity: 1; transform: scale(1.05); }
                }
              `}</style>
            </div>
          )}

          {tool.type === "grounding" && (
            <div className="mb-6">
              {tool.steps && (
                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                  <p className="heading-small text-neutral-700 mb-2">Step {currentStep} of {totalSteps}</p>
                  <p className="body-medium text-neutral-600">{tool.steps[currentStep - 1]}</p>
                </div>
              )}
              <div className="flex justify-between">
                <button
                  className={`px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 flex items-center transition-gentle hover:bg-neutral-50 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <Icon name="ChevronLeft" size={16} className="mr-2" />
                  Previous
                </button>
                <button
                  className={`px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center transition-gentle hover:bg-primary-600 ${currentStep === totalSteps ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleNext}
                  disabled={currentStep === totalSteps}
                >
                  Next
                  <Icon name="ChevronRight" size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {tool.type === "meditation" && (
            <div className="mb-6">
              <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                {tool.audio && (
                  <audio ref={audioRef} src={tool.audio} preload="auto" />
                )}
                <p className="body-medium text-neutral-600 mb-4">{tool.description}</p>
                <div className="flex justify-center mb-4">
                  <div className="bg-white rounded-full shadow-md p-3 flex items-center">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-quick" onClick={() => { if (audioRef.current) { audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); } }}>
                      <Icon name="SkipBack" size={20} />
                    </button>
                    <button 
                      className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mx-2 hover:bg-primary-600 transition-quick"
                      onClick={handlePlayPause}
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                    </button>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-quick" onClick={() => { if (audioRef.current) { audioRef.current.currentTime = Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + 10); } }}>
                      <Icon name="SkipForward" size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 body-small hover:bg-neutral-200 transition-quick">
                  Nature Sounds
                </button>
                <button className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 body-small hover:bg-neutral-200 transition-quick">
                  Rain
                </button>
                <button className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 body-small hover:bg-neutral-200 transition-quick">
                  Ocean Waves
                </button>
                <button className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 body-small hover:bg-neutral-200 transition-quick">
                  White Noise
                </button>
              </div>
            </div>
          )}

          {tool.type === "media" && (
            <div className="mb-6">
              <div className="aspect-video bg-neutral-100 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={tool.thumbnail} 
                  alt={tool.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <Icon name="Play" size={32} className="text-primary-600" />
                  </button>
                </div>
              </div>
              <p className="body-medium text-neutral-600 mb-4">{tool.description}</p>
              <a 
                href={tool.link} 
                target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center justify-center transition-gentle hover:bg-primary-600 w-full"
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Open Full Video
              </a>
            </div>
          )}

          <div className="border-t border-neutral-200 pt-4 mt-4">
            <h3 className="heading-small text-neutral-700 mb-2">Benefits</h3>
            <ul className="body-small text-neutral-600 space-y-2">
              {tool.benefits && tool.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Icon name="Check" size={16} className="text-success mr-2 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;