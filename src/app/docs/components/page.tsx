import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "@/components/docs/docs-header";

export default function ComponentsCatalogPage() {
  const components = Object.values(COMPONENT_REGISTRY);

  return (
    <div className="mf-docs-main">
      <DocsHeader
        title="Components"
        description="A growing collection of accessible, styled UI primitives and compound components for modern React applications."
        prevHref="/docs/theming"
        nextHref="/docs/components/button"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {components.map((c) => (
          <Link
            key={c.id}
            href={`/docs/components/${c.id}`}
            className="p-5 rounded-xl border border-border bg-card hover:border-brand transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">
                  {c.title}
                </h3>
                <Badge variant="brand">{c.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {c.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand mt-4">
              <span>View Component</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
