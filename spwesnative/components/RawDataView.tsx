import React, { useRef, useEffect } from 'react';

interface RawDataViewProps {
  rawData?: string;
}

const RawDataView: React.FC<RawDataViewProps> = ({ rawData }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [rawData]);

  // Keep only the last 50 lines of raw data
  const processedData = rawData?.split('\n').slice(-50).join('\n') || '';

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4 text-white">Raw Data</h2>
      <pre 
        ref={preRef}
        className="bg-slate-900/50 p-4 rounded-lg border border-white/5 overflow-auto text-sm font-mono h-64 text-green-400"
      >
        {processedData || 'Waiting for data...'}
      </pre>
    </div>
  );
};

export default RawDataView;