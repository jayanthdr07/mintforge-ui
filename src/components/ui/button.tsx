import { Loader2 } from "lucide-react";
import React from "react";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium whitespace-nowrap shrink-0 transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const variantStyles: Record<ButtonVariant, string> = {
      default:
        "bg-[#5145FF] text-white hover:bg-[#4338CA] shadow-xs active:bg-[#3730A3]",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200/80 border border-slate-200/60 shadow-2xs",
      outline:
        "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-2xs",
      ghost:
        "bg-transparent text-[#111827] hover:bg-slate-100/80 active:bg-slate-200/60",
      destructive:
        "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-xs active:bg-[#991B1B]",
      link:
        "bg-transparent text-[#5145FF] underline-offset-4 hover:underline hover:text-[#4338CA] p-0 h-auto font-medium shadow-none active:scale-100",
    };

    // Support both "default" and "md" for full backwards-compatibility
    const resolvedSize = size === "md" ? "default" : size;

    const sizeStyles: Record<"default" | "sm" | "lg" | "icon", string> = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
      default: "h-9 px-3.5 py-2 text-xs font-medium gap-2 rounded-lg",
      lg: "h-10 px-5 text-sm font-medium gap-2.5 rounded-lg",
      icon: "h-9 w-9 p-0 text-xs rounded-lg shrink-0 justify-center",
    };

    // If variant is link, ignore fixed height from size unless explicitly needed
    const sizeClass =
      variant === "link"
        ? size === "icon"
          ? "p-1"
          : "text-sm"
        : sizeStyles[resolvedSize] || sizeStyles.default;

    const mergedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeClass} ${className}`.trim();

    // asChild slot composition pattern without external dependencies
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        disabled?: boolean;
        "aria-busy"?: boolean;
        children?: React.ReactNode;
      }>;

      return React.cloneElement(child, {
        className: `${mergedClassName} ${child.props.className || ""}`.trim(),
        disabled: disabled || isLoading || child.props.disabled,
        "aria-busy": isLoading || undefined,
        children: (
          <>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
            ) : (
              leftIcon
            )}
            {child.props.children}
            {!isLoading && rightIcon}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : undefined}
        className={mergedClassName}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";