"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  ChevronLeft,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LayoutGrid,
  List,
  Search,
  Filter,
  ChevronDown,
  Check,
  Download,
  Share2,
  FileSpreadsheet,
  FileText,
  Copy,
  Printer,
} from "lucide-react";

/* -------------------------------------------------------------------------------------------------
 * 1. Basic Button Groups (Two, Three, and Four Connected Buttons)
 * -----------------------------------------------------------------------------------------------*/
export function BasicButtonGroupCard() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<"day" | "week" | "month">("week");
  const [activeStep, setActiveStep] = React.useState<"prev" | "current" | "next">("current");

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Basic Button Group
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Connected Primitives
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Connect two, three, or four buttons into a single cohesive action element with automatically collapsed shared borders.
        </p>

        <div className="space-y-4">
          {/* Two Buttons: Cancel / Save */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Two Buttons (Action Pair)
            </span>
            <ButtonGroup orientation="horizontal">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="default" size="sm">
                Save Changes
              </Button>
            </ButtonGroup>
          </div>

          {/* Three Buttons: Segmented Selection */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Three Buttons (Segmented Filter)
            </span>
            <ButtonGroup orientation="horizontal" aria-label="Timeframe filter">
              <Button
                variant={selectedTimeframe === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("day")}
                aria-pressed={selectedTimeframe === "day"}
              >
                Day
              </Button>
              <Button
                variant={selectedTimeframe === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("week")}
                aria-pressed={selectedTimeframe === "week"}
              >
                Week
              </Button>
              <Button
                variant={selectedTimeframe === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("month")}
                aria-pressed={selectedTimeframe === "month"}
              >
                Month
              </Button>
            </ButtonGroup>
          </div>

          {/* Four Buttons: Pagination Workflow */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Four Buttons (Workflow Navigation)
            </span>
            <ButtonGroup orientation="horizontal" size="sm">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep("prev")}
              >
                Back
              </Button>
              <Button
                variant={activeStep === "current" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setActiveStep("current")}
              >
                Step 2 of 4
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveStep("next")}
              >
                Save Draft
              </Button>
              <Button variant="default" size="sm">
                Continue
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Automatic corner radius isolation (`rounded-l-none`, `rounded-r-none`).
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 2. Orientation (Horizontal vs. Vertical Groups)
 * -----------------------------------------------------------------------------------------------*/
export function OrientationCard() {
  const [verticalSelected, setVerticalSelected] = React.useState("analytics");

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Orientation Options
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#5145FF]">
            Vertical &amp; Horizontal
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-4">
          Support both horizontal rows and vertical stacks. Vertical groups align widths and handle top/bottom corners.
        </p>

        <div className="space-y-4">
          {/* Horizontal Orientation Box */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-700">
                Horizontal Row
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#5145FF]">
                orientation=&quot;horizontal&quot;
              </span>
            </div>
            <div className="overflow-x-auto pb-1">
              <ButtonGroup orientation="horizontal" size="sm">
                <Button variant="outline">Overview</Button>
                <Button variant="outline">Activity</Button>
                <Button variant="outline">Settings</Button>
              </ButtonGroup>
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-2">
              Collapses horizontal borders with <code className="text-[#5145FF] font-mono">-space-x-px</code>.
            </p>
          </div>

          {/* Vertical Orientation Box */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-700">
                Vertical Stack
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#5145FF]">
                orientation=&quot;vertical&quot;
              </span>
            </div>
            <ButtonGroup orientation="vertical" size="sm" className="w-full max-w-[200px]">
              <Button
                variant={verticalSelected === "analytics" ? "secondary" : "outline"}
                className="justify-start text-left"
                onClick={() => setVerticalSelected("analytics")}
              >
                Analytics
              </Button>
              <Button
                variant={verticalSelected === "deployments" ? "secondary" : "outline"}
                className="justify-start text-left"
                onClick={() => setVerticalSelected("deployments")}
              >
                Deployments
              </Button>
              <Button
                variant={verticalSelected === "billing" ? "secondary" : "outline"}
                className="justify-start text-left"
                onClick={() => setVerticalSelected("billing")}
              >
                Billing
              </Button>
            </ButtonGroup>
            <p className="text-[11px] text-[#94A3B8] mt-2">
              Collapses vertical borders with <code className="text-[#5145FF] font-mono">-space-y-px</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Vertical groups maintain full boundary width alignment.
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 3. Variant Combinations & Ghost Toolbars
 * -----------------------------------------------------------------------------------------------*/
export function VariantCombinationsCard() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Variant Combinations
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Design Tokens
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Mix and match button variants inside groups—outline, secondary, ghost toolbars, or hybrid primary actions.
        </p>

        <div className="space-y-4">
          {/* Secondary Action Cluster */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Secondary Action Cluster
            </span>
            <ButtonGroup orientation="horizontal" size="sm">
              <Button variant="secondary">Copy Code</Button>
              <Button variant="secondary">Share Link</Button>
              <Button variant="secondary">Embed</Button>
            </ButtonGroup>
          </div>

          {/* Ghost Toolbar */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Ghost Toolbar Group
            </span>
            <ButtonGroup orientation="horizontal" size="sm">
              <Button variant="ghost" leftIcon={<Copy size={13} />}>
                Copy
              </Button>
              <Button variant="ghost" leftIcon={<Printer size={13} />}>
                Print
              </Button>
              <Button variant="ghost" leftIcon={<Share2 size={13} />}>
                Share
              </Button>
            </ButtonGroup>
          </div>

          {/* Hybrid Primary + Secondary */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Primary Action + Supporting Option
            </span>
            <ButtonGroup orientation="horizontal" size="sm">
              <Button variant="default">
                Publish Release
              </Button>
              <Button variant="outline">
                Draft Options
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Inherits existing Button elevation without conflicting border styles.
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 4. Icon Button Groups (Accessible Text Formatting & Alignment)
 * -----------------------------------------------------------------------------------------------*/
export function IconButtonGroupCard() {
  const [activeFormats, setActiveFormats] = React.useState<Record<string, boolean>>({
    bold: true,
    italic: false,
    underline: false,
    strike: false,
  });

  const [align, setAlign] = React.useState<"left" | "center" | "right" | "justify">("left");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const toggleFormat = (key: string) => {
    setActiveFormats((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Icon Button Groups
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            WAI-ARIA Compliant
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Compact controls for text formatting, alignment, and view toggling with explicit `aria-label` and `aria-pressed` states.
        </p>

        <div className="space-y-4">
          {/* Rich Text Formatting Toolbar */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Rich Text Formatting (`aria-pressed`)
            </span>
            <ButtonGroup orientation="horizontal" size="sm" aria-label="Text formatting">
              <Button
                variant={activeFormats.bold ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("bold")}
                aria-label="Format Bold"
                aria-pressed={activeFormats.bold}
              >
                <Bold size={14} />
              </Button>
              <Button
                variant={activeFormats.italic ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("italic")}
                aria-label="Format Italic"
                aria-pressed={activeFormats.italic}
              >
                <Italic size={14} />
              </Button>
              <Button
                variant={activeFormats.underline ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("underline")}
                aria-label="Format Underline"
                aria-pressed={activeFormats.underline}
              >
                <Underline size={14} />
              </Button>
              <Button
                variant={activeFormats.strike ? "secondary" : "outline"}
                size="icon"
                onClick={() => toggleFormat("strike")}
                aria-label="Format Strikethrough"
                aria-pressed={activeFormats.strike}
              >
                <Strikethrough size={14} />
              </Button>
            </ButtonGroup>
          </div>

          {/* Text Alignment Radio Cluster */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Text Alignment Selection
            </span>
            <ButtonGroup orientation="horizontal" size="sm" aria-label="Text alignment">
              <Button
                variant={align === "left" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlign("left")}
                aria-label="Align Left"
                aria-pressed={align === "left"}
              >
                <AlignLeft size={14} />
              </Button>
              <Button
                variant={align === "center" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlign("center")}
                aria-label="Align Center"
                aria-pressed={align === "center"}
              >
                <AlignCenter size={14} />
              </Button>
              <Button
                variant={align === "right" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlign("right")}
                aria-label="Align Right"
                aria-pressed={align === "right"}
              >
                <AlignRight size={14} />
              </Button>
              <Button
                variant={align === "justify" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlign("justify")}
                aria-label="Align Justify"
                aria-pressed={align === "justify"}
              >
                <AlignJustify size={14} />
              </Button>
            </ButtonGroup>
          </div>

          {/* View Mode & Zoom Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                View Mode
              </span>
              <ButtonGroup orientation="horizontal" size="sm">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid size={14} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  aria-pressed={viewMode === "list"}
                >
                  <List size={14} />
                </Button>
              </ButtonGroup>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                Zoom Canvas
              </span>
              <ButtonGroup orientation="horizontal" size="sm">
                <Button variant="outline" size="icon" aria-label="Zoom in">
                  <ZoomIn size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Reset zoom">
                  <RotateCcw size={13} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Zoom out">
                  <ZoomOut size={14} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Every icon button includes screen-reader accessible names and pressed states.
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 5. Group Separators & Nested Clusters
 * -----------------------------------------------------------------------------------------------*/
export function SeparatorsAndNestedCard() {
  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Separators &amp; Nested Clusters
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Visual Clarity
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Use `ButtonGroupSeparator` to subdivide functional clusters in toolbars without adding heavy wrappers.
        </p>

        <div className="space-y-4">
          {/* Editor Toolbar with Separators */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Full Editor Toolbar with Functional Separators
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block overflow-x-auto max-w-full">
              <ButtonGroup orientation="horizontal" size="sm" role="toolbar" aria-label="Document tools">
                {/* Cluster 1: History */}
                <Button variant="outline" size="icon" aria-label="Undo">
                  <RotateCcw size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Redo">
                  <RotateCcw size={14} className="-scale-x-100" />
                </Button>

                {/* Separator 1 */}
                <ButtonGroupSeparator />

                {/* Cluster 2: Formatting */}
                <Button variant="outline" size="icon" aria-label="Bold">
                  <Bold size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Italic">
                  <Italic size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Underline">
                  <Underline size={14} />
                </Button>

                {/* Separator 2 */}
                <ButtonGroupSeparator />

                {/* Cluster 3: Alignment */}
                <Button variant="outline" size="icon" aria-label="Align left">
                  <AlignLeft size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Align center">
                  <AlignCenter size={14} />
                </Button>
                <Button variant="outline" size="icon" aria-label="Align right">
                  <AlignRight size={14} />
                </Button>

                {/* Separator 3 */}
                <ButtonGroupSeparator />

                {/* Cluster 4: Action */}
                <Button variant="default" size="sm">
                  Export
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Pagination Navigation */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Pagination Control with Text Counter
            </span>
            <ButtonGroup orientation="horizontal" size="sm">
              <Button variant="outline" size="icon" aria-label="Previous page">
                <ChevronLeft size={14} />
              </Button>
              <ButtonGroupText>Page 3 of 12</ButtonGroupText>
              <Button variant="outline" size="icon" aria-label="Next page">
                <ChevronRight size={14} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Separators preserve button heights and remain purely visual (`role=&quot;separator&quot;`).
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 6. Split Button Pattern with Independent Dropdown Trigger
 * -----------------------------------------------------------------------------------------------*/
export function SplitButtonCard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFormat, setSelectedFormat] = React.useState("PDF Document (.pdf)");
  const [downloading, setDownloading] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Split Button Pattern
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F2F0FF] text-[#5145FF] border border-[#E0DAFF]">
            Interactive Menu
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          A primary default action paired with a secondary chevron menu trigger. Both operate completely independently.
        </p>

        <div className="space-y-4">
          <div ref={dropdownRef} className="relative inline-block text-left">
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Export Report (Split Button)
            </span>
            <ButtonGroup orientation="horizontal" size="default">
              <Button
                variant="default"
                isLoading={downloading}
                onClick={handleDownload}
                leftIcon={<Download size={14} />}
              >
                {downloading ? "Exporting..." : `Export ${selectedFormat.split(" ")[0]}`}
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="Select export format options"
                className="px-2 border-l border-white/20"
              >
                <ChevronDown size={14} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </Button>
            </ButtonGroup>

            {/* Dropdown Menu popover */}
            {isOpen && (
              <div
                className="mf-dropdown-animate absolute left-0 top-full mt-2 w-64 rounded-xl bg-white border border-[#E5E7EB] shadow-lg py-1.5 z-40"
                role="menu"
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Select Export Format
                </div>
                {[
                  { label: "PDF Document (.pdf)", icon: FileText },
                  { label: "Excel Spreadsheet (.xlsx)", icon: FileSpreadsheet },
                  { label: "CSV Delimited (.csv)", icon: Download },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedFormat(item.label);
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-xs text-[#111827] hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={14} className="text-[#5145FF]" />
                        {item.label}
                      </span>
                      {selectedFormat === item.label && (
                        <Check size={14} className="text-[#5145FF]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Separates the main click action from the secondary options menu.
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * 7. Button Groups With Other Controls (Attached Input & Controls)
 * -----------------------------------------------------------------------------------------------*/
export function ControlsCompositionCard() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="mf-showcase-card h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-[#111827]">
            Composition With Other Controls
          </h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Form Accessories
          </span>
        </div>
        <p className="text-xs text-[#64748B] mb-5">
          Connect buttons directly alongside text inputs, dropdown triggers, and prefix badges for clean search and filter forms.
        </p>

        <div className="space-y-4">
          {/* Input with Attached Button Group */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Search Input with Attached Filter &amp; Action
            </span>
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search repository..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 h-9 rounded-l-lg border border-r-0 border-[#E5E7EB] bg-white px-3 text-xs text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#5145FF] focus:z-10"
              />
              <ButtonGroup orientation="horizontal" size="default" className="shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-none border-[#E5E7EB] h-9 w-9"
                  aria-label="Filter results"
                >
                  <Filter size={13} />
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="rounded-l-none h-9"
                  leftIcon={<Search size={13} />}
                >
                  Search
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Quick Filter Shortcuts */}
          <div>
            <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
              Quick Filter Shortcuts
            </span>
            <div className="overflow-x-auto pb-1">
              <ButtonGroup orientation="horizontal" size="sm">
                <Button variant="outline">Today</Button>
                <Button variant="outline">7D</Button>
                <Button variant="secondary">30D</Button>
                <Button variant="outline">YTD</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1F5F9] mt-5">
        <span className="text-[11px] text-[#94A3B8]">
          Zero visual gap between input boundary and attached button triggers.
        </span>
      </div>
    </div>
  );
}
