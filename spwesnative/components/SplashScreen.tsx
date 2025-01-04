// src/components/SplashScreen.tsx
import React from 'react';
import SPWESVideo from '../assets/SPWES.mp4'; // Import the video

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <video autoPlay muted loop>
        <source src={SPWESVideo} type="video/mp4" /> {/* Use the imported video */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;
