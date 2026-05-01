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
  width: 480px;
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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 24px 12px;
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

const Title = styled.h2<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0;
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

const Lead = styled.p<DimProps>`
  margin: 0;
  padding: 0 24px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ $dims }) => $dims.textSecondary};
`;

const InfoBanner = styled.div<DimProps>`
  margin: 4px 24px 14px;
  padding: 12px 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${({ $dims }) => $dims.accent}10;
  border: 1px solid ${({ $dims }) => $dims.accent}33;
  border-radius: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ $dims }) => $dims.textPrimary};
`;

const InfoIcon = styled.span<{ $accent: string }>`
  color: ${(p) => p.$accent};
  flex-shrink: 0;
  margin-top: 1px;
  display: inline-flex;
`;

const Body = styled.div`
  padding: 0 24px 4px;
  overflow-y: auto;
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
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

const Checkbox = styled.button<{ $on: boolean; $accent: string; $border: string; $isDark: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1.5px solid ${(p) => (p.$on ? p.$accent : p.$border)};
  background: ${(p) => (p.$on ? p.$accent : "transparent")};
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${(p) => p.$accent};
    outline-offset: 2px;
  }

  &::after {
    content: "";
    display: ${(p) => (p.$on ? "block" : "none")};
    width: 5px;
    height: 9px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translate(-1px, -1px);
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px 20px;
`;

const ResetButton = styled.button<DimProps>`
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dims }) => $dims.textPrimary};
  background: transparent;
  border: 1px solid ${({ $dims }) => $dims.borderLight};
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background: ${({ $dims }) => $dims.borderLight};
  }
`;

const DoneButton = styled.button<{ $accent: string }>`
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    filter: brightness(0.94);
  }
`;

interface AccessibilityModalProps {
  open: boolean;
  onClose: () => void;
  dims: ShellDims;
  isDark: boolean;
  activeAccessibility: string[];
  onToggle: (id: string) => void;
  onReset?: () => void;
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

const InfoCircle = (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  open,
  onClose,
  dims,
  isDark,
  activeAccessibility,
  onToggle,
  onReset,
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
        <HeaderRow>
          <TitleGroup>
            <IconWrap $accent={dims.accent}>{A11yIcon}</IconWrap>
            <Title $dims={dims} id="a11y-modal-title">
              Accessibility Options
            </Title>
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

        <Lead $dims={dims}>
          Adjust these settings to customize your viewing experience. Changes
          apply immediately.
        </Lead>

        <InfoBanner $dims={dims}>
          <InfoIcon $accent={dims.accent}>{InfoCircle}</InfoIcon>
          <span>
            These preferences can also be managed in your User Settings page.
          </span>
        </InfoBanner>

        <Body>
          {accessibilityOptions.map((opt) => {
            const isOn = activeAccessibility.includes(opt.id);
            return (
              <ToggleRow
                key={opt.id}
                onClick={(e) => {
                  e.preventDefault();
                  onToggle(opt.id);
                }}
              >
                <Checkbox
                  type="button"
                  $on={isOn}
                  $accent={dims.accent}
                  $border={isDark ? "#5a5a66" : "#c8c8d0"}
                  $isDark={isDark}
                  aria-pressed={isOn}
                  aria-label={opt.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(opt.id);
                  }}
                />
                <ToggleText>
                  <ToggleLabel $dims={dims}>{opt.label}</ToggleLabel>
                  <ToggleHint $dims={dims}>{opt.description}</ToggleHint>
                </ToggleText>
              </ToggleRow>
            );
          })}
        </Body>

        <Footer>
          <ResetButton
            type="button"
            $dims={dims}
            onClick={() => {
              if (onReset) onReset();
              else activeAccessibility.forEach((id) => onToggle(id));
            }}
          >
            Reset All
          </ResetButton>
          <DoneButton type="button" $accent={dims.accent} onClick={onClose}>
            Done
          </DoneButton>
        </Footer>
      </Box>
    </Backdrop>
  );
};

export default AccessibilityModal;
