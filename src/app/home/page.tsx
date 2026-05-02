"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";
import type { ShellDims } from "@/lib/theme";

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px 40px 80px;
`;

// "Hey, John. Hope your week's been going well." — small standup-style
// greeting that sets the conversational tone borrowed from the DO Next
// vision. The big block underneath does the work of telling the user
// what's up in plain prose with inline-bold action terms.
const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

const GreetH1 = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.$color};
  margin: 0;
`;

const StandupLead = styled.h1<{ $color: string }>`
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: -0.4px;
  color: ${(p) => p.$color};
  margin: 0 0 22px;
  max-width: 780px;

  strong {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
`;

// AI-tool pill — gradient outline + monospace ALL CAPS label + leading
// "+" glyph. Same shape as the live "STORAGE MONITOR" / "MIGRATION
// ASSISTANT" callouts in the DO Next dashboard.
const AgentPill = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px 5px 8px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    ${(p) => p.$accent}1a 0%,
    ${(p) => p.$accent}33 100%
  );
  border: 1px solid ${(p) => p.$accent}55;
  color: ${(p) => p.$accent};
  font-family: var(--font-jetbrains-mono), "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  vertical-align: middle;

  &::before {
    content: "+";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: ${(p) => p.$accent};
    color: #ffffff;
    font-weight: 700;
    font-size: 11px;
    line-height: 1;
  }
`;

const ItemReason = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: ${(p) => p.$color};
  margin-top: 6px;

  strong {
    font-weight: 600;
    color: inherit;
  }
`;

const MintPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.85;
  }
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const KpiCard = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
`;

const KpiLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const KpiLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
`;

const KpiChip = styled.span<{ $bg: string; $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
`;

const KpiValue = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
  color: ${(p) => p.$color};
`;

const KpiDelta = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const Cols = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2<{ $color: string }>`
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

const ActivityRow = styled.div<{ $border: string }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const Dot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  margin-top: 6px;
  flex-shrink: 0;
`;

const ActText = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActMain = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const ActMeta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const SuggestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

// No border — the focus block just sits in flow with whitespace above
// and below.  The surface tone is a hair off the page bg so it still
// reads as a distinct block without a hard outline.
const FocusBlock = styled.div<{ $surface: string; $border: string }>`
  padding: 4px 0 28px;
`;

const FocusLead = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.5;
  color: ${(p) => p.$color};
  margin: 0 0 18px;

  strong {
    font-weight: 700;
  }
`;

const FocusActions = styled.div`
  display: flex;
  align-items: center;
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

// No outer card — rows just stack in flow.  Separation between rows is a
// single hairline.  No background, no wrapping border, no rounded corners.
const ItemList = styled.div`
  margin-bottom: 28px;
`;

const ItemRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid ${(p) => p.$border};
  &:first-child { border-top: none; padding-top: 8px; }
`;

const ItemChip = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.2px;
  text-align: center;
  white-space: nowrap;
`;

const ItemText = styled.div`
  min-width: 0;
`;

const ItemTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 3px;
`;

const ItemEvidence = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12.5px;
  line-height: 1.45;
  color: ${(p) => p.$color};
`;

const ItemVerbLink = styled(Link)<{ $accent: string }>`
  padding: 8px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: 1px solid ${(p) => p.$accent};
  border-radius: 7px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  &:hover { filter: brightness(0.95); }
`;

const FocusMore = styled.details<{ $color: string }>`
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

const SnapshotDetails = styled.details<{ $color: string }>`
  margin-top: 18px;
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

const SuggestCard = styled(Link)<{ $surface: string; $border: string; $accent: string }>`
  display: block;
  padding: 14px 16px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${(p) => p.$accent};
    transform: translateY(-1px);
  }
`;

const SuggestHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
`;

const SuggestIcon = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-size: 16px;
  flex-shrink: 0;
`;

const SuggestChip = styled.span<{ $bg: string; $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.2px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const SuggestTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-bottom: 4px;
  line-height: 1.35;
`;

const SuggestSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.5;
  margin-bottom: 10px;
`;

const SuggestCta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const Checklist = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChecklistItem = styled.li<{ $border: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const ChecklistBox = styled.span<{ $done: boolean; $accent: string; $border: string }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1.5px solid ${(p) => (p.$done ? p.$accent : p.$border)};
  background: ${(p) => (p.$done ? p.$accent : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 12px;
  flex-shrink: 0;
`;

const ChecklistLabel = styled.span<{ $done: boolean; $color: string; $muted: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => (p.$done ? p.$muted : p.$color)};
  text-decoration: ${(p) => (p.$done ? "line-through" : "none")};
  flex: 1;
`;

const ProgressBar = styled.div<{ $border: string }>`
  height: 6px;
  background: ${(p) => p.$border};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressFill = styled.div<{ $pct: number; $accent: string }>`
  height: 100%;
  width: ${(p) => p.$pct}%;
  background: ${(p) => p.$accent};
  transition: width 0.3s ease;
`;

const WorkspaceList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const WsCard = styled(Link)<{ $surface: string; $border: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover { border-color: rgba(0, 0, 0, 0.2); }
`;

const WsTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WsAvatar = styled.span<{ $bg: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
`;

const WsName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const WsMeta = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const activity: { dot: string; label: string; meta: string; color: string }[] = [
  { dot: "#10b981", label: "Deployed roadtrip-copilot v2.4 to production", meta: "Production · 8 minutes ago", color: "#10b981" },
  { dot: "#0ea5e9", label: "Created Droplet web-prod-3 (4 vCPU / 8 GB / NYC1)", meta: "John Howrey · 24 minutes ago", color: "#0ea5e9" },
  { dot: "#f59e0b", label: "Auto-scaled copilot-app-nyc1 from 3 → 5 nodes", meta: "AI Agent · 1 hour ago", color: "#f59e0b" },
  { dot: "#ef4444", label: "CPU alert resolved on copilot-droplet-01", meta: "Monitoring · 3 hours ago", color: "#ef4444" },
  { dot: "#8b5cf6", label: "Alex Chen joined Platform Engineering as Developer", meta: "Yesterday at 4:12pm", color: "#8b5cf6" },
  { dot: "#0ea5e9", label: "Database vacuum completed for copilot-db-prod", meta: "Yesterday at 2:08am", color: "#0ea5e9" },
];

// Each recommendation must answer "why is this on MY screen?" with a
// specific evidence statement tied to this workspace's state. Outcome
// (the result) leads the title; evidence is the sub-line.
const suggestions = [
  {
    href: "/droplets",
    chip: { label: "Save $18 / mo", bg: "#dcfce7", color: "#166534" },
    icon: "○",
    iconBg: "#dbeafe",
    iconColor: "#1e40af",
    title: "Right-size 2 idle Droplets",
    sub: "web-dev-1 and web-dev-2 averaged 4% CPU over the last 30 days. Dropping to s-1vcpu-1gb covers the load.",
    cta: "Review droplets →",
  },
  {
    href: "/droplets/web-prod-1",
    chip: { label: "Data at risk", bg: "#fee2e2", color: "#991b1b" },
    icon: "⛌",
    iconBg: "#fef3c7",
    iconColor: "#a16207",
    title: "Add backups to 4 unprotected Droplets",
    sub: "main-postgres, web-prod-1, web-prod-2, and api-server have no snapshot policy. Nightly is $1.20 / mo each.",
    cta: "Enable backups →",
  },
  {
    href: "/playground",
    chip: { label: "60% faster", bg: "#ede9fe", color: "#5b21b6" },
    icon: "✦",
    iconBg: "#ede9fe",
    iconColor: "#6d28d9",
    title: "Move llama-3-endpoint off serverless",
    sub: "Your inference is averaging 320 ms p95. A dedicated SFO3 instance has been hitting 130 ms for similar traffic shapes.",
    cta: "See dedicated plans →",
  },
  {
    href: "/onboarding",
    chip: { label: "Unblock 3 PRs", bg: "#dbeafe", color: "#1e40af" },
    icon: "→",
    iconBg: "#dcfce7",
    iconColor: "#15803d",
    title: "Add Jane Park to Acme Corp",
    sub: "She's been requested as reviewer on 3 PRs in roadtrip-copilot but isn't on the team yet — invites are pending since Tuesday.",
    cta: "Send invite →",
  },
];

const checklist = [
  { label: "Verify your email", done: true },
  { label: "Create your first project", done: true },
  { label: "Deploy a Droplet or App", done: true },
  { label: "Invite a teammate", done: false },
  { label: "Set up billing alerts", done: false },
];

const workspaces = [
  { name: "Acme Corp", role: "Owner · 24 members", bg: "#0061eb" },
  { name: "Roadtrip Studio", role: "Admin · 5 members", bg: "#7c3aed" },
  { name: "Personal", role: "Owner · just you", bg: "#10b981" },
];

export default function WorkspaceHomePage() {
  const doneCount = checklist.filter((c) => c.done).length;
  const pct = (doneCount / checklist.length) * 100;

  return (
    <PageFrame breadcrumbs={["Acme Corp", "Home"]}>
      {({ dims, isDark }) => (
        <Page>
          <Greeting>
            <GreetH1 $color={dims.textSecondary}>
              Hey, John. Hope your week&rsquo;s been going well.
            </GreetH1>
          </Greeting>

          <StandupLead $color={dims.textPrimary}>
            <AgentPill $accent={dims.accent}>Cost Optimizer</AgentPill>{" "}
            spotted <strong>$18 / month</strong> in idle compute, your{" "}
            <strong>4 production Droplets</strong> still need backups, and{" "}
            <strong>llama-3 inference</strong> is running 60% slower than it
            could on a dedicated SFO3 instance.
          </StandupLead>

          <FocusBlock $surface={dims.surfaceBg} $border={dims.borderLight}>
            <FocusActions>
              <FocusPrimaryBtn $accent={dims.accent} type="button">
                Let AI handle the 3 routine ones
              </FocusPrimaryBtn>
              <FocusGhostBtn
                $color={dims.textPrimary}
                $border={dims.borderLight}
                type="button"
              >
                Snooze them all for the week
              </FocusGhostBtn>
            </FocusActions>
          </FocusBlock>

          <ItemList>
            <ItemRow $border={dims.borderLight}>
              <ItemChip $bg={dims.mintSoft} $color={dims.mintInk}>
                $18 / mo
              </ItemChip>
              <ItemText>
                <ItemTitle $color={dims.textPrimary}>
                  Right-size 2 idle Droplets
                </ItemTitle>
                <ItemEvidence $color={dims.textSecondary}>
                  web-dev-1 + web-dev-2 averaged 4% CPU over the last 30 days.
                </ItemEvidence>
                <ItemReason $color={dims.textMuted}>
                  <strong>Why this?</strong> Cost Optimizer flagged sustained
                  &lt; 5% CPU on production-tagged droplets — high confidence
                  the workload fits a smaller plan.
                </ItemReason>
              </ItemText>
              <ItemVerbLink href="/droplets" $accent={dims.accent}>
                Right-size
              </ItemVerbLink>
            </ItemRow>

            <ItemRow $border={dims.borderLight}>
              <ItemChip $bg="#fee2e2" $color="#991b1b">
                Risk
              </ItemChip>
              <ItemText>
                <ItemTitle $color={dims.textPrimary}>
                  Add backups to 4 unprotected Droplets
                </ItemTitle>
                <ItemEvidence $color={dims.textSecondary}>
                  main-postgres, web-prod-1/2, api-server. Nightly is $1.20 / mo each.
                </ItemEvidence>
                <ItemReason $color={dims.textMuted}>
                  <strong>Why this?</strong> Production tag with no snapshot
                  policy. Teams of your size keep nightly backups on 96% of
                  prod resources.
                </ItemReason>
              </ItemText>
              <ItemVerbLink href="/droplets/web-prod-1" $accent={dims.accent}>
                Enable
              </ItemVerbLink>
            </ItemRow>

            <ItemRow $border={dims.borderLight}>
              <ItemChip $bg="#ede9fe" $color="#5b21b6">
                60% faster
              </ItemChip>
              <ItemText>
                <ItemTitle $color={dims.textPrimary}>
                  Move llama-3-endpoint off serverless
                </ItemTitle>
                <ItemEvidence $color={dims.textSecondary}>
                  320 ms p95 today. A dedicated SFO3 instance hits 130 ms.
                </ItemEvidence>
                <ItemReason $color={dims.textMuted}>
                  <strong>Why this?</strong> Your traffic shape (steady 40
                  req/s) is the cutover point where dedicated beats
                  serverless on both latency and cost.
                </ItemReason>
              </ItemText>
              <ItemVerbLink href="/playground" $accent={dims.accent}>
                See plans
              </ItemVerbLink>
            </ItemRow>

            <ItemRow $border={dims.borderLight}>
              <ItemChip $bg="#dbeafe" $color="#1e40af">
                Unblock 3 PRs
              </ItemChip>
              <ItemText>
                <ItemTitle $color={dims.textPrimary}>
                  Add Jane Park to Acme Corp
                </ItemTitle>
                <ItemEvidence $color={dims.textSecondary}>
                  Requested as reviewer on 3 PRs in roadtrip-copilot since
                  Tuesday.
                </ItemEvidence>
                <ItemReason $color={dims.textMuted}>
                  <strong>Why this?</strong> Three PRs sat idle for 4+ days
                  waiting on a reviewer who isn&rsquo;t on the team yet.
                </ItemReason>
              </ItemText>
              <ItemVerbLink href="/onboarding" $accent={dims.accent}>
                Invite
              </ItemVerbLink>
            </ItemRow>
          </ItemList>

          <MintPill $bg={dims.mintSoft} $color={dims.mintInk}>
            All 4 routine items are agent-handleable with high confidence
          </MintPill>

          <SnapshotDetails $color={dims.textMuted}>
            <summary>Today&rsquo;s snapshot — KPIs, recent activity, spend, getting started</summary>

          <KpiGrid>
            <KpiTile
              dims={dims}
              isDark={isDark}
              label="Active resources"
              value="12"
              delta="+2 this week"
              chip={null}
              sparkline={[7, 7, 8, 8, 9, 9, 10, 10, 11, 12, 12, 12]}
              sparkColor="#0ea5e9"
            />
            <KpiTile
              dims={dims}
              isDark={isDark}
              label="Spend this month"
              value="$284.30"
              delta="$1,012 forecast"
              chip={{ label: "On track", bg: "#dcfce7", color: "#166534" }}
              sparkline={[
                12, 28, 45, 64, 88, 110, 138, 164, 192, 224, 256, 284,
              ]}
              sparkColor="#10b981"
            />
            <KpiTile
              dims={dims}
              isDark={isDark}
              label="Healthy services"
              value="98%"
              delta="↑ 0.4% from last week"
              chip={null}
              sparkline={[
                97.4, 97.6, 97.5, 97.8, 97.6, 97.9, 98.0, 97.9, 98.1, 98.0,
                98.2, 98.0,
              ]}
              sparkColor="#22c55e"
            />
            <KpiTile
              dims={dims}
              isDark={isDark}
              label="Open alerts"
              value="3"
              delta="2 high priority"
              chip={{ label: "Action needed", bg: "#fee2e2", color: "#991b1b" }}
              sparkline={[8, 6, 7, 5, 4, 6, 5, 4, 3, 5, 4, 3]}
              sparkColor="#ef4444"
            />
          </KpiGrid>

          <Cols>
            <div>
              <Section $surface={dims.surfaceBg} $border={dims.borderLight}>
                <SectionHead>
                  <SectionTitle $color={dims.textPrimary}>
                    Recent activity
                  </SectionTitle>
                  <SeeAll href="/notifications" $accent={dims.accent}>
                    View all →
                  </SeeAll>
                </SectionHead>
                {activity.map((a, i) => (
                  <ActivityRow key={i} $border={dims.borderLight}>
                    <Dot $color={a.dot} />
                    <ActText>
                      <ActMain $color={dims.textPrimary}>{a.label}</ActMain>
                      <ActMeta $color={dims.textMuted}>{a.meta}</ActMeta>
                    </ActText>
                  </ActivityRow>
                ))}
              </Section>

              <Section $surface={dims.surfaceBg} $border={dims.borderLight}>
                <SectionHead>
                  <SectionTitle $color={dims.textPrimary}>
                    Your workspaces
                  </SectionTitle>
                  <SeeAll href="/onboarding" $accent={dims.accent}>
                    Create new →
                  </SeeAll>
                </SectionHead>
                <WorkspaceList>
                  {workspaces.map((w) => (
                    <WsCard
                      key={w.name}
                      href="/project"
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                    >
                      <WsTop>
                        <WsAvatar $bg={w.bg}>{w.name[0]}</WsAvatar>
                        <WsName $color={dims.textPrimary}>{w.name}</WsName>
                      </WsTop>
                      <WsMeta $color={dims.textMuted}>{w.role}</WsMeta>
                    </WsCard>
                  ))}
                </WorkspaceList>
              </Section>
            </div>

            <div>
              <Section $surface={dims.surfaceBg} $border={dims.borderLight}>
                <SectionHead>
                  <SectionTitle $color={dims.textPrimary}>
                    Getting started
                  </SectionTitle>
                  <span
                    style={{
                      fontSize: 12,
                      color: dims.textMuted,
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {doneCount}/{checklist.length}
                  </span>
                </SectionHead>
                <ProgressBar $border={dims.borderLight}>
                  <ProgressFill $pct={pct} $accent={dims.accent} />
                </ProgressBar>
                <Checklist>
                  {checklist.map((c) => (
                    <ChecklistItem key={c.label} $border={dims.borderLight}>
                      <ChecklistBox
                        $done={c.done}
                        $accent={dims.accent}
                        $border={isDark ? "#5a5a66" : "#c8c8d0"}
                      >
                        {c.done ? "✓" : ""}
                      </ChecklistBox>
                      <ChecklistLabel
                        $done={c.done}
                        $color={dims.textPrimary}
                        $muted={dims.textMuted}
                      >
                        {c.label}
                      </ChecklistLabel>
                    </ChecklistItem>
                  ))}
                </Checklist>
              </Section>

              <Section $surface={dims.surfaceBg} $border={dims.borderLight}>
                <SectionHead>
                  <SectionTitle $color={dims.textPrimary}>
                    This month&rsquo;s spend
                  </SectionTitle>
                </SectionHead>
                <SpendStack>
                  {[
                    { label: "Compute", value: 142, pct: 50, color: "#0ea5e9" },
                    { label: "Database", value: 76, pct: 27, color: "#10b981" },
                    { label: "Storage", value: 38, pct: 13, color: "#f59e0b" },
                    { label: "Networking", value: 28.3, pct: 10, color: "#a855f7" },
                  ].map((s) => (
                    <SpendRow key={s.label}>
                      <SpendBar>
                        <SpendBarLabel $color={dims.textPrimary}>
                          {s.label}
                        </SpendBarLabel>
                        <SpendBarValue $color={dims.textSecondary}>
                          ${s.value.toFixed(2)}
                        </SpendBarValue>
                      </SpendBar>
                      <SpendTrack $border={dims.borderLight}>
                        <SpendFill $pct={s.pct} $color={s.color} />
                      </SpendTrack>
                    </SpendRow>
                  ))}
                </SpendStack>
              </Section>
            </div>
          </Cols>
          </SnapshotDetails>
        </Page>
      )}
    </PageFrame>
  );
}

const SpendStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SpendRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SpendBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SpendBarLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

const SpendBarValue = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const SpendTrack = styled.div<{ $border: string }>`
  height: 5px;
  background: ${(p) => p.$border};
  border-radius: 3px;
  overflow: hidden;
`;

const SpendFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${(p) => p.$pct}%;
  background: ${(p) => p.$color};
`;

interface KpiTileProps {
  dims: ShellDims;
  isDark: boolean;
  label: string;
  value: string;
  delta: string;
  chip: { label: string; bg: string; color: string } | null;
  sparkline: number[];
  sparkColor: string;
}

function KpiTile({
  dims,
  label,
  value,
  delta,
  chip,
  sparkline,
  sparkColor,
}: KpiTileProps) {
  const w = 280;
  const h = 36;
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline);
  const range = max - min || 1;
  const xStep = w / (sparkline.length - 1);
  const path = sparkline
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"}${(i * xStep).toFixed(1)},${(
          h -
          ((v - min) / range) * h
        ).toFixed(1)}`
    )
    .join(" ");
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <KpiCard $surface={dims.surfaceBg} $border={dims.borderLight}>
      <KpiLabelRow>
        <KpiLabel $color={dims.textMuted}>{label}</KpiLabel>
        {chip && (
          <KpiChip $bg={chip.bg} $color={chip.color}>
            {chip.label}
          </KpiChip>
        )}
      </KpiLabelRow>
      <KpiValue $color={dims.textPrimary}>{value}</KpiValue>
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ marginTop: 2, marginBottom: 2 }}
      >
        <defs>
          <linearGradient id={`kpi-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sparkColor} stopOpacity="0.32" />
            <stop offset="100%" stopColor={sparkColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#kpi-${id})`} />
        <path d={path} stroke={sparkColor} strokeWidth="1.5" fill="none" />
      </svg>
      <KpiDelta $color={dims.textMuted}>{delta}</KpiDelta>
    </KpiCard>
  );
}
