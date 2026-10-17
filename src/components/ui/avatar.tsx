"use client";

import * as React from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "busy" | "away" | "offline";

interface AvatarContextValue {
  size: AvatarSize;
  imageLoaded: boolean;
  setImageLoaded: (v: boolean) => void;
  imageError: boolean;
  setImageError: (v: boolean) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatar() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar compound components must be used within <Avatar />");
  }
  return context;
}

const sizeClasses: Record<AvatarSize, { container: string; badge: string; text: string }> = {
  sm: { container: "w-8 h-8", badge: "w-2.5 h-2.5 right-0 bottom-0", text: "text-xs" },
  md: { container: "w-10 h-10", badge: "w-3 h-3 right-0 bottom-0", text: "text-sm" },
  lg: { container: "w-12 h-12", badge: "w-3.5 h-3.5 right-0.5 bottom-0.5", text: "text-base" },
  xl: { container: "w-16 h-16", badge: "w-4 h-4 right-1 bottom-1", text: "text-lg" },
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-slate-400 dark:bg-slate-600",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = "md", className = "", children, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    return (
      <AvatarContext.Provider
        value={{ size, imageLoaded, setImageLoaded, imageError, setImageError }}
      >
        <div
          ref={ref}
          className={`relative inline-flex shrink-0 rounded-full select-none ${sizeClasses[size].container} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

export type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt = "Avatar", className = "", ...props }, ref) => {
    const { setImageLoaded, setImageError, imageError } = useAvatar();

    if (!src || imageError) return null;

    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover rounded-full ${className}`}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
}

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ initials, className = "", children, ...props }, ref) => {
  const { size, imageLoaded, imageError } = useAvatar();

  if (imageLoaded && !imageError) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`flex w-full h-full items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase ${sizeClasses[size].text} ${className}`}
      {...props}
    >
      {initials ? initials.slice(0, 2) : children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: AvatarStatus;
}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ status = "online", className = "", ...props }, ref) => {
    const { size } = useAvatar();

    return (
      <span
        ref={ref}
        aria-label={`Status: ${status}`}
        className={`absolute rounded-full border-2 border-background ring-1 ring-black/5 dark:ring-white/5 ${sizeClasses[size].badge} ${statusColors[status]} ${className}`}
        {...props}
      />
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";
