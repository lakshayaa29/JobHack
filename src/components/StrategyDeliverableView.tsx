import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Download,
  Copy,
  Cpu,
  Layers,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Check,
} from "lucide-react";
import { STRATEGY_DATA } from "../data/strategyBlueprint";

export const StrategyDeliverableView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [copiedReport, setCopiedReport] = useState(false);

  const sections = [
    { id: 0, title: "1. Problem Validation", label: "7 Core Pain Points" },
    { id: 1, title: "2. Solution Mapping", label: "Feature Matrix" },
    { id: 2, title: "3. Core MVP Spec", label: "Buildable 3-5 Features" },
    { id: 3, title: "4. End-to-End User Flow", label: "Student Journey" },
    { id: 4, title: "5. AI Integration Specs", label: "Roadmaps & Gemini Prompts" },
    { id: 5, title: "6. Code Assessment Rubric", label: "7 Engineering Pillars" },
    { id: 6, title: "7. Technical Challenges", label: "Execution Risks & Mitigations" },
    { id: 7, title: "8. Differentiation & Hook", label: "The AI Career Twin" },
  ];

  const handleCopyFullReport = () => {
    const markdown = `# Ascent Platform: Comprehensive Student Career & Technical Preparation Concept
## Executive Strategic Proposal & Feature Roadmap

### 1. Problem Validation (The 7 Core Pain Points)
${STRATEGY_DATA.problemValidation
  .map(
    (p) => `#### ${p.problem}
- **Why It Matters**: ${p.whyItMatters}
- **How It Blocks Student Success**: ${p.howItBlocksSuccess}
- **Platform Solution**: ${p.platformSolution}`
  )
  .join("\n\n")}

---

### 2. Problem-to-Solution Mapping Matrix
| Pain Point | Platform Solution Feature | Core AI / Architectural Mechanism | Target Impact Metric |
| :--- | :--- | :--- | :--- |
${STRATEGY_DATA.solutionMappingMatrix
  .map((m) => `| ${m.painPoint} | ${m.feature} | ${m.coreMechanism} | ${m.impactMetric} |`)
  .join("\n")}

---

### 3. Core MVP Specification (Minimum Viable Product)
**Rationale**: ${STRATEGY_DATA.mvpSpecification.rationale}

${STRATEGY_DATA.mvpSpecification.coreFeatures
  .map(
    (f) => `#### Feature ${f.number}: ${f.name}
- **Feasibility**: ${f.feasibility}
- **Value Proposition**: ${f.valueProp}
- **Key Deliverables**:
${f.keyComponents.map((c) => `  * ${c}`).join("\n")}`
  )
  .join("\n\n")}

---

### 4. End-to-End User Flow
${STRATEGY_DATA.userFlowSteps
  .map(
    (s) => `#### Step ${s.step}: ${s.title} (${s.timeToValue})
- **Action**: ${s.action}`
  )
  .join("\n\n")}

---

### 5. Detailed AI Integration Specifications

#### A. Personalized Skill Roadmap
- **Input**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.inputs.join(", ")}
- **Processing Engine**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.processing.model}
- **System Instruction**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.processing.systemInstruction}
- **Constraints**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.processing.constraints}
- **Output Structure**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.outputStructure.join(", ")}
- **Chatbot Experience**: ${STRATEGY_DATA.aiSpecification.skillRoadmap.chatbotExperience}

#### B. 3-Tier Progressive Project Roadmap
- **Input**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.inputs.join(", ")}
- **Processing Engine**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.processing.model}
- **System Instruction**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.processing.systemInstruction}
- **Constraints**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.processing.constraints}
- **Output Structure**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.outputStructure.join(", ")}
- **Chatbot Experience**: ${STRATEGY_DATA.aiSpecification.projectRoadmap.chatbotExperience}

---

### 6. 7-Pillar Code Assessment Standards
${STRATEGY_DATA.codeAssessmentRubric
  .map(
    (r) => `#### ${r.criterion}
- **Requirement**: ${r.description}
- **Platform Enforcement**: ${r.platformEnforcement}`
  )
  .join("\n\n")}

---

### 7. Key Technical & Operational Challenges
${STRATEGY_DATA.technicalChallenges
  .map(
    (c) => `#### ${c.challenge}
- **Why It Is Hard**: ${c.whyHard}
- **Architectural Mitigation**: ${c.mitigation}`
  )
  .join("\n\n")}

---

### 8. Differentiation & The Killer Hook
#### The Killer Hook: ${STRATEGY_DATA.differentiationAndHook.theKillerHook.name}
${STRATEGY_DATA.differentiationAndHook.theKillerHook.description}

**Why Students Return Daily**:
${STRATEGY_DATA.differentiationAndHook.theKillerHook.whyStudentsReturn}
`;

    navigator.clipboard.writeText(markdown);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <FileText className="w-3.5 h-3.5" />
              <span>Full Strategic Blueprint & Executive Concept Deliverable</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ascent: Student Career & Technical Preparation Architecture
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              The complete 8-part strategic dossier addressing problem validation, solution mapping, MVP prioritization,
              AI integration specs, 7-pillar code rubrics, operational challenges, and unique market differentiation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyFullReport}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all"
            >
              {copiedReport ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedReport ? "Full Report Copied!" : "Copy Full Executive Dossier"}</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all cursor-pointer ${
                activeSection === sec.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-800/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700/60"
              }`}
            >
              <span>{sec.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Section Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Section 0: Problem Validation */}
        {activeSection === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 1</span>
              <h3 className="text-xl font-bold text-white">Validation of the 7 Core Student Pain Points</h3>
              <p className="text-xs text-slate-400">
                Why each problem matters and precisely how it blocks student success in entering the tech industry.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {STRATEGY_DATA.problemValidation.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{item.problem}</h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      Blocker
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="font-semibold text-amber-300">Why It Matters:</span>
                      <p className="text-slate-300 leading-relaxed">{item.whyItMatters}</p>
                    </div>

                    <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="font-semibold text-rose-300">How It Blocks Student Success:</span>
                      <p className="text-slate-300 leading-relaxed">{item.howItBlocksSuccess}</p>
                    </div>
                  </div>

                  <div className="text-xs bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/30 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-300">Ascent Platform Solution: </strong>
                      <span className="text-slate-200">{item.platformSolution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 1: Solution Mapping Matrix */}
        {activeSection === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 2</span>
              <h3 className="text-xl font-bold text-white">Problem-to-Solution Mapping Matrix</h3>
              <p className="text-xs text-slate-400">
                Direct feature mapping demonstrating how each platform component resolves specific student bottlenecks.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Student Pain Point</th>
                    <th className="py-3 px-4">Direct Platform Feature</th>
                    <th className="py-3 px-4">Core Mechanism & Technology</th>
                    <th className="py-3 px-4">Measurable Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-normal">
                  {STRATEGY_DATA.solutionMappingMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">{row.painPoint}</td>
                      <td className="py-3.5 px-4 text-indigo-300 font-medium">{row.feature}</td>
                      <td className="py-3.5 px-4 text-slate-300 leading-snug">{row.coreMechanism}</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-semibold">{row.impactMetric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 2: Core MVP Specification */}
        {activeSection === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 3</span>
              <h3 className="text-xl font-bold text-white">Core MVP Specification (Buildable by a Small Team)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {STRATEGY_DATA.mvpSpecification.rationale}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {STRATEGY_DATA.mvpSpecification.coreFeatures.map((feat) => (
                <div key={feat.number} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {feat.number}
                      </div>
                      <h4 className="text-base font-bold text-white">{feat.name}</h4>
                    </div>

                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      {feat.feasibility}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-indigo-300">Value Proposition: </strong>
                    {feat.valueProp}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      Core Functional Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {feat.keyComponents.map((comp, cIdx) => (
                        <div key={cIdx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: End-to-End User Flow */}
        {activeSection === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 4</span>
              <h3 className="text-xl font-bold text-white">End-to-End Student User Journey</h3>
              <p className="text-xs text-slate-400">
                Walkthrough of how a student navigates the platform from first landing to confident job applications.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-600/40">
              {STRATEGY_DATA.userFlowSteps.map((step) => (
                <div key={step.step} className="relative bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
                  <div className="absolute -left-[31px] top-5 w-5 h-5 rounded-full bg-indigo-600 border-2 border-slate-900 text-[10px] text-white font-bold flex items-center justify-center">
                    {step.step}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                      {step.timeToValue}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Detailed AI Integration Specs */}
        {activeSection === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 5</span>
              <h3 className="text-xl font-bold text-white">AI Integration Specifications for Core Features</h3>
              <p className="text-xs text-slate-400">
                Detailed architecture for the two core hooks: Inputs, Gemini processing prompts, structured JSON outputs, and multi-turn conversational loops.
              </p>
            </div>

            {/* Feature A: Skill Roadmap */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  A
                </span>
                <h4 className="text-base font-bold text-white">Personalized Skill Roadmap AI Architecture</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-indigo-300">1. Student Input Schema:</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {STRATEGY_DATA.aiSpecification.skillRoadmap.inputs.map((inp, i) => (
                      <li key={i}>{inp}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-300">2. Gemini Processing Pipeline:</span>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Model: </strong>
                    {STRATEGY_DATA.aiSpecification.skillRoadmap.processing.model}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    <strong>System Instruction: </strong>
                    {STRATEGY_DATA.aiSpecification.skillRoadmap.processing.systemInstruction}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-300">3. Structured Output Presentation:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  {STRATEGY_DATA.aiSpecification.skillRoadmap.outputStructure.map((out, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 text-xs space-y-1">
                <span className="font-bold text-indigo-300">4. Interactive Chatbot Loop:</span>
                <p className="text-slate-200 leading-relaxed">
                  {STRATEGY_DATA.aiSpecification.skillRoadmap.chatbotExperience}
                </p>
              </div>
            </div>

            {/* Feature B: Project Roadmap */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  B
                </span>
                <h4 className="text-base font-bold text-white">3-Tier Progressive Project Roadmap AI Architecture</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-300">1. Student Input Schema:</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {STRATEGY_DATA.aiSpecification.projectRoadmap.inputs.map((inp, i) => (
                      <li key={i}>{inp}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-300">2. Gemini Progressive Synthesis:</span>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Model: </strong>
                    {STRATEGY_DATA.aiSpecification.projectRoadmap.processing.model}
                  </p>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    <strong>System Instruction: </strong>
                    {STRATEGY_DATA.aiSpecification.projectRoadmap.processing.systemInstruction}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-300">3. 3-Tier Output Structure:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  {STRATEGY_DATA.aiSpecification.projectRoadmap.outputStructure.map((out, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                <span className="font-bold text-emerald-300">4. Interactive Chatbot Loop:</span>
                <p className="text-slate-200 leading-relaxed">
                  {STRATEGY_DATA.aiSpecification.projectRoadmap.chatbotExperience}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Code Assessment Criteria */}
        {activeSection === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 6</span>
              <h3 className="text-xl font-bold text-white">7-Pillar Code Assessment Standards</h3>
              <p className="text-xs text-slate-400">
                Evaluation rubrics ensuring student projects uphold code quality, security, efficiency, testing, accessibility, problem alignment, and Google services without compromise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {STRATEGY_DATA.codeAssessmentRubric.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.criterion}</h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Standard
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">Platform Automated Enforcement: </strong>
                      <span>{item.platformEnforcement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Technical Challenges */}
        {activeSection === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 7</span>
              <h3 className="text-xl font-bold text-white">Technical & Operational Challenges</h3>
              <p className="text-xs text-slate-400">
                Analysis of the hardest engineering aspects of building this platform and their architectural mitigations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {STRATEGY_DATA.technicalChallenges.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{item.challenge}</h4>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Risk Analysis
                    </span>
                  </div>

                  <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="font-semibold text-rose-300">Why It Is Hard to Execute:</span>
                    <p className="text-slate-300 leading-relaxed">{item.whyHard}</p>
                  </div>

                  <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/30 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">Architectural Mitigation: </strong>
                      <span className="text-slate-200">{item.mitigation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Differentiation & Hook */}
        {activeSection === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Deliverable Part 8</span>
              <h3 className="text-xl font-bold text-white">Market Differentiation & The Killer Hook</h3>
              <p className="text-xs text-slate-400">
                Why this platform outperforms existing point solutions and the unique AI hook that drives retention.
              </p>
            </div>

            {/* Competitor flaws */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Gaps in Existing Solutions:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {STRATEGY_DATA.differentiationAndHook.existingToolDeficiencies.map((comp, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-rose-300">{comp.competitorType}</span>
                    <p className="text-slate-400 leading-relaxed">{comp.flaw}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Killer Hook */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>The One Unique Killer Hook ⭐</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                {STRATEGY_DATA.differentiationAndHook.theKillerHook.name}
              </h4>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {STRATEGY_DATA.differentiationAndHook.theKillerHook.description}
              </p>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 text-xs space-y-1">
                <span className="font-bold text-emerald-400 uppercase tracking-wide">
                  Why Students Return Daily:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {STRATEGY_DATA.differentiationAndHook.theKillerHook.whyStudentsReturn}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
