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

const W = 52;

const Wrap = styled.aside<DimProps & { $hidden: boolean }>`
  position: relative;
  display: ${(p) => (p.$hidden ? "none" : "flex")};
  flex-direction: column;
  flex-shrink: 0;
  width: ${W}px;
  min-width: ${W}px;
  height: 100%;
  background: ${(p) => p.$dims.sidebarBg};
  border-right: 1px solid ${(p) => p.$dims.borderLight};
  z-index: 20;

  ${(p) =>
    p.$variant === "floating" &&
    `
    border-radius: ${p.$dims.borderRadius}px;
    margin: ${p.$dims.gap}px 0 ${p.$dims.gap}px ${p.$dims.gap}px;
    border: 1px solid ${p.$dims.borderLight};
  `}
`;

const LogoBlock = styled.div<{ $headerHeight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${W}px;
  height: ${(p) => p.$headerHeight}px;
  flex-shrink: 0;
  background: #0061eb;
  cursor: pointer;
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

const NavItemRow = styled.button<DimProps & { $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${W}px;
  height: ${W}px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => (p.$active ? p.$dims.accent : p.$dims.textSecondary)};
  flex-shrink: 0;
  transition: color 0.1s ease, background 0.1s ease;

  ${(p) =>
    p.$active &&
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
    color: ${(p) => p.$dims.textPrimary};
  }
`;

/* ──────────── Blue flyout (one per nav item, on hover) ──────────── */

const Flyout = styled.div<{ $top: number }>`
  position: fixed;
  top: ${(p) => p.$top}px;
  left: ${W + 4}px;
  background: #0061eb;
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  z-index: 50;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: var(--font-inter), "Inter", sans-serif;
`;

const FlyoutItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 7px 0;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.3;
  color: #ffffff;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    opacity: 0.78;
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

// Abstract mark — three stacked rounded rectangles forming a stylized
// shell silhouette. Intentionally non-specific.
const DOLogoSVG = (
  <LogoMark viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="3" rx="1.5" fill="#ffffff" />
    <rect
      x="4"
      y="10.5"
      width="13"
      height="3"
      rx="1.5"
      fill="#ffffff"
      opacity="0.78"
    />
    <rect
      x="4"
      y="17"
      width="9"
      height="3"
      rx="1.5"
      fill="#ffffff"
      opacity="0.55"
    />
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

  const onEnter = (label: string, el: HTMLElement) => {
    setHoveredItem(label);
    const r = el.getBoundingClientRect();
    setHoveredTop(r.top);
  };

  const hovered = navItems.find((n) => n.label === hoveredItem);

  // Zen variant: hide sidebar entirely (header gets a hamburger).
  const hidden = variant === "zen";

  return (
    <Wrap $variant={variant} $dims={dims} $hidden={hidden}>
      <LogoBlock
        $headerHeight={dims.headerHeight}
        onClick={() => navigate("/home")}
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
            type="button"
            onClick={() => {
              setActiveItem(item.label);
              const href = NAV_LINKS[item.label];
              if (href) navigate(href);
            }}
            onMouseEnter={(e) => onEnter(item.label, e.currentTarget)}
            title={item.label}
          >
            {icons[item.icon]}
          </NavItemRow>
        ))}

        {hovered && hovered.items.length > 0 && (
          <Flyout $top={hoveredTop}>
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
          aria-label="Collapse navigation"
          title="Collapse"
        >
          {icons.collapseLeft}
        </BottomButton>
      </BottomSection>
    </Wrap>
  );
}
