"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "@/components/docs/docs-header";

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  status: "Ready" | "In Registry";
  description: string;
  href: string;
}

const REGISTRY_PRIMITIVES: CatalogItem[] = [
  {
    id: "accordion",
    title: "Accordion",
    category: "Disclosure",
    status: "In Registry",
    description: "Vertically stacked set of interactive headings that each reveal a section of content.",
    href: "/docs/components/accordion",
  },
  {
    id: "alert",
    title: "Alert",
    category: "Feedback",
    status: "In Registry",
    description: "Displays a prominent callout message for user attention with info, warning, and error states.",
    href: "/docs/components/alert",
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    category: "Overlays",
    status: "In Registry",
    description: "Modal dialog that interrupts the user with critical information and requires an explicit response.",
    href: "/docs/components/alert-dialog",
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    category: "Layout",
    status: "In Registry",
    description: "Displays content within a desired aspect ratio (16:9, 4:3, 1:1) without layout shift.",
    href: "/docs/components/aspect-ratio",
  },
  {
    id: "attachment",
    title: "Attachment",
    category: "Data Input",
    status: "In Registry",
    description: "File upload pill, progress tracker, and drag-and-drop attachment dropzone.",
    href: "/docs/components/attachment",
  },
  {
    id: "avatar",
    title: "Avatar",
    category: "Primitives",
    status: "In Registry",
    description: "Image element with fallback initials and active presence indicator dot for user representations.",
    href: "/docs/components/avatar",
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    category: "Navigation",
    status: "In Registry",
    description: "Displays the hierarchical path to the current page within the application structure.",
    href: "/docs/components/breadcrumb",
  },
  {
    id: "bubble",
    title: "Bubble",
    category: "AI & Chat",
    status: "In Registry",
    description: "Chat message bubble with role styling (user vs assistant), action buttons, and streaming support.",
    href: "/docs/components/bubble",
  },
  {
    id: "button-group",
    title: "Button Group",
    category: "Primitives",
    status: "In Registry",
    description: "Group a series of buttons together on a single line or toolbar with seamless borders.",
    href: "/docs/components/button-group",
  },
];

export default function ComponentsCatalogPage() {
  const [filter, setFilter] = useState<"all" | "ready" | "registry">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const coreComponents: CatalogItem[] = Object.values(COMPONENT_REGISTRY).map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    status: "Ready" as const,
    description: c.description,
    href: `/docs/components/${c.id}`,
  }));

  const allItems: CatalogItem[] = [...coreComponents, ...REGISTRY_PRIMITIVES];

  const filteredItems = allItems.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "ready" && item.status === "Ready") ||
      (filter === "registry" && item.status === "In Registry");

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="mf-docs-main">
      <DocsHeader
        title="Components"
        description="A growing collection of accessible, styled UI primitives and compound components for React, Next.js, and React Native."
        prevHref="/docs/theming"
        nextHref="/docs/components/button"
      />

      {/* Controls Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-6">
        {/* Filter Pills */}
        <div className="inline-flex items-center gap-1 p-1 bg-secondary border border-border rounded-lg self-start">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === "all"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({allItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("ready")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === "ready"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Core Primitives ({coreComponents.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("registry")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === "registry"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            In Registry ({REGISTRY_PRIMITIVES.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {/* Grid of Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="p-5 rounded-xl border border-border bg-card hover:border-brand transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                  {c.title}
                </h3>
                {c.status === "Ready" ? (
                  <Badge variant="brand">Interactive</Badge>
                ) : (
                  <Badge variant="outline">CLI Add</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/50 text-[11px]">
              <span className="text-muted-foreground font-mono">{c.category}</span>
              <div className="flex items-center gap-1 font-semibold text-brand">
                <span>{c.status === "Ready" ? "Open Playground" : "View Installation"}</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center text-sm text-muted-foreground">
          No components match &quot;{searchQuery}&quot;. Try a different search term.
        </div>
      )}
    </div>
  );
}
