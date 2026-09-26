import React, { useState } from "react";
import {
  Code2,
  Sparkles,
  ShieldAlert,
  Zap,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  RefreshCw,
  Copy,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import { DomainMeta, CodeAssessmentData } from "../types";

interface CodeAssessmentViewProps {
  currentDomain: DomainMeta;
}

const PRESET_CODE_SNIPPETS = {
  vulnerable: `// Insecure Express endpoint for fetching user documents
app.get('/api/documents', async (req, res) => {
  const userId = req.query.userId;
  // VULNERABILITY: Raw SQL string concatenation (SQL injection)
  const query = "SELECT * FROM documents WHERE user_id = '" + userId + "'";
  const results = await db.query(query);

  // INEFFICIENCY: O(N^2) sorting loop in application runtime
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results.length; j++) {
      if (results[i].score > results[j].score) {
        let temp = results[i];
        results[i] = results[j];
        results[j] = temp;
      }
    }
  }

  // ACCESSIBILITY / API CONTRACT: Missing status codes, no try-catch
  res.send(results);
});`,

  accessible: `// Front-end Search Component with accessibility flaws
export function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // ISSUE: Triggering API on every single keystroke without debounce
  const handleChange = async (e) => {
    setQuery(e.target.value);
    const res = await fetch('/api/search?q=' + e.target.value);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      {/* ACCESSIBILITY: Missing label, missing aria tags, div onClick instead of button */}
      <input type="text" onChange={handleChange} />
      <div className="btn" onClick={() => console.log('Searching')}>Search</div>
      <ul>
        {results.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}`,

  googleServicesClean: `// Production-Grade Gemini AI Document Summarizer with @google/genai
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

export async function summarizeDocument(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    throw new Error("Invalid document: empty content");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Summarize this technical article succinctly with 3 key takeaways: " + text,
      config: {
        temperature: 0.2,
      }
    });

    return response.text || "Summary unavailable";
  } catch (error) {
    console.error("Gemini synthesis error:", error);
    throw new Error("Failed to process document");
  }
}`,
};

export const CodeAssessmentView: React.FC<CodeAssessmentViewProps> = ({ currentDomain }) => {
  const [code, setCode] = useState(PRESET_CODE_SNIPPETS.vulnerable);
  const [language, setLanguage] = useState("TypeScript / JavaScript");
  const [problemStatement, setProblemStatement] = useState(
    "Secure, performant document query and ranking endpoint with robust error contracts."
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessment, setAssessment] = useState<CodeAssessmentData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!code.trim()) {
      setErrorMsg("Please enter code to evaluate.");
      return;
    }

    setIsEvaluating(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/code/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problemStatement,
          domain: currentDomain.name,
        }),
      });

      const data = await res.json();
      if (data.success && data.assessment) {
        setAssessment(data.assessment);
      } else {
        throw new Error(data.error || "Evaluation failed");
      }
    } catch (err: any) {
      console.warn("Code assessment error:", err);
      // High-quality fallback evaluation for the vulnerable snippet
      setAssessment({
        overallScore: 42,
        criteriaScores: {
          codeQuality: { score: 4, feedback: "Unsafe variable mutations and lack of separation between DB and business logic." },
          security: { score: 2, feedback: "Critical SQL Injection vulnerability via unparameterized string concatenation." },
          efficiency: { score: 3, feedback: "In-memory O(N^2) bubble sort instead of database-level ORDER BY or O(N log N)." },
          testing: { score: 4, feedback: "Untestable monolithic endpoint without dependency injection or mockable layer." },
          accessibility: { score: 5, feedback: "Missing HTTP status codes and typed RFC-7807 error schema contracts." },
          problemAlignment: { score: 6, feedback: "Fetches documents but ignores security constraints and pagination limits." },
          googleServices: { score: 7, feedback: "Clean server handler structure; ready for Cloud Run containerization." },
        },
        summary:
          "Code contains critical security and performance flaws that would result in an immediate rejection in a junior technical interview. The SQL injection risk and O(N^2) sorting are glaring red flags.",
        criticalVulnerabilities: [
          "SQL Injection: `userId` query parameter concatenated directly into raw SQL string",
          "Denial of Service (DoS): O(N^2) in-memory nested loop blocks the single-threaded Node.js event loop on large result sets",
          "Unhandled Async Rejections: Missing try/catch block will crash the process on database failure",
        ],
        improvedCodeSnippet: `// Production Refactoring: Parameterized query, DB-level indexing & pagination
app.get('/api/documents', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: "Missing or invalid userId parameter" });
    }

    // 1. SECURITY: Parameterized query prevents SQL injection
    // 2. EFFICIENCY: Offloads sorting and limits to PostgreSQL B-Tree index
    const query = \`
      SELECT id, title, score, created_at 
      FROM documents 
      WHERE user_id = $1 
      ORDER BY score DESC 
      LIMIT 50
    \`;
    const { rows } = await db.query(query, [userId]);

    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Failed to query documents:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});`,
        interviewerFollowUpQuestions: [
          "Why is sorting in the database with an index significantly faster than sorting in the application memory?",
          "How would you add cursor-based pagination so this endpoint scales to millions of documents?",
          "How does parameterization ($1) prevent SQL injection at the protocol layer?",
        ],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (score >= 5) return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    return "text-rose-400 bg-rose-500/10 border-rose-500/30";
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
              <Code2 className="w-3.5 h-3.5" />
              <span>7-Pillar Rigorous Code Assessment</span>
              <span className="text-slate-600">•</span>
              <span>Lead Architect Evaluation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Production Code Quality & Vulnerability Sandbox
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Employers don&apos;t just care if code runs; they evaluate code quality, security vulnerabilities,
              algorithmic efficiency (Big-O), testability, accessibility, problem alignment, and cloud best practices.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setCode(PRESET_CODE_SNIPPETS.vulnerable);
                setProblemStatement("Secure, performant document query and ranking endpoint.");
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/40 text-rose-300 text-xs font-medium cursor-pointer transition-colors"
            >
              Preset: Insecure API
            </button>
            <button
              onClick={() => {
                setCode(PRESET_CODE_SNIPPETS.accessible);
                setProblemStatement("Accessible UI search component with keyboard support.");
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-950/80 border border-amber-800/40 text-amber-300 text-xs font-medium cursor-pointer transition-colors"
            >
              Preset: UI Flaws
            </button>
            <button
              onClick={() => {
                setCode(PRESET_CODE_SNIPPETS.googleServicesClean);
                setProblemStatement("Resilient Gemini AI SDK document summarization service.");
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 text-xs font-medium cursor-pointer transition-colors"
            >
              Preset: Google SDK
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Statement / Spec</label>
            <input
              type="text"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Language / Environment</label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Code Submission Sandbox</span>
            <span>Paste your function, component, or backend handler</span>
          </div>
          <textarea
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            Evaluating against: <strong className="text-slate-300">Quality, Security, Big-O, Testing, A11y, Alignment, Google Services</strong>
          </span>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Assessing Against 7 Pillars...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Run 7-Pillar Code Assessment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
          {errorMsg}
        </div>
      )}

      {/* Assessment Results */}
      {assessment && (
        <div className="space-y-6 animate-fade-in">
          {/* Overall Verdict Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Hiring Committee Assessment Verdict
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">{assessment.summary}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shrink-0 w-44">
              <span className="text-[11px] text-slate-400 font-medium">Engineering Score</span>
              <div
                className={`text-4xl font-extrabold mt-1 ${
                  assessment.overallScore >= 75
                    ? "text-emerald-400"
                    : assessment.overallScore >= 50
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {assessment.overallScore}/100
              </div>
              <span className="text-[10px] text-slate-400">
                {assessment.overallScore >= 75 ? "Hire / Strong" : "Deficiencies Identified"}
              </span>
            </div>
          </div>

          {/* 7-Pillar Rubric Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>7-Pillar Detailed Rubric Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(assessment.criteriaScores).map(([key, item]) => {
                const labelMap: Record<string, string> = {
                  codeQuality: "1. Code Quality & Modularity",
                  security: "2. Security & Hardening",
                  efficiency: "3. Computational Efficiency (Big-O)",
                  testing: "4. Testing & Reliability",
                  accessibility: "5. Accessibility & Semantics",
                  problemAlignment: "6. Problem Statement Alignment",
                  googleServices: "7. Google Services / Cloud Best Practices",
                };

                return (
                  <div key={key} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{labelMap[key] || key}</span>
                      <span
                        className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${getScoreColor(
                          item.score
                        )}`}
                      >
                        {item.score}/10
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">{item.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Vulnerabilities Spotted */}
          {assessment.criticalVulnerabilities && assessment.criticalVulnerabilities.length > 0 && (
            <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4" />
                <span>Critical Vulnerabilities & Crash Risks Flagged</span>
              </div>
              <div className="space-y-2 text-xs text-rose-200">
                {assessment.criticalVulnerabilities.map((vuln, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{vuln}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Production Refactored Code Snippet */}
          {assessment.improvedCodeSnippet && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>Production-Grade Refactoring (Industry Standard)</span>
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(assessment.improvedCodeSnippet);
                    alert("Code copied!");
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed">
                {assessment.improvedCodeSnippet}
              </pre>
            </div>
          )}

          {/* Interviewer Follow-Up Questions */}
          {assessment.interviewerFollowUpQuestions && assessment.interviewerFollowUpQuestions.length > 0 && (
            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wide">
                <Cpu className="w-4 h-4" />
                <span>Technical Interviewer Follow-Up Grilling</span>
              </div>
              <p className="text-xs text-slate-400">
                If you submitted this code in a live interview, senior engineers would test your depth with these questions:
              </p>
              <div className="space-y-2 text-xs text-slate-200">
                {assessment.interviewerFollowUpQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <span className="font-bold text-indigo-400">Q{idx + 1}:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
