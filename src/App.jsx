import React, { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setShowMessage(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setShowMessage(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setShowMessage(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-900">
      <div className={`mb-4 transition-opacity duration-500 ease-in-out ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-black-400 text-2xl font-mono animate-pulse">Time to focus!</p>
      </div>
      <div className="bg-red-800 p-8 rounded-lg shadow-lg border-2 border-black-400">
        <h1 className="text-4xl font-bold mb-6 text-center text-black-400 font-mono">Pomodor🍅🍅</h1>
        <div className="text-7xl font-bold text-center mb-8 font-mono text-black-900 glow">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-green-600 hover:bg-black-700 text-white font-bold py-3 px-6 rounded-full font-mono transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full font-mono transition duration-300 ease-in-out transform hover:scale-105"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;