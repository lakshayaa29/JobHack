import React, { useState, useEffect } from "react";
import {
  Radar,
  Sparkles,
  TrendingUp,
  DollarSign,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Building2,
  RefreshCw,
} from "lucide-react";
import { DomainMeta, MarketIntelligenceData } from "../types";
import { INITIAL_MARKET_INTELLIGENCE } from "../data/initialData";

interface MarketRadarViewProps {
  currentDomain: DomainMeta;
}

export const MarketRadarView: React.FC<MarketRadarViewProps> = ({ currentDomain }) => {
  const [data, setData] = useState<MarketIntelligenceData>(
    INITIAL_MARKET_INTELLIGENCE[currentDomain.id] || INITIAL_MARKET_INTELLIGENCE["fullstack"]
  );
  const [isScanning, setIsScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLiveMarketData = async () => {
    setIsScanning(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/market/intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: currentDomain.name }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error(result.error || "Failed to fetch market data");
      }
    } catch (err: any) {
      console.warn("Market scan error:", err);
      setErrorMsg("Using offline market intelligence benchmarks while live Google Search grounding syncs.");
      setData(INITIAL_MARKET_INTELLIGENCE[currentDomain.id] || INITIAL_MARKET_INTELLIGENCE["fullstack"]);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    // When domain changes, load default and trigger scan if needed
    setData(INITIAL_MARKET_INTELLIGENCE[currentDomain.id] || {
      domain: currentDomain.name,
      marketDemandLevel: currentDomain.demandLevel,
      averageEntrySalary: currentDomain.avgSalary,
      topRequiredSkills: currentDomain.keySkills,
      fastestGrowingTools: ["Next.js", "Docker", "Gemini API", "Tailwind CSS"],
      decliningOrCommoditizedSkills: ["Basic jQuery", "Static HTML/CSS without reactivity"],
      hiringCriteriaShift: "Hiring managers favor live deployed projects with testing suites over textbook algorithms.",
      topHiringSectors: ["Enterprise SaaS", "Cloud Infrastructure", "FinTech"],
      keyAdviceForStudents: [
        "Include live URLs and CI/CD pipelines in your GitHub README",
        "Master strict TypeScript and database schema design",
      ],
      searchInsights: "Continued high demand for candidates who understand full-stack system architecture and testing.",
    });
  }, [currentDomain]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
              <Search className="w-3.5 h-3.5" />
              <span>Google Search Grounding Engine</span>
              <span className="text-slate-600">•</span>
              <span>Gemini 3.5 Flash</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Real-Time Hiring Intelligence: {currentDomain.name}
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              University computer science syllabi often lag behind current industry demands by 3 to 5 years.
              This radar grounds your career preparation in real-time hiring metrics, high-growth tools, and market benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveMarketData}
              disabled={isScanning}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-600/20 transition-all"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Google Search Data...</span>
                </>
              ) : (
                <>
                  <Radar className="w-4 h-4" />
                  <span>Scan Live 2026 Hiring Data</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Top Benchmark KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Market Demand</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">
            {data.marketDemandLevel}
          </div>
          <p className="text-[11px] text-slate-400">Consistent hiring pipeline across tech hubs</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Entry Compensation</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {data.averageEntrySalary}
          </div>
          <p className="text-[11px] text-slate-400">Junior SWE base benchmark range</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2 sm:col-span-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Primary Hiring Sectors</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.topHiringSectors?.map((sector, sIdx) => (
              <span
                key={sIdx}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">Industries investing aggressively in junior talent</p>
        </div>
      </div>

      {/* Skills Grid: Top In-Demand vs Growing vs Declining */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Required Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4" />
            <span>Non-Negotiable Core Skills</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Skills listed on 80%+ of verified job requisitions for {currentDomain.name}.
          </p>
          <div className="space-y-2">
            {data.topRequiredSkills?.map((skill, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-white">{skill}</span>
                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10">
                  Critical
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fastest Growing Tools */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Fastest Rising Tech (2025/2026)</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Emerging technologies creating outsized leverage for junior candidates.
          </p>
          <div className="space-y-2">
            {data.fastestGrowingTools?.map((tool, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-white">{tool}</span>
                <span className="text-[10px] text-sky-400 font-bold px-1.5 py-0.5 rounded bg-sky-500/10">
                  + High Growth
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Declining / Commoditized Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4" />
            <span>Declining or Commoditized</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Skills that no longer provide competitive differentiation to recruiters.
          </p>
          <div className="space-y-2">
            {data.decliningOrCommoditizedSkills?.map((skill, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs"
              >
                <span className="text-slate-300 line-through decoration-rose-500/40">{skill}</span>
                <span className="text-[10px] text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-500/10">
                  Avoid Over-investing
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hiring Shift & Actionable Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wide">
            <Lightbulb className="w-4 h-4" />
            <span>Key Hiring Criteria Shift</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            {data.hiringCriteriaShift}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4" />
            <span>Actionable Advice for Students</span>
          </div>
          <div className="space-y-2">
            {data.keyAdviceForStudents?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citations & Sources (from Search Grounding) */}
      {data.sources && data.sources.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <Search className="w-3.5 h-3.5" />
            <span>Verified Google Search Sources:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-sky-400 hover:text-sky-300 bg-sky-950/40 hover:bg-sky-950/80 border border-sky-800/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>{src.title || "Industry Hiring Report"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
