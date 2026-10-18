"use client";

import * as React from "react";
import { Alert, type AlertProps } from "../alert";
import { RefreshCw } from "lucide-react";

export type AlertSolidProps = Partial<AlertProps>;

export function AlertSolid(props?: AlertSolidProps) {
  if (props && (props.status || props.title || props.description || props.children || props.action)) {
    return <Alert design="solid" status="destructive" {...props} />;
  }

  const [dismissed1, setDismissed1] = React.useState(false);
  const [dismissed2, setDismissed2] = React.useState(false);

  const isAllDismissed = dismissed1 && dismissed2;

  const handleRestore = () => {
    setDismissed1(false);
    setDismissed2(false);
  };

  return (
    <div className="space-y-3.5">
      {!dismissed1 && (
        <Alert
          status="destructive"
          design="solid"
          title="Critical Security Warning"
          description="Legacy API token exposed in commit history. Rotate key immediately."
          action={
            <button
              type="button"
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white text-red-600 hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            >
              Revoke Key
            </button>
          }
          onClose={() => setDismissed1(true)}
        />
      )}

      {!dismissed2 && (
        <Alert
          status="neutral"
          design="subtle"
          title="ProTip: Global Command Palette"
          description="Press ⌘K anywhere in the web app to open quick search and navigation."
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
