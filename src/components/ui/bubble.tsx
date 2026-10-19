"use client";

import * as React from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  RotateCw,
} from "lucide-react";

export type BubbleVariant =
  | "default"
  | "secondary"
  | "muted"
  | "tinted"
  | "outline"
  | "ghost"
  | "destructive";

export type BubbleAlign = "start" | "end";
export type BubbleRole = "user" | "assistant" | "system";

interface BubbleContextValue {
  variant: BubbleVariant;
  align: BubbleAlign;
}

const BubbleContext = React.createContext<BubbleContextValue>({
  variant: "default",
  align: "start",
});

export function useBubble() {
  return React.useContext(BubbleContext);
}

const variantStyles: Record<BubbleVariant, string> = {
  default:
    "bg-[#5145FF] text-white border-transparent shadow-[0_2px_8px_rgba(81,69,255,0.18)] [&_a]:text-white [&_a]:underline [&_button]:text-white",
  secondary:
    "bg-white text-[#111827] border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#D1D5DB] [&_a]:text-[#5145FF] [&_a]:underline",
  muted:
    "bg-[#F1F5F9] text-[#1E293B] border-transparent [&_a]:text-[#2563EB] [&_a]:underline",
  tinted:
    "bg-[#F5F3FF] text-[#5145FF] border-[#E0DAFF] [&_a]:text-[#4338CA] [&_a]:underline",
  outline:
    "bg-white text-[#111827] border-[#CBD5E1] hover:border-[#94A3B8] [&_a]:text-[#5145FF] [&_a]:underline",
  ghost:
    "bg-transparent text-[#111827] border-transparent hover:bg-slate-100/70 [&_a]:text-[#5145FF] [&_a]:underline",
  destructive:
    "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA] [&_a]:text-[#B91C1C] [&_a]:underline",
};

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant;
  align?: BubbleAlign;
  // Conversational metadata
  name?: string;
  timestamp?: string;
  avatar?: React.ReactNode;
  // AI assistant backwards-compatibility properties
  role?: BubbleRole;
  isStreaming?: boolean;
  seamVerified?: boolean;
  seamEndpoint?: string;
  onCopy?: () => void;
  onRetry?: () => void;
}

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      variant,
      align,
      name,
      timestamp,
      avatar,
      role,
      isStreaming = false,
      seamVerified = false,
      seamEndpoint,
      onCopy,
      onRetry,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isUser = role === "user";
    const resolvedAlign: BubbleAlign =
      align !== undefined ? align : isUser ? "end" : "start";
    const resolvedVariant: BubbleVariant =
      variant !== undefined
        ? variant
        : isUser
        ? "default"
        : "secondary";

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        const textToCopy = typeof children === "string" ? children : "";
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy);
        }
      }
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    };

    // If role, avatar, name, or timestamp is provided, wrap in an authentic conversation item
    if (role !== undefined || avatar !== undefined || name !== undefined || timestamp !== undefined) {
      return (
        <BubbleContext.Provider
          value={{ variant: resolvedVariant, align: resolvedAlign }}
        >
          <div
            ref={ref}
            data-slot="bubble-item"
            data-align={resolvedAlign}
            className={`flex items-start gap-2.5 w-full group ${
              resolvedAlign === "end" ? "flex-row-reverse" : "flex-row"
            } ${className}`}
            {...props}
          >
            {/* Avatar Slot */}
            {(avatar !== undefined || role !== undefined) && (
              <div className="shrink-0 mt-0.5">
                {avatar !== undefined ? (
                  avatar
                ) : (
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-2xs select-none ${
                      isUser
                        ? "bg-[#5145FF] text-white"
                        : "bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF]"
                    }`}
                  >
                    {isUser ? <User size={13} /> : <Bot size={13} />}
                  </div>
                )}
              </div>
            )}

            {/* Message Stack */}
            <div
              className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[78%] ${
                resolvedAlign === "end" ? "items-end" : "items-start"
              }`}
            >
              {/* Header: Name & Timestamp */}
              {(name || timestamp) && (
                <div
                  className={`flex items-center gap-1.5 px-1 text-[11px] font-medium text-[#64748B] ${
                    resolvedAlign === "end" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {name && <span className="font-semibold text-[#111827]">{name}</span>}
                  {name && timestamp && <span className="text-[#94A3B8]">•</span>}
                  {timestamp && <span className="text-[#94A3B8]">{timestamp}</span>}
                </div>
              )}

              {/* Speech Bubble Container */}
              <div
                className={`relative rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed border transition-all duration-150 ${
                  variantStyles[resolvedVariant]
                } ${
                  resolvedAlign === "end"
                    ? "rounded-br-[4px] text-left"
                    : "rounded-bl-[4px] text-left"
                }`}
              >
                {children}

                {/* Streaming Indicator */}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#10B981] align-middle animate-pulse" />
                )}
              </div>

              {/* Assistant Footer Accessories */}
              {!isUser && (seamVerified || onRetry || onCopy) && (
                <div className="flex items-center gap-2 px-1 text-xs text-[#64748B]">
                  {seamVerified && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#15803D] bg-[#DCFCE7] border border-[#BBF7D0] px-2 py-0.5 rounded-full">
                      <ShieldCheck size={11} />
                      <span>Seam Verified</span>
                      {seamEndpoint && (
                        <span className="opacity-75">({seamEndpoint})</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={handleCopy}
                      title="Copy text"
                      aria-label="Copy text"
                      className="p-1 rounded hover:bg-slate-200/60 text-[#64748B] hover:text-[#111827] transition"
                    >
                      {copied ? (
                        <Check size={12} className="text-[#15803D]" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                    {onRetry && (
                      <button
                        type="button"
                        onClick={onRetry}
                        title="Retry generation"
                        aria-label="Retry generation"
                        className="p-1 rounded hover:bg-slate-200/60 text-[#64748B] hover:text-[#111827] transition"
                      >
                        <RotateCw size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </BubbleContext.Provider>
      );
    }

    // Standard Composable Bubble
    return (
      <BubbleContext.Provider
        value={{ variant: resolvedVariant, align: resolvedAlign }}
      >
        <div
          ref={ref}
          data-slot="bubble"
          data-variant={resolvedVariant}
          data-align={resolvedAlign}
          className={`relative flex w-fit max-w-[85%] sm:max-w-[78%] min-w-0 flex-col gap-1 ${
            resolvedAlign === "end" ? "self-end ml-auto" : "self-start mr-auto"
          } ${className}`}
          {...props}
        >
          {children}
        </div>
      </BubbleContext.Provider>
    );
  }
);
Bubble.displayName = "Bubble";

// ─── BUBBLE CONTENT ──────────────────────────────────────────────────────────

export type BubbleContentProps = React.HTMLAttributes<HTMLDivElement>;

export const BubbleContent = React.forwardRef<
  HTMLDivElement,
  BubbleContentProps
>(({ className = "", children, ...props }, ref) => {
  const { variant, align } = useBubble();

  return (
    <div
      ref={ref}
      data-slot="bubble-content"
      className={`relative w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border px-3.5 py-2.5 text-sm leading-relaxed break-words transition-all duration-150 ${
        variantStyles[variant]
      } ${
        align === "end"
          ? "rounded-br-[4px] ml-auto text-left"
          : "rounded-bl-[4px] mr-auto text-left"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
BubbleContent.displayName = "BubbleContent";

// ─── BUBBLE GROUP ────────────────────────────────────────────────────────────

export interface BubbleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: BubbleAlign;
}

export const BubbleGroup = React.forwardRef<HTMLDivElement, BubbleGroupProps>(
  ({ align = "start", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="bubble-group"
        className={`flex flex-col gap-1 w-full ${
          align === "end" ? "items-end" : "items-start"
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BubbleGroup.displayName = "BubbleGroup";

// ─── BUBBLE REACTIONS ────────────────────────────────────────────────────────

export interface BubbleReactionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom";
  align?: "start" | "end";
}

export const BubbleReactions = React.forwardRef<
  HTMLDivElement,
  BubbleReactionsProps
>(({ side = "bottom", align = "start", className = "", children, ...props }, ref) => {
  const sideClass =
    side === "top"
      ? "-top-2.5 -translate-y-1/2"
      : "-bottom-2.5 translate-y-1/2";

  const alignClass = align === "end" ? "right-2" : "left-2";

  return (
    <div
      ref={ref}
      data-slot="bubble-reactions"
      role="img"
      className={`absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-white dark:bg-slate-900 border border-[#E5E7EB] px-2 py-0.5 text-xs shadow-xs ring-2 ring-white dark:ring-slate-900 select-none ${sideClass} ${alignClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
BubbleReactions.displayName = "BubbleReactions";

// ─── BUBBLE ACTIONS ──────────────────────────────────────────────────────────

export interface BubbleActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: BubbleAlign;
}

export const BubbleActions = React.forwardRef<
  HTMLDivElement,
  BubbleActionsProps
>(({ align = "start", className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="bubble-actions"
      className={`flex items-center gap-1 text-[#64748B] pt-0.5 ${
        align === "end" ? "justify-end" : "justify-start"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
BubbleActions.displayName = "BubbleActions";

// ─── BUBBLE COLLAPSIBLE ──────────────────────────────────────────────────────

export interface BubbleCollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
}

export const BubbleCollapsible = React.forwardRef<
  HTMLDivElement,
  BubbleCollapsibleProps
>(({ defaultExpanded = false, className = "", children, ...props }, ref) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div
      ref={ref}
      data-slot="bubble-collapsible"
      data-expanded={expanded}
      className={`relative ${className}`}
      {...props}
    >
      <div className={expanded ? "" : "line-clamp-2"}>{children}</div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold hover:underline opacity-90 cursor-pointer"
        aria-expanded={expanded}
      >
        <span>{expanded ? "Show less" : "Show more"}</span>
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
    </div>
  );
});
BubbleCollapsible.displayName = "BubbleCollapsible";

// ─── BUBBLE THINKING (REASONING DRAWER) ───────────────────────────────────────

export interface BubbleThinkingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  duration?: string;
  title?: string;
}

export function BubbleThinking({
  defaultOpen = false,
  duration,
  title = "Thinking Process",
  className = "",
  children,
  ...props
}: BubbleThinkingProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div
      className={`w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] overflow-hidden mb-2 text-xs ${className}`}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-left text-[#64748B] hover:text-[#111827] hover:bg-slate-100/60 transition font-medium"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-[#5145FF]" />
          <span className="font-semibold text-[#111827]">{title}</span>
          {duration && (
            <span className="text-[10px] text-[#64748B] font-mono bg-white px-1.5 py-0.2 rounded border border-[#E5E7EB]">
              {duration}
            </span>
          )}
        </div>
        {isOpen ? <ChevronDown size={14} /> : <ChevronDown size={14} className="-rotate-90" />}
      </button>

      {isOpen && (
        <div className="px-3 pb-2.5 pt-1 border-t border-[#E5E7EB] text-[#475569] font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
