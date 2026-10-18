"use client";

import * as React from "react";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export type AlertStatus =
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "destructive"
  | "neutral";

export type AlertDesign =
  | "morph"
  | "subtle"
  | "rail"
  | "card"
  | "solid"
  | "outline"
  | "floating";

export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: AlertStatus;
  /** Backwards compatibility alias for status */
  variant?: AlertStatus;
  design?: AlertDesign;
  size?: AlertSize;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}

export function getDefaultAlertIcon(status: AlertStatus, size: AlertSize = "md") {
  const iconSize = size === "sm" ? 15 : size === "lg" ? 20 : 17;
  switch (status) {
    case "brand":
      return <Sparkles size={iconSize} />;
    case "info":
      return <Info size={iconSize} />;
    case "success":
      return <CheckCircle2 size={iconSize} />;
    case "warning":
      return <AlertTriangle size={iconSize} />;
    case "destructive":
      return <AlertOctagon size={iconSize} />;
    case "neutral":
      return <HelpCircle size={iconSize} />;
  }
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status,
      variant = "brand",
      design = "morph",
      size = "md",
      icon,
      title,
      description,
      action,
      onClose,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const activeStatus = status || variant;
    const [isDismissed, setIsDismissed] = React.useState(false);

    if (isDismissed) {
      return null;
    }

    const handleDismiss = () => {
      setIsDismissed(true);
      onClose?.();
    };

    const displayIcon =
      icon !== undefined ? icon : getDefaultAlertIcon(activeStatus, size);

    // Dynamic container styles
    const getContainerStyles = (): string => {
      // 1. Signature Morph (Elevated white card with soft ambient color tint & refined border)
      if (design === "morph") {
        const morphStyles = {
          brand: "bg-white border-[#E0E7FF] hover:border-[#C7D2FE] shadow-[0_4px_20px_-2px_rgba(81,69,255,0.07)] text-[#111827]",
          info: "bg-white border-blue-100 hover:border-blue-200 shadow-[0_4px_20px_-2px_rgba(59,130,246,0.07)] text-[#111827]",
          success: "bg-white border-emerald-100 hover:border-emerald-200 shadow-[0_4px_20px_-2px_rgba(16,185,129,0.07)] text-[#111827]",
          warning: "bg-white border-amber-100 hover:border-amber-200 shadow-[0_4px_20px_-2px_rgba(245,158,11,0.07)] text-[#111827]",
          destructive: "bg-white border-red-100 hover:border-red-200 shadow-[0_4px_20px_-2px_rgba(239,68,68,0.07)] text-[#111827]",
          neutral: "bg-white border-[#E5E7EB] hover:border-[#D1D5DB] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] text-[#111827]",
        }[activeStatus];

        return `border rounded-2xl ${morphStyles}`;
      }

      // 2. Floating Glass (Floating pill/banner with backdrop blur)
      if (design === "floating") {
        const floatingGlow = {
          brand: "shadow-[0_8px_30px_rgba(81,69,255,0.12)] border-[#E0E7FF]/80",
          info: "shadow-[0_8px_30px_rgba(59,130,246,0.12)] border-blue-200/80",
          success: "shadow-[0_8px_30px_rgba(16,185,129,0.12)] border-emerald-200/80",
          warning: "shadow-[0_8px_30px_rgba(245,158,11,0.12)] border-amber-200/80",
          destructive: "shadow-[0_8px_30px_rgba(239,68,68,0.12)] border-red-200/80",
          neutral: "shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[#E5E7EB]",
        }[activeStatus];

        return `backdrop-blur-md bg-white/95 border rounded-2xl ${floatingGlow} text-[#111827]`;
      }

      // 3. Rail (4px left border accent)
      if (design === "rail") {
        const borderRail = {
          brand: "border-l-[#5145FF]",
          info: "border-l-blue-500",
          success: "border-l-emerald-500",
          warning: "border-l-amber-500",
          destructive: "border-l-red-500",
          neutral: "border-l-gray-400",
        }[activeStatus];

        return `bg-white text-[#111827] border border-[#E5E7EB] border-l-4 ${borderRail} rounded-xl shadow-xs`;
      }

      // 4. Solid (Vibrant filled banner for critical notices)
      if (design === "solid") {
        switch (activeStatus) {
          case "brand":
            return "bg-[#5145FF] text-white border-transparent shadow-sm rounded-xl";
          case "info":
            return "bg-blue-600 text-white border-transparent shadow-sm rounded-xl";
          case "success":
            return "bg-emerald-600 text-white border-transparent shadow-sm rounded-xl";
          case "warning":
            return "bg-amber-500 text-white border-transparent shadow-sm rounded-xl";
          case "destructive":
            return "bg-red-600 text-white border-transparent shadow-sm rounded-xl";
          case "neutral":
            return "bg-[#111827] text-white border-transparent shadow-sm rounded-xl";
        }
      }

      // 5. Card (Neutral boxed card)
      if (design === "card") {
        return "bg-white text-[#111827] border border-[#E5E7EB] rounded-xl shadow-xs hover:border-[#D1D5DB] transition-colors";
      }

      // 6. Outline (Clean transparent background with colored border)
      if (design === "outline") {
        const outlineColors = {
          brand: "border-[#5145FF]/40 text-[#111827]",
          info: "border-blue-500/40 text-[#111827]",
          success: "border-emerald-500/40 text-[#111827]",
          warning: "border-amber-500/40 text-[#111827]",
          destructive: "border-red-500/40 text-[#111827]",
          neutral: "border-[#9CA3AF] text-[#111827]",
        }[activeStatus];

        return `bg-transparent border rounded-xl ${outlineColors}`;
      }

      // 7. Subtle (Default light pastel wash)
      switch (activeStatus) {
        case "brand":
          return "bg-[#EEF2FF] text-[#111827] border border-[#E0E7FF] rounded-xl";
        case "info":
          return "bg-blue-50 text-[#111827] border border-blue-100 rounded-xl";
        case "success":
          return "bg-emerald-50 text-[#111827] border border-emerald-100 rounded-xl";
        case "warning":
          return "bg-amber-50 text-[#111827] border border-amber-100 rounded-xl";
        case "destructive":
          return "bg-red-50 text-[#111827] border border-red-100 rounded-xl";
        case "neutral":
          return "bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] rounded-xl";
      }
    };

    // Dynamic icon container styles
    const getIconBadgeStyles = (): string => {
      if (design === "solid") {
        return "text-white bg-white/20";
      }

      switch (activeStatus) {
        case "brand":
          return "text-[#5145FF] bg-[#EEF2FF] border border-[#E0E7FF]";
        case "info":
          return "text-blue-600 bg-blue-50 border border-blue-200/60";
        case "success":
          return "text-emerald-600 bg-emerald-50 border border-emerald-200/60";
        case "warning":
          return "text-amber-600 bg-amber-50 border border-amber-200/60";
        case "destructive":
          return "text-red-600 bg-red-50 border border-red-200/60";
        case "neutral":
          return "text-gray-600 bg-gray-100 border border-gray-200";
      }
    };

    const sizePadding = {
      sm: "p-3 gap-2.5 text-xs",
      md: "p-4 gap-3.5 text-sm",
      lg: "p-5 gap-4 text-base",
    }[size];

    const iconBadgeSize = {
      sm: "w-7 h-7 rounded-lg text-xs",
      md: "w-9 h-9 rounded-xl text-sm",
      lg: "w-11 h-11 rounded-2xl text-base",
    }[size];

    return (
      <div
        ref={ref}
        role={activeStatus === "destructive" ? "alert" : "status"}
        aria-live={activeStatus === "destructive" ? "assertive" : "polite"}
        className={`relative flex items-start transition-all duration-200 ${sizePadding} ${getContainerStyles()} ${className}`}
        {...props}
      >
        {displayIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center shadow-2xs ${iconBadgeSize} ${getIconBadgeStyles()}`}
          >
            {displayIcon}
          </span>
        )}

        <div className="flex-1 min-w-0 space-y-1">
          {title && (
            <h5
              className={`font-semibold tracking-tight text-sm leading-snug ${
                design === "solid" ? "text-white" : "text-[#111827]"
              }`}
            >
              {title}
            </h5>
          )}
          {description && (
            <div
              className={`leading-relaxed ${
                size === "sm" ? "text-[11.5px]" : "text-xs"
              } ${
                design === "solid"
                  ? "text-white/90"
                  : "text-[#4B5563]"
              }`}
            >
              {description}
            </div>
          )}
          {children}
        </div>

        {action && (
          <div className="shrink-0 self-center pl-2">
            {action}
          </div>
        )}

        {onClose && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            className={`shrink-0 -mr-1 -mt-1 p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
              design === "solid"
                ? "text-white/70 hover:text-white hover:bg-white/15 focus-visible:ring-white"
                : "text-[#9CA3AF] hover:text-[#111827] hover:bg-black/5 focus-visible:ring-[#5145FF]"
            }`}
          >
            <X size={size === "sm" ? 14 : 16} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

// ─── COMPOUND SUBCOMPONENTS ──────────────────────────────────────────────────

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h5
    ref={ref}
    className={`font-semibold tracking-tight text-[#111827] text-sm leading-snug ${className}`}
    {...props}
  >
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-xs text-[#4B5563] leading-relaxed mt-0.5 ${className}`}
    {...props}
  >
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

export const AlertAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex items-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </div>
));
AlertAction.displayName = "AlertAction";
