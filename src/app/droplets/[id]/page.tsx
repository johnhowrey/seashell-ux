"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";

const Page = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 20px 32px 80px;
`;

const BackLink = styled(Link)<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$accent};
  text-decoration: none;
  margin-bottom: 12px;
  display: inline-block;
  &:hover { text-decoration: underline; }
`;

/* ─── Hero ─── */
const Hero = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const HeroAvatar = styled.div<{ $bg: string; $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
`;

const HeroInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeroNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

const HeroName = styled.h1<{ $color: string }>`
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

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 6px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
`;

const MetaItem = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionBtn = styled.button<{ $primary?: boolean; $accent: string; $border: string; $color: string }>`
  padding: 8px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$primary ? "transparent" : p.$border)};
  background: ${(p) => (p.$primary ? p.$accent : "transparent")};
  color: ${(p) => (p.$primary ? "#ffffff" : p.$color)};
  &:hover { filter: brightness(0.96); }
`;

/* ─── Tabs ─── */
const TabRow = styled.div<{ $border: string }>`
  display: flex;
  gap: 2px;
  border-bottom: 1px solid ${(p) => p.$border};
  margin-bottom: 20px;
  overflow-x: auto;
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
  white-space: nowrap;
  margin-bottom: -1px;
`;

/* ─── Layout ─── */
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

const SmallTabs = styled.div`
  display: flex;
  gap: 4px;
`;

const SmallTab = styled.button<{ $active: boolean; $accent: string; $color: string }>`
  padding: 4px 10px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? p.$accent : "transparent")};
  background: ${(p) => (p.$active ? `${p.$accent}14` : "transparent")};
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  border-radius: 5px;
  cursor: pointer;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 16px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Stat = styled.div<{ $surface: string; $border: string }>`
  padding: 12px 14px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
`;

const StatLabel = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  margin-bottom: 6px;
`;

const StatValue = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const StatTrack = styled.div<{ $border: string }>`
  height: 4px;
  background: ${(p) => p.$border};
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
`;

const StatFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${(p) => p.$pct}%;
  background: ${(p) => p.$color};
`;

/* ─── Chart ─── */
const ChartFrame = styled.div<{ $border: string }>`
  width: 100%;
  height: 180px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  padding: 8px;
  position: relative;
`;

/* ─── Uptime strip ─── */
const UptimeStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  gap: 3px;
  margin-bottom: 10px;
`;

const UptimeCell = styled.span<{ $color: string }>`
  width: 100%;
  height: 28px;
  border-radius: 3px;
  background: ${(p) => p.$color};
  display: inline-block;
`;

const UptimeLegend = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const UptimeKey = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span:not([class]) {
    margin-right: 6px;
  }
  & > span[class] {
    width: 10px;
    height: 10px;
  }
`;

/* ─── Activity ─── */
const ActivityItem = styled.div<{ $border: string }>`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const ActDot = styled.span<{ $color: string }>`
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
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const ActMeta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
  margin-top: 2px;
`;

/* ─── Right rail ─── */
const SummaryRow = styled.div<{ $border: string }>`
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  &:last-child { border-bottom: none; }
`;

const SumLabel = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
`;

const SumValue = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-weight: 500;
  text-align: right;
`;

const TagPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const Danger = styled.div<{ $border: string }>`
  border: 1px solid #fca5a5;
  background: #fef2f2;
  border-radius: 8px;
  padding: 14px 16px;
`;

const DangerTitle = styled.div`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #991b1b;
  margin-bottom: 4px;
`;

const DangerText = styled.div`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: #7f1d1d;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const DangerBtn = styled.button`
  padding: 6px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #991b1b;
  background: #ffffff;
  border: 1px solid #fca5a5;
  border-radius: 5px;
  cursor: pointer;

  &:hover { background: #fee2e2; }
`;

const TABS = [
  "Overview",
  "Graphs",
  "Networking",
  "Backups",
  "Snapshots",
  "Power",
  "Recovery",
  "Tags",
  "Settings",
];

/* SVG sparkline path generator */
function sparklinePath(points: number[], w: number, h: number, pad = 6) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const xStep = (w - pad * 2) / (points.length - 1);
  return points
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"}${(pad + i * xStep).toFixed(1)},${(
          h -
          pad -
          ((v - min) / range) * (h - pad * 2)
        ).toFixed(1)}`
    )
    .join(" ");
}

/* ─── Interactive chart with hover crosshair ─── */
interface ChartProps {
  id: string;
  label: string;
  series: number[];
  color: string;
  unit: string;
  muted: string;
  primary: string;
  border: string;
}

function Chart({ id, label, series, color, unit, muted, primary, border }: ChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const w = 360;
  const h = 180;
  const pad = 12;
  const xStep = (w - pad * 2) / (series.length - 1);
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    const idx = Math.max(
      0,
      Math.min(series.length - 1, Math.round((px - pad) / xStep))
    );
    setHover(idx);
  };

  const cx = hover !== null ? pad + hover * xStep : 0;
  const cy =
    hover !== null
      ? h - pad - ((series[hover] - min) / range) * (h - pad * 2)
      : 0;

  return (
    <ChartFrame $border={border}>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: muted,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </div>
      {hover !== null && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: primary,
          }}
        >
          {series[hover]}
          {unit}
          <span style={{ color: muted, fontWeight: 400, marginLeft: 6 }}>
            -{series.length - 1 - hover}h
          </span>
        </div>
      )}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        style={{ cursor: "crosshair" }}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${sparklinePath(series, w, h, pad)} L${w - pad},${h - pad} L${pad},${h - pad} Z`}
          fill={`url(#grad-${id})`}
        />
        <path
          d={sparklinePath(series, w, h, pad)}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        {hover !== null && (
          <>
            <line
              x1={cx}
              y1={pad}
              x2={cx}
              y2={h - pad}
              stroke={muted}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={cx} cy={cy} r="5" fill={color} stroke="#ffffff" strokeWidth="2" />
          </>
        )}
      </svg>
    </ChartFrame>
  );
}

const cpuSeries = [
  18, 24, 22, 28, 35, 42, 38, 45, 52, 48, 55, 61, 58, 49, 43, 47, 52, 58, 64,
  72, 68, 60, 54, 48,
];
const memSeries = [
  42, 44, 43, 46, 48, 51, 53, 55, 58, 60, 62, 64, 63, 65, 67, 65, 64, 66, 68,
  70, 72, 70, 68, 66,
];
const netSeries = [
  120, 145, 130, 168, 192, 210, 240, 220, 260, 280, 310, 295, 320, 340, 305,
  280, 260, 290, 310, 280, 250, 230, 210, 200,
];
const diskSeries = [
  10, 12, 11, 14, 16, 18, 17, 20, 22, 25, 28, 26, 30, 32, 28, 26, 24, 28, 30,
  29, 27, 25, 23, 22,
];

export default function DropletDetailPage() {
  const params = useParams<{ id: string }>();
  const id = (params?.id as string) || "web-prod-1";
  const [tab, setTab] = useState("Overview");
  const [range, setRange] = useState<"1h" | "24h" | "7d" | "30d">("24h");

  return (
    <PageFrame
      breadcrumbs={[
        "Acme Corp",
        "Platform Engineering",
        "roadtrip-copilot",
        "Droplets",
        id,
      ]}
    >
      {({ dims, isDark }) => (
        <Page>
          <BackLink href="/droplets" $accent={dims.accent}>
            ← Back to Droplets
          </BackLink>

          <Hero $surface={dims.surfaceBg} $border={dims.borderLight}>
            <HeroAvatar $bg="#dbeafe" $color="#1e40af">
              {id.slice(0, 2).toUpperCase()}
            </HeroAvatar>
            <HeroInfo>
              <HeroNameRow>
                <HeroName $color={dims.textPrimary}>{id}</HeroName>
                <StatusPill $bg="#dcfce7" $color="#166534">
                  Running
                </StatusPill>
                <StatusPill
                  $bg={isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9"}
                  $color={dims.textSecondary}
                >
                  4 vCPU / 8 GB
                </StatusPill>
              </HeroNameRow>
              <MetaRow>
                <MetaItem $color={dims.textMuted}>
                  IPv4{" "}
                  <code style={{ color: dims.textSecondary }}>
                    143.198.21.7
                  </code>
                </MetaItem>
                <MetaItem $color={dims.textMuted}>
                  Region{" "}
                  <strong style={{ color: dims.textSecondary }}>
                    NYC1
                  </strong>
                </MetaItem>
                <MetaItem $color={dims.textMuted}>
                  OS{" "}
                  <strong style={{ color: dims.textSecondary }}>
                    Ubuntu 24.04 LTS
                  </strong>
                </MetaItem>
                <MetaItem $color={dims.textMuted}>
                  Created{" "}
                  <strong style={{ color: dims.textSecondary }}>
                    May 4, 2025
                  </strong>
                </MetaItem>
              </MetaRow>
            </HeroInfo>
            <HeroActions>
              <ActionBtn
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Console
              </ActionBtn>
              <ActionBtn
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Reboot
              </ActionBtn>
              <ActionBtn
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Power off
              </ActionBtn>
              <ActionBtn
                $primary
                $border={dims.borderLight}
                $accent={dims.accent}
                $color={dims.textPrimary}
              >
                Resize
              </ActionBtn>
            </HeroActions>
          </Hero>

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
            <Cols>
              <div>
                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Live metrics
                    </CardTitle>
                    <SmallTabs>
                      {(["1h", "24h", "7d", "30d"] as const).map((r) => (
                        <SmallTab
                          key={r}
                          $active={r === range}
                          $accent={dims.accent}
                          $color={dims.textSecondary}
                          onClick={() => setRange(r)}
                          type="button"
                        >
                          {r}
                        </SmallTab>
                      ))}
                    </SmallTabs>
                  </CardHead>

                  <StatGrid>
                    <Stat
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                    >
                      <StatLabel $color={dims.textMuted}>CPU</StatLabel>
                      <StatValue $color={dims.textPrimary}>72%</StatValue>
                      <StatTrack $border={dims.borderLight}>
                        <StatFill $pct={72} $color="#0ea5e9" />
                      </StatTrack>
                    </Stat>
                    <Stat
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                    >
                      <StatLabel $color={dims.textMuted}>Memory</StatLabel>
                      <StatValue $color={dims.textPrimary}>5.4 / 8 GB</StatValue>
                      <StatTrack $border={dims.borderLight}>
                        <StatFill $pct={68} $color="#10b981" />
                      </StatTrack>
                    </Stat>
                    <Stat
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                    >
                      <StatLabel $color={dims.textMuted}>Disk</StatLabel>
                      <StatValue $color={dims.textPrimary}>45 / 160 GB</StatValue>
                      <StatTrack $border={dims.borderLight}>
                        <StatFill $pct={28} $color="#f59e0b" />
                      </StatTrack>
                    </Stat>
                    <Stat
                      $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                      $border={dims.borderLight}
                    >
                      <StatLabel $color={dims.textMuted}>
                        Bandwidth
                      </StatLabel>
                      <StatValue $color={dims.textPrimary}>312 / 5,000 GB</StatValue>
                      <StatTrack $border={dims.borderLight}>
                        <StatFill $pct={6} $color="#a855f7" />
                      </StatTrack>
                    </Stat>
                  </StatGrid>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    {[
                      { id: "cpu", label: "CPU usage", series: cpuSeries, color: "#0ea5e9", unit: "%" },
                      { id: "mem", label: "Memory", series: memSeries, color: "#10b981", unit: "%" },
                      { id: "net", label: "Network out", series: netSeries, color: "#a855f7", unit: " MB/s" },
                      { id: "disk", label: "Disk I/O", series: diskSeries, color: "#f59e0b", unit: " MB/s" },
                    ].map((c) => (
                      <Chart
                        key={c.id}
                        id={c.id}
                        label={c.label}
                        series={c.series}
                        color={c.color}
                        unit={c.unit}
                        muted={dims.textMuted}
                        primary={dims.textPrimary}
                        border={dims.borderLight}
                      />
                    ))}
                  </div>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      30-day uptime
                    </CardTitle>
                    <span
                      style={{
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#10b981",
                      }}
                    >
                      99.97% · 12m total downtime
                    </span>
                  </CardHead>
                  <UptimeStrip>
                    {Array.from({ length: 30 }).map((_, i) => {
                      // synthetic: most days perfect, a couple incidents
                      let pct = 100;
                      if (i === 7) pct = 92;
                      else if (i === 18) pct = 78;
                      else if (i === 23) pct = 96;
                      const color =
                        pct === 100
                          ? "#10b981"
                          : pct >= 95
                          ? "#84cc16"
                          : pct >= 80
                          ? "#f59e0b"
                          : "#ef4444";
                      return (
                        <UptimeCell
                          key={i}
                          $color={color}
                          title={`Day ${30 - i} ago — ${pct}% uptime`}
                        />
                      );
                    })}
                  </UptimeStrip>
                  <UptimeLegend $color={dims.textMuted}>
                    <span>30 days ago</span>
                    <UptimeKey>
                      <UptimeCell $color="#10b981" />
                      <span>100%</span>
                      <UptimeCell $color="#84cc16" />
                      <span>≥95%</span>
                      <UptimeCell $color="#f59e0b" />
                      <span>≥80%</span>
                      <UptimeCell $color="#ef4444" />
                      <span>&lt;80%</span>
                    </UptimeKey>
                    <span>Today</span>
                  </UptimeLegend>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardHead>
                    <CardTitle $color={dims.textPrimary}>
                      Recent activity
                    </CardTitle>
                  </CardHead>
                  {[
                    { color: "#10b981", main: "Health check passed", meta: "Monitoring · 2 minutes ago" },
                    { color: "#0ea5e9", main: "Deployed v2.4.1", meta: "John Howrey · 8 minutes ago" },
                    { color: "#f59e0b", main: "Auto-scaled from t2-medium → t3-large", meta: "Auto-scaler · 1 hour ago" },
                    { color: "#10b981", main: "Backup completed (12.4 GB)", meta: "Daily backup · 6 hours ago" },
                    { color: "#0ea5e9", main: "SSH key john@laptop added", meta: "Yesterday at 5:42pm" },
                  ].map((a, i) => (
                    <ActivityItem key={i} $border={dims.borderLight}>
                      <ActDot $color={a.color} />
                      <ActText>
                        <ActMain $color={dims.textPrimary}>{a.main}</ActMain>
                        <ActMeta $color={dims.textMuted}>{a.meta}</ActMeta>
                      </ActText>
                    </ActivityItem>
                  ))}
                </Card>
              </div>

              <div>
                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardTitle $color={dims.textPrimary}>Specs</CardTitle>
                  <div style={{ marginTop: 12 }}>
                    {[
                      ["vCPU", "4 (Premium AMD)"],
                      ["Memory", "8 GB"],
                      ["Storage", "160 GB NVMe SSD"],
                      ["Bandwidth", "5 TB / month"],
                      ["Region", "NYC1 · datacenter 2"],
                      ["IPv4", "143.198.21.7"],
                      ["IPv6", "2604:a880:cad:..."],
                      ["Private IP", "10.108.0.4"],
                    ].map(([l, v]) => (
                      <SummaryRow key={l} $border={dims.borderLight}>
                        <SumLabel $color={dims.textSecondary}>{l}</SumLabel>
                        <SumValue $color={dims.textPrimary}>{v}</SumValue>
                      </SummaryRow>
                    ))}
                  </div>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardTitle $color={dims.textPrimary}>Cost</CardTitle>
                  <div style={{ marginTop: 12 }}>
                    {[
                      ["Compute", "$48.00 / mo"],
                      ["Backups (auto)", "$9.60 / mo"],
                      ["Bandwidth overage", "$0.00 / mo"],
                    ].map(([l, v]) => (
                      <SummaryRow key={l} $border={dims.borderLight}>
                        <SumLabel $color={dims.textSecondary}>{l}</SumLabel>
                        <SumValue $color={dims.textPrimary}>{v}</SumValue>
                      </SummaryRow>
                    ))}
                    <SummaryRow $border={dims.borderLight}>
                      <SumLabel $color={dims.textPrimary}>
                        <strong>Total</strong>
                      </SumLabel>
                      <SumValue $color={dims.textPrimary}>
                        <strong>$57.60 / mo</strong>
                      </SumValue>
                    </SummaryRow>
                  </div>
                </Card>

                <Card $surface={dims.surfaceBg} $border={dims.borderLight}>
                  <CardTitle $color={dims.textPrimary}>Tags</CardTitle>
                  <div style={{ marginTop: 12 }}>
                    {[
                      { l: "production", bg: "#dcfce7", c: "#166534" },
                      { l: "web", bg: "#dbeafe", c: "#1e40af" },
                      { l: "load-balanced", bg: "#fef3c7", c: "#92400e" },
                    ].map((t) => (
                      <TagPill key={t.l} $bg={t.bg} $color={t.c}>
                        {t.l}
                      </TagPill>
                    ))}
                  </div>
                </Card>

                <Danger $border={dims.borderLight}>
                  <DangerTitle>Danger zone</DangerTitle>
                  <DangerText>
                    Destroying this Droplet permanently deletes all data and
                    snapshots. This action cannot be undone.
                  </DangerText>
                  <DangerBtn type="button">Destroy Droplet</DangerBtn>
                </Danger>
              </div>
            </Cols>
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
                <strong>{tab}</strong> for {id}. Switch to{" "}
                <strong>Overview</strong> to see live metrics, activity, and
                resource details.
              </p>
            </Card>
          )}
        </Page>
      )}
    </PageFrame>
  );
}
