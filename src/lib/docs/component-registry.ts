import { ComponentMeta } from "@/types/docs";

export const COMPONENT_REGISTRY: Record<string, ComponentMeta> = {
  button: {
    id: "button",
    title: "Button",
    description: "Interactive button primitive supporting multiple visual variants, sizing scales, loading spinners, and icon slots.",
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
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-md";

    const variantStyles = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring shadow-sm",
      secondary:
        "bg-secondary text-foreground hover:bg-surface-tertiary focus-visible:ring-border border border-border",
      outline:
        "bg-transparent text-foreground border border-border hover:bg-secondary focus-visible:ring-border",
      ghost:
        "bg-transparent text-foreground hover:bg-secondary focus-visible:ring-border",
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
      { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', defaultValue: '"default"', description: "Controls the visual styling and elevation." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls padding, line-height, and typography scale." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Renders an animated spinner and disables pointer events." },
      { name: "leftIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered immediately before the button label." },
      { name: "rightIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered immediately after the button label." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Standard disabled attribute; disables interaction." },
    ],
    examples: [
      {
        title: "Standard Action",
        code: `<Button>Deploy Application</Button>`,
      },
      {
        title: "Icon and State Combinations",
        code: `<div className="flex flex-wrap gap-3">
  <Button leftIcon={<Sparkles size={16} />}>Magic Action</Button>
  <Button variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</Button>
  <Button isLoading>Uploading</Button>
</div>`,
      },
    ],
  },

  input: {
    id: "input",
    title: "Input",
    description: "Accessible text input field with built-in label association, validation feedback, and icon accessory slots.",
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
            className="text-xs font-semibold text-foreground select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            className={\`w-full h-10 rounded-md border bg-background text-foreground px-3 text-sm placeholder:text-muted-foreground transition-colors outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:bg-muted disabled:cursor-not-allowed \${
              leftIcon ? "pl-9" : ""
            } \${rightIcon ? "pr-9" : ""} \${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-border hover:border-border-strong"
            } \${className}\`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";`,
    props: [
      { name: "label", type: "string", defaultValue: "undefined", description: "Accessible label automatically bound to the input via htmlFor." },
      { name: "error", type: "string", defaultValue: "undefined", description: "Validation error message with red border and aria-invalid=true." },
      { name: "helperText", type: "string", defaultValue: "undefined", description: "Informational text displayed beneath the input field." },
      { name: "leftIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Prefix icon embedded on the left side of the input." },
      { name: "rightIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Suffix icon or action embedded on the right side." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables focus and reduces opacity." },
    ],
    examples: [
      {
        title: "Standard Form Input",
        code: `<Input label="Account Email" placeholder="alex@mintforge.dev" />`,
      },
    ],
  },

  card: {
    id: "card",
    title: "Card",
    description: "Versatile surface container designed for grouping related information, media, and interactive controls.",
    category: "Layout",
    status: "Ready",
    dependencies: [],
    importSnippet: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";`,
    sourceCode: `import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={\`rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md \${className}\`}
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
      className={\`text-lg font-semibold leading-none tracking-tight text-card-foreground \${className}\`}
      {...props}
    />
  );
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={\`text-sm text-muted-foreground \${className}\`}
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
      className={\`flex items-center p-6 pt-0 border-t border-border mt-4 \${className}\`}
      {...props}
    />
  );
}`,
    props: [
      { name: "className", type: "string", defaultValue: '""', description: "Custom classes applied to the root card container." },
      { name: "children", type: "React.ReactNode", defaultValue: "undefined", description: "Child components (CardHeader, CardContent, etc.)." },
    ],
    examples: [
      {
        title: "Product Card",
        code: `<Card className="w-90">
  <CardHeader>
    <CardTitle>Enterprise Analytics</CardTitle>
    <CardDescription>Real-time KPI metrics and telemetry alerts.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Includes unlimited event streaming and custom dashboard widgets.</p>
  </CardContent>
  <CardFooter className="justify-between">
    <span className="text-xs text-muted-foreground">Active Plan</span>
    <Button size="sm">Manage</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },

  badge: {
    id: "badge",
    title: "Badge",
    description: "Compact status indicator, count pill, and metadata chip supporting solid, soft, outline, and ghost appearances.",
    category: "Feedback",
    status: "Ready",
    dependencies: [],
    importSnippet: `import { Badge, BadgeDot, BadgeCount } from "@/components/ui/badge";`,
    sourceCode: `export { Badge, BadgeDot, BadgeCount } from "@/components/ui/badge";`,
    props: [
      { name: "appearance", type: '"solid" | "soft" | "outline" | "ghost"', defaultValue: '"soft"', description: "Visual styling container treatment." },
      { name: "variant", type: '"default" | "brand" | "primary" | "info" | "success" | "warning" | "destructive" | "neutral" | "lavender"', defaultValue: '"default"', description: "Semantic color intent." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg"', defaultValue: '"md"', description: "Dimensions and typography scale." },
      { name: "shape", type: '"pill" | "rounded" | "square"', defaultValue: '"pill"', description: "Border radius profile." },
    ],
    examples: [
      {
        title: "Status Badge with Indicator Dot",
        code: `<Badge appearance="soft" variant="success" leadingIcon={<BadgeDot status="active" ping />}>
  Active
</Badge>`,
      },
    ],
  },

  dialog: {
    id: "dialog",
    title: "Dialog / Modal",
    description: "Overlay window for critical user workflows, confirmations, and focus-trapped tasks.",
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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={\`relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-2xl text-card-foreground \${className}\`}
      >
        <button
          onClick={() => ctx.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-foreground"
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
  return <h2 className={\`text-lg font-semibold text-foreground \${className}\`} {...props} />;
}

export function DialogDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={\`text-sm text-muted-foreground \${className}\`} {...props} />;
}

export function DialogFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={\`flex flex-wrap justify-end gap-2 mt-6 \${className}\`} {...props} />;
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
}`,
    props: [
      { name: "open", type: "boolean", defaultValue: "undefined", description: "Controlled open state of the dialog." },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback triggered upon open state transition." },
    ],
    examples: [
      {
        title: "Confirmation Dialog",
        code: `<Dialog>
  <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Confirmation</DialogTitle></DialogHeader>
    <p className="text-sm">Are you sure?</p>
  </DialogContent>
</Dialog>`,
      },
    ],
  },

  tabs: {
    id: "tabs",
    title: "Tabs",
    description: "Layered interface component for switching between multiple distinct views or content panes.",
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
      className={\`inline-flex items-center gap-1 p-1 bg-muted border border-border rounded-md self-start \${className}\`}
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
      className={\`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer \${
        isSelected
          ? "bg-card text-foreground shadow-sm font-semibold"
          : "text-muted-foreground hover:text-foreground"
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
      { name: "defaultValue", type: "string", defaultValue: '""', description: "Initial active tab identifier." },
      { name: "value", type: "string", defaultValue: "undefined", description: "Controlled active tab key." },
      { name: "onValueChange", type: "(val: string) => void", defaultValue: "undefined", description: "Handler fired when active tab changes." },
    ],
    examples: [
      {
        title: "Standard Tabs",
        code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
      },
    ],
  },

  accordion: {
    id: "accordion",
    title: "Accordion",
    description: "Vertically stacked interactive disclosure headings with multiple visual styles (Morph, Minimal, Outlined, Nested), spring animations, and WAI-ARIA disclosure pattern.",
    category: "Primitives",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n  AccordionMorph,\n  AccordionMinimal,\n  AccordionOutlined,\n  AccordionNested,\n} from "@/components/ui/accordion";`,
    sourceCode: `export * from "@/components/ui/accordion";`,
    props: [
      { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Controls single or multiple expanded items." },
      { name: "variant", type: '"morph" | "minimal" | "outlined" | "nested" | "bordered" | "cards"', defaultValue: '"morph"', description: "Visual variant style." },
      { name: "animation", type: '"smooth" | "spring" | "none"', defaultValue: '"smooth"', description: "Expand/collapse transition curve." },
      { name: "indicator", type: '"chevron" | "plus" | "morph" | "none"', defaultValue: '"chevron"', description: "Trigger indicator icon style." },
      { name: "collapsible", type: "boolean", defaultValue: "true", description: "Allow collapsing open item in single mode." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction across items." },
    ],
    examples: [
      {
        title: "Signature Morph Accordion",
        code: `<AccordionMorph defaultValue="item-1" />`,
      },
      {
        title: "Clean Minimal Accordion",
        code: `<AccordionMinimal defaultValue="item-1" />`,
      },
      {
        title: "Outlined Accordion",
        code: `<AccordionOutlined defaultValue="item-1" />`,
      },
      {
        title: "Nested Tree Accordion",
        code: `<AccordionNested defaultValue="parent-doc" />`,
      },
    ],
  },

  alert: {
    id: "alert",
    title: "Alert",
    description: "Contextual feedback banner with signature morph glow, enterprise accent rail, floating glass, and semantic palettes.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert";`,
    sourceCode: `export { Alert, AlertTitle, AlertDescription, AlertAction, AlertMorph, AlertRail, AlertFloating, AlertSolid } from "@/components/ui/alert";`,
    props: [
      { name: "status", type: '"brand" | "info" | "success" | "warning" | "destructive" | "neutral"', defaultValue: '"brand"', description: "Semantic color palette and default icon theme for the alert banner." },
      { name: "design", type: '"morph" | "rail" | "floating" | "subtle" | "solid" | "outline" | "card"', defaultValue: '"morph"', description: "Visual structural treatment. 'morph' renders Mintforge's signature card with soft ambient glow." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls internal padding, icon scale, and font sizes across the banner." },
      { name: "title", type: "React.ReactNode", defaultValue: "undefined", description: "Primary alert title heading displayed at the top." },
      { name: "description", type: "React.ReactNode", defaultValue: "undefined", description: "Informative body copy rendered underneath the title heading." },
      { name: "action", type: "React.ReactNode", defaultValue: "undefined", description: "Right-aligned accessory slot for interactive action buttons or recovery links." },
      { name: "onClose", type: "() => void", defaultValue: "undefined", description: "Callback invoked upon dismissal. When provided, renders an accessible close button." },
    ],
    examples: [
      {
        title: "Signature Morph Alert",
        code: `<Alert
  status="brand"
  design="morph"
  title="Design System v0.1.2 Released"
  description="New token synchronizers and zero-drift contract verification."
  action={<Button size="sm">View Changelog</Button>}
  onClose={() => console.log("dismissed")}
/>`,
      },
      {
        title: "Accent Rail Alert",
        code: `<Alert
  status="warning"
  design="rail"
  title="Storage Approaching Threshold"
  description="Current cluster storage utilization is at 88%. Auto-expansion enabled."
  onClose={() => console.log("dismissed")}
/>`,
      },
    ],
  },

  "alert-dialog": {
    id: "alert-dialog",
    title: "Alert Dialog",
    description: "Accessible modal confirmation dialog with 5 custom designs (Confirm, Destructive with scooped notch, Form, Success, and Detail), focus trap, and customizable appearance.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, AlertDialogConfirm, AlertDialogDestructive, AlertDialogForm, AlertDialogSuccess, AlertDialogDetail } from "@/components/ui/alert-dialog";`,
    sourceCode: `export * from "@/components/ui/alert-dialog";`,
    props: [
      { name: "open", type: "boolean", defaultValue: "undefined", description: "Controlled open state of the dialog." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Width scale of the modal dialog." },
      { name: "appearance", type: '"standard" | "tinted" | "bordered"', defaultValue: '"standard"', description: "Surface aesthetic styling." },
      { name: "closeOnEscape", type: "boolean", defaultValue: "true", description: "Dismiss modal on Escape key press." },
      { name: "closeOnOverlayClick", type: "boolean", defaultValue: "true", description: "Dismiss modal when clicking outside on backdrop." },
    ],
    examples: [
      {
        title: "Confirm Dialog",
        code: `<AlertDialogConfirm />`,
      },
      {
        title: "Destructive Scooped Notch Dialog",
        code: `<AlertDialogDestructive />`,
      },
    ],
  },

  avatar: {
    id: "avatar",
    title: "Avatar",
    description: "Visual user representation primitive supporting image thumbnails, fallback initials, multiple shapes, active presence status indicators, and avatar groups.",
    category: "Primitives",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar";`,
    sourceCode: `export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup } from "@/components/ui/avatar";`,
    props: [
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', defaultValue: '"md"', description: "Controls avatar dimensions, fallback typography scale, and badge offsets." },
      { name: "shape", type: '"circle" | "rounded" | "square" | "squircle"', defaultValue: '"circle"', description: "Mask shape applied to container and image." },
      { name: "ringColor", type: "string", defaultValue: "undefined", description: "Tailwind ring class for highlights or group borders." },
    ],
    examples: [
      {
        title: "User Avatar with Status",
        code: `<Avatar size="lg">
  <AvatarImage src="/avatar.png" alt="Sarah" />
  <AvatarFallback initials="SC" />
  <AvatarBadge status="online" />
</Avatar>`,
      },
      {
        title: "Avatar Group",
        code: `<div className="inline-flex items-center -space-x-3">
  <Avatar size="lg" className="ring-2 ring-blue-500 ring-offset-2"><AvatarImage src="/p1.jpg" /></Avatar>
  <Avatar size="lg" className="ring-2 ring-emerald-500 ring-offset-2"><AvatarImage src="/p2.jpg" /></Avatar>
  <div className="w-12 h-12 rounded-full font-mono text-sm bg-slate-100 flex items-center justify-center">+4</div>
</div>`,
      },
    ],
  },

  "seam-status": {
    id: "seam-status",
    title: "Seam Status",
    description: "Contract-aware developer badge and live modal displaying real-time frontend to FastAPI contract health.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { SeamStatus } from "@/components/ui/seam-status";`,
    sourceCode: `export { SeamStatus } from "@/components/ui/seam-status";`,
    props: [
      { name: "variant", type: '"pill" | "banner" | "card"', defaultValue: '"pill"', description: "Visual display mode." },
      { name: "endpoint", type: "SeamContractEndpoint", defaultValue: "auto", description: "Single endpoint contract details." },
      { name: "showInspectorOnClick", type: "boolean", defaultValue: "true", description: "Opens interactive inspector modal on click." },
    ],
    examples: [
      {
        title: "Contract Dev Pill",
        code: `<SeamStatus variant="pill" />`,
      },
    ],
  },


  bubble: {
    id: "bubble",
    title: "Bubble",
    description: "Conversational message bubble primitive supporting 7 visual surface variants, alignment, grouping, reactions, action buttons, collapsible content, and AI reasoning drawers.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { Bubble, BubbleContent, BubbleGroup, BubbleReactions, BubbleCollapsible, BubbleThinking } from "@/components/ui/bubble";`,
    sourceCode: `export { Bubble, BubbleContent, BubbleGroup, BubbleReactions, BubbleCollapsible, BubbleThinking } from "@/components/ui/bubble";`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"', defaultValue: '"default"', description: "Visual surface style." },
      { name: "align", type: '"start" | "end"', defaultValue: '"start"', description: "Horizontal layout alignment." },
      { name: "role", type: '"user" | "assistant" | "system"', defaultValue: "undefined", description: "Conversational role automatically configuring alignment and avatar." },
      { name: "isStreaming", type: "boolean", defaultValue: "false", description: "Displays animated streaming pulse cursor." },
    ],
    examples: [
      {
        title: "Conversational Bubble",
        code: `<Bubble variant="default" align="end">
  <BubbleContent>Can you check our frontend payload?</BubbleContent>
</Bubble>`,
      },
      {
        title: "Bubble with Reactions",
        code: `<Bubble variant="muted" align="start">
  <BubbleContent>Tests passed on the first run!</BubbleContent>
  <BubbleReactions side="bottom" align="end">
    <span>👍</span><span>🎉</span>
  </BubbleReactions>
</Bubble>`,
      },
    ],
  },

  attachment: {
    id: "attachment",
    title: "Attachment",
    description: "Display files, images, and upload activity with thoughtful previews, clear metadata, progress states, and intuitive actions.",
    category: "Primitives",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentProgress,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
  AttachmentGroup,
  AttachmentFileCard,
  AttachmentImagePreview,
  AttachmentUploadProgress,
} from "@/components/ui/attachment";`,
    sourceCode: `export * from "@/components/ui/attachment";`,
    props: [
      { name: "state", type: '"idle" | "uploading" | "processing" | "error" | "done"', defaultValue: '"idle"', description: "Lifecycle state of the attachment card." },
      { name: "size", type: '"default" | "sm" | "xs"', defaultValue: '"default"', description: "Controls internal padding, thumbnail scale, and font sizes." },
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Layout alignment (horizontal row or vertical card)." },
      { name: "category", type: '"document" | "image" | "code" | "archive" | "audio" | "video" | "data" | "file"', defaultValue: '"file"', description: "Semantic category for file iconography." },
    ],
    examples: [
      {
        title: "File Attachment Card",
        code: `<Attachment state="done" size="default">
  <AttachmentMedia category="document" alt="specs.pdf" />
  <AttachmentContent>
    <AttachmentTitle>specs.pdf</AttachmentTitle>
    <AttachmentDescription>2.4 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`,
      },
      {
        title: "Upload Progress Card",
        code: `<AttachmentUploadProgress name="design-system.zip" size={14800000} initialProgress={64} />`,
      },
    ],
  },

  "seam-form": {
    id: "seam-form",
    title: "Seam Form",
    description: "Contract-aware form wrapper that detects casing drift and missing fields between frontend inputs and FastAPI models in real time.",
    category: "Feedback",
    status: "Ready",
    dependencies: ["lucide-react"],
    importSnippet: `import { SeamForm, SeamFormField } from "@/components/ui/seam-form";`,
    sourceCode: `export { SeamForm, SeamFormField } from "@/components/ui/seam-form";`,
    props: [
      { name: "endpoint", type: "string", defaultValue: "required", description: "Target backend API endpoint path." },
      { name: "method", type: '"GET" | "POST" | "PUT" | "PATCH" | "DELETE"', defaultValue: '"POST"', description: "HTTP method." },
      { name: "backendModel", type: "string", defaultValue: "undefined", description: "Target Pydantic / OpenAPI schema model." },
      { name: "expectedFields", type: "string[]", defaultValue: "[]", description: "Backend expected field names." },
    ],
    examples: [
      {
        title: "FastAPI-Backed Contact Form",
        code: `<SeamForm
  endpoint="/api/v1/users/register"
  method="POST"
  backendModel="UserRegisterRequest"
  expectedFields={["user_name", "email_address"]}
>
  <SeamFormField name="user_name" label="Username" required>
    <Input placeholder="sarah_dev" />
  </SeamFormField>
  <Button type="submit">Register</Button>
</SeamForm>`,
      },
    ],
  },
};