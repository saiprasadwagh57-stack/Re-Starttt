import React from 'react';
import { RecoveryPlan, RecoveryStatus } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Share2, 
  FileText, 
  Sparkles, 
  Smartphone, 
  Landmark, 
  Activity,
  RotateCcw
} from 'lucide-react';

interface DashboardPageProps {
  plan: RecoveryPlan;
  onNavigate: (route: string) => void;
  onResetPlan: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  plan,
  onNavigate,
  onResetPlan,
}) => {
  const completedNodes = plan.nodes.filter((n) => n.status === 'completed');
  const inProgressNodes = plan.nodes.filter((n) => n.status === 'in_progress');
  const pendingNodes = plan.nodes.filter((n) => n.status === 'not_started' || n.status === 'blocked');

  const progressPercent = Math.round((completedNodes.length / plan.nodes.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Page 07 • Live Recovery Control Center
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
              Real-Time Tracking
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Recovery Progress Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Active Case: <strong className="text-neutral-200">{plan.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('/recovery/map')}
            className="px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
          >
            <span>Inspect Graph</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          <button
            onClick={() => onNavigate('/recovery/actions')}
            className="px-4 py-2.5 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-1.5"
          >
            <span>Continue Plan</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="glass-panel-highlight rounded-3xl p-5 border border-white/15 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="font-semibold uppercase tracking-wider">Overall Resolution</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono">
              {progressPercent}%
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-neutral-400">
            {completedNodes.length} of {plan.nodes.length} critical services restored
          </span>
        </div>

        {/* Completed */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="font-semibold uppercase tracking-wider">Completed Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono my-2">
            {completedNodes.length}
          </div>
          <span className="text-[11px] text-neutral-400">
            Immediate risk neutralized
          </span>
        </div>

        {/* In Progress */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="font-semibold uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono my-2">
            {inProgressNodes.length}
          </div>
          <span className="text-[11px] text-neutral-400">
            Active verification filings
          </span>
        </div>

        {/* Remaining Dependency Blockers */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="font-semibold uppercase tracking-wider">Downstream Queue</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono my-2">
            {pendingNodes.length}
          </div>
          <span className="text-[11px] text-neutral-400">
            Waiting on upstream enablers
          </span>
        </div>
      </div>

      {/* Two Column Grid: Left Milestone Breakdown, Right Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Milestones (7 cols) */}
        <div className="lg:col-span-7 glass-panel-highlight rounded-3xl p-6 border border-white/15 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-base font-bold text-white">
              Causal Milestones & Health
            </h3>
            <span className="text-xs text-cyan-400 font-mono">
              Topological Ordering
            </span>
          </div>

          <div className="space-y-3">
            {plan.nodes.map((node, i) => (
              <div
                key={node.id}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/10 font-mono font-bold text-[11px] flex items-center justify-center text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-white block">
                      {node.title}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Authority: {node.portalOrAuthority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {node.status === 'completed' ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Restored
                    </span>
                  ) : node.status === 'in_progress' ? (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold flex items-center gap-1 animate-pulse">
                      <Clock className="w-3 h-3" /> Processing
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-400 text-[10px]">
                      Queued
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Activity Log (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Activity & Audit Log</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
              Live Feed
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {plan.auditLog && plan.auditLog.length > 0 ? (
              plan.auditLog.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>{log.timestamp}</span>
                    <span className="uppercase text-cyan-400 font-semibold">{log.type}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed font-medium">
                    {log.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-neutral-500 text-xs text-center py-8">
                No activity logs registered yet.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/[0.08]">
            <button
              onClick={onResetPlan}
              className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reset Scenario to Initial State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
