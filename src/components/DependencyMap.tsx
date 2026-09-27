import React, { useState } from 'react';
import { 
  RecoveryPlan, 
  RecoveryNode, 
  UrgencyLevel, 
  RecoveryStatus 
} from '../types';
import { 
  Smartphone, 
  Landmark, 
  CreditCard, 
  ShieldAlert, 
  Zap, 
  Scale, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  GitBranch, 
  Sparkles, 
  ExternalLink,
  Layers,
  X,
  FileDown
} from 'lucide-react';

interface DependencyMapProps {
  plan: RecoveryPlan;
  onUpdateNodeStatus: (nodeId: string, status: RecoveryStatus) => void;
  onToggleChecklistItem: (nodeId: string, itemId: string) => void;
  onGenerateApplication: (node: RecoveryNode) => void;
  onNavigateToActions: () => void;
}

export const DependencyMap: React.FC<DependencyMapProps> = ({
  plan,
  onUpdateNodeStatus,
  onToggleChecklistItem,
  onGenerateApplication,
  onNavigateToActions,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(plan.nodes[0]?.id || null);
  const [viewMode, setViewMode] = useState<'graph' | 'tree'>('graph');

  const selectedNode = plan.nodes.find((n) => n.id === selectedNodeId) || plan.nodes[0];

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

  const getStatusBadge = (status: RecoveryStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3 h-3" /> Blocked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
            ○ Not Started
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
              Signature AI Architecture
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
              Topological DAG
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Recovery Dependency Map
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Interactive causal graph mapping root enablers to dependent branches. Selecting a node reveals leverage diagnostics and unlocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-white/[0.06] border border-white/10 rounded-2xl p-1 text-xs">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-xl transition-all font-medium flex items-center gap-1.5 ${
                viewMode === 'graph' ? 'bg-white/20 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Interactive Graph</span>
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 rounded-xl transition-all font-medium flex items-center gap-1.5 ${
                viewMode === 'tree' ? 'bg-white/20 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Causal Sequence</span>
            </button>
          </div>

          <button
            onClick={onNavigateToActions}
            className="px-4 py-2 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Execute Action Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container: Left Graph Stage, Right Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Canvas Stage (8 columns) */}
        <div className="lg:col-span-8 glass-panel-highlight rounded-3xl p-5 sm:p-6 relative overflow-hidden min-h-[560px] border border-white/15">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

          {/* Graph Legend Overlay */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 bg-[#070709]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Root Enabler
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> High Leverage
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Can Parallelize
            </span>
          </div>

          {/* Graph Node Display */}
          {viewMode === 'graph' ? (
            <div className="relative pt-12 pb-6 flex flex-col items-center gap-8">
              {/* Layer 0: Root Incident Card */}
              <div className="relative z-10">
                <div className="px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/15 text-neutral-300 text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="uppercase tracking-wider text-[11px] text-rose-300 font-bold">DISRUPTION TRIGGER:</span>
                  <span className="text-white max-w-[280px] sm:max-w-md truncate">
                    {plan.title}
                  </span>
                </div>
                {/* Connecting line */}
                <div className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-white/10 mx-auto" />
              </div>

              {/* Layer 1: Immediate Root Actions (Parallel pair: SIM + Card/Police) */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl relative z-10">
                {plan.nodes.slice(0, 2).map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all relative select-none ${
                        isSelected
                          ? 'bg-white/15 border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20'
                      } border backdrop-blur-xl`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-white/10 border border-white/10">
                            {getCategoryIcon(node.category)}
                          </div>
                          <span className="text-xs font-semibold text-white leading-tight">
                            {node.title}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 line-clamp-2 mb-3">
                        {node.whyItMatters}
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.06]">
                        {getStatusBadge(node.status)}
                        {node.unlocksCount > 0 && (
                          <span className="font-mono text-emerald-400 font-semibold">
                            +{node.unlocksCount} unlocks
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Directional flow indicators */}
              <div className="flex items-center justify-center gap-8 w-full max-w-lg text-neutral-500 my-[-10px]">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">Unlocks SMS OTP</span>
                  <div className="w-0.5 h-6 bg-emerald-500/40" />
                </div>
              </div>

              {/* Layer 2: Middle Stream (SIM Recovery / Keystone) */}
              <div className="w-full max-w-md relative z-10">
                {plan.nodes.slice(2, 3).map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all relative select-none ${
                        isSelected
                          ? 'bg-white/15 border-emerald-400/80 shadow-[0_0_30px_rgba(52,211,153,0.3)] ring-1 ring-emerald-400'
                          : 'bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] border-emerald-500/30'
                      } border backdrop-blur-xl`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                            {getCategoryIcon(node.category)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {node.title}
                            </span>
                            <span className="text-[10px] text-emerald-300 font-semibold uppercase">
                              ★ KEYSTONE BOTTLENECK REMOVER
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(node.status)}
                      </div>

                      <div className="text-[11px] text-neutral-300 leading-relaxed mb-3">
                        {node.whyItMatters}
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.08]">
                        <span className="text-neutral-400">Est. Effort: <strong className="text-white uppercase">{node.estimatedEffort}</strong></span>
                        <span className="text-emerald-400 font-bold font-mono">Unlocks 3 Leaves</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Directional Split arrows */}
              <div className="w-full max-w-md flex items-center justify-around text-neutral-500 my-[-10px]">
                <div className="w-0.5 h-6 bg-cyan-500/40" />
                <div className="w-0.5 h-6 bg-indigo-500/40" />
              </div>

              {/* Layer 3: Terminal Leaves (Identity, Bank, UPI, Cards) */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl relative z-10">
                {plan.nodes.slice(3).map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`cursor-pointer rounded-2xl p-3.5 transition-all relative select-none ${
                        isSelected
                          ? 'bg-white/15 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10'
                      } border backdrop-blur-xl flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-lg bg-white/10 border border-white/10">
                            {getCategoryIcon(node.category)}
                          </div>
                          <span className="text-xs font-semibold text-white line-clamp-1">
                            {node.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mb-2">
                          {node.whyItMatters}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                        {getStatusBadge(node.status)}
                        <span className="text-neutral-400 font-mono">{node.estimatedTime}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Sequential / Tree View */
            <div className="space-y-4 pt-6">
              {plan.prioritySequence.map((nodeId, idx) => {
                const node = plan.nodes.find((n) => n.id === nodeId);
                if (!node) return null;
                const isSelected = selectedNodeId === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-white/15 border-cyan-400 shadow-lg'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-cyan-300 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{node.title}</span>
                          {node.unlocksCount > 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium">
                              +{node.unlocksCount} unlocks
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                          {node.whyItMatters}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-neutral-400 font-mono">{node.estimatedTime}</span>
                      {getStatusBadge(node.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Node Detailed Inspector Panel (4 columns) */}
        {selectedNode && (
          <div className="lg:col-span-4 glass-panel-highlight rounded-3xl p-6 border border-white/15 flex flex-col gap-5 sticky top-24">
            {/* Inspector Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 shadow-inner">
                  {getCategoryIcon(selectedNode.category)}
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    Diagnostic Inspector
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {selectedNode.title}
                  </h3>
                </div>
              </div>
              <div>{getStatusBadge(selectedNode.status)}</div>
            </div>

            {/* Why it Matters (Direct quote requirement from prompt) */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Why it matters</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                {selectedNode.whyItMatters}
              </p>
            </div>

            {/* Next Action */}
            <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl p-4">
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Next action
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed">
                {selectedNode.nextAction}
              </p>
            </div>

            {/* Metadata Badges: Effort & Dependencies */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase block mb-0.5">Estimated effort</span>
                <span className="font-semibold text-white capitalize">{selectedNode.estimatedEffort}</span>
                <span className="text-[10px] text-neutral-400 block mt-0.5">({selectedNode.estimatedTime})</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] text-neutral-400 uppercase block mb-0.5">Dependencies</span>
                <span className="font-semibold text-white">
                  {selectedNode.dependencies.length === 0 ? (
                    <span className="text-emerald-400">None (Root)</span>
                  ) : (
                    <span>{selectedNode.dependencies.length} Prerequisite</span>
                  )}
                </span>
                <span className="text-[10px] text-cyan-400 block mt-0.5">
                  {selectedNode.unlocksCount} Downstream
                </span>
              </div>
            </div>

            {/* Authority / Portal */}
            <div className="text-xs">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold block mb-1">
                Official Authority / Portal
              </span>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-200">
                <span className="font-medium truncate">{selectedNode.portalOrAuthority}</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              </div>
            </div>

            {/* Interactive Checklist Preview */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2 font-medium">
                <span className="text-neutral-300">Step Checklist</span>
                <span className="text-neutral-500">
                  {selectedNode.stepChecklist.filter((c) => c.done).length} / {selectedNode.stepChecklist.length} done
                </span>
              </div>
              <div className="space-y-1.5">
                {selectedNode.stepChecklist.map((chk) => (
                  <div
                    key={chk.id}
                    onClick={() => onToggleChecklistItem(selectedNode.id, chk.id)}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer text-xs select-none transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={chk.done}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-white/20 text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-transparent"
                    />
                    <span className={chk.done ? 'line-through text-neutral-500' : 'text-neutral-300'}>
                      {chk.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onUpdateNodeStatus(
                      selectedNode.id,
                      selectedNode.status === 'completed' ? 'not_started' : 'completed'
                    )
                  }
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    selectedNode.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedNode.status === 'completed' ? 'Mark Incomplete' : 'Mark Completed'}</span>
                </button>
                <button
                  onClick={() => onUpdateNodeStatus(selectedNode.id, 'in_progress')}
                  className="py-2 px-3 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all"
                  title="Mark in progress"
                >
                  <Clock className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => onGenerateApplication(selectedNode)}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Generate Official Application Draft</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
