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
import { HelpCircle, Check } from "lucide-react";

export interface AlertDialogConfirmProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  /** When true, renders an in-card static demo suitable for showcase boards without modal wrapper */
  isStaticPreview?: boolean;
}

export function AlertDialogConfirm({
  open,
  onOpenChange,
  size = "md",
  appearance = "standard",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  title = "Save your changes?",
  description = "Your updates are ready. Would you like to save them before leaving this page?",
  cancelText = "Cancel",
  confirmText = "Save changes",
  onConfirm,
  onCancel,
  trigger,
  isStaticPreview = false,
}: AlertDialogConfirmProps) {
  const [confirmed, setConfirmed] = React.useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm?.();
    setTimeout(() => setConfirmed(false), 3000);
  };

  const dialogContent = (
    <div className="flex flex-col items-center text-center">
      {/* Centered Double-Ring Lavender Icon Badge */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#F2F0FF] border-4 border-[#FFFFFF] shadow-[0_0_0_1px_#E0E7FF] flex items-center justify-center text-[#5145FF]">
          <HelpCircle size={28} className="stroke-[2.2]" />
        </div>
      </div>

      <AlertDialogHeader className="items-center text-center space-y-2 mb-2">
        <AlertDialogTitle className="text-center font-bold text-xl text-[#111827]">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-sm text-[#64748B] max-w-xs leading-relaxed">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>

      {confirmed && (
        <div className="my-3 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#15803D] text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
          <Check size={14} />
          <span>Changes saved successfully!</span>
        </div>
      )}

      <AlertDialogFooter className="w-full flex sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#EEF2F6] mt-5">
        <AlertDialogCancel
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] font-semibold text-sm transition-colors"
        >
          {cancelText}
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleConfirm}
          className="flex-1 py-2.5 rounded-xl bg-[#5145FF] text-white hover:bg-[#4338CA] font-semibold text-sm shadow-xs transition-colors"
        >
          {confirmText}
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
