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
} from "../lib/theme";

interface MainContentProps {
  variant: ShellVariant;
  colorMode: ColorMode;
  dims: ShellDims;
  onVariantChange: (v: ShellVariant) => void;
  onColorModeChange: (m: ColorMode) => void;
  onOpenAccessibility: () => void;
  onOpenAssistant?: () => void;
}

/* ─── Wrapper ─── */

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

/* ─── Section heading ─── */

const SectionTitle = styled.h2`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #878787;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

/* ─── Variant grid ─── */

const VariantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const VariantCard = styled.button<{
  $active: boolean;
  $accent: string;
  $surface: string;
}>`
  position: relative;
  background: ${(p) => p.$surface};
  padding: 0;
  border: 2px solid ${(p) => (p.$active ? p.$accent : "transparent")};
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  font-family: inherit;
  transition: box-shadow 0.15s ease, border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }
`;

const ActiveBadge = styled.span<{ $accent: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  padding: 3px 8px;
  border-radius: 4px;
  z-index: 2;
`;

const VariantPreview = styled.div<{ $bg: string }>`
  height: 80px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const VariantInfo = styled.div`
  padding: 16px;
`;

const VariantName = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 4px;
`;

const VariantDesc = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.4;
`;

/* ─── Mini shell preview ─── */

const MiniShell = styled.div<{ $variant: ShellVariant; $bg: string }>`
  width: 100%;
  height: 100%;
  background: ${(p) => p.$bg};
  display: flex;
  overflow: hidden;
  border-radius: ${(p) => (p.$variant === "floating" ? "4px" : "0")};
  ${(p) =>
    p.$variant === "floating" &&
    `
    padding: 3px;
    gap: 3px;
  `}
`;

const MiniSidebar = styled.div<{ $bg: string; $variant: ShellVariant }>`
  width: 14%;
  background: ${(p) => p.$bg};
  flex-shrink: 0;
  ${(p) =>
    p.$variant === "floating" &&
    `
    border-radius: 3px;
    overflow: hidden;
  `}
`;

const MiniMain = styled.div<{ $bg: string; $variant: ShellVariant }>`
  flex: 1;
  background: ${(p) => p.$bg};
  display: flex;
  flex-direction: column;
  ${(p) =>
    p.$variant === "floating" &&
    `
    border-radius: 3px;
    overflow: hidden;
  `}
`;

const MiniHeader = styled.div<{ $bg: string }>`
  height: 18%;
  background: ${(p) => p.$bg};
  flex-shrink: 0;
`;

const MiniContent = styled.div`
  flex: 1;
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
`;

const MiniCard = styled.div<{ $bg: string }>`
  background: ${(p) => p.$bg};
  border-radius: 2px;
`;

/* ─── Accessibility tile ─── */

const A11yTile = styled.button<{
  $surface: string;
  $border: string;
  $accent: string;
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  width: 100%;
  max-width: 460px;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    border-color: ${(p) => p.$accent};
  }
`;

const A11yIconWrap = styled.span<{ $accent: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(p) => p.$accent}1f;
  color: ${(p) => p.$accent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const A11yInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const A11yTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;

const A11yDesc = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-top: 2px;
`;

/* ─── Demo tiles (skeleton-content style) ─── */

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

const demoCardCss = `
  background: var(--demo-card-bg);
  border: 1px solid var(--demo-card-border);
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
  text-decoration: none;
`;

const DemoCardLink = styled(Link)<{ $surface: string; $border: string; $accent: string }>`
  ${demoCardCss}
  --demo-card-bg: ${(p) => p.$surface};
  --demo-card-border: ${(p) => p.$border};

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    border-color: ${(p) => p.$accent};
  }
`;

const DemoCardButton = styled.button<{ $surface: string; $border: string; $accent: string }>`
  ${demoCardCss}
  --demo-card-bg: ${(p) => p.$surface};
  --demo-card-border: ${(p) => p.$border};
  width: 100%;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    border-color: ${(p) => p.$accent};
  }
`;

const DemoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DemoSwatch = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const DemoLabelStack = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const DemoCardLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  color: ${(p) => p.$color};
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const SkelLine = styled.div<{ $w: string; $h: number; $color: string }>`
  width: ${(p) => p.$w};
  height: ${(p) => p.$h}px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const HairDivider = styled.div<{ $color: string }>`
  width: 100%;
  height: 1px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const DemoBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BetaPill = styled.span<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 6px;
  border-radius: 3px;
  background: ${(p) => p.$accent}1f;
  color: ${(p) => p.$accent};
`;

/* ─── Helpers ─── */

const PreviewBg: Record<ShellVariant, string> = {
  standard: "#f5f5f5",
  floating: "#1a1a2e",
  compact: "#fafafa",
  zen: "#fafafa",
};

const A11yIcon = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="4.5" r="2.5" />
    <path d="M12 7v5" />
    <path d="M8 10h8" />
    <path d="M9 21l3-6 3 6" />
  </svg>
);

const ChevronRight = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    style={{ flexShrink: 0, opacity: 0.4 }}
    aria-hidden
  >
    <path
      d="M6 4l4 4-4 4"
      stroke="#878787"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface VariantPreviewProps {
  v: ShellVariant;
}

function VariantPreviewArt({ v }: VariantPreviewProps) {
  const d = shellVariants[v].dims;
  const bg = PreviewBg[v];
  const isFloating = v === "floating";
  const isZen = v === "zen";

  // Mini-shell colors
  const shellBg = isFloating ? "#0e0e14" : "#e3e3e3";
  const sidebarBg = isFloating ? "#1e1e24" : "#ffffff";
  const mainBg = isFloating ? "#0e0e14" : "#ffffff";
  const headerBg = isZen ? d.accent : isFloating ? "#1e1e24" : "#f5f5f5";
  const cardBg = isFloating ? "#1e1e24" : "#f0f0f0";

  return (
    <VariantPreview $bg={bg}>
      <MiniShell $variant={v} $bg={shellBg}>
        {!isZen && <MiniSidebar $bg={sidebarBg} $variant={v} />}
        <MiniMain $bg={mainBg} $variant={v}>
          <MiniHeader $bg={headerBg} />
          <MiniContent>
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
          </MiniContent>
        </MiniMain>
      </MiniShell>
    </VariantPreview>
  );
}

interface ColorPreviewProps {
  m: ColorMode;
}

function ColorPreviewArt({ m }: ColorPreviewProps) {
  const cm = colorModes[m];
  const isDark = m === "dark";

  // Distinct outer canvas color so the mini-shell card stands out.
  const wrapperBg = isDark ? "#0a0a12" : m === "light" ? "#cfd4dc" : "#cdd5e2";
  const sidebarBg = isDark ? "#242428" : "#ffffff";
  const mainBg = cm.bg;
  const headerBg = isDark ? "#2c2c34" : "#eef0f3";
  const cardBg = isDark ? "#34343c" : "#e9ecf0";
  const shellBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <VariantPreview $bg={wrapperBg}>
      <MiniShell
        $variant="standard"
        $bg={mainBg}
        style={{
          border: `1px solid ${shellBorder}`,
          boxShadow: isDark
            ? "0 1px 3px rgba(0,0,0,0.4)"
            : "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <MiniSidebar $bg={sidebarBg} $variant="standard">
          <span
            style={{
              display: "block",
              height: "22%",
              background: cm.accent,
            }}
          />
        </MiniSidebar>
        <MiniMain $bg={mainBg} $variant="standard">
          <MiniHeader $bg={headerBg} />
          <MiniContent>
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
            <MiniCard $bg={cardBg} />
          </MiniContent>
        </MiniMain>
      </MiniShell>
    </VariantPreview>
  );
}

/* ─── Demo tile data ─── */

const demoTiles: { label: string; href: string; swatch: string }[] = [
  { label: "Inference Hub", href: "/playground", swatch: "#bae6fd" },
  { label: "Small Modal", href: "/modal-small", swatch: "#bbf7d0" },
  { label: "Big Modal", href: "/modal-large", swatch: "#fde68a" },
  { label: "Create Database", href: "/database/create", swatch: "#fecaca" },
];

/* ─── Component ─── */

const MainContent: React.FC<MainContentProps> = ({
  variant,
  colorMode,
  dims,
  onVariantChange,
  onColorModeChange,
  onOpenAccessibility,
  onOpenAssistant,
}) => {
  const isDarkSurface = colorMode === "dark";
  const skelColor = isDarkSurface ? "#3a3a44" : "#e5e7eb";
  const skelDim = isDarkSurface ? "#2c2c34" : "#f3f4f6";

  return (
    <Wrapper
      $bg={dims.contentBg}
      $floating={variant === "floating"}
      $radius={dims.borderRadius}
      $gap={dims.gap}
    >
      {/* Shell Variants */}
      <Section>
        <SectionTitle>Shell Variants</SectionTitle>
        <VariantGrid>
          {(Object.keys(shellVariants) as ShellVariant[]).map((v) => {
            const { name, description } = shellVariants[v];
            const isActive = v === variant;
            return (
              <VariantCard
                key={v}
                type="button"
                $active={isActive}
                $accent={dims.accent}
                $surface={dims.surfaceBg}
                onClick={() => onVariantChange(v)}
              >
                {isActive && (
                  <ActiveBadge $accent={dims.accent}>Active</ActiveBadge>
                )}
                <VariantPreviewArt v={v} />
                <VariantInfo>
                  <VariantName $color={dims.textPrimary}>{name}</VariantName>
                  <VariantDesc $color={dims.textSecondary}>
                    {description}
                  </VariantDesc>
                </VariantInfo>
              </VariantCard>
            );
          })}
        </VariantGrid>
      </Section>

      {/* Color Mode */}
      <Section>
        <SectionTitle>Color Mode</SectionTitle>
        <ColorGrid>
          {(Object.keys(colorModes) as ColorMode[]).map((m) => {
            const mode = colorModes[m];
            const isActive = m === colorMode;
            return (
              <VariantCard
                key={m}
                type="button"
                $active={isActive}
                $accent={dims.accent}
                $surface={dims.surfaceBg}
                onClick={() => onColorModeChange(m)}
              >
                {isActive && (
                  <ActiveBadge $accent={dims.accent}>Active</ActiveBadge>
                )}
                <ColorPreviewArt m={m} />
                <VariantInfo>
                  <VariantName $color={dims.textPrimary}>
                    {mode.name}
                  </VariantName>
                  <VariantDesc $color={dims.textSecondary}>
                    {mode.description}
                  </VariantDesc>
                </VariantInfo>
              </VariantCard>
            );
          })}
        </ColorGrid>
      </Section>

      {/* Accessibility tile (opens modal) */}
      <Section>
        <SectionTitle>Accessibility</SectionTitle>
        <A11yTile
          type="button"
          onClick={onOpenAccessibility}
          $surface={dims.surfaceBg}
          $border={dims.borderLight}
          $accent={dims.accent}
        >
          <A11yIconWrap $accent={dims.accent}>{A11yIcon}</A11yIconWrap>
          <A11yInfo>
            <A11yTitle $color={dims.textPrimary}>Accessibility Options</A11yTitle>
            <A11yDesc $color={dims.textSecondary}>
              Motion, contrast, fonts, focus, and more
            </A11yDesc>
          </A11yInfo>
          {ChevronRight}
        </A11yTile>
      </Section>

      {/* Demo Pages */}
      <Section>
        <SectionTitle>Demo Pages</SectionTitle>
        <DemoGrid>
          {demoTiles.map((tile, idx) => {
            // each card varies the bar widths slightly
            const bars = [
              ["55%", "78%", "45%"],
              ["62%", "84%", "40%"],
              ["48%", "72%", "58%"],
              ["66%", "80%", "42%"],
            ][idx % 4];
            return (
              <DemoCardLink
                key={tile.label}
                href={tile.href}
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
                $accent={dims.accent}
              >
                <DemoRow>
                  <DemoSwatch $color={tile.swatch} />
                  <DemoLabelStack>
                    <DemoCardLabel $color={dims.textPrimary}>
                      {tile.label}
                    </DemoCardLabel>
                    <SkelLine $w="40%" $h={8} $color={skelColor} />
                  </DemoLabelStack>
                </DemoRow>
                <HairDivider $color={skelDim} />
                <DemoBars>
                  <SkelLine $w={bars[0]} $h={12} $color={skelColor} />
                  <SkelLine $w={bars[1]} $h={12} $color={skelColor} />
                  <SkelLine $w={bars[2]} $h={12} $color={skelDim} />
                </DemoBars>
              </DemoCardLink>
            );
          })}

          {/* AI Assistant tile — opens panel */}
          <DemoCardButton
            type="button"
            onClick={() => onOpenAssistant?.()}
            $surface={dims.surfaceBg}
            $border={dims.borderLight}
            $accent={dims.accent}
          >
            <DemoRow>
              <DemoSwatch $color="#c4b5fd" />
              <DemoLabelStack>
                <DemoCardLabel $color={dims.textPrimary}>
                  AI Assistant
                  <BetaPill $accent={dims.accent}>Beta</BetaPill>
                </DemoCardLabel>
                <SkelLine $w="40%" $h={8} $color={skelColor} />
              </DemoLabelStack>
            </DemoRow>
            <HairDivider $color={skelDim} />
            <DemoBars>
              <SkelLine $w="60%" $h={12} $color={skelColor} />
              <SkelLine $w="76%" $h={12} $color={skelColor} />
              <SkelLine $w="44%" $h={12} $color={skelDim} />
            </DemoBars>
          </DemoCardButton>
        </DemoGrid>
      </Section>
    </Wrapper>
  );
};

export default MainContent;
