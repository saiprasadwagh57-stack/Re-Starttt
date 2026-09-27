import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Split, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ArrowRight,
  GitBranch,
  FileText
} from 'lucide-react';
import { RecoveryPlan } from '../types';

interface JudgeDemoPageProps {
  onSelectPlan: (planId: string) => void;
  onNavigate: (route: string) => void;
}

export const JudgeDemoPage: React.FC<JudgeDemoPageProps> = ({
  onSelectPlan,
  onNavigate,
}) => {
  const rubricHighlights = [
    {
      title: 'Topological Dependency Graph',
      desc: 'Signature interactive DAG mapping root enablers to dependent leaves with soft glowing halos and unlock counts.',
      specRef: 'Spec Section 10 & 17',
    },
    {
      title: 'Parallel-Process Detection',
      desc: 'Separates strict sequential dependencies from concurrent non-blocking tasks (e.g. Police e-Report + Card Freeze in parallel).',
      specRef: 'Spec Section 11',
    },
    {
      title: 'Multilingual Natural Language Intake',
      desc: 'Accepts unstructured human storytelling in English, Marathi, and Hindi, automatically extracting affected services.',
      specRef: 'Spec Section 02, 07, 24',
    },
    {
      title: 'Official Application Generator',
      desc: 'Drafts legally structured, printable administrative petitions and affidavits matching official authority templates.',
      specRef: 'Spec Section 14',
    },
    {
      title: 'Zero PII Synthetic Sandbox',
      desc: 'Uses synthetic persona data (Rohan, 24) and preloaded verifiable mock documents for safe demo evaluation.',
      specRef: 'Spec Section 19, 23',
    },
    {
      title: 'Apple-Glass Aesthetic Hierarchy',
      desc: 'Deep black background, frosted glass panels, refined SF typography, mathematical contrast, and micro-interactions.',
      specRef: 'Spec Section 04, 21',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-10">
      {/* Header */}
      <div className="glass-panel-highlight p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-48 h-48 text-cyan-400" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Hackathon Evaluation & Architecture Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            RE:START Pitch & Demo Architecture
          </h1>

          <blockquote className="text-sm sm:text-base text-neutral-300 italic max-w-3xl pl-4 border-l-2 border-cyan-400 my-4 leading-relaxed font-medium">
            “Your hackathon pitch should not be: 'We built a beautiful AI website.' Instead: 'We built an AI recovery engine that understands the hidden dependencies between documents, authorities, and essential services, turning chaos into the shortest possible path to recovery.'”
          </blockquote>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => {
                onSelectPlan('case-rohan-stolen-bag');
                onNavigate('/recovery/map');
              }}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2"
            >
              <span>Launch Killer Demo Scenario (Rohan, 24)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('/recovery/actions')}
              className="px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all"
            >
              <span>View Action Sequence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Launchers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Pre-Loaded Evaluation Scenarios
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any scenario to instantly populate the full DAG dependency graph and action queue.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">4 Synthetic Cases</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Case 1: Rohan */}
          <div
            onClick={() => {
              onSelectPlan('case-rohan-stolen-bag');
              onNavigate('/recovery/map');
            }}
            className="p-5 rounded-3xl glass-panel-interactive border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                  Killer Demo
                </span>
                <span className="text-xs text-neutral-500 font-mono">24 yrs</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Rohan Sharma</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Backpack stolen on train: phone, SIM, ID, cards. Salary arriving tomorrow.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-semibold text-emerald-400 flex items-center justify-between">
              <span>Run Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Case 2: Priya */}
          <div
            onClick={() => {
              onSelectPlan('case-bank-disrupted');
              onNavigate('/recovery/map');
            }}
            className="p-5 rounded-3xl glass-panel-interactive border-white/10 hover:border-white/30 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase">
                  Banking 2FA
                </span>
                <span className="text-xs text-neutral-500 font-mono">29 yrs</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Priya Nair</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Lost authenticator keys and locked NetBanking password before loan EMI debit.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-semibold text-cyan-400 flex items-center justify-between">
              <span>Run Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Case 3: Arjun */}
          <div
            onClick={() => {
              onSelectPlan('case-relocation-city');
              onNavigate('/recovery/map');
            }}
            className="p-5 rounded-3xl glass-panel-interactive border-white/10 hover:border-white/30 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">
                  Relocation
                </span>
                <span className="text-xs text-neutral-500 font-mono">27 yrs</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Arjun Patel</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Relocated to Bangalore: utility address proof required for bank branch transfer.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-semibold text-indigo-400 flex items-center justify-between">
              <span>Run Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Case 4: Sara */}
          <div
            onClick={() => {
              onSelectPlan('case-expired-passport');
              onNavigate('/recovery/map');
            }}
            className="p-5 rounded-3xl glass-panel-interactive border-white/10 hover:border-white/30 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">
                  Tatkaal PSK
                </span>
                <span className="text-xs text-neutral-500 font-mono">31 yrs</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">Sara Khan</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Flight in 10 days, expired passport, lost birth certificate, Annexure F needed.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-semibold text-purple-400 flex items-center justify-between">
              <span>Run Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 32-Point Spec Rubric Compliance Matrix */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">
          Core Engine Capabilities & Architecture Rubric
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rubricHighlights.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    {item.specRef}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
