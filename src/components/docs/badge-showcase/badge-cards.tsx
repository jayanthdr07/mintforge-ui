"use client";

import * as React from "react";
import { Badge, BadgeDot, BadgeCount } from "@/components/ui/badge";
import {
  Sparkles,
  Star,
  Check,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  FlaskConical,
  Trophy,
} from "lucide-react";

export function BasicVariationsCard() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-[#111827] mb-5">
          Basic &amp; Variations
        </h3>

        {/* 1. Solid */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Solid
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance="solid" variant="primary">
              Solid
            </Badge>
            <Badge appearance="solid" variant="success">
              Green
            </Badge>
            <Badge appearance="solid" variant="warning">
              Orange
            </Badge>
            <Badge appearance="solid" variant="destructive">
              Red
            </Badge>
          </div>
        </div>

        {/* 2. Soft */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Soft
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance="soft" variant="primary">
              Soft Blue
            </Badge>
            <Badge appearance="soft" variant="success">
              Soft Green
            </Badge>
            <Badge appearance="soft" variant="warning">
              Soft Orange
            </Badge>
            <Badge appearance="soft" variant="destructive">
              Soft Red
            </Badge>
            <Badge appearance="soft" variant="brand">
              Soft Lavender
            </Badge>
          </div>
        </div>

        {/* 3. Outline */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Outline
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance="outline" variant="primary">
              Outline
            </Badge>
            <Badge appearance="outline" variant="success">
              Green
            </Badge>
            <Badge appearance="outline" variant="warning">
              Orange
            </Badge>
            <Badge appearance="outline" variant="destructive">
              Red
            </Badge>
          </div>
        </div>

        {/* 4. Ghost / Minimal */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            Ghost/Minimal
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge appearance="ghost" variant="neutral">
              Neutral
            </Badge>
            <Badge appearance="ghost" variant="brand">
              Primary
            </Badge>
            <Badge appearance="ghost" variant="info">
              Info
            </Badge>
            <Badge appearance="ghost" variant="success">
              Success
            </Badge>
            <Badge appearance="ghost" variant="warning">
              Warning
            </Badge>
            <Badge appearance="ghost" variant="destructive">
              Destructive
            </Badge>
          </div>
        </div>

        {/* 5. With Icon */}
        <div>
          <span className="text-xs font-semibold text-[#64748B] block mb-2">
            With icon
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              appearance="soft"
              variant="brand"
              leadingIcon={<Sparkles size={11} className="text-[#5145FF]" />}
              trailingIcon={<Sparkles size={11} className="text-[#5145FF]" />}
            />
            <Badge
              appearance="outline"
              variant="neutral"
              leadingIcon={<Star size={11} className="text-[#64748B]" />}
              trailingIcon={<Star size={11} className="text-[#64748B]" />}
            />
            <Badge
              appearance="soft"
              variant="success"
              leadingIcon={<Check size={11} className="text-[#16A34A]" />}
            />
            <Badge
              appearance="soft"
              variant="destructive"
              leadingIcon={<Trash2 size={11} className="text-[#DC2626]" />}
            />
            <Badge
              appearance="soft"
              variant="success"
              leadingIcon={<CheckCircle2 size={11} className="text-[#16A34A]" />}
            />
            <Badge
              appearance="soft"
              variant="warning"
              leadingIcon={<AlertTriangle size={11} className="text-[#EA580C]" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignatureBadgeCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-4">
        Signature Badge Types
      </h3>

      <div className="space-y-3">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* NEW Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#5145FF] bg-gradient-to-r from-[#EEF2FF] via-[#F2F0FF] to-[#FAF5FF] border border-[#E0DAFF] shadow-xs">
            <Sparkles size={12} className="text-[#5145FF] animate-pulse" />
            <span>NEW</span>
            <Sparkles size={12} className="text-[#5145FF] animate-pulse" />
          </div>

          {/* BETA Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE]">
            BETA
          </div>

          {/* PRO Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0F172A] border border-[#334155] shadow-xs">
            <span>PRO</span>
            <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* VERIFIED Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0]">
            <CheckCircle2 size={12} className="text-[#059669]" />
            <span>VERIFIED</span>
          </div>

          {/* FEATURED Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#D97706] bg-[#FEF3C7] border border-[#FDE68A]">
            <Trophy size={12} className="text-[#D97706]" />
            <span>FEATURED</span>
            <Sparkles size={11} className="text-[#D97706]" />
          </div>

          {/* EXPERIMENTAL Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] border border-[#DDD6FE]">
            <FlaskConical size={12} className="text-[#7C3AED]" />
            <span>EXPERIMENTAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusDotBadgeCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-4">
        Status &amp; Dot Badges
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Soft colored pills with dots */}
        <div className="space-y-2">
          <Badge
            appearance="soft"
            variant="success"
            leadingIcon={<BadgeDot status="active" ping />}
          >
            Active
          </Badge>
          <div className="block">
            <Badge
              appearance="soft"
              variant="destructive"
              leadingIcon={<BadgeDot status="failed" />}
            >
              Failed
            </Badge>
          </div>
          <div className="block">
            <Badge
              appearance="soft"
              variant="neutral"
              leadingIcon={<BadgeDot status="offline" />}
            >
              Archived
            </Badge>
          </div>
          <div className="block">
            <Badge
              appearance="soft"
              variant="warning"
              leadingIcon={<BadgeDot status="pending" />}
            >
              Pending
            </Badge>
          </div>
          <div className="block">
            <Badge
              appearance="soft"
              variant="warning"
              leadingIcon={<BadgeDot status="review" />}
            >
              In review
            </Badge>
          </div>
        </div>

        {/* Right: Minimal text indicators */}
        <div className="space-y-2.5 pt-1">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#475569]">
            <BadgeDot status="online" ping />
            <span>Online tiny status</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
            <BadgeDot status="offline" />
            <span>Offline status</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#16A34A]">
            <Check size={13} strokeWidth={2.5} />
            <span>Success status</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CountShapeBadgeCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-4">
        Count and Shape Badges
      </h3>

      <div className="space-y-3">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Blue pill count +3 */}
          <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full text-xs font-bold font-mono text-white bg-[#3B82F6]">
            +3
          </span>

          {/* Blue pill count 99+ */}
          <span className="inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded-full text-xs font-bold font-mono text-white bg-[#3B82F6]">
            99+
          </span>

          <Badge appearance="soft" variant="neutral" shape="rounded">
            Text
          </Badge>
          <Badge appearance="soft" variant="primary">
            Soft
          </Badge>
          <Badge appearance="soft" variant="neutral">
            Soft
          </Badge>
          <Badge appearance="ghost" variant="neutral">
            No border
          </Badge>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge appearance="outline" variant="neutral">
            <span className="font-mono text-[#2563EB] font-bold mr-1">+3</span>
            <span>Options</span>
          </Badge>

          <Badge appearance="soft" variant="primary">
            <span>Text Soft</span>
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#3B82F6] text-white text-[10px] font-mono font-bold">
              9
            </span>
          </Badge>

          <Badge appearance="soft" variant="neutral">
            <span>label</span>
            <span className="mx-1 px-1.5 py-0.2 rounded-full bg-[#DC2626] text-white text-[10px] font-mono font-bold">
              1
            </span>
            <span>count</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}
