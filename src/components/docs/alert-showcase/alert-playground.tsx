"use client";

import * as React from "react";
import { Sparkles, RotateCcw, Check, RefreshCw } from "lucide-react";
import { Alert, AlertStatus, AlertDesign, AlertSize } from "@/components/ui/alert";

export interface AlertPlaygroundConfig {
  status: AlertStatus;
  design: AlertDesign;
  size: AlertSize;
  hasAction: boolean;
  isDismissible: boolean;
  title: string;
  description: string;
}

export const STATUS_DEFAULT_CONTENT: Record<
  AlertStatus,
  { title: string; description: string }
> = {
  brand: {
    title: "Mintforge Ecosystem Updated",
    description: "Zero-drift contract synchronizer has completed verification for 14 active routes.",
  },
  info: {
    title: "Scheduled Database Maintenance",
    description: "Edge database clusters will execute automated schema optimization at 03:00 UTC.",
  },
  success: {
    title: "Contract Synchronized",
    description: "FastAPI schema matched frontend contract with zero discrepancies detected.",
  },
  warning: {
    title: "Storage Approaching Threshold",
    description: "Current cluster storage utilization is at 88%. Auto-expansion will trigger shortly.",
  },
  destructive: {
    title: "Connection Interrupted",
    description: "Lost connection to edge telemetry replica. Retrying in 4 seconds...",
  },
  neutral: {
    title: "ProTip: Global Command Palette",
    description: "Press ⌘K anywhere in the web app to open quick search and navigation.",
  },
};

export const DEFAULT_ALERT_CONFIG: AlertPlaygroundConfig = {
  status: "brand",
  design: "morph",
  size: "md",
  hasAction: true,
  isDismissible: true,
  title: STATUS_DEFAULT_CONTENT.brand.title,
  description: STATUS_DEFAULT_CONTENT.brand.description,
};

export interface AlertPlaygroundProps {
  config?: AlertPlaygroundConfig;
  onChange?: (config: AlertPlaygroundConfig) => void;
}

export function AlertPlayground({
  config: externalConfig,
  onChange,
}: AlertPlaygroundProps) {
  const [internalConfig, setInternalConfig] =
    React.useState<AlertPlaygroundConfig>(DEFAULT_ALERT_CONFIG);
  const [previewKey, setPreviewKey] = React.useState(0);
  const [actionFeedback, setActionFeedback] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  const config = externalConfig || internalConfig;

  const updateConfig = (
    updater: (prev: AlertPlaygroundConfig) => AlertPlaygroundConfig
  ) => {
    const next = updater(config);
    if (onChange) {
      onChange(next);
    } else {
      setInternalConfig(next);
    }
  };

  const handleStatusChange = (status: AlertStatus) => {
    const defaults = STATUS_DEFAULT_CONTENT[status];
    updateConfig((p) => ({
      ...p,
      status,
      title: defaults.title,
      description: defaults.description,
    }));
    setIsDismissed(false);
    setPreviewKey((k) => k + 1);
  };

  const handleDesignChange = (design: AlertDesign) => {
    updateConfig((p) => ({ ...p, design }));
    setIsDismissed(false);
  };

  const resetSettings = () => {
    updateConfig(() => DEFAULT_ALERT_CONFIG);
    setIsDismissed(false);
    setPreviewKey((k) => k + 1);
  };

  const handleActionClick = () => {
    setActionFeedback(true);
    setTimeout(() => setActionFeedback(false), 2000);
  };

  const statusOptions: { value: AlertStatus; label: string; color: string }[] = [
    { value: "brand", label: "Brand", color: "bg-[#5145FF]" },
    { value: "info", label: "Info", color: "bg-blue-500" },
    { value: "success", label: "Success", color: "bg-emerald-500" },
    { value: "warning", label: "Warning", color: "bg-amber-500" },
    { value: "destructive", label: "Danger", color: "bg-red-500" },
    { value: "neutral", label: "Neutral", color: "bg-gray-500" },
  ];

  const designOptions: { value: AlertDesign; label: string }[] = [
    { value: "morph", label: "Morph" },
    { value: "rail", label: "Rail" },
    { value: "floating", label: "Floating" },
    { value: "solid", label: "Solid" },
    { value: "subtle", label: "Subtle" },
    { value: "outline", label: "Outline" },
  ];

  const sizeOptions: { value: AlertSize; label: string }[] = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.03)] flex flex-col w-full text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#111827]">Interactive Playground</h3>
            <p className="text-[11.5px] text-[#6B7280]">Configure styles &amp; synchronize code</p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          title="Reset to default settings"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Status Selection */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#111827] mb-2">
          Status Semantic Palette
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleStatusChange(opt.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                config.status === opt.value
                  ? "border-[#5145FF] bg-[#EEF2FF] text-[#5145FF] font-semibold shadow-xs"
                  : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${opt.color}`} />
              <span className="capitalize">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Design Selection */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#111827] mb-2">
          Visual Architectural Design
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {designOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleDesignChange(opt.value)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                config.design === opt.value
                  ? "border-[#5145FF] bg-[#EEF2FF] text-[#5145FF] font-semibold shadow-xs"
                  : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Sizing Selection */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#111827] mb-2">
          Scale &amp; Density
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {sizeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateConfig((p) => ({ ...p, size: opt.value }))}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                config.size === opt.value
                  ? "border-[#5145FF] bg-[#EEF2FF] text-[#5145FF] font-semibold shadow-xs"
                  : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Live Text Customization */}
      <div className="space-y-3 mb-4 pt-3 border-t border-[#E5E7EB]">
        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1">
            Title Text
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => updateConfig((p) => ({ ...p, title: e.target.value }))}
            className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/15 transition-all"
            placeholder="Alert heading..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#111827] mb-1">
            Description Copy
          </label>
          <textarea
            value={config.description}
            onChange={(e) => updateConfig((p) => ({ ...p, description: e.target.value }))}
            rows={2}
            className="w-full text-xs px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/15 transition-all resize-none"
            placeholder="Alert description copy..."
          />
        </div>
      </div>

      {/* 5. Feature Toggles */}
      <div className="space-y-2 mb-6 pt-3 border-t border-[#E5E7EB]">
        {/* Action Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="text-xs font-semibold text-[#111827] block">Action Button Slot</span>
            <span className="text-[11px] text-[#6B7280]">Embed interactive recovery or link</span>
          </div>
          <button
            type="button"
            onClick={() => updateConfig((p) => ({ ...p, hasAction: !p.hasAction }))}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              config.hasAction ? "bg-[#5145FF]" : "bg-[#E5E7EB]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                config.hasAction ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Dismissible Toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="text-xs font-semibold text-[#111827] block">Dismissible (onClose)</span>
            <span className="text-[11px] text-[#6B7280]">Renders accessible close button</span>
          </div>
          <button
            type="button"
            onClick={() => {
              updateConfig((p) => ({ ...p, isDismissible: !p.isDismissible }));
              setIsDismissed(false);
              setPreviewKey((k) => k + 1);
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              config.isDismissible ? "bg-[#5145FF]" : "bg-[#E5E7EB]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                config.isDismissible ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Live Preview Stage */}
      <div className="pt-4 border-t border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-[11px] text-[#6B7280] font-mono">
            {config.status} • {config.design}
          </span>
        </div>

        <div className="p-4 bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl min-h-[120px] flex items-center justify-center">
          <div key={previewKey} className="w-full">
            {!isDismissed ? (
              <Alert
                status={config.status}
                design={config.design}
                size={config.size}
                title={config.title}
                description={config.description}
                onClose={
                  config.isDismissible
                    ? () => {
                        setIsDismissed(true);
                      }
                    : undefined
                }
                action={
                  config.hasAction ? (
                    <button
                      type="button"
                      onClick={handleActionClick}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                        config.design === "solid"
                          ? "bg-white/20 text-white border-white/30 hover:bg-white/30"
                          : "bg-white text-[#111827] border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
                      }`}
                    >
                      {actionFeedback ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <Check size={12} /> Done
                        </span>
                      ) : (
                        "Resolve Now"
                      )}
                    </button>
                  ) : undefined
                }
              />
            ) : (
              <div className="py-4 text-center">
                <p className="text-xs text-[#6B7280] mb-2">Alert was dismissed.</p>
                <button
                  type="button"
                  onClick={() => setIsDismissed(false)}
                  className="text-xs font-semibold text-[#5145FF] bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#E0E7FF] px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Restore Preview</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
