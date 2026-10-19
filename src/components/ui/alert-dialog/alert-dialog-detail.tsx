"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogSize,
  AlertDialogAppearance,
} from "../alert-dialog";
import {
  X,
  Check,
} from "lucide-react";

function LinkedinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export interface AlertDialogDetailProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  onSave?: (data: { size: number; tags: string[]; links: Record<string, string> }) => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  isStaticPreview?: boolean;
}

export function AlertDialogDetail({
  open,
  onOpenChange,
  size = "md",
  appearance = "standard",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  onSave,
  onCancel,
  trigger,
  isStaticPreview = false,
}: AlertDialogDetailProps) {
  const [companySize, setCompanySize] = React.useState(2800);
  const [tags, setTags] = React.useState<string[]>([
    "Design",
    "Web Builder",
    "Backend Engineer",
  ]);
  const [newTagInput, setNewTagInput] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  const removeTag = (indexToRemove: number) => {
    setTags((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags((prev) => [...prev, newTagInput.trim()]);
      }
      setNewTagInput("");
    }
  };

  const handleSave = () => {
    setSaved(true);
    onSave?.({
      size: companySize,
      tags,
      links: {
        linkedin: "https://linkedin.com/company/radian-os",
        github: "https://github.com/radian-os/radianos",
        x: "https://x.com/radian_os",
        facebook: "facebook.com/radian",
        instagram: "instagram.com/radian",
      },
    });
    setTimeout(() => setSaved(false), 3000);
  };

  const dialogContent = (
    <div className="flex flex-col text-left">
      <AlertDialogHeader className="mb-4">
        <AlertDialogTitle className="font-bold text-lg text-[#111827]">
          Add more details
        </AlertDialogTitle>
        <AlertDialogDescription className="text-xs text-[#64748B]">
          Add some more information about your company.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {/* Section 1: Company Size Range Slider (Ref: Image 5) */}
        <div className="space-y-1.5 p-3 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#111827]">Company size</span>
            <span className="font-mono font-semibold text-[#5145FF]">
              {companySize < 500 ? "1 - 500" : companySize < 2000 ? "500 - 2,000" : "1,200 - 5,000"}
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={companySize}
            onChange={(e) => setCompanySize(Number(e.target.value))}
            className="mf-dialog-slider w-full cursor-pointer mt-1"
          />
        </div>

        {/* Section 2: Keywords Tag Input (Ref: Image 5) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111827]">Keywords</label>
          <div className="p-2 rounded-xl border border-[#E5E7EB] focus-within:border-[#5145FF] focus-within:ring-2 focus-within:ring-[#5145FF]/20 bg-white min-h-[58px] flex flex-wrap items-center gap-1.5 transition-all">
            {tags.map((tag, idx) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F9FC] border border-[#E5E7EB] text-xs font-medium text-[#111827]"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="text-[#94A3B8] hover:text-[#DC2626] transition-colors cursor-pointer"
                  aria-label={`Remove ${tag}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder={tags.length === 0 ? "Type a keyword and press Enter..." : "Add keyword..."}
              className="text-xs text-[#111827] placeholder:text-[#94A3B8] outline-none flex-1 min-w-[100px] bg-transparent py-1 px-1"
            />
          </div>
        </div>

        {/* Section 3: Social Links Group (Ref: Image 5) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#111827]">Social links</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs">
              <div className="w-5 h-5 rounded-md bg-[#0077B5] text-white flex items-center justify-center shrink-0">
                <LinkedinIcon />
              </div>
              <span className="text-[#64748B] font-mono truncate text-[11px]">
                https://linkedin.com/company/radian-os
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs">
              <div className="w-5 h-5 rounded-md bg-[#24292F] text-white flex items-center justify-center shrink-0">
                <GithubIcon />
              </div>
              <span className="text-[#64748B] font-mono truncate text-[11px]">
                https://github.com/radian-os/radianos
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs">
              <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                𝕏
              </div>
              <span className="text-[#64748B] font-mono truncate text-[11px]">
                https://x.com/radian_os
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs">
              <div className="w-5 h-5 rounded-md bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                <FacebookIcon />
              </div>
              <span className="text-[#64748B] font-mono truncate text-[11px]">
                facebook.com/radian
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs">
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0">
                <InstagramIcon />
              </div>
              <span className="text-[#64748B] font-mono truncate text-[11px]">
                instagram.com/radian
              </span>
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#15803D] text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
          <Check size={14} />
          <span>Details updated successfully!</span>
        </div>
      )}

      <AlertDialogFooter className="pt-3 border-t border-[#EEF2F6] mt-4">
        <AlertDialogCancel
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] font-semibold text-xs sm:text-sm"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-[#5145FF] text-white hover:bg-[#4338CA] font-semibold text-xs sm:text-sm shadow-xs transition-colors"
        >
          Save changes
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );

  if (isStaticPreview) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
        {dialogContent}
      </div>
    );
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      closeOnEscape={closeOnEscape}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      {trigger && <AlertDialogTrigger asChild>{trigger as React.ReactElement}</AlertDialogTrigger>}
      <AlertDialogContent
        size={size}
        appearance={appearance}
        showCloseButton={showCloseButton}
      >
        {dialogContent}
      </AlertDialogContent>
    </AlertDialog>
  );
}
