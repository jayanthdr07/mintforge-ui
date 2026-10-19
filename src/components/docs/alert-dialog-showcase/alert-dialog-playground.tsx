"use client";

import * as React from "react";
import {
  AlertDialogSize,
  AlertDialogAppearance,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogConfirm,
  AlertDialogDestructive,
  AlertDialogForm,
  AlertDialogSuccess,
  AlertDialogDetail,
} from "@/components/ui/alert-dialog";
import {
  Sliders,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  Eye,
} from "lucide-react";

export type PlaygroundDesign = "confirm" | "destructive" | "form" | "success" | "detail";

export interface AlertDialogPlaygroundConfig {
  design: PlaygroundDesign;
  size: AlertDialogSize;
  appearance: AlertDialogAppearance;
  showCloseButton: boolean;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  showDescription: boolean;
  showFooter: boolean;
}

export const DEFAULT_ALERT_DIALOG_CONFIG: AlertDialogPlaygroundConfig = {
  design: "confirm",
  size: "md",
  appearance: "standard",
  showCloseButton: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showDescription: true,
  showFooter: true,
};

export interface AlertDialogPlaygroundProps {
  config: AlertDialogPlaygroundConfig;
  onChange: (config: AlertDialogPlaygroundConfig) => void;
}

export function AlertDialogPlayground({
  config,
  onChange,
}: AlertDialogPlaygroundProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const updateConfig = (
    updater: (prev: AlertDialogPlaygroundConfig) => AlertDialogPlaygroundConfig
  ) => {
    onChange(updater(config));
  };

  const handleReset = () => {
    onChange(DEFAULT_ALERT_DIALOG_CONFIG);
  };

  // Render static in-card preview
  const renderPreview = () => {
    switch (config.design) {
      case "destructive":
        return (
          <AlertDialogDestructive
            isStaticPreview
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            description={config.showDescription ? undefined : ""}
          />
        );
      case "form":
        return (
          <AlertDialogForm
            isStaticPreview
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
          />
        );
      case "success":
        return (
          <AlertDialogSuccess
            isStaticPreview
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            description={config.showDescription ? undefined : ""}
          />
        );
      case "detail":
        return (
          <AlertDialogDetail
            isStaticPreview
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
          />
        );
      case "confirm":
      default:
        return (
          <AlertDialogConfirm
            isStaticPreview
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            description={config.showDescription ? undefined : ""}
          />
        );
    }
  };

  // Render live interactive modal
  const renderModal = () => {
    switch (config.design) {
      case "destructive":
        return (
          <AlertDialogDestructive
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            closeOnEscape={config.closeOnEscape}
            closeOnOverlayClick={config.closeOnOverlayClick}
            description={config.showDescription ? undefined : ""}
          />
        );
      case "form":
        return (
          <AlertDialogForm
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            closeOnEscape={config.closeOnEscape}
            closeOnOverlayClick={config.closeOnOverlayClick}
          />
        );
      case "success":
        return (
          <AlertDialogSuccess
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            closeOnEscape={config.closeOnEscape}
            closeOnOverlayClick={config.closeOnOverlayClick}
            description={config.showDescription ? undefined : ""}
          />
        );
      case "detail":
        return (
          <AlertDialogDetail
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            closeOnEscape={config.closeOnEscape}
            closeOnOverlayClick={config.closeOnOverlayClick}
          />
        );
      case "confirm":
      default:
        return (
          <AlertDialogConfirm
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            size={config.size}
            appearance={config.appearance}
            showCloseButton={config.showCloseButton}
            closeOnEscape={config.closeOnEscape}
            closeOnOverlayClick={config.closeOnOverlayClick}
            description={config.showDescription ? undefined : ""}
          />
        );
    }
  };

  const designs: { id: PlaygroundDesign; label: string }[] = [
    { id: "confirm", label: "Confirm" },
    { id: "destructive", label: "Destructive" },
    { id: "form", label: "Form" },
    { id: "success", label: "Success" },
    { id: "detail", label: "Detail" },
  ];

  const sizes: { id: AlertDialogSize; label: string }[] = [
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
  ];

  const appearances: { id: AlertDialogAppearance; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "tinted", label: "Soft Tinted" },
    { id: "bordered", label: "Bordered" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left space-y-6">
      {/* Playground Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EEF2F6]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center">
            <Sliders size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111827]">Interactive Playground</h3>
            <p className="text-[11px] text-[#64748B]">Configure live dialog parameters</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-[#64748B] hover:text-[#111827] flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          title="Reset to defaults"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Control 1: Dialog Design */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
          <Layers size={13} />
          <span>Dialog Design</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {designs.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => updateConfig((prev) => ({ ...prev, design: d.id }))}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                config.design === d.id
                  ? "bg-[#5145FF] text-white border-[#5145FF] shadow-xs"
                  : "bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control 2: Size Scale */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Modal Width (Scale)
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {sizes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => updateConfig((prev) => ({ ...prev, size: s.id }))}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                config.size === s.id
                  ? "bg-[#5145FF] text-white border-[#5145FF] shadow-xs"
                  : "bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control 3: Surface Appearance */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Surface Appearance
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {appearances.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => updateConfig((prev) => ({ ...prev, appearance: a.id }))}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                config.appearance === a.id
                  ? "bg-[#5145FF] text-white border-[#5145FF] shadow-xs"
                  : "bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control 4: Behavior Toggles */}
      <div className="space-y-2 pt-2 border-t border-[#EEF2F6]">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
          Behavior &amp; Dismissal
        </label>
        <div className="space-y-2">
          {/* Close button toggle */}
          <label className="flex items-center justify-between text-xs font-medium text-[#111827] cursor-pointer select-none">
            <span>Show Close Button (×)</span>
            <input
              type="checkbox"
              checked={config.showCloseButton}
              onChange={(e) => updateConfig((prev) => ({ ...prev, showCloseButton: e.target.checked }))}
              className="accent-[#5145FF] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Overlay dismissal */}
          <label className="flex items-center justify-between text-xs font-medium text-[#111827] cursor-pointer select-none">
            <span>Overlay Click Dismissal</span>
            <input
              type="checkbox"
              checked={config.closeOnOverlayClick}
              onChange={(e) => updateConfig((prev) => ({ ...prev, closeOnOverlayClick: e.target.checked }))}
              className="accent-[#5145FF] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Escape dismissal */}
          <label className="flex items-center justify-between text-xs font-medium text-[#111827] cursor-pointer select-none">
            <span>Escape Key Dismissal</span>
            <input
              type="checkbox"
              checked={config.closeOnEscape}
              onChange={(e) => updateConfig((prev) => ({ ...prev, closeOnEscape: e.target.checked }))}
              className="accent-[#5145FF] w-4 h-4 rounded cursor-pointer"
            />
          </label>

          {/* Show description */}
          <label className="flex items-center justify-between text-xs font-medium text-[#111827] cursor-pointer select-none">
            <span>Show Description</span>
            <input
              type="checkbox"
              checked={config.showDescription}
              onChange={(e) => updateConfig((prev) => ({ ...prev, showDescription: e.target.checked }))}
              className="accent-[#5145FF] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Main Interactive Trigger Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#5145FF] hover:bg-[#4338CA] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Open {config.design.toUpperCase()} Dialog</span>
          <ExternalLink size={14} className="opacity-80" />
        </button>
      </div>

      {/* In-Card Static Live Preview Box */}
      <div className="pt-3 border-t border-[#EEF2F6]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
            <Eye size={13} />
            <span>Live Composition Preview</span>
          </span>
          <span className="text-[10px] font-semibold text-[#5145FF] bg-[#EEF2FF] px-2 py-0.5 rounded-full border border-[#E0E7FF] capitalize">
            {config.design} · {config.size}
          </span>
        </div>
        <div className="p-3 sm:p-4 rounded-2xl bg-[#F8F9FC] border border-[#E5E7EB]">
          {renderPreview()}
        </div>
      </div>

      {/* The Actual Rendered Modal when Opened */}
      {renderModal()}
    </div>
  );
}
