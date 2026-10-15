import { Loader2 } from "lucide-react";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-[var(--mf-radius-md)]";

    const variantStyles = {
      default:
        "bg-[var(--mf-brand)] text-white hover:bg-[var(--mf-brand-hover)] focus-visible:ring-[var(--mf-brand)] shadow-sm",
      secondary:
        "bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-tertiary)] focus-visible:ring-[var(--mf-border)] border border-[var(--mf-border)]",
      outline:
        "bg-transparent text-[var(--mf-foreground)] border border-[var(--mf-border)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      ghost:
        "bg-transparent text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
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