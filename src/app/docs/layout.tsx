import "@/styles/docs.css";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Suspense } from "react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mf-docs-container">
      <Suspense fallback={<aside className="mf-docs-sidebar" />}>
        <DocsSidebar />
      </Suspense>
      <div className="mf-docs-main-wrapper">
        <Suspense fallback={<div className="mf-docs-main" />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}