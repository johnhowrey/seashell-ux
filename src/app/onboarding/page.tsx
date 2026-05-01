"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";

const Page = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 32px 80px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
`;

const Eyebrow = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(p) => p.$color};
`;

const H1 = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: ${(p) => p.$color};
  margin: 0;
`;

const Sub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin: 0;
  max-width: 600px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 32px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

/* ─── Stepper ─── */
const Stepper = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: sticky;
  top: 24px;
  align-self: start;
`;

const StepItem = styled.li<{ $state: "done" | "current" | "future"; $accent: string; $color: string; $border: string }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 8px 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 11px;
    top: 32px;
    bottom: -8px;
    width: 2px;
    background: ${(p) => (p.$state === "done" ? p.$accent : p.$border)};
  }

  &:last-child::before { display: none; }
`;

const StepDot = styled.span<{ $state: "done" | "current" | "future"; $accent: string; $border: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(p) =>
    p.$state === "future" ? p.$border : p.$accent};
  background: ${(p) =>
    p.$state === "done" ? p.$accent : p.$state === "current" ? "transparent" : "transparent"};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  position: relative;
  z-index: 1;

  &::after {
    content: ${(p) =>
      p.$state === "current" ? `""` : "none"};
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(p) => p.$accent};
  }
`;

const StepLabel = styled.span<{ $state: "done" | "current" | "future"; $color: string; $muted: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: ${(p) => (p.$state === "current" ? 600 : 500)};
  color: ${(p) => (p.$state === "future" ? p.$muted : p.$color)};
  padding-top: 3px;
`;

/* ─── Step content card ─── */
const StepCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 14px;
  padding: 32px 36px;
`;

const StepTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0 0 8px;
`;

const StepSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin: 0 0 24px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

const Input = styled.input<{ $border: string; $bg: string; $color: string }>`
  padding: 9px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;

  &:focus { border-color: #0061eb; }
`;

const Select = styled.select<{ $border: string; $bg: string; $color: string }>`
  padding: 9px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  outline: none;

  &:focus { border-color: #0061eb; }
`;

const Hint = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

/* ─── Step actions ─── */
const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
`;

const PrimaryBtn = styled.button<{ $accent: string }>`
  padding: 10px 22px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: ${(p) => p.$accent};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover { filter: brightness(0.94); }
`;

const GhostBtn = styled.button<{ $color: string; $border: string }>`
  padding: 10px 18px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
`;

const SkipLink = styled.button<{ $color: string }>`
  background: none;
  border: none;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => p.$color};
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

/* ─── Copilot banner (matches /database/create) ─── */
const CopilotBanner = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: linear-gradient(
    103deg,
    #efe7ff 0%,
    #e3edff 50%,
    #fbe6f2 100%
  );
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 24px;
`;

const CopilotPill = styled.span`
  display: inline-flex;
  align-items: center;
  background: #fde047;
  color: #713f12;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  flex-shrink: 0;
  letter-spacing: 0.4px;
`;

const CopilotBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CopilotHead = styled.div`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #4338ca;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const CopilotText = styled.div`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: #1f1f29;
  line-height: 1.5;
`;

const CopilotLink = styled.button`
  background: none;
  border: none;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #4338ca;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 0;
  align-self: center;
  flex-shrink: 0;
  &:hover { text-decoration: underline; }
`;

/* ─── Preview cards (welcome step) ─── */
const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 24px;
`;

const PreviewCard = styled.div<{ $surface: string; $border: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 8px;
`;

const PreviewLabel = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const PreviewSub = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

/* ─── Starter cards ─── */
const StarterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StarterCard = styled.button<{ $selected: boolean; $accent: string; $surface: string; $border: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  background: ${(p) =>
    p.$selected ? `${p.$accent}10` : p.$surface};
  border: ${(p) =>
    p.$selected
      ? `2px solid ${p.$accent}`
      : `2px solid ${p.$border}`};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: border-color 0.1s ease, background 0.1s ease;

  &:hover { border-color: ${(p) => p.$accent}; }
`;

const StarterIcon = styled.span<{ $bg: string; $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const StarterTitle = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => p.$color};
`;

const StarterDesc = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  line-height: 1.45;
`;

/* ─── Invite list ─── */
const InviteRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px 36px;
  gap: 8px;
`;

const InviteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const SmallGhost = styled.button<{ $color: string; $border: string }>`
  padding: 8px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px dashed ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

const RemoveBtn = styled.button<{ $color: string }>`
  background: transparent;
  border: none;
  color: ${(p) => p.$color};
  cursor: pointer;
  font-size: 18px;
  &:hover { color: #ef4444; }
`;

/* ─── Plan cards ─── */
const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.button<{ $selected: boolean; $accent: string; $surface: string; $border: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  padding: 18px 20px;
  background: ${(p) =>
    p.$selected ? `${p.$accent}10` : p.$surface};
  border: ${(p) =>
    p.$selected
      ? `2px solid ${p.$accent}`
      : `2px solid ${p.$border}`};
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  position: relative;
`;

const PlanRecommended = styled.span<{ $accent: string }>`
  position: absolute;
  top: -10px;
  right: 16px;
  background: ${(p) => p.$accent};
  color: #ffffff;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const PlanName = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const PlanPrice = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 8px 0 12px;
`;

const PlanFeats = styled.ul<{ $color: string }>`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  display: flex;
  flex-direction: column;
  gap: 5px;

  li::before { content: "✓ "; color: #10b981; font-weight: 700; }
`;

/* ─── Success ─── */
const SuccessBig = styled.div`
  font-size: 56px;
  margin-bottom: 16px;
`;

const STEPS = [
  "Welcome",
  "Pick a starter",
  "Workspace details",
  "Invite team",
  "Billing",
  "All set",
];

const STARTERS = [
  { id: "web", icon: "▢", iconBg: "#dbeafe", iconColor: "#1e40af", title: "Web app", desc: "Deploy a Node, Python, Go, or Rails service with auto-scaling." },
  { id: "ai", icon: "✦", iconBg: "#ede9fe", iconColor: "#6d28d9", title: "AI app", desc: "Pre-wired to inference endpoints, vector store, and a sample chat UI." },
  { id: "data", icon: "▤", iconBg: "#fef3c7", iconColor: "#a16207", title: "Data pipeline", desc: "Managed Postgres + worker Droplets + scheduled jobs." },
  { id: "blank", icon: "○", iconBg: "#f1f5f9", iconColor: "#64748b", title: "Blank workspace", desc: "Start empty. Add resources as you go." },
];

const PLANS = [
  { id: "hobby", name: "Hobby", price: "$0", recommended: false, feats: ["1 project", "1 GB bandwidth", "Community support"] },
  { id: "team", name: "Team", price: "$24/mo", recommended: true, feats: ["Unlimited projects", "100 GB bandwidth", "Email + chat support", "Auto-scaling"] },
  { id: "scale", name: "Scale", price: "$96/mo", recommended: false, feats: ["Everything in Team", "1 TB bandwidth", "24/7 phone support", "SOC 2 + HIPAA"] },
];

interface Invite {
  email: string;
  role: string;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [starter, setStarter] = useState<string>("ai");
  const [workspaceName, setWorkspaceName] = useState("Acme Corp");
  const [region, setRegion] = useState("NYC1");
  const [plan, setPlan] = useState<string>("team");
  const [invites, setInvites] = useState<Invite[]>([
    { email: "alex@acme.io", role: "Developer" },
    { email: "", role: "Developer" },
  ]);
  const [card, setCard] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const goto = (i: number) => setStep(i);

  return (
    <PageFrame breadcrumbs={["Acme Corp", "Get started"]}>
      {({ dims, isDark }) => {
        const inputBg = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
        return (
          <Page>
            <Header>
              <Eyebrow $color={dims.accent}>SETUP</Eyebrow>
              <H1 $color={dims.textPrimary}>Get started in 6 steps</H1>
              <Sub $color={dims.textSecondary}>
                We&rsquo;ll have you deploying your first thing in under 5
                minutes. You can always change these later.
              </Sub>
            </Header>

            <Layout>
              <Stepper>
                {STEPS.map((label, i) => {
                  const state =
                    i < step ? "done" : i === step ? "current" : "future";
                  return (
                    <StepItem
                      key={label}
                      $state={state}
                      $accent={dims.accent}
                      $color={dims.textPrimary}
                      $border={dims.borderLight}
                      onClick={() => i <= step && goto(i)}
                      style={{
                        cursor: i <= step ? "pointer" : "default",
                      }}
                    >
                      <StepDot
                        $state={state}
                        $accent={dims.accent}
                        $border={dims.borderLight}
                      >
                        {state === "done" ? "✓" : i + 1}
                      </StepDot>
                      <StepLabel
                        $state={state}
                        $color={dims.textPrimary}
                        $muted={dims.textMuted}
                      >
                        {label}
                      </StepLabel>
                    </StepItem>
                  );
                })}
              </Stepper>

              <StepCard $surface={dims.surfaceBg} $border={dims.borderLight}>
                {step === 0 && (
                  <>
                    <StepTitle $color={dims.textPrimary}>
                      Welcome, John 👋
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      Let&rsquo;s set up your workspace. We&rsquo;ll pick a
                      starter, name your workspace, invite your team, and get
                      a credit card ready. Then you&rsquo;ll deploy your first
                      thing.
                    </StepSub>
                    <CopilotBanner>
                      <CopilotPill>NEW!</CopilotPill>
                      <CopilotBody>
                        <CopilotHead>LET COPILOT DO THE SETUP</CopilotHead>
                        <CopilotText>
                          Tell Copilot what you&rsquo;re building and
                          we&rsquo;ll pick the right starter, region, plan,
                          and team roles for you. You can edit anything
                          before deploy.
                        </CopilotText>
                      </CopilotBody>
                      <CopilotLink>Try Copilot setup →</CopilotLink>
                    </CopilotBanner>
                    <PreviewGrid>
                      {[
                        { icon: "📦", label: "AI app starter", sub: "1 Droplet + 1 inference endpoint" },
                        { icon: "🌎", label: "NYC1 region", sub: "Lowest latency to your team" },
                        { icon: "👥", label: "Team plan", sub: "Unlimited projects, 100 GB egress" },
                        { icon: "✉️", label: "1 invite ready", sub: "alex@acme.io as Developer" },
                      ].map((it) => (
                        <PreviewCard
                          key={it.label}
                          $surface={isDark ? "rgba(255,255,255,0.02)" : "#fbfbfd"}
                          $border={dims.borderLight}
                        >
                          <span style={{ fontSize: 18 }}>{it.icon}</span>
                          <PreviewLabel $color={dims.textPrimary}>
                            {it.label}
                          </PreviewLabel>
                          <PreviewSub $color={dims.textSecondary}>
                            {it.sub}
                          </PreviewSub>
                        </PreviewCard>
                      ))}
                    </PreviewGrid>
                    <Actions>
                      <SkipLink
                        $color={dims.textMuted}
                        type="button"
                        onClick={() => (window.location.href = "/home")}
                      >
                        Skip — I&rsquo;ll set up later
                      </SkipLink>
                      <PrimaryBtn $accent={dims.accent} onClick={next}>
                        Get started →
                      </PrimaryBtn>
                    </Actions>
                  </>
                )}

                {step === 1 && (
                  <>
                    <StepTitle $color={dims.textPrimary}>
                      Pick a starter
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      We&rsquo;ll pre-configure resources, environment
                      variables, and a sample app. You can switch starters
                      later.
                    </StepSub>
                    <StarterGrid>
                      {STARTERS.map((s) => (
                        <StarterCard
                          key={s.id}
                          $selected={starter === s.id}
                          $accent={dims.accent}
                          $surface={dims.surfaceBg}
                          $border={dims.borderLight}
                          onClick={() => setStarter(s.id)}
                          type="button"
                        >
                          <StarterIcon $bg={s.iconBg} $color={s.iconColor}>
                            {s.icon}
                          </StarterIcon>
                          <StarterTitle $color={dims.textPrimary}>
                            {s.title}
                          </StarterTitle>
                          <StarterDesc $color={dims.textSecondary}>
                            {s.desc}
                          </StarterDesc>
                        </StarterCard>
                      ))}
                    </StarterGrid>
                    <Actions>
                      <GhostBtn
                        $color={dims.textPrimary}
                        $border={dims.borderLight}
                        onClick={prev}
                      >
                        ← Back
                      </GhostBtn>
                      <PrimaryBtn $accent={dims.accent} onClick={next}>
                        Continue →
                      </PrimaryBtn>
                    </Actions>
                  </>
                )}

                {step === 2 && (
                  <>
                    <StepTitle $color={dims.textPrimary}>
                      Name your workspace
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      Pick a name and where you&rsquo;d like resources hosted
                      by default. Choose a plan you can grow into.
                    </StepSub>
                    <FormGroup>
                      <Field>
                        <Label $color={dims.textSecondary}>
                          Workspace name
                        </Label>
                        <Input
                          $border={dims.borderLight}
                          $bg={inputBg}
                          $color={dims.textPrimary}
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                        <Hint $color={dims.textMuted}>
                          This appears in URLs, emails, and the breadcrumb.
                        </Hint>
                      </Field>
                      <Field>
                        <Label $color={dims.textSecondary}>
                          Default region
                        </Label>
                        <Select
                          $border={dims.borderLight}
                          $bg={inputBg}
                          $color={dims.textPrimary}
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                        >
                          <option>NYC1 · New York</option>
                          <option>NYC3 · New York</option>
                          <option>SFO3 · San Francisco</option>
                          <option>AMS3 · Amsterdam</option>
                          <option>FRA1 · Frankfurt</option>
                          <option>SGP1 · Singapore</option>
                        </Select>
                        <Hint $color={dims.textMuted}>
                          Resources can still be deployed in other regions.
                        </Hint>
                      </Field>
                    </FormGroup>
                    <PlanGrid>
                      {PLANS.map((p) => (
                        <PlanCard
                          key={p.id}
                          $selected={plan === p.id}
                          $accent={dims.accent}
                          $surface={dims.surfaceBg}
                          $border={dims.borderLight}
                          onClick={() => setPlan(p.id)}
                          type="button"
                        >
                          {p.recommended && (
                            <PlanRecommended $accent={dims.accent}>
                              Recommended
                            </PlanRecommended>
                          )}
                          <PlanName $color={dims.textPrimary}>{p.name}</PlanName>
                          <PlanPrice $color={dims.textPrimary}>
                            {p.price}
                          </PlanPrice>
                          <PlanFeats $color={dims.textSecondary}>
                            {p.feats.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </PlanFeats>
                        </PlanCard>
                      ))}
                    </PlanGrid>
                    <Actions>
                      <GhostBtn
                        $color={dims.textPrimary}
                        $border={dims.borderLight}
                        onClick={prev}
                      >
                        ← Back
                      </GhostBtn>
                      <PrimaryBtn $accent={dims.accent} onClick={next}>
                        Continue →
                      </PrimaryBtn>
                    </Actions>
                  </>
                )}

                {step === 3 && (
                  <>
                    <StepTitle $color={dims.textPrimary}>
                      Invite your team
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      Add teammates by email. They&rsquo;ll get an invite to
                      join {workspaceName}. You can do this later from
                      Settings.
                    </StepSub>
                    <InviteList>
                      {invites.map((inv, i) => (
                        <InviteRow key={i}>
                          <Input
                            $border={dims.borderLight}
                            $bg={inputBg}
                            $color={dims.textPrimary}
                            placeholder="teammate@company.com"
                            value={inv.email}
                            onChange={(e) =>
                              setInvites((s) =>
                                s.map((it, j) =>
                                  j === i ? { ...it, email: e.target.value } : it
                                )
                              )
                            }
                          />
                          <Select
                            $border={dims.borderLight}
                            $bg={inputBg}
                            $color={dims.textPrimary}
                            value={inv.role}
                            onChange={(e) =>
                              setInvites((s) =>
                                s.map((it, j) =>
                                  j === i ? { ...it, role: e.target.value } : it
                                )
                              )
                            }
                          >
                            <option>Owner</option>
                            <option>Admin</option>
                            <option>Developer</option>
                            <option>Reviewer</option>
                          </Select>
                          <RemoveBtn
                            $color={dims.textMuted}
                            type="button"
                            aria-label="Remove invite"
                            onClick={() =>
                              setInvites((s) => s.filter((_, j) => j !== i))
                            }
                          >
                            ×
                          </RemoveBtn>
                        </InviteRow>
                      ))}
                    </InviteList>
                    <SmallGhost
                      $color={dims.textPrimary}
                      $border={dims.borderLight}
                      type="button"
                      onClick={() =>
                        setInvites((s) => [...s, { email: "", role: "Developer" }])
                      }
                    >
                      + Add another teammate
                    </SmallGhost>
                    <Actions>
                      <GhostBtn
                        $color={dims.textPrimary}
                        $border={dims.borderLight}
                        onClick={prev}
                      >
                        ← Back
                      </GhostBtn>
                      <div
                        style={{ display: "flex", gap: 12, alignItems: "center" }}
                      >
                        <SkipLink
                          $color={dims.textMuted}
                          type="button"
                          onClick={next}
                        >
                          Skip for now
                        </SkipLink>
                        <PrimaryBtn $accent={dims.accent} onClick={next}>
                          Send invites →
                        </PrimaryBtn>
                      </div>
                    </Actions>
                  </>
                )}

                {step === 4 && (
                  <>
                    <StepTitle $color={dims.textPrimary}>
                      Add a payment method
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      You won&rsquo;t be charged until your first invoice on
                      the {PLANS.find((p) => p.id === plan)?.name} plan. We
                      use Stripe for everything billing-related.
                    </StepSub>
                    <FormGroup>
                      <Field>
                        <Label $color={dims.textSecondary}>
                          Card number
                        </Label>
                        <Input
                          $border={dims.borderLight}
                          $bg={inputBg}
                          $color={dims.textPrimary}
                          placeholder="4242 4242 4242 4242"
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                        />
                      </Field>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: 12,
                        }}
                      >
                        <Field>
                          <Label $color={dims.textSecondary}>Expiry</Label>
                          <Input
                            $border={dims.borderLight}
                            $bg={inputBg}
                            $color={dims.textPrimary}
                            placeholder="MM / YY"
                          />
                        </Field>
                        <Field>
                          <Label $color={dims.textSecondary}>CVC</Label>
                          <Input
                            $border={dims.borderLight}
                            $bg={inputBg}
                            $color={dims.textPrimary}
                            placeholder="123"
                          />
                        </Field>
                        <Field>
                          <Label $color={dims.textSecondary}>ZIP</Label>
                          <Input
                            $border={dims.borderLight}
                            $bg={inputBg}
                            $color={dims.textPrimary}
                            placeholder="10003"
                          />
                        </Field>
                      </div>
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 8,
                          background: isDark
                            ? "rgba(255,255,255,0.03)"
                            : "#f8fafc",
                          border: `1px solid ${dims.borderLight}`,
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                          fontSize: 12,
                          color: dims.textSecondary,
                          lineHeight: 1.5,
                        }}
                      >
                        🔒 Encrypted end-to-end. We never see your full card
                        number.
                      </div>
                    </FormGroup>
                    <Actions>
                      <GhostBtn
                        $color={dims.textPrimary}
                        $border={dims.borderLight}
                        onClick={prev}
                      >
                        ← Back
                      </GhostBtn>
                      <div
                        style={{ display: "flex", gap: 12, alignItems: "center" }}
                      >
                        <SkipLink
                          $color={dims.textMuted}
                          type="button"
                          onClick={next}
                        >
                          Add later
                        </SkipLink>
                        <PrimaryBtn $accent={dims.accent} onClick={next}>
                          Save card →
                        </PrimaryBtn>
                      </div>
                    </Actions>
                  </>
                )}

                {step === 5 && (
                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                    <SuccessBig>🎉</SuccessBig>
                    <StepTitle $color={dims.textPrimary}>
                      You&rsquo;re all set!
                    </StepTitle>
                    <StepSub $color={dims.textSecondary}>
                      Your {STARTERS.find((s) => s.id === starter)?.title}{" "}
                      starter is provisioning in {region}. We&rsquo;ll email
                      you when it&rsquo;s ready (~ 2 minutes).
                    </StepSub>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        justifyContent: "center",
                        marginTop: 16,
                      }}
                    >
                      <Link
                        href="/home"
                        style={{ textDecoration: "none" }}
                      >
                        <GhostBtn
                          $color={dims.textPrimary}
                          $border={dims.borderLight}
                          type="button"
                        >
                          Go to dashboard
                        </GhostBtn>
                      </Link>
                      <Link
                        href="/droplets"
                        style={{ textDecoration: "none" }}
                      >
                        <PrimaryBtn $accent={dims.accent} type="button">
                          See my Droplets →
                        </PrimaryBtn>
                      </Link>
                    </div>
                  </div>
                )}
              </StepCard>
            </Layout>
          </Page>
        );
      }}
    </PageFrame>
  );
}
