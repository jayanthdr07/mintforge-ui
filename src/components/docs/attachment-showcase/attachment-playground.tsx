"use client";

import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentProgress,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
  AttachmentGroup,
} from "@/components/ui/attachment";
import {
  AttachmentState,
  AttachmentSize,
  AttachmentOrientation,
  formatFileSize,
  getFileCategory,
} from "@/components/ui/attachment/attachment.types";
import {
  Copy,
  Check,
  RotateCcw,
  UploadCloud,
  Eye,
  Download,
  X,
  Play,
  Pause,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sliders,
  Code2,
  FilePlus2,
} from "lucide-react";
import { AttachmentCodeHighlighter } from "./attachment-code-highlighter";

export type PlaygroundType = "document" | "image" | "group";

export interface PlaygroundConfig {
  type: PlaygroundType;
  state: AttachmentState;
  size: AttachmentSize;
  orientation: AttachmentOrientation;
  showIcon: boolean;
  showMetadata: boolean;
  enableRemove: boolean;
  enablePreview: boolean;
  enableProgress: boolean;
  fileName: string;
  fileSize: number;
  mimeType: string;
  progressValue: number;
  customImageUrl?: string;
}

export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  type: "document",
  state: "done",
  size: "default",
  orientation: "horizontal",
  showIcon: true,
  showMetadata: true,
  enableRemove: true,
  enablePreview: true,
  enableProgress: false,
  fileName: "quarterly-financial-summary.pdf",
  fileSize: 3450000,
  mimeType: "application/pdf",
  progressValue: 68,
  customImageUrl: undefined,
};

export function AttachmentPlayground({
  onOpenPreview,
}: {
  onOpenPreview?: (data: { name: string; size: number; src?: string; type?: string }) => void;
}) {
  const [config, setConfig] = React.useState<PlaygroundConfig>(DEFAULT_PLAYGROUND_CONFIG);
  const [viewTab, setViewTab] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);
  const [isSimulating, setIsSimulating] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Clean up any object URL when replaced or unmounted
  React.useEffect(() => {
    return () => {
      if (config.customImageUrl && config.customImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(config.customImageUrl);
      }
    };
  }, [config.customImageUrl]);

  // Simulated upload interval
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating && config.progressValue < 100) {
      timer = setInterval(() => {
        setConfig((prev) => {
          const next = prev.progressValue + 6;
          if (next >= 100) {
            setIsSimulating(false);
            return { ...prev, progressValue: 100, state: "done" };
          }
          return { ...prev, progressValue: next };
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isSimulating, config.progressValue]);

  // Handle native file selection
  const handleNativeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith("image/");
    let previewUrl: string | undefined = undefined;

    if (isImg) {
      previewUrl = URL.createObjectURL(file);
    }

    setConfig((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || "application/octet-stream",
      type: isImg ? "image" : "document",
      state: "done",
      customImageUrl: previewUrl,
    }));
  };

  const handleReset = () => {
    setIsSimulating(false);
    setConfig(DEFAULT_PLAYGROUND_CONFIG);
  };

  const toggleSimulate = () => {
    if (config.state !== "uploading") {
      setConfig((prev) => ({
        ...prev,
        state: "uploading",
        enableProgress: true,
        progressValue: 10,
      }));
      setIsSimulating(true);
    } else {
      setIsSimulating(!isSimulating);
    }
  };

  // Generate real-time JSX Code matching exact controls
  const generatedCode = React.useMemo(() => {
    const stateAttr = config.state !== "idle" ? ` state="${config.state}"` : "";
    const sizeAttr = config.size !== "default" ? ` size="${config.size}"` : "";
    const orientAttr = config.orientation !== "horizontal" ? ` orientation="${config.orientation}"` : "";
    const category = getFileCategory(config.fileName, config.mimeType);

    if (config.type === "group") {
      return `<AttachmentGroup>
  <Attachment size="${config.size}" orientation="horizontal" className="w-[240px] shrink-0">
    ${config.showIcon ? `<AttachmentMedia category="${category}" alt="${config.fileName}" />` : ""}
    <AttachmentContent>
      <AttachmentTitle>${config.fileName}</AttachmentTitle>
      ${config.showMetadata ? `<AttachmentDescription>${formatFileSize(config.fileSize)}</AttachmentDescription>` : ""}
    </AttachmentContent>
    ${config.enableRemove ? `<AttachmentActions>
      <AttachmentAction variant="ghost" aria-label="Remove">
        <X size={14} />
      </AttachmentAction>
    </AttachmentActions>` : ""}
  </Attachment>
</AttachmentGroup>`;
    }

    return `<Attachment${stateAttr}${sizeAttr}${orientAttr}>
  ${
    config.showIcon
      ? config.type === "image"
        ? `<AttachmentMedia src="${config.customImageUrl || "/preview.png"}" alt="${config.fileName}" />`
        : `<AttachmentMedia category="${category}" alt="${config.fileName}" />`
      : ""
  }
  <AttachmentContent>
    <AttachmentTitle>${config.fileName}</AttachmentTitle>
    ${
      config.showMetadata
        ? `<AttachmentDescription>
      <span className="font-semibold text-[#5145FF] text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded">
        ${config.fileName.split(".").pop()?.toUpperCase()}
      </span>
      <span>·</span>
      <span>${formatFileSize(config.fileSize)}</span>
    </AttachmentDescription>`
        : ""
    }
    ${
      config.enableProgress || config.state === "uploading"
        ? `<AttachmentProgress value={${config.progressValue}} />`
        : ""
    }
  </AttachmentContent>
  ${
    config.enableRemove || config.enablePreview
      ? `<AttachmentActions>
    ${config.enablePreview ? `<AttachmentAction variant="ghost" aria-label="Preview"><Eye size={14} /></AttachmentAction>` : ""}
    ${config.enableRemove ? `<AttachmentAction variant="ghost" aria-label="Remove"><X size={14} /></AttachmentAction>` : ""}
  </AttachmentActions>`
      : ""
  }
</Attachment>`;
  }, [config]);

  const handleCopyCode = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Configuration Sidebar */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F6]">
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-[#5145FF]" />
              <h3 className="font-bold text-sm text-[#111827]">Playground Controls</h3>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#111827] cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>

          {/* Native File Selector Trigger */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Select Your Own Local File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleNativeFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-[#5145FF]/40 bg-[#F2F0FF]/30 hover:bg-[#F2F0FF]/60 text-[#5145FF] text-xs font-semibold transition cursor-pointer"
            >
              <FilePlus2 size={15} />
              <span>Choose File from Device...</span>
            </button>
          </div>

          {/* Attachment Type */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Attachment Type
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
              {(["document", "image", "group"] as PlaygroundType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      type: t,
                      fileName:
                        t === "image"
                          ? "creative-dashboard.png"
                          : t === "group"
                          ? "project-specification.ts"
                          : "quarterly-financial-summary.pdf",
                      mimeType: t === "image" ? "image/png" : "application/pdf",
                    }))
                  }
                  className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition cursor-pointer ${
                    config.type === t
                      ? "bg-white text-[#111827] shadow-xs"
                      : "text-[#64748B] hover:text-[#111827]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Lifecycle State */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Lifecycle State
            </label>
            <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
              {(["idle", "uploading", "processing", "error", "done"] as AttachmentState[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        state: s,
                        enableProgress: s === "uploading",
                      }))
                    }
                    className={`py-1 text-[11px] font-semibold rounded-md capitalize transition cursor-pointer ${
                      config.state === s
                        ? "bg-[#5145FF] text-white shadow-xs"
                        : "text-[#64748B] hover:text-[#111827]"
                    }`}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Size Scale */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Size Preset
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
              {[
                { id: "default" as AttachmentSize, label: "Default" },
                { id: "sm" as AttachmentSize, label: "Small (sm)" },
                { id: "xs" as AttachmentSize, label: "Extra Small (xs)" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, size: s.id }))}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    config.size === s.id
                      ? "bg-white text-[#111827] shadow-xs"
                      : "text-[#64748B] hover:text-[#111827]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1.5">
              Orientation
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#F8F9FC] border border-[#E5E7EB]">
              {[
                { id: "horizontal" as AttachmentOrientation, label: "Horizontal" },
                { id: "vertical" as AttachmentOrientation, label: "Vertical" },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setConfig((prev) => ({ ...prev, orientation: o.id }))}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    config.orientation === o.id
                      ? "bg-white text-[#111827] shadow-xs"
                      : "text-[#64748B] hover:text-[#111827]"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility & Behavior Toggles */}
          <div className="space-y-2 pt-2 border-t border-[#EEF2F6]">
            <label className="block text-xs font-semibold text-[#111827]">
              Component Elements
            </label>

            {[
              {
                id: "showIcon",
                label: "Show File Icon / Thumbnail",
                checked: config.showIcon,
                onChange: (v: boolean) => setConfig((p) => ({ ...p, showIcon: v })),
              },
              {
                id: "showMetadata",
                label: "Show File Metadata & Size",
                checked: config.showMetadata,
                onChange: (v: boolean) => setConfig((p) => ({ ...p, showMetadata: v })),
              },
              {
                id: "enableRemove",
                label: "Enable Dismiss Action (X)",
                checked: config.enableRemove,
                onChange: (v: boolean) => setConfig((p) => ({ ...p, enableRemove: v })),
              },
              {
                id: "enablePreview",
                label: "Enable Preview Action (Eye)",
                checked: config.enablePreview,
                onChange: (v: boolean) => setConfig((p) => ({ ...p, enablePreview: v })),
              },
              {
                id: "enableProgress",
                label: "Show Progress Bar",
                checked: config.enableProgress,
                onChange: (v: boolean) => setConfig((p) => ({ ...p, enableProgress: v })),
              },
            ].map((toggle) => (
              <label
                key={toggle.id}
                className="flex items-center justify-between text-xs text-[#334155] cursor-pointer py-1"
              >
                <span>{toggle.label}</span>
                <input
                  type="checkbox"
                  checked={toggle.checked}
                  onChange={(e) => toggle.onChange(e.target.checked)}
                  className="rounded text-[#5145FF] focus:ring-[#5145FF] w-4 h-4 cursor-pointer"
                />
              </label>
            ))}
          </div>

          {/* Upload Simulation Play/Pause */}
          <div className="pt-2 border-t border-[#EEF2F6] flex items-center justify-between">
            <button
              type="button"
              onClick={toggleSimulate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5145FF] text-white text-xs font-semibold hover:bg-[#4338CA] transition cursor-pointer"
            >
              {isSimulating ? <Pause size={12} /> : <Play size={12} />}
              <span>{isSimulating ? "Pause Upload" : "Simulate Upload"}</span>
            </button>
            <span className="text-xs text-[#64748B] font-mono">
              Progress: {config.progressValue}%
            </span>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview & Code Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between p-1 bg-white border border-[#E5E7EB] rounded-2xl shadow-xs">
            <div className="inline-flex rounded-xl bg-[#F8F9FC] p-1 border border-[#E5E7EB]">
              <button
                type="button"
                onClick={() => setViewTab("preview")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  viewTab === "preview"
                    ? "bg-white text-[#111827] shadow-xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Live Preview
              </button>
              <button
                type="button"
                onClick={() => setViewTab("code")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  viewTab === "code"
                    ? "bg-white text-[#111827] shadow-xs"
                    : "text-[#64748B] hover:text-[#111827]"
                }`}
              >
                Generated Code
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] text-xs font-semibold text-[#111827] transition cursor-pointer mr-1"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#15803D]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Canvas View */}
          {viewTab === "preview" ? (
            <div className="min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F9FC] to-[#FFFFFF] border border-[#E5E7EB] p-8 flex items-center justify-center">
              {config.type === "group" ? (
                <div className="w-full max-w-lg">
                  <AttachmentGroup>
                    {[1, 2, 3].map((num) => (
                      <Attachment
                        key={num}
                        state={config.state}
                        size={config.size}
                        orientation={config.orientation}
                        className="w-[230px] shrink-0 bg-white shadow-xs"
                      >
                        {config.showIcon && (
                          <AttachmentMedia
                            category={getFileCategory(config.fileName, config.mimeType)}
                            alt={config.fileName}
                          />
                        )}
                        <AttachmentContent>
                          <AttachmentTitle>{config.fileName}</AttachmentTitle>
                          {config.showMetadata && (
                            <AttachmentDescription>
                              <span>{formatFileSize(config.fileSize)}</span>
                            </AttachmentDescription>
                          )}
                        </AttachmentContent>
                        {config.enableRemove && (
                          <AttachmentActions>
                            <AttachmentAction
                              variant="ghost"
                              onClick={() => alert(`Remove card ${num}`)}
                              aria-label="Remove item"
                            >
                              <X size={14} />
                            </AttachmentAction>
                          </AttachmentActions>
                        )}
                      </Attachment>
                    ))}
                  </AttachmentGroup>
                </div>
              ) : (
                <div className={config.orientation === "vertical" ? "w-64" : "w-full max-w-md"}>
                  <Attachment
                    state={config.state}
                    size={config.size}
                    orientation={config.orientation}
                    className="w-full bg-white shadow-xs"
                  >
                    {config.showIcon && (
                      <AttachmentMedia
                        src={
                          config.type === "image"
                            ? config.customImageUrl ||
                              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%235145FF'/><circle cx='200' cy='150' r='60' fill='%23ffffff' fill-opacity='0.25'/></svg>"
                            : undefined
                        }
                        category={getFileCategory(config.fileName, config.mimeType)}
                        alt={config.fileName}
                      />
                    )}

                    <AttachmentContent>
                      <AttachmentTitle>{config.fileName}</AttachmentTitle>

                      {config.showMetadata && (
                        <AttachmentDescription>
                          <span className="font-semibold text-[#5145FF] text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded">
                            {config.fileName.split(".").pop()?.toUpperCase() || "FILE"}
                          </span>
                          <span>·</span>
                          <span className="font-mono">{formatFileSize(config.fileSize)}</span>
                          {config.state === "done" && (
                            <span className="text-[#15803D] font-medium flex items-center gap-0.5">
                              <CheckCircle2 size={11} /> Ready
                            </span>
                          )}
                          {config.state === "error" && (
                            <span className="text-[#DC2626] font-medium flex items-center gap-0.5">
                              <AlertCircle size={11} /> Error
                            </span>
                          )}
                        </AttachmentDescription>
                      )}

                      {(config.enableProgress || config.state === "uploading") && (
                        <div className="w-full">
                          <AttachmentProgress value={config.progressValue} />
                          <div className="flex justify-between text-[10px] font-mono text-[#5145FF] mt-0.5">
                            <span>Uploading payload</span>
                            <span>{config.progressValue}%</span>
                          </div>
                        </div>
                      )}
                    </AttachmentContent>

                    {(config.enableRemove || config.enablePreview) && (
                      <AttachmentActions>
                        {config.enablePreview && (
                          <AttachmentAction
                            variant="ghost"
                            onClick={() =>
                              onOpenPreview?.({
                                name: config.fileName,
                                size: config.fileSize,
                                type: config.mimeType,
                                src: config.customImageUrl,
                              })
                            }
                            aria-label={`Preview ${config.fileName}`}
                          >
                            <Eye size={14} />
                          </AttachmentAction>
                        )}

                        {config.enableRemove && (
                          <AttachmentAction
                            variant="ghost"
                            onClick={() => alert(`Dismissed ${config.fileName}`)}
                            aria-label={`Remove ${config.fileName}`}
                          >
                            <X size={14} />
                          </AttachmentAction>
                        )}
                      </AttachmentActions>
                    )}
                  </Attachment>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0B0F19] border border-[#1E293B] overflow-hidden">
              <AttachmentCodeHighlighter code={generatedCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
