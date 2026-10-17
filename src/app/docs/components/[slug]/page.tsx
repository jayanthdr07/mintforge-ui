import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return [
    { slug: "aspect-ratio" },
    { slug: "breadcrumb" },
    { slug: "button-group" },
  ];
}

export default async function DynamicComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title={formattedTitle}
          description={`Accessible, customizable ${formattedTitle.toLowerCase()} component built for modern web and mobile apps.`}
          badge="In Registry"
          prevHref="/docs/components"
          nextHref="/docs/components/button"
        />

        <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center justify-center text-center my-6 gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-subtle text-brand flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <h3 className="text-base font-bold text-foreground">
            {formattedTitle} Primitive
          </h3>
          <p className="text-xs text-muted-foreground max-w-md">
            This component code is distributed directly via the Mintforge CLI. Run the command below to add it to your project.
          </p>
        </div>

        <section id="installation" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Installation</h2>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: `pnpm dlx mintforge@latest add ${slug}`,
              npm: `npx mintforge@latest add ${slug}`,
              yarn: `yarn dlx mintforge@latest add ${slug}`,
              bun: `bunx mintforge@latest add ${slug}`,
            }}
          />
        </section>

        <section id="usage" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Usage</h2>
          <ComponentCode
            language="tsx"
            code={`import { ${formattedTitle.replace(/\s+/g, "")} } from "@/components/ui/${slug}";\n\nexport default function Example() {\n  return (\n    <${formattedTitle.replace(/\s+/g, "")}>\n      ${formattedTitle} Content\n    </${formattedTitle.replace(/\s+/g, "")}>\n  );\n}`}
          />
        </section>

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Looking for active primitives?</span>
          <Link href="/docs/components" className="text-brand hover:underline font-medium">
            Browse All 6 Implemented Primitives &rarr;
          </Link>
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
