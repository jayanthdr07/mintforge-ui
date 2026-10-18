"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export type AlertDialogNavType =
  | "confirm"
  | "destructive"
  | "form"
  | "success"
  | "detail"
  | "playground";

export interface AlertDialogVariantNavProps {
  activeVariant: AlertDialogNavType;
  onSelectVariant: (variant: AlertDialogNavType) => void;
  onScrollToDocs?: () => void;
}

export function AlertDialogVariantNav({
  activeVariant,
  onSelectVariant,
  onScrollToDocs,
}: AlertDialogVariantNavProps) {
  const tabs: { id: AlertDialogNavType; label: string }[] = [
    { id: "confirm", label: "Confirm Dialog" },
    { id: "destructive", label: "Destructive Dialog" },
    { id: "form", label: "Form Dialog" },
    { id: "success", label: "Success Dialog" },
    { id: "detail", label: "Detail Dialog" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#E5E7EB]">
      {/* Tab Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectVariant(tab.id)}
            className={`mf-acc-pill-btn ${activeVariant === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onSelectVariant("playground")}
          className={`mf-acc-pill-btn ${activeVariant === "playground" ? "active" : ""}`}
        >
          <span>Playground</span>
          <ExternalLink size={12} className="opacity-70" />
        </button>
      </div>

      {/* View Docs Link */}
      {onScrollToDocs ? (
        <button
          type="button"
          onClick={onScrollToDocs}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5145FF] hover:text-[#4338CA] px-3 py-1.5 rounded-lg hover:bg-[#EEF2FF] transition-colors cursor-pointer"
        >
          <span>View Documentation</span>
          <ArrowRight size={13} />
        </button>
      ) : (
        <Link
          href="#documentation-details"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5145FF] hover:text-[#4338CA] px-3 py-1.5 rounded-lg hover:bg-[#EEF2FF] transition-colors"
        >
          <span>View Documentation</span>
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}
