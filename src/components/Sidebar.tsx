"use client";

import React, { useState } from "react";
import styled from "styled-components";
import type { ShellVariant, ColorMode, ShellDims } from "../lib/theme";
import { navItems, PRODUCT_LABEL } from "../lib/theme";
import { icons } from "../lib/icons";

/* ------------------------------------------------------------------ */
/*  Transient prop interfaces                                         */
/* ------------------------------------------------------------------ */

interface SidebarWrapProps {
  $expanded: boolean;
  $variant: ShellVariant;
  $collapsedW: number;
  $openW: number;
  $borderRadius: number;
  $gap: number;
  $sidebarBg: string;
  $borderLight: string;
}

interface NavItemProps {
  $active: boolean;
  $collapsedW: number;
  $accent: string;
  $hoverBg: string;
  $textPrimary: string;
  $textSecondary: string;
  $expanded: boolean;
}

/* ------------------------------------------------------------------ */
/*  Styled components                                                 */
/* ------------------------------------------------------------------ */

const TRANSITION = "width 0.15s cubic-bezier(0.2, 0, 0, 1)";

const Wrap = styled.aside<SidebarWrapProps>`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  width: ${(p) => (p.$expanded ? p.$openW : p.$collapsedW)}px;
  transition: ${TRANSITION};
  background: ${(p) => p.$sidebarBg};
  border-right: 1px solid ${(p) => p.$borderLight};
  font-family: inherit;

  ${(p) =>
    p.$borderRadius > 0 &&
    `
    border-radius: ${p.$borderRadius}px;
    margin: ${p.$gap}px 0 ${p.$gap}px ${p.$gap}px;
    border-right: 1px solid ${p.$borderLight};
    border: 1px solid ${p.$borderLight};
  `}
`;

const LogoRow = styled.div<{ $headerHeight: number }>`
  display: flex;
  align-items: stretch;
  height: ${(p) => p.$headerHeight}px;
  flex-shrink: 0;
  overflow: hidden;
`;

const LogoBlock = styled.div<{ $collapsedW: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$collapsedW}px;
  flex-shrink: 0;
  background: #0f62fe;
`;

const LogoShape = styled.div`
  width: 24px;
  height: 24px;
  background: #ffffff;
  border-radius: 6px;
`;

const ProductLabel = styled.div<{
  $expanded: boolean;
  $color: string;
  $bg: string;
}>`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0 14px;
  background: ${(p) => p.$bg};
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
  white-space: nowrap;
  opacity: ${(p) => (p.$expanded ? 1 : 0)};
  pointer-events: ${(p) => (p.$expanded ? "auto" : "none")};
  transition: opacity 0.12s ease;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NavScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const NavItemRow = styled.button<NavItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: ${(p) => (p.$active ? p.$accent : p.$textPrimary)};
  white-space: nowrap;
  transition: background 0.1s ease, color 0.1s ease;
  flex-shrink: 0;

  ${(p) =>
    p.$active &&
    `
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: ${p.$accent};
    }
  `}

  &:hover {
    background: ${(p) => p.$hoverBg};
  }
`;

const IconCell = styled.span<{ $collapsedW: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$collapsedW}px;
  height: ${(p) => p.$collapsedW}px;
  flex-shrink: 0;
`;

const Label = styled.span<{ $expanded: boolean }>`
  flex: 1;
  min-width: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  opacity: ${(p) => (p.$expanded ? 1 : 0)};
  transition: opacity 0.12s ease;
  pointer-events: ${(p) => (p.$expanded ? "auto" : "none")};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Shortcut = styled.span<{ $expanded: boolean; $color: string }>`
  margin-right: 12px;
  font-size: 11px;
  font-weight: 500;
  color: ${(p) => p.$color};
  opacity: ${(p) => (p.$expanded ? 1 : 0)};
  transition: opacity 0.12s ease;
  pointer-events: none;
  flex-shrink: 0;
`;

const BottomSection = styled.div`
  flex-shrink: 0;
  padding: 4px 0 8px;
  border-top: 1px solid transparent;
`;

const RedDot = styled.span`
  position: absolute;
  top: 8px;
  right: calc(50% - 14px);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ef4444;
  border: 1.5px solid currentColor;
  pointer-events: none;
`;

const BellWrap = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface SidebarProps {
  variant: ShellVariant;
  colorMode: ColorMode;
  dims: ShellDims;
  onNavClick?: (label: string) => void;
  onOpenAssistant?: () => void;
}

export default function Sidebar({
  variant,
  colorMode,
  dims,
  onNavClick,
  onOpenAssistant,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(navItems[0].label);

  const collapsedW = dims.sidebarCollapsed;
  const openW = dims.sidebarOpen;

  /* Determine hover background based on color mode / variant */
  const isDark =
    colorMode === "dark" ||
    (variant === "floating" && dims.sidebarBg !== "#ffffff");
  const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "#f0f4ff";

  const handleNavClick = (label: string) => {
    setActiveItem(label);
    onNavClick?.(label);
  };

  return (
    <Wrap
      $expanded={expanded}
      $variant={variant}
      $collapsedW={collapsedW}
      $openW={openW}
      $borderRadius={dims.borderRadius}
      $gap={dims.gap}
      $sidebarBg={dims.sidebarBg}
      $borderLight={dims.borderLight}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo + product label */}
      <LogoRow $headerHeight={dims.headerHeight}>
        <LogoBlock $collapsedW={collapsedW}>
          <LogoShape />
        </LogoBlock>
        <ProductLabel
          $expanded={expanded}
          $color={dims.textPrimary}
          $bg={dims.sidebarBg}
        >
          {PRODUCT_LABEL}
        </ProductLabel>
      </LogoRow>

      {/* Nav items */}
      <NavScroll>
        {navItems.map((item) => (
          <NavItemRow
            key={item.label}
            $active={activeItem === item.label}
            $collapsedW={collapsedW}
            $accent={dims.accent}
            $hoverBg={hoverBg}
            $textPrimary={dims.textPrimary}
            $textSecondary={dims.textSecondary}
            $expanded={expanded}
            onClick={() => handleNavClick(item.label)}
            title={item.label}
          >
            <IconCell $collapsedW={collapsedW}>
              {icons[item.icon]}
            </IconCell>
            <Label $expanded={expanded}>{item.label}</Label>
          </NavItemRow>
        ))}
      </NavScroll>

      {/* Bottom utilities */}
      <BottomSection>
        <NavItemRow
          $active={false}
          $collapsedW={collapsedW}
          $accent={dims.accent}
          $hoverBg={hoverBg}
          $textPrimary={dims.textPrimary}
          $textSecondary={dims.textSecondary}
          $expanded={expanded}
          onClick={() => {
            handleNavClick("AI Assistant");
            onOpenAssistant?.();
          }}
          title="AI Assistant"
        >
          <IconCell $collapsedW={collapsedW}>{icons.assistant}</IconCell>
          <Label $expanded={expanded}>AI Assistant</Label>
          <Shortcut $expanded={expanded} $color={dims.textMuted}>
            ⌘J
          </Shortcut>
        </NavItemRow>

        <NavItemRow
          $active={false}
          $collapsedW={collapsedW}
          $accent={dims.accent}
          $hoverBg={hoverBg}
          $textPrimary={dims.textPrimary}
          $textSecondary={dims.textSecondary}
          $expanded={expanded}
          onClick={() => handleNavClick("Settings")}
          title="Settings"
        >
          <IconCell $collapsedW={collapsedW}>{icons.settings}</IconCell>
          <Label $expanded={expanded}>Settings</Label>
        </NavItemRow>

        <NavItemRow
          $active={false}
          $collapsedW={collapsedW}
          $accent={dims.accent}
          $hoverBg={hoverBg}
          $textPrimary={dims.textPrimary}
          $textSecondary={dims.textSecondary}
          $expanded={expanded}
          onClick={() => handleNavClick("Notifications")}
          title="Notifications"
        >
          <IconCell $collapsedW={collapsedW}>
            <BellWrap>
              {icons.bell}
              <RedDot
                style={{
                  borderColor: dims.sidebarBg,
                }}
              />
            </BellWrap>
          </IconCell>
          <Label $expanded={expanded}>Notifications</Label>
        </NavItemRow>
      </BottomSection>
    </Wrap>
  );
}
