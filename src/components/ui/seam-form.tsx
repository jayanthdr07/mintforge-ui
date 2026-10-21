"use client";

import * as React from "react";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { SeamStatus, SeamContractEndpoint, SeamBackendFramework } from "./seam-status";

export interface FieldMetadata {
  type?: string;
  required?: boolean;
}

interface SeamFormContextValue {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  backendModel?: string;
  framework?: SeamBackendFramework;
  expectedFields?: string[];
  registeredFields: Record<string, FieldMetadata>;
  registerField: (name: string, metadata?: FieldMetadata) => void;
  errorMap?: Record<string, string>;
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
  framework?: SeamBackendFramework;
  expectedFields?: string[];
  errorMap?: Record<string, string>;
  validateBeforeSubmit?: boolean;
  showSeamBadge?: boolean;
}

export const SeamForm = React.forwardRef<HTMLFormElement, SeamFormProps>(
  (
    {
      endpoint,
      method = "POST",
      backendModel,
      framework = "fastapi",
      expectedFields = [],
      errorMap,
      validateBeforeSubmit = false,
      showSeamBadge = true,
      className = "",
      children,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [registeredFields, setRegisteredFields] = React.useState<
      Record<string, FieldMetadata>
    >({});

    const registerField = React.useCallback((name: string, metadata?: FieldMetadata) => {
      setRegisteredFields((prev) => {
        const existing = prev[name];
        if (
          existing &&
          existing.type === metadata?.type &&
          existing.required === metadata?.required
        ) {
          return prev;
        }
        return {
          ...prev,
          [name]: {
            type: metadata?.type || "string",
            required: metadata?.required ?? false,
          },
        };
      });
    }, []);

    // Check for casing drift: if expected fields are snake_case, but form field is camelCase
    const detectedDrifts = React.useMemo(() => {
      const drifts: { field: string; suggestion: string; type: "casing" | "strict_drop" }[] = [];
      const fieldNames = Object.keys(registeredFields);

      for (const name of fieldNames) {
        // Casing drift check
        if (/[a-z][A-Z]/.test(name)) {
          const snake = name.replace(/([A-Z])/g, "_$1").toLowerCase();
          if (expectedFields.includes(snake)) {
            drifts.push({ field: name, suggestion: snake, type: "casing" });
            continue;
          }
        }

        // Mongoose strict mode stripping check
        if (framework === "mongoose" && expectedFields.length > 0) {
          const snake = name.replace(/([A-Z])/g, "_$1").toLowerCase();
          if (!expectedFields.includes(name) && !expectedFields.includes(snake)) {
            drifts.push({ field: name, suggestion: "Undeclared key will be dropped", type: "strict_drop" });
          }
        }
      }
      return drifts;
    }, [registeredFields, expectedFields, framework]);

    const endpointData: SeamContractEndpoint = React.useMemo(
      () => ({
        method,
        path: endpoint,
        backendModel,
        framework,
        status: detectedDrifts.length > 0 ? "drift_detected" : "synced",
        fields: Object.keys(registeredFields).map((f) => {
          const drift = detectedDrifts.find((d) => d.field === f);
          let fieldStatus: "synced" | "casing_drift" | "strict_dropped" = "synced";
          if (drift) {
            fieldStatus = drift.type === "strict_drop" ? "strict_dropped" : "casing_drift";
          }
          return {
            frontendKey: f,
            backendKey: drift?.type === "casing" ? drift.suggestion : f,
            status: fieldStatus,
            type: registeredFields[f]?.type,
            required:
              expectedFields.includes(f) ||
              (drift?.type === "casing" ? expectedFields.includes(drift.suggestion) : false),
          };
        }),
      }),
      [method, endpoint, backendModel, framework, registeredFields, detectedDrifts, expectedFields]
    );

    const contextValue = React.useMemo(
      () => ({
        endpoint,
        method,
        backendModel,
        framework,
        expectedFields,
        registeredFields,
        registerField,
        errorMap,
      }),
      [endpoint, method, backendModel, framework, expectedFields, registeredFields, registerField, errorMap]
    );

    const handleSubmit = React.useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        if (validateBeforeSubmit && detectedDrifts.length > 0) {
          // Flag preflight validation errors
          e.preventDefault();
          console.warn("[Mintforge Seam Check] Form submission blocked by client pre-flight verification:", detectedDrifts);
          return;
        }
        if (onSubmit) {
          (onSubmit as (e: React.FormEvent<HTMLFormElement>) => void)(e);
        }
      },
      [validateBeforeSubmit, detectedDrifts, onSubmit]
    );

    return (
      <SeamFormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={`space-y-5 ${className}`}
          {...props}
        >
          {/* Seam Contract Header Banner */}
          {showSeamBadge && (
            <div className="space-y-2">
              <SeamStatus
                variant="banner"
                endpoint={endpointData}
                framework={framework}
                showInspectorOnClick={true}
              />

              {detectedDrifts.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2 animate-in fade-in duration-200">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5 text-amber-500" />
                  <div>
                    <strong className="font-semibold">Contract Drift Warnings:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 font-mono text-[11px]">
                      {detectedDrifts.map((d, i) => (
                        <li key={i}>
                          {d.type === "strict_drop"
                            ? `Field "${d.field}" is not in Mongoose schema and will be silently stripped (strict: true).`
                            : `Form field "${d.field}" may cause HTTP 422. Expected backend parameter: "${d.suggestion}".`}
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
  type?: string;
  required?: boolean;
}

export function SeamFormField({
  name,
  label,
  type = "string",
  required,
  className = "",
  children,
  ...props
}: SeamFormFieldProps) {
  const ctx = useSeamForm();
  const registerField = ctx?.registerField;

  React.useEffect(() => {
    if (registerField && name) {
      registerField(name, { type, required });
    }
  }, [registerField, name, type, required]);

  const isCamel = /[a-z][A-Z]/.test(name);
  const snakeSuggestion = name.replace(/([A-Z])/g, "_$1").toLowerCase();
  const hasExpectedSnake = ctx?.expectedFields?.includes(snakeSuggestion);

  // Auto-error mapping from backend 422 / ValidationError
  const backendError = ctx?.errorMap?.[name] || ctx?.errorMap?.[snakeSuggestion];

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

      {/* Auto-Mapped Error Message */}
      {backendError && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
          <AlertCircle size={13} className="shrink-0" />
          <span>{backendError}</span>
        </div>
      )}
    </div>
  );
}
