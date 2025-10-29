import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const SoundControl = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // In a real app, this would be an actual audio file
    audioRef.current = new Audio("https://soundbible.com/mp3/Gentle_Rain-Mike_Koenig-1084237305.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    try {
      audioRef.current.play().catch(e => {
        console.log("Auto-play prevented by browser", e);
        setIsMuted(true);
      });
    } catch (error) {
      console.log("Audio play error", error);
      setIsMuted(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Play prevented", e));
      } else {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center transition-gentle hover:bg-opacity-30"
      aria-label={isMuted ? "Unmute calming sounds" : "Mute calming sounds"}
    >
      <Icon name={isMuted ? "VolumeX" : "Volume2"} size={24} color="white" />
    </button>
  );
};

export default SoundControl;