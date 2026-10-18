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
import { Trash2, AlertTriangle, RotateCcw, Check } from "lucide-react";

export interface AlertDialogDestructiveProps {
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
  deleteText?: string;
  onDelete?: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
  isStaticPreview?: boolean;
}

export function AlertDialogDestructive({
  open,
  onOpenChange,
  size = "md",
  appearance = "standard",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  title = "You are about to delete a product",
  description = "This will delete your product from catalog. Are you sure you want to proceed?",
  cancelText = "Cancel",
  deleteText = "Delete",
  onDelete,
  onCancel,
  trigger,
  isStaticPreview = false,
}: AlertDialogDestructiveProps) {
  const [isDeleted, setIsDeleted] = React.useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
    onDelete?.();
  };

  const handleRestore = () => {
    setIsDeleted(false);
  };

  const dialogContent = (
    <div className="relative pt-6 flex flex-col items-center text-center">
      {/* Iconic Scooped Notch Header with Floating Trash Icon (Ref: Image 2) */}
      <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Curved Scooped Notch Backing */}
        <div className="relative w-24 h-12 flex items-center justify-center">
          <svg
            className="w-24 h-12 text-white drop-shadow-[0_-3px_5px_rgba(0,0,0,0.03)]"
            viewBox="0 0 96 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth inverted bell curve scallop */}
            <path d="M 0,0 C 24,0 26,44 48,44 C 70,44 72,0 96,0 Z" />
          </svg>
          <div className="absolute top-1 w-12 h-12 rounded-full flex items-center justify-center text-[#DC2626]">
            <Trash2 size={24} className="stroke-[2.2]" />
          </div>
        </div>
      </div>

      <AlertDialogHeader className="items-center text-center space-y-2.5 mb-2 mt-2">
        <AlertDialogTitle className="text-center font-bold text-lg sm:text-xl text-[#111827]">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-xs sm:text-sm text-[#64748B] max-w-xs leading-relaxed whitespace-pre-line">
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>

      {isDeleted ? (
        <div className="w-full my-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#DC2626] font-medium flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-1.5">
            <Check size={14} />
            <span>Product removed from catalog demo.</span>
          </div>
          <button
            type="button"
            onClick={handleRestore}
            className="text-[11px] font-bold text-[#5145FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>Undo</span>
          </button>
        </div>
      ) : null}

      <AlertDialogFooter className="w-full flex sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EEF2F6] mt-5">
        <AlertDialogCancel
          onClick={onCancel}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-transparent text-[#64748B] hover:text-[#111827] hover:bg-[#F3F4F6] font-semibold text-sm transition-colors"
        >
          {cancelText}
        </AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          onClick={handleDelete}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#DC2626] text-white hover:bg-red-700 font-semibold text-sm shadow-xs transition-colors"
        >
          {deleteText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );

  if (isStaticPreview) {
    return (
      <div className="w-full max-w-md mx-auto pt-8 pb-6 px-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs relative overflow-visible">
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
        className="overflow-visible pt-8"
      >
        {dialogContent}
      </AlertDialogContent>
    </AlertDialog>
  );
}
