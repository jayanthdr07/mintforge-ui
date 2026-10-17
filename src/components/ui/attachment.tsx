"use client";

import * as React from "react";
import {
  UploadCloud,
  File,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  Film,
  Music,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
  url?: string;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function getFileIcon(fileName: string, mimeType?: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext) || mimeType?.startsWith("image/")) {
    return <ImageIcon size={18} className="text-blue-500" />;
  }
  if (["mp4", "mov", "avi", "webm"].includes(ext) || mimeType?.startsWith("video/")) {
    return <Film size={18} className="text-purple-500" />;
  }
  if (["mp3", "wav", "ogg"].includes(ext) || mimeType?.startsWith("audio/")) {
    return <Music size={18} className="text-pink-500" />;
  }
  if (["ts", "tsx", "js", "jsx", "py", "json", "html", "css"].includes(ext)) {
    return <FileCode size={18} className="text-amber-500" />;
  }
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) {
    return <FileArchive size={18} className="text-orange-500" />;
  }
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
    return <FileText size={18} className="text-emerald-500" />;
  }
  return <File size={18} className="text-muted-foreground" />;
}

// ─── ATTACHMENT DROPZONE ─────────────────────────────────────────────────────

export interface AttachmentDropzoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  disabled?: boolean;
}

export const AttachmentDropzone = React.forwardRef<
  HTMLDivElement,
  AttachmentDropzoneProps
>(
  (
    {
      onFilesSelected,
      accept,
      maxFiles,
      maxSizeBytes = 10 * 1024 * 1024, // 10MB default
      disabled = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFiles = (incomingFiles: FileList | null) => {
      if (!incomingFiles || incomingFiles.length === 0 || disabled) return;
      let valid = Array.from(incomingFiles);
      if (maxFiles) valid = valid.slice(0, maxFiles);
      if (maxSizeBytes) valid = valid.filter((f) => f.size <= maxSizeBytes);
      onFilesSelected?.(valid);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    };

    return (
      <div
        ref={ref}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer select-none text-center ${
          disabled
            ? "opacity-50 pointer-events-none bg-muted/20 border-border"
            : isDragOver
            ? "border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10"
            : "border-border hover:border-emerald-500/50 hover:bg-muted/30 bg-card"
        } ${className}`}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={!maxFiles || maxFiles > 1}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {children || (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition">
              <UploadCloud size={24} className={isDragOver ? "text-emerald-500" : ""} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Supports files up to {formatBytes(maxSizeBytes)}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AttachmentDropzone.displayName = "AttachmentDropzone";

// ─── ATTACHMENT ITEM ─────────────────────────────────────────────────────────

export interface AttachmentItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  file: AttachmentFile;
  onRemove?: (id: string) => void;
}

export const AttachmentItem = React.forwardRef<
  HTMLDivElement,
  AttachmentItemProps
>(({ file, onRemove, className = "", ...props }, ref) => {
  const isUploading =
    file.progress !== undefined && file.progress >= 0 && file.progress < 100;
  const isDone = file.progress === 100;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card shadow-xs transition-all ${
        file.error ? "border-red-500/30 bg-red-500/5" : ""
      } ${className}`}
      {...props}
    >
      {/* Icon or Thumbnail */}
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
        {file.url && file.type?.startsWith("image/") ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={file.url}
            alt={file.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          getFileIcon(file.name, file.type)
        )}
      </div>

      {/* File Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-foreground truncate">
            {file.name}
          </p>
          <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
            {formatBytes(file.size)}
          </span>
        </div>

        {/* Progress or Error */}
        {isUploading && (
          <div className="mt-1.5 space-y-1">
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-200"
                style={{ width: `${file.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>Uploading...</span>
              <span>{file.progress}%</span>
            </div>
          </div>
        )}

        {isDone && !file.error && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            <CheckCircle2 size={12} />
            <span>Ready</span>
          </div>
        )}

        {file.error && (
          <div className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
            <AlertCircle size={12} />
            <span>{file.error}</span>
          </div>
        )}
      </div>

      {/* Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          aria-label={`Remove ${file.name}`}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition shrink-0"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
});
AttachmentItem.displayName = "AttachmentItem";
