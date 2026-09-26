import React, { useState, useEffect } from "react";
import { Navbar, ActiveTab } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { DomainSelectorModal } from "./components/DomainSelectorModal";
import { StrategyDeliverableView } from "./components/StrategyDeliverableView";
import { SkillRoadmapView } from "./components/SkillRoadmapView";
import { ProjectRoadmapView } from "./components/ProjectRoadmapView";
import { MentorChatView } from "./components/MentorChatView";
import { MarketRadarView } from "./components/MarketRadarView";
import { ResumeAuditorView } from "./components/ResumeAuditorView";
import { CodeAssessmentView } from "./components/CodeAssessmentView";
import { PeerShowcaseView } from "./components/PeerShowcaseView";
import { DOMAINS } from "./data/initialData";
import { DomainId, DomainMeta } from "./types";
import { StorageService } from "./utils/storage";
import { Compass, Sparkles, Heart } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("strategy");

  // Persistent Selected Domain
  const [selectedDomain, setSelectedDomain] = useState<DomainId>(() => {
    const saved = StorageService.getActiveDomain();
    if (saved && DOMAINS.some((d) => d.id === saved)) {
      return saved;
    }
    return "fullstack";
  });

  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // Persistent Completed Topics
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    const saved = StorageService.getCompletedTopics();
    return new Set<string>(saved);
  });

  const [mentorInitialPrompt, setMentorInitialPrompt] = useState<string>("");

  const currentDomainMeta = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  // Save selected domain whenever it changes
  const handleSelectDomain = (domain: DomainMeta | DomainId) => {
    const id = typeof domain === "string" ? domain : domain.id;
    setSelectedDomain(id);
    StorageService.saveActiveDomain(id);
  };

  // Calculate dynamic readiness score based on completed topics
  const totalTrackedTopics = 12;
  const completedCount = completedTopics.size;
  const calculatedReadiness = Math.min(100, Math.round(35 + (completedCount / totalTrackedTopics) * 65));

  const handleUpdateCompletedTopic = (topicName: string, completed: boolean) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (completed) {
        next.add(topicName);
      } else {
        next.delete(topicName);
      }
      StorageService.saveCompletedTopics(Array.from(next));
      return next;
    });
  };

  const handleAskMentor = (prompt: string) => {
    setMentorInitialPrompt(prompt);
    setActiveTab("ai_mentor");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDomain={selectedDomain}
        setSelectedDomain={handleSelectDomain}
        readinessScore={calculatedReadiness}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        currentDomain={currentDomainMeta}
        setActiveTab={setActiveTab}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === "strategy" && <StrategyDeliverableView />}

        {activeTab === "skill_roadmap" && (
          <SkillRoadmapView
            currentDomain={currentDomainMeta}
            onAskMentor={handleAskMentor}
            onUpdateCompletedTopic={handleUpdateCompletedTopic}
            completedTopics={completedTopics}
            onOpenDomainSelector={() => setIsDomainModalOpen(true)}
          />
        )}

        {activeTab === "project_roadmap" && (
          <ProjectRoadmapView
            currentDomain={currentDomainMeta}
            onAskMentor={handleAskMentor}
            onOpenDomainSelector={() => setIsDomainModalOpen(true)}
          />
        )}

        {activeTab === "ai_mentor" && (
          <MentorChatView
            currentDomain={currentDomainMeta}
            initialPrompt={mentorInitialPrompt}
          />
        )}

        {activeTab === "market_radar" && (
          <MarketRadarView currentDomain={currentDomainMeta} />
        )}

        {activeTab === "resume_auditor" && (
          <ResumeAuditorView currentDomain={currentDomainMeta} />
        )}

        {activeTab === "code_evaluator" && (
          <CodeAssessmentView currentDomain={currentDomainMeta} />
        )}

        {activeTab === "peer_showcase" && (
          <PeerShowcaseView currentDomain={currentDomainMeta} />
        )}
      </main>

      {/* Domain Selection Modal (Searchable, Multi-Category across 24+ Disciplines) */}
      <DomainSelectorModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        selectedDomainId={selectedDomain}
        onSelectDomain={(domain) => handleSelectDomain(domain)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white tracking-tight">Ascent Career Readiness</span>
            <span className="text-slate-600">•</span>
            <span>Supporting Engineering, Life Sciences, Commerce, Arts & Tech</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Powered by Google Gemini 3.5 Flash & Google Search Grounding</span>
            <span>•</span>
            <span className="text-indigo-400 font-medium">Auto-Persisting Local State</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
