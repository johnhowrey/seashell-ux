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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 400px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #999999;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #555555;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const BodyText = styled.p`
  font-size: 13px;
  color: #555555;
  line-height: 1.5;
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
`;

const GhostButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #555555;
  background: none;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    border-color: #bbb;
  }
`;

const AccentButton = styled.button<{ $accent: string; $accentHover: string }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(p) => p.$accentHover};
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

export default function ModalSmallPage() {
  const [variant, setVariant] = useState<ShellVariant>("standard");
  const [colorMode, setColorMode] = useState<ColorMode>("default");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeA11y, setActiveA11y] = useState<string[]>([]);

  const dims = getMergedDims(variant, colorMode);

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

  return (
    <>
      <ShellContainer
        $gap={dims.gap}
        $bg={dims.gap > 0 ? dims.contentBg : "transparent"}
        $radius={dims.borderRadius}
      >
        <Sidebar variant={variant} colorMode={colorMode} dims={dims} />
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
                activeAccessibility={activeA11y}
                onToggleAccessibility={toggleA11y}
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

      <Backdrop>
        <ModalBox>
          <ModalHeader>
            <ModalTitle>Confirm Action</ModalTitle>
            <CloseButton aria-label="Close modal">&times;</CloseButton>
          </ModalHeader>
          <ModalBody>
            <BodyText>
              Are you sure you want to proceed? This action cannot be undone.
            </BodyText>
          </ModalBody>
          <ModalFooter>
            <GhostButton>Cancel</GhostButton>
            <AccentButton $accent={dims.accent} $accentHover={dims.accentHover}>
              Confirm
            </AccentButton>
          </ModalFooter>
        </ModalBox>
      </Backdrop>
    </>
  );
}
