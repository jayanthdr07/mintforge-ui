"use client";

import * as React from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export type AccordionVariant =
  | "morph"
  | "minimal"
  | "outlined"
  | "nested"
  | "bordered"
  | "cards"
  | "filled";

export type AccordionIndicator = "chevron" | "plus" | "morph" | "arrow" | "none";
export type AccordionAnimation = "smooth" | "spring" | "none";

interface AccordionContextValue {
  expanded: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
  variant: AccordionVariant;
  indicator: AccordionIndicator;
  animation: AccordionAnimation;
  disabled?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export function useAccordion() {
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
  animation?: AccordionAnimation;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      variant = "morph",
      indicator = "chevron",
      animation = "smooth",
      defaultValue,
      value: controlledValue,
      onValueChange,
      collapsible = true,
      disabled = false,
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
          : controlledValue
          ? [controlledValue]
          : []
        : uncontrolledValue;
    }, [isControlled, controlledValue, uncontrolledValue]);

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        if (disabled) return;

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

        if (onValueChange) {
          if (type === "single") {
            (onValueChange as (val: string) => void)(next[0] || "");
          } else {
            (onValueChange as (val: string[]) => void)(next);
          }
        }
      },
      [disabled, type, currentExpanded, collapsible, isControlled, onValueChange]
    );

    const variantRootClasses: Record<AccordionVariant, string> = {
      morph: "mf-accordion-morph space-y-2.5",
      minimal: "mf-accordion-minimal divide-y divide-[#F1F4F9]",
      outlined: "mf-accordion-outlined space-y-3",
      nested: "mf-accordion-nested space-y-2",
      bordered: "border border-border rounded-xl divide-y divide-border bg-card shadow-xs overflow-hidden",
      cards: "space-y-2.5 bg-transparent",
      filled: "bg-surface-secondary border border-border/80 rounded-xl divide-y divide-border/60 overflow-hidden",
    };

    return (
      <AccordionContext.Provider
        value={{
          expanded: currentExpanded,
          toggleItem,
          type,
          variant,
          indicator,
          animation,
          disabled,
        }}
      >
        <div
          ref={ref}
          data-variant={variant}
          data-animation={animation}
          className={`${variantRootClasses[variant] || ""} ${className}`}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within an <AccordionItem />");
  }
  return context;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className = "", children, ...props }, ref) => {
    const { expanded, variant, disabled: rootDisabled } = useAccordion();
    const isOpen = expanded.includes(value);
    const isItemDisabled = Boolean(disabled || rootDisabled);
    const id = React.useId();
    const triggerId = `accordion-trigger-${id}`;
    const contentId = `accordion-content-${id}`;

    const variantItemClasses: Record<AccordionVariant, string> = {
      morph: `mf-morph-item rounded-xl border transition-all duration-200 bg-white ${
        isOpen
          ? "border-[#C7D2FE] shadow-[0_4px_16px_-2px_rgba(81,69,255,0.08)]"
          : "border-[#E5E7EB] hover:border-[#D1D5DB]"
      }`,
      minimal: "mf-minimal-item",
      outlined: `mf-outlined-item rounded-xl border transition-all duration-200 bg-white ${
        isOpen
          ? "border-[#C7D2FE] shadow-[0_2px_10px_rgba(81,69,255,0.06)]"
          : "border-[#E5E7EB] hover:border-[#D1D5DB]"
      }`,
      nested: "mf-nested-item",
      bordered: "group transition-colors",
      cards: `rounded-xl border transition-all duration-200 bg-card overflow-hidden ${
        isOpen
          ? "border-primary/40 shadow-sm ring-1 ring-primary/20"
          : "border-border hover:border-border-strong hover:shadow-xs"
      }`,
      filled: "group transition-colors",
    };

    return (
      <AccordionItemContext.Provider
        value={{ value, isOpen, disabled: isItemDisabled, triggerId, contentId }}
      >
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={isItemDisabled ? "" : undefined}
          className={`${variantItemClasses[variant] || ""} ${
            isItemDisabled ? "opacity-50 pointer-events-none" : ""
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

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  hideIndicator?: boolean;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (
    {
      className = "",
      children,
      icon,
      subtitle,
      badge,
      hideIndicator = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const { toggleItem, indicator } = useAccordion();
    const itemContext = React.useContext(AccordionItemContext);

    if (!itemContext) {
      throw new Error("AccordionTrigger must be used inside an <AccordionItem />");
    }

    const { value, isOpen, disabled, triggerId, contentId } = itemContext;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      toggleItem(value);
      onClick?.(e);
    };

    const renderIndicator = () => {
      if (hideIndicator || indicator === "none") return null;

      if (indicator === "morph") {
        return (
          <span
            className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ${
              isOpen
                ? "bg-[#EEF2FF] text-[#5145FF]"
                : "bg-[#F3F4F6] text-[#6B7280] group-hover:text-[#111827]"
            }`}
          >
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        );
      }

      if (indicator === "plus") {
        return (
          <span
            className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 ${
              isOpen
                ? "rotate-45 text-[#5145FF] bg-[#EEF2FF]"
                : "text-[#6B7280] bg-[#F3F4F6] group-hover:text-[#111827]"
            }`}
          >
            <Plus size={14} />
          </span>
        );
      }

      // Default chevron
      return (
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#5145FF]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"
          }`}
          aria-hidden="true"
        />
      );
    };

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={handleClick}
        className={`group flex w-full items-center justify-between font-medium outline-none cursor-pointer transition-colors select-none text-left ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3 min-w-0 pr-3">
          {icon && <span className="shrink-0">{icon}</span>}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827] group-hover:text-[#5145FF] transition-colors">
                {children}
              </span>
              {badge && <span className="shrink-0">{badge}</span>}
            </div>
            {subtitle && (
              <div className="text-xs text-[#6B7280] mt-0.5 truncate font-normal">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {renderIndicator()}
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * -----------------------------------------------------------------------------------------------*/

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const { animation } = useAccordion();
    const itemContext = React.useContext(AccordionItemContext);

    if (!itemContext) {
      throw new Error("AccordionContent must be used inside an <AccordionItem />");
    }

    const { isOpen, contentId, triggerId } = itemContext;

    const animationClasses: Record<AccordionAnimation, string> = {
      none: "transition-none",
      smooth: "transition-[grid-template-rows] duration-200 ease-out",
      spring: "transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.34,1.35,0.64,1)]",
    };

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        className={`grid motion-reduce:transition-none data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] ${
          animationClasses[animation] || animationClasses.smooth
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className={`text-sm text-[#4B5563] leading-relaxed ${className}`} {...props}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
