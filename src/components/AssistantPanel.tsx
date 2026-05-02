"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ShellDims, assistantPrompts, MOBILE_MEDIA } from "../lib/theme";
import { icons } from "../lib/icons";

interface DimProps {
  $dims: ShellDims;
}

/* ────────────────────────────── Layout ────────────────────────────── */

/**
 * Gutter: a layout column whose width animates between 0 and 440px.
 * This is what makes the rest of the page CONTENT shift when the panel
 * opens — the live behavior. The actual panel sits inside as an
 * absolute-positioned child so its content can extend to the edges.
 *
 * On mobile we collapse the gutter to zero and let the panel itself
 * become a fixed full-screen overlay.
 */
const Gutter = styled.div<{ $open: boolean }>`
  position: relative;
  flex-shrink: 0;
  height: 100%;
  width: ${(p) => (p.$open ? "440px" : "0")};
  transition: width 0.22s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;

  @media ${MOBILE_MEDIA} {
    width: 0;
    overflow: visible;
  }
`;

const Panel = styled.aside<{ $open: boolean; $surface: string }>`
  position: absolute;
  inset: 0;
  width: 440px;
  background: ${(p) => p.$surface};
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  transform: translateX(${(p) => (p.$open ? "0" : "100%")});
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1);
  overflow: hidden;

  @media ${MOBILE_MEDIA} {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    border-left: none;
    z-index: 220;
    transform: translateY(${(p) => (p.$open ? "0" : "100%")});
    visibility: ${(p) => (p.$open ? "visible" : "hidden")};
    transition: transform 0.24s cubic-bezier(0.2, 0, 0, 1),
      visibility 0s linear ${(p) => (p.$open ? "0s" : "0.24s")};
  }
`;

const MobileHead = styled.div<{ $border: string }>`
  display: none;

  @media ${MOBILE_MEDIA} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid ${(p) => p.$border};
    flex-shrink: 0;
  }
`;

const MobileHeadTitle = styled.span<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${({ $dims }) => $dims.textPrimary};
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const MobileCloseBtn = styled.button<DimProps>`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ $dims }) => $dims.textPrimary};

  &:active {
    background: rgba(0, 0, 0, 0.05);
  }
`;

/* ────────────────────────────── Body ────────────────────────────── */

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 24px 0;
`;

const WelcomeWave = styled.div`
  font-size: 20px;
  margin-bottom: 6px;
`;

const WelcomeHeading = styled.h2<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 1.35;
  letter-spacing: -0.15px;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0 0 2px;
`;

const AccentSpan = styled.span<{ $accent: string }>`
  color: ${(p) => p.$accent};
`;

const WelcomeSub = styled.p<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 1.35;
  letter-spacing: -0.15px;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0 0 20px;
`;

const GradientLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(
    14.13deg,
    rgb(0, 12, 121) 5.31%,
    rgb(10, 78, 235) 26.68%,
    rgb(0, 105, 255) 48.05%,
    rgb(198, 174, 255) 96.08%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: none;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.4;
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: rgb(10, 78, 235);
  }
`;

const SectionLabel = styled.h3<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${({ $dims }) => $dims.textMuted};
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PromptStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromptCard = styled.button<DimProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ $dims }) =>
      $dims.surfaceBg === "#ffffff" ? "#f3f4f6" : $dims.borderLight};
  background: ${({ $dims }) => $dims.surfaceBg};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.4;
  color: ${({ $dims }) => $dims.textPrimary};
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ $dims }) => $dims.accent};
    background: ${({ $dims }) => $dims.accent}08;
  }
`;

const PromptIcon = styled.span<DimProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #5b6987;
`;

/* ────────────────────────────── Footer ────────────────────────────── */

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 16px;
  margin-top: 16px;
`;

const InputBox = styled.div<DimProps>`
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ $dims }) =>
      $dims.surfaceBg === "#ffffff" ? "#f3f4f6" : $dims.borderLight};
  border-radius: 4px;
  padding: 12px;
  height: 90px;
  background: ${({ $dims }) => $dims.surfaceBg};

  &:focus-within {
    border-color: ${({ $dims }) => $dims.accent};
  }
`;

const Textarea = styled.textarea<DimProps>`
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ $dims }) => $dims.textPrimary};
  background: transparent;

  &::placeholder {
    color: ${({ $dims }) => $dims.textMuted};
  }
`;

const InputActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SendButton = styled.button<DimProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: ${({ $dims }) => $dims.accent}14;
  color: ${({ $dims }) => $dims.accent};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $dims }) => $dims.accent}24;
  }
`;

const Disclaimer = styled.p<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.4;
  color: ${({ $dims }) => $dims.textMuted};
  text-align: center;
  margin: 0;
`;

/* ─────────────────────────────────────────────────────────────────── */

interface AssistantPanelProps {
  open: boolean;
  onClose: () => void;
  dims: ShellDims;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({
  open,
  onClose,
  dims,
}) => {
  const [query, setQuery] = useState("");

  // Lock body scroll while the assistant overlay is full-screen on mobile.
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia(MOBILE_MEDIA).matches) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <Gutter $open={open} aria-hidden={!open}>
      <Panel $open={open} $surface={dims.surfaceBg}>
        <MobileHead $border={dims.borderLight}>
          <MobileHeadTitle $dims={dims}>
            <span style={{ color: dims.accent }}>{icons.sparkles}</span>
            AI Assistant
          </MobileHeadTitle>
          <MobileCloseBtn
            $dims={dims}
            type="button"
            aria-label="Close assistant"
            onClick={onClose}
          >
            {icons.close}
          </MobileCloseBtn>
        </MobileHead>
        <Body>
          <WelcomeWave>👋</WelcomeWave>
          <WelcomeHeading $dims={dims}>
            I&rsquo;m your DigitalOcean{" "}
            <AccentSpan $accent={dims.accent}>AI Assistant</AccentSpan>.
          </WelcomeHeading>
          <WelcomeSub $dims={dims}>What can I help you with?</WelcomeSub>
          <GradientLink type="button">Get started →</GradientLink>

          <SectionLabel $dims={dims}>Get started</SectionLabel>
          <PromptStack>
            {assistantPrompts.map((p) => (
              <PromptCard
                key={p.text}
                $dims={dims}
                onClick={() => setQuery(p.text)}
                type="button"
              >
                <PromptIcon $dims={dims}>{icons[p.icon]}</PromptIcon>
                {p.text}
              </PromptCard>
            ))}
          </PromptStack>
        </Body>

        <Footer>
          <InputBox $dims={dims}>
            <Textarea
              $dims={dims}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How can I help you?"
            />
            <InputActions>
              <SendButton $dims={dims} aria-label="Send" type="button">
                {icons.send}
              </SendButton>
            </InputActions>
          </InputBox>
          <Disclaimer $dims={dims}>
            Powered by OpenAI GPT-4o. By using this copilot, you agree to share
            your data with it. Do not share sensitive information.
          </Disclaimer>
        </Footer>
      </Panel>
    </Gutter>
  );
};

export default AssistantPanel;
