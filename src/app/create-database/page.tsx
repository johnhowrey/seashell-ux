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

/* ─── Shell layout (mirrored from page.tsx) ─── */

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

/* ─── Page-specific styles ─── */

const ScrollArea = styled.div<{ $bg: string }>`
  flex: 1;
  overflow-y: auto;
  background: ${(p) => p.$bg};
  padding: 32px 40px 64px;
`;

const BackLink = styled.a<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1<{ $color: string }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 4px;
`;

const PageSubtitle = styled.p`
  font-size: 13px;
  color: #888;
  margin: 0 0 28px;
`;

const SectionCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 16px;
`;

/* ─── Engine cards ─── */

const EngineGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const EngineCard = styled.button<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  width: 120px;
  padding: 16px;
  text-align: center;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

const EngineIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  margin: 0 auto 10px;
`;

const EngineName = styled.div<{ $color: string }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

/* ─── Cluster config ─── */

const ConfigOption = styled.label<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
  $text: string;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : p.$surface)};
  cursor: pointer;
  margin-bottom: 8px;
  transition: border-color 0.15s, background 0.15s;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

const RadioCircle = styled.div<{ $selected: boolean; $accent: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(p) => (p.$selected ? p.$accent : "transparent")};
  }
`;

const ConfigDetails = styled.div`
  flex: 1;
`;

const ConfigName = styled.div<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;

const ConfigSpecs = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 2px;
`;

const ConfigPrice = styled.div<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$color};
  white-space: nowrap;
`;

/* ─── Region pills ─── */

const PillRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const RegionPill = styled.button<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $text: string;
}>`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  background: ${(p) => (p.$selected ? p.$accent : "transparent")};
  color: ${(p) => (p.$selected ? "#fff" : p.$text)};
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: ${(p) => p.$accent};
  }
`;

/* ─── Finalize ─── */

const FormField = styled.div`
  margin-bottom: 16px;
`;

const FieldLabel = styled.label<{ $color: string }>`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin-bottom: 6px;
`;

const TextInput = styled.input<{ $border: string; $bg: string; $color: string }>`
  width: 100%;
  max-width: 400px;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  &:focus {
    border-color: #0f62fe;
  }
`;

const CreateButton = styled.button<{ $accent: string; $hover: string }>`
  display: block;
  width: 100%;
  max-width: 300px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${(p) => p.$hover};
  }
`;

/* ─── Data ─── */

const engines = [
  { id: "postgresql", name: "PostgreSQL", color: "#336791" },
  { id: "mysql", name: "MySQL", color: "#00758f" },
  { id: "redis", name: "Redis", color: "#dc382d" },
  { id: "mongodb", name: "MongoDB", color: "#4db33d" },
];

const clusterConfigs = [
  {
    id: "basic",
    name: "Basic",
    price: "$15/mo",
    specs: "1 vCPU, 1 GB RAM, 10 GB Storage",
  },
  {
    id: "general",
    name: "General Purpose",
    price: "$60/mo",
    specs: "2 vCPUs, 4 GB RAM, 50 GB Storage",
  },
  {
    id: "memory",
    name: "Memory-Optimized",
    price: "$120/mo",
    specs: "4 vCPUs, 16 GB RAM, 100 GB Storage",
  },
];

const regions = ["NYC1", "SFO1", "AMS1", "SGP1", "LON1", "FRA1", "TOR1", "BLR1"];

/* ─── Helpers ─── */

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

/* ─── Page ─── */

export default function CreateDatabasePage() {
  const [variant] = useState<ShellVariant>("standard");
  const [colorMode] = useState<ColorMode>("default");
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [engine, setEngine] = useState("postgresql");
  const [config, setConfig] = useState("basic");
  const [region, setRegion] = useState("NYC1");
  const [clusterName, setClusterName] = useState("db-cluster-01");
  const [tags, setTags] = useState("");

  const dims = getMergedDims(variant, colorMode);

  const toggleAssistant = useCallback(
    () => setAssistantOpen((p) => !p),
    []
  );

  return (
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
          <ScrollArea $bg={dims.contentBg}>
            {/* Back link */}
            <Link href="/" passHref legacyBehavior>
              <BackLink $accent={dims.accent}>
                &larr; Back to Dashboard
              </BackLink>
            </Link>

            {/* Title */}
            <PageTitle $color={dims.textPrimary}>
              Create a Managed Database
            </PageTitle>
            <PageSubtitle>
              Configure and launch a fully managed database cluster
            </PageSubtitle>

            {/* Section 1: Database Engine */}
            <SectionCard $surface={dims.surfaceBg} $border={dims.borderLight}>
              <SectionTitle $color={dims.textPrimary}>
                Choose a database engine
              </SectionTitle>
              <EngineGrid>
                {engines.map((e) => (
                  <EngineCard
                    key={e.id}
                    $selected={engine === e.id}
                    $accent={dims.accent}
                    $border={dims.borderLight}
                    $surface={dims.surfaceBg}
                    onClick={() => setEngine(e.id)}
                  >
                    <EngineIcon $color={e.color} />
                    <EngineName $color={dims.textPrimary}>{e.name}</EngineName>
                  </EngineCard>
                ))}
              </EngineGrid>
            </SectionCard>

            {/* Section 2: Cluster Configuration */}
            <SectionCard $surface={dims.surfaceBg} $border={dims.borderLight}>
              <SectionTitle $color={dims.textPrimary}>
                Choose a cluster configuration
              </SectionTitle>
              {clusterConfigs.map((c) => (
                <ConfigOption
                  key={c.id}
                  $selected={config === c.id}
                  $accent={dims.accent}
                  $border={dims.borderLight}
                  $surface={dims.surfaceBg}
                  $text={dims.textPrimary}
                  onClick={() => setConfig(c.id)}
                >
                  <RadioCircle $selected={config === c.id} $accent={dims.accent} />
                  <ConfigDetails>
                    <ConfigName $color={dims.textPrimary}>{c.name}</ConfigName>
                    <ConfigSpecs>{c.specs}</ConfigSpecs>
                  </ConfigDetails>
                  <ConfigPrice $color={dims.accent}>{c.price}</ConfigPrice>
                </ConfigOption>
              ))}
            </SectionCard>

            {/* Section 3: Datacenter Region */}
            <SectionCard $surface={dims.surfaceBg} $border={dims.borderLight}>
              <SectionTitle $color={dims.textPrimary}>
                Choose a datacenter region
              </SectionTitle>
              <PillRow>
                {regions.map((r) => (
                  <RegionPill
                    key={r}
                    $selected={region === r}
                    $accent={dims.accent}
                    $border={dims.borderLight}
                    $text={dims.textSecondary}
                    onClick={() => setRegion(r)}
                  >
                    {r}
                  </RegionPill>
                ))}
              </PillRow>
            </SectionCard>

            {/* Section 4: Finalize */}
            <SectionCard $surface={dims.surfaceBg} $border={dims.borderLight}>
              <SectionTitle $color={dims.textPrimary}>
                Finalize and create
              </SectionTitle>
              <FormField>
                <FieldLabel $color={dims.textSecondary}>
                  Cluster Name
                </FieldLabel>
                <TextInput
                  $border={dims.borderLight}
                  $bg={dims.contentBg}
                  $color={dims.textPrimary}
                  value={clusterName}
                  onChange={(e) => setClusterName(e.target.value)}
                />
              </FormField>
              <FormField>
                <FieldLabel $color={dims.textSecondary}>
                  Tags
                </FieldLabel>
                <TextInput
                  $border={dims.borderLight}
                  $bg={dims.contentBg}
                  $color={dims.textPrimary}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. production, api-backend"
                />
              </FormField>
              <CreateButton $accent={dims.accent} $hover={dims.accentHover}>
                Create Database Cluster
              </CreateButton>
            </SectionCard>
          </ScrollArea>

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
