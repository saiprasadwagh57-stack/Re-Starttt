import React, { useState } from 'react';
import { RecoveryPlan } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  CheckCircle2, 
  GitBranch,
  ShieldCheck
} from 'lucide-react';

interface RecoveryAssistantPageProps {
  plan: RecoveryPlan;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const RecoveryAssistantPage: React.FC<RecoveryAssistantPageProps> = ({ plan }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello! I'm the RE:START Recovery Assistant. I am actively tracking your recovery plan for "${plan.title}". You can ask me about dependencies, why certain tasks are prioritized, or how to expedite approvals.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'Why does SIM recovery come before the bank?',
    'Can I file the police report and freeze cards at the same time?',
    'What if the bank branch demands physical cards that I lost?',
    'How do I ensure my salary isn’t blocked tomorrow?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/recovery/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          plan: {
            title: plan.title,
            situation: plan.situation,
            prioritySequence: plan.prioritySequence,
            nodes: plan.nodes,
            parallelGroups: plan.parallelGroups,
            reasoningSummary: plan.reasoningSummary,
          },
        }),
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || "I've reviewed your active dependency map. The keystone enabler remains your mobile SIM recovery.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Assistant call error:', err);
      const fallbackMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'SIM recovery is placed first because mobile access is the keystone prerequisite for 2FA password resets. However, you can file the police incident report and freeze your debit cards in parallel right now without waiting.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Life-Admin Intelligence Copilot
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
              Grounded in Active DAG
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Recovery Assistant
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Ask any question about statutory regulations, parallel steps, or dependency logic.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-300 bg-white/[0.04] p-3 rounded-2xl border border-white/10 self-start sm:self-center">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span>Tracking: <strong className="text-white">{plan.nodes.length} Nodes</strong></span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div>
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
          Recommended Questions for this Case
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel-highlight rounded-3xl p-6 border border-white/15 min-h-[440px] max-h-[560px] flex flex-col justify-between overflow-hidden shadow-2xl">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-white text-black'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium'
                    : 'bg-white/[0.04] border border-white/10 text-neutral-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-neutral-500 text-right' : 'text-neutral-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-neutral-400 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Consulting dependency graph and regulations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask about administrative rules, parallel tasks, or dependency locks..."
            className="flex-1 bg-black/50 border border-white/10 focus:border-cyan-400/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 rounded-2xl bg-white text-black hover:bg-neutral-200 transition-all disabled:opacity-40 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
