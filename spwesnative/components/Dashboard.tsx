import React from 'react';
import { BMSData } from '../types';
import CellVoltagesGrid from './CellVoltagesGrid';
import TemperatureGrid from './TemperatureGrid';

interface DashboardProps {
  data: BMSData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { bankInfo } = data;

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pack Voltage"
          value={`${data.voltage.toFixed(1)}V`}
          icon="⚡"
        />
        <StatCard
          label="Current"
          value={`${data.current.toFixed(3)}A`}
          icon="🔋"
          highlight={data.status.charging ? 'green' : undefined}
        />
        <StatCard
          label="Temperature"
          value={`${data.temperature.toFixed(1)}°C`}
          icon="🌡️"
          highlight={data.temperature > 40 ? 'red' : undefined}
        />
        <StatCard
          label="State of Charge"
          value={`${data.soc.toFixed(0)}%`}
          icon="📊"
          highlight={data.soc < 20 ? 'yellow' : undefined}
        />
      </div>

      {/* Bank Information */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white">Bank Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <InfoCard
            label="Modules"
            value={bankInfo.moduleCount.toString()}
          />
          <InfoCard
            label="Remaining"
            value={`${(bankInfo.remainingCapacity / 1000).toFixed(1)}Ah`}
          />
          <InfoCard
            label="Total"
            value={`${(bankInfo.totalCapacity / 1000).toFixed(1)}Ah`}
          />
          <InfoCard
            label="Rated"
            value={`${(bankInfo.ratedCapacity / 1000).toFixed(1)}Ah`}
          />
          <InfoCard
            label="Cycles"
            value={bankInfo.cycles.toString()}
          />
          <InfoCard
            label="Health"
            value={`${bankInfo.soh.toFixed(0)}%`}
          />
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 text-white">System Status</h2>
        <div className="space-y-4">
          <StatusIndicator 
            label="Charging Status"
            status={data.status.charging}
            color={data.status.charging ? 'green' : 'gray'}
            description={data.status.charging ? 'Charging' : 'Not Charging'}
          />
          <StatusIndicator 
            label="System Health"
            status={!data.status.fault}
            color={data.status.fault ? 'red' : 'green'}
            description={data.status.fault ? 'Fault Detected' : 'Normal'}
          />
          <StatusIndicator 
            label="Cell Balancing"
            status={data.status.balancing.some(Boolean)}
            color="blue"
            description={`${data.status.balancing.filter(Boolean).length} cells balancing`}
          />
        </div>
      </div>

      {/* Cell Voltages */}
      <CellVoltagesGrid voltages={data.cellVoltages} />

      {/* Temperature Grid */}
      <TemperatureGrid temperatures={data.temperatures} />
    </div>
  );
};

const StatCard: React.FC<{ 
  label: string;
  value: string;
  icon: string;
  highlight?: 'red' | 'yellow' | 'green';
}> = ({ label, value, icon, highlight }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10
    ${highlight ? `ring-2 ring-${highlight}-500/50` : ''}
  `}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-2xl">{icon}</span>
      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
        highlight 
          ? `bg-${highlight}-500/20 text-${highlight}-300` 
          : 'bg-white/5 text-white/80'
      }`}>
        {label}
      </span>
    </div>
    <div className="text-3xl font-bold text-white mt-2">{value}</div>
  </div>
);

const InfoCard: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
    <div className="text-sm text-white/60">{label}</div>
    <div className="font-semibold mt-1 text-white">{value}</div>
  </div>
);

const StatusIndicator: React.FC<{ 
  label: string;
  status: boolean;
  color: string;
  description: string;
}> = ({ label, status, color, description }) => (
  <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/5">
    <div className="flex items-center space-x-3">
      <div className={`w-3 h-3 rounded-full bg-${color}-500 animate-pulse`} />
      <span className="font-medium text-white">{label}</span>
    </div>
    <span className={`text-sm px-3 py-1 rounded-full bg-${color}-500/20 text-${color}-300`}>
      {description}
    </span>
  </div>
);

export default Dashboard;