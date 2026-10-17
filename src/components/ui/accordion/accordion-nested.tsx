"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionAnimation,
} from "../accordion";
import { Folder, FileText, Code, Box } from "lucide-react";

export interface AccordionNestedProps {
  type?: "single" | "multiple";
  animation?: AccordionAnimation;
  defaultValue?: string | string[];
  disabled?: boolean;
}

export function AccordionNested({
  type = "single",
  animation = "smooth",
  defaultValue = "parent-doc",
  disabled = false,
}: AccordionNestedProps) {
  return (
    <Accordion
      type={type}
      variant="nested"
      indicator="chevron"
      animation={animation}
      defaultValue={defaultValue}
      disabled={disabled}
      collapsible
    >
      <AccordionItem
        value="parent-doc"
        className="border border-[#E5E7EB] rounded-2xl bg-[#FAFAFD] overflow-hidden"
      >
        <AccordionTrigger
          icon={<Folder size={18} className="text-[#5145FF]" />}
          className="p-4 bg-white"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Documentation
          </span>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="relative pl-7 pr-3.5 pb-4 pt-1.5">
            {/* Tree connecting branch line */}
            <div
              className="absolute left-[24px] top-0 bottom-6 w-[2px] bg-[#E0E7FF] rounded-full"
              aria-hidden="true"
            />

            {/* Nested Sub-Accordion */}
            <Accordion
              type="single"
              defaultValue="sub-install"
              className="space-y-2.5 mt-1"
              collapsible
            >
              <AccordionItem
                value="sub-install"
                className="relative bg-white border border-[#E5E7EB] rounded-xl overflow-hidden ml-3"
              >
                <AccordionTrigger
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5145FF] flex items-center justify-center shrink-0">
                      <FileText size={14} />
                    </div>
                  }
                  subtitle="Get started with Mintforge UI in just a few steps."
                  className="p-3"
                >
                  <span className="text-[14px] font-semibold text-[#111827]">
                    Installation Guide
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-3.5 pb-3.5 pt-0 pl-11 text-[13.5px] text-[#4B5563] leading-relaxed">
                  Run <code className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#5145FF] font-mono text-[11px]">npx mintforge add accordion</code> to
                  scaffold design tokens, utils, and dependencies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="sub-api"
                className="relative bg-white border border-[#E5E7EB] rounded-xl overflow-hidden ml-3"
              >
                <AccordionTrigger
                  icon={
                    <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] text-[#6B7280] flex items-center justify-center shrink-0">
                      <Code size={14} />
                    </div>
                  }
                  className="p-3"
                >
                  <span className="text-[14px] font-semibold text-[#111827]">
                    API Reference
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-3.5 pb-3.5 pt-0 pl-11 text-[13.5px] text-[#4B5563] leading-relaxed">
                  Full TypeScript interfaces, compound components props, and accessibility specifications.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="parent-comp"
        className="border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden"
      >
        <AccordionTrigger
          icon={<Box size={18} className="text-[#111827]" />}
          className="p-4"
        >
          <span className="text-[15.5px] font-semibold text-[#111827]">
            Components
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-4.5 pb-4 pt-0 pl-11 text-[13.5px] text-[#4B5563] leading-relaxed">
          Explore over 40+ atomic components engineered for web and mobile consistency.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
