"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AssistantPanel from "@/components/AssistantPanel";
import NotificationsPanel from "@/components/NotificationsPanel";
import { ShellVariant, ColorMode, getMergedDims, MOBILE_MEDIA } from "@/lib/theme";
import { icons } from "@/lib/icons";

/* ─── Shell ─── */
const ShellContainer = styled.div<{ $gap: number; $bg: string; $radius: number }>`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${(p) => p.$bg};
  ${(p) => p.$gap > 0 && `padding: ${p.$gap}px; gap: ${p.$gap}px;`}

  @media ${MOBILE_MEDIA} {
    padding: 0;
    gap: 0;
    height: 100dvh;
  }
`;
const MainArea = styled.div<{ $radius: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  ${(p) => p.$radius > 0 && `border-radius: ${p.$radius}px; overflow: hidden;`}

  @media ${MOBILE_MEDIA} {
    border-radius: 0;
  }
`;
const ContentRow = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;
const PageScroll = styled.div<{ $bg: string }>`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: ${(p) => p.$bg};
`;

/* ─── Hero ─── */
// Live source: solid navy `rgb(0, 12, 54)` background, no gradients.
// Hero is ~618px tall on the live site at 1440x900.
const Hero = styled.section`
  position: relative;
  background: rgb(0, 12, 54);
  color: #ffffff;
  padding: 28px 56px 100px;
  min-height: 618px;
  overflow: visible;

  @media ${MOBILE_MEDIA} {
    padding: 20px 20px 80px;
    min-height: 0;
  }
`;

// Wave divider — verbatim path from the live source's hero footer.
// preserveAspectRatio: xMidYMax slice keeps the wave anchored to the bottom
// edge while stretching to full width.
const HeroWave = styled.svg<{ $fill: string }>`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100%;
  height: 40px;
  display: block;
  pointer-events: none;

  path {
    fill: ${(p) => p.$fill};
  }
`;

const HeroTopBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
`;
const NewPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 360px;
  gap: 56px;
  position: relative;
  z-index: 2;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div``;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;
const HeroH1 = styled.h1`
  font-family: var(--font-epilogue), "Epilogue", sans-serif;
  font-weight: 700;
  font-size: 52px;
  line-height: 1.05;
  letter-spacing: -1.2px;
  color: #ffffff;
  margin: 0 0 24px;
  max-width: 580px;
  animation: ${fadeIn} 0.4s ease;

  @media ${MOBILE_MEDIA} {
    font-size: 32px;
    line-height: 1.1;
    letter-spacing: -0.6px;
    margin-bottom: 18px;
  }
`;
const HeroLead = styled.p`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.78);
  max-width: 540px;
  margin: 0 0 28px;
`;
const HeroTaglineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 6px;
`;
const HeroTagline = styled.div`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
`;
const HeroTaglineSub = styled.p`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.45;
  margin: 0 0 16px;
  max-width: 480px;
`;
const SkipLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

/* Right capability column */
const CapStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CapCard = styled.div<{ $accent: string; $bg: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: ${(p) => p.$accent}aa;
    background: rgba(255, 255, 255, 0.08);
  }
`;
const CapIcon = styled.span<{ $bg: string; $accent: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$accent};
  flex-shrink: 0;
`;
const CapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;
const CapTitle = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
`;
const CapDesc = styled.span`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.4;
`;

/* ─── Tabs + chat panel ─── */
const ContentSection = styled.div<{ $bg: string }>`
  background: ${(p) => p.$bg};
  padding: 0 40px 64px;

  @media ${MOBILE_MEDIA} {
    padding: 0 16px 48px;
  }
`;
const TabsRow = styled.div<{ $border: string }>`
  display: flex;
  gap: 8px;
  border-bottom: 1px solid ${(p) => p.$border};
  margin: 0 0 24px;
`;
const Tab = styled.button<{ $active: boolean; $accent: string; $color: string }>`
  position: relative;
  padding: 14px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => (p.$active ? p.$accent : p.$color)};

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: -1px;
    height: 2px;
    background: ${(p) => (p.$active ? p.$accent : "transparent")};
  }
`;

const ChatCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  overflow: hidden;
`;
const ChatHeader = styled.div<{ $border: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px;
  border-bottom: 1px solid ${(p) => p.$border};

  @media ${MOBILE_MEDIA} {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
`;
const ChatTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;
const ChatTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  color: ${(p) => p.$color};
  margin: 0;
`;
const ChatSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin: 0;
  line-height: 1.4;
`;

/* Model selector */
const ModelSelect = styled.div<{ $border: string; $surface: string }>`
  position: relative;
`;
const ModelTrigger = styled.button<{ $border: string; $surface: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$surface};
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  color: ${(p) => p.$color};

  &:hover { border-color: #999; }
`;
const ModelAvatar = styled.span<{ $bg: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: #ffffff;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
`;
const ModelName = styled.span<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.$color};
`;
const ModelId = styled.span<{ $color: string }>`
  font-weight: 400;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const ModelMenu = styled.div<{ $surface: string; $border: string }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 280px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
  z-index: 10;
`;
const ModelItem = styled.button<{ $selected: boolean; $accent: string; $color: string; $hoverBg: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  background: ${(p) => (p.$selected ? `${p.$accent}10` : "none")};
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  &:hover { background: ${(p) => p.$hoverBg}; }
`;

/* Chat body */
const ChatBody = styled.div`
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const BotRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;
const BotAvatar = styled.span<{ $bg: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: #ffffff;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
`;
const Bubble = styled.div<{ $bg: string; $color: string; $border: string }>`
  background: ${(p) => p.$bg};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 12px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: ${(p) => p.$color};
  max-width: 70%;
`;
const BubbleMeta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${(p) => p.$color};
  margin-bottom: 4px;
`;
const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const UserBubble = styled.div<{ $bg: string }>`
  background: ${(p) => p.$bg};
  color: #ffffff;
  border-radius: 12px;
  padding: 10px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  max-width: 60%;
`;
const ChatFooter = styled.div<{ $border: string }>`
  border-top: 1px solid ${(p) => p.$border};
  padding: 14px 24px;
`;
const ChatInputWrap = styled.div<{ $border: string; $surface: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${(p) => p.$border};
  background: ${(p) => p.$surface};
  border-radius: 8px;
  padding: 6px 6px 6px 14px;
`;
const ChatInput = styled.input<{ $color: string }>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  padding: 8px 0;

  &::placeholder { color: #999; }
`;
const SendIcon = styled.button<{ $accent: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: ${(p) => p.$accent};
  color: #ffffff;
  cursor: pointer;
`;

/* Deploy card */
const DeployCard = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 24px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  margin-top: 16px;

  @media ${MOBILE_MEDIA} {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 16px;
  }
`;
const DeployLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const DeployTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => p.$color};
`;
const DeploySub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const DeployRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media ${MOBILE_MEDIA} {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    button {
      width: 100%;
      padding: 14px;
      font-size: 14px;
    }
  }
`;
const DeployCost = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
`;
const DeployBtn = styled.button<{ $accent: string; $hover: string }>`
  padding: 10px 18px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: ${(p) => p.$hover}; }
`;

/* Inference Hub Overview */
const OverviewHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  margin: 40px 0 20px;
`;
const OverviewTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: ${(p) => p.$color};
  margin: 0;
`;
const OverviewLink = styled.a<{ $accent: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$accent};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 920px) { grid-template-columns: repeat(2, 1fr); }
`;
const StatCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StatLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${(p) => p.$color};
`;
const StatBadge = styled.span<{ $bg: string; $accent: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$accent};
`;
const StatValue = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: ${(p) => p.$color};
`;
const StatDelta = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 920px) { grid-template-columns: 1fr; }
`;
const ChartCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ChartTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;
const ChartSvg = styled.svg`
  width: 100%;
  height: 100px;
  display: block;
`;

/* ─── Data ─── */
const HERO_TITLES = [
  "Run AI Models at a Fraction of the Cost",
  "Ship Smarter AI. Spend Less Doing It.",
  "Cut Your Inference Costs — Not Your Model Quality",
  "From Prompt to Production in Minutes",
  "Deploy Any Model. One Endpoint. Done.",
  "Build AI That Scales Without the Bill to Match",
];

const CAP_CARDS = [
  {
    title: "Serverless Inference",
    desc: "Scale to zero, pay per token",
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.2)",
    icon: "bolt",
  },
  {
    title: "Dedicated Inference",
    desc: "Guaranteed throughput for production",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.2)",
    icon: "server",
  },
  {
    title: "Intelligent Routing",
    desc: "Fastest path, lowest cost, auto",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.2)",
    icon: "route",
  },
  {
    title: "Batch Inference",
    desc: "Process millions of requests overnight",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.2)",
    icon: "layers",
  },
];

const MODELS = [
  { name: "Meta", id: "Llama 3.1 Instruct 8B", bg: "#0081FB", letter: "M" },
  { name: "Mistral AI", id: "Mistral 7B Instruct", bg: "#F97316", letter: "M" },
  { name: "DeepSeek", id: "DeepSeek Coder 6.7B", bg: "#6366F1", letter: "D" },
  { name: "Google", id: "Gemma 2 9B", bg: "#34A853", letter: "G" },
  { name: "Qwen", id: "Qwen 2.5 7B Instruct", bg: "#7C3AED", letter: "Q" },
];

/* ─── Helpers ─── */
function chartPath(seed: number): string {
  // Generate a smooth-ish path with deterministic randomness.
  const pts: number[] = [];
  let v = 60;
  for (let i = 0; i < 24; i++) {
    v += (Math.sin(seed + i * 0.7) + Math.cos(seed * 0.3 + i)) * 4;
    pts.push(Math.max(20, Math.min(80, v)));
  }
  let d = `M0 ${100 - pts[0]}`;
  pts.forEach((y, i) => {
    if (i === 0) return;
    const x = (i / (pts.length - 1)) * 300;
    d += ` L${x.toFixed(1)} ${(100 - y).toFixed(1)}`;
  });
  return d;
}

const CapIconRender: Record<string, React.ReactNode> = {
  bolt: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
    </svg>
  ),
  server: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="13" width="18" height="6" rx="1" />
      <line x1="7" y1="6" x2="7.01" y2="6" />
      <line x1="7" y1="16" x2="7.01" y2="16" />
    </svg>
  ),
  route: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h6a4 4 0 004-4V8" />
    </svg>
  ),
  layers: (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

/* ─── Page ─── */
export default function PlaygroundPage() {
  const [variant] = useState<ShellVariant>("standard");
  const [colorMode] = useState<ColorMode>("light");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tab, setTab] = useState<"playground" | "quickstart">("playground");
  const [titleIdx, setTitleIdx] = useState(0);
  const [modelIdx, setModelIdx] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const dashboardRef = useRef<HTMLDivElement>(null);

  const dims = getMergedDims(variant, colorMode);
  const toggleAssistant = () => setAssistantOpen((p) => !p);
  const toggleNotifications = () => setNotificationsOpen((p) => !p);

  // Cycle hero title every 4s.
  useEffect(() => {
    const id = setInterval(() => {
      setTitleIdx((i) => (i + 1) % HERO_TITLES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Click outside model menu to close.
  useEffect(() => {
    if (!modelOpen) return;
    const onDown = () => setModelOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [modelOpen]);

  const model = MODELS[modelIdx];
  const isDark = colorMode === "dark" || variant === "floating";
  const userBubbleBg = dims.accent;

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
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
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
          onOpenMobileNav={() => setMobileNavOpen(true)}
          breadcrumbs={[
            "Acme Corp",
            "Platform Engineering",
            "roadtrip-copilot",
            "Inference Hub",
          ]}
        />
        <ContentRow>
          <PageScroll $bg={dims.contentBg}>
            {/* HERO */}
            <Hero>
              <HeroTopBar>
                <NewPill>🆕 Our AI integration just landed</NewPill>
              </HeroTopBar>

              <HeroGrid>
                <HeroCopy>
                  <HeroH1 key={titleIdx}>{HERO_TITLES[titleIdx]}</HeroH1>
                  <HeroLead>
                    Access leading open-source and commercial models through a
                    single API — with intelligent routing that automatically
                    selects the fastest, cheapest option for every request.
                    Trade switching to inference Cloud typically cut their
                    spend by 40-60% compared to hyperscaler pricing, with zero
                    infrastructure to manage.
                  </HeroLead>

                  <HeroTaglineRow>
                    <HeroTagline>Try before you deploy</HeroTagline>
                  </HeroTaglineRow>
                  <HeroTaglineSub>
                    Test-drive models, compare responses, and estimate costs —
                    then go live in one click.
                  </HeroTaglineSub>

                  <SkipLink
                    type="button"
                    onClick={() =>
                      dashboardRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Skip to dashboard
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 3.5v7M4.5 7.5L7 10.5l2.5-3"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </SkipLink>
                </HeroCopy>

                <CapStack>
                  {CAP_CARDS.map((c) => (
                    <CapCard key={c.title} $accent={c.accent} $bg={c.bg}>
                      <CapIcon $bg={c.bg} $accent={c.accent}>
                        {CapIconRender[c.icon]}
                      </CapIcon>
                      <CapText>
                        <CapTitle>{c.title}</CapTitle>
                        <CapDesc>{c.desc}</CapDesc>
                      </CapText>
                    </CapCard>
                  ))}
                </CapStack>
              </HeroGrid>

              <HeroWave
                viewBox="0 0 1440 40"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
                $fill={dims.contentBg}
              >
                <path d="M0 40V26C12 17 24 12 36 12s24 5 36 14 24 14 36 14 24-5 36-14S168 12 180 12s24 5 36 14 24 14 36 14 24-5 36-14S312 12 324 12s24 5 36 14 24 14 36 14 24-5 36-14S456 12 468 12s24 5 36 14 24 14 36 14 24-5 36-14S600 12 612 12s24 5 36 14 24 14 36 14 24-5 36-14S744 12 756 12s24 5 36 14 24 14 36 14 24-5 36-14S888 12 900 12s24 5 36 14 24 14 36 14 24-5 36-14S1032 12 1044 12s24 5 36 14 24 14 36 14 24-5 36-14S1176 12 1188 12s24 5 36 14 24 14 36 14 24-5 36-14S1320 12 1332 12s24 5 36 14 24 14 36 14 24-5 36-14V40H0z" />
              </HeroWave>
            </Hero>

            {/* TABS + chat */}
            <ContentSection $bg={dims.contentBg} ref={dashboardRef}>
              <TabsRow $border={dims.borderLight}>
                <Tab
                  type="button"
                  $active={tab === "playground"}
                  $accent={dims.accent}
                  $color={dims.textSecondary}
                  onClick={() => setTab("playground")}
                >
                  Model Playground
                </Tab>
                <Tab
                  type="button"
                  $active={tab === "quickstart"}
                  $accent={dims.accent}
                  $color={dims.textSecondary}
                  onClick={() => setTab("quickstart")}
                >
                  AI QuickStart
                </Tab>
              </TabsRow>

              {tab === "playground" ? (
                <>
                  <ChatCard
                    $surface={dims.surfaceBg}
                    $border={dims.borderLight}
                  >
                    <ChatHeader $border={dims.borderLight}>
                      <ChatTitleBlock>
                        <ChatTitle $color={dims.textPrimary}>
                          Compare models side by side
                        </ChatTitle>
                        <ChatSub $color={dims.textSecondary}>
                          Switch between models to see how each one responds.
                          Experiment with prompts to find the best fit for your
                          use case.
                        </ChatSub>
                      </ChatTitleBlock>
                      <ModelSelect
                        $border={dims.borderLight}
                        $surface={dims.surfaceBg}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ModelTrigger
                          type="button"
                          $border={dims.borderLight}
                          $surface={dims.surfaceBg}
                          $color={dims.textPrimary}
                          onClick={() => setModelOpen((o) => !o)}
                        >
                          <ModelAvatar $bg={model.bg}>
                            {model.letter}
                          </ModelAvatar>
                          <ModelName $color={dims.textPrimary}>
                            {model.name}
                            <ModelId $color={dims.textMuted}>
                              {model.id}
                            </ModelId>
                          </ModelName>
                          {icons.chevronDown}
                        </ModelTrigger>
                        {modelOpen && (
                          <ModelMenu
                            $surface={dims.surfaceBg}
                            $border={dims.borderLight}
                          >
                            {MODELS.map((m, i) => (
                              <ModelItem
                                key={m.id}
                                type="button"
                                $selected={i === modelIdx}
                                $accent={dims.accent}
                                $color={dims.textPrimary}
                                $hoverBg={isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5"}
                                onClick={() => {
                                  setModelIdx(i);
                                  setModelOpen(false);
                                }}
                              >
                                <ModelAvatar $bg={m.bg}>{m.letter}</ModelAvatar>
                                <ModelName $color={dims.textPrimary}>
                                  {m.name}
                                  <ModelId $color={dims.textMuted}>
                                    {m.id}
                                  </ModelId>
                                </ModelName>
                              </ModelItem>
                            ))}
                          </ModelMenu>
                        )}
                      </ModelSelect>
                    </ChatHeader>
                    <ChatBody>
                      <BotRow>
                        <BotAvatar $bg={model.bg}>{model.letter}</BotAvatar>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <BubbleMeta $color={dims.textMuted}>
                            DigitalOcean Bot · Thursday 10:32am
                          </BubbleMeta>
                          <Bubble
                            $bg={isDark ? "rgba(255,255,255,0.04)" : "#f6f8fb"}
                            $border={dims.borderLight}
                            $color={dims.textPrimary}
                          >
                            You&rsquo;re chatting with {model.id}. Start with
                            one of our prompts or type in your own.
                          </Bubble>
                        </div>
                      </BotRow>
                      <UserRow>
                        <UserBubble $bg={userBubbleBg}>What is an agent?</UserBubble>
                      </UserRow>
                    </ChatBody>
                    <ChatFooter $border={dims.borderLight}>
                      <ChatInputWrap
                        $border={dims.borderLight}
                        $surface={dims.contentBg}
                      >
                        <ChatInput
                          $color={dims.textPrimary}
                          placeholder={`Chat with ${model.id}`}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                        />
                        <SendIcon
                          type="button"
                          $accent={dims.accent}
                          aria-label="Send"
                        >
                          {icons.send}
                        </SendIcon>
                      </ChatInputWrap>
                    </ChatFooter>
                  </ChatCard>

                  <DeployCard
                    $surface={dims.surfaceBg}
                    $border={dims.borderLight}
                  >
                    <DeployLeft>
                      <DeployTitle $color={dims.textPrimary}>
                        Ready to go live? Deploy with DigitalOcean.
                      </DeployTitle>
                      <DeploySub $color={dims.textSecondary}>
                        Run {model.id} as a production endpoint — auto-scaling,
                        monitoring, and API key included.
                      </DeploySub>
                    </DeployLeft>
                    <DeployRight>
                      <DeployCost $color={dims.textPrimary}>
                        <strong>$0.20 / 1M tokens</strong>{" "}
                        <s style={{ color: dims.textMuted, fontWeight: 400 }}>
                          $0.60 / 1M tokens on AWS
                        </s>
                      </DeployCost>
                      <DeployBtn
                        type="button"
                        $accent={dims.accent}
                        $hover={dims.accentHover}
                      >
                        Deploy this model
                      </DeployBtn>
                    </DeployRight>
                  </DeployCard>
                </>
              ) : (
                <ChatCard
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                  style={{ padding: 32, textAlign: "center" }}
                >
                  <ChatTitle $color={dims.textPrimary}>AI QuickStart</ChatTitle>
                  <ChatSub $color={dims.textSecondary}>
                    Pick a starter template and we&rsquo;ll provision an
                    inference endpoint, knowledge base, and a sample app for
                    you in under 60 seconds.
                  </ChatSub>
                </ChatCard>
              )}

              {/* Inference Hub Overview */}
              <OverviewHeader>
                <OverviewTitle $color={dims.textPrimary}>
                  Inference Hub Overview
                </OverviewTitle>
                <OverviewLink href="#analytics" $accent={dims.accent}>
                  View detailed analytics →
                </OverviewLink>
              </OverviewHeader>

              <StatGrid>
                {[
                  { label: "Total Tokens In", value: "1.24M", delta: "↑ +5%", color: "#0ea5e9" },
                  { label: "Total Tokens Out", value: "892K", delta: "↑ +3%", color: "#f59e0b" },
                  { label: "Total Token Cost", value: "$42.18", delta: "↓ -2%", color: "#22c55e" },
                  { label: "Savings", value: "$67.30", delta: "vs competitors", color: "#a855f7" },
                ].map((s) => (
                  <StatCard
                    key={s.label}
                    $surface={dims.surfaceBg}
                    $border={dims.borderLight}
                  >
                    <StatLabel $color={dims.textSecondary}>
                      <StatBadge $bg={`${s.color}1f`} $accent={s.color}>
                        {icons.chevronRight}
                      </StatBadge>
                      {s.label}
                    </StatLabel>
                    <StatValue $color={dims.textPrimary}>{s.value}</StatValue>
                    <StatDelta $color={dims.textMuted}>{s.delta}</StatDelta>
                  </StatCard>
                ))}
              </StatGrid>

              <ChartGrid>
                {[
                  { title: "Requests / min", color: "#3b82f6", seed: 0.4 },
                  { title: "Latency (p95)", color: "#f59e0b", seed: 1.2 },
                  { title: "Token Throughput", color: "#10b981", seed: 2.1 },
                ].map((c) => (
                  <ChartCard
                    key={c.title}
                    $surface={dims.surfaceBg}
                    $border={dims.borderLight}
                  >
                    <ChartTitle $color={dims.textPrimary}>{c.title}</ChartTitle>
                    <ChartSvg viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient
                          id={`grad-${c.title.replace(/\W+/g, "")}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={c.color}
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor={c.color}
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d={`${chartPath(c.seed)} L300 100 L0 100 Z`}
                        fill={`url(#grad-${c.title.replace(/\W+/g, "")})`}
                      />
                      <path
                        d={chartPath(c.seed)}
                        fill="none"
                        stroke={c.color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </ChartSvg>
                  </ChartCard>
                ))}
              </ChartGrid>
            </ContentSection>
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
