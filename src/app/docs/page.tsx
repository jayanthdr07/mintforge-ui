import { ComponentCode } from "@/components/docs/component-code";
import { ArrowRight, Layers, Palette } from "lucide-react";
import Link from "next/link";


export default function DocsPage() {
    return (
        <div className="mf-docs-main max-w-4xl">
            <div className="space-y-4 pb-8 border-b border-[var(--mf-border)]">
                <span className="text-xs font-semibold text-[var(--mf-brand)] tracking-wider uppercase">Documentation</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-[var(--mf-foreground)]">Mintforge UI Documentation</h1>
                <p className="text-base text-[var(--mf-foreground-secondary)] max-w-2xl">
                    An open-source design system and UI ecosystem for React, Next.js, and React Native. Clean, accessible, and easily themeable.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <Link
          href="/docs/components"
          className="p-6 rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] hover:border-[var(--mf-brand)] transition-colors group"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-[var(--mf-radius-md)] bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] mb-3">
            <Layers size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--mf-foreground)] group-hover:text-[var(--mf-brand)] flex items-center gap-1.5">
            Explore Components <ArrowRight size={14} />
          </h3>
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-1">
            Browse our core primitives including Button, Input, Card, Badge, Dialog, and Tabs.
          </p>
        </Link>

        <div className="p-6 rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)]">
          <div className="h-10 w-10 flex items-center justify-center rounded-[var(--mf-radius-md)] bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] mb-3">
            <Palette size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--mf-foreground)]">
            Design Tokens
          </h3>
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-1">
            Built directly on top of Tailwind CSS variables with full automatic light/dark mode support.
          </p>
        </div>
      </div>

      <section id="installation" className="space-y-4 my-8">
        <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
        <p className="text-xs text-[var(--mf-foreground-secondary)]">
          Mintforge UI components are source-based. You can copy the component files into your project or install them directly:
        </p>
        <ComponentCode code="npm install lucide-react" language="bash" />
      </section>
        </div>
    );
}