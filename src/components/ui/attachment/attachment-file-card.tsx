"use client";

import * as React from "react";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "../attachment";
import { Eye, Download, X, Check, FileText, FileCode, Table } from "lucide-react";
import { formatFileSize, getFileCategory } from "./attachment.types";

export interface AttachmentFileCardProps {
  id?: string;
  name?: string;
  size?: number;
  type?: string;
  onPreview?: (file: { name: string; size: number; type?: string }) => void;
  onDownload?: (file: { name: string; size: number; type?: string }) => void;
  onRemove?: (id: string) => void;
  showActions?: boolean;
  className?: string;
}

export function AttachmentFileCard({
  id = "file-1",
  name = "product-requirements.pdf",
  size = 2400000,
  type = "application/pdf",
  onPreview,
  onDownload,
  onRemove,
  showActions = true,
  className = "",
}: AttachmentFileCardProps) {
  const [downloaded, setDownloaded] = React.useState(false);
  const category = getFileCategory(name, type);
  const extension = name.split(".").pop()?.toUpperCase() || "FILE";

  const handleDownload = () => {
    setDownloaded(true);
    onDownload?.({ name, size, type });
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <Attachment
      state="done"
      size="default"
      orientation="horizontal"
      className={`max-w-md w-full bg-white hover:border-[#D1D5DB] transition-all hover:shadow-sm ${className}`}
    >
      <AttachmentMedia category={category} alt={name} />

      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
        <AttachmentDescription>
          <span className="font-semibold text-[#5145FF] tracking-wide uppercase text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded-md">
            {extension}
          </span>
          <span className="text-[#94A3B8]">·</span>
          <span className="font-mono text-[#64748B]">{formatFileSize(size)}</span>
        </AttachmentDescription>
      </AttachmentContent>

      {showActions && (
        <AttachmentActions>
          {onPreview && (
            <AttachmentAction
              variant="ghost"
              onClick={() => onPreview({ name, size, type })}
              aria-label={`Preview ${name}`}
              title="Preview document"
            >
              <Eye size={15} />
            </AttachmentAction>
          )}

          <AttachmentAction
            variant={downloaded ? "subtle" : "ghost"}
            onClick={handleDownload}
            aria-label={`Download ${name}`}
            title="Download file"
          >
            {downloaded ? (
              <Check size={14} className="text-[#15803D]" />
            ) : (
              <Download size={15} />
            )}
          </AttachmentAction>

          {onRemove && (
            <AttachmentAction
              variant="ghost"
              onClick={() => onRemove(id)}
              aria-label={`Remove ${name}`}
              title="Remove file"
            >
              <X size={15} />
            </AttachmentAction>
          )}
        </AttachmentActions>
      )}
    </Attachment>
  );
}

/** Demo stack displaying the 3 requested reference document cards */
export function AttachmentFileCardGroup({
  onPreview,
  onDownload,
}: {
  onPreview?: (file: { name: string; size: number; type?: string }) => void;
  onDownload?: (file: { name: string; size: number; type?: string }) => void;
}) {
  const [files, setFiles] = React.useState([
    {
      id: "doc-1",
      name: "product-requirements.pdf",
      size: 2400000,
      type: "application/pdf",
    },
    {
      id: "doc-2",
      name: "design-system.tsx",
      size: 84000,
      type: "text/typescript",
    },
    {
      id: "doc-3",
      name: "customer-data.csv",
      size: 560000,
      type: "text/csv",
    },
  ]);

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleReset = () => {
    setFiles([
      {
        id: "doc-1",
        name: "product-requirements.pdf",
        size: 2400000,
        type: "application/pdf",
      },
      {
        id: "doc-2",
        name: "design-system.tsx",
        size: 84000,
        type: "text/typescript",
      },
      {
        id: "doc-3",
        name: "customer-data.csv",
        size: 560000,
        type: "text/csv",
      },
    ]);
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#E5E7EB] bg-white text-center">
        <p className="text-xs text-[#64748B] mb-2">All files have been removed</p>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-[#F2F0FF] text-[#5145FF] text-xs font-semibold hover:bg-[#E0E7FF] transition cursor-pointer"
        >
          Reset Demo Files
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 w-full max-w-md">
      {files.map((file) => (
        <AttachmentFileCard
          key={file.id}
          id={file.id}
          name={file.name}
          size={file.size}
          type={file.type}
          onPreview={onPreview}
          onDownload={onDownload}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}
