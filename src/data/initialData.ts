import {
  DomainMeta,
  SkillRoadmapData,
  ProjectTierItem,
  MarketIntelligenceData,
  PeerProfile,
} from "../types";

export const DOMAINS: DomainMeta[] = [
  // --- Computer Science & Tech ---
  {
    id: "fullstack",
    name: "Full Stack & Web Engineering",
    category: "Computer Science & Tech",
    tagline: "End-to-end scalable web applications, distributed APIs, and cloud services",
    demandLevel: "Very High",
    avgSalary: "$92,000 - $125,000",
    keySkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Cloud Run", "Docker", "REST/GraphQL"],
    icon: "Layers",
    careerPaths: ["Full Stack Engineer", "Frontend Architect", "Backend Systems Engineer"],
  },
  {
    id: "ai_ml",
    name: "AI & Machine Learning",
    category: "Computer Science & Tech",
    tagline: "LLM agents, retrieval pipelines (RAG), deep learning, and production AI",
    demandLevel: "Very High",
    avgSalary: "$105,000 - $145,000",
    keySkills: ["Python", "Gemini SDK", "PyTorch", "Vector DBs", "LangChain", "FastAPI", "MLOps"],
    icon: "BrainCircuit",
    careerPaths: ["Machine Learning Engineer", "AI Solutions Architect", "RAG Systems Specialist"],
  },
  {
    id: "cloud_devops",
    name: "Cloud & DevOps Engineering",
    category: "Computer Science & Tech",
    tagline: "Containerization, infrastructure as code, CI/CD pipelines, and cloud reliability",
    demandLevel: "High",
    avgSalary: "$98,000 - $130,000",
    keySkills: ["Docker", "Kubernetes", "Terraform", "Google Cloud / AWS", "GitHub Actions", "Prometheus"],
    icon: "CloudCog",
    careerPaths: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Platform Engineer"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & AppSec",
    category: "Computer Science & Tech",
    tagline: "Threat modeling, penetration testing, secure coding, and cloud security postures",
    demandLevel: "High",
    avgSalary: "$95,000 - $132,000",
    keySkills: ["OWASP Top 10", "Network Security", "Cryptography", "SOC Tools", "Python/Bash", "Linux"],
    icon: "ShieldCheck",
    careerPaths: ["Security Analyst", "Penetration Tester", "Application Security Engineer"],
  },
  {
    id: "data_science",
    name: "Data Science & Analytics",
    category: "Computer Science & Tech",
    tagline: "Predictive modeling, statistical inference, feature engineering, and executive dashboards",
    demandLevel: "Very High",
    avgSalary: "$96,000 - $130,000",
    keySkills: ["Python", "SQL Mastery", "Pandas", "Scikit-Learn", "Tableau/Looker", "BigQuery"],
    icon: "Database",
    careerPaths: ["Data Scientist", "Analytics Engineer", "Quantitative Research Analyst"],
  },

  // --- Core Engineering ---
  {
    id: "mechanical_eng",
    name: "Mechanical Engineering",
    category: "Core Engineering",
    tagline: "Thermal-fluid systems, CAD modeling, finite element analysis (FEA), and robotics design",
    demandLevel: "High",
    avgSalary: "$82,000 - $112,000",
    keySkills: ["SolidWorks / Fusion 360", "ANSYS FEA", "MATLAB / Python", "Thermodynamics", "GD&T", "DFM/DFA"],
    icon: "Cpu",
    careerPaths: ["Mechanical Design Engineer", "Thermal Systems Engineer", "Robotics Hardware Specialist"],
  },
  {
    id: "civil_eng",
    name: "Civil Engineering",
    category: "Core Engineering",
    tagline: "Structural design, geotechnical analysis, transportation infrastructure, and sustainable BIM",
    demandLevel: "High",
    avgSalary: "$78,000 - $106,000",
    keySkills: ["AutoCAD / Civil 3D", "Revit BIM", "STAAD.Pro / ETABS", "Hydrology Modeling", "Structural Codes", "GIS"],
    icon: "Building2",
    careerPaths: ["Structural Engineer", "Transportation Planner", "Geotechnical Engineer", "Site Construction Lead"],
  },
  {
    id: "electrical_eng",
    name: "Electrical Engineering",
    category: "Core Engineering",
    tagline: "Embedded systems, PCB design, power electronics, signal processing, and microcontrollers",
    demandLevel: "Very High",
    avgSalary: "$88,000 - $120,000",
    keySkills: ["Altium / KiCad", "Embedded C/C++", "MATLAB / Simulink", "FPGA / Verilog", "Oscilloscopes", "SPICE"],
    icon: "Zap",
    careerPaths: ["Embedded Hardware Engineer", "Power Electronics Engineer", "RF / Signal Processing Specialist"],
  },
  {
    id: "chemical_eng",
    name: "Chemical Engineering",
    category: "Core Engineering",
    tagline: "Process optimization, thermodynamics, reactors, Aspen Plus simulation, and plant safety",
    demandLevel: "High",
    avgSalary: "$84,000 - $115,000",
    keySkills: ["Aspen Plus / HYSYS", "Process Flow (PFD/P&ID)", "Reaction Kinetics", "Separation Processes", "Six Sigma"],
    icon: "Flame",
    careerPaths: ["Process Engineer", "Refinery / Petrochemical Specialist", "Safety & Environmental Manager"],
  },

  // --- Bio & Life Sciences ---
  {
    id: "biotechnology",
    name: "Biotechnology",
    category: "Bio & Life Sciences",
    tagline: "Recombinant DNA, bioprocessing, CRISPR gene editing, and molecular biology assays",
    demandLevel: "High",
    avgSalary: "$80,000 - $114,000",
    keySkills: ["CRISPR / Cloning", "Bioreactor Operation", "PCR / Gel Electrophoresis", "Bioinformatics (NCBI/BLAST)", "GLP/GMP"],
    icon: "Dna",
    careerPaths: ["Bioprocess Scientist", "R&D Geneticist", "Quality Control Bio-Analyst"],
  },
  {
    id: "microbiology",
    name: "Microbiology",
    category: "Bio & Life Sciences",
    tagline: "Pathogen identification, antimicrobial resistance, culture techniques, and clinical diagnostics",
    demandLevel: "Growing",
    avgSalary: "$72,000 - $98,000",
    keySkills: ["Aseptic Culture", "Staining / Microscopy", "ELISA / Flow Cytometry", "Spectrophotometry", "Biosafety Level (BSL) Protocols"],
    icon: "Bug",
    careerPaths: ["Clinical Microbiologist", "Food Safety Specialist", "Infectious Disease Researcher"],
  },
  {
    id: "biomedical_eng",
    name: "Biomedical Engineering",
    category: "Bio & Life Sciences",
    tagline: "Medical devices, biomechanics, physiological signal monitoring, and FDA regulatory standards",
    demandLevel: "Very High",
    avgSalary: "$85,000 - $118,000",
    keySkills: ["Biomedical Sensors", "Bio-CAD (SolidWorks)", "LabVIEW / MATLAB", "Biomaterials", "ISO 13485 / FDA 510(k)"],
    icon: "HeartPulse",
    careerPaths: ["Medical Device Engineer", "Clinical Systems Engineer", "Biomechanics Specialist"],
  },
  {
    id: "pharmaceutical_sci",
    name: "Pharmaceutical Sciences",
    category: "Bio & Life Sciences",
    tagline: "Drug formulation, pharmacokinetics (PK/PD), HPLC chromatography, and clinical trials",
    demandLevel: "High",
    avgSalary: "$84,000 - $116,000",
    keySkills: ["HPLC / Mass Spectrometry", "Formulation Science", "Pharmacokinetics", "ICH / FDA Regulations", "Dissolution Testing"],
    icon: "Pill",
    careerPaths: ["Formulation Scientist", "Analytical Chemist", "Regulatory Affairs Associate"],
  },

  // --- Commerce & Business ---
  {
    id: "accounting",
    name: "Accounting",
    category: "Commerce & Business",
    tagline: "Financial reporting, forensic audit, GAAP/IFRS standards, tax compliance, and ERP systems",
    demandLevel: "High",
    avgSalary: "$74,000 - $102,000",
    keySkills: ["GAAP / IFRS", "Advanced Excel (VBA/PowerQuery)", "SAP / NetSuite ERP", "Financial Auditing", "Tax Compliance"],
    icon: "Calculator",
    careerPaths: ["Staff Accountant", "Auditor (Big 4 / Corporate)", "Financial Controller Associate"],
  },
  {
    id: "finance",
    name: "Finance & Quantitative Analysis",
    category: "Commerce & Business",
    tagline: "Financial modeling, DCF valuation, portfolio management, risk analytics, and M&A analysis",
    demandLevel: "Very High",
    avgSalary: "$90,000 - $135,000",
    keySkills: ["3-Statement Modeling", "DCF & LBO Valuation", "Bloomberg Terminal / FactSet", "Python / SQL for Finance", "Capital Budgeting"],
    icon: "TrendingUp",
    careerPaths: ["Financial Analyst", "Investment Banking Analyst", "Portfolio Associate", "Corporate Finance Lead"],
  },
  {
    id: "marketing",
    name: "Marketing & Growth Strategy",
    category: "Commerce & Business",
    tagline: "Performance marketing, conversion rate optimization (CRO), brand positioning, and SEO",
    demandLevel: "High",
    avgSalary: "$70,000 - $98,000",
    keySkills: ["Google Analytics 4", "SEO / SEM Strategies", "A/B Testing & Funnels", "HubSpot / Marketo", "Content Strategy"],
    icon: "Target",
    careerPaths: ["Growth Marketer", "Digital Marketing Specialist", "Product Marketing Associate"],
  },
  {
    id: "business_analytics",
    name: "Business Analytics",
    category: "Commerce & Business",
    tagline: "KPI dashboards, business intelligence, predictive metrics, customer segmentation, and storytelling",
    demandLevel: "Very High",
    avgSalary: "$85,000 - $118,000",
    keySkills: ["SQL for BI", "Power BI / Tableau", "Python / R Stats", "A/B Hypothesis Testing", "Cohort & Churn Analysis"],
    icon: "BarChart3",
    careerPaths: ["Business Intelligence Analyst", "Strategy & Operations Analyst", "Commercial Insights Manager"],
  },
  {
    id: "supply_chain",
    name: "Supply Chain Management",
    category: "Commerce & Business",
    tagline: "Logistics optimization, demand forecasting, procurement, inventory theory, and ERP operations",
    demandLevel: "High",
    avgSalary: "$76,000 - $108,000",
    keySkills: ["SAP SCM / Oracle", "Demand Forecasting", "Procurement & Negotiation", "Inventory Control (EOQ)", "Lean / Six Sigma"],
    icon: "Truck",
    careerPaths: ["Supply Chain Analyst", "Logistics Operations Lead", "Procurement Specialist"],
  },

  // --- Arts, Design & Media ---
  {
    id: "graphic_design",
    name: "Graphic Design",
    category: "Arts, Design & Media",
    tagline: "Visual brand identity, typography, editorial layout, packaging design, and vector illustration",
    demandLevel: "Growing",
    avgSalary: "$62,000 - $88,000",
    keySkills: ["Adobe Illustrator", "Photoshop", "InDesign", "Color Theory & Typography", "Brand Guidelines", "Print Production"],
    icon: "Palette",
    careerPaths: ["Brand Identity Designer", "Visual Graphic Artist", "Packaging Specialist"],
  },
  {
    id: "ux_ui_design",
    name: "UX/UI Design & Product Design",
    category: "Arts, Design & Media",
    tagline: "User research, design systems, interactive Figma prototypes, accessibility, and user journeys",
    demandLevel: "Very High",
    avgSalary: "$85,000 - $120,000",
    keySkills: ["Figma Mastery", "Design Systems (Tokens)", "User Testing & Wireframing", "WCAG Accessibility", "Prototyping"],
    icon: "Framer",
    careerPaths: ["Product Designer", "UX Researcher", "UI / Design Systems Architect"],
  },
  {
    id: "creative_writing",
    name: "Creative Writing & Technical Storytelling",
    category: "Arts, Design & Media",
    tagline: "Narrative architecture, brand storytelling, editorial publishing, and technical documentation",
    demandLevel: "Growing",
    avgSalary: "$65,000 - $92,000",
    keySkills: ["Long-form Narrative", "Copywriting & Tone of Voice", "Structural Editing", "SEO Content Architecture", "Scriptwriting"],
    icon: "PenTool",
    careerPaths: ["Content Strategist", "Technical Writer", "Editorial Writer", "Narrative Designer"],
  },
  {
    id: "digital_media",
    name: "Digital Media Production",
    category: "Arts, Design & Media",
    tagline: "Motion graphics, video post-production, sound engineering, and multi-channel content pipelines",
    demandLevel: "High",
    avgSalary: "$68,000 - $95,000",
    keySkills: ["Premiere Pro", "After Effects Motion", "Audio Mixing (Audition/DaVinci)", "Color Grading", "Social Distribution"],
    icon: "Video",
    careerPaths: ["Video Producer", "Motion Designer", "Multimedia Content Lead"],
  },
  {
    id: "communication_studies",
    name: "Communication Studies & PR",
    category: "Arts, Design & Media",
    tagline: "Corporate communications, public relations, crisis management, and media relations strategy",
    demandLevel: "High",
    avgSalary: "$66,000 - $94,000",
    keySkills: ["Media Relations", "Crisis Communication", "Press Release Drafting", "Internal Comms Strategy", "Speechwriting"],
    icon: "Megaphone",
    careerPaths: ["PR Specialist", "Corporate Communications Officer", "Media Relations Manager"],
  },

  // --- Applied Sciences ---
  {
    id: "environmental_sci",
    name: "Environmental Science",
    category: "Applied Sciences",
    tagline: "Environmental impact assessment (EIA), carbon accounting, GIS mapping, and climate compliance",
    demandLevel: "High",
    avgSalary: "$72,000 - $102,000",
    keySkills: ["ArcGIS / QGIS", "Carbon Footprint Accounting", "Water/Soil Sampling", "EPA / NEPA Regulations", "Remote Sensing"],
    icon: "Globe",
    careerPaths: ["Environmental Consultant", "Sustainability Analyst", "Ecology Project Manager"],
  },
];

export const DEFAULT_SKILL_ROADMAPS: Record<string, SkillRoadmapData> = {
  fullstack: {
    domain: "Full Stack & Web Engineering",
    summary:
      "A structured 6-month progression bridging academic computer science into industry-standard full stack engineering. Focuses on typed frontend architecture, resilient backend APIs, ACID relational persistence, and automated cloud deployments.",
    readinessTarget: "Junior Full Stack Engineer / Junior Software Engineer at top tech or modern high-growth startups",
    estimatedWeeklyHours: 15,
    phases: [
      {
        phaseNumber: 1,
        title: "Modern TypeScript & Web Fundamentals",
        duration: "Weeks 1-4",
        focus: "Static typing, DOM event mechanics, async JavaScript, and component state architecture",
        topics: [
          {
            name: "TypeScript Deep Dive (Generics, Unions & Strict Types)",
            importance: "Essential",
            description: "Industry production codebases enforce strict TypeScript. Move beyond basic types into robust compile-time validation.",
            handsOnOutcome: "Build a strongly-typed data validation library with zero runtime errors.",
            resources: [
              { name: "TypeScript Official Handbook", type: "Documentation", url: "https://www.typescriptlang.org/docs/" },
              { name: "Total TypeScript", type: "Interactive", url: "https://www.totaltypescript.com/" },
            ],
          },
          {
            name: "Modern React 19 State & Performance Optimization",
            importance: "Essential",
            description: "Understand rendering cycles, reconciliation, custom hooks, and memoization patterns.",
            handsOnOutcome: "Profile and eliminate re-renders in a 1,000-item virtualized list.",
            resources: [
              { name: "React 19 Official Documentation", type: "Documentation", url: "https://react.dev" },
            ],
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Backend Micro-Services, API Design & Auth",
        duration: "Weeks 5-10",
        focus: "HTTP/REST standards, Node.js event loop, OAuth2/JWT auth, and relational database indexing",
        topics: [
          {
            name: "RESTful API Standards & OpenAPI Contract",
            importance: "Essential",
            description: "How companies structure endpoints, error responses, idempotency, and status codes.",
            handsOnOutcome: "Design and implement a compliant REST API with input validation middleware and rate limiting.",
            resources: [
              { name: "Microsoft REST API Guidelines", type: "Documentation", url: "https://github.com/microsoft/api-guidelines" },
            ],
          },
          {
            name: "PostgreSQL Schema Modeling, Indexes & Transactions",
            importance: "Essential",
            description: "Move beyond simple ORMs to understand EXPLAIN ANALYZE, B-tree indexing, and transactions.",
            handsOnOutcome: "Design a multi-tenant schema with foreign keys, constraints, and audit logging.",
            resources: [
              { name: "Use The Index, Luke", type: "Book", url: "https://use-the-index-luke.com/" },
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Testing, CI/CD & Cloud Deployment",
        duration: "Weeks 11-18",
        focus: "Automated test suites, Docker containerization, and continuous cloud deployment pipelines",
        topics: [
          {
            name: "Automated Testing Pyramid (Unit, Integration & E2E)",
            importance: "Essential",
            description: "Writing tests separates amateur students from junior engineers who can contribute immediately.",
            handsOnOutcome: "Achieve 85% test coverage using Vitest and Playwright for critical paths.",
            resources: [
              { name: "Martin Fowler: Test Pyramid", type: "Book", url: "https://martinfowler.com/articles/practical-test-pyramid.html" },
            ],
          },
          {
            name: "Docker Containerization & Cloud Run Deployment",
            importance: "Essential",
            description: "Package frontend and backend services into lightweight, reproducible production images.",
            handsOnOutcome: "Configure automated GitHub Actions pipeline deploying to Google Cloud Run.",
            resources: [
              { name: "Google Cloud Run Docs", type: "Documentation", url: "https://cloud.google.com/run/docs" },
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Distributed Systems, Caching & Interview Mastery",
        duration: "Weeks 19-24",
        focus: "Redis caching, system design fundamentals, technical walkthroughs, and portfolio polish",
        topics: [
          {
            name: "Caching Strategies with Redis (Cache-Aside, TTL)",
            importance: "Recommended",
            description: "Scale backend response times from 350ms to under 15ms under high concurrency.",
            handsOnOutcome: "Implement a Redis rate limiter and response cache for high-traffic endpoints.",
            resources: [
              { name: "Redis University", type: "Course", url: "https://university.redis.com/" },
            ],
          },
        ],
      },
    ],
    recommendedCertifications: [
      {
        name: "Google Cloud Associate Cloud Engineer",
        provider: "Google Cloud",
        relevance: "Validates proficiency in deploying applications, monitoring operations, and configuring cloud storage.",
      },
    ],
    industryToolsStack: [
      { category: "Frontend", tools: ["React 19", "TypeScript", "Tailwind CSS", "Vite"] },
      { category: "Backend & API", tools: ["Node.js", "Express", "OpenAPI", "Zod Validation"] },
      { category: "Database & Caching", tools: ["PostgreSQL", "Drizzle ORM", "Redis"] },
      { category: "DevOps & Cloud", tools: ["Docker", "Google Cloud Run", "GitHub Actions"] },
    ],
    weeklyRoutine: {
      theoryHours: 4,
      codingHours: 8,
      practicalHours: 8,
      systemDesignHours: 3,
    },
  },

  mechanical_eng: {
    domain: "Mechanical Engineering",
    summary:
      "A rigorous curriculum focusing on advanced 3D parametric CAD modeling, finite element analysis (FEA), thermal-fluid simulation, geometric dimensioning and tolerancing (GD&T), and Design for Manufacturing (DFM).",
    readinessTarget: "Junior Mechanical Design Engineer / Product Development Associate",
    estimatedWeeklyHours: 15,
    phases: [
      {
        phaseNumber: 1,
        title: "Parametric CAD & Engineering Drawings",
        duration: "Weeks 1-4",
        focus: "SolidWorks/Fusion 360 parametric modeling, complex assemblies, and ASME Y14.5 GD&T standards",
        topics: [
          {
            name: "Parametric 3D Solid & Surface Modeling",
            importance: "Essential",
            description: "Master feature trees, lofts, sweeps, mates, and interference checks in professional CAD software.",
            handsOnOutcome: "Model a 25-part mechanical gearbox assembly with dynamic motion study.",
            resources: [
              { name: "SolidWorks Official Tutorials", type: "Documentation", url: "https://www.solidworks.com" },
            ],
          },
          {
            name: "GD&T & Tolerance Stack-up Analysis",
            importance: "Essential",
            description: "Industry production demands precision tolerancing. Understand datums, true position, and worst-case stackups.",
            handsOnOutcome: "Produce manufacturing-ready 2D drawings with full datum reference frames.",
            resources: [
              { name: "ASME Y14.5 Standard Guide", type: "Book", url: "https://www.asme.org" },
            ],
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Structural FEA & Material Selection",
        duration: "Weeks 5-10",
        focus: "Von Mises stress, strain, meshing convergence, and static/dynamic finite element simulations",
        topics: [
          {
            name: "FEA Simulation with ANSYS / SolidWorks Simulation",
            importance: "Essential",
            description: "Set up boundary conditions, non-linear contacts, and conduct mesh sensitivity studies.",
            handsOnOutcome: "Perform structural stress analysis on a load-bearing suspension arm and optimize weight by 20%.",
            resources: [
              { name: "Cornell SimCafe FEA Tutorials", type: "Course", url: "https://simcafe.org" },
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Thermal-Fluids & Computational Fluid Dynamics (CFD)",
        duration: "Weeks 11-18",
        focus: "Heat exchanger design, laminar/turbulent flow simulation, and conjugate heat transfer",
        topics: [
          {
            name: "CFD Flow Simulation & Heat Dissipation",
            importance: "Recommended",
            description: "Analyze pressure drops, boundary layers, and convective cooling in electronics enclosures.",
            handsOnOutcome: "Simulate and optimize air cooling for an industrial electronics enclosure.",
            resources: [
              { name: "ANSYS CFD Fundamentals", type: "Course", url: "https://www.ansys.com" },
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "DFM/DFA & Prototype Validation",
        duration: "Weeks 19-24",
        focus: "CNC machining constraints, injection molding draft angles, 3D printing prototyping, and physical testing",
        topics: [
          {
            name: "Design for Manufacturing & Assembly (DFM/DFA)",
            importance: "Essential",
            description: "Design parts optimized for tooling, parting lines, draft angles, and rapid assembly.",
            handsOnOutcome: "Build, assemble, and load-test a physical prototype utilizing 3D printing and off-the-shelf fasteners.",
            resources: [
              { name: "Protolabs DFM Design Guides", type: "Documentation", url: "https://www.protolabs.com" },
            ],
          },
        ],
      },
    ],
    recommendedCertifications: [
      {
        name: "CSWP (Certified SolidWorks Professional)",
        provider: "Dassault Systèmes",
        relevance: "Globally recognized industry validation of advanced parametric part modeling and assembly analysis.",
      },
    ],
    industryToolsStack: [
      { category: "CAD Software", tools: ["SolidWorks", "Autodesk Fusion 360", "PTC Creo"] },
      { category: "FEA & Simulation", tools: ["ANSYS Mechanical", "SolidWorks Simulation", "Abaqus"] },
      { category: "Computation & Coding", tools: ["MATLAB", "Python (NumPy/SciPy)", "Excel"] },
      { category: "Manufacturing & Standards", tools: ["ASME Y14.5 GD&T", "CNC Machining", "FDM/SLA 3D Printing"] },
    ],
    weeklyRoutine: {
      theoryHours: 4,
      practicalHours: 8,
      codingHours: 8,
      systemDesignHours: 3,
    },
  },

  finance: {
    domain: "Finance & Quantitative Analysis",
    summary:
      "A structured pathway for students entering corporate finance, investment banking, or financial analytics. Emphasizes 3-statement integrated modeling, discounted cash flow (DCF) valuation, Python financial libraries, and risk analytics.",
    readinessTarget: "Junior Financial Analyst / Investment Banking Analyst / Corporate Treasury Associate",
    estimatedWeeklyHours: 15,
    phases: [
      {
        phaseNumber: 1,
        title: "Accounting Foundations & 3-Statement Modeling",
        duration: "Weeks 1-4",
        focus: "Income statement, balance sheet, and cash flow statement mechanical linkages in dynamic Excel",
        topics: [
          {
            name: "Integrated 3-Statement Financial Modeling",
            importance: "Essential",
            description: "Build dynamically linked forecast models with working capital schedules and debt sweeps.",
            handsOnOutcome: "Build a 5-year operating forecast model for a publicly listed company from 10-K filings.",
            resources: [
              { name: "CFI Financial Modeling Guide", type: "Course", url: "https://corporatefinanceinstitute.com" },
            ],
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Valuation Methodologies (DCF, Comps, Precedents)",
        duration: "Weeks 5-10",
        focus: "Unlevered free cash flow, WACC calculation, terminal value, and sensitivity tables",
        topics: [
          {
            name: "Discounted Cash Flow (DCF) Valuation",
            importance: "Essential",
            description: "Calculate cost of equity via CAPM, enterprise value, and run Monte Carlo sensitivity simulations.",
            handsOnOutcome: "Build a rigorous DCF valuation model with scenario analysis for an enterprise acquisition target.",
            resources: [
              { name: "Damodaran Online Corporate Finance", type: "Course", url: "https://pages.stern.nyu.edu/~adamodar/" },
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Python & SQL for Financial Data Analysis",
        duration: "Weeks 11-18",
        focus: "Automating portfolio returns, Sharpe ratio calculation, SEC EDGAR scraping, and SQL financial queries",
        topics: [
          {
            name: "Quantitative Finance with Python & Pandas",
            importance: "Essential",
            description: "Fetch equity prices, calculate beta, simulate Value-at-Risk (VaR), and build risk dashboards.",
            handsOnOutcome: "Develop an automated Python dashboard calculating portfolio risk metrics and efficient frontiers.",
            resources: [
              { name: "Python for Finance Handbook", type: "Book", url: "https://www.oreilly.com" },
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "M&A, LBO & Deal Presentation Mastery",
        duration: "Weeks 19-24",
        focus: "Accretion/dilution analysis, leveraged buyout returns (IRR), and executive pitch decks",
        topics: [
          {
            name: "Leveraged Buyout (LBO) Modeling & Pitch Delivery",
            importance: "Recommended",
            description: "Model debt tranches, interest coverage ratios, returns waterfalls, and defend thesis to partners.",
            handsOnOutcome: "Construct a complete LBO model and deliver an investment memo with executive slides.",
            resources: [
              { name: "Wall Street Prep Guides", type: "Documentation", url: "https://www.wallstreetprep.com" },
            ],
          },
        ],
      },
    ],
    recommendedCertifications: [
      {
        name: "FMVA (Financial Modeling & Valuation Analyst)",
        provider: "CFI (Corporate Finance Institute)",
        relevance: "Validates elite Excel modeling, valuation standards, and corporate budgeting capabilities.",
      },
    ],
    industryToolsStack: [
      { category: "Financial Modeling", tools: ["Advanced Excel", "Power Query", "Think-Cell"] },
      { category: "Financial Tech & Coding", tools: ["Python (Pandas, NumPy, yfinance)", "SQL", "Tableau"] },
      { category: "Market Data", tools: ["Bloomberg Terminal", "FactSet", "CapIQ"] },
    ],
    weeklyRoutine: {
      theoryHours: 4,
      practicalHours: 8,
      codingHours: 8,
      systemDesignHours: 3,
    },
  },

  ux_ui_design: {
    domain: "UX/UI Design & Product Design",
    summary:
      "A modern human-centered design curriculum covering user research, information architecture, wireframing, high-fidelity Figma component design systems, and usability testing.",
    readinessTarget: "Junior Product Designer / Associate UX/UI Designer",
    estimatedWeeklyHours: 15,
    phases: [
      {
        phaseNumber: 1,
        title: "User Research & Information Architecture",
        duration: "Weeks 1-4",
        focus: "User interviews, persona synthesis, journey mapping, and card sorting",
        topics: [
          {
            name: "User Interviews & Problem Definition",
            importance: "Essential",
            description: "Conduct qualitative user discovery sessions, synthesize insights into affinity maps, and write problem statements.",
            handsOnOutcome: "Synthesize 10 user interviews into an evidence-based empathy map and user journey.",
            resources: [
              { name: "Nielsen Norman Group Articles", type: "Documentation", url: "https://www.nngroup.com" },
            ],
          },
        ],
      },
      {
        phaseNumber: 2,
        title: "Wireframing & Figma Auto-Layout Mastery",
        duration: "Weeks 5-10",
        focus: "Low-to-high fidelity prototyping, responsive auto-layout, and interactive states",
        topics: [
          {
            name: "Advanced Figma Component Architecture & Auto-Layout",
            importance: "Essential",
            description: "Build atomic design systems with nested variants, component properties, and layout grids.",
            handsOnOutcome: "Create an accessible 50-component design system with interactive button, input, and modal states.",
            resources: [
              { name: "Figma Community Tutorials", type: "Interactive", url: "https://www.figma.com/community" },
            ],
          },
        ],
      },
      {
        phaseNumber: 3,
        title: "Design Systems & WCAG Accessibility",
        duration: "Weeks 11-18",
        focus: "Color contrast ratios, keyboard accessibility states, typography scale, and dark mode tokens",
        topics: [
          {
            name: "Accessible Design (WCAG 2.1 AA Compliance)",
            importance: "Essential",
            description: "Audit visual designs for color blindness, screen reader flow, and interactive target sizes.",
            handsOnOutcome: "Publish a design token library with automated contrast checking and developer handoff specs.",
            resources: [
              { name: "WebAIM Accessibility Guidelines", type: "Documentation", url: "https://webaim.org" },
            ],
          },
        ],
      },
      {
        phaseNumber: 4,
        title: "Usability Testing & Case Study Storytelling",
        duration: "Weeks 19-24",
        focus: "Moderated usability testing, metrics (SUS, time-on-task), and portfolio case study presentation",
        topics: [
          {
            name: "Usability Testing & Portfolio Case Study Construction",
            importance: "Essential",
            description: "Run 5 user testing sessions on interactive prototypes, measure task completion, and document design decisions.",
            handsOnOutcome: "Publish a comprehensive end-to-end UX case study documenting research, iterations, and business impact.",
            resources: [
              { name: "Case Study Club", type: "Course", url: "https://www.casestudy.club" },
            ],
          },
        ],
      },
    ],
    recommendedCertifications: [
      {
        name: "Google UX Design Professional Certificate",
        provider: "Coursera / Google",
        relevance: "Demonstrates practical foundation across user empathy, wireframing, Figma prototyping, and usability evaluations.",
      },
    ],
    industryToolsStack: [
      { category: "Primary Design", tools: ["Figma", "FigJam", "Adobe XD"] },
      { category: "Handoff & Systems", tools: ["Zeplin", "Storybook", "Zeroheight"] },
      { category: "User Research & Testing", tools: ["Maze", "UserTesting", "Hotjar", "Google Forms"] },
    ],
    weeklyRoutine: {
      theoryHours: 4,
      practicalHours: 8,
      codingHours: 8,
      systemDesignHours: 3,
    },
  },
};

export const DEFAULT_PROJECT_ROADMAPS: Record<string, ProjectTierItem[]> = {
  fullstack: [
    {
      tier: "Tier 1: Foundation",
      difficulty: "Beginner",
      title: "DevSprint: Task & Issue Tracker with Real-Time Filter Engine",
      tagline: "Move beyond simple to-do lists by building a keyboard-first kanban tracker with persistent local state.",
      duration: "2-3 Weeks",
      problemStatement:
        "Students frequently build trivial to-do apps that fail to demonstrate state architecture, input validation, or UI responsiveness. DevSprint requires complex state machines, tag filtering, search indexing, and resilient local storage.",
      architecture:
        "Client-side SPA powered by React & TypeScript, with custom reducer state machine, client-side search index, and localStorage synchronization layer with schema versioning.",
      techStack: {
        frontend: ["React 19", "TypeScript", "Tailwind CSS", "Lucide Icons"],
        backend: ["Lightweight Express Mock Server"],
        storage: ["IndexedDB / LocalStorage with Zod schema parsing"],
        googleServices: ["Google Fonts", "Vite build tool"],
      },
      keyMilestones: [
        "Phase 1: Define TypeScript schemas for tasks, priorities, tags, and audit history.",
        "Phase 2: Build drag-and-drop or keyboard-accessible kanban columns with instantaneous state updates.",
        "Phase 3: Implement client-side debounce search, multi-tag filtering, and JSON import/export.",
        "Phase 4: Write unit tests covering 100% of task transition edge cases.",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Strict TypeScript types with zero 'any', modular component decomposition, custom hooks for state.",
        security: "HTML entity sanitization to prevent XSS in markdown descriptions; input length constraints.",
        efficiency: "Memoized selector hooks (useMemo/useCallback) to avoid re-rendering inactive kanban columns.",
        testing: "Vitest test suite verifying task sorting, filter predicates, and persistence recovery.",
        accessibility: "Full keyboard navigation (Tab, Arrow keys, Enter/Space), ARIA live regions for status changes.",
        googleServices: "Clean, linted code ready for serverless deployment.",
      },
      portfolioHook:
        "Highlight your focus on keyboard accessibility (WCAG AA compliance) and custom state reducer architecture rather than off-the-shelf third-party state managers.",
      githubReadmeChecklist: [
        "GIF demo showcasing keyboard-only navigation workflow",
        "State machine diagram illustrating task lifecycle",
        "Benchmark comparison showing < 2ms search latency across 5,000 tasks",
        "Clear Setup instructions with `npm run test` command",
      ],
    },
    {
      tier: "Tier 2: Intermediate / Production-Lite",
      difficulty: "Intermediate",
      title: "OmniMetrics: Cloud API Monitoring & Real-time Uptime Dashboard",
      tagline: "Full-stack monitoring service that pings user endpoints, computes p95/p99 latency, and alerts on outages.",
      duration: "4-5 Weeks",
      problemStatement:
        "Companies need engineers who understand asynchronous jobs, cron workers, database indexing for time-series data, and secure third-party webhook integrations.",
      architecture:
        "React frontend connecting via REST & WebSockets to an Express backend. A background cron worker pings registered user URLs, records latency samples into PostgreSQL, and evaluates alert thresholds.",
      techStack: {
        frontend: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
        backend: ["Node.js", "Express", "BullMQ / Node-Cron", "Zod"],
        storage: ["PostgreSQL (Relational)", "Redis (Job Queue & Rate Limiting)"],
        googleServices: ["Firebase Authentication / Google OAuth 2.0"],
        devOps: ["Docker Compose", "GitHub Actions CI"],
      },
      keyMilestones: [
        "Phase 1: Implement user authentication with OAuth2 and secure httpOnly session cookies.",
        "Phase 2: Build background HTTP probe engine measuring DNS, TLS handshake, and response TTFB.",
        "Phase 3: Design time-series aggregation query with SQL window functions for daily uptime % and p95 latency.",
        "Phase 4: Implement email / Discord webhook notifications when endpoints fail 3 consecutive checks.",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Separation of concerns: Controller -> Service -> Repository pattern with dependency injection.",
        security: "SSRF prevention (blocking probes to private CIDR ranges 127.0.0.1, 10.0.0.0/8), encrypted webhook secrets.",
        efficiency: "Database B-Tree composite index on (endpoint_id, created_at DESC) for sub-10ms query execution.",
        testing: "Integration tests with Supertest and mock HTTP servers simulating timeouts and 500 errors.",
        accessibility: "Color-blind friendly data visualizations, accessible chart tooltips, and tabular data fallbacks.",
        googleServices: "Robust Google OAuth integration adhering to zero-trust token verification.",
      },
      portfolioHook:
        "Explain how you prevented Server-Side Request Forgery (SSRF) when allowing users to input arbitrary target URLs for monitoring.",
      githubReadmeChecklist: [
        "Full architecture diagram with data flow from worker to Postgres",
        "Security section outlining SSRF mitigation and private IP regex filter",
        "Live interactive demo link on Google Cloud Run or Vercel",
        "Swagger / OpenAPI documentation link",
      ],
    },
    {
      tier: "Tier 3: Advanced / Industry-Grade",
      difficulty: "Advanced",
      title: "PulseAI: Distributed Document Intelligence & RAG Search Engine",
      tagline: "Enterprise knowledge-base search engine leveraging Gemini AI embeddings, vector storage, and hybrid keyword ranking.",
      duration: "6-8 Weeks",
      problemStatement:
        "Modern companies struggle with fragmented internal documentation. This project demonstrates cutting-edge LLM integration, vector database similarity search, background ingestion queues, and enterprise access controls.",
      architecture:
        "Microservices architecture: File upload gateway, asynchronous text chunking pipeline, Gemini API embedding generator, vector similarity search engine, and streaming SSE response client.",
      techStack: {
        frontend: ["React 19", "TypeScript", "Tailwind CSS", "Markdown Renderer"],
        backend: ["Node.js / Express or Python FastAPI", "Server-Sent Events (SSE)"],
        storage: ["PostgreSQL with pgvector extension / ChromaDB", "Google Cloud Storage"],
        googleServices: ["Gemini 3.5 Flash API", "Gemini Embeddings", "Google Cloud Run"],
        devOps: ["Docker", "Terraform / IaC", "GitHub Actions"],
      },
      keyMilestones: [
        "Phase 1: Build file ingestion worker handling PDF/Markdown uploads, chunking with token overlaps.",
        "Phase 2: Integrate Gemini Embeddings API and store vectors with metadata in pgvector.",
        "Phase 3: Implement Hybrid Search combining Full-Text Keyword Search (BM25) with Cosine Vector Distance.",
        "Phase 4: Stream synthesized answers with citation anchors back to the client using Server-Sent Events (SSE).",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Strict typing for vector embeddings, streaming interfaces, and graceful backoff strategies.",
        security: "Strict document authorization (row-level security so users only search documents they own), file upload sanitization.",
        efficiency: "Vector index (HNSW or IVFFlat) tuning for sub-50ms nearest-neighbor queries across 100,000 chunks.",
        testing: "End-to-end evaluation harness measuring retrieval accuracy (Recall@K) and citation validity.",
        accessibility: "Screen reader announce for streaming AI text responses, reduced motion settings for animations.",
        googleServices: "Proper server-side Gemini SDK usage with official User-Agent telemetry and streaming chunk parsers.",
      },
      portfolioHook:
        "Walk hiring managers through your RAG evaluation pipeline: how you measured chunk size trade-offs and prevented hallucinated citations.",
      githubReadmeChecklist: [
        "System architecture diagram showing vector ingestion vs. query retrieval flow",
        "Live demo video showing multi-document synthesis with exact page citations",
        "Benchmark chart comparing keyword search vs. semantic hybrid search",
        "Step-by-step local setup with Docker Compose",
      ],
    },
  ],

  mechanical_eng: [
    {
      tier: "Tier 1: Foundation",
      difficulty: "Beginner",
      title: "Precision Planetary Gearbox CAD & Kinematic Simulator",
      tagline: "Parametric CAD design of a high-torque planetary gearbox with full ASME GD&T manufacturing drawings.",
      duration: "3-4 Weeks",
      problemStatement:
        "Academic courses teach gear theory on paper without students designing production-ready gear profiles with proper backlash, bearing tolerances, and manufacturing drawings.",
      architecture:
        "Parametric CAD model in SolidWorks with gear tooth involute geometry equations, mate motion simulation, and automated bill of materials (BOM).",
      techStack: {
        simulation: ["SolidWorks Motion Study", "Kinematic Analysis"],
        hardware: ["FDM 3D Printing Prototyping", "Caliper & Micrometer Inspection"],
        tools: ["SolidWorks", "ASME Y14.5 GD&T Standards", "Excel Tolerance Calculator"],
      },
      keyMilestones: [
        "Phase 1: Calculate gear ratios, pitch diameters, and module parameters for a 5:1 planetary stage.",
        "Phase 2: Generate 3D parametric models of sun, planet, carrier, and ring gear with true involute curves.",
        "Phase 3: Conduct a motion study calculating torque transmission efficiency and tooth contact backlash.",
        "Phase 4: 3D print functional prototype and measure dimensional tolerance variations against CAD models.",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Clean feature tree naming in CAD, fully defined parametric sketches, and zero mate conflicts.",
        security: "Factor of Safety (FoS) >= 2.5 under maximum rated stall torque.",
        efficiency: "Optimized gear mass with weight-reduction cutouts without sacrificing torsional rigidity.",
        testing: "Physical torque-break test and acoustic vibration measurement on bench prototype.",
        accessibility: "Clear, standardized 2D drafting with dual metric/imperial dimensions and complete BOM notes.",
        googleServices: "Cloud backup and versioning of 3D CAD step files and technical documentation.",
      },
      portfolioHook:
        "Walk hiring managers through your backlash and interference calculations and how your 3D printed prototype validated the CAD tolerances.",
      githubReadmeChecklist: [
        "Interactive 3D model render / GIF of planetary gear motion",
        "Full ASME standard engineering drawing package (PDF)",
        "Gear tooth calculation spreadsheet",
        "Photographs of assembled prototype with measured dimensional errors",
      ],
    },
    {
      tier: "Tier 2: Intermediate / Production-Lite",
      difficulty: "Intermediate",
      title: "Electric Vehicle Battery Pack Thermal-Structural Enclosure",
      tagline: "Finite element analysis (FEA) and conjugate heat transfer CFD optimization of an EV battery enclosure.",
      duration: "5-6 Weeks",
      problemStatement:
        "Battery thermal runaway is a major automotive challenge. This project combines structural crashworthiness with liquid cooling optimization for lithium-ion cell modules.",
      architecture:
        "Parametric enclosure housing 100 cylindrical 21700 cells with internal aluminum serpentine cooling plates and structural impact-absorption ribs.",
      techStack: {
        simulation: ["ANSYS Mechanical (FEA)", "ANSYS Fluent (CFD)", "MATLAB"],
        tools: ["SolidWorks / Creo", "SimScale", "Python Heat Dissipation Scripts"],
        googleServices: ["Gemini AI for materials research", "Cloud Storage for simulation meshes"],
      },
      keyMilestones: [
        "Phase 1: Model 21700 cell pack geometry and design liquid cooling serpentine channel.",
        "Phase 2: Perform static structural crash/impact load simulation to ensure zero cell intrusion.",
        "Phase 3: Run conjugate heat transfer CFD simulation under 3C fast-charging conditions to maintain < 45°C cell temp.",
        "Phase 4: Optimize coolant flow rate and channel pressure drop to minimize pump parasitic power.",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Mesh independence study demonstrating convergence across coarse, medium, and fine grids.",
        security: "Thermal runaway mitigation (cell-to-cell thermal barriers complying with UN 38.3 standards).",
        efficiency: "Minimized coolant pressure drop across channels while maintaining uniform temperature delta < 3°C.",
        testing: "Mesh quality metrics (aspect ratio, skewness, and orthogonal quality verification).",
        accessibility: "Comprehensive visual contour plots with color-blind friendly thermal gradients.",
        googleServices: "Documented simulation methodology stored in organized repository with reproducible step files.",
      },
      portfolioHook:
        "Explain how you conducted a mesh convergence study and balanced coolant pressure drop against cell temperature uniformity.",
      githubReadmeChecklist: [
        "Temperature distribution contour plots across the cell array",
        "Mesh convergence graph showing asymptotic stress and temperature values",
        "Summary table comparing 3 different cooling channel geometries",
        "Complete technical engineering report (PDF)",
      ],
    },
    {
      tier: "Tier 3: Advanced / Industry-Grade",
      difficulty: "Advanced",
      title: "Robotic Quadruped Actuator: High-Torque Quasi-Direct Drive (QDD)",
      tagline: "Mechatronic design, motor sizing, planetary gear integration, and dynamic torque control for legged robots.",
      duration: "6-8 Weeks",
      problemStatement:
        "Modern robotics requires high torque density, backdrivability, and low inertia actuators. This project integrates mechanical gear design, thermal dissipation, motor driver electronics, and embedded control.",
      architecture:
        "Integrated brushless motor (BLDC) with custom 6:1 planetary reduction, magnetic absolute encoder, aluminum heatsink housing, and STM32 microcontroller running Field-Oriented Control (FOC).",
      techStack: {
        hardware: ["BLDC Motor Stator/Rotor", "Custom Machined Aluminum 6061 Housing", "STM32 Microcontroller"],
        simulation: ["SolidWorks CAD", "ANSYS Thermal", "MATLAB Simulink"],
        tools: ["KiCad for driver PCB", "SimpleFOC Library", "C/C++ Embedded"],
        googleServices: ["Cloud documentation", "Gemini API for sensor calibration algorithms"],
      },
      keyMilestones: [
        "Phase 1: Size BLDC stator, permanent magnets, and calculate gear reduction for 35 Nm peak torque.",
        "Phase 2: Design custom housing acting as both bearing carrier and conduction heatsink.",
        "Phase 3: Design driver circuit schematic and write STM32 Field-Oriented Control firmware.",
        "Phase 4: Construct test bench to measure torque-speed curves, backdrivability resistance, and thermal rise.",
      ],
      codeAssessmentCriteria: {
        codeQuality: "Modular embedded C firmware with clean state machines and hardware abstraction layers.",
        security: "Over-current, over-temperature, and motor stall safety shutdown routines.",
        efficiency: "High actuator backdrivability allowing transparent compliance control without expensive force sensors.",
        testing: "Hardware-in-the-loop (HIL) frequency response and torque linearity validation.",
        accessibility: "Open hardware documentation with interactive schematics and assembly video.",
        googleServices: "High-quality project documentation structured for open source reproducibility.",
      },
      portfolioHook:
        "Demonstrate to robotics hiring committees how your quasi-direct drive actuator achieves low reflected inertia and high backdrivability for legged locomotion.",
      githubReadmeChecklist: [
        "Video demo of actuator backdrivability and torque control response",
        "Exploded CAD assembly rendering highlighting internal bearing and seal placement",
        "Dynamometer test plots (Torque vs. Speed and Thermal Rise vs. Time)",
        "Firmware source code and KiCad PCB fabrication files",
      ],
    },
  ],
};

export const SAMPLE_PEERS: PeerProfile[] = [
  {
    id: "p1",
    name: "Aarav Chen",
    schoolYear: "Class of 2024 (Graduated)",
    domain: "Full Stack & Distributed Systems",
    currentRole: "Associate Software Engineer",
    companyOrOrg: "Cloudflare",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    journeyMonths: 7,
    keyProjects: [
      {
        name: "Distributed Key-Value Store",
        tech: ["Go", "Raft Consensus", "Docker"],
        stars: 142,
        description: "Implemented Raft consensus algorithm from scratch with leader election and log replication.",
      },
      {
        name: "DevSprint Kanban",
        tech: ["React", "TypeScript", "Tailwind", "Postgres"],
        stars: 88,
        description: "High-performance project tracker with offline synchronization and keyboard shortcuts.",
      },
    ],
    standoutInsight:
      "I stopped building generic weather apps and clone projects. Building an actual Raft cluster and writing a detailed post-mortem on network partitions got me 4 interview callbacks in one week.",
    linkedinHighlight: "Featured open source contributor with 500+ GitHub stars; framed every bullet around latency and reliability metrics.",
  },
  {
    id: "p2",
    name: "Elena Rostova",
    schoolYear: "Senior (Class of 2025)",
    domain: "AI & Applied ML",
    currentRole: "Incoming ML Engineer",
    companyOrOrg: "Databricks",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    journeyMonths: 9,
    keyProjects: [
      {
        name: "Medical Q&A RAG Pipeline",
        tech: ["Python", "Gemini API", "ChromaDB", "FastAPI"],
        stars: 215,
        description: "Grounded medical document question answering with citation validation and hallucination metric logging.",
      },
    ],
    standoutInsight:
      "Interviewers don't care if you imported Scikit-Learn; they wanted to know how I handled chunk overlap, evaluated retrieval precision, and prevented model drift in production.",
    linkedinHighlight: "Created 3 technical blog articles breaking down vector similarity math that gained 15,000 reads.",
  },
  {
    id: "p3",
    name: "Marcus Vance",
    schoolYear: "Junior (Class of 2026)",
    domain: "Mechanical & Robotics",
    currentRole: "Hardware Engineering Intern",
    companyOrOrg: "Tesla",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    journeyMonths: 6,
    keyProjects: [
      {
        name: "Quasi-Direct Drive Robot Actuator",
        tech: ["SolidWorks", "ANSYS FEA", "SimpleFOC", "STM32"],
        stars: 120,
        description: "Built high-torque density BLDC robotic actuator with custom planetary gearing and thermal analysis.",
      },
    ],
    standoutInsight:
      "Having an actual physical video demo and FEA convergence graphs in my portfolio website set me apart from 99% of mechanical applicants who only submit static classroom PDFs.",
    linkedinHighlight: "Published step-by-step GD&T tolerance analysis breakdown with 20,000 impressions.",
  },
];

export const INITIAL_MARKET_INTELLIGENCE: Record<string, MarketIntelligenceData> = {
  fullstack: {
    domain: "Full Stack & Web Engineering",
    marketDemandLevel: "Very High",
    averageEntrySalary: "$92,000 - $125,000 USD",
    topRequiredSkills: [
      "TypeScript (Strict Mode)",
      "React 19 / Modern Component Architecture",
      "Node.js / Express API Design",
      "PostgreSQL & Relational Data Modeling",
      "Docker & Containerized Workflows",
    ],
    fastestGrowingTools: ["Next.js App Router", "Tailwind CSS v4", "Drizzle / Prisma ORM", "Gemini SDK AI Integrations"],
    decliningOrCommoditizedSkills: [
      "Basic HTML/CSS-only mockups",
      "jQuery & Legacy DOM scripts",
      "Generic CRUD clones without tests or auth",
    ],
    hiringCriteriaShift:
      "Recruiters report a 300% influx of AI-generated portfolio clones. Candidates now stand out through verified engineering depth: automated test suites, clean architecture, live CI/CD deployments, and articulate technical documentation.",
    topHiringSectors: ["Enterprise B2B SaaS", "FinTech & Payments", "Healthcare Tech", "AI Application Layer"],
    keyAdviceForStudents: [
      "Ship at least one project with a live production URL and automated CI/CD pipeline",
      "Write comprehensive unit and integration tests (Vitest/Playwright)",
      "Document the 'Why' behind architectural choices in your GitHub README",
    ],
    searchInsights:
      "Demand for versatile full stack engineers who can bridge typed frontends, microservices, and modern cloud deployment remains one of the largest hiring categories across global tech centers.",
  },
};
