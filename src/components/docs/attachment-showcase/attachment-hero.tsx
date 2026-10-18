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
} from "@/components/ui/attachment";
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  Download,
  Eye,
  X,
} from "lucide-react";

export function AttachmentHero({
  onPreviewHeroDoc,
}: {
  onPreviewHeroDoc?: () => void;
}) {
  const [downloaded, setDownloaded] = React.useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="relative mb-10 pb-8 border-b border-[#EEF2F6]">
      {/* Top Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F0FF] border border-[#E0E7FF] text-[#5145FF] text-xs font-semibold mb-4 select-none">
        <Sparkles size={13} />
        <span>Mintforge UI Component · Primitives</span>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Title & Description */}
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#111827] leading-[1.15]">
            Attachments, beautifully organized.
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-[#64748B] leading-relaxed">
            Display files, images, and upload activity with thoughtful previews, clear metadata, and intuitive actions.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-2xs">
              <Eye size={13} className="text-[#5145FF]" />
              <span>File & Image Previews</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-2xs">
              <Activity size={13} className="text-[#15803D]" />
              <span>Live Upload States</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-2xs">
              <Layers size={13} className="text-[#0284C7]" />
              <span>Flexible Layouts</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] shadow-2xs">
              <ShieldCheck size={13} className="text-[#7C3AED]" />
              <span>Accessible Actions</span>
            </span>
          </div>
        </div>

        {/* Small attractive hero attachment preview widget */}
        <div className="w-full sm:w-auto shrink-0">
          <div className="p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-md shadow-[#5145FF]/5 max-w-sm w-full">
            <div className="text-[11px] font-semibold text-[#64748B] mb-2 px-1 flex items-center justify-between">
              <span>Hero Live Preview</span>
              <span className="text-[#15803D] flex items-center gap-1 font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
                Ready
              </span>
            </div>

            <Attachment
              state="done"
              size="default"
              orientation="horizontal"
              className="bg-[#F8F9FC] border-[#E5E7EB]"
            >
              <AttachmentMedia category="document" alt="mintforge-architecture-spec.pdf" />

              <AttachmentContent>
                <AttachmentTitle>mintforge-architecture-spec.pdf</AttachmentTitle>
                <AttachmentDescription>
                  <span className="font-semibold text-[#5145FF] text-[10px] bg-[#F2F0FF] px-1.5 py-0.5 rounded">
                    PDF
                  </span>
                  <span>·</span>
                  <span className="font-mono text-[#64748B]">2.4 MB</span>
                  <span>·</span>
                  <span className="text-[#15803D] font-medium flex items-center gap-0.5">
                    <CheckCircle2 size={11} /> Uploaded
                  </span>
                </AttachmentDescription>
              </AttachmentContent>

              <AttachmentActions>
                {onPreviewHeroDoc && (
                  <AttachmentAction
                    variant="ghost"
                    onClick={onPreviewHeroDoc}
                    aria-label="Preview document"
                    title="Preview document"
                  >
                    <Eye size={14} />
                  </AttachmentAction>
                )}
                <AttachmentAction
                  variant={downloaded ? "subtle" : "ghost"}
                  onClick={handleDownload}
                  aria-label="Download document"
                  title="Download file"
                >
                  <Download size={14} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </div>
        </div>
      </div>
    </div>
  );
}
