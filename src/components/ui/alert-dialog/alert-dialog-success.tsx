"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogSize,
  AlertDialogAppearance,
} from "../alert-dialog";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";

export interface AlertDialogSuccessProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  title?: string;
  description?: string;
  okText?: string;
  onOk?: () => void;
  trigger?: React.ReactNode;
  isStaticPreview?: boolean;
}

export function AlertDialogSuccess({
  open,
  onOpenChange,
  size = "md",
  appearance = "standard",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  title = "Workspace created!",
  description = "Your new workspace is ready. You can now invite teammates, configure tokens, or continue setup.",
  okText = "Open workspace",
  onOk,
  trigger,
  isStaticPreview = false,
}: AlertDialogSuccessProps) {
  const [opened, setOpened] = React.useState(false);

  const handleOk = () => {
    setOpened(true);
    onOk?.();
    setTimeout(() => setOpened(false), 3000);
  };

  const dialogContent = (
    <div className="flex flex-col items-center text-center">
      {/* Centered Emerald Green Checkmark Badge (Ref: Image 4) */}
      <div className="relative mb-5 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-white shadow-[0_0_0_1px_#D1FAE5] flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-[#15803D] flex items-center justify-center text-white shadow-xs">
            <Check size={22} className="stroke-[3]" />
          </div>
        </div>
      </div>

      <AlertDialogHeader className="items-center text-center space-y-2 mb-2">
        <AlertDialogTitle className="text-center font-bold text-xl sm:text-2xl text-[#111827]">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-xs sm:text-sm text-[#64748B] max-w-xs leading-relaxed">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>

      {/* Structured Status Summary Pill */}
      <div className="my-4 w-full p-3 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB] flex items-center justify-between text-xs text-[#4B5563]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
          <span className="font-semibold text-[#111827]">Mintforge Production</span>
        </div>
        <span className="text-[11px] font-medium text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Ready &amp; Verified
        </span>
      </div>

      {opened && (
        <div className="w-full mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#15803D] flex items-center justify-center gap-1.5 animate-in fade-in">
          <ShieldCheck size={14} />
          <span>Navigating to workspace dashboard...</span>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="w-full space-y-2 mt-2 pt-2">
        <AlertDialogAction
          variant="success"
          onClick={handleOk}
          className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>{okText}</span>
          <ArrowRight size={14} />
        </AlertDialogAction>

        <AlertDialogCancel className="w-full py-2 border-0 bg-transparent text-[#64748B] hover:text-[#111827] hover:bg-[#F3F4F6] text-xs font-medium">
          Maybe later
        </AlertDialogCancel>
      </div>
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
