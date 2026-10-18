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
} from "../attachment";
import {
  FileArchive,
  CheckCircle2,
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { formatFileSize } from "./attachment.types";

export interface AttachmentUploadProgressProps {
  name?: string;
  size?: number;
  initialProgress?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function AttachmentUploadProgress({
  name = "design-system.zip",
  size = 14800000,
  initialProgress = 64,
  autoStart = false,
  onComplete,
  onCancel,
  className = "",
}: AttachmentUploadProgressProps) {
  const [progress, setProgress] = React.useState(initialProgress);
  const [isPlaying, setIsPlaying] = React.useState(autoStart);
  const [isDone, setIsDone] = React.useState(initialProgress >= 100);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 5) + 3;
          if (next >= 100) {
            setIsPlaying(false);
            setIsDone(true);
            onComplete?.();
            return 100;
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, progress, onComplete]);

  const handleTogglePlay = () => {
    if (isDone) {
      setProgress(0);
      setIsDone(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setIsDone(false);
  };

  const handleCancelClick = () => {
    setIsPlaying(false);
    onCancel?.();
  };

  return (
    <div className={`space-y-3 w-full max-w-md ${className}`}>
      <Attachment
        state={isDone ? "done" : "uploading"}
        size="default"
        orientation="horizontal"
        className="w-full bg-white shadow-xs"
      >
        <AttachmentMedia category="archive" alt={name}>
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
            {isDone ? (
              <CheckCircle2 size={20} className="text-[#15803D]" />
            ) : (
              <FileArchive size={20} />
            )}
          </div>
        </AttachmentMedia>

        <AttachmentContent>
          <div className="flex items-center justify-between gap-2">
            <AttachmentTitle>{name}</AttachmentTitle>
            <span className="text-[11px] font-mono text-[#64748B] shrink-0">
              {formatFileSize(size)}
            </span>
          </div>

          {!isDone ? (
            <>
              <AttachmentProgress value={progress} />
              <div className="flex items-center justify-between text-[11px] font-mono mt-1 text-[#64748B]">
                <span className="text-[#5145FF] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5145FF] animate-pulse" />
                  Uploading...
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </>
          ) : (
            <AttachmentDescription>
              <span className="text-[#15803D] font-semibold text-[11px] flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={13} />
                Upload complete · Ready for deployment
              </span>
            </AttachmentDescription>
          )}
        </AttachmentContent>

        <AttachmentActions>
          {!isDone ? (
            <AttachmentAction
              variant="ghost"
              onClick={handleCancelClick}
              aria-label={`Cancel upload for ${name}`}
              title="Cancel upload"
            >
              <X size={15} />
            </AttachmentAction>
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
              <CheckCircle2 size={15} />
            </div>
          )}
        </AttachmentActions>
      </Attachment>

      {/* Interactive Simulation Controls */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8F9FC] border border-[#EEF2F6] text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#5145FF] text-white font-medium hover:bg-[#4338CA] transition cursor-pointer text-xs"
          >
            {isDone ? (
              <>
                <RotateCcw size={12} />
                <span>Restart</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause size={12} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Simulate</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:text-[#111827] font-medium transition cursor-pointer text-xs"
          >
            Reset
          </button>
        </div>

        <span className="text-[11px] text-[#64748B] font-mono">
          State: <strong className="text-[#111827]">{isDone ? "Done (100%)" : `${progress}%`}</strong>
        </span>
      </div>
    </div>
  );
}
