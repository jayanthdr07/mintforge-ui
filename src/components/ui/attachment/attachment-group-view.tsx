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
  AttachmentGroup,
} from "../attachment";
import {
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatFileSize } from "./attachment.types";

interface GroupItem {
  id: string;
  name: string;
  size: number;
  type: string;
  category: "document" | "image" | "code" | "archive" | "audio" | "video" | "data" | "file";
}

const DEFAULT_GROUP_ITEMS: GroupItem[] = [
  {
    id: "grp-1",
    name: "executive-summary.pdf",
    size: 1420000,
    type: "application/pdf",
    category: "document",
  },
  {
    id: "grp-2",
    name: "hero-mockup.png",
    size: 2800000,
    type: "image/png",
    category: "image",
  },
  {
    id: "grp-3",
    name: "contract-schema.ts",
    size: 42000,
    type: "text/typescript",
    category: "code",
  },
  {
    id: "grp-4",
    name: "quarterly-kpis.csv",
    size: 512000,
    type: "text/csv",
    category: "data",
  },
  {
    id: "grp-5",
    name: "brand-assets-v2.zip",
    size: 11400000,
    type: "application/zip",
    category: "archive",
  },
];

export function AttachmentGroupShowcase() {
  const [items, setItems] = React.useState<GroupItem[]>(DEFAULT_GROUP_ITEMS);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleReset = () => {
    setItems(DEFAULT_GROUP_ITEMS);
  };

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current?.querySelector(".mf-attachment-group-track");
    if (el) {
      const scrollAmount = direction === "left" ? -260 : 260;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Group Header & Scroll Buttons */}
      <div className="flex items-center justify-between pb-2 border-b border-[#EEF2F6]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#111827]">
            Chat Composer Upload Strip ({items.length} items)
          </span>
          <span className="text-[11px] text-[#64748B]">Horizontal scroll with edge fade</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:text-[#111827] hover:bg-[#F9FAFB] transition cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#64748B] hover:text-[#111827] hover:bg-[#F9FAFB] transition cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
          {items.length < DEFAULT_GROUP_ITEMS.length && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-2 text-xs text-[#5145FF] font-semibold hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-[#E5E7EB] bg-white text-center">
          <p className="text-sm font-semibold text-[#111827] mb-1">
            No attachments in this thread
          </p>
          <p className="text-xs text-[#64748B] mb-3">
            All files were removed. Add items back to explore group scrolling.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5145FF] text-white text-xs font-semibold hover:bg-[#4338CA] transition cursor-pointer shadow-xs"
          >
            <RotateCcw size={13} />
            <span>Restore 5 Sample Attachments</span>
          </button>
        </div>
      ) : (
        /* Horizontally Scrollable Group with edge fade */
        <div ref={trackRef}>
          <AttachmentGroup>
            {items.map((item) => (
              <Attachment
                key={item.id}
                state="done"
                size="sm"
                orientation="horizontal"
                className="w-[230px] sm:w-[250px] shrink-0 bg-white hover:border-[#D1D5DB] transition-all hover:shadow-xs snap-start"
              >
                <AttachmentMedia category={item.category} alt={item.name} />

                <AttachmentContent>
                  <AttachmentTitle className="text-xs">{item.name}</AttachmentTitle>
                  <AttachmentDescription>
                    <span className="font-mono text-[10px] text-[#64748B]">
                      {formatFileSize(item.size)}
                    </span>
                  </AttachmentDescription>
                </AttachmentContent>

                <AttachmentActions>
                  <AttachmentAction
                    variant="ghost"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    title="Remove item"
                  >
                    <X size={13} />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </AttachmentGroup>
        </div>
      )}
    </div>
  );
}
