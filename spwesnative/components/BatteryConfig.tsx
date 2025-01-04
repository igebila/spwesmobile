import React from 'react';
import { BatteryConfig } from '../types';

interface BatteryConfigProps {
  config: BatteryConfig;
  onConfigChange: (config: BatteryConfig) => void;
}

const BatteryConfigComponent: React.FC<BatteryConfigProps> = ({ config, onConfigChange }) => {
  const handleChange = (key: keyof BatteryConfig, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    onConfigChange({
      ...config,
      [key]: key === 'cellsPerModule' ? Math.floor(numValue) : numValue
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4 text-white">Battery Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Battery Capacity (Ah)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={config.capacity}
            onChange={(e) => handleChange('capacity', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Cells per Module
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={config.cellsPerModule}
            onChange={(e) => handleChange('cellsPerModule', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default BatteryConfigComponent;