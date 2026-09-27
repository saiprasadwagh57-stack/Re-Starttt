import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#0d0d11]/80 border-b border-white/[0.08] backdrop-blur-md px-4 py-2.5 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-neutral-200">Trust & Safety Layer:</strong> RE:START provides algorithmic guidance, not official legal advice. Always verify final filing with the designated authority.
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-neutral-300">Demo Prototype:</strong> Uses synthetic data only. Do not upload sensitive personal records.
          </span>
        </div>
      </div>
    </div>
  );
};
