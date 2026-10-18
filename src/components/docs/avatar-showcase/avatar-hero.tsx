"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accessibility,
  Image as ImageIcon,
  Square,
  Users,
  ChevronRight,
} from "lucide-react";

export function AvatarHero() {
  return (
    <div className="space-y-4 mb-9">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium"
      >
        <Link
          href="/docs"
          className="hover:text-[#111827] transition-colors"
        >
          Components
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#64748B]">Data Display</span>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="text-[#111827] font-semibold">Avatar</span>
      </nav>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
        Avatar
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
        An interactive and accessible component to represent users through images,
        initials, or fallback icons.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        <div className="mf-feature-pill">
          <Accessibility size={15} className="text-[#5145FF]" />
          <span>Accessible by Default</span>
        </div>
        <div className="mf-feature-pill">
          <ImageIcon size={15} className="text-[#5145FF]" />
          <span>Image Failover Support</span>
        </div>
        <div className="mf-feature-pill">
          <Square size={15} className="text-[#5145FF]" />
          <span>Multiple Shapes &amp; Sizes</span>
        </div>
        <div className="mf-feature-pill">
          <Users size={15} className="text-[#5145FF]" />
          <span>Avatar Groups</span>
        </div>
      </div>
    </div>
  );
}
