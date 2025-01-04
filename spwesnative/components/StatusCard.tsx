import React from 'react';

interface StatusCardProps {
  isConnected: boolean;
}

const StatusCard: React.FC<StatusCardProps> = ({ isConnected }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4 text-white">Connection Status</h2>
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 ${
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`} />
        <span className={`font-medium ${
          isConnected ? 'text-green-400' : 'text-red-400'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      {isConnected && (
        <p className="text-sm text-white/60 mt-2">
          Successfully connected to BMS device
        </p>
      )}
    </div>
  );
};

export default StatusCard;