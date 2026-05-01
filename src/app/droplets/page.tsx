"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";

const Page = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px 32px 80px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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

const PrimaryBtn = styled.button<{ $accent: string }>`
  padding: 9px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover { filter: brightness(0.94); }
`;

const GhostBtn = styled.button<{ $color: string; $border: string }>`
  padding: 9px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
`;

/* ─── Focus block (action-first) ─── */
const FocusBlock = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  padding: 24px 28px;
  margin-bottom: 16px;
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
  li { display: list-item; }
`;

const BrowseAll = styled.details<{ $color: string }>`
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

const BrowseAllInner = styled.div`
  margin-top: 12px;
`;

/* ─── Status banner ─── */
const StatusBanner = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 16px;
`;

const StatusBannerHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusGlyph = styled.span<{ $bg: string; $color: string }>`
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

const StatusHeadText = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  flex: 1;
`;

const StatusHeadSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const AttnList = styled.div<{ $border: string }>`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(p) => p.$border};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AttnItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
`;

const AttnLeft = styled.div<{ $bg: string; $color: string }>`
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
`;

const AttnText = styled.div`
  min-width: 0;
`;

const AttnTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const AttnEvidence = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  line-height: 1.45;
  color: ${(p) => p.$color};
`;

const AttnButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const AttnBtn = styled.button<{ $primary?: boolean; $accent: string; $border: string; $color: string }>`
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

const AllClearBlock = styled.div<{ $color: string }>`
  margin-top: 10px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

/* ─── Filter bar ─── */
const FilterBar = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px 10px 0 0;
  flex-wrap: wrap;
  border-bottom: none;
`;

const SearchInput = styled.input<{ $border: string; $bg: string; $color: string }>`
  flex: 1;
  min-width: 200px;
  padding: 7px 10px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;

  &::placeholder { color: ${(p) => p.$color}88; }
  &:focus { border-color: #0061eb; }
`;

const Select = styled.select<{ $border: string; $bg: string; $color: string }>`
  padding: 7px 10px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  cursor: pointer;
`;

/* ─── Bulk action bar ─── */
const BulkBar = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: ${(p) => p.$accent}14;
  border-left: 1px solid ${(p) => p.$accent};
  border-right: 1px solid ${(p) => p.$accent};
  border-bottom: 1px solid ${(p) => p.$accent}40;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
`;

const BulkCount = styled.span<{ $accent: string }>`
  color: ${(p) => p.$accent};
  font-weight: 600;
`;

const BulkAction = styled.button<{ $color: string }>`
  padding: 5px 10px;
  background: transparent;
  border: 1px solid currentColor;
  color: ${(p) => p.$color};
  border-radius: 5px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: rgba(0, 0, 0, 0.04); }
`;

/* ─── Table ─── */
const Table = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

const TableHead = styled.div<{ $border: string; $color: string }>`
  display: grid;
  grid-template-columns: 36px minmax(180px, 2fr) 110px 140px 100px 130px 120px 36px;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid ${(p) => p.$border};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
`;

const TableRow = styled.div<{
  $border: string;
  $hover: string;
  $selected: boolean;
  $selBg: string;
  $attnBar: string | null;
}>`
  position: relative;
  display: grid;
  grid-template-columns: 36px minmax(180px, 2fr) 110px 140px 100px 130px 120px 36px;
  gap: 12px;
  align-items: center;
  padding: 12px 16px 12px ${(p) => (p.$attnBar ? "20px" : "16px")};
  border-bottom: 1px solid ${(p) => p.$border};
  background: ${(p) => (p.$selected ? p.$selBg : "transparent")};
  cursor: pointer;
  transition: background 0.1s ease;
  ${(p) =>
    p.$attnBar
      ? `&::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: ${p.$attnBar}; }`
      : ""}
  &:last-child { border-bottom: none; }
  &:hover { background: ${(p) => (p.$selected ? p.$selBg : p.$hover)}; }
`;

const AttnRowChip = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  margin-left: 8px;
  border-radius: 4px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  vertical-align: middle;
`;

const Checkbox = styled.span<{ $checked: boolean; $accent: string; $border: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid ${(p) => (p.$checked ? p.$accent : p.$border)};
  background: ${(p) => (p.$checked ? p.$accent : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 10px;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const Avatar = styled.span<{ $bg: string; $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
`;

const NameStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

const NameMain = styled(Link)<{ $color: string; $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover { color: ${(p) => p.$accent}; text-decoration: underline; }
`;

const NameSub = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const StatusPill = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 999px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  width: fit-content;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const Cell = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const IpCell = styled.code<{ $color: string }>`
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const RowMenu = styled.button<{ $color: string }>`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  color: ${(p) => p.$color};
  cursor: pointer;
  font-size: 16px;

  &:hover { background: rgba(0, 0, 0, 0.06); }
`;

/* ─── Pagination ─── */
const PageBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
`;

const PageBtns = styled.div`
  display: flex;
  gap: 4px;
`;

const PageBtn = styled.button<{ $active?: boolean; $color: string; $accent: string; $border: string }>`
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid ${(p) => (p.$active ? p.$accent : p.$border)};
  background: ${(p) => (p.$active ? p.$accent : "transparent")};
  color: ${(p) => (p.$active ? "#ffffff" : p.$color)};
  border-radius: 5px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(p) => (p.$active ? p.$accent : "rgba(0,0,0,0.04)")};
  }

  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

/* ─── Data ─── */
type DropStatus = "Running" | "Off" | "Provisioning" | "Reboot";
type Droplet = {
  id: string;
  name: string;
  status: DropStatus;
  ip: string;
  region: string;
  size: string;
  os: string;
  created: string;
  tags: string[];
  iconBg: string;
  iconColor: string;
  initials: string;
};

const droplets: Droplet[] = [
  { id: "web-prod-1", name: "web-prod-1", status: "Running", ip: "143.198.21.7", region: "NYC1", size: "4 vCPU / 8 GB", os: "Ubuntu 24.04 LTS", created: "May 4, 2025", tags: ["production", "web"], iconBg: "#dbeafe", iconColor: "#1e40af", initials: "W1" },
  { id: "web-prod-2", name: "web-prod-2", status: "Running", ip: "143.198.21.8", region: "NYC1", size: "4 vCPU / 8 GB", os: "Ubuntu 24.04 LTS", created: "May 4, 2025", tags: ["production", "web"], iconBg: "#dbeafe", iconColor: "#1e40af", initials: "W2" },
  { id: "web-prod-3", name: "web-prod-3", status: "Provisioning", ip: "—", region: "NYC1", size: "4 vCPU / 8 GB", os: "Ubuntu 24.04 LTS", created: "Today, 24m ago", tags: ["production", "web"], iconBg: "#dbeafe", iconColor: "#1e40af", initials: "W3" },
  { id: "api-prod-1", name: "api-prod-1", status: "Running", ip: "143.198.42.12", region: "NYC1", size: "8 vCPU / 16 GB", os: "Ubuntu 24.04 LTS", created: "Apr 12, 2025", tags: ["production", "api"], iconBg: "#dcfce7", iconColor: "#15803d", initials: "AP" },
  { id: "worker-prod-1", name: "worker-prod-1", status: "Running", ip: "143.198.42.13", region: "NYC1", size: "2 vCPU / 4 GB", os: "Ubuntu 24.04 LTS", created: "Apr 12, 2025", tags: ["production", "worker"], iconBg: "#fef3c7", iconColor: "#a16207", initials: "WK" },
  { id: "staging-1", name: "staging-1", status: "Running", ip: "159.203.88.10", region: "NYC3", size: "2 vCPU / 4 GB", os: "Ubuntu 22.04 LTS", created: "Mar 28, 2025", tags: ["staging"], iconBg: "#fef3c7", iconColor: "#a16207", initials: "ST" },
  { id: "dev-sandbox", name: "dev-sandbox", status: "Off", ip: "159.203.88.22", region: "NYC3", size: "1 vCPU / 1 GB", os: "Debian 12", created: "Feb 14, 2025", tags: ["dev"], iconBg: "#e0e7ff", iconColor: "#4338ca", initials: "DV" },
  { id: "ml-gpu-1", name: "ml-gpu-1", status: "Reboot", ip: "143.198.99.4", region: "NYC2", size: "RTX A4000 / 16 GB", os: "Ubuntu 22.04 LTS", created: "May 1, 2025", tags: ["ai", "gpu"], iconBg: "#ede9fe", iconColor: "#6d28d9", initials: "ML" },
  { id: "data-pipeline", name: "data-pipeline", status: "Running", ip: "164.92.71.2", region: "SFO3", size: "8 vCPU / 32 GB", os: "Ubuntu 22.04 LTS", created: "Jan 8, 2025", tags: ["data"], iconBg: "#cffafe", iconColor: "#0e7490", initials: "DP" },
  { id: "monitoring", name: "monitoring", status: "Running", ip: "164.92.71.3", region: "SFO3", size: "2 vCPU / 4 GB", os: "Debian 12", created: "Dec 18, 2024", tags: ["ops"], iconBg: "#fee2e2", iconColor: "#b91c1c", initials: "MN" },
  { id: "build-runner", name: "build-runner", status: "Running", ip: "138.197.55.1", region: "AMS3", size: "4 vCPU / 8 GB", os: "Ubuntu 24.04 LTS", created: "Nov 22, 2024", tags: ["ops", "ci"], iconBg: "#fee2e2", iconColor: "#b91c1c", initials: "BR" },
  { id: "edge-cache-eu", name: "edge-cache-eu", status: "Running", ip: "138.197.55.2", region: "AMS3", size: "2 vCPU / 4 GB", os: "Alpine 3.20", created: "Oct 30, 2024", tags: ["edge"], iconBg: "#dbeafe", iconColor: "#1e40af", initials: "EC" },
];

// Each entry surfaces a specific droplet + a specific issue + the actions
// that resolve it. The list is the answer to "is there anything I need to do?"
type AttnSeverity = "warn" | "risk" | "info";
interface DropletAttention {
  severity: AttnSeverity;
  title: string;
  evidence: string;
  actions: { label: string; primary?: boolean; href?: string }[];
}

const dropletAttention: DropletAttention[] = [
  {
    severity: "warn",
    title: "web-prod-3 has been provisioning for 24 minutes",
    evidence:
      "Healthy provisions on this image average 3 min. NYC1 capacity is currently constrained — droplet may need a cancel + retry in another AZ.",
    actions: [
      { label: "Retry in NYC2", primary: true },
      { label: "View provisioner log" },
      { label: "Cancel" },
    ],
  },
  {
    severity: "risk",
    title: "3 production Droplets have no backup policy",
    evidence:
      "web-prod-1, web-prod-2, and api-prod-1 carry production tags but no scheduled snapshots. Nightly is $1.20 / mo per Droplet.",
    actions: [
      { label: "Enable nightly", primary: true },
      { label: "Choose policy per Droplet" },
    ],
  },
  {
    severity: "info",
    title: "dev-sandbox has been Off for 32 days",
    evidence:
      "Still costing $5 / mo. If it's no longer needed, destroy it; otherwise resize to s-1vcpu-512mb to cut to $3 / mo.",
    actions: [
      { label: "Destroy", primary: true },
      { label: "Resize down" },
      { label: "Keep" },
    ],
  },
];

const statusColors: Record<DropStatus, { bg: string; color: string }> = {
  Running: { bg: "#dcfce7", color: "#166534" },
  Off: { bg: "#f1f5f9", color: "#64748b" },
  Provisioning: { bg: "#dbeafe", color: "#1e40af" },
  Reboot: { bg: "#fef3c7", color: "#92400e" },
};

export default function DropletsListPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All regions");
  const [status, setStatus] = useState("All statuses");
  const [tag, setTag] = useState("All tags");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return droplets.filter((d) => {
      if (
        search &&
        !d.name.toLowerCase().includes(search.toLowerCase()) &&
        !d.ip.includes(search) &&
        !d.tags.some((t) => t.includes(search.toLowerCase()))
      )
        return false;
      if (region !== "All regions" && d.region !== region) return false;
      if (status !== "All statuses" && d.status !== status) return false;
      if (tag !== "All tags" && !d.tags.includes(tag)) return false;
      return true;
    });
  }, [search, region, status, tag]);

  const allChecked =
    filtered.length > 0 && filtered.every((d) => selected.includes(d.id));
  const toggleAll = () =>
    setSelected(allChecked ? [] : filtered.map((d) => d.id));
  const toggleOne = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  // Per-row attention markers — kept in sync with `dropletAttention` above.
  // Each entry is the row-level chip text + severity color.
  const rowAttention: Record<
    string,
    { label: string; bar: string; chipBg: string; chipColor: string }
  > = {
    "web-prod-3": {
      label: "Stuck provisioning",
      bar: "#f59e0b",
      chipBg: "#fef3c7",
      chipColor: "#92400e",
    },
    "web-prod-1": {
      label: "No backups",
      bar: "#ef4444",
      chipBg: "#fee2e2",
      chipColor: "#991b1b",
    },
    "web-prod-2": {
      label: "No backups",
      bar: "#ef4444",
      chipBg: "#fee2e2",
      chipColor: "#991b1b",
    },
    "api-prod-1": {
      label: "No backups",
      bar: "#ef4444",
      chipBg: "#fee2e2",
      chipColor: "#991b1b",
    },
    "dev-sandbox": {
      label: "Idle 32 days",
      bar: "#3b82f6",
      chipBg: "#dbeafe",
      chipColor: "#1e40af",
    },
  };

  return (
    <PageFrame
      breadcrumbs={[
        "Acme Corp",
        "Platform Engineering",
        "roadtrip-copilot",
        "Droplets",
      ]}
    >
      {({ dims, isDark }) => (
        <Page>
          <TopRow>
            <TitleGroup>
              <PageH1 $color={dims.textPrimary}>Droplets</PageH1>
              <SubMeta $color={dims.textSecondary}>
                {filtered.length} of {droplets.length} virtual machines · 4
                regions · $568.50 / month
              </SubMeta>
            </TitleGroup>
            <Actions>
              <GhostBtn $color={dims.textPrimary} $border={dims.borderLight}>
                Import key
              </GhostBtn>
              <PrimaryBtn $accent={dims.accent}>+ Create Droplet</PrimaryBtn>
            </Actions>
          </TopRow>

          <FocusBlock $surface={dims.surfaceBg} $border={dims.borderLight}>
            <FocusLead $color={dims.textPrimary}>
              {droplets.length - dropletAttention.length} of {droplets.length}{" "}
              Droplets are running smoothly. The one to deal with is{" "}
              <strong>web-prod-3</strong>, which has been provisioning for 24
              minutes — usually 3.
            </FocusLead>
            <FocusActions>
              <FocusPrimaryBtn $accent={dims.accent} type="button">
                Retry in NYC2
              </FocusPrimaryBtn>
              <FocusGhostBtn
                $color={dims.textPrimary}
                $border={dims.borderLight}
                type="button"
              >
                View provisioner log
              </FocusGhostBtn>
            </FocusActions>
            <FocusMore $color={dims.textMuted}>
              <summary>2 more things worth a look</summary>
              <FocusMoreList
                $color={dims.textSecondary}
                $border={dims.borderLight}
              >
                <li>
                  <strong>3 production Droplets have no backups.</strong>{" "}
                  web-prod-1, web-prod-2, api-prod-1 — $1.20 / mo each.{" "}
                  <a style={{ color: dims.accent, cursor: "pointer" }}>
                    Enable nightly
                  </a>
                </li>
                <li>
                  <strong>dev-sandbox has been Off for 32 days.</strong> Still
                  costing $5 / mo.{" "}
                  <a style={{ color: dims.accent, cursor: "pointer" }}>
                    Destroy
                  </a>{" "}
                  ·{" "}
                  <a style={{ color: dims.accent, cursor: "pointer" }}>
                    Resize down
                  </a>
                </li>
              </FocusMoreList>
            </FocusMore>
          </FocusBlock>

          <BrowseAll $color={dims.textMuted}>
            <summary>
              Browse all {droplets.length} Droplets
            </summary>
            <BrowseAllInner>

          <FilterBar $surface={dims.surfaceBg} $border={dims.borderLight}>
            <SearchInput
              placeholder="Search by name, IP, or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              $border={dims.borderLight}
              $bg={isDark ? "rgba(255,255,255,0.04)" : "#ffffff"}
              $color={dims.textPrimary}
            />
            <Select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              $border={dims.borderLight}
              $bg={isDark ? "rgba(255,255,255,0.04)" : "#ffffff"}
              $color={dims.textPrimary}
            >
              {["All regions", "NYC1", "NYC2", "NYC3", "SFO3", "AMS3"].map(
                (r) => (
                  <option key={r}>{r}</option>
                )
              )}
            </Select>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              $border={dims.borderLight}
              $bg={isDark ? "rgba(255,255,255,0.04)" : "#ffffff"}
              $color={dims.textPrimary}
            >
              {["All statuses", "Running", "Off", "Provisioning", "Reboot"].map(
                (s) => (
                  <option key={s}>{s}</option>
                )
              )}
            </Select>
            <Select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              $border={dims.borderLight}
              $bg={isDark ? "rgba(255,255,255,0.04)" : "#ffffff"}
              $color={dims.textPrimary}
            >
              {[
                "All tags",
                "production",
                "staging",
                "dev",
                "web",
                "api",
                "worker",
                "ai",
                "gpu",
                "data",
                "ops",
                "ci",
                "edge",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </FilterBar>

          {selected.length > 0 && (
            <BulkBar $accent={dims.accent}>
              <BulkCount $accent={dims.accent}>
                {selected.length} selected
              </BulkCount>
              <BulkAction
                $color={dims.textPrimary}
                onClick={() => setSelected([])}
              >
                Clear
              </BulkAction>
              <BulkAction $color={dims.textPrimary}>Power off</BulkAction>
              <BulkAction $color={dims.textPrimary}>Reboot</BulkAction>
              <BulkAction $color={dims.textPrimary}>Snapshot</BulkAction>
              <BulkAction $color="#b91c1c">Destroy</BulkAction>
            </BulkBar>
          )}

          <Table $surface={dims.surfaceBg} $border={dims.borderLight}>
            <TableHead $border={dims.borderLight} $color={dims.textMuted}>
              <Checkbox
                $checked={allChecked}
                $accent={dims.accent}
                $border={isDark ? "#5a5a66" : "#c8c8d0"}
                onClick={toggleAll}
              >
                {allChecked ? "✓" : ""}
              </Checkbox>
              <span>Name</span>
              <span>Status</span>
              <span>IP Address</span>
              <span>Region</span>
              <span>Size</span>
              <span>Created</span>
              <span />
            </TableHead>

            {filtered.length === 0 && (
              <div
                style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  color: dims.textMuted,
                }}
              >
                No Droplets match your filters.
              </div>
            )}

            {filtered.map((d) => {
              const attn = rowAttention[d.id];
              return (
              <TableRow
                key={d.id}
                $border={dims.borderLight}
                $hover={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"}
                $selected={selected.includes(d.id)}
                $selBg={`${dims.accent}0d`}
                $attnBar={attn ? attn.bar : null}
                onClick={() => toggleOne(d.id)}
              >
                <Checkbox
                  $checked={selected.includes(d.id)}
                  $accent={dims.accent}
                  $border={isDark ? "#5a5a66" : "#c8c8d0"}
                >
                  {selected.includes(d.id) ? "✓" : ""}
                </Checkbox>
                <NameCell>
                  <Avatar $bg={d.iconBg} $color={d.iconColor}>
                    {d.initials}
                  </Avatar>
                  <NameStack>
                    <NameMain
                      href={`/droplets/${d.id}`}
                      onClick={(e) => e.stopPropagation()}
                      $color={dims.textPrimary}
                      $accent={dims.accent}
                    >
                      {d.name}
                      {attn && (
                        <AttnRowChip
                          $bg={attn.chipBg}
                          $color={attn.chipColor}
                        >
                          {attn.label}
                        </AttnRowChip>
                      )}
                    </NameMain>
                    <NameSub $color={dims.textMuted}>{d.os}</NameSub>
                  </NameStack>
                </NameCell>
                <StatusPill
                  $bg={statusColors[d.status].bg}
                  $color={statusColors[d.status].color}
                >
                  {d.status}
                </StatusPill>
                <IpCell $color={dims.textSecondary}>{d.ip}</IpCell>
                <Cell $color={dims.textSecondary}>{d.region}</Cell>
                <Cell $color={dims.textSecondary}>{d.size}</Cell>
                <Cell $color={dims.textMuted}>{d.created}</Cell>
                <RowMenu
                  $color={dims.textMuted}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Row actions"
                >
                  ⋯
                </RowMenu>
              </TableRow>
              );
            })}
          </Table>

          <PageBar>
            <span style={{ color: dims.textMuted }}>
              Showing 1–{filtered.length} of {droplets.length}
            </span>
            <PageBtns>
              <PageBtn
                $color={dims.textPrimary}
                $accent={dims.accent}
                $border={dims.borderLight}
                disabled
              >
                ←
              </PageBtn>
              <PageBtn
                $active
                $color={dims.textPrimary}
                $accent={dims.accent}
                $border={dims.borderLight}
              >
                1
              </PageBtn>
              <PageBtn
                $color={dims.textPrimary}
                $accent={dims.accent}
                $border={dims.borderLight}
              >
                2
              </PageBtn>
              <PageBtn
                $color={dims.textPrimary}
                $accent={dims.accent}
                $border={dims.borderLight}
              >
                3
              </PageBtn>
              <PageBtn
                $color={dims.textPrimary}
                $accent={dims.accent}
                $border={dims.borderLight}
              >
                →
              </PageBtn>
            </PageBtns>
          </PageBar>
            </BrowseAllInner>
          </BrowseAll>
        </Page>
      )}
    </PageFrame>
  );
}
