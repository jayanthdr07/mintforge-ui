"use client";

import * as React from "react";
import { Alert, type AlertProps } from "../alert";
import { RefreshCw } from "lucide-react";

export type AlertMorphProps = Partial<AlertProps>;

export function AlertMorph(props?: AlertMorphProps) {
  const [dismissed1, setDismissed1] = React.useState(false);
  const [dismissed2, setDismissed2] = React.useState(false);

  if (props && (props.status || props.title || props.description || props.children || props.action)) {
    return <Alert design="morph" status="brand" {...props} />;
  }

  const isAllDismissed = dismissed1 && dismissed2;

  const handleRestore = () => {
    setDismissed1(false);
    setDismissed2(false);
  };

  return (
    <div className="space-y-3.5">
      {!dismissed1 && (
        <Alert
          status="brand"
          design="morph"
          title="Design System v0.1.2 Released"
          description="New token synchronizers, zero-drift contract verification, and accessible primitives."
          action={
            <button
              type="button"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#5145FF] hover:bg-[#EEF2FF] hover:border-[#C7D2FE] transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            >
              View Changelog
            </button>
          }
          onClose={() => setDismissed1(true)}
        />
      )}

      {!dismissed2 && (
        <Alert
          status="success"
          design="morph"
          title="Contract Synchronized"
          description="FastAPI schema matched frontend contract with zero discrepancies detected."
          onClose={() => setDismissed2(true)}
        />
      )}

      {(dismissed1 || dismissed2) && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleRestore}
            className="text-[11px] font-medium text-[#5145FF] hover:text-[#4338CA] flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>Restore Dismissed Alert{isAllDismissed ? "s" : ""}</span>
          </button>
        </div>
      )}
    </div>
  );
}
