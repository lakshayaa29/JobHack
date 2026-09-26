import React, { useState, useEffect, useRef } from "react";
import {
  FolderGit2,
  Sparkles,
  ShieldAlert,
  Zap,
  CheckCircle2,
  FileCode2,
  Copy,
  Terminal,
  RefreshCw,
  GitBranch,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { DomainMeta, ProjectTierItem } from "../types";
import { DEFAULT_PROJECT_ROADMAPS } from "../data/initialData";
import { StorageService } from "../utils/storage";

interface ProjectRoadmapViewProps {
  currentDomain: DomainMeta;
  onAskMentor: (prompt: string) => void;
  onOpenDomainSelector?: () => void;
}

export const ProjectRoadmapView: React.FC<ProjectRoadmapViewProps> = ({
  currentDomain,
  onAskMentor,
  onOpenDomainSelector,
}) => {
  const [techPreferences, setTechPreferences] = useState(
    currentDomain.keySkills.slice(0, 4).join(", ")
  );
  const [currentLevel, setCurrentLevel] = useState("Beginner to Intermediate");
  const [interest, setInterest] = useState(
    `Production-grade applications and systems in ${currentDomain.name}`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number | null>(null);

  const [projects, setProjects] = useState<ProjectTierItem[]>(() => {
    const saved = StorageService.getProjectRoadmap(currentDomain.id);
    if (saved) {
      return saved.projects;
    }
    return DEFAULT_PROJECT_ROADMAPS[currentDomain.id] || DEFAULT_PROJECT_ROADMAPS["fullstack"];
  });

  const [activeReadmeProject, setActiveReadmeProject] = useState<ProjectTierItem | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const lastParamSignatureRef = useRef<string>("");
  const isInitialMount = useRef(true);

  // Load saved state or generate when domain changes
  useEffect(() => {
    const saved = StorageService.getProjectRoadmap(currentDomain.id);
    if (saved) {
      setProjects(saved.projects);
      setCurrentLevel(saved.inputs.currentLevel || "Beginner to Intermediate");
      setTechPreferences(saved.inputs.techPreferences || currentDomain.keySkills.slice(0, 4).join(", "));
      setInterest(saved.inputs.interest || `Real-world systems in ${currentDomain.name}`);
      setLastSavedTimestamp(saved.updatedAt);
      lastParamSignatureRef.current = `${currentDomain.id}::${saved.inputs.currentLevel}::${saved.inputs.techPreferences}::${saved.inputs.interest}`;
    } else {
      const defaultProjects = DEFAULT_PROJECT_ROADMAPS[currentDomain.id];
      if (defaultProjects) {
        setProjects(defaultProjects);
        setTechPreferences(currentDomain.keySkills.slice(0, 4).join(", "));
        setInterest(`Real-world systems in ${currentDomain.name}`);
        lastParamSignatureRef.current = `${currentDomain.id}::${currentLevel}::${currentDomain.keySkills.slice(0, 4).join(", ")}::${interest}`;
      } else {
        // Auto-generate fresh projects for newly added domains!
        triggerGeneration(
          currentDomain,
          currentLevel,
          currentDomain.keySkills.slice(0, 4).join(", "),
          `Production-grade applications and systems in ${currentDomain.name}`
        );
      }
    }
  }, [currentDomain.id]);

  // Dynamic automatic regeneration when parameters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentSig = `${currentDomain.id}::${currentLevel}::${techPreferences}::${interest}`;
    if (lastParamSignatureRef.current && currentSig !== lastParamSignatureRef.current && !isGenerating) {
      const timer = setTimeout(() => {
        triggerGeneration(currentDomain, currentLevel, techPreferences, interest);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentLevel, techPreferences, interest]);

  const triggerGeneration = async (
    domain: DomainMeta,
    level: string,
    prefs: string,
    domainInterest: string
  ) => {
    setIsGenerating(true);
    const paramSig = `${domain.id}::${level}::${prefs}::${domainInterest}`;

    try {
      const res = await fetch("/api/roadmap/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domain.name,
          currentLevel: level,
          techPreferences: prefs,
          interest: domainInterest,
        }),
      });
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        setProjects(data.projects);
        setExpandedIndex(0);
        lastParamSignatureRef.current = paramSig;
        const now = Date.now();
        setLastSavedTimestamp(now);

        // PERSISTENCE: Save to localStorage immediately
        StorageService.saveProjectRoadmap(domain.id, data.projects, {
          currentLevel: level,
          techPreferences: prefs,
          interest: domainInterest,
        });
      } else {
        throw new Error(data.error || "Failed to generate projects");
      }
    } catch (err) {
      console.warn("Using offline fallback project roadmap:", err);
      const fallback = DEFAULT_PROJECT_ROADMAPS[domain.id] || DEFAULT_PROJECT_ROADMAPS["fullstack"];
      setProjects(fallback);
      lastParamSignatureRef.current = paramSig;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateReadmeMarkdown = (proj: ProjectTierItem) => {
    return `# ${proj.title}
> ${proj.tagline}

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald)](#)

## 📌 Problem Statement
${proj.problemStatement}

## 🏛 System Architecture & Methodology
\`\`\`
${proj.architecture}
\`\`\`

## 🛠 Tools & Tech Stack
${Object.entries(proj.techStack)
  .filter(([_, items]) => items && items.length > 0)
  .map(([cat, items]) => `- **${cat.toUpperCase()}**: ${items?.join(", ")}`)
  .join("\n")}

## 🚀 Key Milestones
${proj.keyMilestones.map((m, idx) => `${idx + 1}. ${m}`).join("\n")}

## 🛡 Standards & Assessment Criteria
- **Quality / Method**: ${proj.codeAssessmentCriteria.codeQuality}
- **Security / Safety**: ${proj.codeAssessmentCriteria.security}
- **Efficiency**: ${proj.codeAssessmentCriteria.efficiency}
- **Testing / Validation**: ${proj.codeAssessmentCriteria.testing}
- **Accessibility / Specs**: ${proj.codeAssessmentCriteria.accessibility}
- **Modern Cloud/AI**: ${proj.codeAssessmentCriteria.googleServices}

## 🎤 Interview Defense Points
> "${proj.portfolioHook}"

## ⚙️ Project Reproduction & Setup Instructions
\`\`\`bash
# 1. Clone or download project repository
git clone https://github.com/your-username/${proj.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.git

# 2. Open project workspace
cd ${proj.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}

# 3. Follow environment setup and run validation test suite
\`\`\`
`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Progressive 3-Tier Project Roadmap</span>
                <span className="text-slate-600">•</span>
                <span>{currentDomain.category}</span>
              </div>

              {lastSavedTimestamp && (
                <span className="text-[11px] text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Saved locally</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentDomain.name} Project Architecture
              </h2>
              {onOpenDomainSelector && (
                <button
                  onClick={onOpenDomainSelector}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4 cursor-pointer"
                >
                  Change Domain
                </button>
              )}
            </div>

            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Moving beyond trivial classroom homework and generic clones. These 3 tiered projects scale from
              core foundations to production-grade deliverables that signal verified technical competence to hiring managers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                triggerGeneration(currentDomain, currentLevel, techPreferences, interest)
              }
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Force Fresh AI Generation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Customization Drawer */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Customize Project Parameters
            </span>
            <span className="text-xs text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Auto-regenerates recommendations when updated</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Target Tools / Tech Stack</label>
              <input
                type="text"
                value={techPreferences}
                onChange={(e) => setTechPreferences(e.target.value)}
                placeholder="e.g. SolidWorks, ANSYS, Python or React, Postgres"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Student Experience Tier</label>
              <select
                aria-label="Student Experience Tier"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Beginner (First large project)">Beginner (First large project)</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Advanced (Ready for complex systems & industry grade)">Advanced (Industry Grade)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Domain Application Focus</label>
              <input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="e.g. Electric Vehicles, Enterprise SaaS, Bio-sensors"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay State if generating */}
      {isGenerating && (
        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between text-xs text-indigo-300 animate-pulse">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
            <span>
              Synthesizing progressive 3-tier projects for <strong>{currentDomain.name}</strong>...
            </span>
          </div>
          <span className="text-[11px] text-indigo-400/80">Tailoring problem statements</span>
        </div>
      )}

      {/* 3 Progressive Tiers Cards */}
      <div className="space-y-6">
        {projects.map((proj, idx) => {
          const isExpanded = expandedIndex === idx;
          const tierColors = {
            Beginner: "border-sky-500/40 bg-sky-950/20 text-sky-400",
            Intermediate: "border-indigo-500/40 bg-indigo-950/20 text-indigo-400",
            Advanced: "border-emerald-500/40 bg-emerald-950/20 text-emerald-400",
          };

          return (
            <div
              key={idx}
              className={`bg-slate-900 border rounded-2xl transition-all duration-200 overflow-hidden ${
                isExpanded ? "border-slate-700 shadow-xl" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Card Top Banner */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          tierColors[proj.difficulty as keyof typeof tierColors] || tierColors.Beginner
                        }`}
                      >
                        {proj.tier || `Tier ${idx + 1}`}
                      </span>

                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        ⏱️ Estimated: <strong className="text-slate-200">{proj.duration}</strong>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-snug">{proj.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveReadmeProject(proj)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>README Blueprint</span>
                    </button>

                    <button
                      onClick={() =>
                        onAskMentor(
                          `I want to build "${proj.title}" (${proj.tier}) in ${currentDomain.name}. How should I design the architecture/workflow, and what are the main technical trade-offs to discuss in an interview?`
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Coach with AI</span>
                    </button>

                    <button
                      onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tech Stack / Tool Pills */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Core Tools & Stack:</span>
                  {Object.entries(proj.techStack).flatMap(([cat, items]) =>
                    (items || []).map((t, i) => (
                      <span
                        key={`${cat}-${i}`}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono"
                      >
                        {t}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Detailed Expandable Body */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800 bg-slate-950/40 space-y-6">
                  {/* Problem Statement & Architecture */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Industry Problem Statement
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                        {proj.problemStatement}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        System Architecture & Methodology
                      </span>
                      <div className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-[11px]">
                        {proj.architecture}
                      </div>
                    </div>
                  </div>

                  {/* Key Milestones */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                      Key Engineering Milestones
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {proj.keyMilestones.map((m, mIdx) => (
                        <div key={mIdx} className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment Standards */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
                      Verified Engineering Standards
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="font-semibold text-rose-300">🔒 Security / Safety</span>
                        <p className="text-[11px] text-slate-400">{proj.codeAssessmentCriteria.security}</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="font-semibold text-amber-300">⚡ Efficiency / Optimization</span>
                        <p className="text-[11px] text-slate-400">{proj.codeAssessmentCriteria.efficiency}</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="font-semibold text-emerald-300">🧪 Testing & Validation</span>
                        <p className="text-[11px] text-slate-400">{proj.codeAssessmentCriteria.testing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interview Defense Hook */}
                  <div className="bg-gradient-to-r from-indigo-950/50 to-slate-900 p-4 rounded-xl border border-indigo-500/30 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-300 tracking-wide uppercase">
                        Interview Distinction (Why this stands out from tutorial clones)
                      </span>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        {proj.portfolioHook}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* GitHub README Blueprint Modal */}
      {activeReadmeProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Project README Template: {activeReadmeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveReadmeProject(null)}
                className="text-slate-400 hover:text-white font-bold px-2 py-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Recruiters and hiring managers spend under 10 seconds evaluating project submissions. This industry-grade README
              structure highlights system architecture, measurable outcomes, and setup instructions immediately.
            </p>

            <div className="relative">
              <pre className="w-full bg-slate-950 font-mono text-[11px] text-slate-300 p-4 rounded-xl border border-slate-800 overflow-x-auto max-h-96">
                {generateReadmeMarkdown(activeReadmeProject)}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateReadmeMarkdown(activeReadmeProject));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "Copied!" : "Copy Markdown"}</span>
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveReadmeProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
