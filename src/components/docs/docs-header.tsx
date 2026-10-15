import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export function DocsHeader({
    title,
    description,
    badge,
}: {
    title: string;
    description: string;
    badge?: string;
}) {
    return (
        <div className="space-y-2 pb-6 mb-8 border-b border-[var(--mf-border)]">
            <div className="flex items-center gap-1.5 text-xs text-[var(--mf-foreground-muted)]">
                <Link href="/docs" className="hover:text-[var(--mf-foreground)]">
                    Docs
                </Link>
                <ChevronRight size={12} />
                <Link href="/docs/components" className="hover:text-[var(--mf-foreground)]">
                    Components
                </Link>
                <ChevronRight size={12} />
                <span className="text-[var(--mf-foreground)] font-medium">{title}</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--mf-foreground)]">
                    {title}
                </h1>
                {badge && <Badge variant="brand">{badge}</Badge>}
            </div>

            <p className="text-base text-[var(--mf-foreground-secondary)] max-w-2xl">
                {description}
            </p>
        </div>
    )
}