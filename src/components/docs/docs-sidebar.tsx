"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mf-docs-sidebar">
      {DOCS_NAVIGATION.map((section) => (
        <div key={section.title} className="mf-docs-sidebar-section">
          <div className="mf-docs-sidebar-heading">
            {section.title}
          </div>
          <nav className="mf-docs-sidebar-nav">
            {section.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/docs" && pathname?.startsWith(item.href + "/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mf-docs-sidebar-item ${isActive ? "active" : ""}`}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="mf-docs-sidebar-badge">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
