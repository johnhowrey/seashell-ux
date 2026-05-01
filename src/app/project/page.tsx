"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 40px 80px;
`;

/* ─── Project header ─── */
const ProjectHero = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  margin-bottom: 20px;
`;

const ProjectAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 22px;
  flex-shrink: 0;
`;

const ProjectInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const ProjectName = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0;
`;

const StatusPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const ProjectDesc = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0 0 10px;
  max-width: 720px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
`;

const MetaItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(p) => p.$color};
`;

const MetaSep = styled.span`
  color: rgba(0, 0, 0, 0.2);
  font-size: 12px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const HeroButton = styled.button<{ $primary?: boolean; $accent: string; $border: string; $color: string }>`
  padding: 8px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$primary ? "transparent" : p.$border)};
  background: ${(p) => (p.$primary ? p.$accent : "transparent")};
  color: ${(p) => (p.$primary ? "#ffffff" : p.$color)};

  &:hover {
    filter: brightness(0.96);
  }
`;

/* ─── Status line (lives inside the hero) ─── */
const StatusLine = styled.div<{ $color: string; $border: string }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  margin-top: 12px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: ${(p) => p.$color};
`;

const StatusGlyph = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
`;

const StatusBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const StatusHead = styled.div<{ $color: string }>`
  font-weight: 600;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

/* ─── Attention card ─── */
const AttentionCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  padding: 6px 0;
  margin-bottom: 20px;
`;

const AttentionHead = styled.div<{ $color: string; $border: string }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 14px 20px 12px;
  border-bottom: 1px solid ${(p) => p.$border};
  color: ${(p) => p.$color};
`;

const AttentionTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  color: ${(p) => p.$color};
`;

const AttentionMeta = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const AttentionItem = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const AttentionGlyph = styled.span<{ $bg: string; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
`;

const AttentionBody = styled.div`
  min-width: 0;
`;

const AttentionLine1 = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const AttentionLine2 = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: ${(p) => p.$color};
`;

const AttentionActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: flex-start;
`;

const AttentionBtn = styled.button<{ $primary?: boolean; $accent: string; $border: string; $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  ${(p) =>
    p.$primary
      ? `background: ${p.$accent}; color: #ffffff; border: 1px solid ${p.$accent};`
      : `background: transparent; color: ${p.$color}; border: 1px solid ${p.$border};`}
`;

/* ─── Focus block (action-first hero) ─── */
const FocusBlock = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  padding: 24px 28px;
  margin-bottom: 18px;
`;

const FocusLead = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 17px;
  line-height: 1.5;
  color: ${(p) => p.$color};
  margin: 0 0 18px;

  strong { font-weight: 700; }
`;

const FocusActions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const FocusPrimaryBtn = styled.button<{ $accent: string }>`
  padding: 10px 18px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: 1px solid ${(p) => p.$accent};
  border-radius: 7px;
  cursor: pointer;
  &:hover { filter: brightness(0.95); }
`;

const FocusGhostBtn = styled.button<{ $color: string; $border: string }>`
  padding: 10px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 7px;
  cursor: pointer;
`;

const FocusMore = styled.details<{ $color: string }>`
  margin-top: 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};

  summary {
    cursor: pointer;
    list-style: none;
    color: inherit;
    text-decoration: underline;
  }
  summary::-webkit-details-marker { display: none; }
`;

const FocusMoreList = styled.ul<{ $color: string; $border: string }>`
  list-style: none;
  margin: 12px 0 0;
  padding: 14px 16px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  color: ${(p) => p.$color};
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
  line-height: 1.55;

  li {
    display: list-item;
  }
`;

const ProjectDetails = styled.details<{ $color: string }>`
  margin-top: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};

  summary {
    cursor: pointer;
    list-style: none;
    padding: 10px 14px;
    color: inherit;
    text-decoration: underline;
  }
  summary::-webkit-details-marker { display: none; }
`;

/* ─── Tabs ─── */
const TabRow = styled.div<{ $border: string }>`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid ${(p) => p.$border};
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active: boolean; $color: string; $accent: string }>`
  padding: 10px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? p.$accent : "transparent")};
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  cursor: pointer;
  transition: color 0.1s ease, border-color 0.1s ease;
  margin-bottom: -1px;
`;

/* ─── Sections ─── */
const Cols = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const CardTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  color: ${(p) => p.$color};
`;

const SeeAll = styled(Link)<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$accent};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

/* ─── Environment cards ─── */
const EnvGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const EnvCard = styled.div<{ $surface: string; $border: string }>`
  padding: 14px 16px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
`;

const EnvName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const EnvDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
`;

const EnvLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const EnvVersion = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-bottom: 4px;
`;

const EnvUrl = styled.a<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  word-break: break-all;
  &:hover { text-decoration: underline; }
`;

/* ─── Resources table ─── */
const ResRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 28px 1fr 90px 110px 110px;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  &:last-child { border-bottom: none; }
`;

const ResIcon = styled.span<{ $bg: string; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
`;

const ResName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const ResNameLabel = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResMeta = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-size: 11px;
`;

const ResStatus = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${(p) => p.$color};
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const ResRegion = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-size: 12px;
`;

const ResCost = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-weight: 500;
  text-align: right;
  font-size: 12px;
`;

/* ─── Deploy frequency strip ─── */
const DeployStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  gap: 6px;
  margin-bottom: 10px;
`;

const DeployCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const DeployBlock = styled.span<{ $on: boolean; $color: string }>`
  width: 100%;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => (p.$on ? p.$color : "rgba(0, 0, 0, 0.04)")};
  display: inline-block;
`;

const DeployStripLegend = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const DeployStripKey = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span:not([class]) {
    margin-right: 6px;
  }
  & > span[class] {
    width: 12px;
    height: 12px;
  }
`;

/* ─── Deploys ─── */
const DeployRow = styled.div<{ $border: string }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const DeployIcon = styled.span<{ $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(p) => p.$color}1f;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
`;

const DeployText = styled.div`
  flex: 1;
  min-width: 0;
`;

const DeployTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const DeployMeta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const DeploySha = styled.code<{ $color: string }>`
  font-family: var(--font-mono), ui-monospace, SFMono-Regular, monospace;
  font-size: 11px;
  color: ${(p) => p.$color};
  background: rgba(0, 0, 0, 0.04);
  padding: 1px 5px;
  border-radius: 3px;
  margin: 0 4px;
`;

/* ─── Team ─── */
const TeamRow = styled.div<{ $border: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const TeamAvatar = styled.span<{ $bg: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
`;

const TeamInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TeamName = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const TeamRole = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

/* ─── Data ─── */
const environments = [
  { name: "Production", color: "#10b981", version: "v2.4.1", url: "roadtrip.acme.io" },
  { name: "Staging", color: "#f59e0b", version: "v2.5.0-rc.2", url: "staging.roadtrip.acme.io" },
  { name: "Development", color: "#94a3b8", version: "v2.6.0-dev", url: "dev.roadtrip.acme.io" },
];

const resources = [
  { kind: "DR", iconBg: "#dbeafe", iconColor: "#1e40af", name: "web-prod-1", meta: "Droplet · 4 vCPU / 8 GB", status: "Running", statusColor: "#10b981", region: "NYC1", cost: "$48.00 / mo" },
  { kind: "DR", iconBg: "#dbeafe", iconColor: "#1e40af", name: "web-prod-2", meta: "Droplet · 4 vCPU / 8 GB", status: "Running", statusColor: "#10b981", region: "NYC1", cost: "$48.00 / mo" },
  { kind: "DB", iconBg: "#fef3c7", iconColor: "#a16207", name: "copilot-db-prod", meta: "PostgreSQL 17 · 4 vCPU / 16 GB", status: "Running", statusColor: "#10b981", region: "NYC3", cost: "$152.00 / mo" },
  { kind: "AP", iconBg: "#dcfce7", iconColor: "#15803d", name: "copilot-app-nyc1", meta: "App Platform · 5 nodes", status: "Auto-scaled", statusColor: "#0ea5e9", region: "NYC1", cost: "$74.50 / mo" },
  { kind: "K8", iconBg: "#ede9fe", iconColor: "#6d28d9", name: "prod-k8s-cluster", meta: "Kubernetes · 6 nodes", status: "Running", statusColor: "#10b981", region: "NYC1", cost: "$240.00 / mo" },
  { kind: "SP", iconBg: "#cffafe", iconColor: "#0e7490", name: "marketing-assets", meta: "Spaces · 124 GB", status: "Healthy", statusColor: "#10b981", region: "NYC3", cost: "$5.00 / mo" },
];

const deploys = [
  { color: "#10b981", title: "Deployed v2.4.1 to Production", meta: "John Howrey · 8m ago", sha: "a4b21c9", branch: "main" },
  { color: "#10b981", title: "Deployed v2.5.0-rc.2 to Staging", meta: "Maya Patel · 1h ago", sha: "7f8e1a2", branch: "release/2.5" },
  { color: "#ef4444", title: "Deploy to Production failed", meta: "CI · 3h ago — health check timeout", sha: "c1d4e2b", branch: "main" },
  { color: "#10b981", title: "Deployed v2.4.0 to Production", meta: "John Howrey · Yesterday", sha: "82a91ff", branch: "main" },
  { color: "#0ea5e9", title: "Reverted v2.3.5 on Staging", meta: "Alex Chen · Yesterday", sha: "ee99102", branch: "main" },
];

const team = [
  { name: "John Howrey", role: "Owner · Platform Engineering", bg: "#0061eb" },
  { name: "Maya Patel", role: "Admin · Backend Lead", bg: "#7c3aed" },
  { name: "Alex Chen", role: "Developer", bg: "#10b981" },
  { name: "Priya Iyer", role: "Developer", bg: "#f59e0b" },
  { name: "Devon Wu", role: "Reviewer", bg: "#ef4444" },
];

// Live attention items — each is a specific signal from this project's
// state, tied to a one-click resolution. Severity drives color/glyph.
type AttentionSeverity = "warn" | "risk" | "info";
interface AttentionEntry {
  severity: AttentionSeverity;
  title: string;
  evidence: string;
  actions: { label: string; primary?: boolean }[];
}

const attentionItems: AttentionEntry[] = [
  {
    severity: "warn",
    title: "copilot-db-prod is at 87% disk capacity",
    evidence:
      "Storage will fill in ~12 days at the current 0.6 GB/day write rate. Resize before Mar 8 to avoid a hard cutover.",
    actions: [
      { label: "Resize volume", primary: true },
      { label: "Set capacity alert" },
      { label: "View metrics" },
    ],
  },
  {
    severity: "risk",
    title: "web-prod-2 has a pending security patch",
    evidence:
      "ubuntu-jammy 22.04 → 22.04.5 covers CVE-2026-1812 (kernel privilege escalation). 4 droplets unpatched.",
    actions: [
      { label: "Apply now", primary: true },
      { label: "Schedule for off-peak" },
      { label: "Review CVE" },
    ],
  },
  {
    severity: "info",
    title: "Production deploy failed earlier today, then recovered",
    evidence:
      "v2.4.0 → v2.4.1 health check timed out at 15:42 UTC. The retry at 16:08 succeeded. No RCA on file yet.",
    actions: [
      { label: "Open RCA template", primary: true },
      { label: "View failure log" },
    ],
  },
];

const integrations = [
  { name: "GitHub", desc: "Auto-deploy from main", connected: true, icon: "⌥" },
  { name: "Slack", desc: "Alerts to #ops", connected: true, icon: "#" },
  { name: "PagerDuty", desc: "On-call escalation", connected: false, icon: "!" },
  { name: "Datadog", desc: "Metrics + traces", connected: true, icon: "⊙" },
];

const TABS = ["Overview", "Resources", "Activity", "Team", "Settings"];

export default function ProjectHomePage() {
  const [tab, setTab] = useState("Overview");

  return (
    <PageFrame breadcrumbs={["Acme Corp", "Platform Engineering", "roadtrip-copilot"]}>
      {({ dims, isDark }) => (
        <Page>
          <ProjectHero $surface={dims.surfaceBg} $border={dims.borderLight}>
            <ProjectAvatar>R</ProjectAvatar>
            <ProjectInfo>
              <NameRow>
                <ProjectName $color={dims.textPrimary}>roadtrip-copilot</ProjectName>
                <StatusPill $bg="#fef3c7" $color="#92400e">
                  3 to review
                </StatusPill>
                <StatusPill
                  $bg={isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}
                  $color={dims.textSecondary}
                >
                  Production
                </StatusPill>
              </NameRow>
              <ProjectDesc $color={dims.textSecondary}>
                AI-assisted travel planning. Suggests routes, lodging, and
                attractions based on group preferences and budget.
              </ProjectDesc>
            </ProjectInfo>
            <HeroActions>
              <HeroButton
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Settings
              </HeroButton>
              <HeroButton
                $primary
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Deploy
              </HeroButton>
            </HeroActions>
          </ProjectHero>

          <TabRow $border={dims.borderLight}>
            {TABS.map((t) => (
              <Tab
                key={t}
                $active={t === tab}
                $color={dims.textSecondary}
                $accent={dims.accent}
                onClick={() => setTab(t)}
                type="button"
              >
                {t}
              </Tab>
            ))}
          </TabRow>

          {tab === "Overview" && (
            <>
              <FocusBlock $surface={dims.surfaceBg} $border={dims.borderLight}>
                <FocusLead $color={dims.textPrimary}>
                  Production is serving traffic. The most important thing
                  on your plate is{" "}
                  <strong>
                    copilot-db-prod will run out of disk in ~12 days
                  </strong>{" "}
                  at the current write rate.
                </FocusLead>
                <FocusActions>
                  <FocusPrimaryBtn $accent={dims.accent} type="button">
                    Resize the volume
                  </FocusPrimaryBtn>
                  <FocusGhostBtn
                    $color={dims.textPrimary}
                    $border={dims.borderLight}
                    type="button"
                  >
                    Set a capacity alert instead
                  </FocusGhostBtn>
                </FocusActions>
                <FocusMore $color={dims.textMuted}>
                  <summary>2 more things worth a look</summary>
                  <FocusMoreList
                    $color={dims.textSecondary}
                    $border={dims.borderLight}
                  >
                    <li>
                      <strong>web-prod-2 has a pending security patch.</strong>{" "}
                      ubuntu-jammy 22.04 → 22.04.5 covers CVE-2026-1812.{" "}
                      <a style={{ color: dims.accent, cursor: "pointer" }}>
                        Apply during off-peak
                      </a>
                    </li>
                    <li>
                      <strong>
                        Earlier deploy failure has no RCA on file.
                      </strong>{" "}
                      v2.4.0 health check timed out at 15:42 before v2.4.1
                      recovered.{" "}
                      <a style={{ color: dims.accent, cursor: "pointer" }}>
                        Open RCA template
                      </a>
                    </li>
                  </FocusMoreList>
                </FocusMore>
              </FocusBlock>

              <ProjectDetails $color={dims.textMuted}>
                <summary>Project details — environments, resources, deploys, team</summary>

            <Cols>
              <div>
                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Environments
                    </CardTitle>
                  </CardHead>
                  <EnvGrid>
                    {environments.map((e) => (
                      <EnvCard
                        key={e.name}
                        $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                        $border={dims.borderLight}
                      >
                        <EnvName>
                          <EnvDot $color={e.color} />
                          <EnvLabel $color={dims.textPrimary}>{e.name}</EnvLabel>
                        </EnvName>
                        <EnvVersion $color={dims.textSecondary}>
                          {e.version}
                        </EnvVersion>
                        <EnvUrl
                          href={`https://${e.url}`}
                          $accent={dims.accent}
                        >
                          {e.url}
                        </EnvUrl>
                      </EnvCard>
                    ))}
                  </EnvGrid>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>Resources</CardTitle>
                    <SeeAll href="/droplets" $accent={dims.accent}>
                      View all →
                    </SeeAll>
                  </CardHead>
                  {resources.map((r) => (
                    <ResRow key={r.name} $border={dims.borderLight}>
                      <ResIcon $bg={r.iconBg} $color={r.iconColor}>
                        {r.kind}
                      </ResIcon>
                      <ResName>
                        <ResNameLabel $color={dims.textPrimary}>
                          {r.name}
                        </ResNameLabel>
                        <ResMeta $color={dims.textMuted}>{r.meta}</ResMeta>
                      </ResName>
                      <ResStatus $color={r.statusColor}>{r.status}</ResStatus>
                      <ResRegion $color={dims.textSecondary}>{r.region}</ResRegion>
                      <ResCost $color={dims.textPrimary}>{r.cost}</ResCost>
                    </ResRow>
                  ))}
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Deploy frequency
                    </CardTitle>
                    <span
                      style={{
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: 12,
                        color: dims.textMuted,
                      }}
                    >
                      <strong style={{ color: dims.textPrimary }}>
                        4.2/week
                      </strong>{" "}
                      · 3 envs · 14d window
                    </span>
                  </CardHead>
                  <DeployStrip>
                    {Array.from({ length: 14 }).map((_, i) => {
                      // synthesized: prod (top), staging (mid), dev (bot)
                      const prod = [
                        false, true, false, false, true, false, true, false,
                        false, true, false, false, true, true,
                      ][i];
                      const staging = [
                        true, true, false, true, true, true, false, true, true,
                        false, true, true, true, true,
                      ][i];
                      const dev = [
                        true, true, true, true, true, true, true, true, true,
                        true, true, true, true, true,
                      ][i];
                      const failed = i === 6;
                      return (
                        <DeployCol key={i}>
                          <DeployBlock
                            $on={prod}
                            $color={failed ? "#ef4444" : "#10b981"}
                          />
                          <DeployBlock $on={staging} $color="#f59e0b" />
                          <DeployBlock $on={dev} $color="#0ea5e9" />
                        </DeployCol>
                      );
                    })}
                  </DeployStrip>
                  <DeployStripLegend $color={dims.textMuted}>
                    <span>14 days ago</span>
                    <DeployStripKey>
                      <DeployBlock $on $color="#10b981" />
                      <span>Production</span>
                      <DeployBlock $on $color="#f59e0b" />
                      <span>Staging</span>
                      <DeployBlock $on $color="#0ea5e9" />
                      <span>Dev</span>
                      <DeployBlock $on $color="#ef4444" />
                      <span>Failed</span>
                    </DeployStripKey>
                    <span>Today</span>
                  </DeployStripLegend>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Recent deploys
                    </CardTitle>
                    <SeeAll href="/notifications" $accent={dims.accent}>
                      View all →
                    </SeeAll>
                  </CardHead>
                  {deploys.map((d, i) => (
                    <DeployRow key={i} $border={dims.borderLight}>
                      <DeployIcon $color={d.color}>↑</DeployIcon>
                      <DeployText>
                        <DeployTitle $color={dims.textPrimary}>
                          {d.title}
                        </DeployTitle>
                        <DeployMeta $color={dims.textMuted}>
                          <DeploySha $color={dims.textSecondary}>
                            {d.sha}
                          </DeploySha>
                          on {d.branch} · {d.meta.split(" · ")[1] || d.meta}
                        </DeployMeta>
                      </DeployText>
                    </DeployRow>
                  ))}
                </Card>
              </div>

              <div>
                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>Team</CardTitle>
                    <SeeAll href="/onboarding" $accent={dims.accent}>
                      Invite +
                    </SeeAll>
                  </CardHead>
                  {team.map((m) => (
                    <TeamRow key={m.name} $border={dims.borderLight}>
                      <TeamAvatar $bg={m.bg}>
                        {m.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </TeamAvatar>
                      <TeamInfo>
                        <TeamName $color={dims.textPrimary}>{m.name}</TeamName>
                        <TeamRole $color={dims.textMuted}>{m.role}</TeamRole>
                      </TeamInfo>
                    </TeamRow>
                  ))}
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Integrations
                    </CardTitle>
                  </CardHead>
                  {integrations.map((it) => (
                    <TeamRow key={it.name} $border={dims.borderLight}>
                      <TeamAvatar $bg={it.connected ? "#0061eb" : "#9ca3af"}>
                        {it.icon}
                      </TeamAvatar>
                      <TeamInfo>
                        <TeamName $color={dims.textPrimary}>{it.name}</TeamName>
                        <TeamRole $color={dims.textMuted}>{it.desc}</TeamRole>
                      </TeamInfo>
                      <span
                        style={{
                          fontFamily:
                            "var(--font-inter), Inter, sans-serif",
                          fontSize: 11,
                          fontWeight: 500,
                          color: it.connected ? "#15803d" : dims.accent,
                        }}
                      >
                        {it.connected ? "Connected" : "Connect"}
                      </span>
                    </TeamRow>
                  ))}
                </Card>
              </div>
            </Cols>
              </ProjectDetails>
            </>
          )}

          {tab !== "Overview" && (
            <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
              <CardTitle $color={dims.textPrimary}>{tab}</CardTitle>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  color: dims.textSecondary,
                  marginTop: 10,
                }}
              >
                The <strong>{tab}</strong> tab content for roadtrip-copilot.
                Switch to <strong>Overview</strong> to see the full project
                layout.
              </p>
            </Card>
          )}
        </Page>
      )}
    </PageFrame>
  );
}
