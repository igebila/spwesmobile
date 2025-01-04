import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="h-12 w-12"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill="none" 
        stroke="#22c55e" 
        strokeWidth="4"
      />
      
      {/* SPWES Symbol */}
      <g fill="#3b82f6" transform="translate(50 50) scale(0.95)">
        {/* Vertical Line */}
        <rect x="-4" y="-40" width="8" height="80" />
        
        {/* Sun Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="-4"
            y="-30"
            width="8"
            height="25"
            transform={`rotate(${angle})`}
          />
        ))}
        
        {/* Center Circle with G */}
        <circle cx="0" cy="0" r="15" />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill="#fbbf24"
          style={{ fontSize: '20px', fontWeight: 'bold' }}
        >
          G
        </text>
      </g>
    </svg>
  );
};

export default Logo;