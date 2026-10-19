"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { Check, AlertCircle } from "lucide-react";

const AVATAR_PORTRAITS = {
  p1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
  p2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
  p3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
  p4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
  p5: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80",
  p6: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
  p7: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
  p8: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
};

export function BasicSizesCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-6">Basic &amp; Sizes</h3>

      {/* Row 1: Circular photos in 5 sizes with labels */}
      <div className="flex items-end justify-between gap-2 sm:gap-4 mb-7 pb-4 border-b border-[#F1F5F9]">
        <div className="flex flex-col items-center gap-2">
          <Avatar size="xs">
            <AvatarImage src={AVATAR_PORTRAITS.p1} alt="Avatar XS" />
            <AvatarFallback initials="XS" />
          </Avatar>
          <span className="text-[11px] font-semibold text-[#64748B]">XS</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={AVATAR_PORTRAITS.p2} alt="Avatar SM" />
            <AvatarFallback initials="SM" />
          </Avatar>
          <span className="text-[11px] font-semibold text-[#64748B]">SM</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Avatar size="md">
            <AvatarImage src={AVATAR_PORTRAITS.p3} alt="Avatar MD" />
            <AvatarFallback initials="MD" />
          </Avatar>
          <span className="text-[11px] font-semibold text-[#64748B]">MD</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={AVATAR_PORTRAITS.p4} alt="Avatar LG" />
            <AvatarFallback initials="LG" />
          </Avatar>
          <span className="text-[11px] font-semibold text-[#64748B]">LG</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Avatar size="xl">
            <AvatarImage src={AVATAR_PORTRAITS.p5} alt="Avatar XL" />
            <AvatarFallback initials="XL" />
          </Avatar>
          <span className="text-[11px] font-semibold text-[#64748B]">XL</span>
        </div>
      </div>

      {/* Row 2: Squircle / rounded square avatars with initials */}
      <div className="flex items-end justify-between gap-2 sm:gap-4">
        <Avatar size="xs" shape="squircle">
          <AvatarFallback initials="JD" />
        </Avatar>

        <Avatar size="sm" shape="squircle">
          <AvatarFallback initials="JD" />
        </Avatar>

        <Avatar size="md" shape="squircle">
          <AvatarFallback initials="AM" />
        </Avatar>

        <Avatar size="lg" shape="squircle">
          <AvatarFallback initials="JD" />
        </Avatar>

        <Avatar size="xl" shape="squircle">
          <AvatarFallback initials="AM" />
        </Avatar>
      </div>
    </div>
  );
}

export function StatusBadgesCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-6">Status &amp; Badges</h3>

      {/* Row 1: Presence status indicators */}
      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-6 pb-4 border-b border-[#F1F5F9]">
        {/* Online */}
        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={AVATAR_PORTRAITS.p2} alt="User Online" />
            <AvatarFallback initials="ON" />
            <AvatarBadge status="online" />
          </Avatar>
          <span className="text-[11px] font-medium text-[#475569]">Online</span>
        </div>

        {/* Away with verified badge */}
        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={AVATAR_PORTRAITS.p4} alt="User Away" />
            <AvatarFallback initials="AW" />
            <AvatarBadge status="away" />
            {/* Top Right Verified Check Badge */}
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10"
              aria-label="Verified User"
            >
              <Check size={10} strokeWidth={3} />
            </span>
          </Avatar>
          <span className="text-[11px] font-medium text-[#475569]">Away</span>
        </div>

        {/* Busy */}
        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={AVATAR_PORTRAITS.p5} alt="User Busy" />
            <AvatarFallback initials="BU" />
            <AvatarBadge status="busy" />
          </Avatar>
          <span className="text-[11px] font-medium text-[#475569]">Busy</span>
        </div>

        {/* Offline (desaturated/muted image) */}
        <div className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarImage
              src={AVATAR_PORTRAITS.p6}
              alt="User Offline"
              className="grayscale opacity-85"
            />
            <AvatarFallback initials="OF" />
            <AvatarBadge status="offline" />
          </Avatar>
          <span className="text-[11px] font-medium text-[#475569]">Offline</span>
        </div>
      </div>

      {/* Row 2: Badges & Notifications */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Exclamation Badge 1 */}
        <Avatar size="lg">
          <AvatarImage src={AVATAR_PORTRAITS.p7} alt="Alert User 1" />
          <AvatarFallback initials="AL" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#EA580C] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10"
            aria-label="Urgent Notification"
          >
            <AlertCircle size={10} strokeWidth={2.5} />
          </span>
        </Avatar>

        {/* Exclamation Badge 2 */}
        <Avatar size="lg">
          <AvatarImage src={AVATAR_PORTRAITS.p8} alt="Alert User 2" />
          <AvatarFallback initials="WN" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#F59E0B] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm z-10"
            aria-label="Warning"
          >
            <AlertCircle size={10} strokeWidth={2.5} />
          </span>
        </Avatar>

        {/* Neutral Indicator */}
        <Avatar size="lg">
          <AvatarImage src={AVATAR_PORTRAITS.p5} alt="Neutral Status" />
          <AvatarFallback initials="NT" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#64748B] border-2 border-white dark:border-slate-900 shadow-sm z-10"
            aria-label="Muted status"
          />
        </Avatar>

        {/* Count Badge +3 */}
        <Avatar size="lg">
          <div className="w-full h-full rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold font-mono text-sm shadow-inner">
            +3
          </div>
        </Avatar>
      </div>
    </div>
  );
}

export function AvatarGroupsCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-6">Avatar Groups</h3>

      <div className="flex items-center py-3">
        <div className="inline-flex items-center -space-x-3.5">
          {/* Blue Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p7} alt="Team Member 1" />
            <AvatarFallback initials="T1" />
          </Avatar>

          {/* Emerald Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#10B981] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p3} alt="Team Member 2" />
            <AvatarFallback initials="T2" />
          </Avatar>

          {/* Teal Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#14B8A6] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p1} alt="Team Member 3" />
            <AvatarFallback initials="T3" />
          </Avatar>

          {/* Crimson Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#EF4444] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p5} alt="Team Member 4" />
            <AvatarFallback initials="T4" />
          </Avatar>

          {/* Indigo Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#6366F1] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p4} alt="Team Member 5" />
            <AvatarFallback initials="T5" />
          </Avatar>

          {/* Purple Ring */}
          <Avatar
            size="lg"
            className="ring-2 ring-[#8B5CF6] ring-offset-2 ring-offset-white transition-transform hover:z-20 hover:scale-110"
          >
            <AvatarImage src={AVATAR_PORTRAITS.p2} alt="Team Member 6" />
            <AvatarFallback initials="T6" />
          </Avatar>

          {/* Overflow Counter +4 */}
          <div
            aria-label="4 more team members"
            className="relative inline-flex items-center justify-center w-12 h-12 rounded-full font-bold font-mono text-[#475569] bg-[#F1F5F9] border-2 border-white shadow-sm ring-2 ring-[#CBD5E1] ring-offset-2 ring-offset-white text-sm select-none z-10 transition-transform hover:z-20 hover:scale-110"
          >
            +4
          </div>
        </div>
      </div>
    </div>
  );
}

export function AvatarClipsCard() {
  return (
    <div className="mf-showcase-card">
      <h3 className="text-base font-bold text-[#111827] mb-6">Avatar Clips</h3>

      <div className="flex items-center justify-between gap-2 sm:gap-3 py-3">
        {/* Photo 1: Squircle */}
        <Avatar size="lg" shape="squircle">
          <AvatarImage src={AVATAR_PORTRAITS.p2} alt="Clipped Avatar 1" />
          <AvatarFallback initials="C1" />
        </Avatar>

        {/* Photo 2: Rounded Rectangle */}
        <Avatar size="lg" shape="rounded">
          <AvatarImage src={AVATAR_PORTRAITS.p4} alt="Clipped Avatar 2" />
          <AvatarFallback initials="C2" />
        </Avatar>

        {/* Photo 3: Squircle */}
        <Avatar size="lg" shape="squircle">
          <AvatarImage src={AVATAR_PORTRAITS.p5} alt="Clipped Avatar 3" />
          <AvatarFallback initials="C3" />
        </Avatar>

        {/* Photo 4: Circle */}
        <Avatar size="lg" shape="circle">
          <AvatarImage src={AVATAR_PORTRAITS.p7} alt="Clipped Avatar 4" />
          <AvatarFallback initials="C4" />
        </Avatar>

        {/* Fallback Chip JD */}
        <Avatar size="lg" shape="circle">
          <AvatarFallback initials="JD" />
        </Avatar>

        {/* Fallback Chip AM */}
        <Avatar size="lg" shape="circle">
          <AvatarFallback initials="AM" />
        </Avatar>
      </div>
    </div>
  );
}
