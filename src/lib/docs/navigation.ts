// Defines the documentation tree and pagination order matching the shadcn/ui aesthetic

import { NavSection } from "@/types/docs";

export const DOCS_NAVIGATION: NavSection[] = [
  {
    title: "Sections",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Components",
        href: "/docs/components",
      },
      {
        title: "AI Elements",
        href: "/docs/ai-elements",
        badge: "New",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "Theming",
        href: "/docs/theming",
      },
      {
        title: "CLI",
        href: "/docs/cli",
      },
      {
        title: "Typeset",
        href: "/docs/typeset",
      },
      {
        title: "Skills",
        href: "/docs/skills",
        badge: "New",
      },
      {
        title: "Registry",
        href: "/docs/registry",
      },
      {
        title: "Changelog",
        href: "/docs/changelog",
      },
    ],
  },

  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        href: "/docs/components/accordion",
      },
      {
        title: "Alert",
        href: "/docs/components/alert",
      },
      {
        title: "Alert Dialog",
        href: "/docs/components/alert-dialog",
      },
      {
        title: "Aspect Ratio",
        href: "/docs/components/aspect-ratio",
      },
      {
        title: "Attachment",
        href: "/docs/components/attachment",
      },
      {
        title: "Avatar",
        href: "/docs/components/avatar",
      },
      {
        title: "Badge",
        href: "/docs/components/badge",
      },
      {
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
      },
      {
        title: "Bubble",
        href: "/docs/components/bubble",
      },
      {
        title: "Button",
        href: "/docs/components/button",
      },
      {
        title: "Button Group",
        href: "/docs/components/button-group",
      },
      {
        title: "Card",
        href: "/docs/components/card",
      },
      {
        title: "Dialog",
        href: "/docs/components/dialog",
      },
      {
        title: "Input",
        href: "/docs/components/input",
      },
      {
        title: "Tabs",
        href: "/docs/components/tabs",
      },
    ],
  },
];

export const COMPONENT_PAGINATION_ORDER = [
  {
    title: "Introduction",
    href: "/docs",
  },
  {
    title: "Installation",
    href: "/docs/installation",
  },
  {
    title: "Theming",
    href: "/docs/theming",
  },
  {
    title: "CLI",
    href: "/docs/cli",
  },
  {
    title: "Typeset",
    href: "/docs/typeset",
  },
  {
    title: "Skills",
    href: "/docs/skills",
  },
  {
    title: "Components Overview",
    href: "/docs/components",
  },
  {
    title: "Button",
    href: "/docs/components/button",
  },
  {
    title: "Input",
    href: "/docs/components/input",
  },
  {
    title: "Card",
    href: "/docs/components/card",
  },
  {
    title: "Badge",
    href: "/docs/components/badge",
  },
  {
    title: "Dialog",
    href: "/docs/components/dialog",
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
  },
];