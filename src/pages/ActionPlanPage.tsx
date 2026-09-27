import React, { useState } from 'react';
import { 
  RecoveryPlan, 
  RecoveryNode, 
  RecoveryStatus, 
  UrgencyLevel 
} from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Split, 
  CheckSquare, 
  FileDown,
  Smartphone,
  Landmark,
  CreditCard,
  ShieldAlert,
  Zap,
  Scale
} from 'lucide-react';

interface ActionPlanPageProps {
  plan: RecoveryPlan;
  onUpdateNodeStatus: (nodeId: string, status: RecoveryStatus) => void;
  onToggleChecklistItem: (nodeId: string, itemId: string) => void;
  onGenerateApplication: (node: RecoveryNode) => void;
  onOpenMap: () => void;
}

export const ActionPlanPage: React.FC<ActionPlanPageProps> = ({
  plan,
  onUpdateNodeStatus,
  onToggleChecklistItem,
  onGenerateApplication,
  onOpenMap,
}) => {
  const [filter, setFilter] = useState<'all' | 'immediate' | 'can_parallel' | 'completed'>('all');
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(plan.nodes[0]?.id || null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'telecom':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'banking':
        return <Landmark className="w-4 h-4 text-cyan-400" />;
      case 'cards':
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'identity':
        return <ShieldAlert className="w-4 h-4 text-indigo-400" />;
      case 'payments':
        return <Zap className="w-4 h-4 text-rose-400" />;
      case 'legal':
        return <Scale className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  const filteredNodes = plan.nodes.filter((node) => {
    if (filter === 'immediate') return node.urgency === 'immediate';
    if (filter === 'can_parallel') return node.canParallelWith && node.canParallelWith.length > 0;
    if (filter === 'completed') return node.status === 'completed';
    return true;
  });

  const completedCount = plan.nodes.filter((n) => n.status === 'completed').length;
  const progressPercent = Math.round((completedCount / plan.nodes.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Page 05 • Prioritized Sequence
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              Shortest Path Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Recovery Action Plan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            {plan.reasoningSummary}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Progress circle/pill */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-mono text-neutral-400">Total Progress</span>
              <span className="text-base font-bold text-white">{progressPercent}%</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-cyan-300 border border-cyan-500/30">
              {completedCount}/{plan.nodes.length}
            </div>
          </div>

          <button
            onClick={onOpenMap}
            className="px-4 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
          >
            <span>View Graph</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Recommended First Action Banner (Section 4 & 10 requirement) */}
      {plan.immediateAction && (
        <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-transparent border border-emerald-500/30 shadow-[0_0_30px_rgba(52,211,153,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  RECOMMENDED FIRST ACTION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Leverage #{plan.immediateAction.unlocksCount}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {plan.immediateAction.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                <strong className="text-emerald-300">Why?</strong> {plan.immediateAction.reasoning}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const targetNode = plan.nodes.find((n) => n.title.includes('SIM') || n.id === plan.immediateAction?.nodeId);
              if (targetNode) {
                setExpandedNodeId(targetNode.id);
              }
            }}
            className="px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 shrink-0 self-start sm:self-center"
          >
            Execute Keystone Step →
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          All Actions ({plan.nodes.length})
        </button>
        <button
          onClick={() => setFilter('immediate')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'immediate'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          Immediate / Urgent
        </button>
        <button
          onClick={() => setFilter('can_parallel')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'can_parallel'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          Can Run in Parallel ⚡
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            filter === 'completed'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Action Cards List */}
      <div className="space-y-4">
        {filteredNodes.map((node, index) => {
          const isExpanded = expandedNodeId === node.id;
          const isCompleted = node.status === 'completed';
          const isInProgress = node.status === 'in_progress';

          return (
            <div
              key={node.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isCompleted
                  ? 'bg-white/[0.02] border-white/10 opacity-75'
                  : isInProgress
                  ? 'bg-white/[0.08] border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.15)]'
                  : 'glass-panel hover:border-white/20'
              }`}
            >
              {/* Card Summary Header */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Status toggle checkbox */}
                  <button
                    onClick={() =>
                      onUpdateNodeStatus(
                        node.id,
                        isCompleted ? 'not_started' : 'completed'
                      )
                    }
                    className="mt-0.5 sm:mt-0 p-1 rounded-xl text-neutral-400 hover:text-white transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                    ) : isInProgress ? (
                      <Clock className="w-6 h-6 text-cyan-400 animate-spin" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/30 hover:border-white/60 transition-colors" />
                    )}
                  </button>

                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-white/10 border border-white/10 shrink-0">
                      {getCategoryIcon(node.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-neutral-400">
                          Step #{index + 1}
                        </span>
                        {node.unlocksCount > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium">
                            +{node.unlocksCount} downstream unlocks
                          </span>
                        )}
                        {node.canParallelWith && node.canParallelWith.length > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono flex items-center gap-1">
                            <Split className="w-2.5 h-2.5" /> Parallel Friendly
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold ${isCompleted ? 'line-through text-neutral-400' : 'text-white'}`}>
                        {node.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Right metadata controls */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono block">Turnaround</span>
                    <span className="text-xs font-mono text-neutral-300">{node.estimatedTime}</span>
                  </div>

                  <button
                    onClick={() => setExpandedNodeId(isExpanded ? null : node.id)}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all flex items-center gap-1 text-xs"
                  >
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Detail Section (PAGE 06 — Action Detail) */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/[0.06] bg-black/40 space-y-5 animate-in fade-in duration-150">
                  {/* Why it Matters */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      Reasoning & Dependency Analysis
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                      {node.whyItMatters}
                    </p>
                  </div>

                  {/* Requirements List */}
                  {node.requirements && node.requirements.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                        What to Bring / Required Items
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {node.requirements.map((req, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-300 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Action Checklist */}
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                      Execution Steps
                    </span>
                    <div className="space-y-2">
                      {node.stepChecklist.map((step) => (
                        <div
                          key={step.id}
                          onClick={() => onToggleChecklistItem(node.id, step.id)}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer text-xs select-none transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={step.done}
                            onChange={() => {}}
                            className="mt-0.5 rounded border-white/20 text-emerald-500 focus:ring-0 bg-transparent"
                          />
                          <span className={step.done ? 'line-through text-neutral-500' : 'text-neutral-200'}>
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Portal Link & AI Application Generator */}
                  <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>Official Authority:</span>
                      <strong className="text-white">{node.portalOrAuthority}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onGenerateApplication(node)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 transition-all flex items-center gap-1.5"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Generate Application / Letter</span>
                      </button>

                      <button
                        onClick={() =>
                          onUpdateNodeStatus(
                            node.id,
                            isCompleted ? 'not_started' : 'completed'
                          )
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-white/10 text-neutral-300'
                            : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                      >
                        {isCompleted ? 'Mark Incomplete' : 'Complete Step ✓'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
