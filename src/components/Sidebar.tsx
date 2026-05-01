"use client";

import React, { useState } from "react";
import styled from "styled-components";
import type { ShellVariant, ColorMode, ShellDims } from "../lib/theme";
import { navItems } from "../lib/theme";
import { icons } from "../lib/icons";

interface DimProps {
  $dims: ShellDims;
  $variant: ShellVariant;
}

// Sidebar width is variant-specific and expands when the user hits the
// bottom collapse-toggle. Live source: width transitions over 0.15s.
const Wrap = styled.aside<DimProps & { $hidden: boolean; $expanded: boolean }>`
  position: relative;
  display: ${(p) => (p.$hidden ? "none" : "flex")};
  flex-direction: column;
  flex-shrink: 0;
  width: ${(p) =>
    p.$expanded ? p.$dims.sidebarOpen : p.$dims.sidebarCollapsed}px;
  min-width: ${(p) =>
    p.$expanded ? p.$dims.sidebarOpen : p.$dims.sidebarCollapsed}px;
  height: 100%;
  background: ${(p) => p.$dims.sidebarBg};
  border-right: 1px solid ${(p) => p.$dims.borderLight};
  z-index: 20;
  transition: width 0.15s cubic-bezier(0.2, 0, 0, 1),
    min-width 0.15s cubic-bezier(0.2, 0, 0, 1);

  ${(p) =>
    p.$variant === "floating" &&
    `
    border-radius: ${p.$dims.borderRadius}px;
    margin: ${p.$dims.gap}px 0 ${p.$dims.gap}px ${p.$dims.gap}px;
    border: 1px solid ${p.$dims.borderLight};
  `}
`;

// Logo block stretches to match the sidebar width when expanded, but the
// mark stays anchored to the left in its original collapsed-width square so
// it doesn't appear to slide across the top when the user toggles open.
const LogoBlock = styled.div<{ $headerHeight: number; $width: number; $iconSize: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: ${(p) => p.$width}px;
  height: ${(p) => p.$headerHeight}px;
  flex-shrink: 0;
  background: #0061eb;
  cursor: pointer;
  transition: width 0.15s cubic-bezier(0.2, 0, 0, 1);

  & > svg {
    width: 22px;
    height: 22px;
    margin-left: ${(p) => Math.round((p.$iconSize - 22) / 2)}px;
  }
`;

const LogoMark = styled.svg`
  width: 22px;
  height: 22px;
`;

const NavScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  padding: 8px 0;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

// Live source: hovered nav row gets a solid #0061eb (accent) background
// across the full sidebar width, white icon — visually contiguous with the
// blue flyout that opens to its right. When expanded, the icon stays in
// its original collapsed-width square (left edge) and the label flows to
// the right; the icon never slides.
const NavItemRow = styled.button<
  DimProps & { $active: boolean; $hovered: boolean; $expanded: boolean }
>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
  width: ${(p) =>
    p.$expanded ? p.$dims.sidebarOpen : p.$dims.sidebarCollapsed}px;
  height: ${(p) => p.$dims.sidebarCollapsed}px;
  padding: 0;
  background: ${(p) => (p.$hovered ? "#0061eb" : "transparent")};
  border: none;
  cursor: pointer;
  color: ${(p) =>
    p.$hovered
      ? "#ffffff"
      : p.$active
      ? p.$dims.accent
      : p.$dims.textSecondary};
  flex-shrink: 0;
  transition: color 0.1s ease, background 0.1s ease,
    width 0.15s cubic-bezier(0.2, 0, 0, 1);

  ${(p) =>
    p.$active &&
    !p.$hovered &&
    `
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 12px;
      bottom: 12px;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: ${p.$dims.accent};
    }
  `}

  &:hover {
    background: #0061eb;
    color: #ffffff;
  }
`;

// Fixed-size icon slot that matches the collapsed sidebar width — the icon
// stays put when the sidebar expands.
const IconSlot = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  flex-shrink: 0;
`;

const NavLabel = styled.span<{ $color: string }>`
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  color: ${(p) => p.$color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  flex: 1;
  min-width: 0;
`;

/* ──────────── Blue flyout (one per nav item, on hover) ──────────── */

// Live source: Sidebar__FixedFlyout — adjacent to the sidebar (no gap),
// solid #0061eb, no border-radius, no shadow. Items 52px tall, padding
// 0 19px, white Epilogue 13px / 500.
const Flyout = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${(p) => p.$top}px;
  left: ${(p) => p.$left}px;
  background: #0061eb;
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  min-width: 192px;
  box-shadow: none;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
`;

const FlyoutItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 19px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  color: #ffffff;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

/* ──────────── Bottom utilities ──────────── */

const BottomSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 4px;
  flex-shrink: 0;
  border-top: 1px solid transparent;
`;

const BottomButton = styled.button<DimProps & { $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${(p) => (p.$active ? `${p.$dims.accent}14` : "none")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${(p) =>
    p.$active ? p.$dims.accent : p.$dims.textSecondary};
  transition: background 0.1s ease, color 0.1s ease;

  &:hover {
    background: ${(p) => p.$dims.borderLight};
    color: ${(p) => p.$dims.textPrimary};
  }
`;

const RedDot = styled.span<{ $sidebarBg: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 7px;
  height: 7px;
  background: #ef4444;
  border-radius: 50%;
  border: 1.5px solid ${(p) => p.$sidebarBg};
`;

interface SidebarProps {
  variant: ShellVariant;
  colorMode: ColorMode;
  dims: ShellDims;
  onOpenAssistant?: () => void;
  onToggleNotifications?: () => void;
  notificationsOpen?: boolean;
}

// Plain circle — neutral placeholder mark, no risk of being read as a
// hamburger menu or other control.
const DOLogoSVG = (
  <LogoMark viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" fill="#ffffff" />
  </LogoMark>
);

// Sidebar navigation links — top-level icon + flyout sub-items
const NAV_LINKS: Record<string, string> = {
  "AI Starter Kit": "/home",
  "Inference Hub": "/playground",
  Compute: "/droplets",
  Databases: "/database/create",
};

const SUB_LINKS: Record<string, string> = {
  Droplets: "/droplets",
  "GPU Droplets": "/droplets",
  "Inference Overview": "/playground",
  "Managed Database": "/database/create",
  "Inference Endpoints": "/playground",
};

function navigate(href: string) {
  if (typeof window !== "undefined") window.location.href = href;
}

export default function Sidebar({
  variant,
  colorMode: _colorMode,
  dims,
  onOpenAssistant,
  onToggleNotifications,
  notificationsOpen,
}: SidebarProps) {
  void onOpenAssistant;
  const [activeItem, setActiveItem] = useState(navItems[1]?.label ?? "Inference Hub");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredTop, setHoveredTop] = useState(0);
  // Click the bottom collapse-toggle to expand the sidebar to its open width.
  // When expanded, labels render inline next to the icons and the hover
  // flyout is suppressed (since the labels are visible).
  const [expanded, setExpanded] = useState(false);

  const onEnter = (label: string, el: HTMLElement) => {
    setHoveredItem(label);
    const r = el.getBoundingClientRect();
    setHoveredTop(r.top);
  };

  const hovered = navItems.find((n) => n.label === hoveredItem);

  // Zen variant: hide sidebar entirely (header gets a hamburger).
  const hidden = variant === "zen";

  return (
    <Wrap
      $variant={variant}
      $dims={dims}
      $hidden={hidden}
      $expanded={expanded}
    >
      <LogoBlock
        $headerHeight={dims.headerHeight}
        $width={expanded ? dims.sidebarOpen : dims.sidebarCollapsed}
        $iconSize={dims.sidebarCollapsed}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        title="Home"
      >
        {DOLogoSVG}
      </LogoBlock>

      <NavScroll
        onMouseLeave={() => setHoveredItem(null)}
      >
        {navItems.map((item) => (
          <NavItemRow
            key={item.label}
            $variant={variant}
            $dims={dims}
            $active={activeItem === item.label}
            $hovered={hoveredItem === item.label}
            $expanded={expanded}
            type="button"
            onClick={() => {
              setActiveItem(item.label);
              const href = NAV_LINKS[item.label];
              if (href) navigate(href);
            }}
            onMouseEnter={(e) => onEnter(item.label, e.currentTarget)}
            title={item.label}
          >
            <IconSlot $size={dims.sidebarCollapsed}>
              {icons[item.icon]}
            </IconSlot>
            {expanded && (
              <NavLabel
                $color={
                  hoveredItem === item.label
                    ? "#ffffff"
                    : activeItem === item.label
                    ? dims.accent
                    : dims.textSecondary
                }
              >
                {item.label}
              </NavLabel>
            )}
          </NavItemRow>
        ))}

        {hovered && hovered.items.length > 0 && (
          <Flyout
            $top={hoveredTop}
            $left={expanded ? dims.sidebarOpen : dims.sidebarCollapsed}
          >
            {hovered.items.map((sub) => {
              const href = SUB_LINKS[sub];
              return (
                <FlyoutItem
                  key={sub}
                  type="button"
                  onClick={() => href && navigate(href)}
                  style={{ cursor: href ? "pointer" : "default" }}
                >
                  {sub}
                </FlyoutItem>
              );
            })}
          </Flyout>
        )}
      </NavScroll>

      <BottomSection>
        <BottomButton
          $variant={variant}
          $dims={dims}
          $active={notificationsOpen}
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => onToggleNotifications?.()}
        >
          {icons.bell}
          <RedDot $sidebarBg={dims.sidebarBg} />
        </BottomButton>
        <BottomButton
          $variant={variant}
          $dims={dims}
          type="button"
          aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
          title={expanded ? "Collapse" : "Expand"}
          onClick={() => setExpanded((e) => !e)}
          style={{
            transform: expanded ? "scaleX(-1)" : "none",
            transition: "transform 0.15s ease",
          }}
        >
          {icons.collapseLeft}
        </BottomButton>
      </BottomSection>
    </Wrap>
  );
}
