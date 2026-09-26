import React from "react";
import {
  Compass,
  Map,
  FolderGit2,
  Bot,
  Radar,
  FileCheck2,
  Code2,
  Users,
  FileText,
  Sparkles,
  ChevronDown,
  Search,
} from "lucide-react";
import { DomainId, DomainMeta } from "../types";
import { DOMAINS } from "../data/initialData";

export type ActiveTab =
  | "strategy"
  | "skill_roadmap"
  | "project_roadmap"
  | "ai_mentor"
  | "market_radar"
  | "resume_auditor"
  | "code_evaluator"
  | "peer_showcase";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDomain: DomainId;
  setSelectedDomain: (domain: DomainId) => void;
  readinessScore: number;
  onOpenDomainModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDomain,
  setSelectedDomain,
  readinessScore,
  onOpenDomainModal,
}) => {
  const currentDomainMeta = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "strategy", label: "Strategy & Blueprint", icon: <FileText className="w-4 h-4" />, badge: "Deliverable" },
    { id: "skill_roadmap", label: "Skill Roadmap", icon: <Map className="w-4 h-4" /> },
    { id: "project_roadmap", label: "Project Architect", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "ai_mentor", label: "AI Mentor", icon: <Bot className="w-4 h-4" />, badge: "Interactive" },
    { id: "market_radar", label: "Market Radar", icon: <Radar className="w-4 h-4" />, badge: "Live Search" },
    { id: "resume_auditor", label: "ATS Resume", icon: <FileCheck2 className="w-4 h-4" /> },
    { id: "code_evaluator", label: "Code Assessment", icon: <Code2 className="w-4 h-4" />, badge: "7-Pillar" },
    { id: "peer_showcase", label: "Peer Trajectories", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Gemini & Google Search Grounded Preparation</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-indigo-400 font-medium">
            Supporting Engineering, Bio Sciences, Commerce, Arts & Tech
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Readiness Score:</span>
            <span className="font-semibold text-emerald-400">{readinessScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab("strategy")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">ASCENT</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Career Readiness
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Multi-Discipline Platform</p>
            </div>
          </div>

          {/* Prominent Domain Selector Button / Modal Trigger */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={onOpenDomainModal}
              className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-750 border border-indigo-500/40 hover:border-indigo-400 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm group"
              title="Click to search all 24+ engineering, life science, business, arts and tech domains"
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                    {currentDomainMeta.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{currentDomainMeta.demandLevel} Demand</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center gap-1.5">
                  <span>{currentDomainMeta.name}</span>
                </span>
              </div>

              <div className="p-1 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-colors ml-1">
                <Search className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all relative ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto pb-2.5 pt-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs whitespace-nowrap rounded-md font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white bg-slate-800/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
