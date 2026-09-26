import React from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Search,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { ActiveTab } from "./Navbar";
import { DomainMeta } from "../types";

interface HeroBannerProps {
  currentDomain: DomainMeta;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDomainModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentDomain,
  setActiveTab,
  onOpenDomainModal,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 text-white pt-8 pb-10">
      {/* Decorative ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Main Hero Copy */}
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenDomainModal}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/30 text-xs text-indigo-300 font-medium transition-colors cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Specialization:</span>
                <strong className="text-emerald-400 font-bold group-hover:underline">{currentDomain.name}</strong>
                <span className="text-[10px] text-indigo-300/80 bg-indigo-500/20 px-1.5 py-0.2 rounded">
                  Change
                </span>
              </button>

              <span className="text-xs text-slate-400">
                Category: <strong className="text-slate-200">{currentDomain.category}</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bridge the Gap Between{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                Academic Theory
              </span>{" "}
              and Industry Expectations
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              A comprehensive career development platform empowering students across engineering, life sciences, commerce, arts, and computing with{" "}
              <strong className="text-white font-semibold">personalized skill roadmaps</strong>,{" "}
              <strong className="text-white font-semibold">3-tier project architectures</strong>,{" "}
              <strong className="text-white font-semibold">real-time Google search market intelligence</strong>, and{" "}
              <strong className="text-white font-semibold">industry-standard assessments</strong>.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab("skill_roadmap")}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Generate Skill Roadmap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab("project_roadmap")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View 3-Tier Projects</span>
              </button>

              {onOpenDomainModal && (
                <button
                  onClick={onOpenDomainModal}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Browse 24+ Disciplines</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("strategy")}
                className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Executive Strategy & Blueprint</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics / Killer Hook Spotlight */}
          <div className="lg:w-96 shrink-0 bg-slate-800/80 backdrop-blur-md p-5 rounded-2xl border border-slate-700/80 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide uppercase">The Killer Hook</span>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Interactive AI
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong className="text-white">Dynamic AI Career Twin:</strong> Adaptive skill trajectory updated with every commit you make.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Search className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong className="text-white">Google Search Grounding:</strong> Real-time 2026 hiring criteria, no stale curriculum.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong className="text-white">7-Pillar Code Rubric:</strong> Security, Big-O efficiency, accessibility & testing evaluated automatically.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">
                  <strong className="text-white">Zero Tutorial Clones:</strong> System architecture blueprints that withstand hiring manager grilling.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Avg Junior SWE Range:</span>
              <span className="font-bold text-emerald-400">{currentDomain.avgSalary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
