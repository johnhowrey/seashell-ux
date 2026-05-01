"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AssistantPanel from "./AssistantPanel";
import NotificationsPanel from "./NotificationsPanel";
import AccessibilityModal from "./AccessibilityModal";
import { ColorMode, ShellVariant, getMergedDims } from "../lib/theme";

const ShellContainer = styled.div<{ $gap: number; $bg: string; $radius: number }>`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${(p) => p.$bg};
  ${(p) => p.$gap > 0 && `padding: ${p.$gap}px; gap: ${p.$gap}px;`}
`;

const MainArea = styled.div<{ $radius: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  ${(p) => p.$radius > 0 && `border-radius: ${p.$radius}px; overflow: hidden;`}
`;

const ContentRow = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const Scroll = styled.div<{ $bg: string; $color: string }>`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
`;

interface PageFrameProps {
  breadcrumbs?: string[];
  variant?: ShellVariant;
  colorMode?: ColorMode;
  children: (ctx: {
    dims: ReturnType<typeof getMergedDims>;
    isDark: boolean;
    variant: ShellVariant;
    colorMode: ColorMode;
  }) => React.ReactNode;
}

export default function PageFrame({
  breadcrumbs,
  variant = "standard",
  colorMode = "digitalocean",
  children,
}: PageFrameProps) {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [activeA11y, setActiveA11y] = useState<string[]>([]);

  const dims = getMergedDims(variant, colorMode);
  const isDark = colorMode === "dark" || variant === "floating";

  const toggleAssistant = useCallback(() => setAssistantOpen((p) => !p), []);
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
    allAttrs.forEach((a) => html.removeAttribute(a));
    activeA11y.forEach((id) => html.setAttribute(`data-${id}`, ""));
  }, [activeA11y]);

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
            breadcrumbs={breadcrumbs}
          />
          <ContentRow>
            <Scroll $bg={dims.contentBg} $color={dims.textPrimary}>
              {children({ dims, isDark, variant, colorMode })}
              <AccessibilityCTA onClick={() => setA11yOpen(true)} />
            </Scroll>
            <AssistantPanel
              open={assistantOpen}
              onClose={() => setAssistantOpen(false)}
              dims={dims}
            />
          </ContentRow>
        </MainArea>
      </ShellContainer>

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

function AccessibilityCTA(_: { onClick: () => void }) {
  void _;
  return null;
}
