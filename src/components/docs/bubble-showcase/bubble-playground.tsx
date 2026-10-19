"use client";

import * as React from "react";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
  BubbleActions,
  BubbleCollapsible,
  BubbleVariant,
  BubbleAlign,
} from "@/components/ui/bubble";
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCw,
  Share2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export interface BubblePlaygroundState {
  variant: BubbleVariant;
  align: BubbleAlign;
  content: string;
  reactionType: "none" | "thumbs-heart" | "fire-rocket" | "party-trophy";
  actionButton: "none" | "copy-retry" | "full";
  isCollapsible: boolean;
}

interface BubblePlaygroundProps {
  state: BubblePlaygroundState;
  onChange: (updater: (prev: BubblePlaygroundState) => BubblePlaygroundState) => void;
}

export function BubblePlayground({ state, onChange }: BubblePlaygroundProps) {
  const { variant, align, content, reactionType, actionButton, isCollapsible } = state;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variantsList: { key: BubbleVariant; label: string; bg: string }[] = [
    { key: "default", label: "Default", bg: "#5145FF" },
    { key: "secondary", label: "Secondary", bg: "#FFFFFF" },
    { key: "muted", label: "Muted", bg: "#F1F5F9" },
    { key: "tinted", label: "Tinted", bg: "#F5F3FF" },
    { key: "outline", label: "Outline", bg: "#FFFFFF" },
    { key: "ghost", label: "Ghost", bg: "transparent" },
    { key: "destructive", label: "Destructive", bg: "#FEF2F2" },
  ];

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#111827]">
            Interactive Playground
          </h3>
          <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
            Live Configurator
          </span>
        </div>

        {/* Live Preview Box */}
        <div className="flex flex-col justify-center p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] min-h-[190px] mb-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 w-full flex flex-col">
            <div
              className={`flex items-start gap-2.5 w-full ${
                align === "end" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div className="shrink-0 mt-0.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-2xs select-none ${
                    align === "end"
                      ? "bg-[#5145FF] text-white"
                      : "bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF]"
                  }`}
                >
                  {align === "end" ? <User size={13} /> : <Bot size={13} />}
                </div>
              </div>

              {/* Message Column */}
              <div
                className={`flex flex-col gap-1 max-w-[85%] ${
                  align === "end" ? "items-end" : "items-start"
                }`}
              >
                {/* Header info */}
                <div
                  className={`flex items-center gap-1.5 px-1 text-[11px] font-medium text-[#64748B] ${
                    align === "end" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="font-semibold text-[#111827]">
                    {align === "end" ? "You" : "Mintforge AI"}
                  </span>
                  <span className="text-[#94A3B8]">•</span>
                  <span className="text-[#94A3B8]">Just now</span>
                </div>

                {/* Bubble Container */}
                <div className="relative w-fit">
                  <Bubble variant={variant} align={align}>
                    <BubbleContent>
                      {isCollapsible ? (
                        <BubbleCollapsible defaultExpanded={false}>
                          {content}
                          {" Long-form continuation with additional deployment telemetry and schema details."}
                        </BubbleCollapsible>
                      ) : (
                        content
                      )}
                    </BubbleContent>
                  </Bubble>

                  {/* Reaction Overlay */}
                  {reactionType !== "none" && (
                    <BubbleReactions side="bottom" align={align === "end" ? "end" : "start"}>
                      {reactionType === "thumbs-heart" && (
                        <>
                          <span className="pr-1">👍 2</span>
                          <span>❤️ 1</span>
                        </>
                      )}
                      {reactionType === "fire-rocket" && (
                        <>
                          <span className="pr-1">🔥 3</span>
                          <span>🚀 2</span>
                        </>
                      )}
                      {reactionType === "party-trophy" && (
                        <>
                          <span className="pr-1">🎉 5</span>
                          <span>🏆 1</span>
                        </>
                      )}
                    </BubbleReactions>
                  )}
                </div>

                {/* Action Buttons */}
                {actionButton !== "none" && (
                  <BubbleActions align={align} className="mt-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-white border border-transparent hover:border-[#E5E7EB] transition"
                    >
                      {copied ? <Check size={11} className="text-[#15803D]" /> : <Copy size={11} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-white border border-transparent hover:border-[#E5E7EB] transition"
                    >
                      <RotateCw size={11} />
                      <span>Retry</span>
                    </button>
                    {actionButton === "full" && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[#64748B] hover:text-[#111827] hover:bg-white border border-transparent hover:border-[#E5E7EB] transition"
                      >
                        <Share2 size={11} />
                        <span>Share</span>
                      </button>
                    )}
                  </BubbleActions>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-4">
          {/* 1. Variant Selector */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-2">
              Appearance Variant
            </label>
            <div className="flex flex-wrap gap-1.5">
              {variantsList.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => onChange((p) => ({ ...p, variant: v.key }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 border ${
                    variant === v.key
                      ? "bg-[#5145FF] text-white border-[#5145FF] shadow-xs"
                      : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full border border-black/10"
                    style={{ backgroundColor: v.bg }}
                  />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Alignment Toggle */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-2">
              Alignment (Direction)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, align: "start" }))}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  align === "start"
                    ? "bg-[#5145FF] text-white border-[#5145FF]"
                    : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <ArrowLeft size={13} />
                <span>Incoming (Left)</span>
              </button>

              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, align: "end" }))}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  align === "end"
                    ? "bg-[#5145FF] text-white border-[#5145FF]"
                    : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                <span>Outgoing (Right)</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 3. Reactions Toggle */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-2">
              Reaction Capsules
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { key: "none", label: "None" },
                { key: "thumbs-heart", label: "👍 ❤️" },
                { key: "fire-rocket", label: "🔥 🚀" },
                { key: "party-trophy", label: "🎉 🏆" },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() =>
                    onChange((p) => ({
                      ...p,
                      reactionType: r.key as BubblePlaygroundState["reactionType"],
                    }))
                  }
                  className={`py-1 px-2 rounded-lg text-xs font-medium border transition cursor-pointer text-center truncate ${
                    reactionType === r.key
                      ? "bg-[#5145FF] text-white border-[#5145FF]"
                      : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Action Buttons & Collapsible */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#64748B] block mb-2">
                Action Controls
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { key: "none", label: "Disabled" },
                  { key: "copy-retry", label: "Copy & Retry" },
                  { key: "full", label: "Full Suite" },
                ].map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() =>
                      onChange((p) => ({
                        ...p,
                        actionButton: a.key as BubblePlaygroundState["actionButton"],
                      }))
                    }
                    className={`py-1 px-2.5 rounded-lg text-xs font-medium border transition cursor-pointer text-left ${
                      actionButton === a.key
                        ? "bg-[#5145FF] text-white border-[#5145FF]"
                        : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#64748B] block mb-2">
                Collapsible
              </label>
              <button
                type="button"
                onClick={() => onChange((p) => ({ ...p, isCollapsible: !p.isCollapsible }))}
                className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium border transition cursor-pointer text-center ${
                  isCollapsible
                    ? "bg-[#5145FF] text-white border-[#5145FF]"
                    : "bg-white text-[#334155] border-[#E2E8F0] hover:bg-slate-50"
                }`}
              >
                {isCollapsible ? "Expanded / Collapsible" : "Standard Single"}
              </button>
            </div>
          </div>

          {/* 5. Custom Content Text */}
          <div>
            <label className="text-xs font-semibold text-[#64748B] block mb-2">
              Message Content
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => {
                const val = e.target.value;
                onChange((p) => ({ ...p, content: val }));
              }}
              className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#111827] outline-none focus:border-[#5145FF] focus:ring-1 focus:ring-[#5145FF] transition"
              placeholder="Type custom bubble text..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
