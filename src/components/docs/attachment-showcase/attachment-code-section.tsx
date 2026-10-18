"use client";

import * as React from "react";
import { Copy, Check, Terminal, Code2 } from "lucide-react";
import { AttachmentCodeHighlighter } from "./attachment-code-highlighter";

export type CodeTab = "file" | "image" | "progress" | "lifecycle" | "group";

export function AttachmentBigCodeSection() {
  const [activeTab, setActiveTab] = React.useState<CodeTab>("file");
  const [mode, setMode] = React.useState<"component" | "usage">("usage");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const cliCommand = "npx mintforge add attachment";

  const handleCopyCli = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cliCommand);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  const codeSnippets: Record<CodeTab, { usage: string; component: string }> = {
    file: {
      usage: `import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { Eye, Download, X } from "lucide-react";

export function FileAttachmentExample() {
  return (
    <Attachment state="done" size="default" orientation="horizontal">
      <AttachmentMedia category="document" alt="product-requirements.pdf" />

      <AttachmentContent>
        <AttachmentTitle>product-requirements.pdf</AttachmentTitle>
        <AttachmentDescription>
          <span className="font-semibold text-[#5145FF] text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded">
            PDF
          </span>
          <span>·</span>
          <span>2.4 MB</span>
        </AttachmentDescription>
      </AttachmentContent>

      <AttachmentActions>
        <AttachmentAction onClick={() => console.log("Preview")} aria-label="Preview">
          <Eye size={15} />
        </AttachmentAction>
        <AttachmentAction onClick={() => console.log("Download")} aria-label="Download">
          <Download size={15} />
        </AttachmentAction>
        <AttachmentAction onClick={() => console.log("Remove")} aria-label="Remove">
          <X size={15} />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}`,
      component: `// Reusable Preset from Mintforge UI
import { AttachmentFileCard } from "@/components/ui/attachment";

export function DocumentList() {
  return (
    <div className="space-y-2.5 max-w-md">
      <AttachmentFileCard
        name="product-requirements.pdf"
        size={2400000}
        type="application/pdf"
        onPreview={(file) => openPreview(file)}
        onDownload={(file) => downloadFile(file)}
        onRemove={(id) => handleRemove(id)}
      />
      <AttachmentFileCard
        name="design-system.tsx"
        size={84000}
        type="text/typescript"
      />
      <AttachmentFileCard
        name="customer-data.csv"
        size={560000}
        type="text/csv"
      />
    </div>
  );
}`,
    },

    image: {
      usage: `import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { Eye, X } from "lucide-react";

export function ImageAttachmentExample() {
  return (
    <Attachment state="done" size="default" orientation="horizontal">
      <AttachmentMedia
        src="/assets/workspace-preview.png"
        alt="workspace-preview.png"
      />

      <AttachmentContent>
        <AttachmentTitle>workspace-preview.png</AttachmentTitle>
        <AttachmentDescription>
          <span className="font-semibold text-[#0284C7] text-[10px] bg-[#E0F2FE] px-1.5 py-0.5 rounded">
            PNG
          </span>
          <span>·</span>
          <span>3.8 MB</span>
        </AttachmentDescription>
      </AttachmentContent>

      <AttachmentActions>
        <AttachmentAction onClick={() => console.log("Zoom")} aria-label="Preview image">
          <Eye size={15} />
        </AttachmentAction>
        <AttachmentAction onClick={() => console.log("Remove")} aria-label="Remove image">
          <X size={15} />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}`,
      component: `import { AttachmentImagePreview } from "@/components/ui/attachment";

export function CreativeGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <AttachmentImagePreview
        name="workspace-preview.png"
        size={3840000}
        orientation="vertical"
        onPreview={(img) => setLightbox(img)}
      />
      <AttachmentImagePreview
        name="brand-guidelines.jpg"
        size={1950000}
        orientation="vertical"
      />
      <AttachmentImagePreview
        name="dashboard-design.webp"
        size={2420000}
        orientation="vertical"
      />
    </div>
  );
}`,
    },

    progress: {
      usage: `import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentProgress,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { X } from "lucide-react";

export function UploadProgressExample({ progress = 64 }: { progress: number }) {
  return (
    <Attachment state="uploading" size="default" orientation="horizontal">
      <AttachmentMedia category="archive" alt="design-system.zip" />

      <AttachmentContent>
        <div className="flex items-center justify-between">
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <span className="text-[11px] font-mono text-[#64748B]">14.8 MB</span>
        </div>

        <AttachmentProgress value={progress} />

        <div className="flex justify-between text-[11px] font-mono mt-1 text-[#5145FF]">
          <span>Uploading...</span>
          <span>{progress}%</span>
        </div>
      </AttachmentContent>

      <AttachmentActions>
        <AttachmentAction onClick={() => console.log("Cancel")} aria-label="Cancel upload">
          <X size={15} />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}`,
      component: `import { AttachmentUploadProgress } from "@/components/ui/attachment";

export function UploadWidget() {
  return (
    <AttachmentUploadProgress
      name="design-system.zip"
      size={14800000}
      initialProgress={64}
      autoStart={false}
      onComplete={() => alert("File ready")}
      onCancel={() => console.log("Cancelled")}
    />
  );
}`,
    },

    lifecycle: {
      usage: `import { Attachment, AttachmentTitle, AttachmentDescription } from "@/components/ui/attachment";

// States: "idle" | "uploading" | "processing" | "error" | "done"
export function ErrorStateExample() {
  return (
    <Attachment state="error" size="default">
      <AttachmentMedia category="data" alt="financial-model.xlsx" />
      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <div className="text-[11px] text-[#DC2626] font-medium flex items-center gap-1 mt-0.5">
          <span>Upload failed. Connection timed out. Try again.</span>
        </div>
      </AttachmentContent>
      <AttachmentActions>
        <button onClick={handleRetry} className="px-2.5 py-1 bg-[#DC2626] text-white text-xs rounded-lg">
          Retry
        </button>
      </AttachmentActions>
    </Attachment>
  );
}`,
      component: `import { AttachmentStatusErrorList } from "@/components/ui/attachment";

export function LifecycleBoard() {
  return (
    <AttachmentStatusErrorList />
  );
}`,
    },

    group: {
      usage: `import { Attachment, AttachmentGroup, AttachmentTitle, AttachmentAction } from "@/components/ui/attachment";
import { X } from "lucide-react";

export function ComposerAttachmentStrip({ files, onRemove }) {
  return (
    <AttachmentGroup>
      {files.map((file) => (
        <Attachment
          key={file.id}
          size="sm"
          orientation="horizontal"
          className="w-[240px] shrink-0 bg-white"
        >
          <AttachmentMedia category={file.category} alt={file.name} />
          <AttachmentContent>
            <AttachmentTitle className="text-xs">{file.name}</AttachmentTitle>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction onClick={() => onRemove(file.id)} aria-label="Remove">
              <X size={13} />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}`,
      component: `import { AttachmentGroupShowcase } from "@/components/ui/attachment";

export function ChatUploadSection() {
  return (
    <AttachmentGroupShowcase />
  );
}`,
    },
  };

  const currentCode = codeSnippets[activeTab][mode];

  const handleCopyCode = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* CLI Installation Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-[#1E293B]">
        <div className="flex items-center gap-2 text-white text-xs font-mono px-1">
          <Terminal size={15} className="text-[#5145FF]" />
          <span className="text-[#64748B]">$</span>
          <span>{cliCommand}</span>
        </div>

        <button
          type="button"
          onClick={handleCopyCli}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-white text-xs font-medium transition cursor-pointer select-none"
        >
          {copiedCli ? (
            <>
              <Check size={13} className="text-[#15803D]" />
              <span>Copied CLI</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy CLI</span>
            </>
          )}
        </button>
      </div>

      {/* Main Terminal Editor */}
      <div className="rounded-2xl bg-[#0B0F19] border border-[#1E293B] overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[#1E293B] bg-[#070A12]">
          <div className="flex items-center gap-3">
            {/* macOS / Unix Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
            </div>

            {/* Mode Switcher */}
            <div className="inline-flex rounded-lg bg-[#1E293B]/70 p-0.5 border border-[#334155]/50">
              <button
                type="button"
                onClick={() => setMode("usage")}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  mode === "usage"
                    ? "bg-[#5145FF] text-white font-semibold"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                JSX Usage
              </button>
              <button
                type="button"
                onClick={() => setMode("component")}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  mode === "component"
                    ? "bg-[#5145FF] text-white font-semibold"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Preset Component
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-white text-xs font-medium transition cursor-pointer select-none"
          >
            {copiedCode ? (
              <>
                <Check size={13} className="text-[#10B981]" />
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

        {/* Preset Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-[#1E293B] bg-[#0B0F19] overflow-x-auto">
          {[
            { id: "file" as CodeTab, label: "File Card (Design 1)" },
            { id: "image" as CodeTab, label: "Image Preview (Design 2)" },
            { id: "progress" as CodeTab, label: "Upload Progress (Design 3)" },
            { id: "lifecycle" as CodeTab, label: "Status & Error (Design 4)" },
            { id: "group" as CodeTab, label: "Group Row (Design 5)" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#1E293B] text-white font-semibold border border-[#334155]"
                    : "text-[#64748B] hover:text-[#94A3B8] hover:bg-[#1E293B]/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Code View */}
        <div className="max-h-[460px] overflow-y-auto">
          <AttachmentCodeHighlighter code={currentCode} />
        </div>
      </div>
    </div>
  );
}
