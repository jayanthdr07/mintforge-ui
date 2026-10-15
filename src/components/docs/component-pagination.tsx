import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COMPONENT_PAGINATION_ORDER } from "@/lib/docs/navigation";

export function ComponentPagination({ currentHref }: { currentHref: string }) {
  const currentIndex = COMPONENT_PAGINATION_ORDER.findIndex((item) => item.href === currentHref);
  const prev = currentIndex > 0 ? COMPONENT_PAGINATION_ORDER[currentIndex - 1] : null;
  const next = currentIndex < COMPONENT_PAGINATION_ORDER.length - 1 ? COMPONENT_PAGINATION_ORDER[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between pt-8 mt-12 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <ChevronLeft size={16} />
          <span>{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-auto"
        >
          <span>{next.title}</span>
          <ChevronRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
