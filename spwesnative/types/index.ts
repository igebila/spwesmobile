export interface BMSData {
  voltage: number;
  current: number;
  temperature: number;
  soc: number;
  cellVoltages: number[];
  temperatures: number[];
  status: {
    charging: boolean;
    fault: boolean;
    balancing: boolean[];
  };
  bankInfo: {
    moduleCount: number;
    remainingCapacity: number;
    totalCapacity: number;
    ratedCapacity: number;
    cycles: number;
    soh: number;
  };
}

export interface PortSettings {
  baudRate: number;
  dataBits: number;
  stopBits: number;
  parity: string;
  path: string;
}

export interface BatteryConfig {
  capacity: number;
  cellsPerModule: number;
}