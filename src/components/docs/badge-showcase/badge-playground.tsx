"use client";

import * as React from "react";
import {
  Badge,
  BadgeAppearance,
  BadgeVariant,
  BadgeSize,
  BadgeShape,
  BadgeDot,
  BadgeCount,
} from "@/components/ui/badge";
import { Sparkles, Star, Check } from "lucide-react";

export interface BadgePlaygroundState {
  appearance: BadgeAppearance;
  variant: BadgeVariant;
  size: BadgeSize;
  shape: BadgeShape;
  label: string;
  hasLeadingIcon: boolean;
  leadingIconType: "dot" | "check" | "sparkle";
  hasTrailingIcon: boolean;
  trailingIconType: "star" | "count";
}

interface BadgePlaygroundProps {
  state: BadgePlaygroundState;
  onChange: (updater: (prev: BadgePlaygroundState) => BadgePlaygroundState) => void;
}

export function BadgePlayground({ state, onChange }: BadgePlaygroundProps) {
  const {
    appearance,
    variant,
    size,
    shape,
    label,
    hasLeadingIcon,
    leadingIconType,
    hasTrailingIcon,
    trailingIconType,
  } = state;

  const renderLeadingIcon = () => {
    if (!hasLeadingIcon) return null;
    if (leadingIconType === "dot") {
      const dotStatus =
        variant === "destructive"
          ? "failed"
          : variant === "warning"
          ? "pending"
          : "active";
      return <BadgeDot status={dotStatus} ping={variant === "success"} />;
    }
    if (leadingIconType === "check") {
      return <Check size={size === "lg" ? 14 : 11} strokeWidth={2.5} />;
    }
    if (leadingIconType === "sparkle") {
      return <Sparkles size={size === "lg" ? 14 : 11} />;
    }
    return null;
  };

  const renderTrailingIcon = () => {
    if (!hasTrailingIcon) return null;
    if (trailingIconType === "star") {
      return <Star size={size === "lg" ? 14 : 11} className="fill-current" />;
    }
    if (trailingIconType === "count") {
      return <BadgeCount count="3" />;
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
          <span className="text-[11px] font-mono text-[#5145FF] bg-[#F2F0FF] px-2 py-0.5 rounded-full border border-[#E0DAFF]">
            Live Configurator
          </span>
        </div>

        {/* Live Preview Box */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] min-h-[140px] mb-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 transition-all duration-200 transform scale-110">
            <Badge
              appearance={appearance}
              variant={variant}
              size={size}
              shape={shape}
              leadingIcon={renderLeadingIcon()}
              trailingIcon={renderTrailingIcon()}
            >
              {label || "Badge"}
            </Badge>
          </div>

          <span className="text-[11px] font-mono text-[#64748B] mt-4 z-10">
            {appearance} &middot; {variant} &middot; {size.toUpperCase()}
          </span>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* 1. Appearance */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Appearance
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["solid", "soft", "outline", "ghost"] as BadgeAppearance[]).map(
                (app) => (
                  <button
                    key={app}
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, appearance: app }))
                    }
                    className={`px-2 py-1.5 text-xs capitalize rounded-lg border transition-all text-center ${
                      appearance === app
                        ? "bg-[#5145FF] text-white border-[#5145FF] font-semibold shadow-xs"
                        : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                    }`}
                  >
                    {app}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 2. Variant / Color Intent */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Color Intent
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "success", label: "Success (Green)" },
                { id: "brand", label: "Brand (Purple)" },
                { id: "primary", label: "Primary (Blue)" },
                { id: "warning", label: "Warning (Orange)" },
                { id: "destructive", label: "Destructive (Red)" },
                { id: "neutral", label: "Neutral (Gray)" },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      variant: v.id as BadgeVariant,
                    }))
                  }
                  className={`px-2 py-1 text-[11px] rounded-lg border transition-all truncate text-center ${
                    variant === v.id
                      ? "bg-[#F2F0FF] text-[#5145FF] border-[#5145FF] font-semibold"
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Size */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Size
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(["xs", "sm", "md", "lg"] as BadgeSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, size: s }))}
                  className={`px-2 py-1 text-xs font-semibold uppercase rounded-lg border transition-all text-center ${
                    size === s
                      ? "bg-[#5145FF] text-white border-[#5145FF] shadow-xs"
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#111827]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Label Input */}
          <div>
            <label className="text-xs font-semibold text-[#111827] block mb-1.5">
              Label Text
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, label: e.target.value }))
              }
              placeholder="Badge label"
              className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5145FF]"
            />
          </div>

          {/* 5. Icon Toggles */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Leading Icon Toggle */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Leading Icon
              </label>
              <select
                value={hasLeadingIcon ? leadingIconType : "none"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "none") {
                    onChange((prev) => ({ ...prev, hasLeadingIcon: false }));
                  } else {
                    onChange((prev) => ({
                      ...prev,
                      hasLeadingIcon: true,
                      leadingIconType: val as "dot" | "check" | "sparkle",
                    }));
                  }
                }}
                className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#5145FF]"
              >
                <option value="none">None</option>
                <option value="dot">Status Dot (●)</option>
                <option value="check">Checkmark (✔)</option>
                <option value="sparkle">Sparkle (✨)</option>
              </select>
            </div>

            {/* Trailing Icon Toggle */}
            <div>
              <label className="text-xs font-semibold text-[#111827] block mb-1.5">
                Trailing Icon
              </label>
              <select
                value={hasTrailingIcon ? trailingIconType : "none"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "none") {
                    onChange((prev) => ({ ...prev, hasTrailingIcon: false }));
                  } else {
                    onChange((prev) => ({
                      ...prev,
                      hasTrailingIcon: true,
                      trailingIconType: val as "star" | "count",
                    }));
                  }
                }}
                className="w-full text-xs bg-white text-[#111827] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#5145FF]"
              >
                <option value="none">None</option>
                <option value="star">Star (★)</option>
                <option value="count">Count Pill (+3)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <span>Dynamic state reflected in Code Section below</span>
        <span className="font-semibold text-[#5145FF]">Mintforge Primitives</span>
      </div>
    </div>
  );
}
