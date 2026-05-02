"use client";

import React, { useState } from "react";
import styled from "styled-components";
import type { ShellVariant, ColorMode, ShellDims } from "../lib/theme";
import { navItems, MOBILE_MEDIA, MOBILE_DRAWER_WIDTH } from "../lib/theme";
import { icons } from "../lib/icons";

interface DimProps {
  $dims: ShellDims;
  $variant: ShellVariant;
}

// Backdrop only renders when the drawer is open on mobile. Tap-out closes.
const Backdrop = styled.button<{ $open: boolean }>`
  display: none;

  @media ${MOBILE_MEDIA} {
    display: ${(p) => (p.$open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(15, 18, 28, 0.45);
    border: none;
    padding: 0;
    z-index: 60;
    cursor: pointer;
    animation: fadeBackdrop 0.18s ease;
  }

  @keyframes fadeBackdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Sidebar width is variant-specific and expands when the user hits the
// bottom collapse-toggle. On mobile the desktop variant collapses out of
// flow and the sidebar slides in from the left as an overlay drawer.
const Wrap = styled.aside<
  DimProps & { $hidden: boolean; $expanded: boolean; $mobileOpen: boolean }
>`
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

  @media ${MOBILE_MEDIA} {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100dvh;
    width: ${MOBILE_DRAWER_WIDTH}px;
    min-width: ${MOBILE_DRAWER_WIDTH}px;
    border-right: 1px solid ${(p) => p.$dims.borderLight};
    border-radius: 0;
    margin: 0;
    transform: translateX(${(p) => (p.$mobileOpen ? "0" : "-100%")});
    transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
    z-index: 70;
    display: flex;
    box-shadow: ${(p) =>
      p.$mobileOpen ? "8px 0 32px rgba(0, 0, 0, 0.18)" : "none"};
  }
`;

// Logo block stretches to match the sidebar width when expanded, but the
// mark stays anchored to the left in its original collapsed-width square so
// it doesn't appear to slide across the top when the user toggles open.
const LogoBlock = styled.div<{
  $headerHeight: number;
  $width: number;
  $iconSize: number;
}>`
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

  @media ${MOBILE_MEDIA} {
    width: ${MOBILE_DRAWER_WIDTH}px;
    height: 56px;
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
// the right; the icon never slides. On mobile, the row spans the full
// drawer width and the label is always visible.
const NavItemRow = styled.button<
  DimProps & {
    $active: boolean;
    $hovered: boolean;
    $expanded: boolean;
  }
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

  @media ${MOBILE_MEDIA} {
    width: ${MOBILE_DRAWER_WIDTH}px;
    height: 48px;
    background: ${(p) => (p.$active ? `${p.$dims.accent}10` : "transparent")};
    color: ${(p) => (p.$active ? p.$dims.accent : p.$dims.textPrimary)};
    &:hover {
      background: ${(p) => `${p.$dims.accent}10`};
      color: ${(p) => p.$dims.accent};
    }
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

  @media ${MOBILE_MEDIA} {
    width: 48px;
    height: 48px;
  }
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
// 0 19px, white Epilogue 13px / 500. Hidden entirely on mobile (touch
// devices don't get hover; the drawer reveals labels and we render
// the sub-items inline below the parent instead).
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

  @media ${MOBILE_MEDIA} {
    display: none;
  }
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

// Inline mobile sub-list — when the user taps a nav row in the drawer,
// expand the children below it instead of opening a hover flyout.
const MobileSubList = styled.div<{ $border: string }>`
  display: none;

  @media ${MOBILE_MEDIA} {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.025);
    border-bottom: 1px solid ${(p) => p.$border};
  }
`;

const MobileSubRow = styled.button<{ $color: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 0 0 60px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};

  &:active {
    background: rgba(0, 97, 235, 0.08);
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

  @media ${MOBILE_MEDIA} {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
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

  @media ${MOBILE_MEDIA} {
    width: 44px;
    height: 44px;
  }
`;

// Collapse-toggle is desktop-only; on mobile the drawer state is
// controlled by the header hamburger and tap-outside.
const DesktopOnlyButton = styled(BottomButton)`
  @media ${MOBILE_MEDIA} {
    display: none;
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
  mobileOpen?: boolean;
  onMobileClose?: () => void;
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
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  void onOpenAssistant;
  const [activeItem, setActiveItem] = useState(
    navItems[1]?.label ?? "Inference Hub"
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredTop, setHoveredTop] = useState(0);
  // Click the bottom collapse-toggle to expand the sidebar to its open width.
  // When expanded, labels render inline next to the icons and the hover
  // flyout is suppressed (since the labels are visible).
  const [expanded, setExpanded] = useState(false);
  // On mobile, tapping a nav row that has children expands them inline
  // instead of triggering navigation, so the user can drill in by touch.
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);

  const onEnter = (label: string, el: HTMLElement) => {
    setHoveredItem(label);
    const r = el.getBoundingClientRect();
    setHoveredTop(r.top);
  };

  const hovered = navItems.find((n) => n.label === hoveredItem);

  // Zen variant: hide sidebar entirely on desktop (header gets a hamburger).
  // Mobile always uses the drawer regardless of variant — even Zen.
  const hidden = variant === "zen";

  return (
    <>
      <Backdrop
        $open={mobileOpen}
        aria-label="Close navigation"
        onClick={() => onMobileClose?.()}
      />
      <Wrap
        $variant={variant}
        $dims={dims}
        $hidden={hidden && !mobileOpen}
        $expanded={expanded}
        $mobileOpen={mobileOpen}
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen || undefined}
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

        <NavScroll onMouseLeave={() => setHoveredItem(null)}>
          {navItems.map((item) => {
            const isMobileExpanded = mobileExpandedId === item.label;
            const hasChildren = item.items.length > 0;
            return (
              <React.Fragment key={item.label}>
                <NavItemRow
                  $variant={variant}
                  $dims={dims}
                  $active={activeItem === item.label}
                  $hovered={hoveredItem === item.label}
                  $expanded={expanded}
                  type="button"
                  onClick={(e) => {
                    setActiveItem(item.label);
                    // On mobile (drawer mode), tapping a row with children
                    // toggles the inline sub-list. Without children, it
                    // navigates and closes the drawer.
                    if (mobileOpen && hasChildren) {
                      e.preventDefault();
                      setMobileExpandedId(isMobileExpanded ? null : item.label);
                      return;
                    }
                    const href = NAV_LINKS[item.label];
                    if (href) {
                      onMobileClose?.();
                      navigate(href);
                    }
                  }}
                  onMouseEnter={(e) => onEnter(item.label, e.currentTarget)}
                  title={item.label}
                  aria-expanded={
                    hasChildren ? isMobileExpanded || undefined : undefined
                  }
                >
                  <IconSlot $size={dims.sidebarCollapsed}>
                    {icons[item.icon]}
                  </IconSlot>
                  {(expanded || mobileOpen) && (
                    <NavLabel
                      $color={
                        hoveredItem === item.label
                          ? "#ffffff"
                          : activeItem === item.label
                          ? dims.accent
                          : dims.textPrimary
                      }
                    >
                      {item.label}
                    </NavLabel>
                  )}
                </NavItemRow>

                {hasChildren && isMobileExpanded && mobileOpen && (
                  <MobileSubList $border={dims.borderLight}>
                    {item.items.map((sub) => {
                      const href = SUB_LINKS[sub];
                      return (
                        <MobileSubRow
                          key={sub}
                          $color={dims.textSecondary}
                          type="button"
                          onClick={() => {
                            if (href) {
                              onMobileClose?.();
                              navigate(href);
                            }
                          }}
                        >
                          {sub}
                        </MobileSubRow>
                      );
                    })}
                  </MobileSubList>
                )}
              </React.Fragment>
            );
          })}

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
            onClick={() => {
              onMobileClose?.();
              onToggleNotifications?.();
            }}
          >
            {icons.bell}
            <RedDot $sidebarBg={dims.sidebarBg} />
          </BottomButton>
          <DesktopOnlyButton
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
          </DesktopOnlyButton>
        </BottomSection>
      </Wrap>
    </>
  );
}
