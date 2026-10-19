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
import { Eye, X, ZoomIn } from "lucide-react";
import { formatFileSize } from "./attachment.types";

export interface AttachmentImagePreviewProps {
  id?: string;
  name?: string;
  size?: number;
  type?: string;
  src?: string;
  orientation?: "horizontal" | "vertical";
  onPreview?: (data: { name: string; src: string; size: number }) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

// Inline reliable SVG data URLs for high-quality mock creative images
const DEMO_IMAGE_SVGS: Record<string, string> = {
  "workspace-preview.png": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%235145FF"/><stop offset="100%" stop-color="%23818cf8"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g1)"/><rect x="40" y="40" width="520" height="320" rx="16" fill="%23ffffff" fill-opacity="0.12"/><circle cx="100" cy="100" r="28" fill="%23ffffff" fill-opacity="0.3"/><rect x="148" y="85" width="220" height="16" rx="6" fill="%23ffffff" fill-opacity="0.8"/><rect x="148" y="112" width="140" height="12" rx="4" fill="%23ffffff" fill-opacity="0.5"/><rect x="60" y="160" width="150" height="170" rx="10" fill="%23ffffff" fill-opacity="0.2"/><rect x="230" y="160" width="310" height="80" rx="10" fill="%23ffffff" fill-opacity="0.2"/><rect x="230" y="255" width="310" height="75" rx="10" fill="%23ffffff" fill-opacity="0.2"/></svg>`,
  "brand-guidelines.jpg": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230284C7"/><stop offset="100%" stop-color="%2338BDF8"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g2)"/><circle cx="300" cy="200" r="90" fill="%23ffffff" fill-opacity="0.15"/><polygon points="300,130 360,234 240,234" fill="%23ffffff" fill-opacity="0.85"/><text x="300" y="320" font-family="sans-serif" font-size="22" font-weight="bold" fill="%23ffffff" text-anchor="middle" letter-spacing="2">MINTFORGE BRAND</text></svg>`,
  "dashboard-design.webp": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230F172A"/><stop offset="100%" stop-color="%231E293B"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g3)"/><rect x="30" y="30" width="540" height="50" rx="8" fill="%23334155"/><rect x="30" y="100" width="160" height="260" rx="8" fill="%231E293B" stroke="%23334155" stroke-width="2"/><rect x="210" y="100" width="360" height="120" rx="8" fill="%235145FF" fill-opacity="0.3" stroke="%235145FF" stroke-width="1.5"/><rect x="210" y="240" width="170" height="120" rx="8" fill="%231E293B" stroke="%23334155" stroke-width="2"/><rect x="400" y="240" width="170" height="120" rx="8" fill="%231E293B" stroke="%23334155" stroke-width="2"/></svg>`,
};

export function AttachmentImagePreview({
  id = "img-1",
  name = "workspace-preview.png",
  size = 3840000,
  src,
  orientation = "horizontal",
  onPreview,
  onRemove,
  className = "",
}: AttachmentImagePreviewProps) {
  const imgSrc = src || DEMO_IMAGE_SVGS[name] || DEMO_IMAGE_SVGS["workspace-preview.png"];
  const extension = name.split(".").pop()?.toUpperCase() || "IMAGE";

  const handlePreviewClick = () => {
    onPreview?.({ name, src: imgSrc, size });
  };

  if (orientation === "vertical") {
    return (
      <Attachment
        state="done"
        size="default"
        orientation="vertical"
        className={`w-full max-w-[240px] bg-white hover:border-[#D1D5DB] transition-all hover:shadow-sm ${className}`}
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden group/thumb cursor-pointer">
          <AttachmentMedia src={imgSrc} alt={name} className="w-full h-full object-cover" />
          <div
            onClick={handlePreviewClick}
            className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-medium backdrop-blur-xs"
          >
            <ZoomIn size={16} />
            <span>Preview</span>
          </div>
        </div>

        <div className="w-full flex items-start justify-between gap-2 mt-1">
          <AttachmentContent className="w-full">
            <AttachmentTitle className="truncate">{name}</AttachmentTitle>
            <AttachmentDescription>
              <span className="font-semibold text-[#0284C7] uppercase text-[10px] bg-[#E0F2FE] px-1.5 py-0.5 rounded-md">
                {extension}
              </span>
              <span className="text-[#94A3B8]">·</span>
              <span className="font-mono text-[#64748B]">{formatFileSize(size)}</span>
            </AttachmentDescription>
          </AttachmentContent>

          {onRemove && (
            <AttachmentActions className="mt-0.5">
              <AttachmentAction
                variant="ghost"
                onClick={() => onRemove(id)}
                aria-label={`Remove ${name}`}
                title="Remove image"
              >
                <X size={14} />
              </AttachmentAction>
            </AttachmentActions>
          )}
        </div>
      </Attachment>
    );
  }

  return (
    <Attachment
      state="done"
      size="default"
      orientation="horizontal"
      className={`max-w-md w-full bg-white hover:border-[#D1D5DB] transition-all hover:shadow-sm ${className}`}
    >
      <div
        onClick={handlePreviewClick}
        className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 cursor-pointer group/thumb"
        title="Click to preview full image"
      >
        <AttachmentMedia src={imgSrc} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F172A]/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
          <Eye size={16} />
        </div>
      </div>

      <AttachmentContent>
        <AttachmentTitle>{name}</AttachmentTitle>
        <AttachmentDescription>
          <span className="font-semibold text-[#0284C7] uppercase text-[10px] bg-[#E0F2FE] px-1.5 py-0.5 rounded-md">
            {extension}
          </span>
          <span className="text-[#94A3B8]">·</span>
          <span className="font-mono text-[#64748B]">{formatFileSize(size)}</span>
        </AttachmentDescription>
      </AttachmentContent>

      <AttachmentActions>
        <AttachmentAction
          variant="ghost"
          onClick={handlePreviewClick}
          aria-label={`Preview ${name}`}
          title="Preview image"
        >
          <Eye size={15} />
        </AttachmentAction>

        {onRemove && (
          <AttachmentAction
            variant="ghost"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${name}`}
            title="Remove image"
          >
            <X size={15} />
          </AttachmentAction>
        )}
      </AttachmentActions>
    </Attachment>
  );
}

/** Showcase Gallery for Design 2 */
export function AttachmentImageGallery({
  onPreview,
}: {
  onPreview?: (data: { name: string; src: string; size: number }) => void;
}) {
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [images, setImages] = React.useState([
    {
      id: "img-1",
      name: "workspace-preview.png",
      size: 3840000,
      type: "image/png",
    },
    {
      id: "img-2",
      name: "brand-guidelines.jpg",
      size: 1950000,
      type: "image/jpeg",
    },
    {
      id: "img-3",
      name: "dashboard-design.webp",
      size: 2420000,
      type: "image/webp",
    },
  ]);

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleReset = () => {
    setImages([
      {
        id: "img-1",
        name: "workspace-preview.png",
        size: 3840000,
        type: "image/png",
      },
      {
        id: "img-2",
        name: "brand-guidelines.jpg",
        size: 1950000,
        type: "image/jpeg",
      },
      {
        id: "img-3",
        name: "dashboard-design.webp",
        size: 2420000,
        type: "image/webp",
      },
    ]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Orientation Switcher */}
      <div className="flex items-center justify-between pb-2 border-b border-[#EEF2F6]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#111827]">Layout Orientation:</span>
          <div className="inline-flex rounded-lg border border-[#E5E7EB] p-0.5 bg-[#F8F9FC]">
            <button
              type="button"
              onClick={() => setOrientation("horizontal")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                orientation === "horizontal"
                  ? "bg-white text-[#111827] shadow-xs font-semibold"
                  : "text-[#64748B] hover:text-[#111827]"
              }`}
            >
              Horizontal Rows
            </button>
            <button
              type="button"
              onClick={() => setOrientation("vertical")}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                orientation === "vertical"
                  ? "bg-white text-[#111827] shadow-xs font-semibold"
                  : "text-[#64748B] hover:text-[#111827]"
              }`}
            >
              Vertical Cards
            </button>
          </div>
        </div>

        {images.length < 3 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#5145FF] hover:underline font-semibold"
          >
            Reset images
          </button>
        )}
      </div>

      {images.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#E5E7EB]">
          <p className="text-xs text-[#64748B] mb-2">No images remaining</p>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-[#F2F0FF] text-[#5145FF] text-xs font-semibold hover:bg-[#E0E7FF] transition"
          >
            Restore Images
          </button>
        </div>
      ) : orientation === "vertical" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {images.map((img) => (
            <AttachmentImagePreview
              key={img.id}
              id={img.id}
              name={img.name}
              size={img.size}
              type={img.type}
              orientation="vertical"
              onPreview={onPreview}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2.5 max-w-md">
          {images.map((img) => (
            <AttachmentImagePreview
              key={img.id}
              id={img.id}
              name={img.name}
              size={img.size}
              type={img.type}
              orientation="horizontal"
              onPreview={onPreview}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
