import * as React from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight, X } from "lucide-react";

export type SeamBackendFramework = "fastapi" | "express" | "mongoose" | "prisma";

export interface SeamContractField {
  frontendKey: string;
  backendKey: string;
  type?: string;
  required?: boolean;
  status: "synced" | "casing_drift" | "missing" | "extra" | "strict_dropped";
}

export interface SeamContractEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  backendModel?: string;
  framework?: SeamBackendFramework;
  status: "synced" | "drift_detected" | "unverified";
  fields?: SeamContractField[];
}

export interface SeamStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  endpoint?: SeamContractEndpoint;
  endpoints?: SeamContractEndpoint[];
  framework?: SeamBackendFramework;
  variant?: "pill" | "banner" | "card";
  showInspectorOnClick?: boolean;
}

export const SeamStatus = React.forwardRef<HTMLDivElement, SeamStatusProps>(
  (
    {
      endpoint,
      endpoints,
      framework = "fastapi",
      variant = "pill",
      showInspectorOnClick = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [inspectorOpen, setInspectorOpen] = React.useState(false);

    const items = React.useMemo(() => {
      if (endpoints && endpoints.length > 0) {
        return endpoints.map((ep) => ({ ...ep, framework: ep.framework || framework }));
      }
      if (endpoint) {
        return [{ ...endpoint, framework: endpoint.framework || framework }];
      }
      return [
        {
          method: "POST" as const,
          path: "/v1/interviews/{session_id}/feedback",
          backendModel: "SubmitTeamFeedbackRequest",
          framework: framework || "fastapi",
          status: "synced" as const,
          fields: [
            { frontendKey: "scores", backendKey: "scores", status: "synced" as const, required: true },
            { frontendKey: "strengths", backendKey: "strengths", status: "synced" as const, required: true },
            { frontendKey: "improvements", backendKey: "improvements", status: "synced" as const, required: true },
            { frontendKey: "recommendations", backendKey: "recommendations", status: "synced" as const, required: true },
            { frontendKey: "detailed_feedback", backendKey: "detailed_feedback", status: "synced" as const, required: true },
          ],
        },
      ];
    }, [endpoint, endpoints, framework]);

    const hasDrift = items.some((i) => i.status === "drift_detected");
    const activeItem = items[0];

    // Variant: Pill (Mini dev badge)
    if (variant === "pill") {
      return (
        <div ref={ref} className={`inline-block ${className}`} {...props}>
          <button
            type="button"
            onClick={() => showInspectorOnClick && setInspectorOpen(true)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              hasDrift
                ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/15"
                : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/15"
            }`}
          >
            {hasDrift ? (
              <AlertTriangle size={13} className="text-red-500 animate-pulse" />
            ) : (
              <ShieldCheck size={13} className="text-emerald-500" />
            )}
            <span>
              <strong>Seam:</strong> {hasDrift ? "Drift Detected" : "In Sync"}
            </span>
            <span className="text-[10px] font-mono opacity-70">
              {activeItem.method} {activeItem.path.split("/").slice(-1)[0]}
            </span>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">
              {activeItem.framework || framework}
            </span>
          </button>

          {inspectorOpen && (
            <SeamInspectorModal
              items={items}
              onClose={() => setInspectorOpen(false)}
            />
          )}
        </div>
      );
    }

    // Variant: Banner (Form header callout)
    if (variant === "banner") {
      return (
        <>
          <div
            ref={ref}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs ${
              hasDrift
                ? "bg-red-500/5 text-red-900 dark:text-red-200 border-red-500/20"
                : "bg-emerald-500/5 text-emerald-950 dark:text-emerald-100 border-emerald-500/20"
            } ${className}`}
            {...props}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  hasDrift
                    ? "bg-red-500/15 text-red-500"
                    : "bg-emerald-500/15 text-emerald-500"
                }`}
              >
                {hasDrift ? <AlertTriangle size={15} /> : <ShieldCheck size={15} />}
              </div>
              <div>
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <span>Contract Verified:</span>
                  <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">
                    {activeItem.method} {activeItem.path}
                  </code>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase">
                    {activeItem.framework || framework}
                  </span>
                </p>
                <p className="text-muted-foreground text-[11px]">
                  {hasDrift
                    ? `Discrepancies detected with ${formatFrameworkName(activeItem.framework || framework)} model.`
                    : `Zero drift. Matched with ${activeItem.backendModel || formatFrameworkName(activeItem.framework || framework)}.`}
                </p>
              </div>
            </div>

            {showInspectorOnClick && (
              <button
                type="button"
                onClick={() => setInspectorOpen(true)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect</span>
                <ChevronRight size={13} />
              </button>
            )}
          </div>

          {inspectorOpen && (
            <SeamInspectorModal
              items={items}
              onClose={() => setInspectorOpen(false)}
            />
          )}
        </>
      );
    }

    // Default: Card
    return (
      <div
        ref={ref}
        className={`p-4 rounded-xl border border-border bg-card space-y-3 ${className}`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Contract Parity Status
            </h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold uppercase">
            {formatFrameworkName(activeItem.framework || framework)}
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/50 text-[11px]"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-emerald-500">{it.method}</span>
                <span className="text-foreground truncate">{it.path}</span>
              </div>
              <span className="text-xs text-emerald-500">
                {it.status === "drift_detected" ? "⚠ Drift" : "✔ 0 drift"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
SeamStatus.displayName = "SeamStatus";

// ─── INSPECTOR MODAL ─────────────────────────────────────────────────────────

function SeamInspectorModal({
  items,
  onClose,
}: {
  items: SeamContractEndpoint[];
  onClose: () => void;
}) {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const active = items[selectedIdx] || items[0];
  const fw = active.framework || "fastapi";

  const hasStrictDrop = active.fields?.some((f) => f.status === "strict_dropped");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span>Seam Check Inspector</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                  {formatFrameworkName(fw)}
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Runtime frontend ↔ {formatFrameworkName(fw)} contract parity analyzer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Endpoint Selector Tabs (if multiple endpoints provided) */}
        {items.length > 1 && (
          <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-border/60 overflow-x-auto bg-muted/10">
            {items.map((it, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap cursor-pointer ${
                  selectedIdx === idx
                    ? "bg-foreground text-background font-bold shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="font-bold opacity-80 mr-1.5">{it.method}</span>
                {it.path}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Endpoint Card */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400">
                  {active.method}
                </span>
                <span className="text-sm font-mono font-bold text-foreground">
                  {active.path}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target Backend Model:{" "}
                <strong className="text-foreground">
                  {active.backendModel || formatFrameworkName(fw)}
                </strong>
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                active.status === "drift_detected"
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              }`}
            >
              {active.status === "drift_detected" ? "Drift Detected" : "Verified In Sync"}
            </span>
          </div>

          {/* Mongoose Strict-Mode Warning */}
          {fw === "mongoose" && hasStrictDrop && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Mongoose strict: true Alert</strong>
                <p className="text-[11px] mt-0.5">
                  Undeclared fields will be silently discarded by MongoDB without an error at runtime.
                </p>
              </div>
            </div>
          )}

          {/* Field Table */}
          {active.fields && active.fields.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Payload Contract Mapping ({active.fields.length} Fields)
              </h4>
              <div className="border border-border rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-2.5">Frontend Key</th>
                      <th className="p-2.5">Backend Field</th>
                      <th className="p-2.5">Required</th>
                      <th className="p-2.5">Parity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {active.fields.map((f, i) => (
                      <tr key={i} className="hover:bg-muted/30">
                        <td className="p-2.5 font-mono text-emerald-500 dark:text-emerald-400 font-semibold">
                          {f.frontendKey}
                        </td>
                        <td className="p-2.5 font-mono text-foreground">
                          {f.backendKey}
                        </td>
                        <td className="p-2.5">
                          {f.required ? (
                            <span className="text-amber-500 font-semibold">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">Optional</span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {f.status === "casing_drift" ? (
                            <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                              <AlertTriangle size={13} />
                              <span>Casing Drift</span>
                            </span>
                          ) : f.status === "strict_dropped" ? (
                            <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
                              <AlertTriangle size={13} />
                              <span>Strict Dropped</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
                              <CheckCircle2 size={13} />
                              <span>100% Match</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Run <code className="text-emerald-500 font-mono">npx mintforge check</code> in CI for automated enforcement.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function formatFrameworkName(fw: SeamBackendFramework): string {
  switch (fw) {
    case "fastapi":
      return "FastAPI (Python)";
    case "express":
      return "Express (Node.js)";
    case "mongoose":
      return "Mongoose (MongoDB)";
    case "prisma":
      return "Prisma ORM";
    default:
      return fw;
  }
}
