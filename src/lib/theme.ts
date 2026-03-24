export type ShellVariant = "standard" | "floating" | "compact" | "zen";
export type ColorMode = "default" | "light" | "dark";

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
}

export const shellVariants: Record<
  ShellVariant,
  { name: string; description: string; dims: ShellDims }
> = {
  standard: {
    name: "Standard",
    description:
      "The production-ready flat UI shell with precise, functional chrome.",
    dims: {
      sidebarCollapsed: 52,
      sidebarOpen: 206,
      headerHeight: 52,
      borderRadius: 0,
      gap: 0,
      headerBg: "#ffffff",
      sidebarBg: "#ffffff",
      contentBg: "#ffffff",
      surfaceBg: "#ffffff",
      borderLight: "#e0e0e0",
      textPrimary: "#1a1a1a",
      textSecondary: "#555555",
      textMuted: "#999999",
      accent: "#0f62fe",
      accentHover: "#0050d8",
      createBg: "#00879b",
      createHover: "#00707f",
    },
  },
  floating: {
    name: "Floating",
    description:
      "Detached panels on a dark canvas. Rounded, modern, Linear-inspired.",
    dims: {
      sidebarCollapsed: 52,
      sidebarOpen: 206,
      headerHeight: 52,
      borderRadius: 12,
      gap: 8,
      headerBg: "#1e1e24",
      sidebarBg: "#1e1e24",
      contentBg: "#0e0e14",
      surfaceBg: "#1e1e24",
      borderLight: "#2a2a32",
      textPrimary: "#e8e8ec",
      textSecondary: "#a0a0a8",
      textMuted: "#666670",
      accent: "#6366f1",
      accentHover: "#5558e6",
      createBg: "#00879b",
      createHover: "#00707f",
    },
  },
  compact: {
    name: "Compact",
    description:
      "Maximum density. Same flat aesthetic, tighter spacing, smaller chrome.",
    dims: {
      sidebarCollapsed: 40,
      sidebarOpen: 180,
      headerHeight: 34,
      borderRadius: 0,
      gap: 0,
      headerBg: "#ffffff",
      sidebarBg: "#ffffff",
      contentBg: "#ffffff",
      surfaceBg: "#ffffff",
      borderLight: "#e0e0e0",
      textPrimary: "#1a1a1a",
      textSecondary: "#555555",
      textMuted: "#999999",
      accent: "#0f62fe",
      accentHover: "#0050d8",
      createBg: "#00879b",
      createHover: "#00707f",
    },
  },
  zen: {
    name: "Zen",
    description:
      "Calm, spacious. Branded header bar, full-width content. Nav and chat push, never cover.",
    dims: {
      sidebarCollapsed: 52,
      sidebarOpen: 240,
      headerHeight: 52,
      borderRadius: 0,
      gap: 0,
      headerBg: "#0f62fe",
      sidebarBg: "#ffffff",
      contentBg: "#ffffff",
      surfaceBg: "#f4f5f6",
      borderLight: "#e0e0e0",
      textPrimary: "#1a1a1a",
      textSecondary: "#555555",
      textMuted: "#999999",
      accent: "#0f62fe",
      accentHover: "#0050d8",
      createBg: "#00879b",
      createHover: "#00707f",
    },
  },
};

export const colorModes: Record<
  ColorMode,
  { name: string; description: string; accent: string; bg: string; surface: string; text: string; border: string }
> = {
  default: {
    name: "Default",
    description: "Blue branding, teal accents.",
    accent: "#0f62fe",
    bg: "#ffffff",
    surface: "#ffffff",
    text: "#1a1a1a",
    border: "#e0e0e0",
  },
  light: {
    name: "Light",
    description: "Steel blue, airy professional.",
    accent: "#4a6fa5",
    bg: "#f8f9fb",
    surface: "#ffffff",
    text: "#1a1a1a",
    border: "#dde3ea",
  },
  dark: {
    name: "Dark",
    description: "Deep surfaces, soft contrast.",
    accent: "#7c3aed",
    bg: "#1a1a1e",
    surface: "#242428",
    text: "#e8e8ec",
    border: "#333338",
  },
};

export const accessibilityOptions = [
  { id: "reduce-motion", label: "Reduce Motion", attr: "data-reduce-motion" },
  { id: "high-contrast", label: "High Contrast", attr: "data-high-contrast" },
  { id: "dyslexia-font", label: "Dyslexia-Friendly Font", attr: "data-dyslexia-font" },
  { id: "large-text", label: "Large Text", attr: "data-large-text" },
  { id: "enhanced-focus", label: "Enhanced Focus", attr: "data-enhanced-focus" },
  { id: "underline-links", label: "Underline Links", attr: "data-underline-links" },
];

export const navItems = [
  { label: "AI Starter Kit", icon: "sparkle" },
  { label: "Inference Hub", icon: "cpu" },
  { label: "Compute", icon: "server" },
  { label: "Networking", icon: "globe" },
  { label: "Storage", icon: "database" },
  { label: "Data Services", icon: "layers" },
  { label: "Observability", icon: "activity" },
  { label: "Ecosystem", icon: "grid" },
  { label: "Account", icon: "user" },
  { label: "Docs & Tools", icon: "book" },
];

export const createMenuItems = [
  { category: "Inference", items: ["Inference Endpoint"] },
  { category: "Compute", items: ["Droplet", "Kubernetes", "App Platform", "Functions"] },
  { category: "Data Services", items: ["Managed Database", "Redis", "Kafka"] },
  { category: "Storage", items: ["Space", "Volume"] },
  { category: "Networking", items: ["Domain", "Load Balancer", "VPC", "Firewall"] },
];

export const notificationCategories = [
  { id: "agentic", label: "Agentic", color: "#6366f1" },
  { id: "billing", label: "Billing", color: "#f59e0b" },
  { id: "infra", label: "Infrastructure", color: "#10b981" },
  { id: "team", label: "Team", color: "#3b82f6" },
  { id: "security", label: "Security", color: "#ef4444" },
];

export const gradientColors = [
  "#c7d2fe", "#bbf7d0", "#fde68a", "#fecaca", "#bae6fd", "#ddd6fe",
  "#a7f3d0", "#fed7aa", "#e0e7ff", "#d9f99d", "#fbcfe8", "#99f6e4",
];
