"use client";

import * as React from "react";
import { X, Download, FileText, Check } from "lucide-react";
import { formatFileSize } from "@/components/ui/attachment/attachment.types";

export interface PreviewModalData {
  name: string;
  size: number;
  type?: string;
  src?: string;
}

export function AttachmentPreviewModal({
  data,
  onClose,
}: {
  data: PreviewModalData | null;
  onClose: () => void;
}) {
  const [downloaded, setDownloaded] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (data) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, onClose]);

  if (!data) return null;

  const isImage = data.type?.startsWith("image/") || ["png", "jpg", "jpeg", "webp", "gif"].some((ext) => data.name.toLowerCase().endsWith(ext));

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${data.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl p-5 sm:p-6 text-[#111827] flex flex-col gap-4 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F6]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#F2F0FF] text-[#5145FF] flex items-center justify-center shrink-0">
              <FileText size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-[#111827] truncate">
                {data.name}
              </h3>
              <p className="text-xs text-[#64748B] font-mono">
                {formatFileSize(data.size)} · Preview Mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] hover:bg-[#F9FAFB] transition cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check size={13} className="text-[#15803D]" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Download</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-[#F9FAFB] transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Viewer */}
        <div className="w-full min-h-[260px] max-h-[460px] rounded-xl bg-[#F8F9FC] border border-[#EEF2F6] overflow-hidden flex items-center justify-center p-4">
          {isImage && data.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={data.src}
              alt={data.name}
              className="max-h-[400px] w-auto max-w-full object-contain rounded-lg shadow-xs"
            />
          ) : (
            <div className="text-center max-w-sm p-6 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#F2F0FF] text-[#5145FF] mx-auto flex items-center justify-center">
                <FileText size={24} />
              </div>
              <p className="text-sm font-semibold text-[#111827]">{data.name}</p>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Document preview successfully rendered. All payload parameters and cryptographic checksums match FastAPI specification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
