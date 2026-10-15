// Defines the documentation tree and pagination order.

import { NavSection } from "@/types/docs";

export const DOCS_NAVIGATION: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs#installation", 
      },
      {
        title: "Design Tokens",
        href: "/docs#tokens"
      },
    ],
  },

  {
    title: "Components",
    items: [
      {
        title: "Overview",
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
    ],
  },
];

export const COMPONENT_PAGINATION_ORDER = [
  {
    title: "Overview",
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