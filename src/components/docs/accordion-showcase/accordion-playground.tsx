"use client";

import * as React from "react";
import {
  Sparkles,
  Zap,
  RotateCcw,
  Ban,
} from "lucide-react";
import { AccordionAnimation } from "@/components/ui/accordion";
import { AccordionMorph } from "@/components/ui/accordion/accordion-morph";
import { AccordionMinimal } from "@/components/ui/accordion/accordion-minimal";
import { AccordionOutlined } from "@/components/ui/accordion/accordion-outlined";
import { AccordionNested } from "@/components/ui/accordion/accordion-nested";

export interface PlaygroundConfig {
  variant: "morph" | "minimal" | "outlined" | "nested";
  animation: AccordionAnimation;
  behavior: "single" | "multiple";
  defaultOpen: boolean;
}

export const DEFAULT_CONFIG: PlaygroundConfig = {
  variant: "morph",
  animation: "smooth",
  behavior: "single",
  defaultOpen: true,
};

export interface AccordionPlaygroundProps {
  config?: PlaygroundConfig;
  onChange?: (config: PlaygroundConfig) => void;
}

export function AccordionPlayground({
  config: externalConfig,
  onChange,
}: AccordionPlaygroundProps) {
  const [internalConfig, setInternalConfig] = React.useState<PlaygroundConfig>(DEFAULT_CONFIG);

  const config = externalConfig || internalConfig;
  const updateConfig = (updater: (prev: PlaygroundConfig) => PlaygroundConfig) => {
    const next = updater(config);
    if (onChange) {
      onChange(next);
    } else {
      setInternalConfig(next);
    }
  };

  const resetSettings = () => {
    updateConfig(() => DEFAULT_CONFIG);
  };

  const renderPreviewAccordion = () => {
    const defaultVal = config.defaultOpen ? "item-1" : undefined;

    switch (config.variant) {
      case "minimal":
        return (
          <AccordionMinimal
            key={`${config.variant}-${config.animation}-${config.behavior}-${config.defaultOpen}`}
            type={config.behavior}
            animation={config.animation}
            defaultValue={defaultVal}
          />
        );
      case "outlined":
        return (
          <AccordionOutlined
            key={`${config.variant}-${config.animation}-${config.behavior}-${config.defaultOpen}`}
            type={config.behavior}
            animation={config.animation}
            defaultValue={defaultVal}
          />
        );
      case "nested":
        return (
          <AccordionNested
            key={`${config.variant}-${config.animation}-${config.behavior}-${config.defaultOpen}`}
            type={config.behavior}
            animation={config.animation}
            defaultValue={config.defaultOpen ? "parent-doc" : undefined}
          />
        );
      case "morph":
      default:
        return (
          <AccordionMorph
            key={`${config.variant}-${config.animation}-${config.behavior}-${config.defaultOpen}`}
            type={config.behavior}
            animation={config.animation}
            defaultValue={defaultVal}
          />
        );
    }
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.03)] flex flex-col w-full text-left">
      {/* Header */}
      <div className="flex items-start gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="text-[16.5px] font-bold text-[#111827]">Try Accordion Playground</h3>
          <p className="text-[13px] text-[#6B7280]">Explore variants, animations and behavior.</p>
        </div>
      </div>

      {/* Control 1: Variant */}
      <div className="mb-3.5">
        <div className="text-[11px] font-bold tracking-wider uppercase text-[#6B7280] mb-1.5">
          Variant
        </div>
        <div className="flex gap-1.5 bg-[#F3F4F6] p-1 rounded-xl">
          {(["morph", "minimal", "outlined", "nested"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => updateConfig((prev) => ({ ...prev, variant: v }))}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-all capitalize text-center cursor-pointer ${
                config.variant === v
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Control 2: Animation */}
      <div className="mb-3.5">
        <div className="text-[11px] font-bold tracking-wider uppercase text-[#6B7280] mb-1.5">
          Animation
        </div>
        <div className="flex gap-1.5 bg-[#F3F4F6] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => updateConfig((prev) => ({ ...prev, animation: "smooth" }))}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              config.animation === "smooth"
                ? "bg-[#5145FF] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#111827]"
            }`}
          >
            Smooth
          </button>
          <button
            type="button"
            onClick={() => updateConfig((prev) => ({ ...prev, animation: "spring" }))}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
              config.animation === "spring"
                ? "bg-[#5145FF] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#111827]"
            }`}
          >
            <Zap size={11} />
            <span>Spring</span>
          </button>
          <button
            type="button"
            onClick={() => updateConfig((prev) => ({ ...prev, animation: "none" }))}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
              config.animation === "none"
                ? "bg-[#5145FF] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#111827]"
            }`}
          >
            <Ban size={11} />
            <span>None</span>
          </button>
        </div>
      </div>

      {/* Control 3: Behavior */}
      <div className="mb-3.5">
        <div className="text-[11px] font-bold tracking-wider uppercase text-[#6B7280] mb-1.5">
          Behavior
        </div>
        <div className="flex gap-1.5 bg-[#F3F4F6] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => updateConfig((prev) => ({ ...prev, behavior: "single" }))}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              config.behavior === "single"
                ? "bg-[#5145FF] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#111827]"
            }`}
          >
            Single Open
          </button>
          <button
            type="button"
            onClick={() => updateConfig((prev) => ({ ...prev, behavior: "multiple" }))}
            className={`flex-1 py-1 px-2 text-xs font-semibold rounded-lg transition-all text-center cursor-pointer ${
              config.behavior === "multiple"
                ? "bg-[#5145FF] text-white shadow-xs"
                : "text-[#4B5563] hover:text-[#111827]"
            }`}
          >
            Multiple Open
          </button>
        </div>
      </div>

      {/* Control 4: Default Open Switch */}
      <div className="mb-4">
        <div className="text-[11px] font-bold tracking-wider uppercase text-[#6B7280] mb-1.5">
          Default Open
        </div>
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => updateConfig((prev) => ({ ...prev, defaultOpen: !prev.defaultOpen }))}
          role="switch"
          aria-checked={config.defaultOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              updateConfig((prev) => ({ ...prev, defaultOpen: !prev.defaultOpen }));
            }
          }}
        >
          <div
            className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
              config.defaultOpen ? "bg-[#5145FF]" : "bg-[#E5E7EB]"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] left-[3px] transition-transform duration-200 shadow-xs ${
                config.defaultOpen ? "translate-x-5" : ""
              }`}
            />
          </div>
          <span className="text-xs font-medium text-[#111827]">Open first item by default</span>
        </div>
      </div>

      {/* Control 5: Reset Settings Button */}
      <button
        type="button"
        onClick={resetSettings}
        className="w-full py-1.5 px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] rounded-xl text-xs font-semibold text-[#4B5563] flex items-center justify-center gap-2 transition-all cursor-pointer mb-4"
      >
        <RotateCcw size={12} />
        <span>Reset Settings</span>
      </button>

      {/* Live Interactive Preview Box (Cramped Code removed; Full Code now down below!) */}
      <div className="bg-[#F8F9FC] rounded-2xl border border-[#E5E7EB] p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5E7EB]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
            Live Interactive Preview
          </span>
          <span className="text-[11px] font-bold text-[#5145FF] capitalize bg-[#EEF2FF] px-2.5 py-0.5 rounded-full border border-[#E0E7FF]">
            {config.variant}
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-[#EEF2F6] shadow-xs">
          {renderPreviewAccordion()}
        </div>
      </div>
    </div>
  );
}
