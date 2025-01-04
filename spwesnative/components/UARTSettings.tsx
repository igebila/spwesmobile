import React, { useEffect, useState } from 'react';

interface UARTSettingsProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const UARTSettings: React.FC<UARTSettingsProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const [networkError, setNetworkError] = useState(false); // To track network connectivity issues

  // Function to check internet connectivity
  const checkInternetConnection = async () => {
    if (navigator.onLine) {
      try {
        // Try fetching from a CORS-friendly API for connectivity check
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
        if (response.ok) {
          setIsInternetConnected(true); // Internet is connected
          setNetworkError(false); // Reset network error state
          if (!isConnected) {
            onConnect(); // Automatically call onConnect if not already connected
          }
        } else {
          setIsInternetConnected(false); // If response is not OK, consider the internet not connected
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setIsInternetConnected(false); // If there is an error during fetch, consider the internet not connected
      }
    } else {
      setIsInternetConnected(false); // If offline, set to false
    }
  };

  // Effect to check internet connection on component mount and when isConnected changes
  useEffect(() => {
    checkInternetConnection();

    // Listen for online and offline events
    const handleOnline = () => {
      console.log('Network is back online');
      checkInternetConnection(); // Attempt to reconnect when the network comes back online
    };

    const handleOffline = () => {
      console.log('Network is offline');
      setIsInternetConnected(false); // Update state when network goes offline
      setNetworkError(true); // Show network error message
    };

    // Attach event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isConnected]); // Re-run when isConnected changes

  useEffect(() => {
    // Automatically call onDisconnect if we are already connected and internet connection is lost
    if (!isInternetConnected && isConnected) {
      console.log('Internet lost, disconnecting...');
      onDisconnect();
    }
  }, [isConnected, isInternetConnected, onDisconnect]);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4 text-white">UART Settings</h2>

      <div className="space-y-4">
        {/* Internet Connectivity Status */}
        {isInternetConnected ? (
          <p className="text-white">Internet is connected. You are now connected automatically.</p>
        ) : (
          <div>
            <p className="text-red-300">No internet. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UARTSettings;
