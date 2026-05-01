"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ShellVariant, ShellDims } from "../lib/theme";
import { icons } from "../lib/icons";

interface HeaderProps {
  variant: ShellVariant;
  dims: ShellDims;
  onToggleAssistant: () => void;
  assistantOpen: boolean;
  onBack?: () => void;
  breadcrumbs?: string[];
}

interface HasDims {
  $variant: ShellVariant;
  $dims: ShellDims;
}

/* ───────────────────────────── Container ───────────────────────────── */

const Container = styled.header<HasDims>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ $dims }) => $dims.headerHeight}px;
  padding-left: 20px;
  flex-shrink: 0;
  background: ${({ $variant, $dims }) =>
    $variant === "zen" ? $dims.accent : $dims.headerBg};
  border-bottom: ${({ $variant, $dims }) =>
    $variant === "floating" ? "none" : `1px solid ${$dims.borderLight}`};
  position: relative;
  z-index: 10;

  ${({ $variant, $dims }) =>
    $variant === "floating" &&
    css`
      border-radius: ${$dims.borderRadius}px;
      margin: ${$dims.gap}px ${$dims.gap}px 0 ${$dims.gap}px;
      border: 1px solid ${$dims.borderLight};
      overflow: hidden;
    `}
`;

/* ──────────────────────────── Breadcrumbs ──────────────────────────── */

const BreadcrumbWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const BackButton = styled.button<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
  flex-shrink: 0;
  color: ${({ $variant, $dims }) =>
    $variant === "zen" ? "#ffffff" : $dims.textPrimary};
  transition: opacity 0.1s ease;

  &:hover {
    opacity: 0.65;
  }
`;

const CrumbTrail = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  overflow: hidden;
`;

const CrumbGroup = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

const Segment = styled.button<HasDims & { $active: boolean }>`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  transition: max-width 0.15s ease, color 0.1s ease;

  ${({ $active, $variant, $dims }) =>
    $active
      ? css`
          color: ${$variant === "zen" ? "#ffffff" : $dims.textPrimary};
          max-width: none;
          flex-shrink: 0;
        `
      : css`
          color: ${$variant === "zen"
            ? "rgba(255,255,255,0.7)"
            : "#878787"};
          max-width: 68px;
          flex-shrink: 1;
          &:hover {
            color: ${$variant === "zen" ? "#ffffff" : $dims.textPrimary};
          }
        `}
`;

const Separator = styled.span<HasDims>`
  color: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.55)" : "#878787"};
  font-size: 13px;
  font-weight: 400;
  margin: 0 6px;
  user-select: none;
  flex-shrink: 0;
`;

/* ────────────────────────────── Actions ────────────────────────────── */

const Actions = styled.div<HasDims>`
  display: flex;
  align-items: stretch;
  height: ${({ $dims }) => $dims.headerHeight}px;
  flex-shrink: 0;
`;

const CreateButton = styled.button<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  padding: 0 16px;
  background: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.16)" : "#00879b"};
  border: none;
  color: #ffffff;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $variant }) =>
      $variant === "zen" ? "rgba(255,255,255,0.24)" : "#00707f"};
  }
`;

const SearchWrap = styled.div<HasDims>`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  background: ${({ $variant, $dims }) =>
    $variant === "zen"
      ? "rgba(255,255,255,0.1)"
      : $dims.surfaceBg};
  min-width: 200px;
  border-left: 1px solid
    ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.2)" : $dims.borderLight};
  border-right: 1px solid
    ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.2)" : $dims.borderLight};
`;

const SearchIcon = styled.span<HasDims>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  flex-shrink: 0;
  color: ${({ $variant }) =>
    $variant === "zen" ? "rgba(255,255,255,0.7)" : "#999999"};
`;

const SearchInput = styled.input<HasDims>`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${({ $variant, $dims }) =>
    $variant === "zen" ? "#ffffff" : $dims.textPrimary};

  &::placeholder {
    color: ${({ $variant, $dims }) =>
      $variant === "zen" ? "rgba(255,255,255,0.7)" : $dims.textMuted};
    font-weight: 500;
  }
`;

const AssistantButton = styled.button<HasDims & { $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  padding: 0 16px;
  width: auto;
  overflow: hidden;
  border: none;
  color: #ffffff;
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  background: linear-gradient(
    17.61deg,
    rgb(0, 12, 121) 5.31%,
    rgb(10, 78, 235) 26.68%,
    rgb(0, 105, 255) 48.05%,
    rgb(198, 174, 255) 96.08%
  );
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.06);
  }

  ${({ $active }) =>
    $active &&
    css`
      filter: brightness(1.1);
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
    `}
`;

const KeyHint = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  opacity: 0.55;
  margin-left: 2px;
`;

/* ───────────────────────────── Component ───────────────────────────── */

const DEFAULT_BREADCRUMBS = [
  "Acme Corp",
  "Platform Engineering",
  "roadtrip-copilot",
  "Dashboard",
];

function Header({
  variant,
  dims,
  onToggleAssistant,
  assistantOpen,
  onBack,
  breadcrumbs = DEFAULT_BREADCRUMBS,
}: HeaderProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const mac =
      typeof navigator !== "undefined" &&
      /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
    setIsMac(mac);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === "k") {
        e.preventDefault();
        onToggleAssistant();
      } else if (key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onToggleAssistant]);

  const cmd = isMac ? "⌘" : "Ctrl+";

  return (
    <Container $variant={variant} $dims={dims}>
      <BreadcrumbWrap>
        <BackButton
          $variant={variant}
          $dims={dims}
          aria-label="Go back"
          onClick={() => onBack?.()}
        >
          {icons.arrowLeft}
        </BackButton>
        <CrumbTrail>
          {breadcrumbs.map((part, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <CrumbGroup key={`${part}-${i}`}>
                <Segment
                  $variant={variant}
                  $dims={dims}
                  $active={isLast}
                  type="button"
                  title={part}
                >
                  {part}
                </Segment>
                {!isLast && (
                  <Separator $variant={variant} $dims={dims} aria-hidden>
                    /
                  </Separator>
                )}
              </CrumbGroup>
            );
          })}
        </CrumbTrail>
      </BreadcrumbWrap>

      <Actions $variant={variant} $dims={dims}>
        <CreateButton $variant={variant} $dims={dims} type="button">
          {icons.plusBold}
          Create
        </CreateButton>
        <SearchWrap $variant={variant} $dims={dims}>
          <SearchIcon $variant={variant} $dims={dims} aria-hidden>
            {icons.searchSm}
          </SearchIcon>
          <SearchInput
            ref={searchRef}
            $variant={variant}
            $dims={dims}
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </SearchWrap>
        <AssistantButton
          $variant={variant}
          $dims={dims}
          $active={assistantOpen}
          type="button"
          onClick={onToggleAssistant}
          aria-label={`AI Assistant (${cmd}K)`}
          title={`AI Assistant (${cmd}K)`}
        >
          {icons.sparkles}
          AI Assistant
          <KeyHint>{cmd}K</KeyHint>
        </AssistantButton>
      </Actions>
    </Container>
  );
}

export default Header;
