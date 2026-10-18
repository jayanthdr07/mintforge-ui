"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarSize,
  AvatarShape,
  AvatarStatus,
} from "@/components/ui/avatar";
import { Check, AlertCircle } from "lucide-react";

export type PlaygroundBadgeType = "none" | "alert" | "count" | "verified";

export interface PlaygroundState {
  size: AvatarSize;
  shape: AvatarShape;
  status: AvatarStatus | "none";
  badge: PlaygroundBadgeType;
  fallbackActive: boolean;
}

interface AvatarPlaygroundProps {
  state: PlaygroundState;
  onChange: (updater: (prev: PlaygroundState) => PlaygroundState) => void;
}

const PLAYGROUND_PHOTO =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80";

export function AvatarPlayground({ state, onChange }: AvatarPlaygroundProps) {
  const { size, shape, status, badge, fallbackActive } = state;

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-[#111827]">
            Interactive Playground
          </h3>
          <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
            Live Configurator
          </span>
        </div>

        {/* Content Area: Left Preview & Right Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Left: Preview Canvas */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] min-h-[200px] relative overflow-hidden">
            {/* Subtle radial dot backdrop */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative z-10 transition-all duration-300 transform scale-110">
              <Avatar size={size} shape={shape}>
                {!fallbackActive && (
                  <AvatarImage
                    src={PLAYGROUND_PHOTO}
                    alt="Playground Avatar"
                    className={status === "offline" ? "grayscale opacity-85" : ""}
                  />
                )}
                <AvatarFallback initials="JD" />

                {/* Status Indicator */}
                {status !== "none" && <AvatarBadge status={status} />}

                {/* Additional Badge Types */}
                {badge === "verified" && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10"
                    aria-label="Verified User"
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}

                {badge === "alert" && (
                  <span
                    className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-[#EA580C] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10"
                    aria-label="Alert"
                  >
                    <AlertCircle size={10} strokeWidth={2.5} />
                  </span>
                )}

                {badge === "count" && (
                  <AvatarBadge
                    position="top-right"
                    variant="count"
                    count="+3"
                  />
                )}
              </Avatar>
            </div>

            <span className="text-[11px] font-mono text-[#64748B] mt-4 z-10">
              {size.toUpperCase()} &middot; {shape} &middot; {status}
            </span>
          </div>

          {/* Right: Controls Panel */}
          <div className="sm:col-span-7 space-y-4">
            {/* Size Control */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Size
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["xs", "sm", "md", "lg", "xl"] as AvatarSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, size: s }))}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-lg border transition-all text-center uppercase ${
                      size === s
                        ? "bg-[#5145FF] text-white border-[#5145FF] shadow-sm"
                        : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Control */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "circle", label: "Circular" },
                  { id: "squircle", label: "Squircle" },
                  { id: "rounded", label: "Rounded" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        shape: item.id as AvatarShape,
                      }))
                    }
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                      shape === item.id
                        ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                        : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Control */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Status Presence
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: "none", label: "None", color: "bg-slate-300" },
                  { id: "online", label: "Online", color: "bg-[#10B981]" },
                  { id: "away", label: "Away", color: "bg-[#F59E0B]" },
                  { id: "busy", label: "Busy", color: "bg-[#EF4444]" },
                  { id: "offline", label: "Offline", color: "bg-[#94A3B8]" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        status: item.id as AvatarStatus | "none",
                      }))
                    }
                    className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                      status === item.id
                        ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                        : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Badges & Fallback Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Badge selector */}
              <div>
                <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                  Notification Badge
                </label>
                <select
                  value={badge}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      badge: e.target.value as PlaygroundBadgeType,
                    }))
                  }
                  className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#5145FF]"
                >
                  <option value="none">None</option>
                  <option value="verified">Verified Check (Top Right)</option>
                  <option value="alert">Alert Exclamation (Bottom Left)</option>
                  <option value="count">Count Pill (+3)</option>
                </select>
              </div>

              {/* Fallback Switch */}
              <div>
                <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                  Fallback Content
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      fallbackActive: !prev.fallbackActive,
                    }))
                  }
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    fallbackActive
                      ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  <span>{fallbackActive ? "Initials Active" : "Image Active"}</span>
                  <div
                    className={`w-8 h-4 rounded-full transition-colors relative ${
                      fallbackActive ? "bg-[#5145FF]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                        fallbackActive ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Live updates reflect dynamically in the Code Section below</span>
        <span className="font-semibold text-[#5145FF]">Mintforge Primitives</span>
      </div>
    </div>
  );
}
