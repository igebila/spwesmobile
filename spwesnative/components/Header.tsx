import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-yellow-500">
                SPWES
              </span>
              <span className="text-sm text-yellow-500/80">
                Sustainable Power and Water Engineering Solution
              </span>
            </div>
          </div>
          <div className="text-sm text-white/90 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Battery Management System Monitor
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;