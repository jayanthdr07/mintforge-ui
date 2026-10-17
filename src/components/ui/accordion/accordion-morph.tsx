"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionAnimation,
} from "../accordion";
import { Sparkles, Zap, Heart } from "lucide-react";

export interface AccordionMorphProps {
  type?: "single" | "multiple";
  animation?: AccordionAnimation;
  defaultValue?: string | string[];
  disabled?: boolean;
}

export function AccordionMorph({
  type = "single",
  animation = "smooth",
  defaultValue = "item-1",
  disabled = false,
}: AccordionMorphProps) {
  return (
    <Accordion
      type={type}
      variant="morph"
      indicator="morph"
      animation={animation}
      defaultValue={defaultValue}
      disabled={disabled}
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="p-4"
          icon={
            <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
          }
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            What makes Mintforge UI different?
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-14 pr-3 pb-4.5 pt-1 text-[14.5px] leading-relaxed text-[#4B5563]">
          Mintforge UI offers a modern, consistent, and developer-first design system with powerful
          customization, smooth interactions, and a growing ecosystem of components.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger
          className="p-4"
          icon={
            <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#EEF2FF] group-hover:text-[#5145FF] transition-colors flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
          }
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Can I customize the appearance?
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-14 pr-3 pb-4.5 pt-1 text-[14.5px] leading-relaxed text-[#4B5563]">
          Yes! Every component is built with semantic Tailwind tokens, customizable CSS variables,
          and zero runtime overhead.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger
          className="p-4"
          icon={
            <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#EEF2FF] group-hover:text-[#5145FF] transition-colors flex items-center justify-center shrink-0">
              <Heart size={18} />
            </div>
          }
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Will it support React Native?
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-14 pr-3 pb-4.5 pt-1 text-[14.5px] leading-relaxed text-[#4B5563]">
          Mintforge UI delivers complete universal parity across React, Next.js 16, and React Native
          with Expo 52.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
