"use client";

import * as React from "react";
import {
  FileText,
  Image as ImageIcon,
  UploadCloud,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";

export type AttachmentNavTab =
  | "files"
  | "images"
  | "upload-states"
  | "groups"
  | "playground";

export interface AttachmentVariantNavProps {
  activeTab: AttachmentNavTab;
  onTabChange: (tab: AttachmentNavTab) => void;
}

export function AttachmentVariantNav({
  activeTab,
  onTabChange,
}: AttachmentVariantNavProps) {
  const tabs = [
    {
      id: "files" as AttachmentNavTab,
      label: "File Attachments",
      icon: <FileText size={15} />,
      badge: "Design 1",
    },
    {
      id: "images" as AttachmentNavTab,
      label: "Image Attachments",
      icon: <ImageIcon size={15} />,
      badge: "Design 2",
    },
    {
      id: "upload-states" as AttachmentNavTab,
      label: "Upload States",
      icon: <UploadCloud size={15} />,
      badge: "Designs 3 & 4",
    },
    {
      id: "groups" as AttachmentNavTab,
      label: "Attachment Groups",
      icon: <Layers size={15} />,
      badge: "Design 5",
    },
    {
      id: "playground" as AttachmentNavTab,
      label: "Playground",
      icon: <Sparkles size={15} />,
      badge: "Interactive",
    },
  ];

  const handleTabClick = (tabId: AttachmentNavTab) => {
    onTabChange(tabId);
    const targetSection = document.getElementById(`section-${tabId}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[#EEF2F6]">
      {/* Pills Container */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`mf-acc-pill-btn ${isActive ? "active" : ""}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#F2F0FF] text-[#5145FF]"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Jump to Docs */}
      <a
        href="#section-docs-api"
        className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#5145FF] font-medium transition select-none"
      >
        <BookOpen size={14} />
        <span>Documentation & API</span>
      </a>
    </div>
  );
}
