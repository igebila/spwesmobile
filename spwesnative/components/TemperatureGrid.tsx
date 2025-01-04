import React from 'react';

interface TemperatureGridProps {
  temperatures: number[];
}

const TemperatureGrid: React.FC<TemperatureGridProps> = ({ temperatures }) => {
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;

  // Temperature thresholds
  const warningTemp = 40;
  const criticalTemp = 50;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">Temperature Sensors</h2>
        <div className="flex gap-4">
          <StatBadge label="Min" value={`${minTemp.toFixed(1)}°C`} color="blue" />
          <StatBadge label="Max" value={`${maxTemp.toFixed(1)}°C`} color="red" />
          <StatBadge label="Avg" value={`${avgTemp.toFixed(1)}°C`} color="yellow" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {temperatures.map((temp, index) => {
          const deviation = temp - avgTemp;
          const isWarning = temp >= warningTemp;
          const isCritical = temp >= criticalTemp;
          const percentage = Math.min((temp / criticalTemp) * 100, 100);
          
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
                <span className="text-white/60 text-sm">Sensor {index + 1}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  deviation > 0 
                    ? 'bg-red-500/20 text-red-300' 
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}°C
                </span>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">
                {temp.toFixed(1)}
                <span className="text-white/40 text-lg">°C</span>
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
                  style={{ width: `${percentage}%` }}
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

export default TemperatureGrid;