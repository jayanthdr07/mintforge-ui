"use client";

import * as React from "react";
import "@/styles/accordion-showcase.css";
import "@/styles/alert-showcase.css";
import "@/styles/alert-dialog-showcase.css";
import "@/styles/attachment-showcase.css";

import { AttachmentHero } from "@/components/docs/attachment-showcase/attachment-hero";
import {
  AttachmentVariantNav,
  AttachmentNavTab,
} from "@/components/docs/attachment-showcase/attachment-variant-nav";
import {
  AttachmentFileCardGroup,
  AttachmentFileCard,
} from "@/components/ui/attachment/attachment-file-card";
import {
  AttachmentImageGallery,
  AttachmentImagePreview,
} from "@/components/ui/attachment/attachment-image-preview";
import { AttachmentUploadProgress } from "@/components/ui/attachment/attachment-upload-progress";
import { AttachmentStatusErrorList } from "@/components/ui/attachment/attachment-status-error";
import { AttachmentGroupShowcase } from "@/components/ui/attachment/attachment-group-view";
import { AttachmentPlayground } from "@/components/docs/attachment-showcase/attachment-playground";
import { AttachmentBigCodeSection } from "@/components/docs/attachment-showcase/attachment-code-section";
import {
  AttachmentPreviewModal,
  PreviewModalData,
} from "@/components/docs/attachment-showcase/attachment-preview-modal";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import {
  FileText,
  Image as ImageIcon,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";
import { PropItem } from "@/types/docs";

export default function AttachmentDocPage() {
  const [activeTab, setActiveTab] = React.useState<AttachmentNavTab>("files");
  const [previewData, setPreviewData] = React.useState<PreviewModalData | null>(null);

  const attachmentPropsList: PropItem[] = [
    {
      name: "state",
      type: '"idle" | "uploading" | "processing" | "error" | "done"',
      defaultValue: '"idle"',
      description: "Lifecycle upload and processing state of the attachment card.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "xs"',
      defaultValue: '"default"',
      description: "Controls internal padding, thumbnail dimensions, and typography scale.",
    },
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Visual layout orientation. 'horizontal' for rows, 'vertical' for cards.",
    },
    {
      name: "className",
      type: "string",
      defaultValue: '""',
      description: "Additional CSS classes applied to root container.",
    },
  ];

  const attachmentMediaPropsList: PropItem[] = [
    {
      name: "src",
      type: "string",
      defaultValue: "undefined",
      description: "Image thumbnail source URL. Safely handles load errors with fallback.",
    },
    {
      name: "alt",
      type: "string",
      defaultValue: '"Attachment preview"',
      description: "Accessible text description for thumbnail images.",
    },
    {
      name: "category",
      type: '"document" | "image" | "code" | "archive" | "audio" | "video" | "data" | "file"',
      defaultValue: '"file"',
      description: "Semantic category used to select default file iconography and color badge.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      defaultValue: "undefined",
      description: "Custom icon element overriding default category iconography.",
    },
  ];

  const attachmentProgressPropsList: PropItem[] = [
    {
      name: "value",
      type: "number (0 - 100)",
      defaultValue: "0",
      description: "Current upload percentage bound to WAI-ARIA progressbar attributes.",
    },
    {
      name: "animated",
      type: "boolean",
      defaultValue: "true",
      description: "Renders smooth shimmer gradient when uploading.",
    },
  ];

  const attachmentActionPropsList: PropItem[] = [
    {
      name: "variant",
      type: '"ghost" | "subtle" | "danger"',
      defaultValue: '"ghost"',
      description: "Color and background styling for individual action buttons.",
    },
    {
      name: "onClick",
      type: "React.MouseEventHandler",
      defaultValue: "undefined",
      description: "Action callback. Executes stopPropagation() to prevent firing card triggers.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      defaultValue: "required",
      description: "Button icon or label content.",
    },
  ];

  return (
    <div className="mf-attachment-doc-scope">
      {/* 1. Hero Section */}
      <AttachmentHero
        onPreviewHeroDoc={() =>
          setPreviewData({
            name: "mintforge-architecture-spec.pdf",
            size: 2400000,
            type: "application/pdf",
          })
        }
      />

      {/* 2. Variant Navigation Bar */}
      <AttachmentVariantNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* 3. Showcase Sections */}
      <div className="space-y-12">
        {/* DESIGN 1: File Attachments */}
        <section id="section-files" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5145FF]" />
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  Design 1 — Premium File Card
                </h2>
              </div>
              <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                Horizontal rows for documents and code files featuring custom iconography, truncated filenames, size metadata, and independent preview/download/remove actions.
              </p>
            </div>
            <span className="text-xs font-mono text-[#5145FF] bg-[#F2F0FF] px-2.5 py-1 rounded-full shrink-0 font-semibold self-start sm:self-auto">
              PDF · TSX · CSV
            </span>
          </div>

          <div className="mf-attachment-showcase-card flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F8F9FC]/60 border border-[#E5E7EB]">
            <AttachmentFileCardGroup
              onPreview={(f) => setPreviewData(f)}
              onDownload={(f) => console.log("Downloaded:", f.name)}
            />
          </div>
        </section>

        {/* DESIGN 2: Image Preview Attachments */}
        <section id="section-images" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  Design 2 — Image Preview Attachment
                </h2>
              </div>
              <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                Creative workspace thumbnails supporting horizontal rows and vertical card grids with instant full-resolution preview lightboxes.
              </p>
            </div>
            <span className="text-xs font-mono text-[#0284C7] bg-[#E0F2FE] px-2.5 py-1 rounded-full shrink-0 font-semibold self-start sm:self-auto">
              PNG · JPG · WEBP
            </span>
          </div>

          <div className="mf-attachment-showcase-card p-6 sm:p-8 bg-[#F8F9FC]/60 border border-[#E5E7EB]">
            <AttachmentImageGallery onPreview={(img) => setPreviewData(img)} />
          </div>
        </section>

        {/* DESIGNS 3 & 4: Upload States & Lifecycle */}
        <section id="section-upload-states" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  Designs 3 & 4 — Live Upload States & Error Recovery
                </h2>
              </div>
              <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                Real progress percentages, shimmer animations, error descriptions, and working retry demonstrations across all 5 lifecycle states.
              </p>
            </div>
            <span className="text-xs font-mono text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded-full shrink-0 font-semibold self-start sm:self-auto">
              5 Lifecycle Stages
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Design 3: Upload Progress */}
            <div className="lg:col-span-5 mf-attachment-showcase-card p-6 bg-white border border-[#E5E7EB] space-y-4">
              <div className="border-b border-[#EEF2F6] pb-3">
                <h3 className="font-bold text-sm text-[#111827]">
                  Design 3: Upload in Progress
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Interactive simulation with play, pause, restart, and cancel.
                </p>
              </div>

              <AttachmentUploadProgress
                name="design-system.zip"
                size={14800000}
                initialProgress={64}
              />
            </div>

            {/* Design 4: Status & Error List */}
            <div className="lg:col-span-7 mf-attachment-showcase-card p-6 bg-white border border-[#E5E7EB] space-y-4">
              <div className="border-b border-[#EEF2F6] pb-3">
                <h3 className="font-bold text-sm text-[#111827]">
                  Design 4: Status & Error Handling
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Clear text labels, non-color reliant states, and working retry.
                </p>
              </div>

              <AttachmentStatusErrorList />
            </div>
          </div>
        </section>

        {/* DESIGN 5: Attachment Group */}
        <section id="section-groups" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  Design 5 — Attachment Group
                </h2>
              </div>
              <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                Horizontal scroll strip for chat composers and message threads with smooth scrolling, edge fade masks, and an empty state.
              </p>
            </div>
            <span className="text-xs font-mono text-[#7C3AED] bg-[#EDE9FE] px-2.5 py-1 rounded-full shrink-0 font-semibold self-start sm:self-auto">
              Multi-File Strip
            </span>
          </div>

          <div className="mf-attachment-showcase-card p-6 sm:p-8 bg-white border border-[#E5E7EB]">
            <AttachmentGroupShowcase />
          </div>
        </section>

        {/* 4. Interactive Playground */}
        <section id="section-playground" className="space-y-4 pt-6 border-t border-[#EEF2F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#5145FF]" />
                <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                  Interactive Playground
                </h2>
              </div>
              <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                Configure attachment types, states, sizing scales, orientations, and select your own files to inspect live code in real time.
              </p>
            </div>
          </div>

          <AttachmentPlayground onOpenPreview={(f) => setPreviewData(f)} />
        </section>

        {/* 5. Component Code Export Section */}
        <section id="section-code-export" className="space-y-4 pt-6 border-t border-[#EEF2F6]">
          <div>
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-[#5145FF]" />
              <h2 className="text-xl font-bold tracking-tight text-[#111827]">
                Code Export & Installation
              </h2>
            </div>
            <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
              Copy complete component definitions or copyable JSX snippets for your application.
            </p>
          </div>

          <AttachmentBigCodeSection />
        </section>

        {/* 6. Documentation & Props Tables */}
        <section id="section-docs-api" className="space-y-8 pt-8 border-t border-[#EEF2F6]">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#5145FF]" />
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                API Reference
              </h2>
            </div>
            <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
              Explore TypeScript prop definitions across the compound Attachment primitive family.
            </p>
          </div>

          {/* Attachment Props */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <span>Attachment</span>
              <span className="text-xs font-mono font-normal text-[#64748B]">
                (Root Container)
              </span>
            </h3>
            <ComponentPropsTable props={attachmentPropsList} />
          </div>

          {/* AttachmentMedia Props */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <span>AttachmentMedia</span>
              <span className="text-xs font-mono font-normal text-[#64748B]">
                (Icon / Thumbnail Container)
              </span>
            </h3>
            <ComponentPropsTable props={attachmentMediaPropsList} />
          </div>

          {/* AttachmentProgress Props */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <span>AttachmentProgress</span>
              <span className="text-xs font-mono font-normal text-[#64748B]">
                (Accessible Progress Bar)
              </span>
            </h3>
            <ComponentPropsTable props={attachmentProgressPropsList} />
          </div>

          {/* AttachmentAction Props */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <span>AttachmentAction</span>
              <span className="text-xs font-mono font-normal text-[#64748B]">
                (Action Button with stopPropagation)
              </span>
            </h3>
            <ComponentPropsTable props={attachmentActionPropsList} />
          </div>

          {/* Accessibility Guidance */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-3">
            <div className="flex items-center gap-2 text-[#15803D]">
              <ShieldCheck size={18} />
              <h3 className="font-bold text-sm text-[#111827]">
                WAI-ARIA Accessibility Standards
              </h3>
            </div>
            <ul className="list-disc list-inside text-xs text-[#64748B] space-y-1.5 leading-relaxed">
              <li>
                <strong className="text-[#111827]">Semantic Landmarks:</strong> Attachment cards use <code className="text-[#5145FF] font-mono">role="group"</code> with <code className="text-[#5145FF] font-mono">aria-labelledby</code> and <code className="text-[#5145FF] font-mono">aria-describedby</code> linking to the title and metadata description.
              </li>
              <li>
                <strong className="text-[#111827]">Accessible Action Labels:</strong> Every icon action button provides an explicit <code className="text-[#5145FF] font-mono">aria-label</code> (e.g. &ldquo;Remove product-requirements.pdf&rdquo;) so screen reader users hear the target file context.
              </li>
              <li>
                <strong className="text-[#111827]">Event Isolation:</strong> Action buttons automatically execute <code className="text-[#5145FF] font-mono">e.stopPropagation()</code> to prevent accidental triggering of card-level open/navigation actions.
              </li>
              <li>
                <strong className="text-[#111827]">Progress Semantics:</strong> <code className="text-[#5145FF] font-mono">AttachmentProgress</code> enforces <code className="text-[#5145FF] font-mono">role="progressbar"</code>, <code className="text-[#5145FF] font-mono">aria-valuenow</code>, <code className="text-[#5145FF] font-mono">aria-valuemin="0"</code>, and <code className="text-[#5145FF] font-mono">aria-valuemax="100"</code>.
              </li>
              <li>
                <strong className="text-[#111827]">Reduced Motion:</strong> Shimmer animations automatically pause under <code className="text-[#5145FF] font-mono">prefers-reduced-motion: reduce</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Bottom Navigation Pagination */}
        <div className="pt-8 border-t border-[#EEF2F6]">
          <ComponentPagination currentHref="/docs/components/attachment" />
        </div>
      </div>

      {/* Lightbox / Document Preview Modal */}
      <AttachmentPreviewModal
        data={previewData}
        onClose={() => setPreviewData(null)}
      />
    </div>
  );
}
