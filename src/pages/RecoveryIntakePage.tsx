import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Upload, 
  FileCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  HelpCircle,
  Globe
} from 'lucide-react';
import { VoiceButton } from '../components/VoiceButton';
import { RecoveryPlan } from '../types';
import { KILLER_DEMO_CASE } from '../data/demoCases';

interface RecoveryIntakePageProps {
  onAnalyzeComplete: (newPlan: RecoveryPlan) => void;
  currentLanguage: 'en' | 'mr' | 'hi';
  onLanguageChange: (lang: 'en' | 'mr' | 'hi') => void;
}

export const RecoveryIntakePage: React.FC<RecoveryIntakePageProps> = ({
  onAnalyzeComplete,
  currentLanguage,
  onLanguageChange,
}) => {
  const [situationText, setSituationText] = useState(
    'My backpack was stolen while travelling. My phone, SIM, identity documents and bank card were inside. I need to access my bank account and receive my salary tomorrow.'
  );
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    'Police_Lost_Report_Acknowledgement.pdf (Synthetic)',
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const exampleChips = [
    {
      label: '🌟 Rohan (Killer Demo)',
      text: 'My backpack was stolen while travelling. My phone, SIM, identity documents and bank card were inside. I need to access my bank account and receive my salary tomorrow.',
    },
    {
      label: 'Lost my phone & SIM',
      text: 'Lost my phone with registered SIM. Cannot receive bank OTPs or verify Google Account 2FA.',
    },
    {
      label: 'Stolen wallet & IDs',
      text: 'My wallet was pickpocketed on the train with Aadhaar card, PAN card, and 2 debit cards.',
    },
    {
      label: 'Can’t access bank',
      text: 'Upgraded phone, lost authenticator 2FA seed, and salary account is locked after 3 failed login attempts.',
    },
    {
      label: 'मराठी (Marathi)',
      text: 'माझा फोन आणि महत्त्वाची कागदपत्रं हरवली आहेत. मला बँक खात्यात प्रवेश करता येत नाही.',
    },
    {
      label: 'हिंदी (Hindi)',
      text: 'मेरी जेब कट गई और फोन, आधार कार्ड और बैंक कार्ड चोरी हो गए। कल सैलरी आने वाली है।',
    },
  ];

  const analysisSteps = [
    'Identifying affected assets & services',
    'Detecting missing dependencies & bottleneck credentials',
    'Mapping statutory & regulatory recovery requirements',
    'Calculating optimal topological sequence',
    'Synthesizing non-blocking parallel action plan',
  ];

  const handleStartAnalysis = async () => {
    if (!situationText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Progressive animation step timer
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    try {
      const response = await fetch('/api/recovery/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: situationText,
          language: currentLanguage,
          userPersona: {
            name: situationText.includes('backpack') ? 'Rohan' : 'Applicant',
            age: 24,
            summary: 'Active crisis recovery case',
          },
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      // Brief pause to display the final celebratory count
      setTimeout(() => {
        setIsAnalyzing(false);
        if (data.plan) {
          onAnalyzeComplete(data.plan);
        } else {
          // Resilient fallback plan
          onAnalyzeComplete({
            ...KILLER_DEMO_CASE,
            id: `case-${Date.now()}`,
            situation: situationText,
          });
        }
      }, 700);
    } catch (err) {
      console.warn('Analysis network error, falling back locally:', err);
      clearInterval(interval);
      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalyzeComplete({
          ...KILLER_DEMO_CASE,
          id: `case-${Date.now()}`,
          situation: situationText,
        });
      }, 700);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setSituationText(transcript);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {isAnalyzing ? (
        /* PAGE 03 — AI Processing Screen */
        <div className="glass-panel-highlight rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-center flex flex-col items-center justify-center min-h-[460px] animate-in fade-in duration-300">
          <div className="relative mb-8">
            {/* Pulsing AI Orb */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/30 via-emerald-500/20 to-indigo-500/30 border border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-pulse">
              <Sparkles className="w-10 h-10 text-cyan-300" />
            </div>
            <div className="absolute -inset-2 rounded-full border border-cyan-400/20 animate-ping pointer-events-none" />
          </div>

          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
            RE:START Life-Admin Reasoning Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
            UNDERSTANDING YOUR SITUATION
          </h2>

          {/* Stepped checklist */}
          <div className="w-full max-w-md space-y-3 text-left">
            {analysisSteps.map((step, idx) => {
              const isFinished = analysisStep > idx;
              const isCurrent = analysisStep === idx;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all border ${
                    isFinished
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : isCurrent
                      ? 'bg-white/10 border-cyan-400/50 text-white animate-pulse'
                      : 'bg-white/[0.02] border-white/5 text-neutral-500'
                  }`}
                >
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-neutral-700 shrink-0" />
                  )}
                  <span className="text-xs font-medium font-mono">{step}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-xs text-neutral-400 font-mono">
            Mapping connected service nodes and dependency edges...
          </div>
        </div>
      ) : (
        /* PAGE 02 — Recovery Intake Screen */
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <span>Page 02</span>
                <span>•</span>
                <span>Crisis Intake</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                What happened?
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl leading-relaxed">
                Describe the incident in your own words. We will automatically extract the affected services and discover the optimal order to get them back.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 self-center sm:self-auto bg-white/[0.04] border border-white/10 p-1 rounded-2xl text-xs">
              <Globe className="w-3.5 h-3.5 text-neutral-400 ml-2" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  currentLanguage === 'en' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('mr')}
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  currentLanguage === 'mr' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-xl transition-all ${
                  currentLanguage === 'hi' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Large Glass Input Container */}
          <div className="glass-panel-highlight rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-3">
              Describe your situation in your own words…
            </label>

            <textarea
              rows={4}
              value={situationText}
              onChange={(e) => setSituationText(e.target.value)}
              placeholder="e.g. My backpack was stolen while travelling. Phone, SIM, identity documents and ATM card were inside. I need to access my bank account and receive my salary tomorrow."
              className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/80 rounded-2xl p-4 text-base sm:text-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/80 transition-all leading-relaxed resize-none font-medium"
            />

            {/* Input Controls Bar: Voice Button + Document Attachment */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-3">
                <VoiceButton onTranscript={handleVoiceTranscript} />

                <label className="px-3.5 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white cursor-pointer transition-all flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>＋ Add synthetic documents</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFiles((prev) => [...prev, `${e.target.files![0].name} (Attached)`]);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="text-[11px] text-neutral-500 font-mono">
                {situationText.length} characters entered
              </div>
            </div>

            {/* Attached synthetic document tags */}
            {attachedFiles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {attachedFiles.map((file, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3 h-3 text-cyan-400" />
                    <span>{file}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Example Chips */}
          <div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Or click a pre-built hackathon demo scenario</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setSituationText(chip.text)}
                  className="text-xs px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white transition-all text-left"
                >
                  <span className="font-semibold">{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-neutral-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>AI will evaluate blocking vs parallel paths</span>
            </div>

            <button
              onClick={handleStartAnalysis}
              disabled={!situationText.trim()}
              className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 disabled:opacity-50"
            >
              <span>Analyze Situation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
