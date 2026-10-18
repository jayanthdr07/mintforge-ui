"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export type AlertVariantNavType = "morph" | "rail" | "floating" | "solid" | "playground";

export interface AlertVariantNavProps {
  activeVariant: AlertVariantNavType;
  onSelectVariant: (variant: AlertVariantNavType) => void;
  onScrollToDocs?: () => void;
}

export function AlertVariantNav({
  activeVariant,
  onSelectVariant,
  onScrollToDocs,
}: AlertVariantNavProps) {
  return (
    <div className="mf-acc-variant-bar">
      {/* Left Pills */}
      <div className="mf-acc-variant-pills">
        <button
          type="button"
          onClick={() => onSelectVariant("morph")}
          className={`mf-acc-pill-btn ${activeVariant === "morph" ? "active" : ""}`}
        >
          Signature Morph
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("rail")}
          className={`mf-acc-pill-btn ${activeVariant === "rail" ? "active" : ""}`}
        >
          Accent Rail
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("floating")}
          className={`mf-acc-pill-btn ${activeVariant === "floating" ? "active" : ""}`}
        >
          Floating Glass
        </button>

        <button
          type="button"
          onClick={() => onSelectVariant("solid")}
          className={`mf-acc-pill-btn ${activeVariant === "solid" ? "active" : ""}`}
        >
          Solid
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
