"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function AvatarDocPage() {
  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "sizes", title: "Size Scale" },
    { id: "status", title: "Presence Badges" },
    { id: "fallback", title: "Initials Fallback" },
    { id: "installation", title: "Installation" },
  ];

  const exampleCode = `<Avatar size="lg">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Sarah Connor" />
  <AvatarFallback initials="SC" />
  <AvatarBadge status="online" />
</Avatar>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Avatar"
          description="Visual user representation primitive supporting image thumbnails, fallback initials, and active presence status indicators."
          badge="Primitives"
        />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Live Example</h2>
          <ComponentPreview code={exampleCode}>
            <div className="flex items-center gap-4 p-4">
              <Avatar size="lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt="Sarah Connor"
                />
                <AvatarFallback initials="SC" />
                <AvatarBadge status="online" />
              </Avatar>

              <div>
                <h4 className="text-sm font-semibold text-foreground">Sarah Connor</h4>
                <p className="text-xs text-muted-foreground">Lead AI Architect &middot; Online</p>
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="sizes" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Size Scale</h2>
          <ComponentPreview
            code={`<Avatar size="sm"><AvatarFallback initials="SM" /></Avatar>
<Avatar size="md"><AvatarFallback initials="MD" /></Avatar>
<Avatar size="lg"><AvatarFallback initials="LG" /></Avatar>
<Avatar size="xl"><AvatarFallback initials="XL" /></Avatar>`}
          >
            <div className="flex items-center gap-4 p-4">
              <Avatar size="sm">
                <AvatarFallback initials="SM" />
                <AvatarBadge status="online" />
              </Avatar>

              <Avatar size="md">
                <AvatarFallback initials="MD" />
                <AvatarBadge status="away" />
              </Avatar>

              <Avatar size="lg">
                <AvatarFallback initials="LG" />
                <AvatarBadge status="busy" />
              </Avatar>

              <Avatar size="xl">
                <AvatarFallback initials="XL" />
                <AvatarBadge status="offline" />
              </Avatar>
            </div>
          </ComponentPreview>
        </section>

        <section id="status" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Presence Status Badges</h2>
          <ComponentPreview
            code={`<AvatarBadge status="online" />  {/* Emerald */}
<AvatarBadge status="busy" />    {/* Red */}
<AvatarBadge status="away" />    {/* Amber */}
<AvatarBadge status="offline" /> {/* Gray */}`}
          >
            <div className="flex items-center gap-6 p-4">
              <div className="flex flex-col items-center gap-1.5">
                <Avatar size="md">
                  <AvatarFallback initials="ON" />
                  <AvatarBadge status="online" />
                </Avatar>
                <span className="text-[10px] text-muted-foreground">online</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Avatar size="md">
                  <AvatarFallback initials="BU" />
                  <AvatarBadge status="busy" />
                </Avatar>
                <span className="text-[10px] text-muted-foreground">busy</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Avatar size="md">
                  <AvatarFallback initials="AW" />
                  <AvatarBadge status="away" />
                </Avatar>
                <span className="text-[10px] text-muted-foreground">away</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Avatar size="md">
                  <AvatarFallback initials="OF" />
                  <AvatarBadge status="offline" />
                </Avatar>
                <span className="text-[10px] text-muted-foreground">offline</span>
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="fallback" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Graceful Error & Initials Fallback</h2>
          <p className="text-xs text-muted-foreground">
            When an image fails to load or the URL is invalid, <code>AvatarFallback</code> renders smoothly without layout shift:
          </p>
          <ComponentPreview
            code={`<Avatar size="lg">
  <AvatarImage src="/broken-link.png" alt="Alex Rivera" />
  <AvatarFallback initials="AR" />
</Avatar>`}
          >
            <div className="p-4">
              <Avatar size="lg">
                <AvatarImage src="/broken-link-example.png" alt="Alex Rivera" />
                <AvatarFallback initials="AR" />
                <AvatarBadge status="online" />
              </Avatar>
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <p className="text-xs text-muted-foreground mb-2">CLI install:</p>
          <ComponentCode code={`npx mintforge add avatar`} language="bash" />
          <p className="text-xs text-muted-foreground mt-4 mb-2">Import:</p>
          <ComponentCode
            code={`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";`}
            language="tsx"
          />
        </section>

        <ComponentPagination currentHref="/docs/components/avatar" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
