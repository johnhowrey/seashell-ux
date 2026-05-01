"use client";

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import PageFrame from "@/components/PageFrame";
import {
  notifications,
  notificationCategoryColors,
  NotifType,
} from "@/lib/theme";

const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px 80px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PageH1 = styled.h1<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${(p) => p.$color};
  margin: 0;
`;

const SubMeta = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const GhostBtn = styled.button<{ $color: string; $border: string }>`
  padding: 8px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  background: transparent;
  border: 1px solid ${(p) => p.$border};
  border-radius: 6px;
  cursor: pointer;
`;

/* ─── Insights banner ─── */
const InsightsBanner = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: linear-gradient(
    103deg,
    ${(p) => p.$accent}10 0%,
    ${(p) => p.$accent}05 50%,
    rgba(16, 185, 129, 0.08) 100%
  );
  border: 1px solid ${(p) => p.$accent}33;
  border-radius: 12px;
  margin-bottom: 18px;
`;

const InsightIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

const InsightHeading = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const InsightSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  line-height: 1.45;
`;

const InsightSparkline = styled.svg`
  width: 80px;
  height: 28px;
  margin-left: auto;
  flex-shrink: 0;
`;

/* ─── Tabs ─── */
const TabRow = styled.div<{ $border: string }>`
  display: flex;
  gap: 2px;
  border-bottom: 1px solid ${(p) => p.$border};
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active: boolean; $color: string; $accent: string }>`
  padding: 10px 14px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? p.$accent : "transparent")};
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  cursor: pointer;
  margin-bottom: -1px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const TabBadge = styled.span<{ $bg: string; $color: string }>`
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 999px;
  font-weight: 600;
`;

/* ─── Layout ─── */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterBlock = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 10px;
  padding: 14px 16px;
`;

const FilterTitle = styled.h3<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  margin: 0 0 10px;
`;

const FilterButton = styled.button<{ $active: boolean; $accent: string; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 8px;
  background: ${(p) => (p.$active ? `${p.$accent}14` : "transparent")};
  border: none;
  border-radius: 5px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => (p.$active ? p.$accent : p.$color)};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

const FilterDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  display: inline-block;
  margin-right: 8px;
`;

const FilterCount = styled.span<{ $color: string }>`
  font-size: 11px;
  font-weight: 500;
  color: ${(p) => p.$color};
`;

/* ─── Notification list ─── */
const ListCard = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  overflow: hidden;
`;

const Group = styled.div<{ $border: string }>`
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const GroupHead = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.02);
`;

const NotifRow = styled.div<{ $border: string; $unread: boolean; $hover: string }>`
  display: flex;
  gap: 14px;
  padding: 14px 20px;
  border-top: 1px solid ${(p) => p.$border};
  cursor: pointer;
  background: ${(p) => (p.$unread ? "rgba(0, 97, 235, 0.03)" : "transparent")};
  transition: background 0.1s ease;

  &:first-child { border-top: none; }
  &:hover { background: ${(p) => p.$hover}; }
`;

const NotifLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  width: 14px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  margin-top: 6px;
`;

const NotifBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotifMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`;

const NotifCategory = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
`;

const NotifTime = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  color: ${(p) => p.$color};
`;

const NotifTitle = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  margin-bottom: 2px;
`;

const NotifSub = styled.div<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 13px;
  color: ${(p) => p.$color};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const NotifActions = styled.div`
  display: flex;
  gap: 6px;
`;

const SmallBtn = styled.button<{ $primary?: boolean; $color: string; $border: string }>`
  padding: 5px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  background: ${(p) => (p.$primary ? "#1a1a1a" : "transparent")};
  color: ${(p) => (p.$primary ? "#ffffff" : p.$color)};
  border: 1px solid ${(p) => (p.$primary ? "transparent" : p.$border)};

  &:hover { filter: brightness(0.96); }
`;

/* ─── Preferences ─── */
const PrefSection = styled.div<{ $surface: string; $border: string }>`
  background: ${(p) => p.$surface};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
`;

const PrefTitle = styled.h2<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 4px;
  color: ${(p) => p.$color};
`;

const PrefSub = styled.p<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
  margin: 0 0 16px;
`;

const ChannelRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 32px 1fr 60px;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  &:last-child { border-bottom: none; }
`;

const ChannelIcon = styled.span<{ $bg: string; $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ChannelName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
`;

const ChannelDesc = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 12px;
  color: ${(p) => p.$color};
`;

const Toggle = styled.button<{ $on: boolean; $accent: string; $offBg: string }>`
  position: relative;
  width: 38px;
  height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$on ? p.$accent : p.$offBg)};
  transition: background 0.18s ease;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? "18px" : "2px")};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transition: left 0.18s cubic-bezier(0.2, 0, 0, 1);
  }
`;

/* ─── Rules table ─── */
const RuleHead = styled.div<{ $border: string; $color: string }>`
  display: grid;
  grid-template-columns: 1fr 80px 80px 80px 80px;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  font-family: var(--font-inter), "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${(p) => p.$color};
  text-align: center;

  & > :first-child { text-align: left; }
`;

const RuleRow = styled.div<{ $border: string }>`
  display: grid;
  grid-template-columns: 1fr 80px 80px 80px 80px;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${(p) => p.$border};
  text-align: center;

  & > :first-child { text-align: left; }
  &:last-child { border-bottom: none; }
`;

const RuleName = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Check = styled.button<{ $on: boolean; $accent: string; $border: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid ${(p) => (p.$on ? p.$accent : p.$border)};
  background: ${(p) => (p.$on ? p.$accent : "transparent")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 10px;
  margin: 0 auto;
`;

/* ─── Data helpers ─── */
const categoryFilters: { id: NotifType | "all"; label: string }[] = [
  { id: "all", label: "All notifications" },
  { id: "agentic", label: "AI Agent" },
  { id: "billing", label: "Billing" },
  { id: "infra", label: "Infrastructure" },
  { id: "security", label: "Security" },
  { id: "team", label: "Team" },
];

const channels = [
  { id: "email", icon: "✉", iconBg: "#dbeafe", iconColor: "#1e40af", name: "Email", desc: "john@acme.io · verified" },
  { id: "slack", icon: "#", iconBg: "#ede9fe", iconColor: "#6d28d9", name: "Slack", desc: "Acme workspace · #ops, #alerts" },
  { id: "sms", icon: "✆", iconBg: "#fef3c7", iconColor: "#a16207", name: "SMS", desc: "+1 (415) ••• 4242" },
  { id: "push", icon: "◉", iconBg: "#dcfce7", iconColor: "#15803d", name: "Push", desc: "iOS app · 1 device" },
  { id: "webhook", icon: "⌘", iconBg: "#fee2e2", iconColor: "#b91c1c", name: "Webhook", desc: "Not configured" },
];

const ruleCategories = [
  { id: "agentic", label: "AI Agent", color: "#8b5cf6" },
  { id: "billing", label: "Billing", color: "#10b981" },
  { id: "infra", label: "Infrastructure", color: "#f59e0b" },
  { id: "security", label: "Security", color: "#ef4444" },
  { id: "team", label: "Team", color: "#0ea5e9" },
];

export default function NotificationsCenterPage() {
  const [tab, setTab] = useState<"inbox" | "all" | "preferences">("inbox");
  const [filter, setFilter] = useState<NotifType | "all">("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Flatten the grouped notifications, preserving group label.
  const allNotifs = useMemo(
    () =>
      notifications.flatMap((g) =>
        g.items.map((n) => ({ ...n, group: g.group }))
      ),
    []
  );

  const filtered = useMemo(() => {
    return allNotifs.filter((n) => {
      if (tab === "inbox" && readIds.has(n.id)) return false;
      if (filter !== "all" && n.type !== filter) return false;
      return true;
    });
  }, [allNotifs, filter, tab, readIds]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const n of filtered) {
      if (!groups[n.group]) groups[n.group] = [];
      groups[n.group].push(n);
    }
    return groups;
  }, [filtered]);

  const counts = useMemo(() => {
    const out: Record<string, number> = {
      all: 0,
      agentic: 0,
      billing: 0,
      infra: 0,
      security: 0,
      team: 0,
    };
    for (const n of allNotifs) {
      out.all += 1;
      out[n.type] = (out[n.type] || 0) + 1;
    }
    return out;
  }, [allNotifs]);

  const unreadCount = allNotifs.filter((n) => !readIds.has(n.id)).length;

  const [activeChannels, setActiveChannels] = useState<Set<string>>(
    new Set(["email", "slack", "push"])
  );
  const toggleChannel = (id: string) =>
    setActiveChannels((s) => {
      const ns = new Set(s);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });

  const [rules, setRules] = useState<Record<string, Set<string>>>(() => ({
    agentic: new Set(["email", "slack"]),
    billing: new Set(["email"]),
    infra: new Set(["email", "slack", "push"]),
    security: new Set(["email", "slack", "sms", "push"]),
    team: new Set(["email"]),
  }));
  const toggleRule = (cat: string, ch: string) =>
    setRules((r) => {
      const ns = new Set(r[cat]);
      if (ns.has(ch)) ns.delete(ch);
      else ns.add(ch);
      return { ...r, [cat]: ns };
    });

  return (
    <PageFrame breadcrumbs={["Acme Corp", "Notifications"]}>
      {({ dims, isDark }) => (
        <Page>
          <TopRow>
            <TitleGroup>
              <PageH1 $color={dims.textPrimary}>Notifications</PageH1>
              <SubMeta $color={dims.textSecondary}>
                {unreadCount} unread · {allNotifs.length} total · Last 7 days
              </SubMeta>
            </TitleGroup>
            <Actions>
              <GhostBtn
                $color={dims.textPrimary}
                $border={dims.borderLight}
                onClick={() =>
                  setReadIds(new Set(allNotifs.map((n) => n.id)))
                }
              >
                Mark all read
              </GhostBtn>
              <GhostBtn
                $color={dims.textPrimary}
                $border={dims.borderLight}
                onClick={() => setTab("preferences")}
              >
                Preferences
              </GhostBtn>
            </Actions>
          </TopRow>

          <InsightsBanner $accent={dims.accent}>
            <InsightIcon>📈</InsightIcon>
            <div>
              <InsightHeading $color={dims.textPrimary}>
                Quieter than usual this week.
              </InsightHeading>
              <InsightSub $color={dims.textSecondary}>
                <strong style={{ color: "#15803d" }}>14% fewer alerts</strong>{" "}
                than last week, and your AI Agent resolved{" "}
                <strong>7 of 11</strong> automatically.
              </InsightSub>
            </div>
            <InsightSparkline viewBox="0 0 80 28">
              <path
                d="M0,12 L8,14 L16,11 L24,16 L32,13 L40,18 L48,15 L56,20 L64,17 L72,22 L80,21"
                stroke={dims.accent}
                strokeWidth="1.6"
                fill="none"
              />
              <circle cx="80" cy="21" r="3" fill={dims.accent} />
            </InsightSparkline>
          </InsightsBanner>

          <TabRow $border={dims.borderLight}>
            <Tab
              $active={tab === "inbox"}
              $color={dims.textSecondary}
              $accent={dims.accent}
              onClick={() => setTab("inbox")}
              type="button"
            >
              Inbox
              <TabBadge $bg={dims.accent} $color="#ffffff">
                {unreadCount}
              </TabBadge>
            </Tab>
            <Tab
              $active={tab === "all"}
              $color={dims.textSecondary}
              $accent={dims.accent}
              onClick={() => setTab("all")}
              type="button"
            >
              All
            </Tab>
            <Tab
              $active={tab === "preferences"}
              $color={dims.textSecondary}
              $accent={dims.accent}
              onClick={() => setTab("preferences")}
              type="button"
            >
              Preferences
            </Tab>
          </TabRow>

          {(tab === "inbox" || tab === "all") && (
            <Layout>
              <Sidebar>
                <FilterBlock
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <FilterTitle $color={dims.textMuted}>Categories</FilterTitle>
                  {categoryFilters.map((cf) => (
                    <FilterButton
                      key={cf.id}
                      $active={filter === cf.id}
                      $accent={dims.accent}
                      $color={dims.textPrimary}
                      onClick={() => setFilter(cf.id)}
                      type="button"
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {cf.id !== "all" && (
                          <FilterDot
                            $color={
                              notificationCategoryColors[cf.id as NotifType]
                                ?.dot || "#94a3b8"
                            }
                          />
                        )}
                        {cf.label}
                      </span>
                      <FilterCount $color={dims.textMuted}>
                        {counts[cf.id] || 0}
                      </FilterCount>
                    </FilterButton>
                  ))}
                </FilterBlock>

                <FilterBlock
                  $surface={dims.surfaceBg}
                  $border={dims.borderLight}
                >
                  <FilterTitle $color={dims.textMuted}>Quick filters</FilterTitle>
                  <FilterButton
                    $active={false}
                    $accent={dims.accent}
                    $color={dims.textPrimary}
                    type="button"
                  >
                    Action needed
                    <FilterCount $color={dims.textMuted}>3</FilterCount>
                  </FilterButton>
                  <FilterButton
                    $active={false}
                    $accent={dims.accent}
                    $color={dims.textPrimary}
                    type="button"
                  >
                    Snoozed
                    <FilterCount $color={dims.textMuted}>1</FilterCount>
                  </FilterButton>
                  <FilterButton
                    $active={false}
                    $accent={dims.accent}
                    $color={dims.textPrimary}
                    type="button"
                  >
                    Archived
                    <FilterCount $color={dims.textMuted}>14</FilterCount>
                  </FilterButton>
                </FilterBlock>
              </Sidebar>

              <ListCard $surface={dims.surfaceBg} $border={dims.borderLight}>
                {Object.keys(grouped).length === 0 && (
                  <div
                    style={{
                      padding: "60px 20px",
                      textAlign: "center",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: 13,
                      color: dims.textMuted,
                    }}
                  >
                    {tab === "inbox"
                      ? "Your inbox is empty. 🎉"
                      : "No notifications match these filters."}
                  </div>
                )}
                {Object.entries(grouped).map(([gName, items]) => (
                  <Group key={gName} $border={dims.borderLight}>
                    <GroupHead $color={dims.textMuted}>{gName}</GroupHead>
                    {items.map((n) => {
                      const colors = notificationCategoryColors[n.type];
                      const unread = !readIds.has(n.id);
                      return (
                        <NotifRow
                          key={n.id}
                          $border={dims.borderLight}
                          $unread={unread}
                          $hover={
                            isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"
                          }
                          onClick={() =>
                            setReadIds((s) => {
                              const ns = new Set(s);
                              ns.add(n.id);
                              return ns;
                            })
                          }
                        >
                          <NotifLeft>
                            <Dot $color={colors.dot} />
                          </NotifLeft>
                          <NotifBody>
                            <NotifMetaRow>
                              <NotifCategory $color={colors.label}>
                                {n.categoryLabel}
                              </NotifCategory>
                              <NotifTime $color={dims.textMuted}>
                                {n.time}
                              </NotifTime>
                            </NotifMetaRow>
                            <NotifTitle $color={dims.textPrimary}>
                              {n.text}
                            </NotifTitle>
                            <NotifSub $color={dims.textSecondary}>
                              {n.meta}
                            </NotifSub>
                            <NotifActions>
                              {n.actions.map((a, ai) => (
                                <SmallBtn
                                  key={a.label}
                                  $primary={ai === 0 || a.primary}
                                  $color={dims.textPrimary}
                                  $border={dims.borderLight}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {a.label}
                                </SmallBtn>
                              ))}
                              <SmallBtn
                                $color={dims.textMuted}
                                $border={dims.borderLight}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Snooze
                              </SmallBtn>
                            </NotifActions>
                          </NotifBody>
                        </NotifRow>
                      );
                    })}
                  </Group>
                ))}
              </ListCard>
            </Layout>
          )}

          {tab === "preferences" && (
            <div style={{ maxWidth: 720 }}>
              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>
                  Delivery channels
                </PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Where notifications are delivered. Per-category rules below
                  override these defaults.
                </PrefSub>
                {channels.map((c) => (
                  <ChannelRow key={c.id} $border={dims.borderLight}>
                    <ChannelIcon $bg={c.iconBg} $color={c.iconColor}>
                      {c.icon}
                    </ChannelIcon>
                    <ChannelInfo>
                      <ChannelName $color={dims.textPrimary}>
                        {c.name}
                      </ChannelName>
                      <ChannelDesc $color={dims.textMuted}>
                        {c.desc}
                      </ChannelDesc>
                    </ChannelInfo>
                    <Toggle
                      $on={activeChannels.has(c.id)}
                      $accent={dims.accent}
                      $offBg={isDark ? "#3a3a44" : "#cbd5e1"}
                      onClick={() => toggleChannel(c.id)}
                      aria-pressed={activeChannels.has(c.id)}
                      type="button"
                    />
                  </ChannelRow>
                ))}
              </PrefSection>

              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>
                  Per-category rules
                </PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Choose which channels get which categories. Security
                  alerts always go to Email — for safety reasons that one
                  can&rsquo;t be turned off.
                </PrefSub>
                <RuleHead $border={dims.borderLight} $color={dims.textMuted}>
                  <span>Category</span>
                  <span>Email</span>
                  <span>Slack</span>
                  <span>SMS</span>
                  <span>Push</span>
                </RuleHead>
                {ruleCategories.map((rc) => (
                  <RuleRow key={rc.id} $border={dims.borderLight}>
                    <RuleName $color={dims.textPrimary}>
                      <FilterDot $color={rc.color} />
                      {rc.label}
                    </RuleName>
                    {(["email", "slack", "sms", "push"] as const).map((ch) => {
                      const locked = rc.id === "security" && ch === "email";
                      const on = rules[rc.id]?.has(ch);
                      return (
                        <Check
                          key={ch}
                          $on={!!on}
                          $accent={locked ? "#94a3b8" : dims.accent}
                          $border={isDark ? "#5a5a66" : "#c8c8d0"}
                          onClick={() =>
                            !locked && toggleRule(rc.id, ch)
                          }
                          aria-pressed={!!on}
                          aria-label={`${rc.label} → ${ch}`}
                          type="button"
                          style={{
                            cursor: locked ? "not-allowed" : "pointer",
                            opacity: locked ? 0.6 : 1,
                          }}
                        >
                          {on ? "✓" : ""}
                        </Check>
                      );
                    })}
                  </RuleRow>
                ))}
              </PrefSection>

              <PrefSection
                $surface={dims.surfaceBg}
                $border={dims.borderLight}
              >
                <PrefTitle $color={dims.textPrimary}>Quiet hours</PrefTitle>
                <PrefSub $color={dims.textSecondary}>
                  Mute non-critical notifications outside these hours.
                  Critical security and incident alerts always come through.
                </PrefSub>
                <ChannelRow $border={dims.borderLight}>
                  <ChannelIcon $bg="#fef3c7" $color="#a16207">
                    ☾
                  </ChannelIcon>
                  <ChannelInfo>
                    <ChannelName $color={dims.textPrimary}>
                      Mute 10pm – 7am
                    </ChannelName>
                    <ChannelDesc $color={dims.textMuted}>
                      In your timezone (America/Los_Angeles)
                    </ChannelDesc>
                  </ChannelInfo>
                  <Toggle
                    $on
                    $accent={dims.accent}
                    $offBg={isDark ? "#3a3a44" : "#cbd5e1"}
                    type="button"
                  />
                </ChannelRow>
              </PrefSection>
            </div>
          )}
        </Page>
      )}
    </PageFrame>
  );
}
