"use client";

import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import AssistantPanel from "@/components/AssistantPanel";
import {
  ShellVariant,
  ColorMode,
  shellVariants,
  colorModes,
  ShellDims,
} from "@/lib/theme";
import { icons } from "@/lib/icons";
import AccessibilityModal from "@/components/AccessibilityModal";

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

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const ModalBox = styled.div<{ $surface: string; $border: string }>`
  width: 760px;
  max-width: 100%;
  max-height: calc(100vh - 64px);
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 24px 8px;
`;

const ModalHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

const HeaderSwatch = styled.span<{ $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

const CloseButton = styled.button<{ $color: string; $hover: string }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: ${(p) => p.$hover};
  }
`;

const ModalBody = styled.div`
  padding: 8px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

const SkeletonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SkeletonBar = styled.span<{ $w: string; $h: number; $color: string }>`
  display: block;
  width: ${(p) => p.$w};
  height: ${(p) => p.$h}px;
  border-radius: 4px;
  background: ${(p) => p.$color};
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const CardSkel = styled.div<{ $color: string }>`
  background: ${(p) => p.$color};
  border-radius: 8px;
  height: 160px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
`;

const Divider = styled.hr<{ $border: string }>`
  border: none;
  border-top: 1px solid ${(p) => p.$border};
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 24px 22px;
`;

const GhostButton = styled.button<{
  $border: string;
  $color: string;
  $hoverBg: string;
}>`
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
  background: none;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: ${(p) => p.$hoverBg};
  }
`;

const ConfirmButton = styled.button<{ $bg: string; $color: string; $hover: string }>`
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: ${(p) => p.$hover};
  }
`;

const BackLink = styled.div`
  padding: 8px 16px;
  font-size: 12px;

  a {
    color: #0f62fe;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function getMergedDims(
  variant: ShellVariant,
  colorMode: ColorMode
): ShellDims {
  const base = shellVariants[variant].dims;
  if (variant === "floating") return base;

  const cm = colorModes[colorMode];
  return {
    ...base,
    contentBg: cm.bg,
    surfaceBg: cm.surface,
    textPrimary: cm.text,
    borderLight: cm.border,
    accent: cm.accent,
    headerBg: variant === "zen" ? cm.accent : cm.surface,
    sidebarBg: cm.surface,
    textSecondary: colorMode === "dark" ? "#a0a0a8" : "#555555",
    textMuted: colorMode === "dark" ? "#666670" : "#999999",
  };
}

export default function ModalLargePage() {
  const [variant, setVariant] = useState<ShellVariant>("standard");
  const [colorMode, setColorMode] = useState<ColorMode>("digitalocean");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeA11y, setActiveA11y] = useState<string[]>([]);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const dims = getMergedDims(variant, colorMode);
  const isDark = colorMode === "dark" || variant === "floating";
  const skel = isDark ? "#3a3a44" : "#e6e6ec";
  const cardSkel = isDark ? "#2c2c34" : "#f1f1f5";
  const innerSkel = isDark ? "#43434d" : "#dadae2";
  const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "#f5f5f5";
  const confirmBg = isDark ? "#ffffff" : "#1a1a1a";
  const confirmFg = isDark ? "#1a1a1a" : "#ffffff";
  const confirmHover = isDark ? "#e6e6ec" : "#000000";

  const toggleAssistant = useCallback(
    () => setAssistantOpen((p) => !p),
    []
  );

  const toggleA11y = useCallback((id: string) => {
    setActiveA11y((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const allAttrs = [
      "data-reduce-motion",
      "data-high-contrast",
      "data-dyslexia-font",
      "data-large-text",
      "data-enhanced-focus",
      "data-underline-links",
    ];
    allAttrs.forEach((attr) => html.removeAttribute(attr));
    activeA11y.forEach((id) => {
      const attr = `data-${id}`;
      html.setAttribute(attr, "");
    });
  }, [activeA11y]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const closeModal = () => setModalOpen(false);

  return (
    <>
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
            <div style={{ flex: 1, overflow: "auto" }}>
              <BackLink>
                <Link href="/">&larr; Back to Dashboard</Link>
              </BackLink>
              <MainContent
                variant={variant}
                colorMode={colorMode}
                dims={dims}
                onVariantChange={setVariant}
                onColorModeChange={setColorMode}
                onOpenAccessibility={() => setA11yOpen(true)}
                onOpenAssistant={() => setAssistantOpen(true)}
              />
            </div>
            <AssistantPanel
              open={assistantOpen}
              onClose={() => setAssistantOpen(false)}
              dims={dims}
            />
          </ContentRow>
        </MainArea>
      </ShellContainer>

      {modalOpen && (
      <Backdrop
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <ModalBox $surface={dims.surfaceBg} $border={dims.borderLight}>
          <ModalHeader>
            <ModalHeaderLeft>
              <HeaderSwatch $color="#fcd96b" />
              <HeaderText>
                <SkeletonBar $w="44%" $h={10} $color={skel} />
                <SkeletonBar $w="28%" $h={8} $color={skel} />
              </HeaderText>
            </ModalHeaderLeft>
            <CloseButton
              aria-label="Close modal"
              $color={dims.textMuted}
              $hover={dims.textPrimary}
              onClick={closeModal}
              type="button"
            >
              {icons.close}
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <SkeletonGroup>
              <SkeletonBar $w="96%" $h={8} $color={skel} />
              <SkeletonBar $w="78%" $h={8} $color={skel} />
              <SkeletonBar $w="32%" $h={8} $color={skel} />
            </SkeletonGroup>
            <CardRow>
              <CardSkel $color={cardSkel}>
                <SkeletonBar $w="60%" $h={8} $color={innerSkel} />
                <SkeletonBar $w="40%" $h={8} $color={innerSkel} />
              </CardSkel>
              <CardSkel $color={cardSkel}>
                <SkeletonBar $w="58%" $h={8} $color={innerSkel} />
                <SkeletonBar $w="36%" $h={8} $color={innerSkel} />
              </CardSkel>
            </CardRow>
            <SkeletonGroup>
              <SkeletonBar $w="92%" $h={8} $color={skel} />
              <SkeletonBar $w="80%" $h={8} $color={skel} />
              <SkeletonBar $w="48%" $h={8} $color={skel} />
              <SkeletonBar $w="28%" $h={8} $color={skel} />
            </SkeletonGroup>
            <CardRow>
              <CardSkel $color={cardSkel}>
                <SkeletonBar $w="55%" $h={8} $color={innerSkel} />
                <SkeletonBar $w="38%" $h={8} $color={innerSkel} />
              </CardSkel>
              <CardSkel $color={cardSkel}>
                <SkeletonBar $w="50%" $h={8} $color={innerSkel} />
                <SkeletonBar $w="34%" $h={8} $color={innerSkel} />
              </CardSkel>
            </CardRow>
          </ModalBody>
          <Divider $border={dims.borderLight} />
          <ModalFooter>
            <GhostButton
              $border={dims.borderLight}
              $color={dims.textPrimary}
              $hoverBg={hoverBg}
              type="button"
              onClick={closeModal}
            >
              Cancel
            </GhostButton>
            <ConfirmButton
              $bg={confirmBg}
              $color={confirmFg}
              $hover={confirmHover}
              type="button"
              onClick={closeModal}
            >
              Confirm
            </ConfirmButton>
          </ModalFooter>
        </ModalBox>
      </Backdrop>
      )}
      <AccessibilityModal
        open={a11yOpen}
        onClose={() => setA11yOpen(false)}
        dims={dims}
        isDark={isDark}
        activeAccessibility={activeA11y}
        onToggle={toggleA11y}
      />
    </>
  );
}
