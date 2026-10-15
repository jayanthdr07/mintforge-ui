"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

export function DocsTableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(items[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <aside className="mf-docs-toc">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mf-foreground-muted)]">
          On This Page
        </p>
        <nav className="flex flex-col space-y-1.5 text-xs">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors py-1 ${
                activeId === item.id
                  ? "text-[var(--mf-brand)] font-semibold"
                  : "text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)]"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
