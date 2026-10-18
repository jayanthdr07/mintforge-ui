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
  Table,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  Eye,
  RotateCw,
} from "lucide-react";
import {
  AttachmentState,
  AttachmentSize,
  AttachmentOrientation,
  formatFileSize,
  getFileCategory,
} from "./attachment/attachment.types";

// ============================================================================
// CONTEXT & HOOK
// ============================================================================

export interface AttachmentContextValue {
  state: AttachmentState;
  size: AttachmentSize;
  orientation: AttachmentOrientation;
  titleId: string;
  descriptionId: string;
}

const AttachmentContext = React.createContext<AttachmentContextValue | null>(null);

export function useAttachment() {
  const context = React.useContext(AttachmentContext);
  if (!context) {
    // Graceful fallback for static/isolated rendering
    return {
      state: "idle" as AttachmentState,
      size: "default" as AttachmentSize,
      orientation: "horizontal" as AttachmentOrientation,
      titleId: "attachment-title-default",
      descriptionId: "attachment-desc-default",
    };
  }
  return context;
}

// ============================================================================
// ROOT: ATTACHMENT
// ============================================================================

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: AttachmentState;
  size?: AttachmentSize;
  orientation?: AttachmentOrientation;
  children: React.ReactNode;
}

export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      state = "idle",
      size = "default",
      orientation = "horizontal",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const titleId = React.useId();
    const descriptionId = React.useId();

    const sizeStyles = {
      default: orientation === "horizontal" ? "p-3.5 gap-3.5 text-sm" : "p-4 gap-3 text-sm",
      sm: orientation === "horizontal" ? "p-2.5 gap-2.5 text-xs" : "p-3 gap-2 text-xs",
      xs: orientation === "horizontal" ? "p-2 gap-2 text-[11px]" : "p-2.5 gap-1.5 text-[11px]",
    }[size];

    const orientationStyles = {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-start",
    }[orientation];

    const stateStyles = {
      idle: "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-xs",
      uploading: "border-[#5145FF]/40 bg-[#FFFFFF] shadow-xs",
      processing: "border-[#5145FF]/30 bg-[#F2F0FF]/30 shadow-xs",
      error: "border-[#DC2626]/40 bg-[#FEF2F2]/60 hover:border-[#DC2626]/60",
      done: "border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-xs",
    }[state];

    return (
      <AttachmentContext.Provider
        value={{ state, size, orientation, titleId, descriptionId }}
      >
        <div
          ref={ref}
          role="group"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={`group relative flex rounded-2xl border transition-all duration-150 select-none ${orientationStyles} ${sizeStyles} ${stateStyles} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AttachmentContext.Provider>
    );
  }
);
Attachment.displayName = "Attachment";

// ============================================================================
// ATTACHMENT MEDIA (ICONS & THUMBNAILS)
// ============================================================================

export interface AttachmentMediaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  category?: "document" | "image" | "code" | "archive" | "audio" | "video" | "data" | "file";
  fallbackIcon?: React.ReactNode;
}

export const AttachmentMedia = React.forwardRef<
  HTMLDivElement,
  AttachmentMediaProps
>(
  (
    {
      src,
      alt = "Attachment preview",
      icon,
      category = "file",
      fallbackIcon,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const { size, orientation } = useAttachment();
    const [hasImageError, setHasImageError] = React.useState(false);

    const boxDimensions = {
      default: orientation === "horizontal" ? "w-11 h-11 min-w-[44px]" : "w-full aspect-video",
      sm: orientation === "horizontal" ? "w-9 h-9 min-w-[36px]" : "w-full aspect-video",
      xs: orientation === "horizontal" ? "w-7 h-7 min-w-[28px]" : "w-full aspect-square",
    }[size];

    const iconSize = size === "xs" ? 14 : size === "sm" ? 17 : 20;

    const renderDefaultIcon = () => {
      switch (category) {
        case "document":
          return <FileText size={iconSize} className="text-[#5145FF]" />;
        case "image":
          return <ImageIcon size={iconSize} className="text-[#0284C7]" />;
        case "code":
          return <FileCode size={iconSize} className="text-[#0D9488]" />;
        case "data":
          return <Table size={iconSize} className="text-[#15803D]" />;
        case "archive":
          return <FileArchive size={iconSize} className="text-[#D97706]" />;
        case "video":
          return <Film size={iconSize} className="text-[#7C3AED]" />;
        case "audio":
          return <Music size={iconSize} className="text-[#DB2777]" />;
        default:
          return <File size={iconSize} className="text-[#64748B]" />;
      }
    };

    const badgeBg = {
      document: "bg-[#F2F0FF] text-[#5145FF]",
      image: "bg-[#E0F2FE] text-[#0284C7]",
      code: "bg-[#CCFBF1] text-[#0D9488]",
      data: "bg-[#DCFCE7] text-[#15803D]",
      archive: "bg-[#FEF3C7] text-[#D97706]",
      video: "bg-[#EDE9FE] text-[#7C3AED]",
      audio: "bg-[#FCE7F3] text-[#DB2777]",
      file: "bg-[#F1F5F9] text-[#64748B]",
    }[category];

    return (
      <div
        ref={ref}
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 transition-transform ${boxDimensions} ${
          !src || hasImageError ? badgeBg : "bg-[#F8F9FC] border border-[#E5E7EB]"
        } ${className}`}
        {...props}
      >
        {children || (
          <>
            {src && !hasImageError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={src}
                alt={alt}
                onError={() => setHasImageError(true)}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : icon ? (
              icon
            ) : fallbackIcon ? (
              fallbackIcon
            ) : (
              renderDefaultIcon()
            )}
          </>
        )}
      </div>
    );
  }
);
AttachmentMedia.displayName = "AttachmentMedia";

// ============================================================================
// ATTACHMENT CONTENT
// ============================================================================

export const AttachmentContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex-1 min-w-0 flex flex-col justify-center gap-0.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentContent.displayName = "AttachmentContent";

// ============================================================================
// ATTACHMENT TITLE
// ============================================================================

export interface AttachmentTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const AttachmentTitle = React.forwardRef<
  HTMLHeadingElement,
  AttachmentTitleProps
>(({ className = "", children, ...props }, ref) => {
  const { titleId, size } = useAttachment();

  const titleSize = {
    default: "text-[13.5px]",
    sm: "text-xs",
    xs: "text-[11px]",
  }[size];

  return (
    <h4
      ref={ref}
      id={titleId}
      title={typeof children === "string" ? children : undefined}
      className={`font-semibold text-[#111827] truncate tracking-tight leading-snug ${titleSize} ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
});
AttachmentTitle.displayName = "AttachmentTitle";

// ============================================================================
// ATTACHMENT DESCRIPTION & METADATA
// ============================================================================

export interface AttachmentDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AttachmentDescription = React.forwardRef<
  HTMLDivElement,
  AttachmentDescriptionProps
>(({ className = "", children, ...props }, ref) => {
  const { descriptionId, size } = useAttachment();

  const descSize = {
    default: "text-xs",
    sm: "text-[11px]",
    xs: "text-[10px]",
  }[size];

  return (
    <div
      ref={ref}
      id={descriptionId}
      className={`text-[#64748B] flex items-center flex-wrap gap-1.5 font-normal leading-normal ${descSize} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentDescription.displayName = "AttachmentDescription";

// ============================================================================
// ATTACHMENT PROGRESS BAR
// ============================================================================

export interface AttachmentProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 - 100
  animated?: boolean;
}

export const AttachmentProgress = React.forwardRef<
  HTMLDivElement,
  AttachmentProgressProps
>(({ value = 0, animated = true, className = "", ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Upload progress: ${clamped}%`}
      className={`w-full h-1.5 bg-[#EEF2F6] rounded-full overflow-hidden mt-1.5 ${className}`}
      {...props}
    >
      <div
        className={`h-full bg-[#5145FF] transition-all duration-200 rounded-full ${
          animated && clamped < 100 ? "mf-att-shimmer-active" : ""
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
});
AttachmentProgress.displayName = "AttachmentProgress";

// ============================================================================
// ATTACHMENT ACTIONS & ACTION BUTTONS
// ============================================================================

export const AttachmentActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center gap-1 shrink-0 ml-auto z-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
AttachmentActions.displayName = "AttachmentActions";

export interface AttachmentActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "subtle" | "danger";
  children: React.ReactNode;
}

export const AttachmentAction = React.forwardRef<
  HTMLButtonElement,
  AttachmentActionProps
>(({ variant = "ghost", className = "", children, onClick, ...props }, ref) => {
  const { size } = useAttachment();

  const buttonSize = {
    default: "w-8 h-8",
    sm: "w-7 h-7",
    xs: "w-6 h-6",
  }[size];

  const variantStyles = {
    ghost: "text-[#64748B] hover:text-[#111827] hover:bg-[#F2F0FF]/60",
    subtle: "text-[#5145FF] bg-[#F2F0FF] hover:bg-[#E0E7FF]",
    danger: "text-[#DC2626] hover:bg-[#FEF2F2] hover:text-[#B91C1C]",
  }[variant];

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF] ${buttonSize} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
AttachmentAction.displayName = "AttachmentAction";

// ============================================================================
// ATTACHMENT TRIGGER (INTERACTIVE CARD-LEVEL CLICK)
// ============================================================================

export interface AttachmentTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AttachmentTrigger = React.forwardRef<
  HTMLButtonElement,
  AttachmentTriggerProps
>(({ className = "", children, onClick, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`absolute inset-0 w-full h-full rounded-2xl bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5145FF] z-0 text-left ${className}`}
      {...props}
    >
      <span className="sr-only">Open attachment</span>
      {children}
    </button>
  );
});
AttachmentTrigger.displayName = "AttachmentTrigger";

// ============================================================================
// ATTACHMENT GROUP (SCROLLABLE ROW CONTAINER)
// ============================================================================

export interface AttachmentGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AttachmentGroup = React.forwardRef<
  HTMLDivElement,
  AttachmentGroupProps
>(({ className = "", children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hasOverflowLeft, setHasOverflowLeft] = React.useState(false);
  const [hasOverflowRight, setHasOverflowRight] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setHasOverflowLeft(scrollLeft > 6);
    setHasOverflowRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, children]);

  return (
    <div
      ref={ref}
      className={`mf-attachment-group-container relative w-full ${
        hasOverflowLeft ? "has-overflow-left" : ""
      } ${hasOverflowRight ? "has-overflow-right" : ""} ${className}`}
      {...props}
    >
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="mf-attachment-group-track"
      >
        {children}
      </div>
    </div>
  );
});
AttachmentGroup.displayName = "AttachmentGroup";

// ============================================================================
// BACKWARDS COMPATIBILITY: ATTACHMENT DROPZONE & ATTACHMENT ITEM
// ============================================================================

export interface AttachmentFile {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
  url?: string;
}

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
      maxSizeBytes = 10 * 1024 * 1024,
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
            ? "opacity-50 pointer-events-none bg-[#F9FAFB] border-[#E5E7EB]"
            : isDragOver
            ? "border-[#5145FF] bg-[#F2F0FF]/40 ring-4 ring-[#5145FF]/10"
            : "border-[#E5E7EB] hover:border-[#5145FF]/50 hover:bg-[#F9FAFB] bg-white"
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
            <div className="w-12 h-12 rounded-xl bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center transition">
              <UploadCloud size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">
                Supports files up to {formatFileSize(maxSizeBytes)}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AttachmentDropzone.displayName = "AttachmentDropzone";

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
  const category = getFileCategory(file.name, file.type);

  return (
    <Attachment
      ref={ref}
      state={file.error ? "error" : isUploading ? "uploading" : isDone ? "done" : "idle"}
      className={className}
      {...props}
    >
      <AttachmentMedia src={file.url} category={category} alt={file.name} />
      <AttachmentContent>
        <div className="flex items-center justify-between gap-2">
          <AttachmentTitle>{file.name}</AttachmentTitle>
          <span className="text-[11px] text-[#64748B] font-mono shrink-0">
            {formatFileSize(file.size)}
          </span>
        </div>

        {isUploading && (
          <div className="mt-1 space-y-1">
            <AttachmentProgress value={file.progress} />
            <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
              <span>Uploading...</span>
              <span>{file.progress}%</span>
            </div>
          </div>
        )}

        {isDone && !file.error && (
          <div className="flex items-center gap-1 text-[11px] text-[#15803D] mt-0.5 font-medium">
            <CheckCircle2 size={12} />
            <span>Ready</span>
          </div>
        )}

        {file.error && (
          <div className="flex items-center gap-1 text-[11px] text-[#DC2626] mt-0.5 font-medium">
            <AlertCircle size={12} />
            <span>{file.error}</span>
          </div>
        )}
      </AttachmentContent>

      {onRemove && (
        <AttachmentActions>
          <AttachmentAction
            variant="ghost"
            onClick={() => onRemove(file.id)}
            aria-label={`Remove ${file.name}`}
          >
            <X size={14} />
          </AttachmentAction>
        </AttachmentActions>
      )}
    </Attachment>
  );
});
AttachmentItem.displayName = "AttachmentItem";

// Re-export presets and types
export * from "./attachment/attachment.types";
export * from "./attachment/attachment-file-card";
export * from "./attachment/attachment-image-preview";
export * from "./attachment/attachment-upload-progress";
export * from "./attachment/attachment-status-error";
export * from "./attachment/attachment-group-view";
