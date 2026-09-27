import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Circle, Smartphone, Landmark, Shield, Zap } from 'lucide-react';

interface FloatingHeroCardProps {
  onOpenMap: () => void;
  onOpenActions: () => void;
}

export const FloatingHeroCard: React.FC<FloatingHeroCardProps> = ({
  onOpenMap,
  onOpenActions,
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ambient background glow */}
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/10 to-indigo-500/20 blur-2xl opacity-60 pointer-events-none" />

      {/* Main Apple-Glass Card */}
      <div className="relative rounded-[28px] glass-panel-highlight p-6 sm:p-7 border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-xs font-semibold text-white tracking-wide uppercase">RE:START AI Engine</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] font-medium">Optimal Path Found</span>
          </div>
        </div>

        {/* User Situation Quote */}
        <div className="my-5">
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">Human Story</div>
          <div className="text-base sm:text-lg font-medium text-neutral-100 italic bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3.5">
            “My phone and documents were stolen. I can't access my bank.”
          </div>
        </div>

        {/* Services & Dependency Chain */}
        <div className="mb-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-medium">
            <span>4 affected services identified</span>
            <span className="text-cyan-400 font-mono text-[11px]">Chain: 1 Root → 3 Leaves</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 items-center relative">
            {/* Step 1: SIM */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-1 text-emerald-300">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium text-emerald-300">SIM Access</span>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>ROOT</span>
              </div>
            </div>

            {/* Step 2: Identity */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 text-neutral-200">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium text-neutral-200">Identity</span>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-cyan-400">
                <Circle className="w-2 h-2 fill-cyan-400/40" />
                <span>e-KYC</span>
              </div>
            </div>

            {/* Step 3: Bank */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 text-neutral-300">
                <Landmark className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium text-neutral-300">Bank</span>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-400">
                <Circle className="w-2 h-2" />
                <span>2FA</span>
              </div>
            </div>

            {/* Step 4: UPI */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 text-neutral-400">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-medium text-neutral-400">UPI / Pay</span>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-500">
                <Circle className="w-2 h-2" />
                <span>Token</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended First Action Box */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/25 relative">
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Recommended First Action</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">#1 Leverage</span>
          </div>
          <div className="text-base font-semibold text-white mb-1">
            Recover Mobile Access (Duplicate SIM)
          </div>
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-emerald-300 font-medium">Why?</strong> Unlocks 3 subsequent processes: SMS OTP for DigiLocker Identity, NetBanking access, and UPI restoration.
          </div>
        </div>

        {/* Action Button Links */}
        <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            onClick={onOpenMap}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>Explore Dependency Map</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </button>
          <button
            onClick={onOpenActions}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <span>Execute Sequence</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
