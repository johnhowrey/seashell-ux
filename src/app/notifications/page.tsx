"use client";

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";
import {
  notifications,
  notificationCategoryColors,
  NotifType,
} from "@/lib/theme";

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px 80px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PageH1 = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0;
`;

const SubMeta = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const GhostBtn = styled.button<{ $color: string; $border: string }>`
  padding: 8px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
`;

/* ─── Insights banner ─── */
const InsightsBanner = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: linear-gradient(
    103deg,
    ${(p) => p.$accent}10 0%,
    ${(p) => p.$accent}05 50%,
    rgba(16, 185, 129, 0.08) 100%
  );
  border: 1px solid ${(p) => p.$accent}33;
  border-radius: 12px;
  margin-bottom: 18px;
`;

const InsightIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const InsightHeading = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const InsightSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  line-height: 1.45;
`;

const InsightSparkline = styled.svg`
  width: 80px;
  height: 28px;
  margin-left: auto;
  flex-shrink: 0;
`;

/* ─── Inbox status ─── */
const InboxStatus = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 16px;
`;

const InboxStatusHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 12px;
`;

const InboxStatusH1 = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${(p) => p.$color};
`;

const InboxStatusSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const InboxBuckets = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const Bucket = styled.button<{ $bg: string; $border: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  background: ${(p) => p.$bg};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
  &:hover { transform: translateY(-1px); }
`;

const BucketLabel = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
`;

const BucketCount = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: ${(p) => p.$color};
`;

const BucketHint = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

/* ─── Filter controls (popover) ─── */
const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const FilterTrigger = styled.button<{ $color: string; $border: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;

  &:hover { filter: brightness(0.97); }
`;

const FilterPill = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${(p) => p.$accent}1c;
  color: ${(p) => p.$accent};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    padding: 0;
  }
`;

const PopWrap = styled.div`
  position: relative;
`;

const Popover = styled.div<{ $surface: string; $border: string }>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 30;
  width: 280px;
  padding: 12px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.12);
`;

const PopGroupLabel = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  margin: 8px 4px 6px;
  &:first-child { margin-top: 0; }
`;

/* ─── Resolution path ─── */
const ResolutionLine = styled.div<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  margin-bottom: 8px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2px;
`;

const ResolutionPathRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const PathBtn = styled.button<{
  $primary?: boolean;
  $color: string;
  $border: string;
  $accent: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  ${(p) =>
    p.$primary
      ? `background: ${p.$accent}; color: #ffffff; border: 1px solid ${p.$accent};`
      : `background: transparent; color: ${p.$color}; border: 1px solid ${p.$border};`}
`;

/* ─── Tabs ─── */
const TabRow = styled.div<{ $border: string }>`
  display: flex;
  gap: 2px;
  border-bottom: 1px solid ${(p) => p.$border};
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active: boolean; $color: string; $accent: string }>`
  padding: 10px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? p.$accent : "transparent")};
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  cursor: pointer;
  margin-bottom: -1px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const TabBadge = styled.span<{ $bg: string; $color: string }>`
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 999px;
  font-weight: 600;
`;

/* ─── Layout ─── */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterBlock = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 14px 16px;
`;

const FilterTitle = styled.h3<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  margin: 0 0 10px;
`;

const FilterButton = styled.button<{ $active: boolean; $accent: string; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 8px;
  background: ${(p) => (p.$active ? `${p.$accent}14` : "transparent")};
  border: none;
  border-radius: 5px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const FilterDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  display: inline-block;
  margin-right: 8px;
`;

const FilterCount = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

/* ─── Notification list ─── */
const ListCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  overflow: hidden;
`;

const Group = styled.div<{ $border: string }>`
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const GroupHead = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.02);
`;

const NotifRow = styled.div<{ $border: string; $unread: boolean; $hover: string }>`
  display: flex;
  gap: 14px;
  padding: 14px 20px;
  border-top: 1px solid ${(p) => p.$border};
  cursor: pointer;
  background: ${(p) => (p.$unread ? "rgba(0, 97, 235, 0.03)" : "transparent")};
  transition: background 0.1s ease;

  &:first-child { border-top: none; }
  &:hover { background: ${(p) => p.$hover}; }
`;

const NotifLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  width: 14px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  margin-top: 6px;
`;

const NotifBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotifMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`;

const NotifCategory = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
`;

const NotifTime = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const NotifTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const NotifSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const NotifActions = styled.div`
  display: flex;
  gap: 6px;
`;

const SmallBtn = styled.button<{ $primary?: boolean; $color: string; $border: string }>`
  padding: 5px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  background: ${(p) => (p.$primary ? "#1a1a1a" : "transparent")};
  color: ${(p) => (p.$primary ? "#ffffff" : p.$color)};
  border: 1px solid ${(p) => (p.$primary ? "transparent" : p.$border)};

  &:hover { filter: brightness(0.96); }
`;

/* ─── Preferences ─── */
const PrefSection = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
`;

const PrefTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 4px;
  color: ${(p) => p.$color};
`;

const PrefSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 0 0 16px;
`;

const ChannelRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 32px 1fr 60px;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const ChannelIcon = styled.span<{ $bg: string; $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ChannelName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const ChannelDesc = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const Toggle = styled.button<{ $on: boolean; $accent: string; $offBg: string }>`
  position: relative;
  width: 38px;
  height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$on ? p.$accent : p.$offBg)};
  transition: background 0.18s ease;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? "18px" : "2px")};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transition: left 0.18s cubic-bezier(0.2, 0, 0, 1);
  }
`;

/* ─── Rules table ─── */
const RuleHead = styled.div<{ $border: string; $color: string }>`
  display: grid;
  grid-template-columns: 1fr 80px 80px 80px 80px;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  text-align: center;

  & > :first-child { text-align: left; }
`;

const RuleRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 1fr 80px 80px 80px 80px;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  text-align: center;

  & > :first-child { text-align: left; }
  &:last-child { border-bottom: none; }
`;

const RuleName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Check = styled.button<{ $on: boolean; $accent: string; $border: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid ${(p) => (p.$on ? p.$accent : p.$border)};
  background: ${(p) => (p.$on ? p.$accent : "transparent")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 10px;
  margin: 0 auto;
`;

/* ─── Data helpers ─── */
const categoryFilters: { id: NotifType | "all"; label: string }[] = [
  { id: "all", label: "All notifications" },
  { id: "agentic", label: "AI Agent" },
  { id: "billing", label: "Billing" },
  { id: "infra", label: "Infrastructure" },
  { id: "security", label: "Security" },
  { id: "team", label: "Team" },
];

const channels = [
  { id: "email", icon: "✉", iconBg: "#dbeafe", iconColor: "#1e40af", name: "Email", desc: "john@acme.io · verified" },
  { id: "slack", icon: "#", iconBg: "#ede9fe", iconColor: "#6d28d9", name: "Slack", desc: "Acme workspace · #ops, #alerts" },
  { id: "sms", icon: "✆", iconBg: "#fef3c7", iconColor: "#a16207", name: "SMS", desc: "+1 (415) ••• 4242" },
  { id: "push", icon: "◉", iconBg: "#dcfce7", iconColor: "#15803d", name: "Push", desc: "iOS app · 1 device" },
  { id: "webhook", icon: "⌘", iconBg: "#fee2e2", iconColor: "#b91c1c", name: "Webhook", desc: "Not configured" },
];

const ruleCategories = [
  { id: "agentic", label: "AI Agent", color: "#8b5cf6" },
  { id: "billing", label: "Billing", color: "#10b981" },
  { id: "infra", label: "Infrastructure", color: "#f59e0b" },
  { id: "security", label: "Security", color: "#ef4444" },
  { id: "team", label: "Team", color: "#0ea5e9" },
];

/* ─── Focused queue ──────────────────────────────────────────────────
   The inbox is not a list. It is a small set of items waiting on the
   user. Everything the AI Agent already handled is summarized in one
   sentence and tucked behind a disclosure. Each remaining item appears
   one at a time. After the last one resolves, we say so and stop.
─────────────────────────────────────────────────────────────────────*/

type QueueKind = "ai" | "self";
interface QueueItem {
  kind: QueueKind;
  category: string; // pill text
  categoryColor: string;
  title: string;
  evidence: string;
  primary: string;
  secondary: string[];
  helpHint: string; // shown small under the buttons
}

const queueItems: QueueItem[] = [
  {
    kind: "ai",
    category: "AI Agent · waiting on you",
    categoryColor: "#6d28d9",
    title: "Apply the cost optimization?",
    evidence:
      "I want to retire web-dev-1 and web-dev-2 (4% avg CPU last 30 days) and right-size worker-prod-1. Saves $18 / month, takes about 90 seconds.",
    primary: "Yes, apply now",
    secondary: ["Show me what changes", "Skip"],
    helpHint: "Ask a question · Get help",
  },
  {
    kind: "ai",
    category: "AI Agent · waiting on you",
    categoryColor: "#6d28d9",
    title: "Block the IP that tried to brute-force you?",
    evidence:
      "192.168.14.22 (São Paulo) hit /login 47 times in 2 minutes. I can add a firewall rule across all production droplets.",
    primary: "Block it",
    secondary: ["Review the activity first", "Skip"],
    helpHint: "Ask a question · Get help",
  },
  {
    kind: "self",
    category: "Billing · needs you",
    categoryColor: "#047857",
    title: "Pay your February invoice",
    evidence: "$247.83 due Mar 15. Card on file ending in 4242 still works.",
    primary: "Pay now",
    secondary: ["Open invoice", "Snooze 3 days"],
    helpHint: "Ask a question",
  },
  {
    kind: "self",
    category: "Team · needs you",
    categoryColor: "#1d4ed8",
    title: "Set Alex Chen's role",
    evidence:
      "Alex joined Platform Engineering yesterday with default Developer access. Promote, restrict, or leave as-is.",
    primary: "Open team settings",
    secondary: ["Leave as Developer", "Snooze"],
    helpHint: "Ask a question",
  },
];

const handledSummary = [
  "Auto-scaled copilot-app-nyc1 from 3 → 5 nodes",
  "Scheduled vacuum on copilot-db-prod (34% fragmentation)",
  "Cleared the CPU alert on copilot-droplet-01",
  "Upgraded prod-k8s-cluster v1.29 → v1.30",
  "Configured nightly backups for 3 new volumes",
  "Applied $50 promotional credit to your account",
  "Filed creation notice for staging-environment",
];

// No surrounding box — focus block sits in flow with whitespace.
const FocusBlock = styled.div<{ $surface: string; $border: string }>`
  padding: 4px 0 20px;
  margin: 0 0 4px;
`;

const FocusLead = styled.h2<{ $color: string }>`
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0 0 18px;
  max-width: 780px;

  strong {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
`;

const InboxConfidencePill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.3px;
  margin-top: 6px;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.85;
  }
`;

const FocusActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FocusPrimaryBtn = styled.button<{ $accent: string }>`
  padding: 9px 16px;
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
  padding: 9px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 7px;
  cursor: pointer;
`;

// Rows stack with hairline dividers; no wrapping card.
const ItemList = styled.div<{ $surface: string; $border: string }>``;

const ItemRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 92px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid ${(p) => p.$border};
  &:first-child { border-top: none; padding-top: 8px; }
`;

const ItemVerb = styled.button<{ $accent: string }>`
  padding: 8px 0;
  width: 92px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: 1px solid ${(p) => p.$accent};
  border-radius: 7px;
  cursor: pointer;
  text-align: center;
  &:hover { filter: brightness(0.95); }
`;

const ItemText = styled.div`
  min-width: 0;
`;

const ItemHeading = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 3px;
`;

const ItemKindPill = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

const ItemEvidence = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12.5px;
  line-height: 1.45;
  color: ${(p) => p.$color};
`;

const ItemSnooze = styled.button<{ $color: string }>`
  background: none;
  border: none;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  cursor: pointer;
  padding: 4px 8px;
  &:hover { text-decoration: underline; }
`;

const QueueCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  padding: 28px 32px;
  max-width: 640px;
  margin: 12px auto 24px;
`;

const QueueProgress = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(p) => p.$color};
  margin-bottom: 14px;
`;

const QueueCategory = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-bottom: 8px;
`;

const QueueTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.3;
  color: ${(p) => p.$color};
  margin-bottom: 10px;
`;

const QueueEvidence = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: ${(p) => p.$color};
  margin-bottom: 22px;
`;

const QueueActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const PrimaryBtn = styled.button<{ $accent: string }>`
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

const SecondaryBtn = styled.button<{ $color: string; $border: string }>`
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

const QueueHelpHint = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};

  a {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InboxLead = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.55;
  color: ${(p) => p.$color};
  max-width: 640px;
  margin: 4px auto 4px;
  text-align: center;
`;

const InboxLeadH = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.25;
  color: ${(p) => p.$color};
  max-width: 640px;
  margin: 32px auto 14px;
  text-align: center;
`;

const HandledSection = styled.details<{ $color: string }>`
  max-width: 640px;
  margin: 20px auto 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};

  summary {
    cursor: pointer;
    list-style: none;
    text-align: center;
    padding: 8px;
    color: inherit;
    text-decoration: underline;
  }
  summary::-webkit-details-marker { display: none; }
`;

const HandledList = styled.ul<{ $color: string; $border: string }>`
  list-style: none;
  margin: 12px 0 0;
  padding: 12px 16px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  color: ${(p) => p.$color};
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    gap: 8px;
    align-items: baseline;
    line-height: 1.45;
  }
  li::before {
    content: "✓";
    color: #15803d;
    font-weight: 700;
    flex-shrink: 0;
  }
`;

import type { ShellDims } from "@/lib/theme";

interface InboxQueueProps {
  dims: ShellDims;
  isDark: boolean;
}

const InboxQueue: React.FC<InboxQueueProps> = ({ dims }) => {
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const handledCount = handledSummary.length;
  const total = queueItems.length;
  const aiIndices = queueItems
    .map((q, i) => ({ q, i }))
    .filter((x) => x.q.kind === "ai")
    .map((x) => x.i);
  const remainingAi = aiIndices.filter((i) => !resolved.has(i));
  const remaining = queueItems
    .map((_, i) => i)
    .filter((i) => !resolved.has(i));

  const resolveOne = (i: number) =>
    setResolved((s) => {
      const ns = new Set(s);
      ns.add(i);
      return ns;
    });
  const resolveMany = (idxs: number[]) =>
    setResolved((s) => {
      const ns = new Set(s);
      idxs.forEach((i) => ns.add(i));
      return ns;
    });

  if (remaining.length === 0) {
    return (
      <FocusBlock
        $surface={dims.surfaceBg}
        $border={dims.borderLight}
      >
        <FocusLead $color={dims.textPrimary}>
          Inbox zero. Your AI Agent handled the rest.
        </FocusLead>
      </FocusBlock>
    );
  }

  return (
    <>
      <FocusBlock $surface={dims.surfaceBg} $border={dims.borderLight}>
        <FocusLead $color={dims.textPrimary}>
          Phew — your agent already cleared{" "}
          <strong>{handledCount} of {handledCount + total}</strong>.{" "}
          {remaining.length === 1
            ? "One needs a yes from you,"
            : `${remaining.length} need a yes from you,`}{" "}
          then you&rsquo;re done.
        </FocusLead>
        <FocusActions>
          {remainingAi.length > 0 && (
            <FocusPrimaryBtn
              $accent={dims.accent}
              type="button"
              onClick={() => resolveMany(remainingAi)}
            >
              Approve {remainingAi.length === 1 ? "the AI suggestion" : `all ${remainingAi.length} AI suggestions`}
            </FocusPrimaryBtn>
          )}
          <FocusGhostBtn
            $color={dims.textPrimary}
            $border={dims.borderLight}
            type="button"
            onClick={() => resolveMany(remaining)}
          >
            Snooze them all for the week
          </FocusGhostBtn>
        </FocusActions>
      </FocusBlock>

      <ItemList $surface={dims.surfaceBg} $border={dims.borderLight}>
        {queueItems.map((item, i) => {
          const isResolved = resolved.has(i);
          if (isResolved) return null;
          return (
            <ItemRow key={i} $border={dims.borderLight}>
              <ItemVerb
                $accent={dims.accent}
                onClick={() => resolveOne(i)}
                type="button"
                title={item.primary}
              >
                {primaryVerb(item.primary)}
              </ItemVerb>
              <ItemText>
                <ItemHeading $color={dims.textPrimary}>
                  <ItemKindPill $color={item.categoryColor}>
                    {item.category.split(" · ")[0]}
                  </ItemKindPill>
                  {item.title}
                </ItemHeading>
                <ItemEvidence $color={dims.textSecondary}>
                  {item.evidence}
                </ItemEvidence>
                {item.kind === "ai" && (
                  <InboxConfidencePill
                    $bg={dims.mintSoft}
                    $color={dims.mintInk}
                  >
                    High confidence
                  </InboxConfidencePill>
                )}
              </ItemText>
              <ItemSnooze
                $color={dims.textMuted}
                onClick={() => resolveOne(i)}
                type="button"
                aria-label="Snooze"
              >
                Snooze
              </ItemSnooze>
            </ItemRow>
          );
        })}
      </ItemList>

      <HandledSection $color={dims.textMuted}>
        <summary>
          Show what the agent already handled ({handledCount})
        </summary>
        <HandledList $color={dims.textSecondary} $border={dims.borderLight}>
          {handledSummary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </HandledList>
      </HandledSection>
    </>
  );
};

// Distill the verbose `primary` field into a single-word verb for the
// inline button. Falls back to the first word otherwise.
function primaryVerb(primary: string): string {
  const lower = primary.toLowerCase();
  if (lower.startsWith("yes")) return "Approve";
  if (lower.startsWith("block")) return "Block";
  if (lower.startsWith("pay")) return "Pay";
  if (lower.startsWith("open")) return "Open";
  return primary.split(" ")[0];
}

export default function NotificationsCenterPage() {
  const [tab, setTab] = useState<"inbox" | "preferences">("inbox");
  const [filter, setFilter] = useState<NotifType | "all">("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Flatten the grouped notifications, preserving group label.
  const allNotifs = useMemo(
    () =>
      notifications.flatMap((g) =>
        g.items.map((n) => ({ ...n, group: g.group }))
      ),
    []
  );

  const filtered = useMemo(() => {
    return allNotifs.filter((n) => {
      if (tab === "inbox" && readIds.has(n.id)) return false;
      if (filter !== "all" && n.type !== filter) return false;
      return true;
    });
  }, [allNotifs, filter, tab, readIds]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const n of filtered) {
      if (!groups[n.group]) groups[n.group] = [];
      groups[n.group].push(n);
    }
    return groups;
  }, [filtered]);

  const counts = useMemo(() => {
    const out: Record<string, number> = {
      all: 0,
      agentic: 0,
      billing: 0,
      infra: 0,
      security: 0,
      team: 0,
    };
    for (const n of allNotifs) {
      out.all += 1;
      out[n.type] = (out[n.type] || 0) + 1;
    }
    return out;
  }, [allNotifs]);

  const unreadCount = allNotifs.filter((n) => !readIds.has(n.id)).length;

  const [activeChannels, setActiveChannels] = useState<Set<string>>(
    new Set(["email", "slack", "push"])
  );
  const toggleChannel = (id: string) =>
    setActiveChannels((s) => {
      const ns = new Set(s);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });

  const [rules, setRules] = useState<Record<string, Set<string>>>(() => ({
    agentic: new Set(["email", "slack"]),
    billing: new Set(["email"]),
    infra: new Set(["email", "slack", "push"]),
    security: new Set(["email", "slack", "sms", "push"]),
    team: new Set(["email"]),
  }));
  const toggleRule = (cat: string, ch: string) =>
    setRules((r) => {
      const ns = new Set(r[cat]);
      if (ns.has(ch)) ns.delete(ch);
      else ns.add(ch);
      return { ...r, [cat]: ns };
    });

  return (
    <PageFrame breadcrumbs={["Acme Corp", "Notifications"]}>
      {({ dims, isDark }) => (
        <Page>
          <TopRow>
            <TitleGroup>
              <PageH1 $color={dims.textPrimary}>
                {tab === "preferences" ? "Notification preferences" : "Notifications"}
              </PageH1>
            </TitleGroup>
            <Actions>
              {tab === "preferences" ? (
                <GhostBtn
                  $color={dims.textPrimary}
                  $border={dims.borderLight}
                  onClick={() => setTab("inbox")}
                >
                  ← Back to inbox
                </GhostBtn>
              ) : (
                <GhostBtn
                  $color={dims.textPrimary}
                  $border={dims.borderLight}
                  onClick={() => setTab("preferences")}
                >
                  Preferences
                </GhostBtn>
              )}
            </Actions>
          </TopRow>

          {tab === "inbox" && (
            <InboxQueue dims={dims} isDark={isDark} />
          )}

          {tab === "preferences" && (
            <div style={{ maxWidth: 720 }}>
              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>
                  Delivery channels
                </PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Where notifications are delivered. Per-category rules below
                  override these defaults.
                </PrefSub>
                {channels.map((c) => (
                  <ChannelRow key={c.id} $border={dims.borderLight}>
                    <ChannelIcon $bg={c.iconBg} $color={c.iconColor}>
                      {c.icon}
                    </ChannelIcon>
                    <ChannelInfo>
                      <ChannelName $color={dims.textPrimary}>
                        {c.name}
                      </ChannelName>
                      <ChannelDesc $color={dims.textMuted}>
                        {c.desc}
                      </ChannelDesc>
                    </ChannelInfo>
                    <Toggle
                      $on={activeChannels.has(c.id)}
                      $accent={dims.accent}
                      $offBg={isDark ? "#3a3a44" : "#cbd5e1"}
                      onClick={() => toggleChannel(c.id)}
                      aria-pressed={activeChannels.has(c.id)}
                      type="button"
                    />
                  </ChannelRow>
                ))}
              </PrefSection>

              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>
                  Per-category rules
                </PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Choose which channels get which categories. Security
                  alerts always go to Email — for safety reasons that one
                  can&rsquo;t be turned off.
                </PrefSub>
                <RuleHead $border={dims.borderLight} $color={dims.textMuted}>
                  <span>Category</span>
                  <span>Email</span>
                  <span>Slack</span>
                  <span>SMS</span>
                  <span>Push</span>
                </RuleHead>
                {ruleCategories.map((rc) => (
                  <RuleRow key={rc.id} $border={dims.borderLight}>
                    <RuleName $color={dims.textPrimary}>
                      <FilterDot $color={rc.color} />
                      {rc.label}
                    </RuleName>
                    {(["email", "slack", "sms", "push"] as const).map((ch) => {
                      const locked = rc.id === "security" && ch === "email";
                      const on = rules[rc.id]?.has(ch);
                      return (
                        <Check
                          key={ch}
                          $on={!!on}
                          $accent={locked ? "#94a3b8" : dims.accent}
                          $border={isDark ? "#5a5a66" : "#c8c8d0"}
                          onClick={() =>
                            !locked && toggleRule(rc.id, ch)
                          }
                          aria-pressed={!!on}
                          aria-label={`${rc.label} → ${ch}`}
                          type="button"
                          style={{
                            cursor: locked ? "not-allowed" : "pointer",
                            opacity: locked ? 0.6 : 1,
                          }}
                        >
                          {on ? "✓" : ""}
                        </Check>
                      );
                    })}
                  </RuleRow>
                ))}
              </PrefSection>

              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>Quiet hours</PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Mute non-critical notifications outside these hours.
                  Critical security and incident alerts always come through.
                </PrefSub>
                <ChannelRow $border={dims.borderLight}>
                  <ChannelIcon $bg="#fef3c7" $color="#a16207">
                    ☾
                  </ChannelIcon>
                  <ChannelInfo>
                    <ChannelName $color={dims.textPrimary}>
                      Mute 10pm – 7am
                    </ChannelName>
                    <ChannelDesc $color={dims.textMuted}>
                      In your timezone (America/Los_Angeles)
                    </ChannelDesc>
                  </ChannelInfo>
                  <Toggle
                    $on
                    $accent={dims.accent}
                    $offBg={isDark ? "#3a3a44" : "#cbd5e1"}
                    type="button"
                  />
                </ChannelRow>
              </PrefSection>
            </div>
          )}
        </Page>
      )}
    </PageFrame>
  );
}
