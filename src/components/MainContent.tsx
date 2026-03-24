"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  ShellVariant,
  ColorMode,
  ShellDims,
  shellVariants,
  colorModes,
  accessibilityOptions,
} from "../lib/theme";
import { icons } from "../lib/icons";

interface MainContentProps {
  variant: ShellVariant;
  colorMode: ColorMode;
  dims: ShellDims;
  onVariantChange: (v: ShellVariant) => void;
  onColorModeChange: (m: ColorMode) => void;
  activeAccessibility: string[];
  onToggleAccessibility: (id: string) => void;
}

/* ── Layout ── */

const Wrapper = styled.main<{
  $bg: string;
  $floating: boolean;
  $radius: number;
  $gap: number;
}>`
  background: ${(p) => p.$bg};
  padding: 32px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  ${(p) =>
    p.$floating &&
    `
    border-radius: ${p.$radius}px;
    margin: ${p.$gap}px;
  `}
`;

const SectionHeading = styled.h2<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: #878787;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

/* ── Card Grid ── */

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const Card = styled.div<{
  $active: boolean;
  $accent: string;
  $border: string;
}>`
  position: relative;
  border: 1px solid ${(p) => (p.$active ? p.$accent : p.$border)};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ActiveBadge = styled.span<{ $accent: string }>`
  position: absolute;
  top: 0;
  right: 0;
  background: ${(p) => p.$accent};
  color: #ffffff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 0 8px 0 8px;
`;

/* ── Variant Preview ── */

const PreviewArea = styled.div<{ $bg: string }>`
  height: 80px;
  background: ${(p) => p.$bg};
  padding: 8px;
  position: relative;
  overflow: hidden;
`;

const CardInfo = styled.div`
  padding: 16px;
`;

const CardName = styled.div<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const CardDesc = styled.div<{ $color: string }>`
  font-size: 12px;
  color: #888888;
  margin-top: 4px;
  line-height: 1.4;
`;

/* ── Mini Shell Mockup ── */

const MiniShell = styled.div<{ $variant: ShellVariant }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => (p.$variant === "floating" ? "6px" : "2px")};
  overflow: hidden;
`;

const MiniHeader = styled.div<{
  $bg: string;
  $variant: ShellVariant;
}>`
  height: ${(p) => (p.$variant === "compact" ? "14%" : "18%")};
  background: ${(p) => p.$bg};
  flex-shrink: 0;
`;

const MiniBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const MiniSidebar = styled.div<{
  $bg: string;
  $variant: ShellVariant;
}>`
  width: ${(p) => (p.$variant === "compact" ? "12%" : "14%")};
  background: ${(p) => p.$bg};
  flex-shrink: 0;
`;

const MiniContent = styled.div<{
  $bg: string;
  $variant: ShellVariant;
}>`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${(p) => (p.$variant === "compact" ? "2px" : "4px")};
  padding: ${(p) => (p.$variant === "compact" ? "2px" : "4px")};
  background: ${(p) => p.$bg};
`;

const MiniCard = styled.div<{
  $bg: string;
  $variant: ShellVariant;
}>`
  background: ${(p) => p.$bg};
  border-radius: ${(p) => (p.$variant === "floating" ? "3px" : "1px")};
`;

/* ── Color Mode Preview ── */

const ColorPreviewArea = styled.div<{ $bg: string }>`
  height: 80px;
  background: ${(p) => p.$bg};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
`;

const ColorSwatch = styled.div<{ $color: string }>`
  flex: 1;
  border-radius: 4px;
  background: ${(p) => p.$color};
`;

/* ── Accessibility Toggles ── */

const ToggleRow = styled.div<{ $border: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
`;

const ToggleLabel = styled.span<{ $color: string }>`
  font-size: 14px;
  color: ${(p) => p.$color};
`;

const ToggleTrack = styled.button<{ $on: boolean; $accent: string }>`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  position: relative;
  background: ${(p) => (p.$on ? p.$accent : "#ccc")};
  transition: background 0.15s ease;
  padding: 0;
  flex-shrink: 0;
`;

const ToggleThumb = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(p) => (p.$on ? "20px" : "2px")};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  transition: left 0.15s ease;
`;

/* ── Demo Page Tiles ── */

const DemoTile = styled(Link)<{
  $border: string;
  $color: string;
  $accent: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  background: ${(p) => p.$surface};
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;

  &:hover {
    border-color: ${(p) => p.$accent};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const DemoTileLabel = styled.span<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const DemoTileArrow = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  color: ${(p) => p.$color};
`;

/* ── Helpers ── */

function VariantPreview({ v }: { v: ShellVariant }) {
  const d = shellVariants[v].dims;

  if (v === "floating") {
    return (
      <PreviewArea $bg="#0e0e14">
        <MiniShell $variant={v}>
          <MiniHeader $bg={d.headerBg} $variant={v} />
          <MiniBody>
            <MiniSidebar $bg={d.sidebarBg} $variant={v} />
            <MiniContent $bg={d.contentBg} $variant={v}>
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
            </MiniContent>
          </MiniBody>
        </MiniShell>
      </PreviewArea>
    );
  }

  if (v === "zen") {
    return (
      <PreviewArea $bg={d.contentBg}>
        <MiniShell $variant={v}>
          <MiniHeader $bg={d.headerBg} $variant={v} />
          <MiniBody>
            <MiniContent $bg={d.contentBg} $variant={v} style={{ width: "100%" }}>
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
              <MiniCard $bg={d.surfaceBg} $variant={v} />
            </MiniContent>
          </MiniBody>
        </MiniShell>
      </PreviewArea>
    );
  }

  return (
    <PreviewArea $bg={d.contentBg}>
      <MiniShell $variant={v}>
        <MiniHeader $bg={d.headerBg} $variant={v} />
        <MiniBody>
          <MiniSidebar $bg={d.sidebarBg} $variant={v} />
          <MiniContent $bg={d.contentBg} $variant={v}>
            <MiniCard $bg={d.surfaceBg} $variant={v} />
            <MiniCard $bg={d.surfaceBg} $variant={v} />
            <MiniCard $bg={d.surfaceBg} $variant={v} />
            <MiniCard $bg={d.surfaceBg} $variant={v} />
          </MiniContent>
        </MiniBody>
      </MiniShell>
    </PreviewArea>
  );
}

/* ── Component ── */

const demoPages = [
  { label: "Inference Hub", href: "/inference" },
  { label: "Small Modal", href: "/modal-small" },
  { label: "Big Modal", href: "/modal-large" },
  { label: "Create Database", href: "/create-database" },
];

const MainContent: React.FC<MainContentProps> = ({
  variant,
  colorMode,
  dims,
  onVariantChange,
  onColorModeChange,
  activeAccessibility,
  onToggleAccessibility,
}) => {
  return (
    <Wrapper
      $bg={dims.contentBg}
      $floating={variant === "floating"}
      $radius={dims.borderRadius}
      $gap={dims.gap}
    >
      {/* Shell Variants */}
      <Section>
        <SectionHeading $color={dims.textPrimary}>Shell Variants</SectionHeading>
        <CardGrid>
          {(Object.keys(shellVariants) as ShellVariant[]).map((v) => {
            const { name, description } = shellVariants[v];
            const isActive = v === variant;
            return (
              <Card
                key={v}
                $active={isActive}
                $accent={dims.accent}
                $border={dims.borderLight}
                onClick={() => onVariantChange(v)}
              >
                {isActive && <ActiveBadge $accent={dims.accent}>Active</ActiveBadge>}
                <VariantPreview v={v} />
                <CardInfo>
                  <CardName $color={dims.textPrimary}>{name}</CardName>
                  <CardDesc $color={dims.textSecondary}>{description}</CardDesc>
                </CardInfo>
              </Card>
            );
          })}
        </CardGrid>
      </Section>

      {/* Color Mode */}
      <Section>
        <SectionHeading $color={dims.textPrimary}>Color Mode</SectionHeading>
        <CardGrid>
          {(Object.keys(colorModes) as ColorMode[]).map((m) => {
            const mode = colorModes[m];
            const isActive = m === colorMode;
            return (
              <Card
                key={m}
                $active={isActive}
                $accent={dims.accent}
                $border={dims.borderLight}
                onClick={() => onColorModeChange(m)}
              >
                {isActive && <ActiveBadge $accent={dims.accent}>Active</ActiveBadge>}
                <ColorPreviewArea $bg={mode.bg}>
                  <ColorSwatch $color={mode.accent} />
                  <ColorSwatch $color={mode.surface} />
                  <ColorSwatch $color={mode.border} />
                </ColorPreviewArea>
                <CardInfo>
                  <CardName $color={dims.textPrimary}>{mode.name}</CardName>
                  <CardDesc $color={dims.textSecondary}>{mode.description}</CardDesc>
                </CardInfo>
              </Card>
            );
          })}
        </CardGrid>
      </Section>

      {/* Accessibility */}
      <Section>
        <SectionHeading $color={dims.textPrimary}>
          Accessibility Options
        </SectionHeading>
        <div>
          {accessibilityOptions.map((opt) => {
            const isOn = activeAccessibility.includes(opt.id);
            return (
              <ToggleRow key={opt.id} $border={dims.borderLight}>
                <ToggleLabel $color={dims.textPrimary}>{opt.label}</ToggleLabel>
                <ToggleTrack
                  $on={isOn}
                  $accent={dims.accent}
                  onClick={() => onToggleAccessibility(opt.id)}
                  aria-pressed={isOn}
                  aria-label={opt.label}
                >
                  <ToggleThumb $on={isOn} />
                </ToggleTrack>
              </ToggleRow>
            );
          })}
        </div>
      </Section>

      {/* Demo Pages */}
      <Section>
        <SectionHeading $color={dims.textPrimary}>Demo Pages</SectionHeading>
        <CardGrid>
          {demoPages.map((page) => (
            <DemoTile
              key={page.label}
              href={page.href}
              $border={dims.borderLight}
              $color={dims.textSecondary}
              $accent={dims.accent}
              $surface={dims.surfaceBg}
            >
              <DemoTileLabel $color={dims.textPrimary}>{page.label}</DemoTileLabel>
              <DemoTileArrow $color={dims.textMuted}>{icons.chevronRight}</DemoTileArrow>
            </DemoTile>
          ))}
        </CardGrid>
      </Section>
    </Wrapper>
  );
};

export default MainContent;
