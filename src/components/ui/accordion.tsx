"use client";

import * as React from "react";
import { ChevronDown, Plus, ArrowRight } from "lucide-react";

export type AccordionVariant = "bordered" | "cards" | "filled" | "minimal";
export type AccordionIndicator = "chevron" | "plus" | "arrow" | "none";

interface AccordionContextValue {
  expanded: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
  variant: AccordionVariant;
  indicator: AccordionIndicator;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion compound components must be used within an <Accordion />");
  }
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  variant?: AccordionVariant;
  indicator?: AccordionIndicator;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      variant = "bordered",
      indicator = "chevron",
      defaultValue,
      value: controlledValue,
      onValueChange,
      collapsible = true,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const initialExpanded = React.useMemo(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    }, [defaultValue]);

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(initialExpanded);
    const isControlled = controlledValue !== undefined;
    const currentExpanded = React.useMemo(() => {
      return isControlled
        ? Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue]
        : uncontrolledValue;
    }, [isControlled, controlledValue, uncontrolledValue]);

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        let next: string[];
        if (type === "single") {
          if (currentExpanded.includes(itemValue)) {
            next = collapsible ? [] : currentExpanded;
          } else {
            next = [itemValue];
          }
        } else {
          if (currentExpanded.includes(itemValue)) {
            next = currentExpanded.filter((v) => v !== itemValue);
          } else {
            next = [...currentExpanded, itemValue];
          }
        }

        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [type, collapsible, currentExpanded, isControlled, onValueChange]
    );

    const variantRootClasses = {
      bordered: "border border-border rounded-xl divide-y divide-border bg-card shadow-xs overflow-hidden",
      cards: "space-y-2.5 bg-transparent",
      filled: "bg-surface-secondary border border-border/80 rounded-xl divide-y divide-border/60 overflow-hidden",
      minimal: "divide-y divide-border/40 bg-transparent",
    };

    return (
      <AccordionContext.Provider
        value={{
          expanded: currentExpanded,
          toggleItem,
          type,
          variant,
          indicator,
        }}
      >
        <div
          ref={ref}
          className={`${variantRootClasses[variant]} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

// ─── ACCORDION ITEM ──────────────────────────────────────────────────────────

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled?: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className = "", children, ...props }, ref) => {
    const { expanded, variant } = useAccordion();
    const isOpen = expanded.includes(value);
    const id = React.useId();
    const triggerId = `accordion-trigger-${id}`;
    const contentId = `accordion-content-${id}`;

    const variantItemClasses = {
      bordered: "group transition-colors",
      cards: `rounded-xl border transition-all duration-200 bg-card overflow-hidden ${
        isOpen
          ? "border-primary/40 shadow-sm ring-1 ring-primary/20"
          : "border-border hover:border-border-strong hover:shadow-xs"
      }`,
      filled: "group transition-colors",
      minimal: "group py-0.5",
    };

    return (
      <AccordionItemContext.Provider
        value={{ value, isOpen, disabled, triggerId, contentId }}
      >
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={`${variantItemClasses[variant]} ${
            disabled ? "opacity-50 pointer-events-none" : ""
          } ${className}`}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

// ─── ACCORDION TRIGGER ───────────────────────────────────────────────────────

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (
    {
      className = "",
      children,
      icon,
      subtitle,
      badge,
      ...props
    },
    ref
  ) => {
    const { toggleItem, variant, indicator } = useAccordion();
    const itemContext = React.useContext(AccordionItemContext);

    if (!itemContext) {
      throw new Error("AccordionTrigger must be used within an <AccordionItem />");
    }

    const { value, isOpen, disabled, triggerId, contentId } = itemContext;

    const renderIndicator = () => {
      if (indicator === "none") return null;

      if (indicator === "plus") {
        return (
          <span
            className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-secondary text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${
              isOpen ? "rotate-45 text-primary bg-primary/10" : ""
            }`}
          >
            <Plus size={14} />
          </span>
        );
      }

      if (indicator === "arrow") {
        return (
          <span
            className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${
              isOpen ? "rotate-90 text-primary" : ""
            }`}
          >
            <ArrowRight size={14} />
          </span>
        );
      }

      // Default chevron
      return (
        <span
          className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground transition-transform duration-200 group-hover:text-foreground ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      );
    };

    const paddingClasses = {
      bordered: "px-5 py-4",
      cards: "px-5 py-4",
      filled: "px-5 py-3.5",
      minimal: "py-3.5 px-0",
    };

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => toggleItem(value)}
        className={`flex w-full items-center justify-between text-left text-sm font-semibold transition-all select-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 cursor-pointer ${
          paddingClasses[variant]
        } ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
          {icon && (
            <span
              className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-foreground border border-border/80 shadow-2xs transition-colors ${
                isOpen
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-surface-secondary text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {icon}
            </span>
          )}

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {children}
              </span>
              {badge && <span className="shrink-0">{badge}</span>}
            </div>

            {subtitle && (
              <span className="text-xs font-normal text-muted-foreground line-clamp-1 mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {renderIndicator()}
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

// ─── ACCORDION CONTENT ───────────────────────────────────────────────────────

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const { variant } = useAccordion();
    const itemContext = React.useContext(AccordionItemContext);

    if (!itemContext) {
      throw new Error("AccordionContent must be used within an <AccordionItem />");
    }

    const { isOpen, contentId, triggerId } = itemContext;

    const contentPadding = {
      bordered: "px-5 pb-5 pt-0",
      cards: "px-5 pb-5 pt-0",
      filled: "px-5 pb-4 pt-0",
      minimal: "pb-4 pt-0 px-0",
    };

    return (
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        className="grid transition-[grid-template-rows] duration-200 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden min-h-0">
          <div
            ref={ref}
            className={`text-sm text-foreground-secondary leading-relaxed ${contentPadding[variant]} ${className}`}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
