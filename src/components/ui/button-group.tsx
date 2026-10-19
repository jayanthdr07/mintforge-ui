"use client";

import * as React from "react";
import { type ButtonSize, type ButtonVariant } from "./button";

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

export type ButtonGroupOrientation = "horizontal" | "vertical";

interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  size?: ButtonSize;
  variant?: ButtonVariant;
  attached: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({
  orientation: "horizontal",
  attached: true,
});

export function useButtonGroup() {
  return React.useContext(ButtonGroupContext);
}

// ─── BUTTON GROUP CONTAINER ───────────────────────────────────────────────────

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
  size?: ButtonSize;
  variant?: ButtonVariant;
  attached?: boolean;
  role?: "group" | "toolbar";
  "aria-label"?: string;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = "horizontal",
      size,
      variant,
      attached = true,
      role = "group",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Styling when buttons are connected seamlessly
    const attachedClasses =
      orientation === "horizontal"
        ? "inline-flex items-center -space-x-px isolate [&>*:hover]:z-10 [&>*:focus-visible]:z-20 [&>*:active]:z-10 [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none"
        : "inline-flex flex-col -space-y-px items-stretch w-fit isolate [&>*:hover]:z-10 [&>*:focus-visible]:z-20 [&>*:active]:z-10 [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none";

    // Styling when buttons are spaced out (e.g. toolbar mode)
    const spacedClasses =
      orientation === "horizontal"
        ? "inline-flex items-center gap-2"
        : "inline-flex flex-col items-stretch gap-2 w-fit";

    const baseClasses = attached ? attachedClasses : spacedClasses;

    return (
      <ButtonGroupContext.Provider
        value={{ orientation, size, variant, attached }}
      >
        <div
          ref={ref}
          role={role}
          data-orientation={orientation}
          data-slot="button-group"
          className={`${baseClasses} ${className}`.trim()}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

// ─── BUTTON GROUP SEPARATOR ───────────────────────────────────────────────────

export interface ButtonGroupSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
}

export const ButtonGroupSeparator = React.forwardRef<
  HTMLDivElement,
  ButtonGroupSeparatorProps
>(({ orientation: customOrientation, className = "", ...props }, ref) => {
  const context = useButtonGroup();
  const orientation = customOrientation || context.orientation;

  const orientationClass =
    orientation === "horizontal"
      ? "h-4 w-px my-auto mx-1 bg-[#E5E7EB] shrink-0"
      : "w-full h-px mx-auto my-1 bg-[#E5E7EB] shrink-0";

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      className={`${orientationClass} ${className}`.trim()}
      {...props}
    />
  );
});
ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

// ─── BUTTON GROUP TEXT ────────────────────────────────────────────────────────

export interface ButtonGroupTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ButtonSize;
}

export const ButtonGroupText = React.forwardRef<
  HTMLSpanElement,
  ButtonGroupTextProps
>(({ size: customSize, className = "", children, ...props }, ref) => {
  const context = useButtonGroup();
  const size = customSize || context.size || "default";

  const sizeClasses: Record<"default" | "sm" | "lg" | "icon" | "md", string> = {
    sm: "h-8 px-2.5 text-xs",
    default: "h-9 px-3 text-xs",
    md: "h-9 px-3 text-xs",
    lg: "h-10 px-4 text-sm",
    icon: "h-9 w-9 p-0 justify-center",
  };

  const resolvedSizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <span
      ref={ref}
      data-slot="button-group-text"
      className={`inline-flex items-center font-medium text-[#64748B] bg-slate-50 border border-[#E5E7EB] select-none ${resolvedSizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
});
ButtonGroupText.displayName = "ButtonGroupText";
