"use client";

import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AssistantPanel from "@/components/AssistantPanel";
import {
  ShellVariant,
  ColorMode,
  shellVariants,
  colorModes,
  ShellDims,
} from "@/lib/theme";

/* ── Shell layout (mirrored from main page) ── */

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

/* ── Inference page content ── */

const PageContent = styled.div<{ $bg: string; $text: string }>`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$text};
  padding: 32px 40px;
`;

const BackLink = styled.a<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  margin-bottom: 24px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const TitleGroup = styled.div``;

const PageTitle = styled.h1<{ $color: string }>`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${(p) => p.$color};
`;

const PageSubtitle = styled.p`
  font-size: 13px;
  color: #888;
  margin: 0;
`;

const CreateButton = styled.button<{
  $bg: string;
  $hover: string;
}>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: ${(p) => p.$bg};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
  &:hover {
    background: ${(p) => p.$hover};
  }
`;

const Table = styled.div<{ $border: string }>`
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
`;

const TableRow = styled.div<{
  $header?: boolean;
  $headerBg: string;
  $border: string;
}>`
  display: grid;
  grid-template-columns: 1.4fr 1.6fr 0.9fr 0.7fr 1fr;
  align-items: center;
  ${(p) =>
    p.$header &&
    `
    background: ${p.$headerBg};
    font-weight: 600;
  `}
  & + & {
    border-top: 1px solid ${(p) => p.$border};
  }
`;

const Cell = styled.div`
  padding: 12px 16px;
`;

const StatusBadge = styled.span<{ $color: string; $bgColor: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$color};
  &::before {
    content: "";
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${(p) => p.$bgColor};
  }
`;

/* ── Helpers ── */

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

/* ── Mock data ── */

const STATUS_STYLES: Record<
  string,
  { color: string; bg: string }
> = {
  Running: { color: "#15803d", bg: "#22c55e" },
  Provisioning: { color: "#92400e", bg: "#facc15" },
  Stopped: { color: "#991b1b", bg: "#ef4444" },
};

const endpoints = [
  {
    name: "prod-llama-3",
    model: "Meta Llama 3 70B",
    status: "Running",
    region: "NYC1",
    created: "Mar 12, 2026",
  },
  {
    name: "staging-mistral",
    model: "Mistral Large 2",
    status: "Running",
    region: "SFO3",
    created: "Mar 8, 2026",
  },
  {
    name: "dev-codestral",
    model: "Codestral 25.01",
    status: "Provisioning",
    region: "AMS3",
    created: "Mar 20, 2026",
  },
  {
    name: "prod-embed-v3",
    model: "Voyage AI 3 Large",
    status: "Running",
    region: "NYC1",
    created: "Feb 28, 2026",
  },
  {
    name: "test-phi-3",
    model: "Microsoft Phi-3 Mini",
    status: "Stopped",
    region: "LON1",
    created: "Jan 15, 2026",
  },
];

/* ── Page component ── */

export default function InferencePage() {
  const [variant] = useState<ShellVariant>("standard");
  const [colorMode] = useState<ColorMode>("digitalocean");
  const [assistantOpen, setAssistantOpen] = useState(false);

  const dims = getMergedDims(variant, colorMode);

  const toggleAssistant = useCallback(
    () => setAssistantOpen((p) => !p),
    []
  );

  const isDark =
    colorMode === "dark" || variant === "floating";
  const headerBg = isDark ? "#2a2a32" : "#f8f8f8";

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
      />
      <MainArea $radius={dims.borderRadius}>
        <Header
          variant={variant}
          dims={dims}
          onToggleAssistant={toggleAssistant}
          assistantOpen={assistantOpen}
        />
        <ContentRow>
          <PageContent $bg={dims.contentBg} $text={dims.textPrimary}>
            <Link href="/" passHref legacyBehavior>
              <BackLink $accent={dims.accent}>&larr; Back to Dashboard</BackLink>
            </Link>

            <PageHeader>
              <TitleGroup>
                <PageTitle $color={dims.textPrimary}>
                  Inference Hub
                </PageTitle>
                <PageSubtitle>
                  Deploy and manage AI model endpoints
                </PageSubtitle>
              </TitleGroup>
              <CreateButton $bg={dims.accent} $hover={dims.accentHover}>
                Create Endpoint
              </CreateButton>
            </PageHeader>

            <Table $border={dims.borderLight}>
              <TableRow $header $headerBg={headerBg} $border={dims.borderLight}>
                <Cell>Name</Cell>
                <Cell>Model</Cell>
                <Cell>Status</Cell>
                <Cell>Region</Cell>
                <Cell>Created</Cell>
              </TableRow>
              {endpoints.map((ep) => {
                const st = STATUS_STYLES[ep.status] ?? STATUS_STYLES.Running;
                return (
                  <TableRow
                    key={ep.name}
                    $headerBg={headerBg}
                    $border={dims.borderLight}
                  >
                    <Cell style={{ fontWeight: 500 }}>{ep.name}</Cell>
                    <Cell>{ep.model}</Cell>
                    <Cell>
                      <StatusBadge $color={st.color} $bgColor={st.bg}>
                        {ep.status}
                      </StatusBadge>
                    </Cell>
                    <Cell>{ep.region}</Cell>
                    <Cell style={{ color: dims.textSecondary }}>
                      {ep.created}
                    </Cell>
                  </TableRow>
                );
              })}
            </Table>
          </PageContent>

          <AssistantPanel
            open={assistantOpen}
            onClose={() => setAssistantOpen(false)}
            dims={dims}
          />
        </ContentRow>
      </MainArea>
    </ShellContainer>
  );
}
