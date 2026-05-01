"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  ShellVariant,
  ShellDims,
  createMenuItems,
  searchItems,
  searchRecentlyViewed,
  searchRecentlyCreated,
  breadcrumbPopovers,
} from "../lib/theme";
import { icons } from "../lib/icons";

interface HeaderProps {
  variant: ShellVariant;
  dims: ShellDims;
  onToggleAssistant: () => void;
  assistantOpen: boolean;
  onBack?: () => void;
  onToggleNotifications?: () => void;
  notificationsOpen?: boolean;
  breadcrumbs?: string[];
}

interface HasDims {
  $variant: ShellVariant;
  $dims: ShellDims;
}

/* ───────────────────────────── Container ───────────────────────────── */

const Container = styled.header<HasDims>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ $dims }) => $dims.headerHeight}px;
  padding-left: ${({ $variant }) => ($variant === "zen" ? "12px" : "20px")};
  padding-right: ${({ $variant }) => ($variant === "zen" ? "12px" : "0")};
  flex-shrink: 0;
  background: ${({ $variant, $dims }) =>
    $variant === "zen" ? $dims.accent : $dims.headerBg};
  border-bottom: ${({ $variant, $dims }) =>
    $variant === "floating" || $variant === "zen"
      ? "none"
      : `1px solid ${$dims.borderLight}`};
  position: relative;
  z-index: 30;

  ${({ $variant, $dims }) =>
    $variant === "floating" &&
    css`
      border-radius: ${$dims.borderRadius}px;
      margin: ${$dims.gap}px ${$dims.gap}px 0 ${$dims.gap}px;
      border: 1px solid ${$dims.borderLight};
    `}
`;

/* ──────────────────────────── Breadcrumbs ──────────────────────────── */

const BreadcrumbWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const BackButton = styled.button<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
  flex-shrink: 0;
  color: ${({ $variant, $dims }) =>
    $variant === "zen" ? "#ffffff" : $dims.textPrimary};
  transition: opacity 0.1s ease;

  &:hover {
    opacity: 0.65;
  }
`;

const HamburgerButton = styled.button<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 6px;
  border-radius: 6px;
  color: #ffffff;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

const CrumbTrail = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
`;

const CrumbGroup = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  position: relative;
`;

const Segment = styled.button<HasDims & { $active: boolean; $expanded: boolean }>`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  transition: max-width 0.15s ease, color 0.1s ease;

  ${({ $active, $expanded, $variant, $dims }) => {
    const isLitLight =
      $variant === "zen" ? "#ffffff" : $dims.textPrimary;
    const isLitDark =
      $variant === "zen" ? "rgba(255,255,255,0.7)" : "#878787";
    const lit = $active || $expanded;
    return css`
      color: ${lit ? isLitLight : isLitDark};
      max-width: ${lit ? "none" : "68px"};
      flex-shrink: ${$active ? 0 : 1};
      &:hover {
        color: ${$variant === "zen" ? "#ffffff" : $dims.textPrimary};
      }
    `;
  }}
`;

const Separator = styled.span<HasDims>`
  color: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.55)" : "#878787"};
  font-size: 13px;
  font-weight: 400;
  margin: 0 6px;
  user-select: none;
  flex-shrink: 0;
`;

/* ─── Blue breadcrumb popover (Header__Dropdown spec from live) ─── */

const BluePopover = styled.div<{ $wide?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #0061eb;
  border-radius: 6px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  min-width: ${(p) => (p.$wide ? "220px" : "140px")};
  max-width: ${(p) => (p.$wide ? "320px" : "200px")};
  max-height: ${(p) => (p.$wide ? "400px" : "none")};
  overflow-y: ${(p) => (p.$wide ? "auto" : "visible")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const BlueSectionHead = styled.div`
  font-weight: 500;
  font-size: 9px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 8px 0 4px;

  &:first-child {
    padding-top: 2px;
  }
`;

const BlueItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    opacity: 0.75;
  }
`;

const BlueItemLabel = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BlueItemDetail = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.45);
  margin-left: auto;
  padding-left: 8px;
  white-space: nowrap;
  flex-shrink: 0;
`;

/* ────────────────────────────── Actions ────────────────────────────── */

const Actions = styled.div<HasDims>`
  display: flex;
  align-items: ${({ $variant }) => ($variant === "zen" ? "center" : "stretch")};
  gap: ${({ $variant }) => ($variant === "zen" ? "6px" : "0")};
  height: ${({ $dims, $variant }) => ($variant === "zen" ? "auto" : `${$dims.headerHeight}px`)};
  flex-shrink: 0;
  position: relative;
`;

const Anchor = styled.div`
  position: relative;
  display: flex;
`;

/* ── Create button (full-height standard) and ZenTrigger (compact) ── */

const CreateButton = styled.button<HasDims & { $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  padding: 0 16px;
  background: ${({ $open }) => ($open ? "#00707f" : "#00879b")};
  border: none;
  color: #ffffff;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: #00707f;
  }
`;

const ZenIconButton = styled.button<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  height: 32px;
  min-width: 32px;
  padding: 0 ${(p) => (p.$open ? "12px" : "9px")};
  border-radius: 6px;
  background: ${(p) =>
    p.$open ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)"};
  border: none;
  cursor: pointer;
  color: #ffffff;
  flex-shrink: 0;
  gap: ${(p) => (p.$open ? "6px" : "0")};
  overflow: hidden;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  transition: background 0.25s ease, gap 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    padding 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    gap: 6px;
    padding: 0 12px;
  }
`;

const ZenLabel = styled.span<{ $forceOpen?: boolean }>`
  max-width: ${(p) => (p.$forceOpen ? "120px" : "0")};
  overflow: hidden;
  opacity: ${(p) => (p.$forceOpen ? 1 : 0)};
  white-space: nowrap;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  transition: max-width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.25s ease;

  button:hover > & {
    max-width: 120px;
    opacity: 1;
  }
`;

/* ── Create 2-level menu (CreateMenu__MenuPanel + FlyoutPanel) ── */

const CreatePanel = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 100;
  width: 220px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  font-family: var(--font-inter), "Inter", sans-serif;
  padding: 4px 0;
`;

const CategoryRow = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 38px;
  padding: 0 16px;
  background: ${(p) => (p.$active ? "#f3f4f6" : "transparent")};
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.1s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

const CategoryLabel = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  color: #1a1a1a;
  white-space: nowrap;
`;

const ChevronArea = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #878787;
`;

const FlyoutPanel = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 101;
  min-width: 240px;
  padding: 6px 0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const SubItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 38px;
  padding: 0 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: #f3f4f6;
  }
`;

const SubItemLabel = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1;
  color: #1a1a1a;
  white-space: nowrap;
`;

const Badge = styled.span<{ $variant: "Beta" | "New" }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  padding: 3px 6px;
  border-radius: 3px;
  white-space: nowrap;
  flex-shrink: 0;
  color: ${(p) => (p.$variant === "Beta" ? "#116932" : "#1e40af")};
  background: ${(p) => (p.$variant === "Beta" ? "#dcfce7" : "#dbeafe")};
`;

/* ── Search field + dropdown ── */

const SearchAnchor = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

const SearchWrap = styled.div<HasDims & { $focused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  background: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.1)" : "#ffffff"};
  min-width: 240px;
  border-left: 1px solid
    ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.2)" : $dims.borderLight};
  border-right: 1px solid
    ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.2)" : $dims.borderLight};
`;

const SearchIcon = styled.span<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  flex-shrink: 0;
  color: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.7)" : "#999999"};
`;

const SearchInput = styled.input<HasDims>`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${({ $variant }) => ($variant === "zen" ? "#ffffff" : "#000000")};

  &::placeholder {
    color: ${({ $variant }) =>
      $variant === "zen" ? "rgba(255,255,255,0.7)" : "#999999"};
    font-weight: 500;
  }
`;

const SearchDropdown = styled.div<{ $width: number }>`
  position: absolute;
  top: calc(100% + 0px);
  left: 0;
  width: ${(p) => Math.max(p.$width, 360)}px;
  max-height: 420px;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-top: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 2000;
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const SectionHeader = styled.div`
  padding: 10px 16px 4px;
  font-weight: 600;
  font-size: 11px;
  color: #878787;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ResultRow = styled.button<{ $highlighted: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 40px;
  border: none;
  font-family: inherit;
  font-weight: 500;
  font-size: 13px;
  color: #000000;
  cursor: pointer;
  background: ${(p) => (p.$highlighted ? "#f0f4ff" : "transparent")};
  gap: 8px;
  text-align: left;

  &:hover {
    background: #f0f4ff;
  }
`;

const ResultLabel = styled.span`
  flex-shrink: 0;
`;

const Match = styled.span`
  color: #0061eb;
  font-weight: 600;
`;

const ResultDetail = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #878787;
  margin-left: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultEnter = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: #878787;
`;

const NoResults = styled.div`
  padding: 20px 16px;
  font-size: 13px;
  color: #999999;
  text-align: center;
`;

/* ── AI Assistant button ── */

const AssistantButton = styled.button<HasDims & { $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  padding: ${({ $active }) => ($active ? "0 12px 0 16px" : "0 16px")};
  width: ${({ $active }) => ($active ? "440px" : "auto")};
  overflow: hidden;
  border: none;
  color: #ffffff;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  white-space: nowrap;
  background: linear-gradient(
    17.61deg,
    rgb(0, 12, 121) 5.31%,
    rgb(10, 78, 235) 26.68%,
    rgb(0, 105, 255) 48.05%,
    rgb(198, 174, 255) 96.08%
  );
  transition: width 0.22s cubic-bezier(0.2, 0, 0, 1), filter 0.15s ease;
  flex-shrink: 0;

  &:hover {
    filter: ${({ $active }) => ($active ? "none" : "brightness(1.06)")};
  }
`;

const KeyHint = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  opacity: 0.55;
  margin-left: 2px;
`;

const AssistantHeaderRow = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const AssistantBeta = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: rgba(255, 255, 255, 0.22);
  padding: 2px 6px;
  border-radius: 10px;
  color: #ffffff;
`;

const AssistantHeaderActions = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
`;

const PanelIconButton = styled.span`
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
  }
`;

/* ────────────────────────── Hooks + helpers ────────────────────────── */

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  refs: React.RefObject<T | null>[]
) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (refs.every((r) => r.current && !r.current.contains(t))) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, refs]);
}

// Splits a label so the matched substring (case-insensitive) is wrapped
// in <Match>.
function highlight(label: string, query: string): React.ReactNode {
  if (!query) return label;
  const idx = label.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return label;
  return (
    <>
      {label.slice(0, idx)}
      <Match>{label.slice(idx, idx + query.length)}</Match>
      {label.slice(idx + query.length)}
    </>
  );
}

const DEFAULT_BREADCRUMBS = [
  "Acme Corp",
  "Platform Engineering",
  "roadtrip-copilot",
  "Dashboard",
];

/* ───────────────────────────── Component ───────────────────────────── */

function Header({
  variant,
  dims,
  onToggleAssistant,
  assistantOpen,
  onBack,
  onToggleNotifications,
  notificationsOpen,
  breadcrumbs = DEFAULT_BREADCRUMBS,
}: HeaderProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchAnchorRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const createAnchorRef = useRef<HTMLDivElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const crumbAnchorRef = useRef<HTMLDivElement>(null);

  const [isMac, setIsMac] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [createCat, setCreateCat] = useState<string | null>(null);
  const [createAnchorRect, setCreateAnchorRect] = useState<DOMRect | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchWrapWidth, setSearchWrapWidth] = useState(360);
  const [openCrumb, setOpenCrumb] = useState<number | null>(null);
  const [crumbWidth, setCrumbWidth] = useState(800);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);

  useEffect(() => {
    const mac =
      typeof navigator !== "undefined" &&
      /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
    setIsMac(mac);
  }, []);

  // ⌘K toggles AI Assistant. ⌘/ focuses search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === "k") {
        e.preventDefault();
        onToggleAssistant();
      } else if (key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onToggleAssistant]);

  // Watch breadcrumb wrap width to trigger collapsed (… ellipsis) state
  // when space is tight (e.g. when both side panels are open).
  useEffect(() => {
    if (!crumbAnchorRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 800;
      setCrumbWidth(w);
    });
    obs.observe(crumbAnchorRef.current);
    return () => obs.disconnect();
  }, []);

  useOutsideClose(ellipsisOpen, () => setEllipsisOpen(false), [crumbAnchorRef]);

  // Track Create button anchor rect for fixed-position panel.
  useEffect(() => {
    if (!createOpen) {
      setCreateCat(null);
      return;
    }
    const update = () => {
      const r = createButtonRef.current?.getBoundingClientRect() ?? null;
      setCreateAnchorRect(r);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [createOpen]);

  // Track search wrap width for matching dropdown width.
  useEffect(() => {
    const update = () => {
      const w = searchWrapRef.current?.getBoundingClientRect().width ?? 360;
      setSearchWrapWidth(w);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });

  useOutsideClose(createOpen, () => setCreateOpen(false), [
    createAnchorRef,
    flyoutRef,
  ]);
  useOutsideClose(searchOpen, () => setSearchOpen(false), [searchAnchorRef]);
  useOutsideClose(openCrumb !== null, () => setOpenCrumb(null), [
    crumbAnchorRef,
  ]);

  const cmd = isMac ? "⌘" : "Ctrl+";

  // Search filtering: when user types, filter all items by label OR detail.
  // When empty, show RECENTLY VIEWED + RECENTLY CREATED.
  const filtered = useMemo(() => {
    if (!searchValue.trim()) {
      const recentlyViewed = searchRecentlyViewed
        .map((label) => searchItems.find((i) => i.label === label))
        .filter(Boolean) as typeof searchItems;
      const recentlyCreated = searchRecentlyCreated
        .map((label) => searchItems.find((i) => i.label === label))
        .filter(Boolean) as typeof searchItems;
      return [
        { title: "Recently Viewed", items: recentlyViewed },
        { title: "Recently Created", items: recentlyCreated },
      ];
    }
    const q = searchValue.toLowerCase();
    const matches = searchItems.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.detail || "").toLowerCase().includes(q)
    );
    // Group by section in original order.
    const groups: { title: string; items: typeof searchItems }[] = [];
    for (const m of matches) {
      const g = groups.find((g) => g.title === m.section);
      if (g) g.items.push(m);
      else groups.push({ title: m.section, items: [m] });
    }
    return groups;
  }, [searchValue]);

  /* ─────────────── Layout: standard / floating / compact ─────────────── */

  const isZen = variant === "zen";

  // Decide which segments to show. When the trail is narrow, collapse
  // middle segments into a "…" button that opens a popover listing them.
  const segmentsToRender = (() => {
    if (breadcrumbs.length <= 2 || crumbWidth >= 320) {
      return breadcrumbs.map((label, i) => ({
        kind: "segment" as const,
        label,
        index: i,
      }));
    }
    if (crumbWidth >= 200) {
      // Show first + … + last
      return [
        { kind: "segment" as const, label: breadcrumbs[0], index: 0 },
        { kind: "ellipsis" as const, hidden: breadcrumbs.slice(1, -1) },
        {
          kind: "segment" as const,
          label: breadcrumbs[breadcrumbs.length - 1],
          index: breadcrumbs.length - 1,
        },
      ];
    }
    // Very narrow: show only the active (last) segment
    return [
      { kind: "ellipsis" as const, hidden: breadcrumbs.slice(0, -1) },
      {
        kind: "segment" as const,
        label: breadcrumbs[breadcrumbs.length - 1],
        index: breadcrumbs.length - 1,
      },
    ];
  })();

  const ellipsisItems =
    segmentsToRender.find((s) => s.kind === "ellipsis")?.hidden ?? [];

  const renderBreadcrumb = () => (
    <CrumbTrail ref={crumbAnchorRef}>
      {segmentsToRender.map((entry, idx) => {
        if (entry.kind === "ellipsis") {
          const isLastEntry = idx === segmentsToRender.length - 1;
          return (
            <CrumbGroup key={`ellipsis-${idx}`}>
              <Segment
                $variant={variant}
                $dims={dims}
                $active={false}
                $expanded={ellipsisOpen}
                type="button"
                title="More"
                onClick={() => setEllipsisOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={ellipsisOpen || undefined}
                style={{ maxWidth: "none" }}
              >
                …
              </Segment>
              {!isLastEntry && (
                <Separator $variant={variant} $dims={dims} aria-hidden>
                  /
                </Separator>
              )}
              {ellipsisOpen && entry.hidden.length > 0 && (
                <BluePopover role="menu">
                  <BlueSectionHead>HIDDEN BREADCRUMBS</BlueSectionHead>
                  {entry.hidden.map((label) => (
                    <BlueItem
                      key={label}
                      type="button"
                      onClick={() => setEllipsisOpen(false)}
                    >
                      <BlueItemLabel>{label}</BlueItemLabel>
                    </BlueItem>
                  ))}
                </BluePopover>
              )}
            </CrumbGroup>
          );
        }
        const i = entry.index;
        const part = entry.label;
        const isLast = i === breadcrumbs.length - 1;
        const popover = breadcrumbPopovers[part];
        const expanded = openCrumb === i;
        const wide = !!(popover && (popover.sections[0]?.items.length ?? 0) > 5);
        return (
          <CrumbGroup key={`${part}-${i}`}>
            <Segment
              $variant={variant}
              $dims={dims}
              $active={isLast}
              $expanded={expanded}
              type="button"
              title={part}
              onClick={() => {
                if (!popover) return;
                setOpenCrumb(expanded ? null : i);
              }}
              aria-haspopup={popover ? "menu" : undefined}
              aria-expanded={expanded || undefined}
            >
              {part}
            </Segment>
            {!isLast && (
              <Separator $variant={variant} $dims={dims} aria-hidden>
                /
              </Separator>
            )}
            {expanded && popover && (
              <BluePopover $wide={wide} role="menu">
                {popover.sections.map((sec, si) => (
                  <React.Fragment key={sec.title}>
                    <BlueSectionHead
                      style={{ paddingTop: si === 0 ? 2 : 8 }}
                    >
                      {sec.title.toUpperCase()}
                    </BlueSectionHead>
                    {sec.items.map((it) => (
                      <BlueItem
                        key={`${sec.title}-${it.label}`}
                        type="button"
                        onClick={() => setOpenCrumb(null)}
                      >
                        <BlueItemLabel>{it.label}</BlueItemLabel>
                        {it.detail && (
                          <BlueItemDetail>{it.detail}</BlueItemDetail>
                        )}
                      </BlueItem>
                    ))}
                  </React.Fragment>
                ))}
              </BluePopover>
            )}
          </CrumbGroup>
        );
      })}
    </CrumbTrail>
  );

  /* ─────────────── Create button (fixed-anchored 2-level) ─────────────── */

  const activeCategory = createCat
    ? createMenuItems.find((c) => c.label === createCat)
    : null;

  const createPanelLeft = createAnchorRect
    ? createAnchorRect.right - 220
    : 0;
  const createPanelTop = createAnchorRect
    ? createAnchorRect.bottom + 4
    : 0;
  const flyoutLeft = createAnchorRect
    ? createAnchorRect.right - 220 - 244 // 220 panel + 24px overlap right
    : 0;

  const renderCreate = () => {
    return (
      <Anchor ref={createAnchorRef}>
        {isZen ? (
          <ZenIconButton
            ref={createButtonRef}
            type="button"
            onClick={() => setCreateOpen((o) => !o)}
            $open={createOpen}
            aria-haspopup="menu"
            aria-expanded={createOpen}
            aria-label="Create"
          >
            {icons.plusBold}
            <ZenLabel $forceOpen={createOpen}>Create</ZenLabel>
          </ZenIconButton>
        ) : (
          <CreateButton
            ref={createButtonRef}
            $variant={variant}
            $dims={dims}
            $open={createOpen}
            type="button"
            onClick={() => setCreateOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={createOpen}
          >
            {icons.plusBold}
            Create
          </CreateButton>
        )}
        {createOpen && createAnchorRect && (
          <>
            <CreatePanel
              role="menu"
              style={{
                top: `${createPanelTop}px`,
                left: `${createPanelLeft}px`,
              }}
            >
              {createMenuItems.map((cat) => (
                <CategoryRow
                  key={cat.label}
                  type="button"
                  $active={createCat === cat.label}
                  onMouseEnter={() => setCreateCat(cat.label)}
                  onClick={() => setCreateCat(cat.label)}
                  aria-haspopup="menu"
                  aria-expanded={createCat === cat.label}
                >
                  <CategoryLabel>{cat.label}</CategoryLabel>
                  <ChevronArea>{icons.chevronRight}</ChevronArea>
                </CategoryRow>
              ))}
            </CreatePanel>
            {activeCategory && (
              <FlyoutPanel
                ref={flyoutRef}
                role="menu"
                style={{
                  top: `${createPanelTop}px`,
                  left: `${flyoutLeft}px`,
                }}
              >
                {activeCategory.items.map((item) => (
                  <SubItem
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setCreateOpen(false);
                      setCreateCat(null);
                    }}
                  >
                    <SubItemLabel>{item.label}</SubItemLabel>
                    {item.badge && (
                      <Badge $variant={item.badge}>{item.badge}</Badge>
                    )}
                  </SubItem>
                ))}
              </FlyoutPanel>
            )}
          </>
        )}
      </Anchor>
    );
  };

  /* ─────────────── Search inline dropdown ─────────────── */

  const renderSearch = () => {
    if (isZen) {
      return (
        <Anchor>
          <ZenIconButton
            type="button"
            onClick={() => searchRef.current?.focus()}
            aria-label="Search"
          >
            {icons.searchSm}
          </ZenIconButton>
        </Anchor>
      );
    }
    return (
      <SearchAnchor ref={searchAnchorRef}>
        <SearchWrap
          ref={searchWrapRef}
          $variant={variant}
          $dims={dims}
          $focused={searchOpen}
        >
          <SearchIcon $variant={variant} $dims={dims} aria-hidden>
            {icons.searchSm}
          </SearchIcon>
          <SearchInput
            ref={searchRef}
            $variant={variant}
            $dims={dims}
            type="text"
            placeholder="Search..."
            aria-label="Search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
          />
        </SearchWrap>
        {searchOpen && (
          <SearchDropdown $width={searchWrapWidth}>
            {filtered.every((g) => g.items.length === 0) && (
              <NoResults>No matches</NoResults>
            )}
            {filtered.map(
              (group, gi) =>
                group.items.length > 0 && (
                  <React.Fragment key={group.title}>
                    <SectionHeader>{group.title.toUpperCase()}</SectionHeader>
                    {group.items.map((it, ri) => {
                      const top = gi === 0 && ri === 0;
                      return (
                        <ResultRow
                          key={`${group.title}-${it.label}`}
                          type="button"
                          $highlighted={top}
                          onClick={() => {
                            setSearchValue(it.label);
                            setSearchOpen(false);
                          }}
                        >
                          <ResultLabel>
                            {highlight(it.label, searchValue)}
                          </ResultLabel>
                          {it.detail && (
                            <ResultDetail>{it.detail}</ResultDetail>
                          )}
                          {top && <ResultEnter>{icons.enterReturn}</ResultEnter>}
                        </ResultRow>
                      );
                    })}
                  </React.Fragment>
                )
            )}
          </SearchDropdown>
        )}
      </SearchAnchor>
    );
  };

  /* ─────────────── AI Assistant button ─────────────── */

  const renderAssistant = () =>
    isZen ? (
      <ZenIconButton
        type="button"
        onClick={onToggleAssistant}
        aria-label={`AI Assistant (${cmd}K)`}
        title={`AI Assistant (${cmd}K)`}
      >
        {icons.sparkles}
      </ZenIconButton>
    ) : assistantOpen ? (
      <AssistantButton
        $variant={variant}
        $dims={dims}
        $active
        type="button"
        aria-label="AI Assistant"
        onClick={(e) => {
          // panel-header mode: clicking outside the icon buttons does nothing
          e.stopPropagation();
        }}
      >
        <AssistantHeaderRow>
          {icons.sparkles}
          AI Assistant
          <AssistantBeta>Beta</AssistantBeta>
        </AssistantHeaderRow>
        <AssistantHeaderActions>
          <PanelIconButton
            role="button"
            aria-label="Minimize"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onToggleAssistant();
            }}
          >
            {icons.minimize}
          </PanelIconButton>
          <PanelIconButton
            role="button"
            aria-label="Close"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onToggleAssistant();
            }}
          >
            {icons.close}
          </PanelIconButton>
        </AssistantHeaderActions>
      </AssistantButton>
    ) : (
      <AssistantButton
        $variant={variant}
        $dims={dims}
        $active={false}
        type="button"
        onClick={onToggleAssistant}
        aria-label={`AI Assistant (${cmd}K)`}
        title={`AI Assistant (${cmd}K)`}
      >
        {icons.sparkles}
        AI Assistant
        <KeyHint>{cmd}K</KeyHint>
      </AssistantButton>
    );

  return (
    <Container $variant={variant} $dims={dims}>
      <BreadcrumbWrap>
        {isZen ? (
          <HamburgerButton
            $variant={variant}
            $dims={dims}
            type="button"
            aria-label="Open navigation"
            onClick={() => onToggleNotifications?.()}
          >
            {icons.hamburger}
          </HamburgerButton>
        ) : (
          <BackButton
            $variant={variant}
            $dims={dims}
            aria-label="Go back"
            onClick={() => onBack?.()}
            type="button"
          >
            {icons.arrowLeft}
          </BackButton>
        )}
        {renderBreadcrumb()}
      </BreadcrumbWrap>

      <Actions $variant={variant} $dims={dims}>
        {renderCreate()}
        {renderSearch()}
        {renderAssistant()}
      </Actions>
    </Container>
  );
}

export default Header;
