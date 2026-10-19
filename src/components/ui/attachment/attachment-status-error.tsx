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
} from "../attachment";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCw,
  Clock,
} from "lucide-react";
import { formatFileSize, AttachmentState } from "./attachment.types";

interface LifecycleItem {
  id: string;
  name: string;
  size: number;
  type: string;
  state: AttachmentState;
  category: "document" | "archive" | "data";
  progress?: number;
  error?: string;
  statusLabel: string;
}

export function AttachmentStatusErrorList() {
  const [items, setItems] = React.useState<LifecycleItem[]>([
    {
      id: "state-1",
      name: "selected-file.pdf",
      size: 1840000,
      type: "application/pdf",
      state: "idle",
      category: "document",
      statusLabel: "Selected · Waiting for upload",
    },
    {
      id: "state-2",
      name: "brand-assets.zip",
      size: 8900000,
      type: "application/zip",
      state: "uploading",
      category: "archive",
      progress: 48,
      statusLabel: "Uploading payload to edge",
    },
    {
      id: "state-3",
      name: "market-research.pdf",
      size: 4200000,
      type: "application/pdf",
      state: "processing",
      category: "document",
      statusLabel: "Processing · Extracting vector embeddings",
    },
    {
      id: "state-4",
      name: "financial-model.xlsx",
      size: 610000,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      state: "error",
      category: "data",
      error: "Upload failed. Connection timed out. Try again.",
      statusLabel: "Upload failed",
    },
    {
      id: "state-5",
      name: "uploaded-report.pdf",
      size: 3100000,
      type: "application/pdf",
      state: "done",
      category: "document",
      statusLabel: "Completed · Ready for review",
    },
  ]);

  const [retrying, setRetrying] = React.useState(false);

  // Demonstrate real retry behavior on the error card
  const handleRetry = (id: string) => {
    setRetrying(true);
    // 1. Set to uploading
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              state: "uploading",
              error: undefined,
              progress: 25,
              statusLabel: "Retrying upload (attempt 2)...",
            }
          : item
      )
    );

    // 2. Set to processing
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                state: "processing",
                progress: 75,
                statusLabel: "Validating spreadsheet schema...",
              }
            : item
        )
      );
    }, 1200);

    // 3. Mark completed
    setTimeout(() => {
      setRetrying(false);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                state: "done",
                progress: 100,
                statusLabel: "Completed · Synchronized successfully",
              }
            : item
        )
      );
    }, 2400);
  };

  const handleReset = () => {
    setRetrying(false);
    setItems([
      {
        id: "state-1",
        name: "selected-file.pdf",
        size: 1840000,
        type: "application/pdf",
        state: "idle",
        category: "document",
        statusLabel: "Selected · Waiting for upload",
      },
      {
        id: "state-2",
        name: "brand-assets.zip",
        size: 8900000,
        type: "application/zip",
        state: "uploading",
        category: "archive",
        progress: 48,
        statusLabel: "Uploading payload to edge",
      },
      {
        id: "state-3",
        name: "market-research.pdf",
        size: 4200000,
        type: "application/pdf",
        state: "processing",
        category: "document",
        statusLabel: "Processing · Extracting vector embeddings",
      },
      {
        id: "state-4",
        name: "financial-model.xlsx",
        size: 610000,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        state: "error",
        category: "data",
        error: "Upload failed. Connection timed out. Try again.",
        statusLabel: "Upload failed",
      },
      {
        id: "state-5",
        name: "uploaded-report.pdf",
        size: 3100000,
        type: "application/pdf",
        state: "done",
        category: "document",
        statusLabel: "Completed · Ready for review",
      },
    ]);
  };

  return (
    <div className="space-y-4 w-full max-w-xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#EEF2F6]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#111827]">Lifecycle States (5 Patterns):</span>
          <span className="text-[11px] text-[#64748B] font-mono">Idle, Uploading, Processing, Error, Done</span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-[#5145FF] hover:underline font-semibold cursor-pointer"
        >
          Reset States
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <Attachment
            key={item.id}
            state={item.state}
            size="default"
            orientation="horizontal"
            className="w-full bg-white transition-all shadow-xs"
          >
            <AttachmentMedia category={item.category} alt={item.name} />

            <AttachmentContent>
              <div className="flex items-center justify-between gap-2">
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <span className="text-[11px] font-mono text-[#64748B] shrink-0">
                  {formatFileSize(item.size)}
                </span>
              </div>

              {/* State-specific progress or descriptive label */}
              {item.state === "uploading" && (
                <div className="mt-1 space-y-1">
                  <AttachmentProgress value={item.progress || 50} />
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5145FF]">
                    <span className="flex items-center gap-1">
                      <Loader2 size={11} className="animate-spin" />
                      {item.statusLabel}
                    </span>
                    <span>{item.progress}%</span>
                  </div>
                </div>
              )}

              {item.state === "processing" && (
                <div className="mt-1 space-y-1">
                  <div className="w-full h-1.5 bg-[#F2F0FF] rounded-full overflow-hidden">
                    <div className="h-full w-full mf-att-shimmer-active rounded-full" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#5145FF] font-medium mt-0.5">
                    <Loader2 size={11} className="animate-spin" />
                    <span>{item.statusLabel}</span>
                  </div>
                </div>
              )}

              {item.state === "error" && (
                <div className="flex items-start gap-1.5 text-[11px] text-[#DC2626] font-medium mt-1">
                  <AlertCircle size={13} className="shrink-0 mt-0.5" />
                  <span>{item.error}</span>
                </div>
              )}

              {item.state === "done" && (
                <AttachmentDescription>
                  <span className="text-[#15803D] font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={13} />
                    {item.statusLabel}
                  </span>
                </AttachmentDescription>
              )}

              {item.state === "idle" && (
                <AttachmentDescription>
                  <span className="text-[#64748B] text-[11px] flex items-center gap-1 mt-0.5">
                    <Clock size={12} />
                    {item.statusLabel}
                  </span>
                </AttachmentDescription>
              )}
            </AttachmentContent>

            <AttachmentActions>
              {item.state === "error" && (
                <button
                  type="button"
                  onClick={() => handleRetry(item.id)}
                  disabled={retrying}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-semibold hover:bg-[#B91C1C] transition cursor-pointer disabled:opacity-50"
                  aria-label="Retry upload"
                >
                  <RotateCw size={11} className={retrying ? "animate-spin" : ""} />
                  <span>Retry</span>
                </button>
              )}

              {item.state === "done" && (
                <div className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
              )}
            </AttachmentActions>
          </Attachment>
        ))}
      </div>
    </div>
  );
}
