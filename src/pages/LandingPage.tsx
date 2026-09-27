import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Split, 
  Zap, 
  Layers, 
  CheckCircle2, 
  Smartphone, 
  Landmark, 
  FileText, 
  RotateCcw,
  Clock,
  Award
} from 'lucide-react';
import { FloatingHeroCard } from '../components/FloatingHeroCard';
import { ParallelProcessVisualizer } from '../components/ParallelProcessVisualizer';
import { RecoveryPlan } from '../types';

interface LandingPageProps {
  activePlan: RecoveryPlan;
  onStartRecovery: () => void;
  onOpenMap: () => void;
  onOpenActions: () => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  activePlan,
  onStartRecovery,
  onOpenMap,
  onOpenActions,
  onOpenDemo,
}) => {
  const [chainMode, setChainMode] = useState<'problem' | 'solution'>('solution');

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-12 sm:pt-20 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Apple-style ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Hero Copy */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold text-neutral-300 mb-6 backdrop-blur-xl shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>✦ AI LIFE-ADMIN RECOVERY ENGINE</span>
            </div>

            {/* Huge heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              When everything gets complicated,{' '}
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                RE:START finds the way forward.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mb-8 leading-relaxed font-normal">
              Tell us what happened. We'll figure out what depends on what, and what you need to do first.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onStartRecovery}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <span>Start Recovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-sm font-semibold text-neutral-200 hover:text-white flex items-center justify-center gap-2 transition-all backdrop-blur-xl"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>See Judge Demo</span>
              </button>
            </div>

            {/* Proof indicators */}
            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-white/[0.08] text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Bureaucratic Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Topological Dependency Graph</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Glass Interface */}
          <div className="flex-1 w-full flex justify-center">
            <FloatingHeroCard onOpenMap={onOpenMap} onOpenActions={onOpenActions} />
          </div>
        </div>
      </section>

      {/* SECTION 1: "One problem can create ten more." */}
      <section className="w-full py-16 px-4 sm:px-6 border-t border-white/[0.08] bg-[#070709]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
              <span>Section 01</span>
              <span>•</span>
              <span>The Cascading Chaos Problem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              One problem can create ten more.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
              In the real world, modern life services are tightly coupled through recursive identity and 2FA dependencies. When one breaks, everything locks up.
            </p>
          </div>

          {/* Toggle between Problem and Solution */}
          <div className="flex justify-center mb-8">
            <div className="p-1 rounded-full bg-white/[0.06] border border-white/10 flex items-center gap-1">
              <button
                onClick={() => setChainMode('problem')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  chainMode === 'problem'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                The Chaos Cascade (Without RE:START)
              </button>
              <button
                onClick={() => setChainMode('solution')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  chainMode === 'solution'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                The RE:START Inverted Solution
              </button>
            </div>
          </div>

          {/* Animated Dependency Chain Visual */}
          {chainMode === 'problem' ? (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.05)] animate-in fade-in duration-300">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>The Deadlock Loop</span>
                <span className="text-[11px] font-mono">Status: Frozen & Paralyzed</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
                  <span className="text-[10px] text-rose-400 font-mono block">STAGE 1</span>
                  <span className="text-sm font-bold text-white">Lost Phone</span>
                </div>
                <span className="text-neutral-600 font-mono text-xl">↓</span>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
                  <span className="text-[10px] text-rose-400 font-mono block">STAGE 2</span>
                  <span className="text-sm font-bold text-neutral-300">No OTP</span>
                </div>
                <span className="text-neutral-600 font-mono text-xl">↓</span>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
                  <span className="text-[10px] text-rose-400 font-mono block">STAGE 3</span>
                  <span className="text-sm font-bold text-neutral-300">Can't recover account</span>
                </div>
                <span className="text-neutral-600 font-mono text-xl">↓</span>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
                  <span className="text-[10px] text-rose-400 font-mono block">STAGE 4</span>
                  <span className="text-sm font-bold text-neutral-300">Can't access bank</span>
                </div>
                <span className="text-neutral-600 font-mono text-xl">↓</span>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 w-full sm:w-auto">
                  <span className="text-[10px] text-rose-400 font-mono block">STAGE 5</span>
                  <span className="text-sm font-bold text-rose-300">Can't use UPI</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel-highlight rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_0_40px_rgba(52,211,153,0.1)] animate-in fade-in duration-300">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>RE:START Algorithmic Inversion</span>
                <span className="text-[11px] font-mono text-emerald-300">Status: Resolved in 24 Hours</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 w-full sm:w-auto">
                  <span className="text-[10px] text-cyan-400 font-mono block">TRIGGER</span>
                  <span className="text-sm font-bold text-white">Lost Phone</span>
                </div>
                <span className="text-emerald-500 font-mono text-xl">→</span>
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 w-full sm:w-auto shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                  <span className="text-[10px] text-emerald-300 font-mono block font-bold">KEYSTONE #1</span>
                  <span className="text-sm font-bold text-white">Recover SIM</span>
                </div>
                <span className="text-emerald-500 font-mono text-xl">→</span>
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 w-full sm:w-auto">
                  <span className="text-[10px] text-cyan-400 font-mono block">DIGITAL ID</span>
                  <span className="text-sm font-bold text-white">Recover Identity</span>
                </div>
                <span className="text-emerald-500 font-mono text-xl">→</span>
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 w-full sm:w-auto">
                  <span className="text-[10px] text-cyan-400 font-mono block">SALARY LOCK</span>
                  <span className="text-sm font-bold text-white">Restore Bank</span>
                </div>
                <span className="text-emerald-500 font-mono text-xl">→</span>
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 w-full sm:w-auto">
                  <span className="text-[10px] text-cyan-400 font-mono block">FAST PAY</span>
                  <span className="text-sm font-bold text-white">Restore UPI</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: "Don't search. Just explain." */}
      <section className="w-full py-16 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Section 02 • Natural Language Intake
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Don't search. Just explain.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
              You don't need to know which government bureau handles your token, which form to print, or which department opens first. You speak or type naturally in your own words.
            </p>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Multilingual understanding (English, मराठी, हिंदी)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Voice-first mode for high-stress crisis moments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automatic entity recognition for lost credentials & services</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="glass-panel-highlight rounded-3xl p-6 border border-white/15">
              <div className="text-xs text-neutral-400 font-medium mb-3">Live Natural Language Input Sample</div>
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 text-sm text-neutral-100 font-mono leading-relaxed mb-4">
                “My backpack was stolen while travelling. Phone, SIM, Aadhaar and ATM card were inside. I need to access my bank account and receive my salary tomorrow.”
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/[0.06]">
                <span className="text-emerald-400 font-semibold">✓ Parsed: 4 assets, 6 dependencies</span>
                <button
                  onClick={onStartRecovery}
                  className="px-3 py-1 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200"
                >
                  Try Your Own →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: Parallel Process Detection Visualizer */}
      <section className="w-full py-16 px-4 sm:px-6 border-t border-white/[0.08] bg-[#070709]/50">
        <div className="max-w-6xl mx-auto">
          <ParallelProcessVisualizer plan={activePlan} onOpenActions={onOpenActions} />
        </div>
      </section>

      {/* SECTION 5: "Get back to normal." */}
      <section className="w-full py-20 px-4 sm:px-6 border-t border-white/[0.08] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Section 05 • Full Control</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Get back to normal.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Track your recovery in real time with automated document drafting, direct portal deep-links, and an intelligent assistant that knows your causal map.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartRecovery}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Launch Recovery Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenMap}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-sm font-semibold text-white transition-all backdrop-blur-xl flex items-center justify-center gap-2"
            >
              <span>Explore Dependency Graph</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
