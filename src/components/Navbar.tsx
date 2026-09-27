import React, { useState } from 'react';
import { 
  Compass, 
  Map, 
  CheckSquare, 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  Award, 
  PlusCircle, 
  Globe, 
  ChevronDown, 
  RotateCcw,
  Menu,
  X
} from 'lucide-react';
import { RecoveryPlan } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  activePlan: RecoveryPlan;
  onSelectPlan: (planId: string) => void;
  currentLanguage: 'en' | 'mr' | 'hi';
  onLanguageChange: (lang: 'en' | 'mr' | 'hi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  activePlan,
  onSelectPlan,
  currentLanguage,
  onLanguageChange,
}) => {
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { route: '/', label: 'Overview', icon: Compass },
    { route: '/recovery/new', label: 'Recover', icon: PlusCircle },
    { route: '/recovery/map', label: 'Dependency Map', icon: Map, badge: 'Signature' },
    { route: '/recovery/actions', label: 'Action Plan', icon: CheckSquare },
    { route: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { route: '/documents', label: 'Documents', icon: FileText },
    { route: '/assistant', label: 'Assistant', icon: Sparkles },
    { route: '/demo', label: 'Judge Demo', icon: Award, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050505]/80 backdrop-blur-2xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.08)] group-hover:border-white/40 transition-all">
            <span className="text-white font-semibold text-sm tracking-tight">R:</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold tracking-tight text-base group-hover:text-neutral-200">RE:START</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium -mt-0.5">Life-Admin Engine</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] border border-white/15'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                } ${item.highlight ? 'text-amber-300 hover:text-amber-200' : ''}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Demo Switcher + Language + CTA) */}
        <div className="flex items-center gap-2.5">
          {/* Demo Cases Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="px-2.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all"
              title="Switch demo scenarios"
            >
              <RotateCcw className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline font-medium">Scenario:</span>
              <span className="text-white max-w-[90px] sm:max-w-[110px] truncate">
                {activePlan.userPersona?.name || 'Rohan'} (24)
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {showDemoMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl glass-dropdown p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowDemoMenu(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Select Demo Scenario
                </div>
                <button
                  onClick={() => onSelectPlan('case-rohan-stolen-bag')}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 text-white transition-colors flex flex-col gap-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-400">🌟 Case 01: Rohan (24)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Killer Demo</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-tight">Backpack stolen: SIM, ID, Cards, salary tomorrow</span>
                </button>

                <button
                  onClick={() => onSelectPlan('case-bank-disrupted')}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 text-white transition-colors flex flex-col gap-0.5 mt-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-200">Case 02: Priya (29)</span>
                    <span className="text-[10px] text-neutral-400">Locked 2FA</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-tight">Lost authenticator keys and frozen salary account</span>
                </button>

                <button
                  onClick={() => onSelectPlan('case-relocation-city')}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 text-white transition-colors flex flex-col gap-0.5 mt-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-200">Case 03: Arjun (27)</span>
                    <span className="text-[10px] text-neutral-400">Relocation</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-tight">City move: address proof, utility transfers</span>
                </button>

                <button
                  onClick={() => onSelectPlan('case-expired-passport')}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-white/10 text-white transition-colors flex flex-col gap-0.5 mt-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-200">Case 04: Sara (31)</span>
                    <span className="text-[10px] text-neutral-400">Tatkaal PSK</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-tight">Flight in 10 days, expired passport & lost ID</span>
                </button>
              </div>
            )}
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center bg-white/[0.06] border border-white/10 rounded-full p-0.5 text-[11px]">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-full transition-all ${
                currentLanguage === 'en' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-1 rounded-full transition-all ${
                currentLanguage === 'mr' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
              title="मराठी (Marathi)"
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded-full transition-all ${
                currentLanguage === 'hi' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
              title="हिंदी (Hindi)"
            >
              हिंदी
            </button>
          </div>

          {/* Primary CTA button */}
          <button
            onClick={() => onNavigate('/recovery/new')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all shadow-[0_0_16px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Start Recovery</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-1.5 text-neutral-400 hover:text-white"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-b border-white/10 bg-[#070709]/95 backdrop-blur-2xl flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm ${
                  isActive ? 'bg-white/15 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
