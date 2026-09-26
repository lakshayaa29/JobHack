import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Target,
  FileCode2,
  FileCheck2,
  Trash2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { ChatMessage, DomainMeta } from "../types";

interface MentorChatViewProps {
  currentDomain: DomainMeta;
  initialPrompt?: string;
}

export const MentorChatView: React.FC<MentorChatViewProps> = ({
  currentDomain,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "model",
      content: `Hello! I am your Ascent AI Technical Mentor & Career Coach for **${currentDomain.name}**.\n\nWhether you need to:\n- 🎯 **Drill technical interview questions** (System design, algorithms, API trade-offs)\n- 🏗️ **Review project architecture** (preventing tutorial clones, choosing databases)\n- 📝 **Polish resume bullet points** using the Google XYZ formula\n- 🗺️ **Clarify roadmap concepts**\n\nHow can I help you elevate your engineering readiness today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"mentor" | "interview_drill" | "project_critique" | "resume_help">("mentor");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation payload
      const payload = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payload,
          domain: currentDomain.name,
          mode,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const modelMsg: ChatMessage = {
          id: `m-${Date.now()}`,
          role: "model",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error(data.error || "Failed to receive response");
      }
    } catch (err: any) {
      console.warn("AI Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: "model",
        content: `I encountered a momentary connectivity sync. Here is high-priority guidance for **${currentDomain.name}**:\n\n1. Focus on core architectural patterns (Separation of concerns, clean interfaces, relational indexing).\n2. Write automated tests (Vitest/Jest) to demonstrate reliability.\n3. Defend your technology choices by emphasizing specific trade-offs rather than popularity.\n\nPlease ask again to continue our multi-turn drill!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetDrills = [
    {
      label: "🎯 Technical Interview Drill",
      prompt: `Drill me with one rigorous, junior-to-mid level technical interview question for ${currentDomain.name}. Ask the question, wait for my response, and then evaluate my answer with constructive critique!`,
      mode: "interview_drill" as const,
    },
    {
      label: "🏗️ Project Architecture Defense",
      prompt: `I am building a production-grade full-stack project for ${currentDomain.name}. Give me 3 hard questions a senior tech lead would ask me about latency, database indexing, and network failure modes.`,
      mode: "project_critique" as const,
    },
    {
      label: "📝 STAR Resume Bullet Rewrite",
      prompt: `Here is a resume bullet: "Created a web app using React and Node.js with a MongoDB database to display products." Help me rewrite this using the Google XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]").`,
      mode: "resume_help" as const,
    },
    {
      label: "⚡ System Design 101",
      prompt: `How would you explain the difference between vertical vs horizontal scaling and database read-replicas in a junior software engineer interview?`,
      mode: "mentor" as const,
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[750px] overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Ascent AI Mentor</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Gemini Multi-Turn
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Domain Context: <strong className="text-indigo-300">{currentDomain.name}</strong>
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMode("mentor")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              mode === "mentor" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            General Mentor
          </button>
          <button
            onClick={() => setMode("interview_drill")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              mode === "interview_drill" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Target className="w-3 h-3" />
            <span>Interview Drill</span>
          </button>
          <button
            onClick={() => setMode("project_critique")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              mode === "project_critique" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileCode2 className="w-3 h-3" />
            <span>Project Review</span>
          </button>
          <button
            onClick={() => setMode("resume_help")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              mode === "resume_help" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileCheck2 className="w-3 h-3" />
            <span>STAR Polish</span>
          </button>

          <button
            onClick={() =>
              setMessages([
                {
                  id: "m-reset",
                  role: "model",
                  content: `Conversation reset. I am ready to practice ${currentDomain.name} skills with you!`,
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ])
            }
            title="Clear Chat History"
            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Quick Drills:</span>
        </span>
        {presetDrills.map((drill, idx) => (
          <button
            key={idx}
            onClick={() => {
              setMode(drill.mode);
              handleSend(drill.prompt);
            }}
            className="text-[11px] whitespace-nowrap bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors cursor-pointer"
          >
            {drill.label}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md"
                }`}
              >
                {/* Content rendering with line breaks and markdown boldness */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content}
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Ascent Mentor is analyzing your prompt...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/95 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${currentDomain.name} skills, interview questions, or architecture...`}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
