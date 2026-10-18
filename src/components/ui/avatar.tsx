"use client";

import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "rounded" | "square" | "squircle";
export type AvatarStatus = "online" | "busy" | "away" | "offline";
export type AvatarBadgePosition =
  | "bottom-right"
  | "top-right"
  | "top-left"
  | "bottom-left";
export type AvatarBadgeVariant = "dot" | "icon" | "count";

interface AvatarContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  imageLoaded: boolean;
  setImageLoaded: (v: boolean) => void;
  imageError: boolean;
  setImageError: (v: boolean) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

export function useAvatar() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar compound components must be used within <Avatar />");
  }
  return context;
}

const sizeClasses: Record<
  AvatarSize,
  {
    container: string;
    text: string;
    badgeDot: string;
    badgeCount: string;
    badgeOffset: Record<AvatarBadgePosition, string>;
  }
> = {
  xs: {
    container: "w-6 h-6",
    text: "text-[10px]",
    badgeDot: "w-2 h-2",
    badgeCount: "min-w-[14px] h-[14px] text-[8px] px-0.5",
    badgeOffset: {
      "bottom-right": "-bottom-0.5 -right-0.5",
      "top-right": "-top-0.5 -right-0.5",
      "bottom-left": "-bottom-0.5 -left-0.5",
      "top-left": "-top-0.5 -left-0.5",
    },
  },
  sm: {
    container: "w-8 h-8",
    text: "text-xs",
    badgeDot: "w-2.5 h-2.5",
    badgeCount: "min-w-[16px] h-[16px] text-[9px] px-1",
    badgeOffset: {
      "bottom-right": "-bottom-0.5 -right-0.5",
      "top-right": "-top-0.5 -right-0.5",
      "bottom-left": "-bottom-0.5 -left-0.5",
      "top-left": "-top-0.5 -left-0.5",
    },
  },
  md: {
    container: "w-10 h-10",
    text: "text-sm",
    badgeDot: "w-3 h-3",
    badgeCount: "min-w-[18px] h-[18px] text-[10px] px-1",
    badgeOffset: {
      "bottom-right": "bottom-0 right-0",
      "top-right": "top-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "top-left": "top-0 left-0",
    },
  },
  lg: {
    container: "w-12 h-12",
    text: "text-base",
    badgeDot: "w-3.5 h-3.5",
    badgeCount: "min-w-[20px] h-[20px] text-[11px] px-1.5",
    badgeOffset: {
      "bottom-right": "bottom-0 right-0",
      "top-right": "top-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "top-left": "top-0 left-0",
    },
  },
  xl: {
    container: "w-14 h-14",
    text: "text-lg",
    badgeDot: "w-4 h-4",
    badgeCount: "min-w-[22px] h-[22px] text-[12px] px-1.5",
    badgeOffset: {
      "bottom-right": "bottom-0.5 right-0.5",
      "top-right": "top-0.5 right-0.5",
      "bottom-left": "bottom-0.5 left-0.5",
      "top-left": "top-0.5 left-0.5",
    },
  },
  "2xl": {
    container: "w-16 h-16",
    text: "text-xl",
    badgeDot: "w-4.5 h-4.5",
    badgeCount: "min-w-[24px] h-[24px] text-xs px-2",
    badgeOffset: {
      "bottom-right": "bottom-1 right-1",
      "top-right": "top-1 right-1",
      "bottom-left": "bottom-1 left-1",
      "top-left": "top-1 left-1",
    },
  },
};

const shapeClasses: Record<AvatarShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-md",
  squircle: "rounded-[28%]",
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-[#10B981]",
  busy: "bg-[#EF4444]",
  away: "bg-[#F59E0B]",
  offline: "bg-[#94A3B8]",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  ringColor?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = "md",
      shape = "circle",
      ringColor,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const sizeConfig = sizeClasses[size] || sizeClasses.md;
    const shapeClass = shapeClasses[shape] || shapeClasses.circle;
    const ringClass = ringColor ? `ring-2 ring-offset-2 ring-offset-background ${ringColor}` : "";

    return (
      <AvatarContext.Provider
        value={{
          size,
          shape,
          imageLoaded,
          setImageLoaded,
          imageError,
          setImageError,
        }}
      >
        <div
          ref={ref}
          role="img"
          className={`relative inline-flex shrink-0 select-none ${sizeConfig.container} ${shapeClass} ${ringClass} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt = "Avatar", className = "", fallbackSrc, ...props }, ref) => {
    const { shape, setImageLoaded, setImageError, imageError } = useAvatar();
    const shapeClass = shapeClasses[shape] || shapeClasses.circle;

    if (!src || imageError) {
      if (fallbackSrc && !imageError) {
        /* eslint-disable-next-line @next/next/no-img-element */
        return (
          <img
            ref={ref}
            src={fallbackSrc}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover ${shapeClass} ${className}`}
            {...props}
          />
        );
      }
      return null;
    }

    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover ${shapeClass} ${className}`}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  delayMs?: number;
}

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ initials, className = "", children, delayMs = 0, ...props }, ref) => {
  const { size, shape, imageLoaded, imageError } = useAvatar();
  const [canRender, setCanRender] = React.useState(delayMs === 0);

  React.useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if ((imageLoaded && !imageError) || !canRender) return null;

  const sizeConfig = sizeClasses[size] || sizeClasses.md;
  const shapeClass = shapeClasses[shape] || shapeClasses.circle;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`flex w-full h-full items-center justify-center font-semibold uppercase tracking-wider ${shapeClass} ${sizeConfig.text} bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF] ${className}`}
      {...props}
    >
      {initials ? initials.slice(0, 2) : children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: AvatarStatus;
  position?: AvatarBadgePosition;
  variant?: AvatarBadgeVariant;
  count?: number | string;
  icon?: React.ReactNode;
}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  (
    {
      status = "online",
      position = "bottom-right",
      variant = "dot",
      count,
      icon,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const { size } = useAvatar();
    const sizeConfig = sizeClasses[size] || sizeClasses.md;
    const offsetClass = sizeConfig.badgeOffset[position];

    if (variant === "count" || count !== undefined) {
      return (
        <span
          ref={ref}
          aria-label={`Notification count: ${count}`}
          className={`absolute flex items-center justify-center font-bold font-mono rounded-full border-2 border-white dark:border-slate-900 bg-[#DC2626] text-white shadow-sm select-none z-10 ${sizeConfig.badgeCount} ${offsetClass} ${className}`}
          {...props}
        >
          {count ?? children}
        </span>
      );
    }

    if (variant === "icon" || icon !== undefined) {
      return (
        <span
          ref={ref}
          className={`absolute inline-flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm z-10 ${offsetClass} ${className}`}
          {...props}
        >
          {icon ?? children}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        aria-label={`Status: ${status}`}
        className={`absolute rounded-full border-2 border-white dark:border-slate-900 ring-1 ring-black/5 ${sizeConfig.badgeDot} ${statusColors[status]} ${offsetClass} z-10 ${className}`}
        {...props}
      />
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "relaxed";
  size?: AvatarSize;
  ringClass?: string;
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max,
      spacing = "tight",
      size = "md",
      ringClass = "ring-2 ring-white dark:ring-slate-900",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const validChildren = React.Children.toArray(children).filter(React.isValidElement);
    const totalCount = validChildren.length;
    const showMax = max && max > 0 && totalCount > max;
    const visibleChildren = showMax ? validChildren.slice(0, max) : validChildren;
    const overflowCount = totalCount - (max || 0);

    const spacingClasses = {
      tight: "-space-x-3",
      normal: "-space-x-2",
      relaxed: "-space-x-1",
    };

    const sizeConfig = sizeClasses[size] || sizeClasses.md;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`Group of ${totalCount} users`}
        className={`inline-flex items-center ${spacingClasses[spacing]} ${className}`}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            key: index,
            className: `${(child as React.ReactElement<{ className?: string }>).props.className || ""} ${ringClass} transition-transform hover:z-20 hover:scale-105`,
          });
        })}

        {showMax && (
          <div
            aria-label={`${overflowCount} more users`}
            className={`relative inline-flex items-center justify-center rounded-full font-semibold font-mono text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] ${ringClass} ${sizeConfig.container} ${sizeConfig.text} select-none z-10 transition-transform hover:z-20 hover:scale-105`}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
