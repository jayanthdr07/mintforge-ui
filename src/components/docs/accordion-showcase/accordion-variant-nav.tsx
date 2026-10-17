"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export type VariantNavType = "morph" | "minimal" | "outlined" | "nested" | "playground";

export interface AccordionVariantNavProps {
  activeVariant: VariantNavType;
  onSelectVariant: (variant: VariantNavType) => void;
  onScrollToDocs?: () => void;
}

export function AccordionVariantNav({
  activeVariant,
  onSelectVariant,
  onScrollToDocs,
}: AccordionVariantNavProps) {
  return (
    <div className="mf-acc-variant-bar">
      {/* Left Pills */}
      <div className="mf-acc-variant-pills">
        <button
          type="button"
          onClick={() => onSelectVariant("morph")}
          className={`mf-acc-pill-btn ${activeVariant === "morph" ? "active" : ""}`}
        >
          Morph
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("minimal")}
          className={`mf-acc-pill-btn ${activeVariant === "minimal" ? "active" : ""}`}
        >
          Minimal
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("outlined")}
          className={`mf-acc-pill-btn ${activeVariant === "outlined" ? "active" : ""}`}
        >
          Outlined
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("nested")}
          className={`mf-acc-pill-btn ${activeVariant === "nested" ? "active" : ""}`}
        >
          Nested
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("playground")}
          className={`mf-acc-pill-btn ${activeVariant === "playground" ? "active" : ""}`}
        >
          <span>Playground</span>
          <ExternalLink size={12} className="opacity-70" />
        </button>
      </div>

      {/* Right Link */}
      {onScrollToDocs ? (
        <button
          type="button"
          onClick={onScrollToDocs}
          className="mf-acc-view-docs-btn cursor-pointer"
        >
          <span>View Documentation</span>
          <ArrowRight size={13} />
        </button>
      ) : (
        <Link href="#documentation-details" className="mf-acc-view-docs-btn">
          <span>View Documentation</span>
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}
