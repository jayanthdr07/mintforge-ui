"use client";

import * as React from "react";
import { Copy, Check, FileCode, Terminal, Code2, Layers } from "lucide-react";
import { AttachmentCodeHighlighter } from "./attachment-code-highlighter";

export type AttachmentCodeTab = "file" | "image" | "progress" | "lifecycle" | "group";
export type CodeViewMode = "snippet" | "full";

export function getAttachmentDisplayCode(
  variant: AttachmentCodeTab,
  mode: CodeViewMode
): string {
  if (mode === "snippet") {
    switch (variant) {
      case "file":
        return `<Attachment state="done" size="default" orientation="horizontal">
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
    <AttachmentAction onClick={() => handlePreview()} aria-label="Preview">
      <Eye size={15} />
    </AttachmentAction>
    <AttachmentAction onClick={() => handleDownload()} aria-label="Download">
      <Download size={15} />
    </AttachmentAction>
    <AttachmentAction onClick={() => handleRemove()} aria-label="Remove">
      <X size={15} />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`;

      case "image":
        return `<Attachment state="done" size="default" orientation="horizontal">
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
    <AttachmentAction onClick={() => handleZoom()} aria-label="Preview image">
      <Eye size={15} />
    </AttachmentAction>
    <AttachmentAction onClick={() => handleRemove()} aria-label="Remove image">
      <X size={15} />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`;

      case "progress":
        return `<Attachment state="uploading" size="default" orientation="horizontal">
  <AttachmentMedia category="archive" alt="design-system.zip" />

  <AttachmentContent>
    <div className="flex items-center justify-between">
      <AttachmentTitle>design-system.zip</AttachmentTitle>
      <span className="text-[11px] font-mono text-[#64748B]">14.8 MB</span>
    </div>

    <AttachmentProgress value={64} />

    <div className="flex justify-between text-[11px] font-mono mt-1 text-[#5145FF]">
      <span>Uploading...</span>
      <span>64%</span>
    </div>
  </AttachmentContent>

  <AttachmentActions>
    <AttachmentAction onClick={() => handleCancel()} aria-label="Cancel upload">
      <X size={15} />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`;

      case "lifecycle":
        return `<Attachment state="error" size="default">
  <AttachmentMedia category="data" alt="financial-model.xlsx" />

  <AttachmentContent>
    <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
    <div className="text-[11px] text-[#DC2626] font-medium flex items-center gap-1 mt-0.5">
      <AlertCircle size={13} />
      <span>Upload failed. Connection timed out. Try again.</span>
    </div>
  </AttachmentContent>

  <AttachmentActions>
    <button
      type="button"
      onClick={handleRetry}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-semibold hover:bg-[#B91C1C] transition cursor-pointer"
    >
      <RotateCw size={11} />
      <span>Retry</span>
    </button>
  </AttachmentActions>
</Attachment>`;

      case "group":
        return `<AttachmentGroup>
  {files.map((file) => (
    <Attachment
      key={file.id}
      size="sm"
      orientation="horizontal"
      className="w-[240px] shrink-0 bg-white snap-start"
    >
      <AttachmentMedia category={file.category} alt={file.name} />

      <AttachmentContent>
        <AttachmentTitle className="text-xs">{file.name}</AttachmentTitle>
        <AttachmentDescription>{file.formattedSize}</AttachmentDescription>
      </AttachmentContent>

      <AttachmentActions>
        <AttachmentAction onClick={() => handleRemove(file.id)} aria-label="Remove">
          <X size={13} />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ))}
</AttachmentGroup>`;
    }
  }

  // Full Component Mode
  switch (variant) {
    case "file":
      return `import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { Eye, Download, X } from "lucide-react";

export function FileAttachmentDemo() {
  const [downloaded, setDownloaded] = React.useState(false);

  return (
    <div className="space-y-2.5 max-w-md w-full">
      <Attachment state="done" size="default" orientation="horizontal">
        <AttachmentMedia category="document" alt="product-requirements.pdf" />

        <AttachmentContent>
          <AttachmentTitle>product-requirements.pdf</AttachmentTitle>
          <AttachmentDescription>
            <span className="font-semibold text-[#5145FF] text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded">
              PDF
            </span>
            <span>·</span>
            <span className="font-mono">2.4 MB</span>
          </AttachmentDescription>
        </AttachmentContent>

        <AttachmentActions>
          <AttachmentAction onClick={() => alert("Opening preview...")} aria-label="Preview">
            <Eye size={15} />
          </AttachmentAction>
          <AttachmentAction
            variant={downloaded ? "subtle" : "ghost"}
            onClick={() => setDownloaded(true)}
            aria-label="Download"
          >
            <Download size={15} />
          </AttachmentAction>
          <AttachmentAction onClick={() => alert("Removed file")} aria-label="Remove">
            <X size={15} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}`;

    case "image":
      return `import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { Eye, X } from "lucide-react";

export function ImagePreviewDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      <Attachment state="done" size="default" orientation="vertical">
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
          <AttachmentAction onClick={() => alert("Zooming image...")} aria-label="Preview">
            <Eye size={15} />
          </AttachmentAction>
          <AttachmentAction onClick={() => alert("Removed image")} aria-label="Remove">
            <X size={15} />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}`;

    case "progress":
      return `import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentProgress,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { X, CheckCircle2 } from "lucide-react";

export function UploadProgressDemo() {
  const [progress, setProgress] = React.useState(64);

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
        <AttachmentAction onClick={() => alert("Cancelled upload")} aria-label="Cancel">
          <X size={15} />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}`;

    case "lifecycle":
      return `import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { AlertCircle, RotateCw } from "lucide-react";

export function StatusLifecycleDemo() {
  const [retrying, setRetrying] = React.useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      alert("Successfully re-uploaded file");
    }, 1500);
  };

  return (
    <Attachment state="error" size="default">
      <AttachmentMedia category="data" alt="financial-model.xlsx" />

      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <div className="text-[11px] text-[#DC2626] font-medium flex items-center gap-1 mt-0.5">
          <AlertCircle size={13} />
          <span>Upload failed. Connection timed out. Try again.</span>
        </div>
      </AttachmentContent>

      <AttachmentActions>
        <button
          type="button"
          onClick={handleRetry}
          disabled={retrying}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-semibold hover:bg-[#B91C1C] transition cursor-pointer disabled:opacity-50"
        >
          <RotateCw size={11} className={retrying ? "animate-spin" : ""} />
          <span>Retry</span>
        </button>
      </AttachmentActions>
    </Attachment>
  );
}`;

    case "group":
      return `import * as React from "react";
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { X } from "lucide-react";

export function AttachmentGroupDemo() {
  const [items, setItems] = React.useState([
    { id: "1", name: "specs.pdf", size: "2.4 MB", category: "document" },
    { id: "2", name: "hero.png", size: "3.8 MB", category: "image" },
    { id: "3", name: "schema.ts", size: "84 KB", category: "code" },
  ]);

  return (
    <AttachmentGroup>
      {items.map((item) => (
        <Attachment
          key={item.id}
          size="sm"
          orientation="horizontal"
          className="w-[240px] shrink-0 bg-white snap-start"
        >
          <AttachmentMedia category={item.category as any} alt={item.name} />

          <AttachmentContent>
            <AttachmentTitle className="text-xs">{item.name}</AttachmentTitle>
            <AttachmentDescription>{item.size}</AttachmentDescription>
          </AttachmentContent>

          <AttachmentActions>
            <AttachmentAction
              onClick={() => setItems((p) => p.filter((x) => x.id !== item.id))}
              aria-label="Remove"
            >
              <X size={13} />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}`;
  }
}

export function AttachmentBigCodeSection() {
  const [activeTab, setActiveTab] = React.useState<AttachmentCodeTab>("file");
  const [viewMode, setViewMode] = React.useState<CodeViewMode>("full");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  const displayCode = React.useMemo(
    () => getAttachmentDisplayCode(activeTab, viewMode),
    [activeTab, viewMode]
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      window.prompt("Copy code:", displayCode);
    }
  };

  const handleCopyCli = async () => {
    const cliCmd = "npx mintforge add attachment";
    try {
      await navigator.clipboard.writeText(cliCmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      window.prompt("Copy CLI command:", cliCmd);
    }
  };

  const tabs: { id: AttachmentCodeTab; label: string }[] = [
    { id: "file", label: "File Card" },
    { id: "image", label: "Image Preview" },
    { id: "progress", label: "Upload Progress" },
    { id: "lifecycle", label: "Status & Error" },
    { id: "group", label: "Group Row" },
  ];

  return (
    <div className="w-full bg-[#0B0F19] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800/90 bg-slate-900/70">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5145FF]/20 text-[#5145FF] border border-[#5145FF]/30 flex items-center justify-center shrink-0">
            <FileCode size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono tracking-tight">
                attachment-{activeTab}.tsx
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5145FF]/20 text-[#818CF8] border border-[#5145FF]/30">
                {viewMode === "full" ? "Full Component" : "JSX Snippet"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive code dynamically synchronized with selected attachment design.
            </p>
          </div>
        </div>

        {/* Center: Variant Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#5145FF] text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: View Mode Toggle & Copy Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("snippet")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                viewMode === "snippet"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Show JSX Snippet only"
            >
              <Code2 size={12} />
              <span>Snippet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("full")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                viewMode === "full"
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Show full React component with imports"
            >
              <Layers size={12} />
              <span>Full Component</span>
            </button>
          </div>

          {/* CLI Copy */}
          <button
            type="button"
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all cursor-pointer"
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>{copiedCli ? "CLI Copied!" : "npx mintforge add attachment"}</span>
          </button>

          {/* Code Copy */}
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5145FF] hover:bg-[#4338CA] shadow-sm transition-all cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check size={14} className="text-emerald-300" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-6 overflow-x-auto max-h-[460px] overflow-y-auto">
        <AttachmentCodeHighlighter code={displayCode} />
      </div>

      {/* Footer Info Pill */}
      <div className="px-6 py-2.5 bg-slate-900/40 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Includes full compound components: &lt;Attachment /&gt;, &lt;AttachmentMedia /&gt;, &lt;AttachmentContent /&gt;, &lt;AttachmentProgress /&gt;</span>
        <span className="text-slate-500 font-mono text-[11px]">Design: {activeTab} · Mode: {viewMode}</span>
      </div>
    </div>
  );
}
