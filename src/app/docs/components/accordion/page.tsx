"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import {
  Layers,
  Sparkles,
  Zap,
  Shield,
  Palette,
  CreditCard,
} from "lucide-react";

export default function AccordionDocPage() {
  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "cards-variant", title: "Cards Variant" },
    { id: "indicators", title: "Indicator Styles" },
    { id: "multiple", title: "Multiple Expansion" },
    { id: "installation", title: "Installation" },
  ];

  const exampleCode = `<Accordion type="single" defaultValue="item-1" collapsible variant="bordered">
  <AccordionItem value="item-1">
    <AccordionTrigger
      icon={<Layers size={16} />}
      subtitle="Accessible, composable primitives"
      badge={<Badge size="sm" variant="brand">Core</Badge>}
    >
      Design System Primitives
    </AccordionTrigger>
    <AccordionContent>
      Built from scratch with zero heavy runtime dependencies. Fully accessible WAI-ARIA
      disclosure pattern with keyboard navigation and smooth CSS grid transitions.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger
      icon={<Palette size={16} />}
      subtitle="CSS custom properties tokens"
    >
      Flexible Theming & Styling
    </AccordionTrigger>
    <AccordionContent>
      Effortlessly customize brand colors, radii, and surfaces using standard Tailwind CSS v4
      design tokens with full dark mode support.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger
      icon={<Zap size={16} />}
      subtitle="Modern web performance"
    >
      Zero Hydration Mismatch
    </AccordionTrigger>
    <AccordionContent>
      Optimized for React 19 and Next.js 16 App Router with deterministic rendering
      and zero layout shift during expand/collapse animations.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

  const cardsCode = `<Accordion type="single" variant="cards" defaultValue="card-1" collapsible>
  <AccordionItem value="card-1">
    <AccordionTrigger
      icon={<Shield size={16} />}
      subtitle="Encrypted end-to-end"
      badge={<Badge size="sm" variant="success">Active</Badge>}
    >
      Security & Compliance
    </AccordionTrigger>
    <AccordionContent>
      All data is protected using AES-256 encryption at rest and TLS 1.3 in transit.
      Compliant with SOC 2 Type II and GDPR standards.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="card-2">
    <AccordionTrigger
      icon={<CreditCard size={16} />}
      subtitle="Manage your subscription and invoices"
    >
      Billing & Invoices
    </AccordionTrigger>
    <AccordionContent>
      Download past invoices, update payment methods, or transition between monthly
      and annual billing cycles with prorated calculation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Accordion"
          description="Vertically stacked interactive disclosure headings with multiple visual styles, indicator icons, leading accessory slots, and fluid CSS grid transitions."
          badge="Primitives"
        />

        {/* Live Example */}
        <section id="interactive" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Live Example</h2>
          <p className="text-xs text-muted-foreground">
            Standard bordered accordion with leading icon badges, subtitle descriptions, and status pills.
          </p>
          <ComponentPreview code={exampleCode}>
            <div className="w-full max-w-lg p-2">
              <Accordion type="single" defaultValue="item-1" collapsible variant="bordered">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    icon={<Layers size={16} />}
                    subtitle="Accessible, composable primitives"
                    badge={<Badge size="sm" variant="brand">Core</Badge>}
                  >
                    Design System Primitives
                  </AccordionTrigger>
                  <AccordionContent>
                    Built from scratch with zero heavy runtime dependencies. Fully accessible WAI-ARIA
                    disclosure pattern with keyboard navigation and smooth CSS grid transitions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger
                    icon={<Palette size={16} />}
                    subtitle="CSS custom properties tokens"
                  >
                    Flexible Theming & Styling
                  </AccordionTrigger>
                  <AccordionContent>
                    Effortlessly customize brand colors, radii, and surfaces using standard Tailwind CSS v4
                    design tokens with full dark mode support.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger
                    icon={<Zap size={16} />}
                    subtitle="Modern web performance"
                  >
                    Zero Hydration Mismatch
                  </AccordionTrigger>
                  <AccordionContent>
                    Optimized for React 19 and Next.js 16 App Router with deterministic rendering
                    and zero layout shift during expand/collapse animations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        {/* Cards Variant */}
        <section id="cards-variant" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Cards Variant</h2>
          <p className="text-xs text-muted-foreground">
            Use <code>variant=&quot;cards&quot;</code> to present items as independent floating cards with active outline highlights.
          </p>
          <ComponentPreview code={cardsCode}>
            <div className="w-full max-w-lg p-2">
              <Accordion type="single" variant="cards" defaultValue="card-1" collapsible>
                <AccordionItem value="card-1">
                  <AccordionTrigger
                    icon={<Shield size={16} />}
                    subtitle="Encrypted end-to-end"
                    badge={<Badge size="sm" variant="success">Active</Badge>}
                  >
                    Security & Compliance
                  </AccordionTrigger>
                  <AccordionContent>
                    All data is protected using AES-256 encryption at rest and TLS 1.3 in transit.
                    Compliant with SOC 2 Type II and GDPR standards.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="card-2">
                  <AccordionTrigger
                    icon={<CreditCard size={16} />}
                    subtitle="Manage your subscription and invoices"
                  >
                    Billing & Invoices
                  </AccordionTrigger>
                  <AccordionContent>
                    Download past invoices, update payment methods, or transition between monthly
                    and annual billing cycles with prorated calculation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        {/* Indicator Types */}
        <section id="indicators" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Indicator Styles</h2>
          <p className="text-xs text-muted-foreground">
            Choose between <code>indicator=&quot;chevron&quot;</code>, <code>&quot;plus&quot;</code> (smooth 45° rotation into cross), or <code>&quot;arrow&quot;</code>.
          </p>
          <ComponentPreview
            code={`<Accordion type="single" indicator="plus" variant="filled" collapsible>
  <AccordionItem value="p-1">
    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
    <AccordionContent>We support all major credit cards, Apple Pay, Google Pay, and SEPA wire transfers.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="p-2">
    <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
    <AccordionContent>Yes, you can cancel your subscription at any time from your account settings.</AccordionContent>
  </AccordionItem>
</Accordion>`}
          >
            <div className="w-full max-w-lg p-2">
              <Accordion type="single" indicator="plus" variant="filled" collapsible defaultValue="p-1">
                <AccordionItem value="p-1">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We support all major credit cards, Apple Pay, Google Pay, and SEPA wire transfers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="p-2">
                  <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel your subscription at any time from your account settings with zero cancellation fees.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        {/* Multiple Expansion */}
        <section id="multiple" className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-foreground">Multiple Expansion Mode</h2>
          <p className="text-xs text-muted-foreground">
            Set <code>type=&quot;multiple&quot;</code> to allow multiple accordion panels to remain expanded simultaneously.
          </p>
          <ComponentPreview code={`<Accordion type="multiple" defaultValue={["m-1", "m-2"]} variant="bordered"> ... </Accordion>`}>
            <div className="w-full max-w-lg p-2">
              <Accordion type="multiple" defaultValue={["m-1", "m-2"]} variant="bordered">
                <AccordionItem value="m-1">
                  <AccordionTrigger icon={<Sparkles size={16} />}>Accessible Micro-Animations</AccordionTrigger>
                  <AccordionContent>
                    CSS grid-template-row transitions provide native hardware-accelerated animations with no JavaScript runtime overhead.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="m-2">
                  <AccordionTrigger icon={<Zap size={16} />}>Responsive Layout Primitives</AccordionTrigger>
                  <AccordionContent>
                    Fluid typography and proportional spacing adapt gracefully across mobile, tablet, and widescreen displays.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        {/* Installation */}
        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">Installation</h2>
          <p className="text-xs text-muted-foreground mb-2">CLI install:</p>
          <ComponentCode code={`npx mintforge add accordion`} language="bash" />
          <p className="text-xs text-muted-foreground mt-4 mb-2">Import:</p>
          <ComponentCode
            code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";`}
            language="tsx"
          />
        </section>

        <ComponentPagination currentHref="/docs/components/accordion" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
