import { useState, useEffect, useCallback } from 'react';
import { BMSData, PortSettings, BatteryConfig } from '../types';
import { parseRawData } from '../utils/dataParser';

export function useBMSData() {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<BMSData | null>(null);
  const [rawData, setRawData] = useState<string>('');
  const [batteryConfig, setBatteryConfig] = useState<BatteryConfig>({
    capacity: 100,
    cellsPerModule: 12
  });
  const [portSettings, setPortSettings] = useState<PortSettings>({
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    path: ''
  });

  // Update mock data every second when connected
  useEffect(() => {
    if (!isConnected) return;

    const intervalId = setInterval(() => {
      const mockData = parseRawData('');
      setData(mockData);
      setRawData(JSON.stringify(mockData, null, 2));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isConnected]);

  const connect = useCallback(async () => {
    try {
      setIsConnected(true);
      const mockData = parseRawData('');
      setData(mockData);
      setRawData(JSON.stringify(mockData, null, 2));
    } catch (error) {
      console.error('Connection error:', error);
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setData(null);
    setRawData('');
  }, []);

  return {
    data,
    rawData,
    isConnected,
    connect,
    disconnect,
    portSettings,
    setPortSettings,
    batteryConfig,
    setBatteryConfig
  };
}