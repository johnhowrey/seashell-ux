"use client";

import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import AssistantPanel from "@/components/AssistantPanel";
import NotificationsPanel from "@/components/NotificationsPanel";
import AccessibilityModal from "@/components/AccessibilityModal";
import { ShellVariant, ColorMode, getMergedDims } from "@/lib/theme";
import "./globals.css";

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

export default function Page() {
  const [variant, setVariant] = useState<ShellVariant>("standard");
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [activeA11y, setActiveA11y] = useState<string[]>([]);

  const dims = getMergedDims(variant, colorMode);

  const toggleAssistant = useCallback(
    () => setAssistantOpen((p) => !p),
    []
  );
  const toggleNotifications = useCallback(
    () => setNotificationsOpen((p) => !p),
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
        onToggleNotifications={toggleNotifications}
        notificationsOpen={notificationsOpen}
      />
      <NotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        dims={dims}
      />
      <MainArea $radius={dims.borderRadius}>
        <Header
          variant={variant}
          dims={dims}
          onToggleAssistant={toggleAssistant}
          assistantOpen={assistantOpen}
          onToggleNotifications={toggleNotifications}
          notificationsOpen={notificationsOpen}
        />
        <ContentRow>
          <MainContent
            variant={variant}
            colorMode={colorMode}
            dims={dims}
            onVariantChange={setVariant}
            onColorModeChange={setColorMode}
            onOpenAccessibility={() => setA11yOpen(true)}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
          <AssistantPanel
            open={assistantOpen}
            onClose={() => setAssistantOpen(false)}
            dims={dims}
          />
        </ContentRow>
      </MainArea>
      <AccessibilityModal
        open={a11yOpen}
        onClose={() => setA11yOpen(false)}
        dims={dims}
        isDark={colorMode === "dark" || variant === "floating"}
        activeAccessibility={activeA11y}
        onToggle={toggleA11y}
      />
    </ShellContainer>
  );
}
