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

export interface TableOfContentItem  { 
  id: string;
  title: string;
  level: number;
}