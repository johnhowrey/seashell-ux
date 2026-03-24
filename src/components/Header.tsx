"use client";

import React from "react";
import styled from "styled-components";
import { ShellVariant, ShellDims } from "../lib/theme";
import { icons } from "../lib/icons";

interface HeaderProps {
  variant: ShellVariant;
  dims: ShellDims;
  onToggleAssistant: () => void;
  assistantOpen: boolean;
}

interface TransientProps {
  $variant: ShellVariant;
  $dims: ShellDims;
  $active?: boolean;
}

const Wrapper = styled.header<TransientProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ $dims }) => $dims.headerHeight}px;
  background: ${({ $dims }) => $dims.headerBg};
  border-bottom: 1px solid ${({ $dims }) => $dims.borderLight};
  padding: 0 16px;
  z-index: 10;
  transition: background 0.15s ease;
  position: relative;
  flex-shrink: 0;

  ${({ $variant, $dims }) =>
    $variant === "floating" &&
    `
    border-radius: ${$dims.borderRadius}px;
    margin: ${$dims.gap}px ${$dims.gap}px 0 ${$dims.gap}px;
    border-bottom: none;
    border: 1px solid ${$dims.borderLight};
  `}
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
`;

const BreadcrumbPart = styled.span<{ $muted?: boolean; $variant: ShellVariant; $dims: ShellDims }>`
  font-size: 13px;
  white-space: nowrap;
  color: ${({ $muted, $variant, $dims }) => {
    if ($variant === "zen") return $muted ? "rgba(255,255,255,0.65)" : "#ffffff";
    return $muted ? $dims.textMuted : $dims.textPrimary;
  }};
  font-weight: ${({ $muted }) => ($muted ? 400 : 500)};
`;

const ChevronSep = styled.span<{ $variant: ShellVariant }>`
  display: flex;
  align-items: center;
  color: ${({ $variant }) => ($variant === "zen" ? "rgba(255,255,255,0.4)" : "#bbbbbb")};
  flex-shrink: 0;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 0 16px;
`;

const SearchWrap = styled.div<TransientProps>`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
  max-width: 400px;
  width: 100%;
`;

const SearchIcon = styled.span<{ $variant: ShellVariant }>`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${({ $variant }) => ($variant === "zen" ? "rgba(255,255,255,0.6)" : "#999999")};
  pointer-events: none;
`;

const SearchInput = styled.input<TransientProps>`
  width: 100%;
  height: ${({ $dims }) => ($dims.headerHeight <= 34 ? 26 : 32)}px;
  border: 1px solid
    ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.3)" : $dims.borderLight};
  border-radius: 6px;
  padding: 0 12px 0 32px;
  font-size: 13px;
  background: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.1)" : "transparent"};
  color: ${({ $variant, $dims }) =>
    $variant === "zen" ? "#ffffff" : $dims.textPrimary};
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ $variant }) =>
      $variant === "zen" ? "rgba(255,255,255,0.6)" : "#999999"};
  }

  &:focus {
    border-color: ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.6)" : $dims.accent};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const CreateButton = styled.button<TransientProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ $variant, $dims }) =>
    $variant === "zen" ? "rgba(255,255,255,0.2)" : $dims.createBg};
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.3)" : $dims.createHover};
  }
`;

const AssistantButton = styled.button<TransientProps & { $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${({ $active, $variant, $dims }) => {
    if ($active) {
      return $variant === "zen" ? "rgba(255,255,255,0.25)" : `${$dims.accent}14`;
    }
    return "transparent";
  }};
  color: ${({ $active, $variant, $dims }) => {
    if ($variant === "zen") return $active ? "#ffffff" : "rgba(255,255,255,0.7)";
    return $active ? $dims.accent : $dims.textMuted;
  }};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.15)" : `${$dims.accent}0a`};
  }
`;

const breadcrumbParts = [
  "Acme Corp",
  "Platform Engineering",
  "roadtrip-copilot",
  "Dashboard",
];

function Header({ variant, dims, onToggleAssistant, assistantOpen }: HeaderProps) {
  return (
    <Wrapper $variant={variant} $dims={dims}>
      <LeftSection>
        {breadcrumbParts.map((part, i) => (
          <React.Fragment key={part}>
            {i > 0 && (
              <ChevronSep $variant={variant}>{icons.chevronRight}</ChevronSep>
            )}
            <BreadcrumbPart
              $muted={i < breadcrumbParts.length - 1}
              $variant={variant}
              $dims={dims}
            >
              {part}
            </BreadcrumbPart>
          </React.Fragment>
        ))}
      </LeftSection>

      <CenterSection>
        <SearchWrap $variant={variant} $dims={dims}>
          <SearchIcon $variant={variant}>{icons.search}</SearchIcon>
          <SearchInput
            $variant={variant}
            $dims={dims}
            type="text"
            placeholder="Search resources..."
          />
        </SearchWrap>
      </CenterSection>

      <RightSection>
        <CreateButton $variant={variant} $dims={dims}>
          {icons.plus}
          Create
        </CreateButton>
        <AssistantButton
          $variant={variant}
          $dims={dims}
          $active={assistantOpen}
          onClick={onToggleAssistant}
          aria-label="Toggle assistant"
        >
          {icons.assistant}
        </AssistantButton>
      </RightSection>
    </Wrapper>
  );
}

export default Header;
