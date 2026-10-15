"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";

export function DocsSearch() {
  const [query, setQuery] = useState("");

  const filtered = Object.values(COMPONENT_REGISTRY).filter((comp) =>
    comp.title.toLowerCase().includes(query.toLowerCase()) ||
    comp.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md my-4">
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3 text-[var(--mf-foreground-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter components..."
          className="w-full h-9 pl-9 pr-3 text-xs rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] bg-[var(--mf-surface)] text-[var(--mf-foreground)] outline-none focus:border-[var(--mf-brand)]"
        />
      </div>

      {query && (
        <div className="absolute z-20 mt-1 w-full max-w-md bg-[var(--mf-surface)] border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] shadow-lg overflow-hidden">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={`/docs/components/${item.id}`}
                className="block p-3 hover:bg-[var(--mf-surface-secondary)] border-b border-[var(--mf-border)] last:border-0"
              >
                <div className="text-xs font-semibold text-[var(--mf-foreground)]">{item.title}</div>
                <div className="text-[11px] text-[var(--mf-foreground-secondary)] truncate">{item.description}</div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-xs text-center text-[var(--mf-foreground-muted)]">
              No matching components found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
