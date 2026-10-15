import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Badge } from "@/components/ui/badge";

export default function ComponentsCatalogPage() {
  const components = Object.values(COMPONENT_REGISTRY);

  return (
    <div className="mf-docs-main max-w-4xl">
      <div className="space-y-2 pb-6 mb-8 border-b border-[var(--mf-border)]">
        <h1 className="text-3xl font-extrabold text-[var(--mf-foreground)]">
          Components Catalog
        </h1>
        <p className="text-sm text-[var(--mf-foreground-secondary)]">
          Explore our collection of accessible, headless-styled UI primitives for modern web apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((c) => (
          <Link
            key={c.id}
            href={`/docs/components/${c.id}`}
            className="p-5 rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] hover:border-[var(--mf-brand)] transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[var(--mf-foreground)] group-hover:text-[var(--mf-brand)]">
                  {c.title}
                </h3>
                <Badge variant="brand">{c.category}</Badge>
              </div>
              <p className="text-xs text-[var(--mf-foreground-secondary)] line-clamp-2">
                {c.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[var(--mf-brand)] mt-4">
              <span>View Component</span>
              <ArrowRight size={13} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
