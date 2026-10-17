"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionAnimation,
} from "../accordion";
import { Zap, Box, Heart } from "lucide-react";

export interface AccordionMinimalProps {
  type?: "single" | "multiple";
  animation?: AccordionAnimation;
  defaultValue?: string | string[];
  disabled?: boolean;
}

export function AccordionMinimal({
  type = "single",
  animation = "smooth",
  defaultValue = "item-1",
  disabled = false,
}: AccordionMinimalProps) {
  return (
    <Accordion
      type={type}
      variant="minimal"
      indicator="chevron"
      animation={animation}
      defaultValue={defaultValue}
      disabled={disabled}
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={<Zap size={18} className="text-[#111827]" />}
          className="py-4 px-2 hover:text-[#5145FF]"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Fast Performance
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-8 pr-3 pb-4 text-[14.5px] leading-relaxed text-[#4B5563]">
          Optimized for maximum speed with zero runtime bloat, minimal bundle footprint, and
          instantaneous server rendering.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger
          icon={<Box size={18} className="text-[#111827]" />}
          className="py-4 px-2 hover:text-[#5145FF]"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Highly Customizable
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-8 pr-3 pb-4 text-[14.5px] leading-relaxed text-[#4B5563]">
          Easily adapt colors, typography, corner radii, and animation presets to your exact brand
          aesthetic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger
          icon={<Heart size={18} className="text-[#111827]" />}
          className="py-4 px-2 hover:text-[#5145FF]"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Built for Developers
          </span>
        </AccordionTrigger>
        <AccordionContent className="pl-8 pr-3 pb-4 text-[14.5px] leading-relaxed text-[#4B5563]">
          First-class TypeScript contracts, complete keyboard accessibility, and intuitive
          composable ergonomics.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
