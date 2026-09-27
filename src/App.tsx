import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TrustBanner } from './components/TrustBanner';
import { LandingPage } from './pages/LandingPage';
import { RecoveryIntakePage } from './pages/RecoveryIntakePage';
import { DependencyMap } from './components/DependencyMap';
import { ActionPlanPage } from './pages/ActionPlanPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { RecoveryAssistantPage } from './pages/RecoveryAssistantPage';
import { JudgeDemoPage } from './pages/JudgeDemoPage';
import { AIApplicationGeneratorModal } from './components/AIApplicationGeneratorModal';
import { 
  DEMO_CASES, 
  KILLER_DEMO_CASE, 
  DEMO_DOCUMENTS 
} from './data/demoCases';
import { 
  RecoveryPlan, 
  RecoveryNode, 
  RecoveryStatus, 
  SyntheticDocument 
} from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activePlan, setActivePlan] = useState<RecoveryPlan>(KILLER_DEMO_CASE);
  const [documents, setDocuments] = useState<SyntheticDocument[]>(DEMO_DOCUMENTS);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'mr' | 'hi'>('en');
  const [modalNode, setModalNode] = useState<RecoveryNode | null>(null);

  // Switch demo scenarios
  const handleSelectPlan = (planId: string) => {
    const selected = DEMO_CASES.find((c) => c.id === planId);
    if (selected) {
      setActivePlan(JSON.parse(JSON.stringify(selected)));
    }
  };

  // Node status change
  const handleUpdateNodeStatus = (nodeId: string, newStatus: RecoveryStatus) => {
    setActivePlan((prev) => {
      const updatedNodes = prev.nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, status: newStatus };
        }
        return node;
      });

      const completedCount = updatedNodes.filter((n) => n.status === 'completed').length;
      const progress = Math.round((completedCount / updatedNodes.length) * 100);

      const targetNode = prev.nodes.find((n) => n.id === nodeId);
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `Status of "${targetNode?.title || nodeId}" updated to ${newStatus.replace('_', ' ')}.`,
        type: newStatus === 'completed' ? ('success' as const) : ('info' as const),
      };

      return {
        ...prev,
        nodes: updatedNodes,
        overallProgress: progress,
        auditLog: [newLog, ...(prev.auditLog || [])],
      };
    });
  };

  // Checklist toggle
  const handleToggleChecklistItem = (nodeId: string, itemId: string) => {
    setActivePlan((prev) => {
      const updatedNodes = prev.nodes.map((node) => {
        if (node.id === nodeId) {
          const updatedChecklist = node.stepChecklist.map((chk) => {
            if (chk.id === itemId) {
              return { ...chk, done: !chk.done };
            }
            return chk;
          });
          return { ...node, stepChecklist: updatedChecklist };
        }
        return node;
      });

      return {
        ...prev,
        nodes: updatedNodes,
      };
    });
  };

  // Reset plan to clean state
  const handleResetPlan = () => {
    const original = DEMO_CASES.find((c) => c.id === activePlan.id) || KILLER_DEMO_CASE;
    setActivePlan(JSON.parse(JSON.stringify(original)));
  };

  // New plan from AI intake
  const handleAnalyzeComplete = (newPlan: RecoveryPlan) => {
    setActivePlan(newPlan);
    setCurrentRoute('/recovery/map');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col selection:bg-cyan-500/30 selection:text-white">
      {/* Trust and Safety Banner */}
      <TrustBanner />

      {/* Apple-style Frosted Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={setCurrentRoute}
        activePlan={activePlan}
        onSelectPlan={handleSelectPlan}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {currentRoute === '/' && (
          <LandingPage
            activePlan={activePlan}
            onStartRecovery={() => setCurrentRoute('/recovery/new')}
            onOpenMap={() => setCurrentRoute('/recovery/map')}
            onOpenActions={() => setCurrentRoute('/recovery/actions')}
            onOpenDemo={() => setCurrentRoute('/demo')}
          />
        )}

        {currentRoute === '/recovery/new' && (
          <RecoveryIntakePage
            onAnalyzeComplete={handleAnalyzeComplete}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        )}

        {currentRoute === '/recovery/map' && (
          <div className="max-w-7xl mx-auto w-full py-8 px-4 sm:px-6">
            <DependencyMap
              plan={activePlan}
              onUpdateNodeStatus={handleUpdateNodeStatus}
              onToggleChecklistItem={handleToggleChecklistItem}
              onGenerateApplication={(node) => setModalNode(node)}
              onNavigateToActions={() => setCurrentRoute('/recovery/actions')}
            />
          </div>
        )}

        {currentRoute === '/recovery/actions' && (
          <ActionPlanPage
            plan={activePlan}
            onUpdateNodeStatus={handleUpdateNodeStatus}
            onToggleChecklistItem={handleToggleChecklistItem}
            onGenerateApplication={(node) => setModalNode(node)}
            onOpenMap={() => setCurrentRoute('/recovery/map')}
          />
        )}

        {currentRoute === '/dashboard' && (
          <DashboardPage
            plan={activePlan}
            onNavigate={setCurrentRoute}
            onResetPlan={handleResetPlan}
          />
        )}

        {currentRoute === '/documents' && (
          <DocumentsPage
            documents={documents}
            onAddDocument={(newDoc) => setDocuments((prev) => [newDoc, ...prev])}
          />
        )}

        {currentRoute === '/assistant' && (
          <RecoveryAssistantPage plan={activePlan} />
        )}

        {currentRoute === '/demo' && (
          <JudgeDemoPage
            onSelectPlan={handleSelectPlan}
            onNavigate={setCurrentRoute}
          />
        )}
      </main>

      {/* Application Generator Modal */}
      {modalNode && (
        <AIApplicationGeneratorModal
          node={modalNode}
          plan={activePlan}
          onClose={() => setModalNode(null)}
        />
      )}

      {/* Minimal Apple-Style Footer */}
      <footer className="w-full border-t border-white/[0.08] py-8 px-4 sm:px-6 bg-[#050505] text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">RE:START</span>
            <span>— AI Life-Admin Recovery Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentRoute('/demo')} className="hover:text-neutral-300 transition-colors">
              Judge Evaluation Rubric
            </button>
            <button onClick={() => setCurrentRoute('/recovery/map')} className="hover:text-neutral-300 transition-colors">
              Dependency Graph
            </button>
            <button onClick={() => setCurrentRoute('/dashboard')} className="hover:text-neutral-300 transition-colors">
              Progress Dashboard
            </button>
          </div>
          <div className="text-[11px] text-neutral-600 font-mono">
            Powered by Google AI Studio & Gemini
          </div>
        </div>
      </footer>
    </div>
  );
}
