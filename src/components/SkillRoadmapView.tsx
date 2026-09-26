import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  Sparkles,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Download,
  HelpCircle,
  RefreshCw,
  Layers,
  Wrench,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { DomainMeta, SkillRoadmapData, SkillTopic } from "../types";
import { DEFAULT_SKILL_ROADMAPS } from "../data/initialData";
import { StorageService } from "../utils/storage";

interface SkillRoadmapViewProps {
  currentDomain: DomainMeta;
  onAskMentor: (prompt: string) => void;
  onUpdateCompletedTopic: (topicName: string, completed: boolean) => void;
  completedTopics: Set<string>;
  onOpenDomainSelector?: () => void;
}

export const SkillRoadmapView: React.FC<SkillRoadmapViewProps> = ({
  currentDomain,
  onAskMentor,
  onUpdateCompletedTopic,
  completedTopics,
  onOpenDomainSelector,
}) => {
  // Inputs state
  const [currentLevel, setCurrentLevel] = useState("Sophomore / Self-Taught (Basic Syntax)");
  const [timeline, setTimeline] = useState("6 Months");
  const [targetRoles, setTargetRoles] = useState(currentDomain.careerPaths?.[0] || "Junior Specialist");
  const [weeklyHours, setWeeklyHours] = useState(15);

  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number | null>(null);

  // Active roadmap data
  const [roadmap, setRoadmap] = useState<SkillRoadmapData>(() => {
    const saved = StorageService.getSkillRoadmap(currentDomain.id);
    if (saved) {
      return saved.roadmap;
    }
    return DEFAULT_SKILL_ROADMAPS[currentDomain.id] || DEFAULT_SKILL_ROADMAPS["fullstack"];
  });

  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [showExportModal, setShowExportModal] = useState(false);

  // Keep track of the last parameter signature that was fetched/loaded
  const lastParamSignatureRef = useRef<string>("");
  const isInitialMount = useRef(true);

  // Load saved state or generate when domain changes
  useEffect(() => {
    const saved = StorageService.getSkillRoadmap(currentDomain.id);
    if (saved) {
      setRoadmap(saved.roadmap);
      setCurrentLevel(saved.inputs.currentLevel || "Sophomore / Self-Taught (Basic Syntax)");
      setTimeline(saved.inputs.timeline || "6 Months");
      setWeeklyHours(saved.inputs.weeklyHours || 15);
      setTargetRoles(saved.inputs.targetRoles || currentDomain.careerPaths?.[0] || "Junior Specialist");
      setLastSavedTimestamp(saved.updatedAt);
      lastParamSignatureRef.current = `${currentDomain.id}::${saved.inputs.currentLevel}::${saved.inputs.timeline}::${saved.inputs.weeklyHours}::${saved.inputs.targetRoles}`;
    } else {
      // Check if we have a default template
      const defaultData = DEFAULT_SKILL_ROADMAPS[currentDomain.id];
      if (defaultData) {
        setRoadmap(defaultData);
        setTargetRoles(currentDomain.careerPaths?.[0] || "Junior Specialist");
        lastParamSignatureRef.current = `${currentDomain.id}::${currentLevel}::${timeline}::${weeklyHours}::${currentDomain.careerPaths?.[0] || ""}`;
      } else {
        // Automatically generate fresh roadmap for newly selected domain!
        triggerGeneration(
          currentDomain,
          currentLevel,
          timeline,
          weeklyHours,
          currentDomain.careerPaths?.[0] || "Entry-level Specialist"
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

    const currentSig = `${currentDomain.id}::${currentLevel}::${timeline}::${weeklyHours}::${targetRoles}`;
    // If the signature changed from what was loaded/generated, debounce and auto-regenerate
    if (lastParamSignatureRef.current && currentSig !== lastParamSignatureRef.current && !isGenerating) {
      const timer = setTimeout(() => {
        triggerGeneration(currentDomain, currentLevel, timeline, weeklyHours, targetRoles);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentLevel, timeline, weeklyHours, targetRoles]);

  // Core API generation function
  const triggerGeneration = async (
    domain: DomainMeta,
    level: string,
    time: string,
    hours: number,
    roles: string
  ) => {
    setIsGenerating(true);
    setErrorMsg(null);
    const paramSig = `${domain.id}::${level}::${time}::${hours}::${roles}`;

    try {
      const res = await fetch("/api/roadmap/skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domain.name,
          currentLevel: level,
          timeline: time,
          targetRoles: roles,
          focusAreas: `Mastery of modern ${domain.name} tools, industry standards, and hands-on deliverables.`,
        }),
      });

      const data = await res.json();
      if (data.success && data.roadmap) {
        setRoadmap(data.roadmap);
        setExpandedPhase(1);
        lastParamSignatureRef.current = paramSig;
        const now = Date.now();
        setLastSavedTimestamp(now);

        // PERSISTENCE: Save to localStorage immediately
        StorageService.saveSkillRoadmap(domain.id, data.roadmap, {
          currentLevel: level,
          timeline: time,
          weeklyHours: hours,
          targetRoles: roles,
        });
      } else {
        throw new Error(data.error || "Failed to generate roadmap.");
      }
    } catch (err: any) {
      console.warn("Using offline fallback roadmap:", err);
      setErrorMsg("Using verified industry syllabus while synchronizing live AI model.");
      const fallback = DEFAULT_SKILL_ROADMAPS[domain.id] || DEFAULT_SKILL_ROADMAPS["fullstack"];
      setRoadmap(fallback);
      lastParamSignatureRef.current = paramSig;
    } finally {
      setIsGenerating(false);
    }
  };

  // Count total topics and completed topics
  const allTopics: SkillTopic[] = roadmap.phases.flatMap((p) => p.topics);
  const totalTopicsCount = allTopics.length;
  const completedCount = allTopics.filter((t) => completedTopics.has(t.name)).length;
  const percentComplete = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Header & Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
                <Map className="w-3.5 h-3.5" />
                <span>Personalized Skill Roadmap</span>
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
                {roadmap.domain} Mastery Curriculum
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
              {roadmap.summary}
            </p>
          </div>

          {/* Progress Gauge & Export */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 sm:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium">Curriculum Progress</span>
              <span className="font-bold text-emerald-400">{percentComplete}% Complete</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
              <span>{completedCount} of {totalTopicsCount} skills mastered</span>
              <button
                onClick={() => setShowExportModal(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export Syllabus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input Parameters Config Drawer */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Learning Profile & Inputs</span>
            </span>
            <span className="text-xs text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Auto-regenerates recommendations when changed</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Current Skill Level</label>
              <select
                aria-label="Current Skill Level"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Beginner (Zero experience in this field)">Beginner (Zero experience)</option>
                <option value="Sophomore / Self-Taught (Basic Syntax & Concepts)">Sophomore / Basics Known</option>
                <option value="University Undergrad (Academic theory known)">Undergrad (Theory known)</option>
                <option value="Intermediate (Needs production/industry tools)">Intermediate (Needs Industry Tools)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Timeline</label>
              <select
                aria-label="Target Timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="3 Months (Intensive Bootcamp Pace)">3 Months (Intensive Pace)</option>
                <option value="6 Months (Balanced Semester Pace)">6 Months (Semester Pace)</option>
                <option value="12 Months (Comprehensive Mastery Pace)">12 Months (Mastery Pace)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Weekly Commitment</label>
              <select
                aria-label="Weekly Commitment"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value={10}>10 Hours / Week (Light Study)</option>
                <option value={15}>15 Hours / Week (Recommended)</option>
                <option value={25}>25+ Hours / Week (Full Immersion)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Roles / Specialization</label>
              <input
                type="text"
                value={targetRoles}
                onChange={(e) => setTargetRoles(e.target.value)}
                placeholder="e.g. Junior Systems Engineer"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {errorMsg ? (
              <span className="text-xs text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                Target Readiness: <strong className="text-slate-300">{roadmap.readinessTarget}</strong>
              </span>
            )}

            <button
              onClick={() =>
                triggerGeneration(currentDomain, currentLevel, timeline, weeklyHours, targetRoles)
              }
              disabled={isGenerating}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20 transition-all"
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
      </div>

      {/* Loading Overlay State if generating */}
      {isGenerating && (
        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 flex items-center justify-between text-xs text-indigo-300 animate-pulse">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
            <span>
              Regenerating tailored roadmap for <strong>{currentDomain.name}</strong> ({currentLevel}, {timeline})...
            </span>
          </div>
          <span className="text-[11px] text-indigo-400/80">Updating competencies</span>
        </div>
      )}

      {/* Recommended Weekly Routine & Tool Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weekly Routine Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wide uppercase">
            <Clock className="w-4 h-4" />
            <span>Recommended Weekly Balance ({weeklyHours} hrs)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-300">Hands-on Applied Projects & Lab</span>
              <span className="font-bold text-emerald-400">{Math.round(weeklyHours * 0.55)} hrs (55%)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-300">Design, Methodology & Modeling</span>
              <span className="font-bold text-sky-400">{Math.round(weeklyHours * 0.25)} hrs (25%)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-300">Deep Theory & Industry Standards</span>
              <span className="font-bold text-purple-400">{Math.round(weeklyHours * 0.2)} hrs (20%)</span>
            </div>
          </div>
        </div>

        {/* Industry Certifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide uppercase">
            <Award className="w-4 h-4" />
            <span>High-Signal Industry & Professional Certifications</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roadmap.recommendedCertifications?.map((cert, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/60 p-3 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{cert.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                    {cert.provider}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{cert.relevance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Roadmap Phase Accordion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Learning Phases & Topic Modules</span>
          </h3>
          <span className="text-xs text-slate-400">Click a phase to expand topics</span>
        </div>

        {roadmap.phases.map((phase) => {
          const isExpanded = expandedPhase === phase.phaseNumber;
          const phaseTopics = phase.topics || [];
          const phaseDoneCount = phaseTopics.filter((t) => completedTopics.has(t.name)).length;

          return (
            <div
              key={phase.phaseNumber}
              className={`bg-slate-900 border rounded-2xl transition-all duration-200 overflow-hidden ${
                isExpanded ? "border-indigo-500/60 shadow-lg shadow-indigo-950/30" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? 0 : phase.phaseNumber)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer bg-slate-900/90 hover:bg-slate-850 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isExpanded
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {phase.phaseNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                        {phase.duration}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        {phaseDoneCount} / {phaseTopics.length} mastered
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">{phase.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{phase.focus}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-medium text-slate-400">
                      {Math.round((phaseDoneCount / (phaseTopics.length || 1)) * 100)}%
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-90 text-indigo-400" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Phase Topics List */}
              {isExpanded && (
                <div className="p-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {phaseTopics.map((topic, tIdx) => {
                      const isDone = completedTopics.has(topic.name);
                      return (
                        <div
                          key={tIdx}
                          className={`p-4 rounded-xl border transition-all ${
                            isDone
                              ? "bg-emerald-950/20 border-emerald-500/30"
                              : "bg-slate-900 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              {/* Completion Checkbox */}
                              <button
                                onClick={() => onUpdateCompletedTopic(topic.name, !isDone)}
                                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                                  isDone
                                    ? "bg-emerald-500 text-white"
                                    : "border border-slate-600 hover:border-slate-400 text-transparent"
                                }`}
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>

                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`text-sm font-semibold ${
                                      isDone ? "text-emerald-300 line-through decoration-emerald-500/50" : "text-white"
                                    }`}
                                  >
                                    {topic.name}
                                  </span>

                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                      topic.importance === "Essential"
                                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                        : topic.importance === "Recommended"
                                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                        : "bg-slate-700/50 text-slate-300 border border-slate-600"
                                    }`}
                                  >
                                    {topic.importance}
                                  </span>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed">{topic.description}</p>

                                {/* Hands-on Outcome */}
                                <div className="mt-2 text-xs flex items-start gap-1.5 text-slate-400 bg-slate-850 p-2.5 rounded-lg border border-slate-800">
                                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-slate-200">Practical Outcome: </strong>
                                    {topic.handsOnOutcome}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Actions & Resources */}
                            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                              {/* Quick Ask AI Mentor */}
                              <button
                                onClick={() =>
                                  onAskMentor(
                                    `Explain "${topic.name}" from my ${roadmap.domain} roadmap. How is it evaluated in junior interviews or industry assessments, and what practical project should I build to demonstrate mastery?`
                                  )
                                }
                                className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <HelpCircle className="w-3 h-3" />
                                <span>Drill with AI</span>
                              </button>

                              {/* Resources Links */}
                              {topic.resources && topic.resources.length > 0 && (
                                <div className="flex items-center gap-1.5">
                                  {topic.resources.map((res, rIdx) => (
                                    <a
                                      key={rIdx}
                                      href={res.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[11px] text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 transition-colors"
                                      title={res.name}
                                    >
                                      <span>{res.name.slice(0, 16)}...</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Export Syllabus Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-400" />
                <span>Export Learning Syllabus: {roadmap.domain}</span>
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white font-bold px-2 py-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Copy this markdown-formatted syllabus to paste into Notion, Obsidian, GitHub, or print as a study planner.
            </p>

            <textarea
              readOnly
              rows={12}
              className="w-full bg-slate-950 font-mono text-xs text-slate-300 p-4 rounded-xl border border-slate-800 focus:outline-none"
              value={`# ${roadmap.domain} - Career Readiness Syllabus
Target: ${roadmap.readinessTarget}
Estimated Weekly Hours: ${roadmap.estimatedWeeklyHours}

${roadmap.phases
  .map(
    (p) => `## Phase ${p.phaseNumber}: ${p.title} (${p.duration})
Focus: ${p.focus}

${p.topics
  .map(
    (t) => `- [${completedTopics.has(t.name) ? "x" : " "}] **${t.name}** [${t.importance}]
  - Practical Outcome: ${t.handsOnOutcome}`
  )
  .join("\n")}
`
  )
  .join("\n")}

### Certifications
${roadmap.recommendedCertifications?.map((c) => `- ${c.name} (${c.provider}): ${c.relevance}`).join("\n")}
`}
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `# ${roadmap.domain} Syllabus\n` + JSON.stringify(roadmap, null, 2)
                  );
                  alert("Syllabus markdown copied to clipboard!");
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExportModal(false)}
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
