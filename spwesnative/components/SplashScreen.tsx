// src/components/SplashScreen.tsx
import React from 'react';
import styled from 'styled-components';
import SPWESVideo from '../assets/SPWES.mp4';

export const SplashScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* Optional background color */
  z-index: 9999; /* Ensure splash screen is on top */

  & > img,
  & > video {
    width: 100%; /* Adjust size based on your requirement */
    height: auto;
  }
`;

const SplashScreenComponent = () => {
  return (
    <SplashScreen>
      <video autoPlay muted loop>
        <source src={SPWESVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </SplashScreen>
  );
};

export default SplashScreenComponent;
