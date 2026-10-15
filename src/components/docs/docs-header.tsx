"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export function DocsHeader({
  title,
  description,
  badge,
  prevHref,
  nextHref,
  copyContent,
}: {
  title: string;
  description: string;
  badge?: string;
  prevHref?: string;
  nextHref?: string;
  copyContent?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopyPage = async (type: "url" | "markdown" = "url") => {
    try {
      if (type === "url") {
        await navigator.clipboard.writeText(window.location.href);
      } else if (copyContent) {
        await navigator.clipboard.writeText(copyContent);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setShowDropdown(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mb-6">
      <div className="mf-docs-title-row">
        <div className="flex items-center gap-3">
          <h1 className="mf-docs-title">{title}</h1>
          {badge && <Badge variant="brand">{badge}</Badge>}
        </div>

        <div className="mf-docs-actions">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="mf-docs-btn-secondary"
              aria-label="Copy page actions"
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy Page"}</span>
              <ChevronDown size={13} className="opacity-70" />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-1 w-44 rounded-lg border border-border bg-card shadow-lg py-1 z-30 text-xs font-medium"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button
                  onClick={() => handleCopyPage("url")}
                  className="w-full text-left px-3 py-1.5 hover:bg-secondary text-foreground transition-colors flex items-center justify-between"
                >
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => handleCopyPage("markdown")}
                  className="w-full text-left px-3 py-1.5 hover:bg-secondary text-foreground transition-colors flex items-center justify-between"
                >
                  <span>Copy Markdown</span>
                </button>
              </div>
            )}
          </div>

          {prevHref ? (
            <Link href={prevHref} className="mf-docs-btn-icon" aria-label="Previous page">
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <button disabled className="mf-docs-btn-icon opacity-40 cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
          )}

          {nextHref ? (
            <Link href={nextHref} className="mf-docs-btn-icon" aria-label="Next page">
              <ChevronRight size={16} />
            </Link>
          ) : (
            <button disabled className="mf-docs-btn-icon opacity-40 cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      <p className="mf-docs-lead">{description}</p>
    </div>
  );
}