"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

export function DocsTableOfContents({
  items,
  showPromo = true,
}: {
  items: TocItem[];
  showPromo?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(items[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <aside className="mf-docs-toc">
      <div>
        <div className="mf-docs-toc-title">On This Page</div>
        <nav className="mf-docs-toc-list">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mf-docs-toc-link ${activeId === item.id ? "active" : ""}`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {showPromo && (
        <div className="mf-docs-promo-card">
          <div className="flex items-start justify-between gap-2">
            <h4 className="mf-docs-promo-title">
              Deploy your app on Vercel
            </h4>
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 22 21 2 21" />
              </svg>
            </div>
          </div>
          <p className="mf-docs-promo-desc font-medium text-muted-foreground">
            Trusted by OpenAI, Sonos, Adobe, and more.
          </p>
          <p className="mf-docs-promo-desc">
            Vercel provides tools and infrastructure to deploy apps and features at scale.
          </p>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="mf-docs-promo-btn"
          >
            Deploy Now
          </a>
        </div>
      )}
    </aside>
  );
}
