"use client";

import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AssistantPanel from "@/components/AssistantPanel";
import { ShellVariant, ColorMode, getMergedDims } from "@/lib/theme";
import { icons } from "@/lib/icons";

/* ─── Shell layout ─── */

const ShellContainer = styled.div<{
  $gap: number;
  $bg: string;
  $radius: number;
}>`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${(p) => p.$bg};
  ${(p) =>
    p.$gap > 0 &&
    `
    padding: ${p.$gap}px;
    gap: ${p.$gap}px;
  `}
`;

const MainArea = styled.div<{ $radius: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  ${(p) =>
    p.$radius > 0 &&
    `
    border-radius: ${p.$radius}px;
    overflow: hidden;
  `}
`;

const ContentRow = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const PageScroll = styled.div<{ $bg: string; $text: string }>`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$text};
`;

const PageInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 40px 64px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  min-width: 0;
`;

const SidePanel = styled.aside`
  position: sticky;
  top: 28px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BackLink = styled.a<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1<{ $color: string }>`
  font-size: 22px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 6px;
`;

const PageSubtitle = styled.p<{ $color: string }>`
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0 0 24px;
`;

/* ─── Section card ─── */

const SectionCard = styled.section<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  padding: 20px 24px 24px;
  margin-bottom: 16px;
`;

const SectionHeading = styled.h2<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 4px;
`;

const SectionSub = styled.p<{ $color: string }>`
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0 0 16px;
  line-height: 1.5;
`;

const GroupLabel = styled.h3<{ $color: string }>`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${(p) => p.$color};
  margin: 16px 0 8px;
  &:first-of-type {
    margin-top: 0;
  }
`;

/* ─── Engine grid ─── */

const EngineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const EngineCard = styled.button<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
  $text: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  text-align: left;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  font-family: inherit;
  color: ${(p) => p.$text};
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

const EngineHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EngineDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const EngineTitle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const EngineName = styled.span<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
  display: inline-flex;
  align-items: center;
`;

const EngineVersion = styled.span<{ $color: string }>`
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const EngineDesc = styled.p<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 0;
  line-height: 1.4;
`;

const LimitedBadge = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1px 5px;
  border-radius: 3px;
  background: ${(p) => p.$accent}20;
  color: ${(p) => p.$accent};
  margin-left: 6px;
`;

/* ─── Plan tier toggle + grid ─── */

const TierToggle = styled.div<{ $border: string }>`
  display: inline-flex;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 14px;
`;

const TierButton = styled.button<{
  $active: boolean;
  $accent: string;
  $color: string;
}>`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  background: ${(p) => (p.$active ? p.$accent : "transparent")};
  color: ${(p) => (p.$active ? "#ffffff" : p.$color)};
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const TierDescription = styled.p<{ $color: string }>`
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0 0 14px;
  line-height: 1.5;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.button<{
  $selected: boolean;
  $disabled: boolean;
  $accent: string;
  $border: string;
  $surface: string;
  $text: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  text-align: left;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(p) => (p.$disabled ? 0.55 : 1)};
  transition: border-color 0.15s, background 0.15s;
  font-family: inherit;
  color: ${(p) => p.$text};
  &:hover {
    border-color: ${(p) => (p.$disabled ? p.$border : p.$accent)};
  }
`;

const PlanPrice = styled.div<{ $color: string }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const PlanPriceUnit = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 400;
  color: ${(p) => p.$color};
`;

const PlanSpec = styled.div<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.5;
`;

const UnavailNote = styled.span<{ $color: string }>`
  font-size: 11px;
  font-style: italic;
  color: ${(p) => p.$color};
`;

/* ─── Storage ─── */

const StorageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const NumberField = styled.div<{ $border: string }>`
  display: inline-flex;
  align-items: stretch;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  overflow: hidden;
`;

const StepperButton = styled.button<{ $color: string }>`
  width: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${(p) => p.$color};
  font-family: inherit;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const NumberInput = styled.input<{ $color: string }>`
  width: 80px;
  padding: 6px 8px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 13px;
  background: transparent;
  color: ${(p) => p.$color};
  font-family: inherit;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const StorageMeta = styled.span<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const HelperText = styled.p<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 12px 0 0;
  line-height: 1.5;
`;

/* ─── HA option rows ─── */

const OptionRow = styled.label<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: pointer;
  margin-bottom: 8px;
  transition: border-color 0.15s, background 0.15s;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

const RadioCircle = styled.span<{ $selected: boolean; $accent: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(p) => (p.$selected ? p.$accent : "transparent")};
  }
`;

const OptionBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const OptionTitle = styled.div<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const OptionSub = styled.div<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-top: 2px;
  line-height: 1.4;
`;

const OptionPrice = styled.div<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
  white-space: nowrap;
`;

/* ─── Region ─── */

const RegionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RegionItem = styled.button<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  font-family: inherit;
  text-align: left;
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

const Flag = styled.span`
  font-size: 18px;
  line-height: 1;
`;

const RegionLabel = styled.div<{ $color: string }>`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

const RegionTag = styled.span<{ $color: string; $bg: string }>`
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
  padding: 2px 8px;
  border-radius: 4px;
`;

const Disclosure = styled.button<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$accent};
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const VpcCallout = styled.div<{ $border: string; $color: string }>`
  margin-top: 14px;
  padding: 12px 14px;
  border: 1px dashed ${(p) => p.$border};
  border-radius: 6px;
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.5;
`;

/* ─── Finalize form ─── */

const FormField = styled.div`
  margin-bottom: 16px;
`;

const FieldLabel = styled.label<{ $color: string }>`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin-bottom: 6px;
`;

const TextInput = styled.input<{
  $border: string;
  $bg: string;
  $color: string;
  $accent: string;
}>`
  width: 100%;
  max-width: 420px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  font-family: inherit;
  &:focus {
    border-color: ${(p) => p.$accent};
  }
`;

const SelectInput = styled.select<{
  $border: string;
  $bg: string;
  $color: string;
  $accent: string;
}>`
  width: 100%;
  max-width: 420px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  font-family: inherit;
  cursor: pointer;
  &:focus {
    border-color: ${(p) => p.$accent};
  }
`;

const CTARow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const PrimaryCTA = styled.button<{ $accent: string; $hover: string }>`
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
  &:hover {
    background: ${(p) => p.$hover};
  }
`;

const SecondaryCTA = styled.button<{ $border: string; $color: string }>`
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

/* ─── Right rail ─── */

const SummaryCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  padding: 18px;
`;

const SummaryHeading = styled.h2<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 12px;
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 14px;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SummaryItemTitle = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const SummaryItemMeta = styled.span<{ $color: string }>`
  font-size: 11px;
  color: ${(p) => p.$color};
  line-height: 1.5;
`;

const SummaryItemPrice = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

const SummaryDivider = styled.hr<{ $border: string }>`
  border: none;
  border-top: 1px solid ${(p) => p.$border};
  margin: 6px 0;
`;

const TotalRow = styled.div<{ $color: string }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const TotalAmount = styled.span<{ $color: string }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

const HourlyNote = styled.span<{ $color: string }>`
  display: block;
  font-size: 11px;
  font-weight: 400;
  color: ${(p) => p.$color};
  margin-top: 2px;
`;

const CopilotCard = styled.div<{ $border: string; $surface: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  padding: 18px;
`;

const CopilotHeading = styled.h3<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 6px;
`;

const CopilotBody = styled.p<{ $color: string }>`
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 0 0 12px;
  line-height: 1.5;
`;

const CopilotLink = styled.button<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$accent};
  cursor: pointer;
  font-family: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

/* ─── Data ─── */

type EngineGroup = "Application" | "Specialty" | "Streaming";

interface Engine {
  id: string;
  name: string;
  version: string;
  description: string;
  color: string;
  group: EngineGroup;
  limited?: boolean;
}

const engines: Engine[] = [
  {
    id: "mongodb",
    name: "MongoDB",
    version: "v8.0",
    description: "Great for social networks, IoT, and big data storage",
    color: "#00684a",
    group: "Application",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    version: "v17",
    description: "Great for analytics, AI/ML, and enterprise apps",
    color: "#336791",
    group: "Application",
  },
  {
    id: "mysql",
    name: "MySQL",
    version: "v8",
    description: "Great for e-commerce, CMSs, and transactional web apps",
    color: "#00758f",
    group: "Application",
  },
  {
    id: "valkey",
    name: "Valkey",
    version: "v8",
    description:
      "Great for chat apps, leaderboards, and low-latency operations",
    color: "#dc382d",
    group: "Specialty",
    limited: true,
  },
  {
    id: "opensearch",
    name: "OpenSearch",
    version: "v2",
    description: "Great for high-speed search and logs analysis",
    color: "#005eb8",
    group: "Specialty",
  },
  {
    id: "kafka",
    name: "Kafka",
    version: "v3.8",
    description:
      "Great for fintech, event tracking, and service communication",
    color: "#231f20",
    group: "Streaming",
  },
];

interface Plan {
  id: string;
  price: number;
  vcpu: number;
  ram: number;
  connections: number;
  storageMin: number;
  unavailable?: string[];
}

const basicPlans: Plan[] = [
  { id: "p1", price: 152, vcpu: 4, ram: 8, connections: 97, storageMin: 36 },
  { id: "p2", price: 302, vcpu: 4, ram: 16, connections: 195, storageMin: 80 },
  { id: "p3", price: 1218, vcpu: 8, ram: 32, connections: 390, storageMin: 230 },
  { id: "p4", price: 1828, vcpu: 8, ram: 64, connections: 390, storageMin: 350 },
  {
    id: "p5",
    price: 2426,
    vcpu: 16,
    ram: 64,
    connections: 780,
    storageMin: 400,
    unavailable: ["NYC3"],
  },
  {
    id: "p6",
    price: 3728,
    vcpu: 32,
    ram: 128,
    connections: 1560,
    storageMin: 750,
    unavailable: ["NYC3"],
  },
];

const standbyOptions: {
  id: string;
  title: string;
  sub: string;
  price: number;
}[] = [
  {
    id: "none",
    title: "No standby nodes",
    sub: "99.5% uptime guarantee",
    price: 0,
  },
  {
    id: "one",
    title: "Add one standby node",
    sub: "99.95% uptime guarantee · automatically replaces the primary in the event of a failure",
    price: 76,
  },
  {
    id: "two",
    title: "Add two standby nodes",
    sub: "99.99% uptime guarantee · highest availability for critical workloads",
    price: 152,
  },
];

const regions: {
  id: string;
  flag: string;
  city: string;
  dc: string;
  tag?: string;
  tagBg?: string;
  tagColor?: string;
}[] = [
  {
    id: "nyc2",
    flag: "🇺🇸",
    city: "New York",
    dc: "Datacenter 2 — NYC2",
    tag: "1 standby",
    tagBg: "#e0f2fe",
    tagColor: "#075985",
  },
  {
    id: "nyc3",
    flag: "🇺🇸",
    city: "New York",
    dc: "Datacenter 3 — NYC3",
    tag: "primary",
    tagBg: "#dcfce7",
    tagColor: "#166534",
  },
];

const projects = [
  "My First Project",
  "Production Infrastructure",
  "Staging",
];

/* ─── Page ─── */

export default function CreateDatabasePage() {
  const [variant] = useState<ShellVariant>("standard");
  const [colorMode] = useState<ColorMode>("digitalocean");
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [engineId, setEngineId] = useState("postgresql");
  const [planId, setPlanId] = useState("p1");
  const [storageGb, setStorageGb] = useState(51);
  const [standby, setStandby] = useState("none");
  const [regionId, setRegionId] = useState("nyc3");
  const [showMoreRegions, setShowMoreRegions] = useState(false);
  const [clusterName, setClusterName] = useState("db-postgresql-nyc3");
  const [project, setProject] = useState(projects[0]);

  const dims = getMergedDims(variant, colorMode);
  const toggleAssistant = useCallback(
    () => setAssistantOpen((p) => !p),
    []
  );

  const engine = engines.find((e) => e.id === engineId)!;
  const plan = basicPlans.find((p) => p.id === planId) ?? basicPlans[0];
  const region = regions.find((r) => r.id === regionId) ?? regions[1];
  const standbyOpt = standbyOptions.find((s) => s.id === standby)!;

  const regionTag = region.dc.split("—")[1]?.trim() ?? "";
  const storageMin = plan.storageMin;
  const storageMax = storageMin + 10;
  const effectiveStorage = Math.max(storageGb, storageMin);
  const extraStorageGb = Math.max(0, effectiveStorage - storageMin);
  const storageCost = +(extraStorageGb * 0.2).toFixed(2);

  const monthly = +(plan.price + standbyOpt.price + storageCost).toFixed(2);
  const hourly = +(monthly / 730).toFixed(3);

  const groupedEngines = useMemo(() => {
    const g: Record<EngineGroup, Engine[]> = {
      Application: [],
      Specialty: [],
      Streaming: [],
    };
    engines.forEach((e) => g[e.group].push(e));
    return g;
  }, []);

  return (
    <ShellContainer
      $gap={dims.gap}
      $bg={dims.gap > 0 ? dims.contentBg : "transparent"}
      $radius={dims.borderRadius}
    >
      <Sidebar
        variant={variant}
        colorMode={colorMode}
        dims={dims}
        onOpenAssistant={() => setAssistantOpen(true)}
      />
      <MainArea $radius={dims.borderRadius}>
        <Header
          variant={variant}
          dims={dims}
          onToggleAssistant={toggleAssistant}
          assistantOpen={assistantOpen}
        />
        <ContentRow>
          <PageScroll $bg={dims.contentBg} $text={dims.textPrimary}>
            <PageInner>
              <MainColumn>
                <Link href="/" passHref legacyBehavior>
                  <BackLink $accent={dims.accent}>
                    {icons.chevronLeft} Back to Dashboard
                  </BackLink>
                </Link>

                <PageTitle $color={dims.textPrimary}>
                  Create a Managed Database
                </PageTitle>
                <PageSubtitle $color={dims.textSecondary}>
                  Configure and launch a fully managed database cluster.
                </PageSubtitle>

                {/* Engine */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a database engine
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Engine selection determines available versions, plans, and
                    integrations.
                  </SectionSub>

                  {(
                    [
                      "Application",
                      "Specialty",
                      "Streaming",
                    ] as EngineGroup[]
                  ).map((group) => (
                    <React.Fragment key={group}>
                      <GroupLabel $color={dims.textMuted}>{group}</GroupLabel>
                      <EngineGrid>
                        {groupedEngines[group].map((e) => (
                          <EngineCard
                            key={e.id}
                            $selected={engineId === e.id}
                            $accent={dims.accent}
                            $border={dims.borderLight}
                            $surface={dims.surfaceBg}
                            $text={dims.textPrimary}
                            onClick={() => setEngineId(e.id)}
                          >
                            <EngineHead>
                              <EngineDot $color={e.color} />
                              <EngineTitle>
                                <EngineName $color={dims.textPrimary}>
                                  {e.name}
                                  {e.limited && (
                                    <LimitedBadge $accent={dims.accent}>
                                      Limited
                                    </LimitedBadge>
                                  )}
                                </EngineName>
                                <EngineVersion $color={dims.textMuted}>
                                  {e.version}
                                </EngineVersion>
                              </EngineTitle>
                            </EngineHead>
                            <EngineDesc $color={dims.textSecondary}>
                              {e.description}
                            </EngineDesc>
                          </EngineCard>
                        ))}
                      </EngineGrid>
                    </React.Fragment>
                  ))}
                </SectionCard>

                {/* Configuration */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a database configuration
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Pick the compute tier that fits your workload — you can scale
                    later.
                  </SectionSub>

                  <TierToggle $border={dims.borderLight}>
                    <TierButton
                      type="button"
                      $active
                      $accent={dims.accent}
                      $color={dims.textPrimary}
                    >
                      Basic (Shared CPU)
                    </TierButton>
                    <TierButton
                      type="button"
                      $active={false}
                      $accent={dims.accent}
                      $color={dims.textPrimary}
                      disabled
                      title="Coming soon"
                    >
                      General Purpose
                    </TierButton>
                    <TierButton
                      type="button"
                      $active={false}
                      $accent={dims.accent}
                      $color={dims.textPrimary}
                      disabled
                      title="Coming soon"
                    >
                      CPU-Optimized
                    </TierButton>
                  </TierToggle>

                  <TierDescription $color={dims.textSecondary}>
                    Recommended for small projects that can handle variable CPU
                    performance, like blogs, web apps and dev/test environments.
                  </TierDescription>

                  <PlanGrid>
                    {basicPlans.map((p) => {
                      const disabled = p.unavailable?.includes(regionTag);
                      return (
                        <PlanCard
                          key={p.id}
                          $selected={planId === p.id}
                          $disabled={!!disabled}
                          $accent={dims.accent}
                          $border={dims.borderLight}
                          $surface={dims.surfaceBg}
                          $text={dims.textPrimary}
                          onClick={() => !disabled && setPlanId(p.id)}
                          disabled={!!disabled}
                        >
                          <PlanPrice $color={dims.textPrimary}>
                            ${p.price.toLocaleString()}.00
                            <PlanPriceUnit $color={dims.textMuted}>
                              {" "}
                              /mo
                            </PlanPriceUnit>
                          </PlanPrice>
                          <PlanSpec $color={dims.textSecondary}>
                            {p.vcpu} vCPU · {p.ram} GB RAM
                            <br />
                            Connections: {p.connections}
                            <br />
                            Storage min: {p.storageMin} GB
                          </PlanSpec>
                          {p.unavailable && (
                            <UnavailNote $color={dims.textMuted}>
                              Unavailable in {p.unavailable.join(", ")}
                            </UnavailNote>
                          )}
                        </PlanCard>
                      );
                    })}
                  </PlanGrid>
                </SectionCard>

                {/* Storage */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a storage size
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Bundled minimum is {plan.storageMin} GB; add more at $0.20 /
                    GiB.
                  </SectionSub>
                  <StorageRow>
                    <NumberField $border={dims.borderLight}>
                      <StepperButton
                        type="button"
                        $color={dims.textSecondary}
                        onClick={() =>
                          setStorageGb((g) => Math.max(storageMin, g - 1))
                        }
                        aria-label="Decrease storage"
                      >
                        −
                      </StepperButton>
                      <NumberInput
                        type="number"
                        value={effectiveStorage}
                        $color={dims.textPrimary}
                        onChange={(e) =>
                          setStorageGb(parseInt(e.target.value) || storageMin)
                        }
                        min={storageMin}
                      />
                      <StepperButton
                        type="button"
                        $color={dims.textSecondary}
                        onClick={() => setStorageGb((g) => g + 1)}
                        aria-label="Increase storage"
                      >
                        +
                      </StepperButton>
                    </NumberField>
                    <StorageMeta $color={dims.textMuted}>
                      Range: {storageMin} GB – {storageMax} GB · $0.20 / GiB
                    </StorageMeta>
                  </StorageRow>
                  <HelperText $color={dims.textMuted}>
                    Storage can&rsquo;t be reduced in size after creation.
                  </HelperText>
                </SectionCard>

                {/* HA */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Maximize uptime for critical workloads
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Standby nodes automatically replace the primary node in the
                    event of a failure.
                  </SectionSub>
                  {standbyOptions.map((opt) => (
                    <OptionRow
                      key={opt.id}
                      $selected={standby === opt.id}
                      $accent={dims.accent}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                      onClick={() => setStandby(opt.id)}
                    >
                      <RadioCircle
                        $selected={standby === opt.id}
                        $accent={dims.accent}
                      />
                      <OptionBody>
                        <OptionTitle $color={dims.textPrimary}>
                          {opt.title}
                        </OptionTitle>
                        <OptionSub $color={dims.textSecondary}>
                          {opt.sub}
                        </OptionSub>
                      </OptionBody>
                      <OptionPrice $color={dims.textPrimary}>
                        {opt.price === 0 ? "Included" : `$${opt.price}/mo`}
                      </OptionPrice>
                    </OptionRow>
                  ))}
                </SectionCard>

                {/* Region */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a datacenter region
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Pick the location closest to your users for the lowest
                    latency.
                  </SectionSub>
                  <RegionList>
                    {regions.map((r) => (
                      <RegionItem
                        key={r.id}
                        $selected={regionId === r.id}
                        $accent={dims.accent}
                        $border={dims.borderLight}
                        $surface={dims.surfaceBg}
                        onClick={() => setRegionId(r.id)}
                      >
                        <Flag>{r.flag}</Flag>
                        <RegionLabel $color={dims.textPrimary}>
                          {r.city} · {r.dc}
                        </RegionLabel>
                        {r.tag && (
                          <RegionTag
                            $color={r.tagColor || dims.textPrimary}
                            $bg={r.tagBg || dims.borderLight}
                          >
                            {r.tag}
                          </RegionTag>
                        )}
                      </RegionItem>
                    ))}
                  </RegionList>
                  <Disclosure
                    $accent={dims.accent}
                    onClick={() => setShowMoreRegions((s) => !s)}
                  >
                    {showMoreRegions ? "Hide" : "Show"} additional datacenter
                    regions
                  </Disclosure>
                  {showMoreRegions && (
                    <SectionSub
                      $color={dims.textMuted}
                      style={{ marginTop: 8, marginBottom: 0 }}
                    >
                      SFO3, AMS3, FRA1, LON1, TOR1, BLR1, SGP1, SYD1 —{" "}
                      <a
                        href="#inform-us"
                        style={{ color: dims.accent }}
                        onClick={(e) => e.preventDefault()}
                      >
                        Inform us
                      </a>{" "}
                      if your preferred region is missing.
                    </SectionSub>
                  )}
                  <VpcCallout
                    $border={dims.borderLight}
                    $color={dims.textSecondary}
                  >
                    <strong style={{ color: dims.textPrimary }}>
                      VPC Network: default-nyc1
                    </strong>
                    <br />
                    All resources created in this datacenter will be members of
                    this VPC network.
                  </VpcCallout>
                </SectionCard>

                {/* Finalize */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Finalize and create
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    Name your cluster and assign it to a project.
                  </SectionSub>
                  <FormField>
                    <FieldLabel $color={dims.textSecondary}>
                      Choose a name
                    </FieldLabel>
                    <TextInput
                      $border={dims.borderLight}
                      $bg={dims.contentBg}
                      $color={dims.textPrimary}
                      $accent={dims.accent}
                      value={clusterName}
                      onChange={(e) => setClusterName(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <FieldLabel $color={dims.textSecondary}>
                      Select a project
                    </FieldLabel>
                    <SelectInput
                      $border={dims.borderLight}
                      $bg={dims.contentBg}
                      $color={dims.textPrimary}
                      $accent={dims.accent}
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      {projects.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </SelectInput>
                  </FormField>

                  <CTARow>
                    <PrimaryCTA
                      $accent={dims.accent}
                      $hover={dims.accentHover}
                    >
                      Create Managed Database
                    </PrimaryCTA>
                    <SecondaryCTA
                      $border={dims.borderLight}
                      $color={dims.textPrimary}
                    >
                      Migrate current Database
                    </SecondaryCTA>
                    <SecondaryCTA
                      $border={dims.borderLight}
                      $color={dims.textPrimary}
                    >
                      Add Trusted Sources
                    </SecondaryCTA>
                  </CTARow>
                </SectionCard>
              </MainColumn>

              {/* Sticky right rail */}
              <SidePanel>
                <SummaryCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SummaryHeading $color={dims.textPrimary}>
                    Summary
                  </SummaryHeading>
                  <SummaryList>
                    <SummaryItem>
                      <SummaryItemTitle $color={dims.textPrimary}>
                        Primary node
                      </SummaryItemTitle>
                      <SummaryItemMeta $color={dims.textSecondary}>
                        {engine.name} {engine.version} · Basic · {plan.vcpu}{" "}
                        vCPU / {plan.ram} GB RAM
                      </SummaryItemMeta>
                      <SummaryItemPrice $color={dims.textPrimary}>
                        ${plan.price.toLocaleString()}.00 / mo
                      </SummaryItemPrice>
                    </SummaryItem>
                    {standbyOpt.price > 0 && (
                      <SummaryItem>
                        <SummaryItemTitle $color={dims.textPrimary}>
                          Standby
                        </SummaryItemTitle>
                        <SummaryItemMeta $color={dims.textSecondary}>
                          {standbyOpt.title} ·{" "}
                          {standbyOpt.sub.split(" · ")[0]}
                        </SummaryItemMeta>
                        <SummaryItemPrice $color={dims.textPrimary}>
                          ${standbyOpt.price}.00 / mo
                        </SummaryItemPrice>
                      </SummaryItem>
                    )}
                    <SummaryItem>
                      <SummaryItemTitle $color={dims.textPrimary}>
                        Storage
                      </SummaryItemTitle>
                      <SummaryItemMeta $color={dims.textSecondary}>
                        {effectiveStorage} GiB ({plan.storageMin} GiB included
                        + {extraStorageGb} GiB extra)
                      </SummaryItemMeta>
                      <SummaryItemPrice $color={dims.textPrimary}>
                        ${storageCost.toFixed(2)} / mo
                      </SummaryItemPrice>
                    </SummaryItem>
                  </SummaryList>
                  <SummaryDivider $border={dims.borderLight} />
                  <TotalRow $color={dims.textPrimary}>
                    <span>Total</span>
                    <span style={{ textAlign: "right" }}>
                      <TotalAmount $color={dims.textPrimary}>
                        ${monthly.toLocaleString()}/month
                      </TotalAmount>
                      <HourlyNote $color={dims.textMuted}>
                        ${hourly.toFixed(3)}/hour
                      </HourlyNote>
                    </span>
                  </TotalRow>
                </SummaryCard>

                <CopilotCard
                  $border={dims.borderLight}
                  $surface={dims.surfaceBg}
                >
                  <CopilotHeading $color={dims.textPrimary}>
                    What&rsquo;s next?
                  </CopilotHeading>
                  <CopilotBody $color={dims.textSecondary}>
                    Let the AI Assistant walk you through naming, networking,
                    and connection-string setup.
                  </CopilotBody>
                  <CopilotLink
                    $accent={dims.accent}
                    onClick={() => setAssistantOpen(true)}
                  >
                    Launch with Copilot →
                  </CopilotLink>
                </CopilotCard>
              </SidePanel>
            </PageInner>
          </PageScroll>

          <AssistantPanel
            open={assistantOpen}
            onClose={() => setAssistantOpen(false)}
            dims={dims}
          />
        </ContentRow>
      </MainArea>
    </ShellContainer>
  );
}
