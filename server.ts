import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Support base64 image uploads for resume analysis
app.use(express.json({ limit: "25mb" }));

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper for safe JSON extraction from Gemini text
function extractJson(text: string): any {
  try {
    const cleaned = text.trim();
    // Check if wrapped in markdown code blocks
    const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse JSON directly:", err);
    // Try to find first [ or {
    const firstBracket = text.indexOf("[");
    const firstBrace = text.indexOf("{");
    let startIdx = -1;
    let endIdx = -1;
    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      startIdx = firstBracket;
      endIdx = text.lastIndexOf("]");
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
      endIdx = text.lastIndexOf("}");
    }
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      try {
        return JSON.parse(text.substring(startIdx, endIdx + 1));
      } catch (e2) {
        console.error("Secondary JSON extraction failed:", e2);
      }
    }
    return null;
  }
}

// 1. Skill Roadmap Generation Endpoint
app.post("/api/roadmap/skill", async (req, res) => {
  try {
    const { domain, currentLevel, timeline, targetRoles, focusAreas } = req.body;
    const prompt = `You are a Principal Engineering & Professional Development Mentor and Career Strategist.
Generate an intensive, personalized Skill Roadmap for a student pursuing the domain: "${domain || "Full Stack Engineering"}".
Current Skill Level: ${currentLevel || "Beginner / Sophomore"}
Target Timeline: ${timeline || "6 Months"}
Target Roles: ${targetRoles || "Entry-Level Specialist / Junior Professional"}
Key Focus Areas: ${focusAreas || "Industry Readiness & Core Mastery"}

Important: Tailor all phases, tools, certifications, and hands-on practical outcomes specifically to the discipline of "${domain}".
Whether the domain is in Software Engineering, Mechanical/Civil/Electrical Engineering, Bio/Life Sciences, Commerce/Finance, Design/Arts, or Applied Sciences, produce an authoritative, production-grade syllabus.

Provide a detailed, practical roadmap strictly in valid JSON format matching this schema:
{
  "domain": "${domain}",
  "summary": "Executive summary of the learning trajectory and core competencies needed",
  "readinessTarget": "Expected job readiness by completion",
  "estimatedWeeklyHours": 15,
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Phase Title (e.g. Foundational Architecture & Core Tooling)",
      "duration": "Weeks 1-4",
      "focus": "Core primary focus",
      "topics": [
        {
          "name": "Topic Name",
          "importance": "Essential",
          "description": "What to master and why industry requires it",
          "handsOnOutcome": "Concrete practical output (e.g. build a simulation, CAD model, financial model, or code pipeline)",
          "resources": [
            { "name": "Resource Title", "type": "Documentation", "url": "https://..." }
          ]
        }
      ]
    }
  ],
  "recommendedCertifications": [
    { "name": "Cert Name", "provider": "Recognized Industry / Academic Provider", "relevance": "Why this signals competence to recruiters" }
  ],
  "industryToolsStack": [
    { "category": "Core Tools / Software / Lab", "tools": ["Tool 1", "Tool 2"] },
    { "category": "Analysis & Simulation / Modeling", "tools": ["Tool 3", "Tool 4"] },
    { "category": "Standards, DevOps or Cloud", "tools": ["Tool 5", "Tool 6"] }
  ],
  "weeklyRoutine": {
    "theoryHours": 4,
    "codingHours": 8,
    "practicalHours": 8,
    "systemDesignHours": 3
  }
}

Return ONLY the raw JSON object. Do not wrap in commentary.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const parsed = extractJson(response.text || "");
    if (!parsed) {
      throw new Error("Unable to parse roadmap response as JSON");
    }
    res.json({ success: true, roadmap: parsed });
  } catch (error: any) {
    console.error("Error generating skill roadmap:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate skill roadmap",
    });
  }
});

// 2. Project Roadmap Generation Endpoint
app.post("/api/roadmap/projects", async (req, res) => {
  try {
    const { domain, currentLevel, techPreferences, interest } = req.body;
    const prompt = `You are a Senior Technical Lead and Hiring Committee Reviewer.
Design a 3-tier Progressive Project Roadmap for a student in "${domain || "Full Stack Engineering"}".
Level: ${currentLevel || "Beginner to Intermediate"}
Tool / Tech Preferences: ${techPreferences || "Industry Standard Software & Tools"}
Interests: ${interest || "Scalable real-world applications and professional deliverables"}

Important: The projects must reflect authentic industry problems in "${domain}".
For software domains, include modern coding/cloud stacks.
For engineering domains (Mechanical, Civil, Electrical, Chemical), include CAD, FEA/CFD simulation, prototyping, and hardware/materials.
For bio/life sciences, include bioinformatics, assay design, bioprocess simulation, and regulatory protocols.
For commerce/business (Finance, Accounting, Marketing), include 3-statement models, DCF valuations, quantitative pipelines, or campaign CRO architectures.
For arts/design (UX/UI, Graphic Design), include design systems, Figma component architectures, and WCAG accessibility specifications.

The roadmap must contain exactly 3 projects representing progression:
1. Tier 1: Beginner / Foundation (Core concepts, clean execution, working MVP)
2. Tier 2: Intermediate / Production-Lite (Integration, data persistence/simulation, testing/validation)
3. Tier 3: Advanced / Industry-Grade (Complex systems, performance optimization, modern cloud/AI integration, rigorous standards)

Return strictly valid JSON:
{
  "domain": "${domain}",
  "projects": [
    {
      "tier": "Tier 1: Foundation",
      "difficulty": "Beginner",
      "title": "Project Title",
      "tagline": "One-line punchy description",
      "duration": "2-3 Weeks",
      "problemStatement": "Realistic industry problem this solves",
      "architecture": "Architecture, system flow, or workflow pipeline overview",
      "techStack": {
        "frontend": ["Primary UI / Design Tool / CAD"],
        "backend": ["Core Engine / Computational / Analytical Tool"],
        "storage": ["Data Storage / Simulation Mesh / Database"],
        "googleServices": ["Google Cloud / Gemini AI / Google Workspace" or "None"],
        "devOps": ["Deployment / Fabrication / Production Workflow"]
      },
      "keyMilestones": [
        "Milestone 1 description",
        "Milestone 2 description",
        "Milestone 3 description"
      ],
      "codeAssessmentCriteria": {
        "codeQuality": "Clean architecture, modular separation, documentation standards",
        "security": "Safety factors, compliance standards, protected parameters",
        "efficiency": "Computational/operational optimization, resource efficiency",
        "testing": "Verification, testing, and validation methodology",
        "accessibility": "Standardized drafting, WCAG accessibility, or clear reporting",
        "googleServices": "Cloud, AI, or modern modern tooling integration"
      },
      "portfolioHook": "How to talk about this project in an interview to stand out from generic tutorial or homework clones",
      "githubReadmeChecklist": [
        "Interactive Live Demo / Render link",
        "System Architecture / Engineering Drawing diagram",
        "Setup / Reproduction instructions",
        "Key Challenges Overcome & Quantitative Metrics"
      ]
    }
  ]
}
Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.25,
      },
    });

    const parsed = extractJson(response.text || "");
    if (!parsed) {
      throw new Error("Unable to parse project roadmap as JSON");
    }
    res.json({ success: true, projects: parsed.projects || parsed });
  } catch (error: any) {
    console.error("Error generating project roadmap:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to generate project roadmap",
    });
  }
});

// 3. Multi-turn AI Chatbot / Career & Technical Mentor
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, domain, mode } = req.body;
    // messages: array of { role: 'user' | 'model', content: string }

    let systemInstruction = `You are Ascent AI Mentor, a high-caliber technical mentor, hiring manager, and engineering career coach for tech students.
Domain context: ${domain || "Software Engineering"}.
Current Mode: ${mode || "general_mentorship"}.

Guidelines:
- Give concrete, actionable engineering advice, avoiding fluff.
- Emphasize real-world industry patterns, clean code, Git practices, testing, and system design.
- If in 'interview_drill' mode: act as a supportive yet rigorous technical interviewer. Ask one challenging domain question or behavioral scenario at a time, critique their response using the STAR/CAR format, and provide a model answer.
- If in 'project_critique' mode: analyze their project ideas for uniqueness, resume impact, and architectural depth, suggesting how to elevate it from a "tutorial clone" into an engineering showcase.
- If in 'resume_help' mode: rewrite bullet points using the Google "Accomplished [X] as measured by [Y], by doing [Z]" standard.
- Keep responses well-structured with bullet points and code/architecture snippets when relevant.`;

    // Format contents for Gemini
    const contents = (messages || []).map((m: any) => ({
      role: m.role === "assistant" ? "model" : m.role,
      parts: [{ text: m.content || m.text || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      reply: response.text || "I am here to guide your engineering journey. What would you like to explore next?",
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "AI Mentor is momentarily busy.",
    });
  }
});

// 4. Real-Time Job Market Intelligence with Google Search Grounding
app.post("/api/market/intelligence", async (req, res) => {
  try {
    const { domain } = req.body;
    const targetDomain = domain || "Full Stack Web Development";

    const prompt = `Use Google Search to analyze the current real-time job market demand, hiring benchmarks, entry-level requirements, and most wanted technologies for: "${targetDomain}".
Find current 2025/2026 hiring trends, in-demand framework shifts, common junior engineer salary ranges, and what hiring managers are filtering for.

Provide a comprehensive, data-backed summary formatted in JSON:
{
  "domain": "${targetDomain}",
  "marketDemandLevel": "Very High" | "High" | "Moderate" | "Evolving",
  "averageEntrySalary": "$85,000 - $115,000 USD (or equivalent benchmark)",
  "topRequiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "fastestGrowingTools": ["Tool 1", "Tool 2", "Tool 3"],
  "decliningOrCommoditizedSkills": ["Legacy skill 1", "Legacy skill 2"],
  "hiringCriteriaShift": "Key shift in how companies evaluate junior candidates right now",
  "topHiringSectors": ["Enterprise SaaS", "AI Infrastructure", "FinTech", "HealthTech"],
  "keyAdviceForStudents": [
    "Advice 1",
    "Advice 2",
    "Advice 3"
  ],
  "searchInsights": "A concise paragraph summarizing live search findings"
}

Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    // Check for search grounding metadata
    const searchMetadata =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = searchMetadata
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web?.title || "Market Source",
        url: chunk.web?.uri,
      }));

    const parsed = extractJson(response.text || "");
    if (!parsed) {
      // Fallback structured data if parsing fails
      res.json({
        success: true,
        data: {
          domain: targetDomain,
          marketDemandLevel: "High",
          averageEntrySalary: "$85,000 - $115,000 USD",
          topRequiredSkills: ["TypeScript", "React", "PostgreSQL", "Cloud Deployment", "API Design"],
          fastestGrowingTools: ["Next.js", "Docker", "AI SDKs (Gemini)", "Tailwind"],
          decliningOrCommoditizedSkills: ["Basic jQuery", "Static HTML/CSS only"],
          hiringCriteriaShift: "Focus shifted from memorizing leetcode to full-stack system architecture, clean Git commits, and shipping production-ready web apps.",
          topHiringSectors: ["Enterprise SaaS", "Cloud Platforms", "AI Startups"],
          keyAdviceForStudents: [
            "Build full-stack applications with persistent databases and live hosting",
            "Showcase thorough automated testing and CI/CD pipelines",
            "Articulate architectural decisions and trade-offs in GitHub READMEs",
          ],
          searchInsights: response.text || "Strong continued demand for engineers with full-stack and cloud competencies.",
          sources: webSources,
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        ...parsed,
        sources: webSources,
      },
    });
  } catch (error: any) {
    console.error("Market intelligence error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to fetch market intelligence",
    });
  }
});

// 5. Resume & Portfolio Readiness Auditor (Text & Multimodal Image Scanner)
app.post("/api/resume/analyze", async (req, res) => {
  try {
    const { resumeText, imageBase64, mimeType, targetDomain } = req.body;

    const parts: any[] = [];
    if (imageBase64) {
      // Clean base64 prefix if present
      const cleanData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
      parts.push({
        inlineData: {
          mimeType: mimeType || "image/png",
          data: cleanData,
        },
      });
    }

    const evaluationPrompt = `You are a Principal Technical Recruiter and Engineering Manager reviewing a student's resume for a junior role in "${targetDomain || "Software Engineering"}".
Analyze this resume for:
1. ATS Formatting & Scannability
2. Strong Action Verbs & Quantified Results (XYZ formula: Accomplished [X] as measured by [Y] by doing [Z])
3. Technical Stack Alignment and Depth (are skills backed up in projects?)
4. Project Articulation & Engineering Rigor (vs. generic classroom homework)
5. GitHub & Online Presence visibility
6. Red Flags / Buzzword fluff to eliminate

${resumeText ? `RESUME TEXT:\n${resumeText}\n` : ""}

Evaluate rigorously and return strictly JSON:
{
  "overallScore": 76,
  "atsReadinessScore": 82,
  "impactScore": 68,
  "technicalDepthScore": 75,
  "grade": "B+",
  "summary": "Concise executive review summary",
  "keyStrengths": [
    "Strength 1",
    "Strength 2"
  ],
  "criticalWeaknesses": [
    "Weakness 1 with actionable fix",
    "Weakness 2 with actionable fix"
  ],
  "bulletPointRewrites": [
    {
      "original": "Weak bullet point found or identified",
      "improved": "Optimized bullet point with metrics and technical action verb",
      "reason": "Why this change impresses recruiters"
    }
  ],
  "missingHighValueKeywords": [
    "Keyword 1",
    "Keyword 2",
    "Keyword 3"
  ],
  "portfolioAdvice": "Specific steps to optimize their GitHub and live demo presentations"
}

Return ONLY valid JSON.`;

    parts.push({ text: evaluationPrompt });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts },
      config: {
        temperature: 0.2,
      },
    });

    const parsed = extractJson(response.text || "");
    if (!parsed) {
      throw new Error("Unable to parse resume evaluation response as JSON");
    }

    res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error("Resume analysis error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to analyze resume",
    });
  }
});

// 6. Interactive Code & Architecture Assessment (Evaluating the 7 Mandatory Criteria)
app.post("/api/code/assess", async (req, res) => {
  try {
    const { code, language, problemStatement, domain } = req.body;

    const prompt = `You are a Lead Software Architect conducting a rigorous code assessment of a student's submission.
Domain: ${domain || "Software Engineering"}
Language: ${language || "TypeScript"}
Problem Statement: ${problemStatement || "General implementation assessment"}

Evaluate the following code strictly against all 7 Engineering Criteria:
1. Code Quality & Modularity (naming, structure, readability, clean code principles)
2. Security (injection vulnerabilities, sanitization, secrets handling, safe operations)
3. Efficiency (time & space Big-O complexity, unnecessary allocations, responsiveness)
4. Testing & Reliability (unit testability, edge cases, error handling, defensive programming)
5. Accessibility & Semantics (for UI/web code: semantic elements, ARIA, keyboard support, WCAG; for backend: robust status codes, clear API error contracts)
6. Problem Statement Alignment (solves the exact problem without over-engineering or skipping requirements)
7. Google Services / Cloud Best Practices (proper SDK instantiation, environment secrets, connection reuse, resilient handling)

CODE SUBMISSION:
\`\`\`
${code || "// No code provided"}
\`\`\`

Return strictly valid JSON:
{
  "overallScore": 82,
  "criteriaScores": {
    "codeQuality": { "score": 8, "feedback": "Specific feedback..." },
    "security": { "score": 9, "feedback": "Specific feedback..." },
    "efficiency": { "score": 7, "feedback": "Time complexity analysis..." },
    "testing": { "score": 6, "feedback": "Testing readiness..." },
    "accessibility": { "score": 8, "feedback": "Accessibility / contract feedback..." },
    "problemAlignment": { "score": 9, "feedback": "Alignment feedback..." },
    "googleServices": { "score": 8, "feedback": "SDK and cloud practices feedback..." }
  },
  "summary": "Executive verdict",
  "criticalVulnerabilities": [
    "Any security or fatal crash risks"
  ],
  "improvedCodeSnippet": "Refactored, production-quality version of the key function or block with comments highlighting fixes",
  "interviewerFollowUpQuestions": [
    "Question 1 an interviewer would ask about this code",
    "Question 2 an interviewer would ask about this code"
  ]
}

Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const parsed = extractJson(response.text || "");
    if (!parsed) {
      throw new Error("Unable to parse code evaluation response as JSON");
    }

    res.json({ success: true, assessment: parsed });
  } catch (error: any) {
    console.error("Code assessment error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Failed to evaluate code",
    });
  }
});

// Vite Middleware Integration for Development / Static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
