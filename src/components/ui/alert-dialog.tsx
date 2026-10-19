"use client";

import * as React from "react";
import { X } from "lucide-react";

export type AlertDialogSize = "sm" | "md" | "lg";
export type AlertDialogAppearance = "standard" | "tinted" | "bordered";

export interface AlertDialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  closeOnEscape: boolean;
  closeOnOverlayClick: boolean;
}

const AlertDialogContext = React.createContext<AlertDialogContextType | null>(null);

export function useAlertDialog() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    return {
      open: true,
      setOpen: () => {},
      titleId: "alert-dialog-title",
      descriptionId: "alert-dialog-description",
      closeOnEscape: false,
      closeOnOverlayClick: false,
    };
  }
  return context;
}

export interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
}

export function AlertDialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  closeOnOverlayClick = true,
}: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const titleId = React.useId();
  const descriptionId = React.useId();

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <AlertDialogContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
        closeOnEscape,
        closeOnOverlayClick,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactElement;
}

export function AlertDialogTrigger({ children }: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialog();

  const child = children as React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
  }>;

  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      child.props?.onClick?.(e);
      setOpen(true);
    },
  });
}

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: AlertDialogSize;
  appearance?: AlertDialogAppearance;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(
  (
    {
      className = "",
      size = "md",
      appearance = "standard",
      showCloseButton = true,
      children,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, titleId, descriptionId, closeOnEscape, closeOnOverlayClick } =
      useAlertDialog();
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    // Sync refs
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // Escape listener & Body scroll locking & Focus trap
    React.useEffect(() => {
      if (!open) return;

      const previousActiveElement = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus first focusable element inside modal
      const focusableSelector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const focusable = contentRef.current.querySelectorAll<HTMLElement>(focusableSelector);
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            contentRef.current.focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape) {
          e.preventDefault();
          setOpen(false);
          return;
        }

        // Accessible Focus Trap within modal
        if (e.key === "Tab" && contentRef.current) {
          const focusable = Array.from(
            contentRef.current.querySelectorAll<HTMLElement>(focusableSelector)
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow || "unset";
        window.removeEventListener("keydown", handleKeyDown);
        previousActiveElement?.focus();
      };
    }, [open, closeOnEscape, setOpen]);

    if (!open) return null;

    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-xl",
    }[size];

    const appearanceClasses = {
      standard: "bg-white border-[#E5E7EB] text-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
      tinted: "bg-[#FAFAFF] border-[#E0E7FF] text-[#111827] shadow-[0_20px_50px_rgba(81,69,255,0.08)]",
      bordered: "bg-white border-2 border-[#CBD5E1] text-[#111827] shadow-[0_16px_40px_rgba(0,0,0,0.08)]",
    }[appearance];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-[4px] transition-opacity duration-200 animate-in fade-in"
          onClick={() => {
            if (closeOnOverlayClick) setOpen(false);
          }}
          aria-hidden="true"
        />

        {/* Modal Surface */}
        <div
          ref={setRefs}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={`relative z-10 w-full ${sizeClasses} rounded-2xl sm:rounded-3xl border p-6 sm:p-7 transition-all duration-200 animate-in zoom-in-95 fade-in focus:outline-none ${appearanceClasses} ${className}`}
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full text-[#64748B] hover:text-[#111827] hover:bg-black/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF]"
            >
              <X size={16} />
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);
AlertDialogContent.displayName = "AlertDialogContent";

export function AlertDialogHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col space-y-2 text-left ${className}`}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useAlertDialog();
  return (
    <h3
      id={titleId}
      className={`text-lg sm:text-xl font-bold text-[#111827] leading-snug tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function AlertDialogDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useAlertDialog();
  return (
    <p
      id={descriptionId}
      className={`text-xs sm:text-sm text-[#64748B] leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function AlertDialogFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 mt-6 border-t border-[#EEF2F6] ${className}`}
      {...props}
    />
  );
}

export type AlertDialogCancelProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ className = "", children = "Cancel", onClick, ...props }, ref) => {
  const { setOpen } = useAlertDialog();

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={`w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";

export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "success";
}

export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(
  (
    {
      variant = "default",
      className = "",
      children = "Continue",
      onClick,
      ...props
    },
    ref
  ) => {
    const { setOpen } = useAlertDialog();

    const variantStyles = {
      default:
        "bg-[#5145FF] text-white hover:bg-[#4338CA] shadow-sm focus-visible:ring-[#5145FF]",
      destructive:
        "bg-[#DC2626] text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-500",
      success:
        "bg-[#15803D] text-white hover:bg-emerald-800 shadow-sm focus-visible:ring-emerald-500",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          onClick?.(e);
          setOpen(false);
        }}
        className={`w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, onClick, ...props }, ref) => {
  const { setOpen } = useAlertDialog();
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      aria-label="Close dialog"
      className={className}
      {...props}
    >
      {children || <X size={16} />}
    </button>
  );
});
AlertDialogClose.displayName = "AlertDialogClose";

// Re-export presets and preset types for convenient unified import
export * from "./alert-dialog/alert-dialog.types";
export * from "./alert-dialog/alert-dialog-confirm";
export * from "./alert-dialog/alert-dialog-destructive";
export * from "./alert-dialog/alert-dialog-form";
export * from "./alert-dialog/alert-dialog-success";
export * from "./alert-dialog/alert-dialog-detail";
