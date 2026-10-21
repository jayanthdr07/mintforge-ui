import * as React from "react";

export type CardSize = "default" | "sm";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        data-size={size}
        className={`group/card rounded-xl border border-[#E5E7EB] bg-white text-[#111827] shadow-xs transition-shadow hover:shadow-sm ${
          size === "sm" ? "text-sm" : ""
        } ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={`grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1.5 p-6 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:gap-1 ${className}`}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <h3
        ref={ref}
        data-slot="card-title"
        className={`col-start-1 text-lg font-semibold leading-none tracking-tight text-[#111827] group-data-[size=sm]/card:text-base ${className}`}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={`col-start-1 text-sm text-[#64748B] group-data-[size=sm]/card:text-xs ${className}`}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

export type CardActionProps = React.HTMLAttributes<HTMLDivElement>;

export const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={`col-start-2 row-span-2 row-start-1 flex items-center justify-end self-start gap-2 ${className}`}
        {...props}
      />
    );
  }
);
CardAction.displayName = "CardAction";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={`col-span-2 p-6 pt-0 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:pt-0 ${className}`}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={`flex items-center p-6 pt-0 group-data-[size=sm]/card:p-4 group-data-[size=sm]/card:pt-0 ${className}`}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";
