"use client";

import * as React from "react";
import { Alert, type AlertProps } from "../alert";
import { RefreshCw } from "lucide-react";

export type AlertFloatingProps = Partial<AlertProps>;

export function AlertFloating(props?: AlertFloatingProps) {
  if (props && (props.status || props.title || props.description || props.children || props.action)) {
    return <Alert design="floating" status="brand" {...props} />;
  }

  const [dismissed, setDismissed] = React.useState(false);

  return (
    <div className="space-y-3.5">
      {!dismissed ? (
        <Alert
          status="brand"
          design="floating"
          title="Real-Time Sync Activated"
          description="Live multi-tenant WebSocket channel listening for schema mutations."
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
            <span>Restore Sync Alert</span>
          </button>
        </div>
      )}

      <Alert
        status="destructive"
        design="floating"
        title="Connection Interrupted"
        description="Lost connection to edge telemetry replica. Retrying in 4 seconds..."
        action={
          <button
            type="button"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Reconnect
          </button>
        }
      />
    </div>
  );
}
