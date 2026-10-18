"use client";

import * as React from "react";
import { Alert, type AlertProps } from "../alert";
import { RefreshCw } from "lucide-react";

export type AlertRailProps = Partial<AlertProps>;

export function AlertRail(props?: AlertRailProps) {
  if (props && (props.status || props.title || props.description || props.children || props.action)) {
    return <Alert design="rail" status="info" {...props} />;
  }

  const [dismissed, setDismissed] = React.useState(false);

  return (
    <div className="space-y-3.5">
      <Alert
        status="info"
        design="rail"
        title="Scheduled Database Maintenance"
        description="Automated zero-downtime maintenance scheduled for Sunday at 02:00 UTC."
        action={
          <button
            type="button"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#F8F9FC] border border-[#E5E7EB] text-[#111827] hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Details
          </button>
        }
      />

      {!dismissed ? (
        <Alert
          status="warning"
          design="rail"
          title="Storage Approaching Threshold"
          description="Current cluster storage utilization is at 88%. Auto-expansion enabled."
          onClose={() => setDismissed(true)}
        />
      ) : (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setDismissed(false)}
            className="text-[11px] font-medium text-[#5145FF] hover:text-[#4338CA] flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>Restore Warning Alert</span>
          </button>
        </div>
      )}
    </div>
  );
}
