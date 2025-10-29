import React, { useState, useEffect } from "react";

const BreathingExercise = ({ isActive = true }) => {
  const [size, setSize] = useState(100);
  const [direction, setDirection] = useState("expand"); // expand or contract
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      if (direction === "expand") {
        setSize((prevSize) => {
          if (prevSize >= 180) {
            setDirection("contract");
            return 180;
          }
          return prevSize + 2;
        });
      } else {
        setSize((prevSize) => {
          if (prevSize <= 100) {
            setDirection("expand");
            return 100;
          }
          return prevSize - 2;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [direction, isActive, isPaused]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center mb-4">
        <div
          className="absolute bg-primary-300 bg-opacity-20 rounded-full transition-gentle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        ></div>
        <div
          className="absolute bg-primary-400 bg-opacity-30 rounded-full transition-gentle"
          style={{
            width: `${size * 0.8}px`,
            height: `${size * 0.8}px`,
          }}
        ></div>
        <div
          className="bg-primary-500 rounded-full flex items-center justify-center transition-gentle text-white"
          style={{
            width: `${size * 0.6}px`,
            height: `${size * 0.6}px`,
          }}
        >
          <span className="body-medium font-medium">
            {direction === "expand" ? "Breathe In" : "Breathe Out"}
          </span>
        </div>
      </div>
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="mt-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white body-small"
      >
        {isPaused ? "Resume" : "Pause"} Exercise
      </button>
    </div>
  );
};

export default BreathingExercise;