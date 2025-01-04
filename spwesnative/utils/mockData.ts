export const generateMockData = () => ({
  moduleInfo: {
    voltage: 48.2 + Math.random() * 0.4,
    current: 10.5 + Math.random() * 2,
    temperature: 25 + Math.random() * 5,
    stateOfCharge: 85 + Math.random() * 3
  },
  cellVoltages: Array(12).fill(0).map(() => 3.2 + Math.random() * 0.2),
  temperatures: Array(6).fill(0).map(() => 25 + Math.random() * 8),
  status: {
    charging: Math.random() > 0.5,
    discharging: Math.random() > 0.7,
    balancing: Math.random() > 0.8,
    error: Math.random() > 0.9
  }
});