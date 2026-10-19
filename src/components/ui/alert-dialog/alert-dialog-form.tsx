"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogSize,
  AlertDialogAppearance,
} from "../alert-dialog";
import { FolderPlus, Globe, Lock, CheckCircle2 } from "lucide-react";

export interface AlertDialogFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  onSuccess?: (data: { name: string; description: string; visibility: "private" | "public" }) => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  isStaticPreview?: boolean;
}

export function AlertDialogForm({
  open,
  onOpenChange,
  size = "md",
  appearance = "standard",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  onSuccess,
  onCancel,
  trigger,
  isStaticPreview = false,
}: AlertDialogFormProps) {
  const [name, setName] = React.useState("Demo Workspace");
  const [description, setDescription] = React.useState("This workspace is used for the demo purpose.");
  const [visibility, setVisibility] = React.useState<"private" | "public">("private");
  const [error, setError] = React.useState<string | null>(null);
  const [submittedData, setSubmittedData] = React.useState<{
    name: string;
    visibility: string;
  } | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Workspace name is required.");
      return;
    }
    setError(null);
    const data = { name: name.trim(), description: description.trim(), visibility };
    setSubmittedData(data);
    onSuccess?.(data);
  };

  const dialogContent = (
    <div className="flex flex-col text-left">
      {/* Header with Lavender Folder Icon (Ref: Image 3) */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#EEF2F6]">
        <div className="w-10 h-10 rounded-xl bg-[#F2F0FF] border border-[#E0E7FF] flex items-center justify-center text-[#5145FF] shrink-0">
          <FolderPlus size={20} className="stroke-[2.2]" />
        </div>
        <div>
          <AlertDialogTitle className="text-base sm:text-lg font-bold text-[#111827]">
            Create New Workspace
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-[#64748B]">
            Configure and launch a collaborative project environment.
          </AlertDialogDescription>
        </div>
      </div>

      {submittedData ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] my-2 space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 size={16} />
            <span>Workspace Created Successfully!</span>
          </div>
          <p className="text-[#15803D]/90">
            <strong>{submittedData.name}</strong> has been initialized with {submittedData.visibility} access permissions.
          </p>
          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="text-xs font-semibold text-[#5145FF] hover:underline pt-1 cursor-pointer block"
          >
            Create Another Workspace
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Workspace Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="ws-name"
              className="text-xs font-semibold text-[#111827] flex items-center gap-1"
            >
              <span>Workspace Name</span>
              <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="ws-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Acme Studio"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-white text-[#111827] placeholder:text-[#94A3B8] transition-all outline-none ${
                error
                  ? "border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
                  : "border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/20"
              }`}
            />
            {error && (
              <p className="text-[11px] font-medium text-[#DC2626] animate-in fade-in">
                {error}
              </p>
            )}
          </div>

          {/* Field 2: Description (optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ws-desc"
                className="text-xs font-semibold text-[#111827]"
              >
                Description <span className="text-[#64748B] font-normal">(optional)</span>
              </label>
            </div>
            <textarea
              id="ws-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the workspace purpose..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#5145FF] focus:ring-2 focus:ring-[#5145FF]/20 bg-white text-[#111827] placeholder:text-[#94A3B8] transition-all outline-none resize-none"
            />
          </div>

          {/* Field 3: Visibility Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#111827]">
              Workspace Visibility
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVisibility("private")}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                  visibility === "private"
                    ? "border-[#5145FF] bg-[#F2F0FF] text-[#5145FF] font-semibold ring-1 ring-[#5145FF]"
                    : "border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB]"
                }`}
              >
                <Lock size={14} className={visibility === "private" ? "text-[#5145FF]" : "text-[#64748B]"} />
                <div>
                  <div className="font-semibold text-xs leading-none">Private</div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">Invite only</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility("public")}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                  visibility === "public"
                    ? "border-[#5145FF] bg-[#F2F0FF] text-[#5145FF] font-semibold ring-1 ring-[#5145FF]"
                    : "border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB]"
                }`}
              >
                <Globe size={14} className={visibility === "public" ? "text-[#5145FF]" : "text-[#64748B]"} />
                <div>
                  <div className="font-semibold text-xs leading-none">Public</div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">Any team member</div>
                </div>
              </button>
            </div>
          </div>

          <AlertDialogFooter className="pt-3 border-t border-[#EEF2F6] mt-5">
            <AlertDialogCancel
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] font-semibold text-xs sm:text-sm"
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#5145FF] text-white hover:bg-[#4338CA] font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Create Workspace
            </button>
          </AlertDialogFooter>
        </form>
      )}
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
