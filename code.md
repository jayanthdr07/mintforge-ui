# Mintforge UI — Component Catalog & Documentation System

This document contains the complete, production-ready code for the **Component Catalog & Documentation System** for Mintforge UI.

All code is written for **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, strictly adhering to Mintforge UI's design tokens and dark/light theme variables.

---

## Table of Contents

1. [Architecture Overview & Folder Structure](#1-architecture-overview--folder-structure)
2. [Step 1: TypeScript Types (`src/types/docs.ts`)](#step-1-typescript-types-srctypesdocsts)
3. [Step 2: Navigation Hierarchy (`src/lib/docs/navigation.ts`)](#step-2-navigation-hierarchy-srclibdocsnavigationts)
4. [Step 3: Component Registry & Metadata (`src/lib/docs/component-registry.ts`)](#step-3-component-registry--metadata-srclibdocscomponent-registryts)
5. [Step 4: Reusable UI Primitives](#step-4-reusable-ui-primitives)
   - [4.1 Button (`src/components/ui/button.tsx`)](#41-button-srccomponentsuibuttontsx)
   - [4.2 Input (`src/components/ui/input.tsx`)](#42-input-srccomponentsuiinputtsx)
   - [4.3 Card (`src/components/ui/card.tsx`)](#43-card-srccomponentsuicardtsx)
   - [4.4 Badge (`src/components/ui/badge.tsx`)](#44-badge-srccomponentsuibadgetsx)
   - [4.5 Dialog / Modal (`src/components/ui/dialog.tsx`)](#45-dialog--modal-srccomponentsuidialogtsx)
   - [4.6 Tabs (`src/components/ui/tabs.tsx`)](#46-tabs-srccomponentsuitabstsx)
6. [Step 5: Documentation Layout Styles (`src/styles/docs.css`)](#step-5-documentation-layout-styles-srcstylesdocscss)
7. [Step 6: Documentation UI Components](#step-6-documentation-ui-components)
   - [6.1 Docs Sidebar (`src/components/docs/docs-sidebar.tsx`)](#61-docs-sidebar-srccomponentsdocsdocs-sidebartsx)
   - [6.2 Docs Header (`src/components/docs/docs-header.tsx`)](#62-docs-header-srccomponentsdocsdocs-headertsx)
   - [6.3 Docs Table of Contents (`src/components/docs/docs-table-of-contents.tsx`)](#63-docs-table-of-contents-srccomponentsdocsdocs-table-of-contentstsx)
   - [6.4 Component Preview (`src/components/docs/component-preview.tsx`)](#64-component-preview-srccomponentsdocscomponent-previewtsx)
   - [6.5 Component Code Viewer (`src/components/docs/component-code.tsx`)](#65-component-code-viewer-srccomponentsdocscomponent-codetsx)
   - [6.6 Component Props Table (`src/components/docs/component-props-table.tsx`)](#66-component-props-table-srccomponentsdocscomponent-props-tabletsx)
   - [6.7 Component Pagination (`src/components/docs/component-pagination.tsx`)](#67-component-pagination-srccomponentsdocscomponent-paginationtsx)
   - [6.8 Docs Search Modal (`src/components/docs/docs-search.tsx`)](#68-docs-search-modal-srccomponentsdocsdocs-searchtsx)
8. [Step 7: Documentation App Routes](#step-7-documentation-app-routes)
   - [7.1 Docs Layout (`src/app/docs/layout.tsx`)](#71-docs-layout-srcappdocslayouttsx)
   - [7.2 Docs Overview Page (`src/app/docs/page.tsx`)](#72-docs-overview-page-srcappdocspagetsx)
   - [7.3 Components Catalog Index (`src/app/docs/components/page.tsx`)](#73-components-catalog-index-srcappdocscomponentspagetsx)
   - [7.4 Button Documentation Page (`src/app/docs/components/button/page.tsx`)](#74-button-documentation-page-srcappdocscomponentsbuttonpagetsx)
   - [7.5 Input Documentation Page (`src/app/docs/components/input/page.tsx`)](#75-input-documentation-page-srcappdocscomponentsinputpagetsx)
   - [7.6 Card Documentation Page (`src/app/docs/components/card/page.tsx`)](#76-card-documentation-page-srcappdocscomponentscardpagetsx)
   - [7.7 Badge Documentation Page (`src/app/docs/components/badge/page.tsx`)](#77-badge-documentation-page-srcappdocscomponentsbadgepagetsx)
   - [7.8 Dialog Documentation Page (`src/app/docs/components/dialog/page.tsx`)](#78-dialog-documentation-page-srcappdocscomponentsdialogpagetsx)
   - [7.9 Tabs Documentation Page (`src/app/docs/components/tabs/page.tsx`)](#79-tabs-documentation-page-srcappdocscomponentstabspagetsx)
9. [Step 8: Setup Instructions](#step-8-setup-instructions)

---

## 1. Architecture Overview & Folder Structure

All new files are completely modular. They do not alter or delete any existing landing page code.

```text
src/
├── app/
│   └── docs/
│       ├── layout.tsx
│       ├── page.tsx
│       └── components/
│           ├── page.tsx
│           ├── button/
│           │   └── page.tsx
│           ├── input/
│           │   └── page.tsx
│           ├── card/
│           │   └── page.tsx
│           ├── badge/
│           │   └── page.tsx
│           ├── dialog/
│           │   └── page.tsx
│           └── tabs/
│               └── page.tsx
├── components/
│   ├── docs/
│   │   ├── docs-sidebar.tsx
│   │   ├── docs-header.tsx
│   │   ├── docs-table-of-contents.tsx
│   │   ├── component-preview.tsx
│   │   ├── component-code.tsx
│   │   ├── component-props-table.tsx
│   │   ├── component-pagination.tsx
│   │   └── docs-search.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       └── tabs.tsx
├── lib/
│   └── docs/
│       ├── navigation.ts
│       └── component-registry.ts
├── styles/
│   └── docs.css
└── types/
    └── docs.ts
```

---

## Step 1: TypeScript Types (`src/types/docs.ts`)

Create file: `src/types/docs.ts`

```typescript
import React from "react";

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface PropItem {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentMeta {
  id: string;
  title: string;
  description: string;
  category: "Primitives" | "Feedback" | "Layout" | "Navigation" | "Forms";
  status: "Ready" | "Beta" | "Planned";
  dependencies?: string[];
  importSnippet: string;
  sourceCode: string;
  props: PropItem[];
  examples: ComponentExample[];
}

export interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}
```

---

## Step 2: Navigation Hierarchy (`src/lib/docs/navigation.ts`)

Create file: `src/lib/docs/navigation.ts`

```typescript
import { NavSection } from "@/types/docs";

export const DOCS_NAVIGATION: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs#installation" },
      { title: "Design Tokens", href: "/docs#tokens" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components" },
      { title: "Button", href: "/docs/components/button", badge: "Core" },
      { title: "Input", href: "/docs/components/input", badge: "Core" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Dialog", href: "/docs/components/dialog", badge: "Modal" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
];

export const COMPONENT_PAGINATION_ORDER = [
  { title: "Overview", href: "/docs/components" },
  { title: "Button", href: "/docs/components/button" },
  { title: "Input", href: "/docs/components/input" },
  { title: "Card", href: "/docs/components/card" },
  { title: "Badge", href: "/docs/components/badge" },
  { title: "Dialog", href: "/docs/components/dialog" },
  { title: "Tabs", href: "/docs/components/tabs" },
];
```

---

## Step 3: Component Registry & Metadata (`src/lib/docs/component-registry.ts`)

Create file: `src/lib/docs/component-registry.ts`

```typescript
import { ComponentMeta } from "@/types/docs";

export const COMPONENT_REGISTRY: Record<string, ComponentMeta> = {
  button: {
    id: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button with multiple styles, sizes, and states.",
    category: "Primitives",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Button } from "@/components/ui/button";`,
    sourceCode: `import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-[var(--mf-radius-md)]";

    const variantStyles = {
      default:
        "bg-[var(--mf-brand)] text-white hover:bg-[var(--mf-brand-hover)] focus-visible:ring-[var(--mf-brand)] shadow-sm",
      secondary:
        "bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-tertiary)] focus-visible:ring-[var(--mf-border)] border border-[var(--mf-border)]",
      outline:
        "bg-transparent text-[var(--mf-foreground)] border border-[var(--mf-border)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      ghost:
        "bg-transparent text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]} \${className}\`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', defaultValue: '"default"', description: "The visual style variant of the button." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls the height, padding, and text size." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Displays a spinning loader and disables interaction." },
      { name: "leftIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered before the label." },
      { name: "rightIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered after the label." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables user clicks and reduces opacity." },
    ],
    examples: [
      {
        title: "Basic Usage",
        code: `<Button>Get Started</Button>`,
      },
      {
        title: "Button Variants",
        code: `<div className="flex flex-wrap gap-3">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
</div>`,
      },
      {
        title: "Loading & Icons",
        code: `<div className="flex gap-3">
  <Button isLoading>Processing...</Button>
  <Button leftIcon={<Sparkles size={16} />}>Magic Generate</Button>
</div>`,
      },
    ],
  },

  input: {
    id: "input",
    title: "Input",
    description: "Accessible text field for receiving user inputs with label, error, and icon slots.",
    category: "Forms",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Input } from "@/components/ui/input";`,
    sourceCode: `import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[var(--mf-foreground)] select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[var(--mf-foreground-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            className={\`w-full h-10 rounded-[var(--mf-radius-md)] border bg-[var(--mf-surface)] text-[var(--mf-foreground)] px-3 text-sm placeholder:text-[var(--mf-foreground-muted)] transition-colors outline-none focus:ring-2 focus:ring-[var(--mf-brand)] focus:border-[var(--mf-brand)] disabled:opacity-50 disabled:bg-[var(--mf-surface-secondary)] disabled:cursor-not-allowed \${
              leftIcon ? "pl-9" : ""
            } \${rightIcon ? "pr-9" : ""} \${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--mf-border)] hover:border-[var(--mf-border-strong)]"
            } \${className}\`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-[var(--mf-foreground-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[var(--mf-foreground-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";`,
    props: [
      { name: "label", type: "string", defaultValue: "undefined", description: "Accessible label rendered above the input." },
      { name: "error", type: "string", defaultValue: "undefined", description: "Validation error message that highlights the input in red." },
      { name: "helperText", type: "string", defaultValue: "undefined", description: "Helpful hint shown below the input." },
      { name: "leftIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered on the left inside the input field." },
      { name: "rightIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon or action rendered on the right inside the input field." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and dims the field." },
    ],
    examples: [
      {
        title: "Standard Input with Label",
        code: `<Input label="Email address" placeholder="alex@mintforge.dev" />`,
      },
      {
        title: "Input with Icons & Validation Error",
        code: `<Input
  label="Password"
  type="password"
  leftIcon={<Lock size={16} />}
  error="Password must be at least 8 characters long."
  defaultValue="123"
/>`,
      },
    ],
  },

  card: {
    id: "card",
    title: "Card",
    description: "Structured container for grouping related content, media, and call-to-actions.",
    category: "Layout",
    status: "Ready",
    dependencies: [],
    importSnippet: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";`,
    sourceCode: `import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={\`rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] text-[var(--mf-foreground)] shadow-[var(--mf-shadow-sm)] transition-shadow hover:shadow-[var(--mf-shadow-md)] \${className}\`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={\`flex flex-col space-y-1.5 p-6 \${className}\`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={\`text-lg font-semibold leading-none tracking-tight text-[var(--mf-foreground)] \${className}\`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={\`text-sm text-[var(--mf-foreground-secondary)] \${className}\`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={\`p-6 pt-0 \${className}\`} {...props} />;
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={\`flex items-center p-6 pt-0 border-t border-[var(--mf-border)] mt-4 \${className}\`}
      {...props}
    />
  );
}`,
    props: [
      { name: "className", type: "string", defaultValue: '""', description: "Additional Tailwind CSS classes." },
      { name: "children", type: "React.ReactNode", defaultValue: "undefined", description: "Nested elements." },
    ],
    examples: [
      {
        title: "Product Card",
        code: `<Card className="w-[360px]">
  <CardHeader>
    <CardTitle>Enterprise Analytics</CardTitle>
    <CardDescription>Real-time KPI metrics and telemetry alerts.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Includes unlimited event streaming and custom dashboard widgets.</p>
  </CardContent>
  <CardFooter className="justify-between">
    <span className="text-xs text-[var(--mf-foreground-muted)]">Active Plan</span>
    <Button size="sm">Manage</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },

  badge: {
    id: "badge",
    title: "Badge",
    description: "Compact status indicator and counter pill.",
    category: "Feedback",
    status: "Ready",
    dependencies: [],
    importSnippet: `import { Badge } from "@/components/ui/badge";`,
    sourceCode: `import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "md";
}

export function Badge({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] border-transparent",
    brand: "bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] border-[var(--mf-brand)]/20 font-semibold",
    outline: "bg-transparent text-[var(--mf-foreground)] border-[var(--mf-border-strong)]",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    destructive: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <div
      className={\`inline-flex items-center gap-1 font-medium rounded-[var(--mf-radius-full)] border transition-colors select-none \${variantStyles[variant]} \${sizeStyles[size]} \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}`,
    props: [
      { name: "variant", type: '"default" | "brand" | "outline" | "success" | "warning" | "destructive"', defaultValue: '"default"', description: "Color style of the badge." },
      { name: "size", type: '"sm" | "md"', defaultValue: '"md"', description: "Size of the badge pill." },
    ],
    examples: [
      {
        title: "Status Badges",
        code: `<div className="flex gap-2">
  <Badge variant="brand">v0.1.0 Ready</Badge>
  <Badge variant="success">Completed</Badge>
  <Badge variant="warning">In Review</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>`,
      },
    ],
  },

  dialog: {
    id: "dialog",
    title: "Dialog / Modal",
    description: "Overlay window for critical workflows, confirmations, and focus-trapped user tasks.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";`,
    sourceCode: `"use client";

import * as React from "react";
import { X } from "lucide-react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogTrigger must be used inside Dialog");

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(true);
    },
  });
}

export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogContent must be used inside Dialog");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    if (ctx.open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctx]);

  if (!ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => ctx.setOpen(false)}
      />
      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={\`relative z-10 w-full max-w-lg rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] p-6 shadow-2xl text-[var(--mf-foreground)] \${className}\`}
      >
        <button
          onClick={() => ctx.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={\`flex flex-col space-y-1.5 text-left mb-4 \${className}\`} {...props} />;
}

export function DialogTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={\`text-lg font-semibold text-[var(--mf-foreground)] \${className}\`} {...props} />;
}

export function DialogDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={\`text-sm text-[var(--mf-foreground-secondary)] \${className}\`} {...props} />;
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={\`flex flex-wrap justify-end gap-2 mt-6 \${className}\`} {...props} />;
}

export function DialogClose({ children }: { children: React.ReactElement }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) return children;

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(false);
    },
  });
}`,
    props: [
      { name: "open", type: "boolean", defaultValue: "undefined", description: "Controlled open state of the dialog." },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback fired when the open state changes." },
    ],
    examples: [
      {
        title: "Standard Confirmation Dialog",
        code: `<Dialog>
  <DialogTrigger>
    <Button>Delete Project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your workspace repository.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Confirm Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
  },

  tabs: {
    id: "tabs",
    title: "Tabs",
    description: "Layered interface for switching between multiple distinct views or content panes.",
    category: "Navigation",
    status: "Ready",
    dependencies: [],
    importSnippet: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";`,
    sourceCode: `"use client";

import * as React from "react";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = "",
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) setUncontrolledValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={\`w-full flex flex-col \${className}\`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={\`inline-flex items-center gap-1 p-1 bg-[var(--mf-surface-secondary)] border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] self-start \${className}\`}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used inside Tabs");

  const isSelected = ctx.value === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      onClick={() => ctx.onValueChange(value)}
      className={\`px-3.5 py-1.5 text-xs font-medium rounded-[var(--mf-radius-sm)] transition-all cursor-pointer \${
        isSelected
          ? "bg-[var(--mf-surface)] text-[var(--mf-foreground)] shadow-[var(--mf-shadow-sm)] font-semibold"
          : "text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)]"
      } \${className}\`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used inside Tabs");

  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className={\`mt-4 focus-visible:outline-none \${className}\`}>
      {children}
    </div>
  );
}`,
    props: [
      { name: "defaultValue", type: "string", defaultValue: '""', description: "Initial active tab." },
      { name: "value", type: "string", defaultValue: "undefined", description: "Controlled active tab key." },
      { name: "onValueChange", type: "(val: string) => void", defaultValue: "undefined", description: "Fired when user clicks a different tab." },
    ],
    examples: [
      {
        title: "Tabbed Navigation",
        code: `<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Live Preview</TabsTrigger>
    <TabsTrigger value="code">Source Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Preview contents go here.</TabsContent>
  <TabsContent value="code">Code block goes here.</TabsContent>
</Tabs>`,
      },
    ],
  },
};
```

---

## Step 4: Reusable UI Primitives

### 4.1 Button (`src/components/ui/button.tsx`)

Create file: `src/components/ui/button.tsx`

```typescript
import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-[var(--mf-radius-md)]";

    const variantStyles = {
      default:
        "bg-[var(--mf-brand)] text-white hover:bg-[var(--mf-brand-hover)] focus-visible:ring-[var(--mf-brand)] shadow-sm",
      secondary:
        "bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-tertiary)] focus-visible:ring-[var(--mf-border)] border border-[var(--mf-border)]",
      outline:
        "bg-transparent text-[var(--mf-foreground)] border border-[var(--mf-border)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      ghost:
        "bg-transparent text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-secondary)] focus-visible:ring-[var(--mf-border)]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";
```

### 4.2 Input (`src/components/ui/input.tsx`)

Create file: `src/components/ui/input.tsx`

```typescript
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[var(--mf-foreground)] select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[var(--mf-foreground-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            className={`w-full h-10 rounded-[var(--mf-radius-md)] border bg-[var(--mf-surface)] text-[var(--mf-foreground)] px-3 text-sm placeholder:text-[var(--mf-foreground-muted)] transition-colors outline-none focus:ring-2 focus:ring-[var(--mf-brand)] focus:border-[var(--mf-brand)] disabled:opacity-50 disabled:bg-[var(--mf-surface-secondary)] disabled:cursor-not-allowed ${
              leftIcon ? "pl-9" : ""
            } ${rightIcon ? "pr-9" : ""} ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-[var(--mf-border)] hover:border-[var(--mf-border-strong)]"
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-[var(--mf-foreground-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[var(--mf-foreground-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
```

### 4.3 Card (`src/components/ui/card.tsx`)

Create file: `src/components/ui/card.tsx`

```typescript
import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] text-[var(--mf-foreground)] shadow-[var(--mf-shadow-sm)] transition-shadow hover:shadow-[var(--mf-shadow-md)] ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight text-[var(--mf-foreground)] ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[var(--mf-foreground-secondary)] ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center p-6 pt-0 border-t border-[var(--mf-border)] mt-4 ${className}`}
      {...props}
    />
  );
}
```

### 4.4 Badge (`src/components/ui/badge.tsx`)

Create file: `src/components/ui/badge.tsx`

```typescript
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "outline" | "success" | "warning" | "destructive";
  size?: "sm" | "md";
}

export function Badge({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] border-transparent",
    brand: "bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] border-[var(--mf-brand)]/20 font-semibold",
    outline: "bg-transparent text-[var(--mf-foreground)] border-[var(--mf-border-strong)]",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    destructive: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <div
      className={`inline-flex items-center gap-1 font-medium rounded-[var(--mf-radius-full)] border transition-colors select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
```

### 4.5 Dialog / Modal (`src/components/ui/dialog.tsx`)

Create file: `src/components/ui/dialog.tsx`

```typescript
"use client";

import * as React from "react";
import { X } from "lucide-react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogTrigger must be used inside Dialog");

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(true);
    },
  });
}

export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogContent must be used inside Dialog");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    if (ctx.open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctx]);

  if (!ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => ctx.setOpen(false)}
      />
      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full max-w-lg rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] p-6 shadow-2xl text-[var(--mf-foreground)] ${className}`}
      >
        <button
          onClick={() => ctx.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-[var(--mf-foreground)]"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 text-left mb-4 ${className}`} {...props} />;
}

export function DialogTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-lg font-semibold text-[var(--mf-foreground)] ${className}`} {...props} />;
}

export function DialogDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-[var(--mf-foreground-secondary)] ${className}`} {...props} />;
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-wrap justify-end gap-2 mt-6 ${className}`} {...props} />;
}

export function DialogClose({ children }: { children: React.ReactElement<{ onClick?: React.MouseEventHandler }> }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) return children;

  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      ctx.setOpen(false);
    },
  });
}
```

### 4.6 Tabs (`src/components/ui/tabs.tsx`)

Create file: `src/components/ui/tabs.tsx`

```typescript
"use client";

import * as React from "react";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = "",
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) setUncontrolledValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={`w-full flex flex-col ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1 p-1 bg-[var(--mf-surface-secondary)] border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] self-start ${className}`}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used inside Tabs");

  const isSelected = ctx.value === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      onClick={() => ctx.onValueChange(value)}
      className={`px-3.5 py-1.5 text-xs font-medium rounded-[var(--mf-radius-sm)] transition-all cursor-pointer ${
        isSelected
          ? "bg-[var(--mf-surface)] text-[var(--mf-foreground)] shadow-[var(--mf-shadow-sm)] font-semibold"
          : "text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used inside Tabs");

  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className={`mt-4 focus-visible:outline-none ${className}`}>
      {children}
    </div>
  );
}
```

---

## Step 5: Documentation Layout Styles (`src/styles/docs.css`)

Create file: `src/styles/docs.css`

```css
.mf-docs-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  max-width: 1440px;
  margin: 0 auto;
}

.mf-docs-sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--mf-border);
  padding: 1.5rem 1rem;
  position: sticky;
  top: 4.5rem;
  height: calc(100vh - 4.5rem);
  overflow-y: auto;
}

.mf-docs-main {
  flex: 1;
  min-width: 0;
  padding: 2rem 3rem 4rem 3rem;
}

.mf-docs-toc {
  width: 220px;
  flex-shrink: 0;
  padding: 2rem 1rem;
  position: sticky;
  top: 4.5rem;
  height: calc(100vh - 4.5rem);
  overflow-y: auto;
}

@media (max-width: 1024px) {
  .mf-docs-toc {
    display: none;
  }
  .mf-docs-main {
    padding: 1.5rem 1.5rem 3rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .mf-docs-sidebar {
    display: none;
  }
}
```

---

## Step 6: Documentation UI Components

### 6.1 Docs Sidebar (`src/components/docs/docs-sidebar.tsx`)

Create file: `src/components/docs/docs-sidebar.tsx`

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mf-docs-sidebar">
      <div className="space-y-6">
        {DOCS_NAVIGATION.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--mf-foreground-muted)] px-3">
              {section.title}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-[var(--mf-radius-md)] transition-colors ${
                      isActive
                        ? "bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] font-semibold"
                        : "text-[var(--mf-foreground-secondary)] hover:bg-[var(--mf-surface-secondary)] hover:text-[var(--mf-foreground)]"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground-muted)] border border-[var(--mf-border)]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
```

### 6.2 Docs Header (`src/components/docs/docs-header.tsx`)

Create file: `src/components/docs/docs-header.tsx`

```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  );
}
```

### 6.3 Docs Table of Contents (`src/components/docs/docs-table-of-contents.tsx`)

Create file: `src/components/docs/docs-table-of-contents.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

export function DocsTableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(items[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <aside className="mf-docs-toc">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mf-foreground-muted)]">
          On This Page
        </p>
        <nav className="flex flex-col space-y-1.5 text-xs">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`transition-colors py-1 ${
                activeId === item.id
                  ? "text-[var(--mf-brand)] font-semibold"
                  : "text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)]"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
```

### 6.4 Component Preview (`src/components/docs/component-preview.tsx`)

Create file: `src/components/docs/component-preview.tsx`

```typescript
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComponentCode } from "./component-code";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export function ComponentPreview({ children, code, title = "Interactive Preview" }: ComponentPreviewProps) {
  return (
    <div className="w-full my-6 border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)] overflow-hidden bg-[var(--mf-surface)] shadow-[var(--mf-shadow-sm)]">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between border-b border-[var(--mf-border)] px-4 py-2.5 bg-[var(--mf-surface-secondary)]">
          <span className="text-xs font-semibold text-[var(--mf-foreground)]">{title}</span>
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="m-0 p-8 flex items-center justify-center min-h-[180px] bg-[var(--mf-surface)]">
          {children}
        </TabsContent>

        <TabsContent value="code" className="m-0 p-0 border-t border-[var(--mf-border)]">
          <ComponentCode code={code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 6.5 Component Code Viewer (`src/components/docs/component-code.tsx`)

Create file: `src/components/docs/component-code.tsx`

```typescript
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ComponentCode({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", code);
    }
  };

  return (
    <div className="relative group w-full bg-[var(--site-code-bg,#10211e)] rounded-b-[var(--mf-radius-lg)] overflow-hidden">
      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute right-3 top-3 z-10 p-1.5 rounded-md text-emerald-400 bg-white/10 hover:bg-white/20 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-[var(--site-code-text,#d8f7e9)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

### 6.6 Component Props Table (`src/components/docs/component-props-table.tsx`)

Create file: `src/components/docs/component-props-table.tsx`

```typescript
import { PropItem } from "@/types/docs";

export function ComponentPropsTable({ props }: { props: PropItem[] }) {
  if (!props || props.length === 0) return null;

  return (
    <div className="w-full my-6 overflow-x-auto border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)]">
      <table className="w-full text-left text-xs">
        <thead className="bg-[var(--mf-surface-secondary)] border-b border-[var(--mf-border)] text-[var(--mf-foreground-muted)] uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--mf-border)] bg-[var(--mf-surface)]">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-[var(--mf-surface-secondary)]/50 transition-colors">
              <td className="px-4 py-3 font-mono font-semibold text-[var(--mf-brand)]">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-[var(--mf-foreground-secondary)]">
                {p.type}
              </td>
              <td className="px-4 py-3 font-mono text-[var(--mf-foreground-muted)]">
                {p.defaultValue || "—"}
              </td>
              <td className="px-4 py-3 text-[var(--mf-foreground)]">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 6.7 Component Pagination (`src/components/docs/component-pagination.tsx`)

Create file: `src/components/docs/component-pagination.tsx`

```typescript
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COMPONENT_PAGINATION_ORDER } from "@/lib/docs/navigation";

export function ComponentPagination({ currentHref }: { currentHref: string }) {
  const currentIndex = COMPONENT_PAGINATION_ORDER.findIndex((item) => item.href === currentHref);
  const prev = currentIndex > 0 ? COMPONENT_PAGINATION_ORDER[currentIndex - 1] : null;
  const next = currentIndex < COMPONENT_PAGINATION_ORDER.length - 1 ? COMPONENT_PAGINATION_ORDER[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between pt-8 mt-12 border-t border-[var(--mf-border)]">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-secondary)] transition-colors"
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
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] text-[var(--mf-foreground-secondary)] hover:text-[var(--mf-foreground)] hover:bg-[var(--mf-surface-secondary)] transition-colors ml-auto"
        >
          <span>{next.title}</span>
          <ChevronRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
```

### 6.8 Docs Search Modal (`src/components/docs/docs-search.tsx`)

Create file: `src/components/docs/docs-search.tsx`

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";

export function DocsSearch() {
  const [query, setQuery] = useState("");

  const filtered = Object.values(COMPONENT_REGISTRY).filter((comp) =>
    comp.title.toLowerCase().includes(query.toLowerCase()) ||
    comp.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md my-4">
      <div className="relative flex items-center">
        <Search size={16} className="absolute left-3 text-[var(--mf-foreground-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter components..."
          className="w-full h-9 pl-9 pr-3 text-xs rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] bg-[var(--mf-surface)] text-[var(--mf-foreground)] outline-none focus:border-[var(--mf-brand)]"
        />
      </div>

      {query && (
        <div className="absolute z-20 mt-1 w-full max-w-md bg-[var(--mf-surface)] border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] shadow-lg overflow-hidden">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={`/docs/components/${item.id}`}
                className="block p-3 hover:bg-[var(--mf-surface-secondary)] border-b border-[var(--mf-border)] last:border-0"
              >
                <div className="text-xs font-semibold text-[var(--mf-foreground)]">{item.title}</div>
                <div className="text-[11px] text-[var(--mf-foreground-secondary)] truncate">{item.description}</div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-xs text-center text-[var(--mf-foreground-muted)]">
              No matching components found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Step 7: Documentation App Routes

### 7.1 Docs Layout (`src/app/docs/layout.tsx`)

Create file: `src/app/docs/layout.tsx`

```typescript
import "@/styles/docs.css";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mf-docs-container">
      <DocsSidebar />
      <div className="flex-1 min-w-0 flex">{children}</div>
    </div>
  );
}
```

### 7.2 Docs Overview Page (`src/app/docs/page.tsx`)

Create file: `src/app/docs/page.tsx`

```typescript
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Palette } from "lucide-react";
import { ComponentCode } from "@/components/docs/component-code";

export default function DocsPage() {
  return (
    <div className="mf-docs-main max-w-4xl">
      <div className="space-y-4 pb-8 border-b border-[var(--mf-border)]">
        <span className="text-xs font-semibold text-[var(--mf-brand)] tracking-wider uppercase">
          Documentation
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--mf-foreground)]">
          Mintforge UI Documentation
        </h1>
        <p className="text-base text-[var(--mf-foreground-secondary)] max-w-2xl">
          An open-source design system and UI ecosystem for React, Next.js, and React Native. Clean, accessible, and easily themeable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <Link
          href="/docs/components"
          className="p-6 rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)] hover:border-[var(--mf-brand)] transition-colors group"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-[var(--mf-radius-md)] bg-[var(--mf-brand-subtle)] text-[var(--mf-brand)] mb-3">
            <Layers size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--mf-foreground)] group-hover:text-[var(--mf-brand)] flex items-center gap-1.5">
            Explore Components <ArrowRight size={14} />
          </h3>
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-1">
            Browse our core primitives including Button, Input, Card, Badge, Dialog, and Tabs.
          </p>
        </Link>

        <div className="p-6 rounded-[var(--mf-radius-lg)] border border-[var(--mf-border)] bg-[var(--mf-surface)]">
          <div className="h-10 w-10 flex items-center justify-center rounded-[var(--mf-radius-md)] bg-[var(--mf-surface-secondary)] text-[var(--mf-foreground)] mb-3">
            <Palette size={20} />
          </div>
          <h3 className="text-base font-semibold text-[var(--mf-foreground)]">
            Design Tokens
          </h3>
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-1">
            Built directly on top of Tailwind CSS variables with full automatic light/dark mode support.
          </p>
        </div>
      </div>

      <section id="installation" className="space-y-4 my-8">
        <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
        <p className="text-xs text-[var(--mf-foreground-secondary)]">
          Mintforge UI components are source-based. You can copy the component files into your project or install them directly:
        </p>
        <ComponentCode code="npm install lucide-react" language="bash" />
      </section>
    </div>
  );
}
```

### 7.3 Components Catalog Index (`src/app/docs/components/page.tsx`)

Create file: `src/app/docs/components/page.tsx`

```typescript
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
```

### 7.4 Button Documentation Page (`src/app/docs/components/button/page.tsx`)

Create file: `src/app/docs/components/button/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function ButtonDocPage() {
  const meta = COMPONENT_REGISTRY.button;
  const [variant, setVariant] = useState<"default" | "secondary" | "outline" | "ghost" | "destructive">("default");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [loading, setLoading] = useState(false);

  const tocItems = [
    { id: "interactive", title: "Interactive Playground" },
    { id: "variants", title: "Variants & Sizes" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Core Primitive" />

        {/* Interactive Playground */}
        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Interactive Playground</h2>

          <div className="flex flex-wrap items-center gap-3 p-3 bg-[var(--mf-surface-secondary)] rounded-[var(--mf-radius-md)] border border-[var(--mf-border)] text-xs">
            <span className="font-semibold text-[var(--mf-foreground)]">Variant:</span>
            {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-2 py-1 rounded capitalize ${
                  variant === v
                    ? "bg-[var(--mf-brand)] text-white font-semibold"
                    : "bg-[var(--mf-surface)] text-[var(--mf-foreground)]"
                }`}
              >
                {v}
              </button>
            ))}

            <span className="font-semibold text-[var(--mf-foreground)] ml-3">Size:</span>
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2 py-1 rounded uppercase ${
                  size === s
                    ? "bg-[var(--mf-brand)] text-white font-semibold"
                    : "bg-[var(--mf-surface)] text-[var(--mf-foreground)]"
                }`}
              >
                {s}
              </button>
            ))}

            <button
              onClick={() => setLoading(!loading)}
              className={`px-2 py-1 rounded ml-auto ${
                loading ? "bg-amber-600 text-white" : "bg-[var(--mf-surface)] text-[var(--mf-foreground)]"
              }`}
            >
              Toggle Loading
            </button>
          </div>

          <ComponentPreview
            code={`<Button variant="${variant}" size="${size}"${loading ? " isLoading" : ""}>Click Me</Button>`}
          >
            <Button variant={variant} size={size} isLoading={loading}>
              Click Me
            </Button>
          </ComponentPreview>
        </section>

        {/* Variants */}
        <section id="variants" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Variants & Sizes</h2>
          <div className="flex flex-wrap gap-3 p-6 border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)] bg-[var(--mf-surface)]">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button leftIcon={<Sparkles size={16} />}>With Icon</Button>
            <Button rightIcon={<ArrowRight size={16} />}>Proceed</Button>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        {/* Props */}
        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Props Reference</h2>
          <ComponentPropsTable props={meta.props} />
        </section>

        <ComponentPagination currentHref="/docs/components/button" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

### 7.5 Input Documentation Page (`src/app/docs/components/input/page.tsx`)

Create file: `src/app/docs/components/input/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { Mail, Lock, Search } from "lucide-react";
import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Input } from "@/components/ui/input";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function InputDocPage() {
  const meta = COMPONENT_REGISTRY.input;
  const [val, setVal] = useState("alex@mintforge.dev");
  const [hasError, setHasError] = useState(false);

  const tocItems = [
    { id: "interactive", title: "Interactive Playground" },
    { id: "examples", title: "Input Examples" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Forms" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Interactive Playground</h2>

          <div className="flex gap-3 mb-2">
            <button
              onClick={() => setHasError(!hasError)}
              className={`px-3 py-1.5 text-xs rounded-[var(--mf-radius-md)] border cursor-pointer ${
                hasError
                  ? "bg-red-500/10 border-red-500 text-red-500 font-semibold"
                  : "bg-[var(--mf-surface-secondary)] border-[var(--mf-border)] text-[var(--mf-foreground)]"
              }`}
            >
              {hasError ? "Clear Error State" : "Trigger Validation Error"}
            </button>
          </div>

          <ComponentPreview
            code={`<Input
  label="Email Address"
  placeholder="name@domain.com"
  value="${val}"
  leftIcon={<Mail size={16} />}
  ${hasError ? 'error="Please enter a valid email address."' : 'helperText="We will never share your email address."'}
/>`}
          >
            <div className="w-full max-w-sm">
              <Input
                label="Email Address"
                placeholder="name@domain.com"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                leftIcon={<Mail size={16} />}
                error={hasError ? "Please enter a valid email address." : undefined}
                helperText={!hasError ? "We will never share your email address." : undefined}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="examples" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)] bg-[var(--mf-surface)]">
            <Input label="Search docs" placeholder="Search..." leftIcon={<Search size={16} />} />
            <Input label="Master Password" type="password" placeholder="••••••••" leftIcon={<Lock size={16} />} />
            <Input label="Disabled state" disabled value="Read only token" />
            <Input label="Helper only" placeholder="Username" helperText="Alphanumeric characters only." />
          </div>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Props Reference</h2>
          <ComponentPropsTable props={meta.props} />
        </section>

        <ComponentPagination currentHref="/docs/components/input" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

### 7.6 Card Documentation Page (`src/app/docs/components/card/page.tsx`)

Create file: `src/app/docs/components/card/page.tsx`

```typescript
"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function CardDocPage() {
  const meta = COMPONENT_REGISTRY.card;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Layout" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <Card className="w-[340px]">
              <CardHeader>
                <CardTitle>Enterprise Analytics</CardTitle>
                <CardDescription>Real-time KPI telemetry and events.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[var(--mf-foreground-secondary)]">
                  Includes unlimited event streaming and custom dashboard metrics.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-[var(--mf-foreground-muted)]">Active tier</span>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/card" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

### 7.7 Badge Documentation Page (`src/app/docs/components/badge/page.tsx`)

Create file: `src/app/docs/components/badge/page.tsx`

```typescript
"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Badge } from "@/components/ui/badge";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPropsTable } from "@/components/docs/component-props-table";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function BadgeDocPage() {
  const meta = COMPONENT_REGISTRY.badge;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
    { id: "props", title: "Props Reference" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Feedback" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="default">Default Pill</Badge>
              <Badge variant="brand">Brand Highlight</Badge>
              <Badge variant="outline">Outline Border</Badge>
              <Badge variant="success">Completed</Badge>
              <Badge variant="warning">In Review</Badge>
              <Badge variant="destructive">Critical Error</Badge>
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <section id="props" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Props Reference</h2>
          <ComponentPropsTable props={meta.props} />
        </section>

        <ComponentPagination currentHref="/docs/components/badge" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

### 7.8 Dialog Documentation Page (`src/app/docs/components/dialog/page.tsx`)

Create file: `src/app/docs/components/dialog/page.tsx`

```typescript
"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function DialogDocPage() {
  const meta = COMPONENT_REGISTRY.dialog;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Modal Dialog" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <Dialog>
              <DialogTrigger>
                <Button>Open Modal Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Project Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this repository? This action is permanent and cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">Yes, Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/dialog" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

### 7.9 Tabs Documentation Page (`src/app/docs/components/tabs/page.tsx`)

Create file: `src/app/docs/components/tabs/page.tsx`

```typescript
"use client";

import { COMPONENT_REGISTRY } from "@/lib/docs/component-registry";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function TabsDocPage() {
  const meta = COMPONENT_REGISTRY.tabs;

  const tocItems = [
    { id: "interactive", title: "Live Example" },
    { id: "installation", title: "Installation" },
  ];

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader title={meta.title} description={meta.description} badge="Navigation" />

        <section id="interactive" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Live Example</h2>
          <ComponentPreview code={meta.examples[0].code}>
            <div className="w-full max-w-md">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="p-4 border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] text-xs text-[var(--mf-foreground-secondary)]">
                    Overview dashboard showing total requests, API health, and cluster latency.
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="p-4 border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] text-xs text-[var(--mf-foreground-secondary)]">
                    Telemetry metrics, uptime SLAs, and serverless invocations per region.
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="p-4 border border-[var(--mf-border)] rounded-[var(--mf-radius-md)] text-xs text-[var(--mf-foreground-secondary)]">
                    API token controls, webhooks, and team access credentials.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ComponentPreview>
        </section>

        <section id="installation" className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-[var(--mf-foreground)]">Installation</h2>
          <ComponentCode code={meta.importSnippet} language="tsx" />
          <p className="text-xs text-[var(--mf-foreground-secondary)] mt-2">Source file:</p>
          <ComponentCode code={meta.sourceCode} language="tsx" />
        </section>

        <ComponentPagination currentHref="/docs/components/tabs" />
      </div>
      <DocsTableOfContents items={tocItems} />
    </>
  );
}
```

---

## Step 8: Setup Instructions

When you are ready to apply these files to the codebase:

1. **Create the files**: Simply create the files listed above in the respective paths.
2. **Verify Types & Build**:
   ```bash
   npm run lint
   npm run build
   ```
3. **Optional Header Update**: If you wish for the main site navigation bar to link directly to `/docs` and `/docs/components`, update `src/components/layout/site-header.tsx` navigation array:
   ```typescript
   { label: "Components", href: "/docs/components", badge: null },
   { label: "Docs", href: "/docs", badge: null },
   ```
