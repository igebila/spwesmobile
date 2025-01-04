import { Text } from 'react-native';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import UARTSettings from '../components/UARTSettings';
import RawDataView from '../components/RawDataView';
import StatusCard from '../components/StatusCard';
import BatteryConfigComponent from '../components/BatteryConfig';
import { useBMSData } from '../hooks/useBMSData';
import SplashScreen from '../components/SplashScreen'; // Import SplashScreen component
import React, { useEffect, useState } from 'react';

function App() {
  const { 
    data,
    rawData,
    isConnected,
    connect,
    disconnect,
    portSettings,
    setPortSettings,
    batteryConfig,
    setBatteryConfig
  } = useBMSData(); // Fetching data and state management using the custom hook

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time, replace with your actual loading logic if needed
    setTimeout(() => {
      setIsLoading(false); // After 3 seconds, hide splash screen
    }, 7000); // Adjust time as needed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative">
      {isLoading ? (
        <SplashScreen /> // Show the splash screen while loading
      ) : (
        <>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="relative">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* UARTSettings component receives necessary props */}
                <UARTSettings
                  isConnected={isConnected}            // Connection status
                  // settings={portSettings}               // Port settings (e.g., baudRate, etc.)
                  // onSettingsChange={setPortSettings}   // Update port settings
                  onConnect={connect}                  // Connect function
                  onDisconnect={disconnect}            // Disconnect function
                />
                <BatteryConfigComponent
                  config={batteryConfig}               // Battery configuration (e.g., capacity, cells per module)
                  onConfigChange={setBatteryConfig}    // Update battery configuration
                />
                <StatusCard isConnected={isConnected} /> {/* Status of the connection */}
              </div>

              {/* Display Dashboard if data is available */}
              {data && (
                <div className="mt-8">
                  <Dashboard data={data} />
                </div>
              )}

              {/* Display Raw Data */}
              <div className="mt-8">
                <RawDataView rawData={rawData} />
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

export default App;