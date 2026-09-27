import React from 'react';
import { RecoveryPlan } from '../types';
import { Zap, Split, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface ParallelProcessVisualizerProps {
  plan: RecoveryPlan;
  onOpenActions: () => void;
}

export const ParallelProcessVisualizer: React.FC<ParallelProcessVisualizerProps> = ({
  plan,
  onOpenActions,
}) => {
  return (
    <div className="w-full glass-panel-highlight rounded-3xl p-6 sm:p-8 border border-white/15 my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Planning Engine Feature
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              Non-Blocking Optimizer
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sequential vs. Parallel Recovery Optimization
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            RE:START isolates strict blocking prerequisites from parallelizable tasks, saving hours of unnecessary sequential waiting.
          </p>
        </div>

        <button
          onClick={onOpenActions}
          className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <span>View All Parallel Groups</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Card: The Traditional Mistake (Sequential Bottleneck) */}
        <div className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-neutral-800 text-[10px] uppercase font-mono text-neutral-400 rounded-bl-xl border-l border-b border-white/10">
            Slow Sequential Flow
          </div>

          <div>
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-2">
              Standard Bureaucracy Assumption
            </span>
            <h4 className="text-base font-bold text-neutral-200 mb-2">
              Waiting for Every Step One by One
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Victims mistakenly believe they must finish SIM recovery, then travel home, then wait days for a replacement ID before contacting their bank.
            </p>

            {/* Sequential ASCII/Visual Chain */}
            <div className="space-y-2 font-mono text-xs text-neutral-300 bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-rose-300">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-[10px]">1</span>
                <span>LOST PHONE INCIDENT</span>
              </div>
              <div className="pl-6 text-neutral-600">↓ (Blocked)</div>
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
                <span>NO SMS OTP ACCESS</span>
              </div>
              <div className="pl-6 text-neutral-600">↓ (Blocked)</div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">3</span>
                <span>LOCKED BANK & EXPOSURE</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-neutral-500">
            Estimated turnaround: <strong className="text-neutral-400">4–7 business days</strong>
          </div>
        </div>

        {/* Right Card: RE:START AI Parallel Execution */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/30 flex flex-col justify-between relative shadow-[0_0_30px_rgba(52,211,153,0.1)]">
          <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500/30 text-[10px] uppercase font-mono text-emerald-300 rounded-bl-xl border-l border-b border-emerald-500/40 font-bold">
            RE:START Parallel Pipeline
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Simultaneous Acceleration</span>
            </span>
            <h4 className="text-base font-bold text-white mb-2">
              Concurrent Execution of Non-Interfering Tasks
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              The AI identifies tasks with zero shared dependencies and branches them so you can run them simultaneously right now.
            </p>

            {/* Parallel Flow Box */}
            <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs">
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">
                RUN IN PARALLEL (NEXT 20 MINS):
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-white">
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <div className="text-emerald-300 font-bold mb-0.5">BRANCH A</div>
                  <span>Police Lost e-Report</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                  <div className="text-cyan-300 font-bold mb-0.5">BRANCH B</div>
                  <span>IVR Debit Card Lock</span>
                </div>
              </div>
              <div className="text-center text-emerald-400 my-1 font-bold">
                └───┬───┘ (Converge)
              </div>
              <div className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-center text-white font-bold">
                Duplicate SIM Reissued (Carrier Store) → Immediate Bank Unlock
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between font-medium">
            <span>Optimized recovery window:</span>
            <span className="font-mono text-sm font-bold text-white">Within 24 Hours</span>
          </div>
        </div>
      </div>

      {/* Dynamic Parallel Groups from current plan */}
      {plan.parallelGroups && plan.parallelGroups.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/[0.08]">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Active Concurrency Clusters for this Case
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {plan.parallelGroups.map((group, i) => (
              <div
                key={group.id || i}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                    <Split className="w-3.5 h-3.5" />
                    <span className="text-white">{group.title}</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed mb-2">
                    {group.reason}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {group.tasks.map((taskId) => {
                    const node = plan.nodes.find((n) => n.id === taskId);
                    return (
                      <span
                        key={taskId}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 font-mono truncate max-w-[150px]"
                      >
                        {node ? node.title : taskId}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
