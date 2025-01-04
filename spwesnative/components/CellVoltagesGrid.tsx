import React from 'react';

interface CellVoltagesGridProps {
  voltages: number[];
}

const CellVoltagesGrid: React.FC<CellVoltagesGridProps> = ({ voltages }) => {
  const minVoltage = Math.min(...voltages);
  const maxVoltage = Math.max(...voltages);
  const avgVoltage = voltages.reduce((a, b) => a + b, 0) / voltages.length;
  const delta = maxVoltage - minVoltage;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Cell Voltages</h2>
        <div className="flex gap-4">
          <StatBadge label="Min" value={`${minVoltage.toFixed(3)}V`} color="blue" />
          <StatBadge label="Max" value={`${maxVoltage.toFixed(3)}V`} color="red" />
          <StatBadge label="Δ" value={`${delta.toFixed(3)}V`} color="yellow" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {voltages.map((voltage, index) => {
          const deviation = voltage - avgVoltage;
          const deviationPercent = (deviation / avgVoltage) * 100;
          const isWarning = Math.abs(deviationPercent) > 5;
          const isCritical = Math.abs(deviationPercent) > 10;
          
          return (
            <div 
              key={index}
              className={`relative bg-white/5 rounded-lg p-4 border transition-all duration-300 ${
                isCritical 
                  ? 'border-red-500/50 shadow-red-500/20' 
                  : isWarning
                    ? 'border-yellow-500/50 shadow-yellow-500/20'
                    : 'border-green-500/50 shadow-green-500/20'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-white/60 text-sm">Cell {index + 1}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  deviation > 0 
                    ? 'bg-red-500/20 text-red-300' 
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {deviation > 0 ? '+' : ''}{deviation.toFixed(3)}V
                </span>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">
                {voltage.toFixed(3)}
                <span className="text-white/40 text-lg">V</span>
              </div>

              <div className="w-full bg-white/5 rounded-full h-1.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    isCritical 
                      ? 'bg-red-500' 
                      : isWarning
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${(voltage / maxVoltage) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatBadge: React.FC<{
  label: string;
  value: string;
  color: 'red' | 'blue' | 'yellow';
}> = ({ label, value, color }) => (
  <div className={`px-3 py-1 rounded-lg bg-${color}-500/20 border border-${color}-500/30`}>
    <div className="text-xs text-white/60">{label}</div>
    <div className={`text-sm font-semibold text-${color}-300`}>{value}</div>
  </div>
);

export default CellVoltagesGrid;