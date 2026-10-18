"use client";

import * as React from "react";
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
  BubbleCollapsible,
  BubbleVariant,
  BubbleAlign,
} from "@/components/ui/bubble";
import { Play, RotateCcw } from "lucide-react";

export interface BubblePlaygroundState {
  variant: BubbleVariant;
  align: BubbleAlign;
  content: string;
  reactionType: "none" | "thumbs" | "party" | "heart";
  actionButton: "none" | "proceed" | "contact";
  isCollapsible: boolean;
}

const DEFAULT_STATE: BubblePlaygroundState = {
  variant: "default",
  align: "end",
  content: "Can you analyze our frontend interview submission payload against the FastAPI backend?",
  reactionType: "none",
  actionButton: "none",
  isCollapsible: false,
};

interface BubblePlaygroundProps {
  state: BubblePlaygroundState;
  onChange: (updater: (prev: BubblePlaygroundState) => BubblePlaygroundState) => void;
}

export function BubblePlayground({ state, onChange }: BubblePlaygroundProps) {
  const {
    variant,
    align,
    content,
    reactionType,
    actionButton,
    isCollapsible,
  } = state;

  const handleReset = () => {
    onChange(() => DEFAULT_STATE);
  };

  const renderReactions = () => {
    if (reactionType === "thumbs") {
      return (
        <BubbleReactions side="bottom" align={align === "end" ? "end" : "start"}>
          <span>👍</span>
          <span>😮</span>
          <span className="font-mono text-[10px] text-[#64748B] font-bold">+2</span>
        </BubbleReactions>
      );
    }
    if (reactionType === "party") {
      return (
        <BubbleReactions side="top" align={align === "end" ? "start" : "end"}>
          <span>🎉</span>
          <span>👏</span>
        </BubbleReactions>
      );
    }
    if (reactionType === "heart") {
      return (
        <BubbleReactions side="bottom" align="end">
          <span>❤️</span>
          <span>🔥</span>
        </BubbleReactions>
      );
    }
    return null;
  };

  const renderActionButton = () => {
    if (actionButton === "proceed") {
      return (
        <div className="mt-2 pt-2 border-t border-white/20 dark:border-black/10">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-[#5145FF] font-semibold text-xs shadow-xs hover:bg-slate-100 transition cursor-pointer"
          >
            <Play size={10} fill="currentColor" />
            <span>Yes, proceed</span>
          </button>
        </div>
      );
    }
    if (actionButton === "contact") {
      return (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#5145FF] text-white font-semibold text-xs shadow-xs hover:bg-[#4338CA] transition cursor-pointer"
          >
            <span>Talk to a human</span>
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#111827]">
            Interactive Playground
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] text-[#64748B] hover:text-[#111827] px-2 py-0.5 rounded border border-[#E5E7EB] hover:bg-slate-100 transition"
              title="Reset to defaults"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
            <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
              Live Configurator
            </span>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="flex flex-col justify-center p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] min-h-[180px] mb-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 w-full flex flex-col">
            <Bubble variant={variant} align={align}>
              <BubbleContent>
                {isCollapsible ? (
                  <BubbleCollapsible defaultExpanded={false}>
                    {content}
                    {" The audit checked dialogs, menus, and drawers to guarantee full compliance."}
                  </BubbleCollapsible>
                ) : (
                  content
                )}
                {renderActionButton()}
              </BubbleContent>
              {renderReactions()}
            </Bubble>
          </div>

          <span className="text-[11px] font-mono text-[#64748B] mt-4 z-10 text-center">
            {variant} &middot; align: {align}
          </span>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* 1. Variant */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Surface Variant
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
              {(
                [
                  "default",
                  "secondary",
                  "muted",
                  "tinted",
                  "outline",
                  "ghost",
                  "destructive",
                ] as BubbleVariant[]
              ).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, variant: v }))}
                  className={`px-1.5 py-1 text-[11px] capitalize rounded-lg border transition-all text-center truncate ${
                    variant === v
                      ? "bg-[#5145FF] text-white border-[#5145FF] font-semibold shadow-xs"
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Alignment */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Alignment
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, align: "start" }))}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                  align === "start"
                    ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]"
                }`}
              >
                start (Incoming / Left)
              </button>
              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, align: "end" }))}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                  align === "end"
                    ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]"
                }`}
              >
                end (Outgoing / Right)
              </button>
            </div>
          </div>

          {/* 3. Content Text Input */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Message Content
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Bubble message content..."
              className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5145FF]"
            />
          </div>

          {/* 4. Reactions & Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Reaction Selector */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Floating Reactions
              </label>
              <select
                value={reactionType}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    reactionType: e.target.value as BubblePlaygroundState["reactionType"],
                  }))
                }
                className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#5145FF]"
              >
                <option value="none">None</option>
                <option value="thumbs">Thumbs &amp; Surprised (👍 😮 +2)</option>
                <option value="party">Party &amp; Clapping (🎉 👏)</option>
                <option value="heart">Heart &amp; Fire (❤️ 🔥)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Action Button
              </label>
              <select
                value={actionButton}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    actionButton: e.target.value as BubblePlaygroundState["actionButton"],
                  }))
                }
                className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#5145FF]"
              >
                <option value="none">None</option>
                <option value="proceed">Yes, proceed</option>
                <option value="contact">Talk to a human</option>
              </select>
            </div>
          </div>

          {/* 5. Collapsible Switch */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  isCollapsible: !prev.isCollapsible,
                }))
              }
              className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg border transition-all ${
                isCollapsible
                  ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                  : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              <span>{isCollapsible ? "Collapsible Active" : "Standard Single Block"}</span>
              <div
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  isCollapsible ? "bg-[#5145FF]" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    isCollapsible ? "right-0.5" : "left-0.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Configured state reflected dynamically in Code Section below</span>
        <span className="font-semibold text-[#5145FF]">Mintforge Primitives</span>
      </div>
    </div>
  );
}
