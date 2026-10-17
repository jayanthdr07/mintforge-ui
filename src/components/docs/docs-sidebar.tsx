"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { DOCS_NAVIGATION } from "@/lib/docs/navigation";
import { NavItem, NavSection } from "@/types/docs";

function NavDropdownGroup({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  const hasActiveChild = item.items?.some(
    (sub) =>
      pathname === sub.href ||
      (sub.href !== "/docs" && pathname?.startsWith(sub.href + "/"))
  );

  const [userToggledOpen, setUserToggledOpen] = React.useState<boolean | null>(null);
  const isOpen = hasActiveChild || (userToggledOpen !== null ? userToggledOpen : true);

  const isSeam = item.title.toLowerCase().includes("seam");

  return (
    <div className="mf-docs-sidebar-dropdown-group my-1">
      <button
        type="button"
        onClick={() => setUserToggledOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer select-none group border border-transparent hover:border-border/60"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {isSeam && (
            <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
          )}
          <span>{item.title}</span>
          {item.badge && (
            <span className="mf-docs-sidebar-badge text-[10px] font-bold">
              {item.badge}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${
            isOpen ? "rotate-0 text-foreground" : "-rotate-90"
          }`}
        />
      </button>

      {isOpen && (
        <div className="pl-3.5 ml-3 border-l-2 border-emerald-500/30 dark:border-emerald-500/20 flex flex-col gap-1 mt-1 mb-2 animate-in fade-in duration-150">
          {item.items?.map((sub) => {
            const isSubActive =
              pathname === sub.href ||
              (sub.href !== "/docs" && pathname?.startsWith(sub.href + "/"));

            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={`mf-docs-sidebar-item text-[12px] py-1.5 px-2.5 ${
                  isSubActive ? "active font-medium" : ""
                }`}
              >
                <span>{sub.title}</span>
                {sub.badge && (
                  <span className="mf-docs-sidebar-badge text-[9.5px]">
                    {sub.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mf-docs-sidebar">
      {DOCS_NAVIGATION.map((section: NavSection) => (
        <div key={section.title} className="mf-docs-sidebar-section">
          <div className="mf-docs-sidebar-heading">
            {section.title}
          </div>
          <nav className="mf-docs-sidebar-nav">
            {section.items.map((item) => {
              if (item.items && item.items.length > 0) {
                return (
                  <NavDropdownGroup
                    key={item.title}
                    item={item}
                    pathname={pathname}
                  />
                );
              }

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
