"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ShellVariant, ShellDims, createMenuItems } from "../lib/theme";
import { icons } from "../lib/icons";

interface HeaderProps {
  variant: ShellVariant;
  dims: ShellDims;
  onToggleAssistant: () => void;
  assistantOpen: boolean;
  onBack?: () => void;
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
  padding-left: 20px;
  flex-shrink: 0;
  background: ${({ $variant, $dims }) =>
    $variant === "zen" ? $dims.accent : $dims.headerBg};
  border-bottom: ${({ $variant, $dims }) =>
    $variant === "floating" ? "none" : `1px solid ${$dims.borderLight}`};
  position: relative;
  z-index: 30;

  ${({ $variant, $dims }) =>
    $variant === "floating" &&
    css`
      border-radius: ${$dims.borderRadius}px;
      margin: ${$dims.gap}px ${$dims.gap}px 0 ${$dims.gap}px;
      border: 1px solid ${$dims.borderLight};
      overflow: visible;
    `}
`;

/* ──────────────────────────── Breadcrumbs ──────────────────────────── */

const BreadcrumbWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  overflow: visible;
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

const Segment = styled.button<HasDims & { $active: boolean }>`
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

  ${({ $active, $variant, $dims }) =>
    $active
      ? css`
          color: ${$variant === "zen" ? "#ffffff" : $dims.textPrimary};
          max-width: none;
          flex-shrink: 0;
        `
      : css`
          color: ${$variant === "zen"
            ? "rgba(255,255,255,0.7)"
            : "#878787"};
          max-width: 68px;
          flex-shrink: 1;
          &:hover {
            color: ${$variant === "zen" ? "#ffffff" : $dims.textPrimary};
          }
        `}
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

/* ───────────── Generic dropdown panels (anchored below) ───────────── */

const Popover = styled.div<{ $surface: string; $border: string }>`
  position: absolute;
  top: calc(100% + 4px);
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  z-index: 40;
  overflow: hidden;
  min-width: 220px;
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const PopoverItem = styled.button<{ $color: string; $hoverBg: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  color: ${(p) => p.$color};
  text-align: left;
  &:hover {
    background: ${(p) => p.$hoverBg};
  }
`;

const PopoverLabel = styled.div<{ $color: string }>`
  padding: 8px 14px 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => p.$color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PopoverDivider = styled.div<{ $color: string }>`
  height: 1px;
  background: ${(p) => p.$color};
  margin: 4px 0;
`;

const Swatch = styled.span<{ $color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

/* ────────────────────────────── Actions ────────────────────────────── */

const Actions = styled.div<HasDims>`
  display: flex;
  align-items: stretch;
  height: ${({ $dims }) => $dims.headerHeight}px;
  flex-shrink: 0;
  position: relative;
`;

const CreateAnchor = styled.div`
  position: relative;
  display: flex;
`;

const CreateButton = styled.button<HasDims & { $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  padding: 0 16px;
  background: ${({ $variant, $open }) => {
    if ($variant === "zen") {
      return $open ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.16)";
    }
    return $open ? "#00707f" : "#00879b";
  }};
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
    background: ${({ $variant }) =>
      $variant === "zen" ? "rgba(255,255,255,0.24)" : "#00707f"};
  }
`;

const CreateMenuPanel = styled.div<{ $surface: string; $border: string }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
  z-index: 40;
  min-width: 280px;
  padding: 6px 0;
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const SearchAnchor = styled.div`
  position: relative;
  display: flex;
`;

const SearchWrap = styled.div<HasDims & { $focused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  background: ${({ $variant, $dims }) =>
    $variant === "zen" ? "rgba(255,255,255,0.1)" : $dims.surfaceBg};
  min-width: 240px;
  border-left: 1px solid
    ${({ $variant, $dims, $focused }) =>
      $variant === "zen"
        ? "rgba(255,255,255,0.2)"
        : $focused
          ? $dims.accent
          : $dims.borderLight};
  border-right: 1px solid
    ${({ $variant, $dims, $focused }) =>
      $variant === "zen"
        ? "rgba(255,255,255,0.2)"
        : $focused
          ? $dims.accent
          : $dims.borderLight};
  transition: border-color 0.15s ease;
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
  color: ${({ $variant, $dims }) =>
    $variant === "zen" ? "#ffffff" : $dims.textPrimary};

  &::placeholder {
    color: ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.7)" : $dims.textMuted};
    font-weight: 500;
  }
`;

const SearchPopover = styled.div<{ $surface: string; $border: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  z-index: 40;
  max-height: 360px;
  overflow-y: auto;
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const AssistantButton = styled.button<HasDims & { $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  padding: 0 16px;
  width: auto;
  overflow: hidden;
  border: none;
  color: #ffffff;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  background: linear-gradient(
    17.61deg,
    rgb(0, 12, 121) 5.31%,
    rgb(10, 78, 235) 26.68%,
    rgb(0, 105, 255) 48.05%,
    rgb(198, 174, 255) 96.08%
  );
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.06);
  }

  ${({ $active }) =>
    $active &&
    css`
      filter: brightness(1.1);
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
    `}
`;

const KeyHint = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  opacity: 0.55;
  margin-left: 2px;
`;

/* ────────────────────────── Breadcrumb data ────────────────────────── */

const DEFAULT_BREADCRUMBS = [
  "Acme Corp",
  "Platform Engineering",
  "roadtrip-copilot",
  "Dashboard",
];

const BREADCRUMB_SIBLINGS: Record<string, string[]> = {
  "Acme Corp": ["Acme Corp", "Globex Inc.", "Initech", "+ New team"],
  "Platform Engineering": [
    "Platform Engineering",
    "Growth",
    "Data Science",
    "+ New project",
  ],
  "roadtrip-copilot": [
    "roadtrip-copilot",
    "fleet-tracker",
    "trip-planner-api",
    "+ New resource",
  ],
  Dashboard: ["Overview", "Insights", "Activity", "Settings"],
};

const SEARCH_RECENT = [
  "prod-llama-3 endpoint",
  "Production Postgres cluster",
  "VPC default-nyc1",
];

const SEARCH_SHORTCUTS = [
  { icon: "+", label: "Create Droplet" },
  { icon: "+", label: "Create Database" },
  { icon: "→", label: "Open Inference Hub" },
];

/* ───────────────────────────── Hooks ───────────────────────────── */

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

/* ───────────────────────────── Component ───────────────────────────── */

function Header({
  variant,
  dims,
  onToggleAssistant,
  assistantOpen,
  onBack,
  breadcrumbs = DEFAULT_BREADCRUMBS,
}: HeaderProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchAnchorRef = useRef<HTMLDivElement>(null);
  const createAnchorRef = useRef<HTMLDivElement>(null);
  const crumbAnchorRef = useRef<HTMLDivElement>(null);

  const [isMac, setIsMac] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openCrumb, setOpenCrumb] = useState<number | null>(null);

  useEffect(() => {
    const mac =
      typeof navigator !== "undefined" &&
      /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
    setIsMac(mac);
  }, []);

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

  useOutsideClose(createOpen, () => setCreateOpen(false), [createAnchorRef]);
  useOutsideClose(searchOpen, () => setSearchOpen(false), [searchAnchorRef]);
  useOutsideClose(openCrumb !== null, () => setOpenCrumb(null), [
    crumbAnchorRef,
  ]);

  const cmd = isMac ? "⌘" : "Ctrl+";
  const hoverBg = dims.surfaceBg === "#ffffff" ? "#f0f4ff" : "rgba(255,255,255,0.06)";

  // Filter search suggestions based on current input
  const matchedRecent = searchValue
    ? SEARCH_RECENT.filter((r) =>
        r.toLowerCase().includes(searchValue.toLowerCase())
      )
    : SEARCH_RECENT;
  const matchedShortcuts = searchValue
    ? SEARCH_SHORTCUTS.filter((s) =>
        s.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : SEARCH_SHORTCUTS;

  return (
    <Container $variant={variant} $dims={dims}>
      <BreadcrumbWrap>
        <BackButton
          $variant={variant}
          $dims={dims}
          aria-label="Go back"
          onClick={() => onBack?.()}
          type="button"
        >
          {icons.arrowLeft}
        </BackButton>
        <CrumbTrail ref={crumbAnchorRef}>
          {breadcrumbs.map((part, i) => {
            const isLast = i === breadcrumbs.length - 1;
            const siblings = BREADCRUMB_SIBLINGS[part];
            return (
              <CrumbGroup key={`${part}-${i}`}>
                <Segment
                  $variant={variant}
                  $dims={dims}
                  $active={isLast}
                  type="button"
                  title={part}
                  onClick={() => {
                    if (!siblings) return;
                    setOpenCrumb(openCrumb === i ? null : i);
                  }}
                  aria-haspopup={siblings ? "menu" : undefined}
                  aria-expanded={openCrumb === i ? true : undefined}
                >
                  {part}
                </Segment>
                {!isLast && (
                  <Separator $variant={variant} $dims={dims} aria-hidden>
                    /
                  </Separator>
                )}
                {openCrumb === i && siblings && (
                  <Popover
                    $surface={dims.surfaceBg}
                    $border={dims.borderLight}
                    style={{ left: 0 }}
                    role="menu"
                  >
                    <PopoverLabel $color={dims.textMuted}>
                      Switch
                    </PopoverLabel>
                    {siblings.map((s) => (
                      <PopoverItem
                        key={s}
                        $color={
                          s === part ? dims.accent : dims.textPrimary
                        }
                        $hoverBg={hoverBg}
                        type="button"
                        onClick={() => setOpenCrumb(null)}
                        role="menuitem"
                      >
                        {s === part ? icons.check : <span style={{ width: 12 }} />}
                        <span>{s}</span>
                      </PopoverItem>
                    ))}
                  </Popover>
                )}
              </CrumbGroup>
            );
          })}
        </CrumbTrail>
      </BreadcrumbWrap>

      <Actions $variant={variant} $dims={dims}>
        <CreateAnchor ref={createAnchorRef}>
          <CreateButton
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
          {createOpen && (
            <CreateMenuPanel
              $surface={dims.surfaceBg}
              $border={dims.borderLight}
              role="menu"
            >
              {createMenuItems.map((cat, idx) => (
                <React.Fragment key={cat.category}>
                  {idx > 0 && (
                    <PopoverDivider $color={dims.borderLight} />
                  )}
                  <PopoverLabel $color={dims.textMuted}>
                    {cat.category}
                  </PopoverLabel>
                  {cat.items.map((item) => (
                    <PopoverItem
                      key={item}
                      $color={dims.textPrimary}
                      $hoverBg={hoverBg}
                      type="button"
                      onClick={() => setCreateOpen(false)}
                      role="menuitem"
                    >
                      <span style={{ color: dims.textMuted, width: 14 }}>
                        +
                      </span>
                      <span>{item}</span>
                    </PopoverItem>
                  ))}
                </React.Fragment>
              ))}
            </CreateMenuPanel>
          )}
        </CreateAnchor>

        <SearchAnchor ref={searchAnchorRef}>
          <SearchWrap
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
            <SearchPopover
              $surface={dims.surfaceBg}
              $border={dims.borderLight}
            >
              {matchedRecent.length === 0 && matchedShortcuts.length === 0 && (
                <PopoverItem
                  $color={dims.textMuted}
                  $hoverBg={hoverBg}
                  as="div"
                >
                  No matches
                </PopoverItem>
              )}
              {matchedRecent.length > 0 && (
                <>
                  <PopoverLabel $color={dims.textMuted}>Recent</PopoverLabel>
                  {matchedRecent.map((r) => (
                    <PopoverItem
                      key={r}
                      $color={dims.textPrimary}
                      $hoverBg={hoverBg}
                      type="button"
                      onClick={() => {
                        setSearchValue(r);
                        setSearchOpen(false);
                      }}
                    >
                      <Swatch $color={dims.textMuted} />
                      <span>{r}</span>
                    </PopoverItem>
                  ))}
                </>
              )}
              {matchedShortcuts.length > 0 && (
                <>
                  {matchedRecent.length > 0 && (
                    <PopoverDivider $color={dims.borderLight} />
                  )}
                  <PopoverLabel $color={dims.textMuted}>
                    Shortcuts
                  </PopoverLabel>
                  {matchedShortcuts.map((s) => (
                    <PopoverItem
                      key={s.label}
                      $color={dims.textPrimary}
                      $hoverBg={hoverBg}
                      type="button"
                      onClick={() => setSearchOpen(false)}
                    >
                      <span style={{ color: dims.textMuted, width: 14 }}>
                        {s.icon}
                      </span>
                      <span>{s.label}</span>
                    </PopoverItem>
                  ))}
                </>
              )}
            </SearchPopover>
          )}
        </SearchAnchor>

        <AssistantButton
          $variant={variant}
          $dims={dims}
          $active={assistantOpen}
          type="button"
          onClick={onToggleAssistant}
          aria-label={`AI Assistant (${cmd}K)`}
          title={`AI Assistant (${cmd}K)`}
        >
          {icons.sparkles}
          AI Assistant
          <KeyHint>{cmd}K</KeyHint>
        </AssistantButton>
      </Actions>
    </Container>
  );
}

export default Header;
