"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionAnimation,
} from "../accordion";
import { BarChart3, Layers, Code2 } from "lucide-react";

export interface AccordionOutlinedProps {
  type?: "single" | "multiple";
  animation?: AccordionAnimation;
  defaultValue?: string | string[];
  disabled?: boolean;
}

export function AccordionOutlined({
  type = "single",
  animation = "smooth",
  defaultValue = "item-1",
  disabled = false,
}: AccordionOutlinedProps) {
  return (
    <Accordion
      type={type}
      variant="outlined"
      indicator="chevron"
      animation={animation}
      defaultValue={defaultValue}
      disabled={disabled}
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={<BarChart3 size={18} className="text-[#111827]" />}
          className="p-4.5"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Powerful Component Library
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4.5 pb-4.5 pt-0 pl-12 text-[14.5px] leading-relaxed text-[#4B5563]">
          A comprehensive suite of accessible primitives and utilities designed to accelerate modern
          React and Next.js development.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger
          icon={<Layers size={18} className="text-[#111827]" />}
          className="p-4.5"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Ready-to-Use UI Blocks
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4.5 pb-4.5 pt-0 pl-12 text-[14.5px] leading-relaxed text-[#4B5563]">
          Pre-built production layouts, KPI dashboards, SaaS pricing sheets, and authentication flows
          ready to drop into your app.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger
          icon={<Code2 size={18} className="text-[#111827]" />}
          className="p-4.5"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Developer-First Design
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4.5 pb-4.5 pt-0 pl-12 text-[14.5px] leading-relaxed text-[#4B5563]">
          Own 100% of your source code with zero package lock-in, strict TypeScript typing, and
          comprehensive documentation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
