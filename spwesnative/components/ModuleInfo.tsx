import React from 'react';
import { BMSData } from '../types';

interface ModuleInfoProps {
  data: BMSData;
}

const ModuleInfo: React.FC<ModuleInfoProps> = ({ data }) => {
  const { bankInfo } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white">System Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/60">Pack Voltage</p>
            <p className="text-xl font-semibold text-white">{data.voltage.toFixed(2)}V</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Current</p>
            <p className="text-xl font-semibold text-white">{data.current.toFixed(3)}A</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Temperature</p>
            <p className="text-xl font-semibold text-white">{data.temperature.toFixed(1)}°C</p>
          </div>
          <div>
            <p className="text-sm text-white/60">State of Charge</p>
            <p className="text-xl font-semibold text-white">{data.soc}%</p>
          </div>
        </div>
      </div>

      {/* Bank Info */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white">Bank Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white/60">Total Capacity</p>
            <p className="text-xl font-semibold text-white">
              {(bankInfo.totalCapacity / 1000).toFixed(1)}Ah
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">Remaining</p>
            <p className="text-xl font-semibold text-white">
              {(bankInfo.remainingCapacity / 1000).toFixed(1)}Ah
            </p>
          </div>
          <div>
            <p className="text-sm text-white/60">Cycles</p>
            <p className="text-xl font-semibold text-white">{bankInfo.cycles}</p>
          </div>
          <div>
            <p className="text-sm text-white/60">Health</p>
            <p className="text-xl font-semibold text-white">{bankInfo.soh}%</p>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white">Status Indicators</h2>
        <div className="space-y-4">
          <StatusIndicator 
            label="Charging"
            active={data.status.charging}
            color="green"
          />
          <StatusIndicator 
            label="System Health"
            active={!data.status.fault}
            color={data.status.fault ? "red" : "green"}
          />
          <StatusIndicator 
            label="Cell Balancing"
            active={data.status.balancing.some(Boolean)}
            color="blue"
          />
        </div>
      </div>
    </div>
  );
};

interface StatusIndicatorProps {
  label: string;
  active: boolean;
  color: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  label, 
  active, 
  color 
}) => (
  <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
    <span className="text-white/80">{label}</span>
    <div className={`h-2 w-2 rounded-full ${
      active ? `bg-${color}-500 animate-pulse` : 'bg-gray-300'
    }`} />
  </div>
);

export default ModuleInfo;