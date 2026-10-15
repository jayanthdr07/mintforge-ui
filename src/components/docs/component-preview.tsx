"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComponentCode } from "./component-code";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export function ComponentPreview({ children, code, title = "Interactive Preview" }: ComponentPreviewProps) {
  return (
    <div className="w-full my-6 border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)] overflow-hidden bg-[var(--mf-surface)] shadow-[var(--mf-shadow-sm)]">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between border-b border-[var(--mf-border)] px-4 py-2.5 bg-[var(--mf-surface-secondary)]">
          <span className="text-xs font-semibold text-[var(--mf-foreground)]">{title}</span>
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="m-0 p-8 flex items-center justify-center min-h-[180px] bg-[var(--mf-surface)]">
          {children}
        </TabsContent>

        <TabsContent value="code" className="m-0 p-0 border-t border-[var(--mf-border)]">
          <ComponentCode code={code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
