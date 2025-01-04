import { BMSData, BatteryConfig } from '../types';

export function parseRawData(rawData: string): BMSData {
  // Create mock data for testing
  return {
    voltage: 48.2 + Math.random() * 0.4,
    current: 10.5 + Math.random() * 2,
    temperature: 25 + Math.random() * 5,
    soc: 85 + Math.random() * 3,
    cellVoltages: Array(12).fill(0).map(() => 3.2 + Math.random() * 0.2),
    temperatures: Array(6).fill(0).map(() => 25 + Math.random() * 8),
    status: {
      charging: Math.random() > 0.5,
      fault: Math.random() > 0.9,
      balancing: Array(12).fill(0).map(() => Math.random() > 0.7)
    },
    bankInfo: {
      moduleCount: 4,
      remainingCapacity: 95000,
      totalCapacity: 100000,
      ratedCapacity: 100000,
      cycles: 150,
      soh: 95
    }
  };
}