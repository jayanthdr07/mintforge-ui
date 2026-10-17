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

export type AlertDesign = "subtle" | "rail" | "card" | "solid" | "outline";
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

function getDefaultIcon(status: AlertStatus, size: AlertSize) {
  const iconSize = size === "sm" ? 16 : size === "lg" ? 22 : 18;
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
      design = "subtle",
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
    const displayIcon =
      icon !== undefined ? icon : getDefaultIcon(activeStatus, size);

    // Dynamic style computation based on (activeStatus x design)
    const getContainerStyles = (): string => {
      if (design === "solid") {
        switch (activeStatus) {
          case "brand":
            return "bg-primary text-primary-foreground border-transparent shadow-sm";
          case "info":
            return "bg-blue-600 text-white border-transparent shadow-sm";
          case "success":
            return "bg-emerald-600 text-white border-transparent shadow-sm";
          case "warning":
            return "bg-amber-600 text-white border-transparent shadow-sm";
          case "destructive":
            return "bg-red-600 text-white border-transparent shadow-sm";
          case "neutral":
            return "bg-foreground text-background border-transparent shadow-sm";
        }
      }

      if (design === "rail") {
        const borderRail = {
          brand: "border-l-primary",
          info: "border-l-blue-500",
          success: "border-l-emerald-500",
          warning: "border-l-amber-500",
          destructive: "border-l-red-500",
          neutral: "border-l-muted-foreground",
        }[activeStatus];

        return `bg-card text-foreground border border-border border-l-4 ${borderRail} shadow-2xs`;
      }

      if (design === "card") {
        return "bg-card text-foreground border border-border shadow-xs hover:shadow-sm transition-shadow";
      }

      if (design === "outline") {
        const outlineColors = {
          brand: "border-primary/40 text-foreground",
          info: "border-blue-500/40 text-foreground",
          success: "border-emerald-500/40 text-foreground",
          warning: "border-amber-500/40 text-foreground",
          destructive: "border-red-500/40 text-foreground",
          neutral: "border-border-strong text-foreground",
        }[activeStatus];

        return `bg-transparent border ${outlineColors}`;
      }

      // Default: "subtle"
      switch (activeStatus) {
        case "brand":
          return "bg-brand-subtle text-foreground border-primary/20";
        case "info":
          return "bg-blue-500/10 text-foreground border-blue-500/20";
        case "success":
          return "bg-emerald-500/10 text-foreground border-emerald-500/20";
        case "warning":
          return "bg-amber-500/10 text-foreground border-amber-500/20";
        case "destructive":
          return "bg-red-500/10 text-foreground border-red-500/20";
        case "neutral":
          return "bg-secondary text-foreground border-border";
      }
    };

    const getIconStyles = (): string => {
      if (design === "solid") {
        return "text-white/90 bg-white/15";
      }

      switch (activeStatus) {
        case "brand":
          return "text-primary bg-primary/10 border-primary/20";
        case "info":
          return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "success":
          return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        case "warning":
          return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        case "destructive":
          return "text-red-500 bg-red-500/10 border-red-500/20";
        case "neutral":
          return "text-muted-foreground bg-muted border-border";
      }
    };

    const sizePadding = {
      sm: "p-3 gap-2.5 rounded-lg text-xs",
      md: "p-4 gap-3.5 rounded-xl text-sm",
      lg: "p-5 gap-4 rounded-2xl text-base",
    }[size];

    const iconBadgeSize = {
      sm: "w-6 h-6 rounded-md",
      md: "w-8 h-8 rounded-lg",
      lg: "w-10 h-10 rounded-xl",
    }[size];

    return (
      <div
        ref={ref}
        role="alert"
        className={`relative flex items-start border transition-all ${sizePadding} ${getContainerStyles()} ${className}`}
        {...props}
      >
        {displayIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center border border-transparent shadow-2xs ${iconBadgeSize} ${getIconStyles()}`}
          >
            {displayIcon}
          </span>
        )}

        <div className="flex-1 min-w-0 space-y-1">
          {title && (
            <h5
              className={`font-semibold tracking-tight ${
                design === "solid" ? "text-white" : "text-foreground"
              }`}
            >
              {title}
            </h5>
          )}
          {description && (
            <div
              className={`leading-relaxed ${
                size === "sm" ? "text-[11px]" : "text-xs"
              } ${
                design === "solid"
                  ? "text-white/90"
                  : "text-foreground-secondary"
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
            onClick={onClose}
            aria-label="Dismiss alert"
            className={`shrink-0 -mr-1 -mt-1 p-1 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
              design === "solid"
                ? "text-white/70 hover:text-white hover:bg-white/10 focus-visible:ring-white"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 focus-visible:ring-primary"
            }`}
          >
            <X size={size === "sm" ? 13 : 15} />
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
    className={`font-semibold tracking-tight text-foreground leading-snug ${className}`}
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
    className={`text-xs text-foreground-secondary leading-relaxed mt-0.5 ${className}`}
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
