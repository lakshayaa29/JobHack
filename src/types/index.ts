export type DomainCategory =
  | "Computer Science & Tech"
  | "Core Engineering"
  | "Bio & Life Sciences"
  | "Commerce & Business"
  | "Arts, Design & Media"
  | "Applied Sciences";

export type DomainId = string;

export interface DomainMeta {
  id: DomainId;
  name: string;
  category: DomainCategory;
  tagline: string;
  demandLevel: "Very High" | "High" | "Growing";
  avgSalary: string;
  keySkills: string[];
  icon: string;
  careerPaths: string[];
}

export interface SkillTopic {
  name: string;
  importance: "Essential" | "Recommended" | "Bonus";
  description: string;
  handsOnOutcome: string;
  completed?: boolean;
  resources: {
    name: string;
    type: "Documentation" | "Course" | "Interactive" | "Book";
    url: string;
  }[];
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string;
  focus: string;
  topics: SkillTopic[];
}

export interface Certification {
  name: string;
  provider: string;
  relevance: string;
}

export interface SkillRoadmapData {
  domain: string;
  summary: string;
  readinessTarget: string;
  estimatedWeeklyHours: number;
  phases: RoadmapPhase[];
  recommendedCertifications: Certification[];
  industryToolsStack: {
    category: string;
    tools: string[];
  }[];
  weeklyRoutine: {
    theoryHours: number;
    codingHours?: number;
    practicalHours?: number;
    systemDesignHours?: number;
    projectHours?: number;
  };
}

export interface ProjectTierItem {
  tier: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  tagline: string;
  duration: string;
  problemStatement: string;
  architecture: string;
  techStack: {
    frontend?: string[];
    backend?: string[];
    storage?: string[];
    googleServices?: string[];
    devOps?: string[];
    tools?: string[];
    simulation?: string[];
    hardware?: string[];
    labTechniques?: string[];
    analytics?: string[];
    designTools?: string[];
    [key: string]: string[] | undefined;
  };
  keyMilestones: string[];
  codeAssessmentCriteria: {
    codeQuality: string;
    security: string;
    efficiency: string;
    testing: string;
    accessibility: string;
    googleServices: string;
    problemAlignment?: string;
  };
  portfolioHook: string;
  githubReadmeChecklist: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
  mode?: "mentor" | "interview_drill" | "project_critique" | "resume_help";
}

export interface MarketIntelligenceData {
  domain: string;
  marketDemandLevel: string;
  averageEntrySalary: string;
  topRequiredSkills: string[];
  fastestGrowingTools: string[];
  decliningOrCommoditizedSkills: string[];
  hiringCriteriaShift: string;
  topHiringSectors: string[];
  keyAdviceForStudents: string[];
  searchInsights: string;
  sources?: { title: string; url: string }[];
}

export interface ResumeAnalysisData {
  overallScore: number;
  atsReadinessScore: number;
  impactScore: number;
  technicalDepthScore: number;
  grade: string;
  summary: string;
  keyStrengths: string[];
  criticalWeaknesses: string[];
  bulletPointRewrites: {
    original: string;
    improved: string;
    reason: string;
  }[];
  missingHighValueKeywords: string[];
  portfolioAdvice: string;
}

export interface CriteriaScore {
  score: number; // 1-10
  feedback: string;
}

export interface CodeAssessmentData {
  overallScore: number;
  criteriaScores: {
    codeQuality: CriteriaScore;
    security: CriteriaScore;
    efficiency: CriteriaScore;
    testing: CriteriaScore;
    accessibility: CriteriaScore;
    problemAlignment: CriteriaScore;
    googleServices: CriteriaScore;
  };
  summary: string;
  criticalVulnerabilities: string[];
  improvedCodeSnippet: string;
  interviewerFollowUpQuestions: string[];
}

export interface PeerProfile {
  id: string;
  name: string;
  schoolYear: string;
  domain: string;
  currentRole: string;
  companyOrOrg: string;
  avatarUrl: string;
  journeyMonths: number;
  keyProjects: {
    name: string;
    tech: string[];
    stars?: number;
    description: string;
  }[];
  standoutInsight: string;
  linkedinHighlight: string;
}
