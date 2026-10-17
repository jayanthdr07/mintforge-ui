"use client";

import * as React from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  RotateCw,
} from "lucide-react";

export type BubbleRole = "user" | "assistant" | "system";

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: BubbleRole;
  avatar?: React.ReactNode;
  isStreaming?: boolean;
  seamVerified?: boolean;
  seamEndpoint?: string;
  onCopy?: () => void;
  onRetry?: () => void;
}

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      role = "assistant",
      avatar,
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

    return (
      <div
        ref={ref}
        className={`flex items-start gap-3 w-full group ${
          isUser ? "flex-row-reverse" : "flex-row"
        } ${className}`}
        {...props}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {avatar !== undefined ? (
            avatar
          ) : (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shadow-xs ${
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              }`}
            >
              {isUser ? <User size={15} /> : <Bot size={15} />}
            </div>
          )}
        </div>

        {/* Message Container */}
        <div
          className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          {/* Main Bubble */}
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all shadow-xs ${
              isUser
                ? "bg-primary text-primary-foreground rounded-tr-xs"
                : "bg-card border border-border text-foreground rounded-tl-xs"
            }`}
          >
            {children}

            {/* Streaming Cursor */}
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-emerald-500 align-middle animate-pulse" />
            )}
          </div>

          {/* Assistant Footnote: Actions & Seam Check Status */}
          {!isUser && (
            <div className="flex items-center gap-3 px-1 text-xs text-muted-foreground">
              {/* Seam Contract Parity Badge */}
              {seamVerified && (
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} />
                  <span>Seam Verified</span>
                  {seamEndpoint && (
                    <span className="opacity-75">({seamEndpoint})</span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy text"
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition"
                >
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </button>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    title="Retry generation"
                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  >
                    <RotateCw size={13} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
Bubble.displayName = "Bubble";

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
      className={`w-full rounded-xl border border-border/80 bg-muted/40 overflow-hidden mb-2 text-xs ${className}`}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-left text-muted-foreground hover:text-foreground hover:bg-muted/60 transition font-medium"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-amber-500" />
          <span>{title}</span>
          {duration && (
            <span className="text-[10px] text-muted-foreground font-mono">
              ({duration})
            </span>
          )}
        </div>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>

      {isOpen && (
        <div className="px-3.5 pb-3 pt-1 border-t border-border/50 text-muted-foreground font-mono text-[11px] leading-relaxed whitespace-pre-wrap animate-in fade-in-50 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}
