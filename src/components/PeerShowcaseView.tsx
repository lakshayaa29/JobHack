import React from "react";
import {
  Users,
  GitFork,
  Star,
  Sparkles,
  Linkedin,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { SAMPLE_PEERS } from "../data/initialData";
import { DomainMeta } from "../types";

interface PeerShowcaseViewProps {
  currentDomain: DomainMeta;
}

export const PeerShowcaseView: React.FC<PeerShowcaseViewProps> = ({ currentDomain }) => {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
            <Users className="w-3.5 h-3.5" />
            <span>Peer Discovery & Journey Benchmarking</span>
            <span className="text-slate-600">•</span>
            <span>Zero Isolation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proven Blueprints from Successful Junior Hires
          </h2>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Preparing in isolation leads to imposter syndrome and wasted effort on low-signal projects.
            Inspect the exact architectures, project GitHub repositories, and strategic positioning that helped peers land competitive offers.
          </p>
        </div>
      </div>

      {/* Peer Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SAMPLE_PEERS.map((peer) => (
          <div
            key={peer.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all shadow-lg"
          >
            {/* Header / Avatar */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={peer.avatarUrl}
                  alt={peer.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{peer.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400 font-semibold">{peer.currentRole}</span>
                    <span>@</span>
                    <strong className="text-white">{peer.companyOrOrg}</strong>
                  </div>
                  <span className="text-[11px] text-slate-500">{peer.schoolYear}</span>
                </div>
              </div>

              {/* Journey Duration Tag */}
              <div className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Preparation Duration:</span>
                </span>
                <span className="font-bold text-white">{peer.journeyMonths} Months</span>
              </div>

              {/* Standout Insight */}
              <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 p-4 rounded-xl border border-indigo-500/20 text-xs text-slate-200 leading-relaxed italic">
                &ldquo;{peer.standoutInsight}&rdquo;
              </div>

              {/* Key Projects */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Flagship Projects
                </span>

                <div className="space-y-2">
                  {peer.keyProjects.map((proj, pIdx) => (
                    <div key={pIdx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{proj.name}</span>
                        {proj.stars && (
                          <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{proj.stars}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LinkedIn Strategy Highlight */}
            <div className="pt-4 border-t border-slate-800 text-xs space-y-1">
              <span className="font-semibold text-indigo-300 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Positioning Tip:</span>
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">{peer.linkedinHighlight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
