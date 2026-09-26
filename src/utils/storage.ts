import { SkillRoadmapData, ProjectTierItem } from "../types";

const STORAGE_KEYS = {
  ACTIVE_DOMAIN: "ascent_active_domain",
  SKILL_ROADMAPS: "ascent_saved_skill_roadmaps",
  PROJECT_ROADMAPS: "ascent_saved_project_roadmaps",
  COMPLETED_TOPICS: "ascent_completed_topics",
  SKILL_INPUTS: "ascent_skill_inputs",
  PROJECT_INPUTS: "ascent_project_inputs",
};

export interface SavedSkillRoadmapEntry {
  domainId: string;
  roadmap: SkillRoadmapData;
  inputs: {
    currentLevel: string;
    timeline: string;
    weeklyHours: number;
    targetRoles: string;
  };
  updatedAt: number;
}

export interface SavedProjectRoadmapEntry {
  domainId: string;
  projects: ProjectTierItem[];
  inputs: {
    currentLevel: string;
    techPreferences: string;
    interest: string;
  };
  updatedAt: number;
}

export const StorageService = {
  // Domain selection
  saveActiveDomain(domainId: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DOMAIN, domainId);
    } catch (e) {
      console.warn("StorageService saveActiveDomain error:", e);
    }
  },

  getActiveDomain(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_DOMAIN);
    } catch {
      return null;
    }
  },

  // Skill Roadmaps
  saveSkillRoadmap(
    domainId: string,
    roadmap: SkillRoadmapData,
    inputs: SavedSkillRoadmapEntry["inputs"]
  ): void {
    try {
      const existing = this.getAllSkillRoadmaps();
      existing[domainId] = {
        domainId,
        roadmap,
        inputs,
        updatedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEYS.SKILL_ROADMAPS, JSON.stringify(existing));
    } catch (e) {
      console.warn("StorageService saveSkillRoadmap error:", e);
    }
  },

  getSkillRoadmap(domainId: string): SavedSkillRoadmapEntry | null {
    try {
      const all = this.getAllSkillRoadmaps();
      return all[domainId] || null;
    } catch {
      return null;
    }
  },

  getAllSkillRoadmaps(): Record<string, SavedSkillRoadmapEntry> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SKILL_ROADMAPS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  // Project Roadmaps
  saveProjectRoadmap(
    domainId: string,
    projects: ProjectTierItem[],
    inputs: SavedProjectRoadmapEntry["inputs"]
  ): void {
    try {
      const existing = this.getAllProjectRoadmaps();
      existing[domainId] = {
        domainId,
        projects,
        inputs,
        updatedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEYS.PROJECT_ROADMAPS, JSON.stringify(existing));
    } catch (e) {
      console.warn("StorageService saveProjectRoadmap error:", e);
    }
  },

  getProjectRoadmap(domainId: string): SavedProjectRoadmapEntry | null {
    try {
      const all = this.getAllProjectRoadmaps();
      return all[domainId] || null;
    } catch {
      return null;
    }
  },

  getAllProjectRoadmaps(): Record<string, SavedProjectRoadmapEntry> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECT_ROADMAPS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  // Completed Topics
  saveCompletedTopics(topics: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(topics));
    } catch (e) {
      console.warn("StorageService saveCompletedTopics error:", e);
    }
  },

  getCompletedTopics(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
};
