"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import type { ShellDims } from "../lib/theme";
import { accessibilityOptions } from "../lib/theme";
import { icons } from "../lib/icons";

interface DimProps {
  $dims: ShellDims;
}

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: ${(p) => (p.$open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Box = styled.div<DimProps>`
  width: 520px;
  max-width: 100%;
  max-height: calc(100vh - 64px);
  background: ${({ $dims }) => $dims.surfaceBg};
  border: 1px solid ${({ $dims }) => $dims.borderLight};
  border-radius: 12px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div<DimProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid ${({ $dims }) => $dims.borderLight};
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const IconWrap = styled.span<{ $accent: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$accent}1a;
  color: ${(p) => p.$accent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const Title = styled.h2<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0;
`;

const Subtitle = styled.span<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${({ $dims }) => $dims.textMuted};
`;

const CloseButton = styled.button<DimProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $dims }) => $dims.textMuted};
  font-family: inherit;

  &:hover {
    color: ${({ $dims }) => $dims.textPrimary};
    background: ${({ $dims }) => $dims.borderLight};
  }
`;

const Body = styled.div`
  padding: 8px 20px;
  overflow-y: auto;
`;

const ToggleRow = styled.div<DimProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ $dims }) => $dims.borderLight};

  &:last-child {
    border-bottom: none;
  }
`;

const ToggleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const ToggleLabel = styled.span<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $dims }) => $dims.textPrimary};
`;

const ToggleHint = styled.span<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${({ $dims }) => $dims.textSecondary};
  line-height: 1.4;
`;

const ToggleTrack = styled.button<{ $on: boolean; $accent: string }>`
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$on ? p.$accent : "#cccccc")};
  transition: background 0.15s ease;
  padding: 0;
  flex-shrink: 0;
`;

const ToggleThumb = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(p) => (p.$on ? "20px" : "2px")};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  transition: left 0.15s ease;
`;

const Footer = styled.div<DimProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px 18px;
  border-top: 1px solid ${({ $dims }) => $dims.borderLight};
`;

const DoneButton = styled.button<{ $bg: string; $color: string; $hover: string }>`
  padding: 8px 18px;
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

interface AccessibilityModalProps {
  open: boolean;
  onClose: () => void;
  dims: ShellDims;
  isDark: boolean;
  activeAccessibility: string[];
  onToggle: (id: string) => void;
}

const A11yIcon = (
  <svg
    width={18}
    height={18}
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

const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  open,
  onClose,
  dims,
  isDark,
  activeAccessibility,
  onToggle,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const doneBg = isDark ? "#ffffff" : "#1a1a1a";
  const doneFg = isDark ? "#1a1a1a" : "#ffffff";
  const doneHover = isDark ? "#e6e6ec" : "#000000";

  return (
    <Backdrop
      $open={open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Box $dims={dims} onClick={(e) => e.stopPropagation()}>
        <HeaderRow $dims={dims}>
          <TitleGroup>
            <IconWrap $accent={dims.accent}>{A11yIcon}</IconWrap>
            <TitleText>
              <Title $dims={dims} id="a11y-modal-title">
                Accessibility Options
              </Title>
              <Subtitle $dims={dims}>
                Motion, contrast, fonts, focus, and more
              </Subtitle>
            </TitleText>
          </TitleGroup>
          <CloseButton
            $dims={dims}
            aria-label="Close"
            onClick={onClose}
            type="button"
          >
            {icons.close}
          </CloseButton>
        </HeaderRow>

        <Body>
          {accessibilityOptions.map((opt) => {
            const isOn = activeAccessibility.includes(opt.id);
            return (
              <ToggleRow key={opt.id} $dims={dims}>
                <ToggleText>
                  <ToggleLabel $dims={dims}>{opt.label}</ToggleLabel>
                  <ToggleHint $dims={dims}>{opt.description}</ToggleHint>
                </ToggleText>
                <ToggleTrack
                  type="button"
                  $on={isOn}
                  $accent={dims.accent}
                  onClick={() => onToggle(opt.id)}
                  aria-pressed={isOn}
                  aria-label={opt.label}
                >
                  <ToggleThumb $on={isOn} />
                </ToggleTrack>
              </ToggleRow>
            );
          })}
        </Body>

        <Footer $dims={dims}>
          <DoneButton
            type="button"
            $bg={doneBg}
            $color={doneFg}
            $hover={doneHover}
            onClick={onClose}
          >
            Done
          </DoneButton>
        </Footer>
      </Box>
    </Backdrop>
  );
};

export default AccessibilityModal;
