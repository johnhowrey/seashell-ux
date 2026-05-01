"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  ShellDims,
  notifications,
  notificationCategoryColors,
  NotifType,
} from "../lib/theme";
import { icons } from "../lib/icons";

interface DimProps {
  $dims: ShellDims;
}

/* Notifications panel OVERLAYS content (matches live).
   Gutter has zero width; Panel uses fixed positioning so it can fully
   leave the viewport when closed (no edge bleeding through). */

const Gutter = styled.div<{ $open: boolean }>`
  position: relative;
  flex-shrink: 0;
  height: 100%;
  width: 0;
  overflow: visible;
  pointer-events: ${(p) => (p.$open ? "auto" : "none")};
`;

const Panel = styled.div<{ $surface: string; $border: string; $open: boolean }>`
  position: fixed;
  top: 0;
  left: 52px; /* sidebar width — panel sits to the right of sidebar */
  height: 100vh;
  width: 360px;
  background: ${(p) => p.$surface};
  border-right: 1px solid ${(p) => p.$border};
  box-shadow: ${(p) =>
    p.$open ? "4px 0 24px rgba(0, 0, 0, 0.08)" : "none"};
  display: flex;
  flex-direction: column;
  transform: translateX(${(p) => (p.$open ? "0" : "-110%")});
  transition: transform 0.22s cubic-bezier(0.2, 0, 0, 1),
    visibility 0s linear ${(p) => (p.$open ? "0s" : "0.22s")};
  visibility: ${(p) => (p.$open ? "visible" : "hidden")};
  z-index: 40;
`;

const Head = styled.div<{ $border: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  flex-shrink: 0;
  border-bottom: 1px solid ${(p) => p.$border};
`;

const Title = styled.h2<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${({ $dims }) => $dims.textPrimary};
  margin: 0;
`;

const HeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearAll = styled.button<DimProps>`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: ${({ $dims }) => $dims.accent};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CloseBtn = styled.button<DimProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ $dims }) => $dims.textMuted};

  &:hover {
    background: ${({ $dims }) => $dims.borderLight};
    color: ${({ $dims }) => $dims.textPrimary};
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px;
`;

const GroupLabel = styled.div<DimProps>`
  padding: 16px 16px 6px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: ${({ $dims }) => $dims.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 16px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  flex-shrink: 0;
  margin-top: 6px;
`;

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const Category = styled.span<{ $color: string }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  color: ${(p) => p.$color};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const Time = styled.span<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: ${({ $dims }) => $dims.textMuted};
  white-space: nowrap;
`;

const Text = styled.div<DimProps & { $unread?: boolean }>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: ${(p) => (p.$unread ? 600 : 500)};
  font-size: 13px;
  line-height: 1.4;
  color: ${({ $dims }) => $dims.textPrimary};
`;

const Meta = styled.div<DimProps>`
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: ${({ $dims }) => $dims.textSecondary};
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
  flex-wrap: wrap;
`;

const PrimaryAction = styled.button`
  padding: 5px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  background: #1a1a1a;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #000000;
  }
`;

const SecondaryAction = styled.button<DimProps>`
  padding: 5px 12px;
  font-family: var(--font-inter), "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${({ $dims }) => $dims.textPrimary};
  background: transparent;
  border: 1px solid ${({ $dims }) => $dims.borderLight};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ $dims }) => $dims.borderLight};
  }
`;

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
  dims: ShellDims;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  open,
  onClose,
  dims,
}) => {
  return (
    <Gutter $open={open} aria-hidden={!open}>
      <Panel $surface={dims.surfaceBg} $border={dims.borderLight} $open={open}>
        <Head $border={dims.borderLight}>
          <Title $dims={dims}>Notifications</Title>
          <HeadActions>
            <Link
              href="/notifications"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 500,
                fontSize: 12,
                color: dims.accent,
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
            <ClearAll $dims={dims} type="button">
              Clear all
            </ClearAll>
            <CloseBtn
              $dims={dims}
              type="button"
              aria-label="Close notifications"
              onClick={onClose}
            >
              {icons.close}
            </CloseBtn>
          </HeadActions>
        </Head>
        <Body>
          {notifications.map((group) => (
            <React.Fragment key={group.group}>
              <GroupLabel $dims={dims}>
                {group.group.toUpperCase()}
              </GroupLabel>
              {group.items.map((n) => {
                const palette = notificationCategoryColors[n.type as NotifType];
                return (
                  <Item key={n.id}>
                    <Dot $color={palette.dot} />
                    <ItemBody>
                      <Row>
                        <Category $color={palette.label}>
                          {n.categoryLabel}
                        </Category>
                        <Time $dims={dims}>{n.time}</Time>
                      </Row>
                      <Text $dims={dims} $unread={n.unread}>
                        {n.text}
                      </Text>
                      <Meta $dims={dims}>{n.meta}</Meta>
                      {n.actions.length > 0 && (
                        <ActionRow>
                          {n.actions.map((a) =>
                            a.primary ? (
                              <PrimaryAction key={a.label} type="button">
                                {a.label}
                              </PrimaryAction>
                            ) : (
                              <SecondaryAction
                                key={a.label}
                                $dims={dims}
                                type="button"
                              >
                                {a.label}
                              </SecondaryAction>
                            )
                          )}
                        </ActionRow>
                      )}
                    </ItemBody>
                  </Item>
                );
              })}
            </React.Fragment>
          ))}
        </Body>
      </Panel>
    </Gutter>
  );
};

export default NotificationsPanel;
