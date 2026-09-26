export interface StrategySection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export const STRATEGY_DATA = {
  problemValidation: [
    {
      problem: "1. Resume & Professional Presentation",
      whyItMatters:
        "Students write academic resumes with passive course descriptions ('Took CS 101'), non-standard formatting that breaks Applicant Tracking Systems (ATS), and vague claims without quantifiable metrics.",
      howItBlocksSuccess:
        "75%+ of junior applications are automatically rejected before a human recruiter ever sees them. Students never learn what caused the rejection and mistakenly assume their technical ability is deficient.",
      platformSolution:
        "Multimodal AI Resume Auditor: Real-time ATS parser and visual image scanner that grades resumes on the XYZ metric standard ('Accomplished [X] measured by [Y] by doing [Z]') with line-by-line rewrites.",
    },
    {
      problem: "2. Market Awareness Gap",
      whyItMatters:
        "University curricula lag 3-5 years behind industry tools. Students spend months learning deprecated frameworks or generic syntax without knowing what modern hiring managers actually require right now.",
      howItBlocksSuccess:
        "Students build obsolete skills and apply for roles with outdated tech stacks, leading to silence from recruiters and misalignment with current job descriptions.",
      platformSolution:
        "Real-Time Market Intelligence Radar: Grounded in live Google Search data, extracting current hiring criteria, framework popularity shifts, entry salary benchmarks, and in-demand skills by domain.",
    },
    {
      problem: "3. Domain Clarity",
      whyItMatters:
        "Computer science covers too much ground (web, AI, cloud, systems, security, mobile). Students suffer from analysis paralysis or attempt to learn everything superficially without achieving depth.",
      howItBlocksSuccess:
        "'Jack-of-all-trades, master of none' candidates get passed over for candidates with clear domain focus and targeted competency projects.",
      platformSolution:
        "Interactive Domain Architecture Studio: Provides transparent domain roadmaps, career trajectories, day-in-the-life realities, and tailored skill benchmarks.",
    },
    {
      problem: "4. Technical Preparation",
      whyItMatters:
        "Academic courses teach algorithms and syntax in isolation, ignoring production tooling like Docker, CI/CD, database indexing, caching, and cloud deployments.",
      howItBlocksSuccess:
        "Graduates can invert a binary tree on a whiteboard but freeze when asked how to deploy a containerized service, structure an ACID transaction, or optimize slow database queries.",
      platformSolution:
        "Personalized Skill Roadmap: AI-generated week-by-week curriculum with hands-on deliverables, industry tool stacks, curated documentation, and official certification paths.",
    },
    {
      problem: "5. Interview Readiness",
      whyItMatters:
        "Interviewing is a separate skill from programming. Students struggle to communicate their thought process, explain technical trade-offs, and structure behavioral responses.",
      howItBlocksSuccess:
        "Students fail live coding rounds or project walkthroughs despite knowing the concepts because they cannot clearly articulate design decisions under pressure.",
      platformSolution:
        "Interactive AI Technical Mentor & Mock Interviewer: Multi-turn simulation with live technical questions, architecture defense, and real-time constructive feedback.",
    },
    {
      problem: "6. Portfolio & Visibility",
      whyItMatters:
        "Portfolios are cluttered with identical generic tutorial clones (to-do lists, weather apps, simple calculators) with empty GitHub READMEs and no live demos.",
      howItBlocksSuccess:
        "Recruiters spend an average of 6 seconds reviewing a GitHub profile. Generic clones signal lack of originality, initiative, and real engineering competency.",
      platformSolution:
        "Tiered Project Roadmap Builder & GitHub README Optimizer: Recommends progressive, production-grade projects with system architectures, unit test requirements, and README checklists.",
    },
    {
      problem: "7. Isolation",
      whyItMatters:
        "Students prepare in a vacuum without benchmarks or visibility into what successful peers in their domain built to secure offers at top companies.",
      howItBlocksSuccess:
        "Without peer models, students set unrealistic goals, experience imposter syndrome, or underestimate the quality required for competitive tech roles.",
      platformSolution:
        "Peer Journey Discovery Hub: Authentic profiles of successful junior hires showcasing their project architectures, GitHub repos, learning timelines, and key breakthroughs.",
    },
  ],

  solutionMappingMatrix: [
    {
      painPoint: "Resume & Presentation",
      feature: "Multimodal ATS Resume Auditor",
      coreMechanism: "Gemini vision & text parsing against XYZ formula + ATS layout parsing",
      impactMetric: "+45% increase in recruiter callback rates",
    },
    {
      painPoint: "Market Awareness Gap",
      feature: "Search-Grounded Market Radar",
      coreMechanism: "Gemini 3.5 Flash with Google Search Tool scanning live job boards & reports",
      impactMetric: "Zero time wasted on obsolete or deprecated tools",
    },
    {
      painPoint: "Domain Clarity",
      feature: "Domain Explorer & Career Matrix",
      coreMechanism: "Interactive domain cards, salary ranges, required competencies, role taxonomy",
      impactMetric: "Clear 6-month specialization decision within first session",
    },
    {
      painPoint: "Technical Preparation",
      feature: "Personalized Skill Roadmap Studio",
      coreMechanism: "Adaptive curriculum generator with weekly milestones, study hours, and resource links",
      impactMetric: "Structured, self-paced progress tracking with verified outcomes",
    },
    {
      painPoint: "Interview Readiness",
      feature: "AI Interactive Technical Mentor",
      coreMechanism: "Multi-turn role-based conversational coach with system design and drill modes",
      impactMetric: "Realistic verbalization practice before facing human hiring committees",
    },
    {
      painPoint: "Portfolio & Visibility",
      feature: "3-Tier Progressive Project Roadmap",
      coreMechanism: "Architectural blueprints, milestone checklists, and GitHub README generation",
      impactMetric: "Standout portfolio projects that recruiters actually inspect",
    },
    {
      painPoint: "Isolation",
      feature: "Peer Journey & Showcase Explorer",
      coreMechanism: "Curated student trajectory timelines, repository audits, and interview tips",
      impactMetric: "Proven peer blueprints to model success on",
    },
  ],

  mvpSpecification: {
    rationale:
      "A small team must avoid feature bloat and focus on the core value loop: Assess Skills -> Generate Path -> Build Proof -> Practice & Ship. Prioritizing AI-powered interactive elements creates the strongest retention and immediate 'aha!' moment.",
    coreFeatures: [
      {
        number: 1,
        name: "Personalized Skill Roadmap Generator (Core Hook Part A)",
        feasibility: "High (Server-side Gemini 3.5 Flash with structured JSON output)",
        valueProp: "Replaces chaotic Google searches with a bespoke, week-by-week technical curriculum tailored to student background.",
        keyComponents: [
          "Interactive input form (domain, skill baseline, timeline, hours/week)",
          "Structured JSON response parsed into interactive visual phases",
          "Interactive checklist with local completion persistence",
          "One-click export to PDF / study calendar",
        ],
      },
      {
        number: 2,
        name: "3-Tier Progressive Project Architect (Core Hook Part B)",
        feasibility: "High (Curated prompt templates with domain-specific architecture rubrics)",
        valueProp: "Solves the 'tutorial hell' crisis by giving students real engineering problem statements with architecture diagrams and test criteria.",
        keyComponents: [
          "Tier 1 (Foundation), Tier 2 (Production-Lite), Tier 3 (Industry-Grade) project cards",
          "Architecture and tech stack breakdown",
          "Code assessment criteria and interview talking points",
          "Automated GitHub README markdown generator",
        ],
      },
      {
        number: 3,
        name: "AI Interactive Technical Mentor Chatbot (The Conversational Bridge)",
        feasibility: "High (Multi-turn Gemini chat with specialized system instructions)",
        valueProp: "Allows students to interrogate their roadmap, drill technical interview questions, and get instant project feedback in real time.",
        keyComponents: [
          "Multi-turn conversational memory with domain grounding",
          "Specialized modes: Mock Interviewer, Architecture Reviewer, Resume Bullet Optimizer",
          "Preset drill chips for rapid interaction without prompt fatigue",
        ],
      },
      {
        number: 4,
        name: "Real-Time Job Market Intelligence Radar",
        feasibility: "High (Gemini 3.5 Flash with Google Search Grounding)",
        valueProp: "Instills immediate confidence that the student's roadmap aligns with verified, real-time hiring demands in 2025/2026.",
        keyComponents: [
          "Live search-grounded market demand score",
          "Top 5 required skills vs. declining skills",
          "Verified web citation links to industry reports",
        ],
      },
      {
        number: 5,
        name: "ATS Resume & Code Assessment Studio",
        feasibility: "Medium-High (Gemini multimodal vision and code analysis prompt engineering)",
        valueProp: "Provides instant feedback on the two primary artifacts employers judge: the resume and the code repository.",
        keyComponents: [
          "Multimodal image/screenshot and text resume audit with STAR rewrites",
          "7-pillar code evaluation with security, efficiency, accessibility, and clean code scoring",
        ],
      },
    ],
  },

  userFlowSteps: [
    {
      step: 1,
      title: "Onboarding & Domain Diagnostic",
      action: "Student arrives, selects or diagnoses their target specialization (e.g., Full Stack vs. AI/ML), enters graduation year and weekly commitment.",
      timeToValue: "Under 60 seconds",
    },
    {
      step: 2,
      title: "Personalized Roadmap Generation",
      action: "Gemini synthesizes a custom, 4-phase curriculum with hands-on outcomes, curated docs, and recommended industry certifications.",
      timeToValue: "Instant visualization with interactive progress toggles",
    },
    {
      step: 3,
      title: "Project Selection & Architecture Exploration",
      action: "Student unlocks 3-tier progressive projects, inspects system architecture diagrams, and copies the GitHub README blueprint.",
      timeToValue: "Immediate engineering direction",
    },
    {
      step: 4,
      title: "Active Learning & AI Chatbot Mentorship",
      action: "As the student builds, they converse with the AI Mentor to debug architecture decisions, practice interview drills, and refine code.",
      timeToValue: "Continuous on-demand guidance",
    },
    {
      step: 5,
      title: "Code Assessment & Benchmark Review",
      action: "Student submits code snippets or PR links to the 7-pillar assessment engine to verify security, efficiency, testing, and accessibility.",
      timeToValue: "Objective rubric feedback before human review",
    },
    {
      step: 6,
      title: "Resume & Portfolio Optimization",
      action: "Student uploads their resume for multimodal ATS scoring, applies STAR bullet rewrites, and aligns their LinkedIn & GitHub profile.",
      timeToValue: "Production-ready application package",
    },
    {
      step: 7,
      title: "Peer Benchmarking & Career Launch",
      action: "Student compares their portfolio against successful alumni profiles in their domain and applies with high confidence.",
      timeToValue: "Offer readiness & continuous career growth",
    },
  ],

  aiSpecification: {
    skillRoadmap: {
      inputs: [
        "Domain interest (e.g. Full Stack, AI/ML, Cloud/DevOps)",
        "Current skill baseline (Beginner, Intermediate, CS Undergrad, Career Switcher)",
        "Target timeline (3 Months, 6 Months, 1 Year)",
        "Available weekly hours (e.g., 10-20 hrs/week)",
        "Target job roles & dream companies (e.g. Stripe, Google, Startups)",
      ],
      processing: {
        model: "gemini-3.5-flash with structured JSON response schema",
        systemInstruction:
          "Senior Engineering Curriculum Lead applying adult-learning pedagogy, progressive overload, and industry-standard competency matrices.",
        constraints:
          "Strict JSON schema enforcement; mandatory hands-on deliverables for every topic; prioritizes modern LTS tools over outdated tutorial conventions.",
      },
      outputStructure: [
        "Executive Summary & Target Readiness Profile",
        "Chronological Phases (Foundations -> Backend/APIs -> Testing & CI/CD -> Distributed Systems)",
        "Topic Cards with Importance Badges (Essential, Recommended, Bonus)",
        "Official Certifications with hiring signal analysis",
        "Modern Industry Tool Stack breakdown",
        "Weekly study routine hours (Theory vs. Coding vs. System Design)",
      ],
      chatbotExperience:
        "Students can click any topic to ask: 'Explain how to set up this environment step-by-step', 'What is the most common bug students run into here?', or 'Give me a 30-minute mini-challenge to test my grasp'.",
    },
    projectRoadmap: {
      inputs: [
        "Specialization domain",
        "Current engineering level",
        "Preferred technology stack (e.g. TypeScript, React, PostgreSQL, Cloud Run)",
        "Personal interests (e.g. fintech, health, dev tools, gaming)",
      ],
      processing: {
        model: "gemini-3.5-flash",
        systemInstruction:
          "Hiring Committee Chair and Senior Architect designing authentic, non-trivial engineering problems that stand out from tutorial clones.",
        constraints:
          "Must avoid generic to-do/weather apps; must define real-world architecture, data flow, edge-case failure modes, and interview defense hooks.",
      },
      outputStructure: [
        "Tier 1 (Foundation): Keyboard accessibility, clean state, client-side indexing",
        "Tier 2 (Production-Lite): Background cron jobs, relational DB indexing, SSRF/auth security",
        "Tier 3 (Industry-Grade): Distributed RAG, vector embeddings, caching, CI/CD, IaC",
        "For each project: Architecture overview, Milestones, Code assessment criteria, and Interview Talking Points",
      ],
      chatbotExperience:
        "Students can chat with the AI to refine the project: 'How do I scale this to 10k users?', 'Help me write the SQL migration script for this schema', or 'Roleplay a senior interviewer grilling me on why I chose PostgreSQL over MongoDB'.",
    },
  },

  codeAssessmentRubric: [
    {
      criterion: "1. Code Quality & Modularity",
      description: "Clean code principles, strict typing (no 'any'), descriptive naming, Single Responsibility Principle (SRP), and DRY practices.",
      platformEnforcement:
        "AST inspection and Gemini semantic code evaluation checking for function cyclomatic complexity, modular separation, and documentation clarity.",
    },
    {
      criterion: "2. Security & Hardening",
      description: "Prevention of OWASP Top 10 risks: SQL injection, XSS, SSRF, unprotected API secrets, hardcoded credentials, and missing input sanitization.",
      platformEnforcement:
        "Automated pattern regex scanners combined with Gemini security audit identifying tainted data flows, missing CSRF tokens, and insecure environment handling.",
    },
    {
      criterion: "3. Computational & Memory Efficiency",
      description: "Big-O algorithmic time and space complexity, memory leak prevention, database N+1 query avoidance, and client-side re-render bottlenecks.",
      platformEnforcement:
        "Big-O complexity analysis estimating operational bounds (e.g., flagging O(n^2) nested loops when O(n) hash map is possible) and redundant render cascades.",
    },
    {
      criterion: "4. Testing & Reliability",
      description: "Unit test coverage, boundary/edge case testing, mocking external network dependencies, defensive programming, and graceful error handling.",
      platformEnforcement:
        "Evaluates whether critical business logic is decoupled from side effects to allow easy unit testing; generates mock test specifications using Vitest/Jest.",
    },
    {
      criterion: "5. Accessibility & Semantic Standards",
      description: "WCAG 2.1 AA compliance: semantic HTML elements, keyboard navigation, visible focus rings, color contrast, and ARIA live regions.",
      platformEnforcement:
        "Checks for accessible interactive patterns (e.g. avoiding <div> buttons, ensuring proper alt text, tabIndex order, and screen reader announcements).",
    },
    {
      criterion: "6. Problem Statement Alignment",
      description: "Does the solution directly address user requirements without unnecessary over-engineering, gold-plating, or missing core edge cases?",
      platformEnforcement:
        "Semantic matching against original requirement spec; scores alignment ratio and flags scope creep or missing constraints.",
    },
    {
      criterion: "7. Google Services & Cloud Best Practices",
      description: "Proper SDK instantiation (e.g. @google/genai with official User-Agent telemetry), secure server-side API key handling, and resilient connection pooling.",
      platformEnforcement:
        "Enforces server-only API key isolation, prevents client-side key leaks, and checks for optimal streaming and error-boundary configurations.",
    },
  ],

  technicalChallenges: [
    {
      challenge: "1. Hallucination vs. Real-Time Industry Accuracy",
      whyHard:
        "LLMs can generate plausible-sounding but outdated or nonexistent library methods, APIs, and hiring requirements.",
      mitigation:
        "Integrate Gemini with Google Search Grounding to anchor market recommendations in live web data, combined with strict JSON response schemas and curated base prompt rules.",
    },
    {
      challenge: "2. Cost & Latency of Interactive AI Workflows",
      whyHard:
        "Streaming multi-turn chats, resume image parsing, and code assessments across hundreds of students can become costly and introduce latency.",
      mitigation:
        "Use multi-model tiering: `gemini-3.1-flash-lite` for high-throughput chat drills, `gemini-3.5-flash` with caching for roadmaps and search grounding, and server-side response caching.",
    },
    {
      challenge: "3. Multimodal Resume Variability",
      whyHard:
        "Resumes come in wild formatting varieties (multi-column tables, infographics, PDFs converted to PNGs) that confuse standard OCR parsers.",
      mitigation:
        "Leverage Gemini's native multimodal vision capabilities directly on document screenshots/images rather than brittle regex text extraction alone.",
    },
    {
      challenge: "4. Student Engagement & Drop-off (The 'Blank Page' Syndrome)",
      whyHard:
        "Students get overwhelmed by massive 60-page roadmaps and quit after week 2.",
      mitigation:
        "Chunk roadmaps into bite-sized weekly interactive checkboxes with instant progress percentages, streak tracking, and interactive AI mini-quizzes.",
    },
  ],

  differentiationAndHook: {
    existingToolDeficiencies: [
      {
        competitorType: "Generic Resume Builders (e.g., Canva, Novoresume)",
        flaw: "Focus solely on visual cosmetics; produce two-column templates that get rejected by corporate ATS parsers; provide zero engineering-specific feedback.",
      },
      {
        competitorType: "LeetCode & Generic Code Grinders",
        flaw: "Focus exclusively on isolated puzzle algorithms; teach zero full-stack engineering, system design, Git collaboration, or production deployment.",
      },
      {
        competitorType: "Static Roadmaps (e.g., roadmap.sh)",
        flaw: "Massive static flowcharts that cause decision paralysis; offer no personalization, no feedback loops, no project specs, and no interactive mentorship.",
      },
    ],
    theKillerHook: {
      name: "The AI Career Twin & Interactive Project Co-Pilot",
      description:
        "A unified, living intelligence layer powered by Gemini that bridges the student's current skill state with live job market signals. Unlike static tools, the platform acts as an interactive technical co-founder: it generates a tailored roadmap, scaffolds the GitHub project repository, audits code commits against 7 engineering rubrics, and conducts mock interviews on the exact architecture the student built.",
      whyStudentsReturn:
        "Every line of code written and every milestone checked off dynamically updates the student's Readiness Score, unlocks the next architecture tier, and generates verified bullet points ready for their resume. It is an all-in-one career flight simulator.",
    },
  },
};
