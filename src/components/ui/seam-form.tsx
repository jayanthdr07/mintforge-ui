"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { SeamStatus, SeamContractEndpoint } from "./seam-status";

interface SeamFormContextValue {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  backendModel?: string;
  expectedFields?: string[];
  registeredFields: Record<string, boolean>;
  registerField: (name: string) => void;
}

const SeamFormContext = React.createContext<SeamFormContextValue | null>(null);

export function useSeamForm() {
  return React.useContext(SeamFormContext);
}

export interface SeamFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  backendModel?: string;
  expectedFields?: string[];
  showSeamBadge?: boolean;
}

export const SeamForm = React.forwardRef<HTMLFormElement, SeamFormProps>(
  (
    {
      endpoint,
      method = "POST",
      backendModel,
      expectedFields = [],
      showSeamBadge = true,
      className = "",
      children,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [registeredFields, setRegisteredFields] = React.useState<
      Record<string, boolean>
    >({});

    const registerField = React.useCallback((name: string) => {
      setRegisteredFields((prev) => {
        if (prev[name]) return prev;
        return { ...prev, [name]: true };
      });
    }, []);

    // Check for casing drift: if expected fields are snake_case, but form field is camelCase
    const detectedDrifts = React.useMemo(() => {
      const drifts: { field: string; suggestion: string }[] = [];
      const fieldNames = Object.keys(registeredFields);

      for (const name of fieldNames) {
        // camelCase detected in name
        if (/[a-z][A-Z]/.test(name)) {
          const snake = name.replace(/([A-Z])/g, "_$1").toLowerCase();
          if (expectedFields.includes(snake)) {
            drifts.push({ field: name, suggestion: snake });
          }
        }
      }
      return drifts;
    }, [registeredFields, expectedFields]);

    const endpointData: SeamContractEndpoint = React.useMemo(
      () => ({
        method,
        path: endpoint,
        backendModel,
        status: detectedDrifts.length > 0 ? "drift_detected" : "synced",
        fields: Object.keys(registeredFields).map((f) => {
          const drift = detectedDrifts.find((d) => d.field === f);
          return {
            frontendKey: f,
            backendKey: drift ? drift.suggestion : f,
            status: drift ? "casing_drift" : "synced",
            required: expectedFields.includes(f) || (drift ? expectedFields.includes(drift.suggestion) : false),
          };
        }),
      }),
      [method, endpoint, backendModel, registeredFields, detectedDrifts, expectedFields]
    );

    const contextValue = React.useMemo(
      () => ({
        endpoint,
        method,
        backendModel,
        expectedFields,
        registeredFields,
        registerField,
      }),
      [endpoint, method, backendModel, expectedFields, registeredFields, registerField]
    );

    return (
      <SeamFormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={onSubmit}
          className={`space-y-5 ${className}`}
          {...props}
        >
          {/* Seam Contract Header Banner */}
          {showSeamBadge && (
            <div className="space-y-2">
              <SeamStatus
                variant="banner"
                endpoint={endpointData}
                showInspectorOnClick={true}
              />

              {detectedDrifts.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2 animate-in fade-in duration-200">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                  <div>
                    <strong className="font-semibold">Contract Casing Warning:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 font-mono text-[11px]">
                      {detectedDrifts.map((d, i) => (
                        <li key={i}>
                          Form field &quot;{d.field}&quot; may cause HTTP 422. Expected backend parameter: &quot;{d.suggestion}&quot;.
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {children}
        </form>
      </SeamFormContext.Provider>
    );
  }
);
SeamForm.displayName = "SeamForm";

// ─── SEAM FORM FIELD ─────────────────────────────────────────────────────────

export interface SeamFormFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  required?: boolean;
}

export function SeamFormField({
  name,
  label,
  required,
  className = "",
  children,
  ...props
}: SeamFormFieldProps) {
  const ctx = useSeamForm();
  const registerField = ctx?.registerField;

  React.useEffect(() => {
    if (registerField && name) {
      registerField(name);
    }
  }, [registerField, name]);

  const isCamel = /[a-z][A-Z]/.test(name);
  const snakeSuggestion = name.replace(/([A-Z])/g, "_$1").toLowerCase();
  const hasExpectedSnake = ctx?.expectedFields?.includes(snakeSuggestion);

  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs font-semibold text-foreground flex items-center gap-1 select-none">
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Casing Drift Indicator Pill */}
        {isCamel && hasExpectedSnake && (
          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Hint: backend uses {snakeSuggestion}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
