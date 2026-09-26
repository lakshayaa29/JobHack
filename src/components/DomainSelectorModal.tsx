import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Check,
  TrendingUp,
  Briefcase,
  Layers,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";
import { DomainCategory, DomainMeta } from "../types";
import { DOMAINS } from "../data/initialData";
import { StorageService } from "../utils/storage";

interface DomainSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDomainId: string;
  onSelectDomain: (domain: DomainMeta) => void;
}

export const DomainSelectorModal: React.FC<DomainSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedDomainId,
  onSelectDomain,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: (string | DomainCategory)[] = [
    "All",
    "Computer Science & Tech",
    "Core Engineering",
    "Bio & Life Sciences",
    "Commerce & Business",
    "Arts, Design & Media",
    "Applied Sciences",
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Check which domains have saved roadmaps
  const savedRoadmaps = useMemo(() => {
    return StorageService.getAllSkillRoadmaps();
  }, [isOpen]);

  const filteredDomains = useMemo(() => {
    return DOMAINS.filter((domain) => {
      const matchesCategory =
        selectedCategory === "All" || domain.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        domain.name.toLowerCase().includes(q) ||
        domain.tagline.toLowerCase().includes(q) ||
        domain.category.toLowerCase().includes(q) ||
        domain.keySkills.some((s) => s.toLowerCase().includes(q)) ||
        domain.careerPaths.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Select Your Specialization Domain</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {DOMAINS.length} Disciplines
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Covers Engineering, Life Sciences, Commerce, Arts, and Computer Science
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800/80 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by specialization, skills (e.g. SolidWorks, HPLC, Python, DCF), or career..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Grid List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredDomains.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Compass className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-300 font-medium">
                No specializations found matching &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-indigo-400 hover:underline cursor-pointer"
              >
                Clear search and view all domains
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredDomains.map((domain) => {
                const isSelected = selectedDomainId === domain.id;
                const hasSaved = !!savedRoadmaps[domain.id];

                return (
                  <div
                    key={domain.id}
                    onClick={() => {
                      onSelectDomain(domain);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                      isSelected
                        ? "bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-950/40"
                        : "bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {domain.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {hasSaved && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Saved</span>
                            </span>
                          )}

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              domain.demandLevel === "Very High"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-sky-500/20 text-sky-300"
                            }`}
                          >
                            {domain.demandLevel} Demand
                          </span>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {domain.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-snug mt-1">{domain.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1">
                        {domain.keySkills.slice(0, 4).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                        {domain.keySkills.length > 4 && (
                          <span className="text-[10px] text-slate-500 self-center">
                            +{domain.keySkills.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                          <span>{domain.avgSalary}</span>
                        </span>
                        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] font-medium">
                          <span>Select</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>
            Selected: <strong className="text-white">{DOMAINS.find((d) => d.id === selectedDomainId)?.name}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
