export type ShellVariant = "standard" | "floating" | "compact" | "zen";
export type ColorMode = "light" | "dark";

export const PRODUCT_NAME = "DigitalOcean";
export const PRODUCT_LABEL = "DigitalOcean Control Panel";

// Single mobile breakpoint used across the shell, panels, and pages.
// Below this width, the chrome restructures: sidebar hides behind a
// hamburger drawer, header drops to icon-only actions, and side panels
// open as full-screen sheets.
export const MOBILE_MAX = 768;
export const MOBILE_MEDIA = `(max-width: ${MOBILE_MAX}px)`;
export const MOBILE_DRAWER_WIDTH = 284;

export interface ShellDims {
  sidebarCollapsed: number;
  sidebarOpen: number;
  headerHeight: number;
  borderRadius: number;
  gap: number;
  headerBg: string;
  sidebarBg: string;
  contentBg: string;
  surfaceBg: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  createBg: string;
  createHover: string;
  mint: string;
  mintSoft: string;
  mintInk: string;
}

// Variant defines LAYOUT only — sizes, radius, gap, plus two flags that
// describe how the chrome relates to the canvas. Color belongs to ColorMode.
export interface ShellLayout {
  sidebarCollapsed: number;
  sidebarOpen: number;
  headerHeight: number;
  borderRadius: number;
  gap: number;
  // Chrome floats on a contrasting canvas (Floating).
  detached: boolean;
  // Header uses the accent color as its background (Zen).
  headerStyle: "surface" | "accent";
}

export const shellVariants: Record<
  ShellVariant,
  { name: string; description: string; layout: ShellLayout }
> = {
  standard: {
    name: "Standard",
    description:
      "The production-ready flat UI shell with precise, functional chrome.",
    layout: {
      sidebarCollapsed: 52,
      sidebarOpen: 206,
      headerHeight: 52,
      borderRadius: 0,
      gap: 0,
      detached: false,
      headerStyle: "surface",
    },
  },
  floating: {
    name: "Floating",
    description:
      "Detached panels on a contrasting canvas. Rounded, modern, Linear-inspired.",
    layout: {
      sidebarCollapsed: 52,
      sidebarOpen: 206,
      headerHeight: 52,
      borderRadius: 12,
      gap: 8,
      detached: true,
      headerStyle: "surface",
    },
  },
  compact: {
    name: "Compact",
    description:
      "Maximum density. Same flat aesthetic, tighter spacing, smaller chrome.",
    layout: {
      sidebarCollapsed: 42,
      sidebarOpen: 168,
      headerHeight: 34,
      borderRadius: 0,
      gap: 0,
      detached: false,
      headerStyle: "surface",
    },
  },
  zen: {
    name: "Zen",
    description:
      "Calm, spacious. Branded header bar, full-width content. Nav and chat push, never cover.",
    layout: {
      sidebarCollapsed: 52,
      sidebarOpen: 240,
      headerHeight: 52,
      borderRadius: 0,
      gap: 0,
      detached: false,
      headerStyle: "accent",
    },
  },
};

// ColorPalette is the complete set of colors used by the shell. Every value
// here applies in every variant — variants only change layout/sizing/flags.
//
// `mint` and `mintSoft` are inspired by the DO Next vision case study —
// used for confidence pills, AI-handled / completed states, and the
// "Run a test simulation" secondary CTA.
export interface ColorPalette {
  name: string;
  description: string;
  bg: string;            // page background when not detached
  canvas: string;        // contrasting backdrop when detached (Floating)
  surface: string;       // panels, cards, sidebar, header
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  accentHover: string;
  createBg: string;
  createHover: string;
  mint: string;
  mintSoft: string;
  mintInk: string;       // text on mint backgrounds
}

export const colorModes: Record<ColorMode, ColorPalette> = {
  light: {
    name: "Light",
    description: "Pure white canvas, signature blue accents. The default look.",
    bg: "#ffffff",
    canvas: "#eef0f3",
    surface: "#ffffff",
    text: "#1a1a1a",
    textSecondary: "#555555",
    textMuted: "#999999",
    border: "#e0e0e0",
    accent: "#0f62fe",
    accentHover: "#0050d8",
    createBg: "#00879b",
    createHover: "#00707f",
    mint: "#0ac2a0",
    mintSoft: "#d8f5ee",
    mintInk: "#066b58",
  },
  dark: {
    name: "Dark",
    description: "Deep surfaces, violet accents. Easy on the eyes.",
    bg: "#1a1a1e",
    canvas: "#0e0e14",
    surface: "#242428",
    text: "#e8e8ec",
    textSecondary: "#b8b8c0",
    textMuted: "#80808c",
    border: "#333338",
    accent: "#7c3aed",
    accentHover: "#6d28d9",
    createBg: "#00879b",
    createHover: "#00707f",
    mint: "#3ae6c0",
    mintSoft: "rgba(58, 230, 192, 0.16)",
    mintInk: "#9af0d6",
  },
};

export function getMergedDims(
  variant: ShellVariant,
  colorMode: ColorMode
): ShellDims {
  const layout = shellVariants[variant].layout;
  const cm = colorModes[colorMode];

  // Layout decides whether the page sits on bg (flush) or canvas (detached).
  const contentBg = layout.detached ? cm.canvas : cm.bg;
  // Header style decides whether the header bar is surface or accent.
  const headerBg = layout.headerStyle === "accent" ? cm.accent : cm.surface;

  return {
    sidebarCollapsed: layout.sidebarCollapsed,
    sidebarOpen: layout.sidebarOpen,
    headerHeight: layout.headerHeight,
    borderRadius: layout.borderRadius,
    gap: layout.gap,
    contentBg,
    surfaceBg: cm.surface,
    sidebarBg: cm.surface,
    headerBg,
    borderLight: cm.border,
    textPrimary: cm.text,
    textSecondary: cm.textSecondary,
    textMuted: cm.textMuted,
    accent: cm.accent,
    accentHover: cm.accentHover,
    createBg: cm.createBg,
    createHover: cm.createHover,
    mint: cm.mint,
    mintSoft: cm.mintSoft,
    mintInk: cm.mintInk,
  };
}

export const accessibilityDescriptor = "Motion, contrast, fonts, focus, and more.";

export const accessibilityOptions = [
  {
    id: "reduce-motion",
    label: "Reduce Motion",
    description: "Minimize animations and transitions",
    attr: "data-reduce-motion",
  },
  {
    id: "high-contrast",
    label: "High Contrast",
    description: "Increase contrast for better readability",
    attr: "data-high-contrast",
  },
  {
    id: "dyslexia-font",
    label: "Dyslexia-Friendly Font",
    description: "Use OpenDyslexic typeface across the UI",
    attr: "data-dyslexia-font",
  },
  {
    id: "large-text",
    label: "Large Text",
    description: "Increase the base text size by 20%",
    attr: "data-large-text",
  },
  {
    id: "enhanced-focus",
    label: "Enhanced Focus Indicators",
    description: "Show prominent outlines on focused elements",
    attr: "data-enhanced-focus",
  },
  {
    id: "underline-links",
    label: "Underline Links",
    description: "Always underline links for visibility",
    attr: "data-underline-links",
  },
];

// Sidebar nav items — verbatim from live JS (`db185f...js` ~26500).
// Each top-level entry shows a blue flyout with `items` on hover.
export const navItems: {
  id: string;
  label: string;
  icon: string;
  items: string[];
}[] = [
  { id: "ai-starter-kit", label: "AI Starter Kit", icon: "sparkle", items: [] },
  {
    id: "inference-hub",
    label: "Inference Hub",
    icon: "cpu",
    items: [
      "Inference Overview",
      "Explore Models",
      "Serverless Inference",
      "Dedicated Inference",
      "Batch Inference",
      "Build App",
      "Agent Platform",
      "Optimize",
      "Analyze & Manage",
    ],
  },
  {
    id: "compute",
    label: "Compute",
    icon: "server",
    items: [
      "Droplets",
      "GPU Droplets",
      "Bare Metal GPUs",
      "Kubernetes (DOKS)",
      "App Platform Apps",
      "Functions",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "globe",
    items: ["VPC", "Firewalls", "Load Balancers", "Private Endpoints"],
  },
  {
    id: "storage",
    label: "Storage",
    icon: "database",
    items: [
      "Volumes",
      "Backups & Snapshots",
      "Container Registry",
      "Spaces Object Storage",
      "Network File Share",
    ],
  },
  {
    id: "data-services",
    label: "Data Services",
    icon: "layers",
    items: [
      "Databases",
      "Search",
      "Knowledge Bases",
      "Caching",
      "Streaming",
      "Analytics",
    ],
  },
  {
    id: "observability",
    label: "Observability",
    icon: "activity",
    items: ["Metrics", "Logs", "Spend", "Alerts", "Audit Logs"],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    icon: "grid",
    items: ["SaaS Marketplace", "Agent Marketplace"],
  },
  {
    id: "account",
    label: "Account",
    icon: "user",
    items: ["Projects", "Users & Roles", "API Keys", "Settings", "Billing", "CSPM"],
  },
  {
    id: "docs-tools",
    label: "Docs & Tools",
    icon: "book",
    items: [
      "Getting Started",
      "API Reference",
      "Ideas Portal",
      "Community Tutorials",
      "Status",
    ],
  },
];

// Header Create-button menu — categories with sub-items + optional badge.
// Verbatim from live JS bundle (`db185f...js` ~63500).
export const createMenuItems: {
  label: string;
  items: { label: string; badge?: "Beta" | "New" }[];
}[] = [
  {
    label: "Inference",
    items: [
      { label: "1-Click Model" },
      { label: "Fine-Tune Model", badge: "Beta" },
      { label: "Knowledge Base" },
      { label: "Batch Inference" },
      { label: "AI Agent", badge: "Beta" },
    ],
  },
  {
    label: "Compute",
    items: [
      { label: "Droplet" },
      { label: "GPU Droplet", badge: "New" },
      { label: "Kubernetes Cluster" },
      { label: "App Hosting" },
      { label: "Functions" },
    ],
  },
  {
    label: "Data Services",
    items: [
      { label: "Managed Database" },
      { label: "Search" },
      { label: "Knowledge Base", badge: "Beta" },
      { label: "Caching" },
      { label: "Streaming" },
    ],
  },
  {
    label: "Storage",
    items: [
      { label: "Volume Block Storage" },
      { label: "Spaces Object Storage" },
      { label: "Network File Storage" },
    ],
  },
  {
    label: "Networking",
    items: [
      { label: "Reserved IP" },
      { label: "VPC" },
      { label: "Cloud Firewall" },
      { label: "Load Balancer" },
      { label: "Private Endpoint" },
      { label: "Domain" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "API Keys" },
      { label: "Custom Roles" },
      { label: "New Project" },
      { label: "New Team" },
    ],
  },
  {
    label: "Observability",
    items: [{ label: "Resource Alert" }],
  },
];

// Header search items — verbatim from live JS (~43500). 50+ resources
// grouped by section. UI filters across all of these as user types.
export const searchItems: {
  label: string;
  section: string;
  detail?: string;
}[] = [
  { label: "web-prod-1", section: "Your Droplets", detail: "4 vCPU / 8 GB / NYC1" },
  { label: "web-prod-2", section: "Your Droplets", detail: "4 vCPU / 8 GB / NYC1" },
  { label: "api-server", section: "Your Droplets", detail: "8 vCPU / 16 GB / SFO3" },
  { label: "staging-app", section: "Your Droplets", detail: "2 vCPU / 4 GB / NYC3" },
  { label: "worker-node-01", section: "Your Droplets", detail: "4 vCPU / 8 GB / AMS3" },
  { label: "bastion-host", section: "Your Droplets", detail: "1 vCPU / 1 GB / NYC1" },
  { label: "ml-training-gpu-1", section: "Your GPU Droplets", detail: "H100 / 80 GB / NYC2" },
  { label: "inference-node-a", section: "Your GPU Droplets", detail: "A100 / 40 GB / SFO3" },
  { label: "prod-k8s-cluster", section: "Your Clusters", detail: "Kubernetes / 6 nodes / NYC1" },
  { label: "staging-k8s", section: "Your Clusters", detail: "Kubernetes / 3 nodes / NYC3" },
  { label: "main-postgres", section: "Your Databases", detail: "PostgreSQL 16 / NYC1" },
  { label: "cache-redis", section: "Your Databases", detail: "Redis 7 / NYC1" },
  { label: "analytics-db", section: "Your Databases", detail: "MySQL 8 / SFO3" },
  { label: "search-opensearch", section: "Your Databases", detail: "OpenSearch 2 / NYC1" },
  { label: "media-assets", section: "Your Spaces", detail: "342 GB / NYC3" },
  { label: "backup-vault", section: "Your Spaces", detail: "1.2 TB / SFO3" },
  { label: "static-cdn", section: "Your Spaces", detail: "28 GB / AMS3" },
  { label: "prod-data-vol", section: "Your Volumes", detail: "500 GB / NYC1" },
  { label: "logs-archive-vol", section: "Your Volumes", detail: "1 TB / NYC1" },
  { label: "prod-vpc", section: "Your VPCs", detail: "10.10.0.0/16 / NYC1" },
  { label: "staging-vpc", section: "Your VPCs", detail: "10.20.0.0/16 / NYC3" },
  { label: "api-lb", section: "Your Load Balancers", detail: "NYC1 / 3 targets" },
  { label: "web-lb", section: "Your Load Balancers", detail: "NYC1 / 2 targets" },
  { label: "web-firewall", section: "Your Firewalls", detail: "5 rules / 4 droplets" },
  { label: "marketing-site", section: "Your Apps", detail: "Static / production" },
  { label: "customer-portal", section: "Your Apps", detail: "Web service / production" },
  { label: "webhook-handler", section: "Your Functions", detail: "Node.js / NYC1" },
  { label: "llama-3-endpoint", section: "Your Inference Endpoints", detail: "Serverless / active" },
  { label: "mistral-fine-tuned", section: "Your Inference Endpoints", detail: "Dedicated / SFO3" },
  { label: "embedding-service", section: "Your Inference Endpoints", detail: "Serverless / active" },
  { label: "Production Infrastructure", section: "Your Projects", detail: "12 resources" },
  { label: "Staging Environment", section: "Your Projects", detail: "8 resources" },
  { label: "ML Pipeline", section: "Your Projects", detail: "5 resources" },
  { label: "Marketing Website", section: "Your Projects", detail: "3 resources" },
  { label: "Data Analytics", section: "Your Projects", detail: "6 resources" },
  { label: "Platform Engineering", section: "Your Teams", detail: "8 members" },
  { label: "Backend API", section: "Your Teams", detail: "5 members" },
  { label: "ML & AI", section: "Your Teams", detail: "4 members" },
  { label: "DevOps", section: "Your Teams", detail: "3 members" },
  { label: "Frontend", section: "Your Teams", detail: "6 members" },
  { label: "API Reference", section: "Tools" },
  { label: "CLI (doctl)", section: "Tools" },
  { label: "Terraform Provider", section: "Tools" },
  { label: "API Keys & Tokens", section: "Tools" },
  { label: "Monitoring Dashboard", section: "Tools" },
  { label: "Billing & Usage", section: "Tools" },
  { label: "Support Tickets", section: "Tools" },
  { label: "Status Page", section: "Tools" },
  { label: "Community Tutorials", section: "Tools" },
  { label: "Getting Started Guide", section: "Tools" },
];

// Default ordering shown when search is focused but empty.
export const searchRecentlyViewed = [
  "web-prod-1",
  "main-postgres",
  "prod-k8s-cluster",
  "Production Infrastructure",
  "llama-3-endpoint",
];
export const searchRecentlyCreated = [
  "embedding-service",
  "staging-app",
  "search-opensearch",
];

// Breadcrumb popover data — Acme Corp / Platform Engineering /
// roadtrip-copilot / Dashboard. Last popover ("Dashboard") has a
// recently-visited section + project resources.
export const breadcrumbPopovers: Record<
  string,
  {
    sections: { title: string; items: { label: string; detail?: string }[] }[];
  }
> = {
  "Acme Corp": {
    sections: [
      {
        title: "Your Organizations",
        items: [{ label: "Acme Corp" }, { label: "Howrey Labs" }],
      },
    ],
  },
  "Platform Engineering": {
    sections: [
      {
        title: "Your Teams",
        items: [
          { label: "Platform Engineering" },
          { label: "Data Science" },
          { label: "Mobile" },
          { label: "Design Systems" },
          { label: "Infrastructure" },
        ],
      },
    ],
  },
  "roadtrip-copilot": {
    sections: [
      {
        title: "Your Projects",
        items: [
          { label: "roadtrip-copilot" },
          { label: "production-api" },
          { label: "staging-environment" },
          { label: "internal-tools" },
          { label: "marketing-site" },
          { label: "ml-pipeline" },
        ],
      },
    ],
  },
  Dashboard: {
    sections: [
      {
        title: "Recently Visited",
        items: [
          { label: "Inference Hub", detail: "Playground" },
          { label: "Create Database", detail: "Data Services" },
          { label: "Dashboard", detail: "Overview" },
          { label: "web-prod-1", detail: "Droplet · NYC1" },
          { label: "prod-k8s-cluster", detail: "Kubernetes · NYC1" },
        ],
      },
      {
        title: "Project Resources",
        items: [
          { label: "web-prod-1", detail: "Droplet · 4 vCPU / 8 GB" },
          { label: "web-prod-2", detail: "Droplet · 4 vCPU / 8 GB" },
          { label: "main-postgres", detail: "Database · PostgreSQL 16" },
          { label: "cache-redis", detail: "Database · Redis 7" },
          { label: "prod-k8s-cluster", detail: "Kubernetes · 6 nodes" },
          { label: "api-lb", detail: "Load Balancer · NYC1" },
          { label: "prod-vpc", detail: "VPC · 10.10.0.0/16" },
          { label: "media-assets", detail: "Spaces · 342 GB" },
        ],
      },
    ],
  },
};

// AI Assistant suggested prompts (with their specific icon ids).
export const assistantPrompts: { icon: string; text: string }[] = [
  { icon: "dollar", text: "Why is my bill higher this month?" },
  { icon: "droplet", text: "Create and configure my first Droplet" },
  { icon: "support", text: "Get help from our Support team" },
  { icon: "calendar", text: "How do I build a WordPress website?" },
];

// Notifications — verbatim from live JS (~22000).
export type NotifType = "agentic" | "billing" | "infra" | "team" | "security";

export const notificationCategoryColors: Record<NotifType, { dot: string; label: string }> = {
  agentic: { dot: "#7c3aed", label: "#6d28d9" },
  billing: { dot: "#059669", label: "#047857" },
  infra: { dot: "#d97706", label: "#b45309" },
  team: { dot: "#2563eb", label: "#1d4ed8" },
  security: { dot: "#dc2626", label: "#b91c1c" },
};

export interface NotificationItem {
  id: string;
  type: NotifType;
  categoryLabel: string;
  text: string;
  meta: string;
  time: string;
  unread?: boolean;
  actions: { label: string; primary?: boolean }[];
}

export const notifications: { group: string; items: NotificationItem[] }[] = [
  {
    group: "Now",
    items: [
      {
        id: "1",
        type: "agentic",
        categoryLabel: "AI Agent",
        text: "Auto-scaling completed for copilot-app-nyc1",
        meta: "Agent optimized from 3 to 5 nodes based on traffic spike",
        time: "Just now",
        unread: true,
        actions: [{ label: "Review Changes", primary: true }, { label: "Undo" }],
      },
      {
        id: "2",
        type: "security",
        categoryLabel: "Security",
        text: "Unusual login attempt blocked",
        meta: "IP 192.168.14.22 — São Paulo, Brazil",
        time: "2m ago",
        unread: true,
        actions: [{ label: "Review Activity", primary: true }, { label: "Block IP" }],
      },
    ],
  },
  {
    group: "Earlier today",
    items: [
      {
        id: "3",
        type: "billing",
        categoryLabel: "Billing",
        text: "Monthly invoice ready",
        meta: "$247.83 for February 2026 — due Mar 15",
        time: "3h ago",
        unread: true,
        actions: [{ label: "View Invoice", primary: true }, { label: "Payment Settings" }],
      },
      {
        id: "4",
        type: "agentic",
        categoryLabel: "AI Agent",
        text: "Database vacuum scheduled automatically",
        meta: "copilot-db-prod — Agent detected fragmentation at 34%",
        time: "5h ago",
        actions: [{ label: "View Details" }],
      },
      {
        id: "5",
        type: "infra",
        categoryLabel: "Infrastructure",
        text: "Droplet CPU alert resolved",
        meta: "copilot-droplet-01 returned below 80% threshold",
        time: "6h ago",
        actions: [{ label: "View Metrics", primary: true }, { label: "Edit Alert Rules" }],
      },
    ],
  },
  {
    group: "Yesterday",
    items: [
      {
        id: "6",
        type: "team",
        categoryLabel: "Team",
        text: "Alex Chen joined Platform Engineering",
        meta: "Invited by you — Developer role",
        time: "Yesterday",
        actions: [{ label: "Manage Roles", primary: true }],
      },
      {
        id: "7",
        type: "agentic",
        categoryLabel: "AI Agent",
        text: "Cost optimization suggestion",
        meta: "Agent identified 2 idle droplets — potential savings $18/mo",
        time: "Yesterday",
        actions: [{ label: "Review Suggestion", primary: true }, { label: "Dismiss" }],
      },
      {
        id: "8",
        type: "infra",
        categoryLabel: "Infrastructure",
        text: "Kubernetes cluster upgraded",
        meta: "copilot-k8s-cluster — v1.29 → v1.30 completed successfully",
        time: "Yesterday",
        actions: [{ label: "View Changelog" }],
      },
    ],
  },
  {
    group: "Last week",
    items: [
      {
        id: "9",
        type: "billing",
        categoryLabel: "Billing",
        text: "Credits applied to account",
        meta: "$50 promotional credit — expires Jun 30",
        time: "3 days ago",
        actions: [{ label: "View Balance" }],
      },
      {
        id: "10",
        type: "team",
        categoryLabel: "Team",
        text: "New project created",
        meta: "staging-environment — created by Jamie Park",
        time: "5 days ago",
        actions: [{ label: "Go to Project", primary: true }],
      },
      {
        id: "11",
        type: "agentic",
        categoryLabel: "AI Agent",
        text: "Backup policy auto-configured",
        meta: "Agent set daily snapshots for 3 new volumes",
        time: "6 days ago",
        actions: [{ label: "Review Policy", primary: true }, { label: "Learn More" }],
      },
    ],
  },
];
