"use client";

import * as React from "react";

export type BadgeAppearance = "solid" | "soft" | "outline" | "ghost";
export type BadgeVariant =
  | "default"
  | "brand"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "destructive"
  | "neutral"
  | "lavender"
  | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill" | "square";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  appearance?: BadgeAppearance;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const appearanceStyles: Record<
  BadgeAppearance,
  Record<BadgeVariant, string>
> = {
  solid: {
    default: "bg-[#1E293B] text-white border-transparent",
    brand: "bg-[#5145FF] text-white border-transparent shadow-xs",
    primary: "bg-[#3B82F6] text-white border-transparent shadow-xs",
    info: "bg-[#0284C7] text-white border-transparent shadow-xs",
    success: "bg-[#16A34A] text-white border-transparent shadow-xs",
    warning: "bg-[#EA580C] text-white border-transparent shadow-xs",
    destructive: "bg-[#DC2626] text-white border-transparent shadow-xs",
    neutral: "bg-[#475569] text-white border-transparent",
    lavender: "bg-[#6366F1] text-white border-transparent shadow-xs",
    outline: "bg-transparent text-foreground border-border-strong",
  },
  soft: {
    default: "bg-slate-100 text-slate-700 border-slate-200/70",
    brand: "bg-[#F2F0FF] text-[#5145FF] border-[#E0DAFF]",
    primary: "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]",
    info: "bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]",
    success: "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]",
    warning: "bg-[#FFEDD5] text-[#EA580C] border-[#FED7AA]",
    destructive: "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]",
    neutral: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    lavender: "bg-[#F2F0FF] text-[#5145FF] border-[#E0DAFF]",
    outline: "bg-transparent text-foreground border-border-strong",
  },
  outline: {
    default: "bg-transparent text-slate-700 border-slate-300",
    brand: "bg-transparent text-[#5145FF] border-[#5145FF]/40",
    primary: "bg-transparent text-[#2563EB] border-[#3B82F6]/50",
    info: "bg-transparent text-[#0284C7] border-[#0284C7]/40",
    success: "bg-transparent text-[#16A34A] border-[#16A34A]/50",
    warning: "bg-transparent text-[#EA580C] border-[#EA580C]/50",
    destructive: "bg-transparent text-[#DC2626] border-[#DC2626]/50",
    neutral: "bg-transparent text-[#64748B] border-[#CBD5E1]",
    lavender: "bg-transparent text-[#6366F1] border-[#6366F1]/40",
    outline: "bg-transparent text-slate-700 border-slate-300",
  },
  ghost: {
    default: "bg-transparent text-slate-700 border-transparent hover:bg-slate-100",
    brand: "bg-transparent text-[#5145FF] border-transparent hover:bg-[#F2F0FF]",
    primary: "bg-transparent text-[#2563EB] border-transparent hover:bg-[#EFF6FF]",
    info: "bg-transparent text-[#0284C7] border-transparent hover:bg-[#F0F9FF]",
    success: "bg-transparent text-[#16A34A] border-transparent hover:bg-[#DCFCE7]",
    warning: "bg-transparent text-[#D97706] border-transparent hover:bg-[#FFEDD5]",
    destructive: "bg-transparent text-[#DC2626] border-transparent hover:bg-[#FEE2E2]",
    neutral: "bg-transparent text-[#64748B] border-transparent hover:bg-[#F1F5F9]",
    lavender: "bg-transparent text-[#6366F1] border-transparent hover:bg-[#F2F0FF]",
    outline: "bg-transparent text-foreground border-border-strong",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "px-1.5 py-0.5 text-[10px] gap-1",
  sm: "px-2 py-0.5 text-[11px] gap-1.5",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3.5 py-1.5 text-sm gap-2",
};

const shapeStyles: Record<BadgeShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-sm",
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className = "",
      appearance = "soft",
      variant = "default",
      size = "md",
      shape = "pill",
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    // Backwards compatibility for variant="outline"
    const effectiveAppearance = variant === "outline" ? "outline" : appearance;
    const effectiveVariant = variant === "outline" ? "default" : variant;

    const appearanceClass =
      appearanceStyles[effectiveAppearance]?.[effectiveVariant] ||
      appearanceStyles.soft[effectiveVariant] ||
      appearanceStyles.soft.default;

    const sizeClass = sizeStyles[size] || sizeStyles.md;
    const shapeClass = shapeStyles[shape] || shapeStyles.pill;

    return (
      <div
        ref={ref}
        role="status"
        className={`inline-flex items-center justify-center font-medium border select-none transition-all duration-150 ${shapeClass} ${sizeClass} ${appearanceClass} ${className}`}
        {...props}
      >
        {leadingIcon && <span className="inline-flex shrink-0">{leadingIcon}</span>}
        <span>{children}</span>
        {trailingIcon && <span className="inline-flex shrink-0">{trailingIcon}</span>}
      </div>
    );
  }
);
Badge.displayName = "Badge";

// ─── COMPOUND SUBCOMPONENTS ──────────────────────────────────────────────────

export interface BadgeDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "online" | "active" | "offline" | "failed" | "pending" | "review";
  ping?: boolean;
}

const dotColors: Record<string, string> = {
  online: "bg-[#10B981]",
  active: "bg-[#10B981]",
  offline: "bg-[#94A3B8]",
  failed: "bg-[#EF4444]",
  pending: "bg-[#F59E0B]",
  review: "bg-[#EA580C]",
};

export const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(
  ({ status = "active", ping = false, className = "", ...props }, ref) => {
    const colorClass = dotColors[status] || dotColors.active;

    return (
      <span ref={ref} className={`relative flex h-2 w-2 shrink-0 ${className}`} {...props}>
        {ping && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${colorClass}`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${colorClass}`} />
      </span>
    );
  }
);
BadgeDot.displayName = "BadgeDot";

export interface BadgeCountProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number | string;
}

export const BadgeCount = React.forwardRef<HTMLSpanElement, BadgeCountProps>(
  ({ count, className = "", ...props }, ref) => (
    <span
      ref={ref}
      className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold font-mono bg-black/10 dark:bg-white/10 ${className}`}
      {...props}
    >
      {count}
    </span>
  )
);
BadgeCount.displayName = "BadgeCount";
