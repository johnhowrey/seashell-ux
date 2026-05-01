"use client";

import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import type { ShellDims } from "../lib/theme";
import { icons } from "../lib/icons";

/* ------------------------------------------------------------------ */
/*  Transient-prop interfaces                                         */
/* ------------------------------------------------------------------ */

interface PanelProps {
  $open: boolean;
  $dims: ShellDims;
}

interface DimProps {
  $dims: ShellDims;
}

/* ------------------------------------------------------------------ */
/*  Styled components                                                 */
/* ------------------------------------------------------------------ */

const Wrapper = styled.div<PanelProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 440px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  background: ${({ $dims }) => $dims.surfaceBg};
  border-left: 1px solid ${({ $dims }) => $dims.borderLight};
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition:
    transform 0.2s cubic-bezier(0.2, 0, 0, 1),
    opacity 0.15s ease;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  background: transparent;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const Header = styled.div`
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  background: linear-gradient(
    17.61deg,
    rgb(0, 12, 121) 5.31%,
    rgb(10, 78, 235) 26.68%,
    rgb(0, 105, 255) 48.05%,
    rgb(198, 174, 255) 96.08%
  );
  color: #ffffff;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const BetaBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  color: #ffffff;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const HeaderButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #ffffff;
  opacity: 0.7;
  cursor: pointer;
  border-radius: 6px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
`;

const Body = styled.div<DimProps>`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const WelcomeHeading = styled.h2<DimProps>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0 0 4px 0;
`;

const WelcomeSub = styled.p<DimProps>`
  font-size: 13px;
  color: ${({ $dims }) => $dims.textSecondary};
  margin: 0;
`;

const GetStartedLink = styled.a<DimProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ $dims }) => $dims.accent};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PromptStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

const PromptCard = styled.button<DimProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid ${({ $dims }) => $dims.borderLight};
  border-radius: 8px;
  background: transparent;
  font-size: 13px;
  color: ${({ $dims }) => $dims.textPrimary};
  cursor: pointer;
  text-align: left;
  line-height: 1.4;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover {
    border-color: ${({ $dims }) => $dims.accent};
    background: ${({ $dims }) => $dims.accent}0a;
  }
`;

const SparkleIcon = styled.span<DimProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ $dims }) => $dims.accent};
`;

const Footer = styled.div<DimProps>`
  border-top: 1px solid ${({ $dims }) => $dims.borderLight};
  padding: 12px 16px;
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const Textarea = styled.textarea<DimProps>`
  width: 100%;
  height: 60px;
  resize: none;
  border: 1px solid ${({ $dims }) => $dims.borderLight};
  border-radius: 8px;
  padding: 10px 40px 10px 12px;
  font-size: 13px;
  line-height: 1.5;
  font-family: inherit;
  color: ${({ $dims }) => $dims.textPrimary};
  background: ${({ $dims }) => $dims.surfaceBg};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ $dims }) => $dims.textMuted};
  }

  &:focus {
    border-color: ${({ $dims }) => $dims.accent};
  }
`;

const SendButton = styled.button<DimProps>`
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ $dims }) => $dims.accent};
  cursor: pointer;
  border-radius: 6px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Disclaimer = styled.p<DimProps>`
  font-size: 10px;
  color: ${({ $dims }) => $dims.textMuted};
  text-align: center;
  margin: 8px 0 0 0;
  line-height: 1.4;
`;

/* ------------------------------------------------------------------ */
/*  Suggested prompts                                                 */
/* ------------------------------------------------------------------ */

const SUGGESTED_PROMPTS = [
  "Why is my bill higher this month?",
  "Create and configure my first Droplet",
  "Get help from our Support team",
  "How do I build a WordPress website?",
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMinimize = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Wrapper $open={open} $dims={dims} ref={wrapperRef}>
      <ResizeHandle />

      {/* Header */}
      <Header>
        <HeaderLeft>
          <HeaderTitle>AI Assistant</HeaderTitle>
          <BetaBadge>Beta</BetaBadge>
        </HeaderLeft>
        <HeaderRight>
          <HeaderButton onClick={handleMinimize} aria-label="Minimize">
            {icons.minimize}
          </HeaderButton>
          <HeaderButton onClick={onClose} aria-label="Close">
            {icons.close}
          </HeaderButton>
        </HeaderRight>
      </Header>

      {/* Body */}
      <Body $dims={dims}>
        <WelcomeHeading $dims={dims}>
          👋 I&rsquo;m your DigitalOcean AI Assistant.
        </WelcomeHeading>
        <WelcomeSub $dims={dims}>What can I help you with?</WelcomeSub>
        <GetStartedLink $dims={dims} role="button" tabIndex={0}>
          Get started →
        </GetStartedLink>

        <PromptStack>
          {SUGGESTED_PROMPTS.map((prompt) => (
            <PromptCard
              key={prompt}
              $dims={dims}
              onClick={() => setQuery(prompt)}
            >
              <SparkleIcon $dims={dims}>{icons.sparkle}</SparkleIcon>
              {prompt}
            </PromptCard>
          ))}
        </PromptStack>
      </Body>

      {/* Footer */}
      <Footer $dims={dims}>
        <TextareaWrapper>
          <Textarea
            $dims={dims}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything..."
          />
          <SendButton $dims={dims} aria-label="Send">
            {icons.send}
          </SendButton>
        </TextareaWrapper>
        <Disclaimer $dims={dims}>
          Powered by OpenAI GPT-4o. By using this copilot, you agree to share
          your data with it. Do not share sensitive information.
        </Disclaimer>
      </Footer>
    </Wrapper>
  );
};

export default AssistantPanel;
