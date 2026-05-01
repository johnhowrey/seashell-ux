"use client";

import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AssistantPanel from "@/components/AssistantPanel";
import NotificationsPanel from "@/components/NotificationsPanel";
import { ShellVariant, ColorMode, getMergedDims } from "@/lib/theme";
import { icons } from "@/lib/icons";

/* ─── Shell ─── */
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
  ${(p) =>
    p.$radius > 0 && `border-radius: ${p.$radius}px; overflow: hidden;`}
`;
const ContentRow = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;
const PageScroll = styled.div<{ $bg: string; $text: string }>`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$text};
`;

/* ─── Page layout ─── */
const PageInner = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 40px 64px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
const MainColumn = styled.div`
  min-width: 0;
`;
const SidePanel = styled.aside`
  position: sticky;
  top: 24px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Crumb = styled.a<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
const PageTitle = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 16px;
  letter-spacing: -0.2px;
`;

/* ─── Copilot banner ─── */
const CopilotBanner = styled.div`
  position: relative;
  background: linear-gradient(
    103deg,
    #efe7ff 0%,
    #e3edff 50%,
    #fbe6f2 100%
  );
  border: 1px solid rgba(99, 102, 241, 0.18);
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;
const BannerContent = styled.div`
  flex: 1;
  min-width: 0;
`;
const BannerTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;
const NewPill = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 2px 7px;
  border-radius: 11px;
  background: #1a1a1a;
  color: #ffffff;
`;
const BannerHeading = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #1a1a1a;
`;
const BannerBody = styled.p`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.45;
  color: #2a2540;
  margin: 0;
`;
const BannerCTA = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #4338ca;
  cursor: pointer;
  white-space: nowrap;
  &:hover { text-decoration: underline; }
`;

/* ─── Section card ─── */
const SectionCard = styled.section<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 22px 24px;
  margin-bottom: 16px;
`;
const SectionHeading = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${(p) => p.$color};
  margin: 0 0 4px;
  letter-spacing: -0.1px;
`;
const SectionSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${(p) => p.$color};
  line-height: 1.5;
  margin: 0 0 18px;
`;

const GroupLabel = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  color: ${(p) => p.$color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 8px;
  &:first-of-type { margin-top: 0; }
`;

/* ─── Engine row (radio + icon + label) ─── */
const EngineRow = styled.label<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}0d` : p.$surface)};
  cursor: pointer;
  margin-bottom: 8px;
  transition: border-color 0.15s ease, background 0.15s ease;
  &:hover { border-color: ${(p) => p.$accent}; }
  &:last-child { margin-bottom: 0; }
`;
const Radio = styled.span<{ $selected: boolean; $accent: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${(p) => (p.$selected ? p.$accent : "#cccccc")};
  display: inline-flex;
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
const EngineDot = styled.span<{ $color: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$color};
  flex-shrink: 0;
`;
const EngineMid = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const EngineNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const EngineName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;
const Limited = styled.span<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 5px;
  border-radius: 3px;
  background: ${(p) => p.$accent}1f;
  color: ${(p) => p.$accent};
`;
const EngineDesc = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const EngineVer = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;

/* ─── Configuration tabs ─── */
const TabRow = styled.div<{ $border: string }>`
  display: inline-flex;
  border-bottom: 1px solid ${(p) => p.$border};
  margin-bottom: 16px;
  gap: 0;
`;
const Tab = styled.button<{ $active: boolean; $accent: string; $color: string }>`
  position: relative;
  padding: 10px 18px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? 600 : 500)};
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(p) => (p.$active ? p.$accent : "transparent")};
  }
`;
const TabSub = styled.span<{ $color: string }>`
  display: block;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${(p) => p.$color};
  margin-top: 2px;
`;

const PlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const PlanRow = styled.label<{
  $selected: boolean;
  $disabled: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}0d` : p.$surface)};
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(p) => (p.$disabled ? 0.55 : 1)};
  transition: border-color 0.15s ease, background 0.15s ease;
  &:hover { border-color: ${(p) => (p.$disabled ? p.$border : p.$accent)}; }
`;
const PlanPrice = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
  min-width: 110px;
`;
const PlanSpec = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: ${(p) => p.$color};
  flex: 1;
`;

const SelectPlanLabel = styled.h3<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 16px 0 10px;
`;

/* ─── Unavailable section ─── */
const UnavailHeader = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 18px;
  border-top: 1px solid;
  border-color: inherit;
  margin-top: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  color: ${(p) => p.$color};
`;
const UnavailTitle = styled.div<{ $color: string }>`
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const UnavailBody = styled.p<{ $color: string }>`
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 0 0 10px;
  line-height: 1.5;
`;
const InformLink = styled.button<{ $accent: string }>`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$accent};
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
const UnavailRow = styled.div<{ $border: string; $surface: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  background: ${(p) => p.$surface};
  margin-top: 8px;
  opacity: 0.7;
`;
const UnavailLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
  flex-shrink: 0;
`;
const UnavailRegions = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: ${(p) => p.$color};
  margin-left: auto;
  flex-shrink: 0;
`;

/* ─── Storage ─── */
const StorageGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  gap: 32px;
`;
const StorageBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StorageLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
`;
const StorageValue = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;
const Stepper = styled.div<{ $border: string }>`
  display: inline-flex;
  align-items: stretch;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  overflow: hidden;
`;
const StepperBtn = styled.button<{ $color: string }>`
  width: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${(p) => p.$color};
  font-family: inherit;
  &:hover { background: rgba(0,0,0,0.05); }
`;
const StepperInput = styled.input<{ $color: string }>`
  width: 70px;
  padding: 6px 8px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 13px;
  background: transparent;
  color: ${(p) => p.$color};
  font-family: inherit;
  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    appearance: none; margin: 0;
  }
`;
const HelperLine = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
  line-height: 1.5;
  margin: 0 0 16px;
`;
const InlineLink = styled.a<{ $accent: string }>`
  color: ${(p) => p.$accent};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

/* ─── HA section ─── */
const HABanner = styled.div<{ $accent: string; $surface: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-radius: 8px;
  background: ${(p) => p.$accent}0f;
  border: 1px solid ${(p) => p.$accent}33;
  margin-bottom: 14px;
`;
const HABannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;
const HABannerHeading = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;
const HABannerSub = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const HAGroup = styled.div<{ $border: string; $surface: string; $selected: boolean; $accent: string }>`
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  background: ${(p) => (p.$selected ? `${p.$accent}0d` : p.$surface)};
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 8px;
`;
const HAGroupHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
`;
const HAGroupTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;
const HAGroupGuarantee = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
  white-space: nowrap;
`;
const HAGroupBody = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.45;
  color: ${(p) => p.$color};
  margin: 0 0 12px;
`;

const HAOption = styled.label<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 6px;
  background: ${(p) => (p.$selected ? `${p.$accent}0d` : p.$surface)};
  cursor: pointer;
  margin-bottom: 6px;
  &:last-child { margin-bottom: 0; }
`;
const HAOptionLabel = styled.span<{ $color: string }>`
  flex: 1;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const HAOptionPrice = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

/* ─── Region ─── */
const RegionRow = styled.label<{
  $selected: boolean;
  $accent: string;
  $border: string;
  $surface: string;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid ${(p) => (p.$selected ? p.$accent : p.$border)};
  border-radius: 8px;
  background: ${(p) => (p.$selected ? `${p.$accent}0d` : p.$surface)};
  cursor: pointer;
  margin-bottom: 8px;
  &:last-of-type { margin-bottom: 0; }
`;
const Flag = styled.span`
  font-size: 18px;
  line-height: 1;
`;
const RegionLabel = styled.span<{ $color: string }>`
  flex: 1;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const RegionTag = styled.span<{ $bg: string; $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: ${(p) => p.$color};
  background: ${(p) => p.$bg};
  padding: 2px 8px;
  border-radius: 4px;
`;

const Disclosure = styled.button<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  margin-top: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$accent};
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
const VpcCallout = styled.div<{ $border: string; $color: string; $surface: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$surface};
  border-radius: 8px;
  margin-top: 14px;
`;
const VpcLine1 = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const VpcLine2 = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

/* ─── Finalize ─── */
const FormField = styled.div`
  margin-bottom: 16px;
`;
const FieldLabel = styled.label<{ $color: string }>`
  display: block;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin-bottom: 6px;
`;
const TextInput = styled.input<{
  $border: string;
  $bg: string;
  $color: string;
  $accent: string;
}>`
  width: 100%;
  max-width: 420px;
  padding: 9px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  &:focus { border-color: ${(p) => p.$accent}; }
`;
const SelectInput = styled.select<{
  $border: string;
  $bg: string;
  $color: string;
  $accent: string;
}>`
  width: 100%;
  max-width: 420px;
  padding: 9px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;
  cursor: pointer;
  &:focus { border-color: ${(p) => p.$accent}; }
`;

/* ─── Right rail ─── */
const SummaryCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 18px 20px;
`;
const SummaryHeading = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin: 0 0 14px;
`;
const SumGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;
const SumGroupTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: ${(p) => p.$color};
`;
const SumLine = styled.div<{ $color: string }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${(p) => p.$color};
`;
const SumLineLabel = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
`;
const SumLineValue = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-weight: 500;
`;
const SumPrice = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-top: 4px;
`;
const SumDivider = styled.hr<{ $border: string }>`
  border: none;
  border-top: 1px solid ${(p) => p.$border};
  margin: 8px 0 12px;
`;
const TotalRow = styled.div<{ $color: string }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
`;
const TotalLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
`;
const TotalRight = styled.span`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const TotalAmount = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${(p) => p.$color};
`;
const HourlyNote = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: ${(p) => p.$color};
  margin-top: 2px;
`;

const PrimaryCTA = styled.button<{ $accent: string; $hover: string }>`
  width: 100%;
  padding: 11px 16px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: ${(p) => p.$hover}; }
`;

const NextCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 16px 20px;
`;
const NextHeading = styled.h3<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0 0 10px;
`;
const NextLink = styled.button<{ $accent: string }>`
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 6px 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$accent};
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

/* ─── Data ─── */
type EngineGroup = "Application" | "Specialty" | "Streaming";
interface Engine {
  id: string;
  name: string;
  version: string;
  description: string;
  color: string;
  group: EngineGroup;
  limited?: boolean;
}
const engines: Engine[] = [
  { id: "mongodb", name: "MongoDB", version: "v8.0", description: "Great for social networks, IoT, and big data storage", color: "#00684a", group: "Application" },
  { id: "postgresql", name: "PostgreSQL", version: "v17", description: "Great for analytics, AI/ML, and enterprise apps", color: "#336791", group: "Application" },
  { id: "mysql", name: "MySQL", version: "v8", description: "Great for e-commerce, CMSs, and transactional web apps", color: "#00758f", group: "Application" },
  { id: "valkey", name: "Valkey", version: "v8", description: "Great for chat apps, leaderboards, and low-latency operations", color: "#dc382d", group: "Specialty", limited: true },
  { id: "opensearch", name: "OpenSearch", version: "v2", description: "Great for high-speed search and logs analysis", color: "#005eb8", group: "Specialty" },
  { id: "kafka", name: "Kafka", version: "v3.8", description: "Great for fintech, event tracking, and service communication", color: "#231f20", group: "Streaming" },
];

interface Plan {
  id: string;
  price: number;
  vcpu: number;
  ram: number;
  connections: number;
  storageMin: number;
  unavailableIn?: string[];
}
const plansBasic: Plan[] = [
  { id: "p1", price: 152, vcpu: 4, ram: 8, connections: 97, storageMin: 36 },
  { id: "p2", price: 302, vcpu: 4, ram: 16, connections: 195, storageMin: 80 },
  { id: "p3", price: 1218, vcpu: 8, ram: 32, connections: 390, storageMin: 230 },
  { id: "p4", price: 1828, vcpu: 8, ram: 64, connections: 390, storageMin: 350 },
];
const plansUnavail: Plan[] = [
  { id: "p5", price: 2426, vcpu: 16, ram: 64, connections: 780, storageMin: 400, unavailableIn: ["NYC3"] },
  { id: "p6", price: 3728, vcpu: 32, ram: 128, connections: 1560, storageMin: 750, unavailableIn: ["NYC3"] },
];

const tiers: { id: string; label: string; sub: string; description: string }[] = [
  {
    id: "basic",
    label: "Basic",
    sub: "Shared CPU",
    description:
      "Recommended for small projects that can handle variable levels of CPU performance, like blogs, web apps and dev/test environments.",
  },
  {
    id: "general",
    label: "General Purpose",
    sub: "Dedicated CPU",
    description:
      "Recommended for production workloads that need consistent CPU performance.",
  },
  {
    id: "storage-opt",
    label: "Storage-Optimized",
    sub: "Dedicated CPU",
    description:
      "Recommended for analytics and high-throughput workloads that require fast disk I/O.",
  },
];

const projects = ["My First Project", "Production Infrastructure", "Staging"];

const regions = [
  { id: "nyc2", flag: "🇺🇸", city: "New York", dc: "Datacenter 2 — NYC2", tag: "1 standby", tagBg: "#e0f2fe", tagColor: "#075985" },
  { id: "nyc3", flag: "🇺🇸", city: "New York", dc: "Datacenter 3 — NYC3", tag: "primary", tagBg: "#dcfce7", tagColor: "#166534" },
];

/* ─── Page ─── */
export default function CreateDatabasePage() {
  const [variant] = useState<ShellVariant>("standard");
  const [colorMode] = useState<ColorMode>("digitalocean");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [engineId, setEngineId] = useState("postgresql");
  const [tier, setTier] = useState("basic");
  const [planId, setPlanId] = useState("p1");
  const [storageGb, setStorageGb] = useState(51);
  const [haKind, setHaKind] = useState<"upgrade" | "automated">("automated");
  const [standby, setStandby] = useState<"none" | "one" | "two">("none");
  const [regionId, setRegionId] = useState("nyc3");
  const [showMoreRegions, setShowMoreRegions] = useState(false);
  const [clusterName, setClusterName] = useState("db-postgresql-nyc3");
  const [project, setProject] = useState(projects[0]);

  const dims = getMergedDims(variant, colorMode);
  const toggleAssistant = useCallback(() => setAssistantOpen((p) => !p), []);
  const toggleNotifications = useCallback(() => setNotificationsOpen((p) => !p), []);

  const engine = engines.find((e) => e.id === engineId)!;
  const plan = plansBasic.find((p) => p.id === planId) ?? plansBasic[0];
  const region = regions.find((r) => r.id === regionId) ?? regions[1];
  const regionTag = region.dc.split("—")[1]?.trim() ?? "";

  const standbyPrice = standby === "one" ? 76 : standby === "two" ? 152 : 0;
  const storageMin = plan.storageMin;
  const effectiveStorage = Math.max(storageGb, storageMin);
  const extraStorageGb = Math.max(0, effectiveStorage - storageMin);
  const storageCost = +(extraStorageGb * 0.2).toFixed(2);
  const monthly = +(plan.price + standbyPrice + storageCost).toFixed(2);
  const hourly = +(monthly / 730).toFixed(3);

  const groupedEngines = useMemo(() => {
    const g: Record<EngineGroup, Engine[]> = {
      Application: [],
      Specialty: [],
      Streaming: [],
    };
    engines.forEach((e) => g[e.group].push(e));
    return g;
  }, []);

  const activeTier = tiers.find((t) => t.id === tier)!;

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
          breadcrumbs={["Acme Corp", "Platform Engineering", "roadtrip-copilot", "Databases", "Create Database"]}
        />
        <ContentRow>
          <PageScroll $bg={dims.contentBg} $text={dims.textPrimary}>
            <PageInner>
              <MainColumn>
                <Link href="/" passHref legacyBehavior>
                  <Crumb $accent={dims.accent}>← Back to Databases</Crumb>
                </Link>

                <PageTitle $color={dims.textPrimary}>
                  Create a Managed Database
                </PageTitle>

                {/* Copilot banner */}
                <CopilotBanner>
                  <BannerContent>
                    <BannerTopRow>
                      <NewPill>NEW!</NewPill>
                      <BannerHeading>Let us handle the setup</BannerHeading>
                    </BannerTopRow>
                    <BannerBody>
                      Not sure where to start? Describe the database you
                      need—Copilot will build the setup for you.
                    </BannerBody>
                  </BannerContent>
                  <BannerCTA
                    type="button"
                    onClick={() => setAssistantOpen(true)}
                  >
                    Launch with Copilot →
                  </BannerCTA>
                </CopilotBanner>

                {/* Engine */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a database engine
                  </SectionHeading>
                  {(["Application", "Specialty", "Streaming"] as EngineGroup[]).map(
                    (group) => (
                      <React.Fragment key={group}>
                        <GroupLabel $color={dims.textMuted}>{group}</GroupLabel>
                        {groupedEngines[group].map((e) => {
                          const selected = engineId === e.id;
                          return (
                            <EngineRow
                              key={e.id}
                              $selected={selected}
                              $accent={dims.accent}
                              $border={dims.borderLight}
                              $surface={dims.surfaceBg}
                              onClick={() => setEngineId(e.id)}
                            >
                              <Radio
                                $selected={selected}
                                $accent={dims.accent}
                              />
                              <EngineDot $color={e.color} />
                              <EngineMid>
                                <EngineNameRow>
                                  <EngineName $color={dims.textPrimary}>
                                    {e.name}
                                  </EngineName>
                                  {e.limited && (
                                    <Limited $accent={dims.accent}>
                                      Limited
                                    </Limited>
                                  )}
                                </EngineNameRow>
                                <EngineDesc $color={dims.textSecondary}>
                                  {e.description}
                                </EngineDesc>
                              </EngineMid>
                              <EngineVer $color={dims.textMuted}>
                                {e.version}
                              </EngineVer>
                            </EngineRow>
                          );
                        })}
                      </React.Fragment>
                    )
                  )}
                </SectionCard>

                {/* Configuration */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a database configuration
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>
                    You can increase the size of your database cluster at any
                    time. Downscaling compute after creation is currently not
                    supported.
                  </SectionSub>

                  <TabRow $border={dims.borderLight}>
                    {tiers.map((t) => (
                      <Tab
                        key={t.id}
                        type="button"
                        $active={tier === t.id}
                        $accent={dims.accent}
                        $color={dims.textSecondary}
                        onClick={() => setTier(t.id)}
                      >
                        {t.label}
                        <TabSub $color={dims.textMuted}>{t.sub}</TabSub>
                      </Tab>
                    ))}
                  </TabRow>

                  <SectionSub $color={dims.textSecondary}>
                    {activeTier.description}
                  </SectionSub>

                  <SelectPlanLabel $color={dims.textPrimary}>
                    Select a Plan
                  </SelectPlanLabel>
                  <PlanList>
                    {plansBasic.map((p) => {
                      const selected = planId === p.id;
                      return (
                        <PlanRow
                          key={p.id}
                          $selected={selected}
                          $disabled={false}
                          $accent={dims.accent}
                          $border={dims.borderLight}
                          $surface={dims.surfaceBg}
                          onClick={() => setPlanId(p.id)}
                        >
                          <Radio
                            $selected={selected}
                            $accent={dims.accent}
                          />
                          <PlanPrice $color={dims.textPrimary}>
                            ${p.price.toLocaleString()}.00
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: dims.textMuted,
                              }}
                            >
                              /mo
                            </span>
                          </PlanPrice>
                          <PlanSpec $color={dims.textSecondary}>
                            {p.vcpu} vCPU / {p.ram} GB RAM / Connection limit:{" "}
                            {p.connections} / Storage minimum: {p.storageMin} GB
                          </PlanSpec>
                        </PlanRow>
                      );
                    })}
                  </PlanList>

                  <UnavailHeader
                    $color={dims.textPrimary}
                    style={{ borderColor: dims.borderLight }}
                  >
                    <UnavailTitle $color={dims.textPrimary}>
                      Unavailable in the selected region:
                    </UnavailTitle>
                    <UnavailBody $color={dims.textSecondary}>
                      We&rsquo;re gauging interest for high-tier plans in more
                      regions. Feel free to let us know and we will reach out.{" "}
                      <InformLink $accent={dims.accent} type="button">
                        Inform us
                      </InformLink>
                    </UnavailBody>
                  </UnavailHeader>
                  {plansUnavail.map((p) => (
                    <UnavailRow
                      key={p.id}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                    >
                      <UnavailLabel $color={dims.textMuted}>
                        Unavailable in {p.unavailableIn?.join(", ")} •
                      </UnavailLabel>
                      <PlanPrice $color={dims.textPrimary}>
                        ${p.price.toLocaleString()}.00
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: dims.textMuted,
                          }}
                        >
                          /mo
                        </span>
                      </PlanPrice>
                      <PlanSpec $color={dims.textSecondary}>
                        {p.vcpu} vCPU / {p.ram} GB RAM / Connection limit:{" "}
                        {p.connections} / Storage minimum: {p.storageMin} GB
                      </PlanSpec>
                      <UnavailRegions $color={dims.textMuted}>
                        Available in: NYC 2, NYC 3
                      </UnavailRegions>
                    </UnavailRow>
                  ))}
                </SectionCard>

                {/* Storage */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a storage size
                  </SectionHeading>
                  <HelperLine $color={dims.textSecondary}>
                    Learn more about {engine.name}&rsquo;s scalable storage in{" "}
                    <InlineLink $accent={dims.accent} href="#docs">
                      these docs
                    </InlineLink>
                    . Storage can&rsquo;t be reduced in size after creation.
                  </HelperLine>
                  <StorageGrid>
                    <StorageBlock>
                      <StorageLabel $color={dims.textSecondary}>
                        Storage size (GB)
                      </StorageLabel>
                      <Stepper $border={dims.borderLight}>
                        <StepperBtn
                          type="button"
                          $color={dims.textSecondary}
                          onClick={() =>
                            setStorageGb((g) => Math.max(storageMin, g - 1))
                          }
                          aria-label="Decrease"
                        >
                          −
                        </StepperBtn>
                        <StepperInput
                          type="number"
                          value={effectiveStorage}
                          $color={dims.textPrimary}
                          onChange={(e) =>
                            setStorageGb(parseInt(e.target.value) || storageMin)
                          }
                          min={storageMin}
                        />
                        <StepperBtn
                          type="button"
                          $color={dims.textSecondary}
                          onClick={() => setStorageGb((g) => g + 1)}
                          aria-label="Increase"
                        >
                          +
                        </StepperBtn>
                      </Stepper>
                    </StorageBlock>
                    <StorageBlock>
                      <StorageLabel $color={dims.textSecondary}>
                        Cost
                      </StorageLabel>
                      <StorageValue $color={dims.textPrimary}>
                        $0.20 / GiB
                      </StorageValue>
                    </StorageBlock>
                    <StorageBlock>
                      <StorageLabel $color={dims.textSecondary}>
                        Storage range
                      </StorageLabel>
                      <StorageValue $color={dims.textPrimary}>
                        {storageMin} GB – {storageMin + 10} GB
                      </StorageValue>
                    </StorageBlock>
                  </StorageGrid>
                </SectionCard>

                {/* HA */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Maximize uptime for critical workloads
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>&nbsp;</SectionSub>

                  <HABanner $accent={dims.accent} $surface={dims.surfaceBg}>
                    <HABannerLeft>
                      <HABannerHeading $color={dims.textPrimary}>
                        Upgrade for high availability
                      </HABannerHeading>
                      <HABannerSub $color={dims.textSecondary}>
                        99.95% uptime guarantee
                      </HABannerSub>
                    </HABannerLeft>
                  </HABanner>

                  <HAGroup
                    $accent={dims.accent}
                    $border={dims.borderLight}
                    $surface={dims.surfaceBg}
                    $selected={haKind === "upgrade"}
                    onClick={() => setHaKind("upgrade")}
                  >
                    <HAGroupHeader $color={dims.textPrimary}>
                      <HAGroupTitle $color={dims.textPrimary}>
                        99.95% uptime
                      </HAGroupTitle>
                    </HAGroupHeader>
                    <HAGroupBody $color={dims.textSecondary}>
                      Automatically replaces the primary node in the event of a
                      failure, keeping your data layer available. Details in
                      Service Level Agreement (SLA).
                    </HAGroupBody>
                    <HAOption
                      $selected={haKind === "upgrade" && standby === "one"}
                      $accent={dims.accent}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHaKind("upgrade");
                        setStandby("one");
                      }}
                    >
                      <Radio
                        $selected={haKind === "upgrade" && standby === "one"}
                        $accent={dims.accent}
                      />
                      <HAOptionLabel $color={dims.textPrimary}>
                        Add one standby node
                      </HAOptionLabel>
                      <HAOptionPrice $color={dims.textPrimary}>
                        $76/mo
                      </HAOptionPrice>
                    </HAOption>
                    <HAOption
                      $selected={haKind === "upgrade" && standby === "two"}
                      $accent={dims.accent}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHaKind("upgrade");
                        setStandby("two");
                      }}
                    >
                      <Radio
                        $selected={haKind === "upgrade" && standby === "two"}
                        $accent={dims.accent}
                      />
                      <HAOptionLabel $color={dims.textPrimary}>
                        Add two standby nodes
                      </HAOptionLabel>
                      <HAOptionPrice $color={dims.textPrimary}>
                        $152/mo
                      </HAOptionPrice>
                    </HAOption>
                  </HAGroup>

                  <HAGroup
                    $accent={dims.accent}
                    $border={dims.borderLight}
                    $surface={dims.surfaceBg}
                    $selected={haKind === "automated"}
                    onClick={() => {
                      setHaKind("automated");
                      setStandby("none");
                    }}
                  >
                    <HAGroupHeader $color={dims.textPrimary}>
                      <HAGroupTitle $color={dims.textPrimary}>
                        Automated failover
                      </HAGroupTitle>
                      <HAGroupGuarantee $color={dims.textSecondary}>
                        99.5% uptime guarantee
                      </HAGroupGuarantee>
                    </HAGroupHeader>
                    <HAOption
                      $selected={haKind === "automated"}
                      $accent={dims.accent}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                    >
                      <Radio
                        $selected={haKind === "automated"}
                        $accent={dims.accent}
                      />
                      <HAOptionLabel $color={dims.textPrimary}>
                        No standby nodes
                      </HAOptionLabel>
                    </HAOption>
                  </HAGroup>
                </SectionCard>

                {/* Region */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Choose a datacenter region
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>&nbsp;</SectionSub>
                  {regions.map((r) => (
                    <RegionRow
                      key={r.id}
                      $selected={regionId === r.id}
                      $accent={dims.accent}
                      $border={dims.borderLight}
                      $surface={dims.surfaceBg}
                      onClick={() => setRegionId(r.id)}
                    >
                      <Radio
                        $selected={regionId === r.id}
                        $accent={dims.accent}
                      />
                      <Flag>{r.flag}</Flag>
                      <RegionLabel $color={dims.textPrimary}>
                        {r.city} • {r.dc}
                      </RegionLabel>
                      <RegionTag $bg={r.tagBg} $color={r.tagColor}>
                        {r.tag}
                      </RegionTag>
                    </RegionRow>
                  ))}
                  <Disclosure
                    $accent={dims.accent}
                    type="button"
                    onClick={() => setShowMoreRegions((s) => !s)}
                  >
                    {showMoreRegions ? "Hide" : "Additional"} datacenter regions
                  </Disclosure>
                  <VpcCallout
                    $border={dims.borderLight}
                    $color={dims.textSecondary}
                    $surface={dims.contentBg}
                  >
                    <VpcLine1 $color={dims.textPrimary}>
                      VPC Network • default-nyc1
                    </VpcLine1>
                    <VpcLine2 $color={dims.textSecondary}>
                      All resources created in this datacenter will be members
                      of this VPC network. Only connect resources you own.
                    </VpcLine2>
                  </VpcCallout>
                </SectionCard>

                {/* Finalize */}
                <SectionCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SectionHeading $color={dims.textPrimary}>
                    Finalize and create
                  </SectionHeading>
                  <SectionSub $color={dims.textSecondary}>&nbsp;</SectionSub>
                  <FormField>
                    <FieldLabel $color={dims.textSecondary}>
                      Choose a name
                    </FieldLabel>
                    <TextInput
                      $border={dims.borderLight}
                      $bg={dims.contentBg}
                      $color={dims.textPrimary}
                      $accent={dims.accent}
                      value={clusterName}
                      onChange={(e) => setClusterName(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <FieldLabel $color={dims.textSecondary}>
                      Select a project
                    </FieldLabel>
                    <SelectInput
                      $border={dims.borderLight}
                      $bg={dims.contentBg}
                      $color={dims.textPrimary}
                      $accent={dims.accent}
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      {projects.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </SelectInput>
                  </FormField>
                </SectionCard>
              </MainColumn>

              {/* Right rail */}
              <SidePanel>
                <SummaryCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <SummaryHeading $color={dims.textPrimary}>
                    Summary
                  </SummaryHeading>

                  <SumGroup>
                    <SumGroupTitle $color={dims.textPrimary}>
                      Primary node
                    </SumGroupTitle>
                    <SumLine $color={dims.textSecondary}>
                      <SumLineLabel $color={dims.textSecondary}>
                        Engine
                      </SumLineLabel>
                      <SumLineValue $color={dims.textPrimary}>
                        {engine.name} {engine.version}
                      </SumLineValue>
                    </SumLine>
                    <SumLine $color={dims.textSecondary}>
                      <SumLineLabel $color={dims.textSecondary}>
                        Compute
                      </SumLineLabel>
                      <SumLineValue $color={dims.textPrimary}>
                        {activeTier.label}
                      </SumLineValue>
                    </SumLine>
                    <SumLine $color={dims.textSecondary}>
                      <SumLineLabel $color={dims.textSecondary}>
                        vCPU
                      </SumLineLabel>
                      <SumLineValue $color={dims.textPrimary}>
                        {plan.vcpu} {tier === "basic" ? "Shared" : "Dedicated"}
                      </SumLineValue>
                    </SumLine>
                    <SumLine $color={dims.textSecondary}>
                      <SumLineLabel $color={dims.textSecondary}>
                        Memory
                      </SumLineLabel>
                      <SumLineValue $color={dims.textPrimary}>
                        {plan.ram} GB RAM
                      </SumLineValue>
                    </SumLine>
                    <SumPrice $color={dims.textPrimary}>
                      ${plan.price.toLocaleString()}.00 / mo
                    </SumPrice>
                  </SumGroup>

                  {standby !== "none" && (
                    <SumGroup>
                      <SumGroupTitle $color={dims.textPrimary}>
                        Standby node
                      </SumGroupTitle>
                      <SumLine $color={dims.textSecondary}>
                        <SumLineLabel $color={dims.textSecondary}>
                          Number
                        </SumLineLabel>
                        <SumLineValue $color={dims.textPrimary}>
                          {standby === "two" ? 2 : 1}
                        </SumLineValue>
                      </SumLine>
                      <SumLine $color={dims.textSecondary}>
                        <SumLineLabel $color={dims.textSecondary}>
                          Uptime
                        </SumLineLabel>
                        <SumLineValue $color={dims.textPrimary}>
                          99.95% guarantee
                        </SumLineValue>
                      </SumLine>
                      <SumPrice $color={dims.textPrimary}>
                        ${standbyPrice}.00 / mo
                      </SumPrice>
                    </SumGroup>
                  )}

                  <SumGroup>
                    <SumGroupTitle $color={dims.textPrimary}>
                      Storage
                    </SumGroupTitle>
                    <SumLine $color={dims.textSecondary}>
                      <SumLineLabel $color={dims.textSecondary}>
                        Size
                      </SumLineLabel>
                      <SumLineValue $color={dims.textPrimary}>
                        {effectiveStorage} GiB SSD
                      </SumLineValue>
                    </SumLine>
                    <SumPrice $color={dims.textPrimary}>
                      ${storageCost.toFixed(2)} / mo
                    </SumPrice>
                  </SumGroup>

                  <SumDivider $border={dims.borderLight} />

                  <TotalRow $color={dims.textPrimary}>
                    <TotalLabel $color={dims.textPrimary}>
                      Total cost
                    </TotalLabel>
                    <TotalRight>
                      <TotalAmount $color={dims.textPrimary}>
                        ${monthly.toLocaleString()}/month
                      </TotalAmount>
                      <HourlyNote $color={dims.textMuted}>
                        ${hourly.toFixed(3)}/hour
                      </HourlyNote>
                    </TotalRight>
                  </TotalRow>

                  <PrimaryCTA
                    type="button"
                    $accent={dims.accent}
                    $hover={dims.accentHover}
                  >
                    Create Managed Database
                  </PrimaryCTA>
                </SummaryCard>

                <NextCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <NextHeading $color={dims.textPrimary}>
                    What&rsquo;s next?
                  </NextHeading>
                  <NextLink type="button" $accent={dims.accent}>
                    Migrate current Database
                  </NextLink>
                  <NextLink type="button" $accent={dims.accent}>
                    Add Trusted Sources
                  </NextLink>
                </NextCard>
              </SidePanel>
            </PageInner>
          </PageScroll>

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
