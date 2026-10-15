"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mf-docs-sidebar">
      <div className="space-y-6">
        {DOCS_NAVIGATION.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--mf-foreground-muted)] px-3">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-[var(--mf-radius-md)] transition-colors ${
                      isActive
                        ? "bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] font-semibold"
                        : "text-[var(--mf-foreground-secondary)] hover:bg-[var(--mf-surface-secondary)] hover:text-[var(--mf-foreground)]"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground-muted)] border border-[var(--mf-border)]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
