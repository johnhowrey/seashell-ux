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

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 28px;
`;

const GreetH1 = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0;
`;

const GreetSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin: 0;
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
  margin-bottom: 10px;
`;

const SuggestTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const SuggestSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.45;
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

const suggestions = [
  {
    href: "/droplets",
    icon: "○",
    iconBg: "#dbeafe",
    iconColor: "#1e40af",
    title: "Manage Droplets",
    sub: "12 running across 3 regions. View health and resize plans.",
  },
  {
    href: "/database/create",
    icon: "▤",
    iconBg: "#fef3c7",
    iconColor: "#a16207",
    title: "Add a managed database",
    sub: "Spin up Postgres, MongoDB, MySQL, or Redis in minutes.",
  },
  {
    href: "/playground",
    icon: "✦",
    iconBg: "#ede9fe",
    iconColor: "#6d28d9",
    title: "Try the AI playground",
    sub: "Compare 5 inference models. Deploy the winner with one click.",
  },
  {
    href: "/onboarding",
    icon: "→",
    iconBg: "#dcfce7",
    iconColor: "#15803d",
    title: "Invite your team",
    sub: "Add teammates and assign roles to ship faster.",
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
            <GreetH1 $color={dims.textPrimary}>
              Good morning, John 👋
            </GreetH1>
            <GreetSub $color={dims.textSecondary}>
              Here&rsquo;s what&rsquo;s happening across your workspaces today.
            </GreetSub>
          </Greeting>

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
                    Suggested next actions
                  </SectionTitle>
                </SectionHead>
                <SuggestGrid>
                  {suggestions.map((s) => (
                    <SuggestCard
                      key={s.title}
                      href={s.href}
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                      $accent={dims.accent}
                    >
                      <SuggestIcon $bg={s.iconBg} $color={s.iconColor}>
                        {s.icon}
                      </SuggestIcon>
                      <SuggestTitle $color={dims.textPrimary}>
                        {s.title}
                      </SuggestTitle>
                      <SuggestSub $color={dims.textSecondary}>
                        {s.sub}
                      </SuggestSub>
                    </SuggestCard>
                  ))}
                </SuggestGrid>
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
