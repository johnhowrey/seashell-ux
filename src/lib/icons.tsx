import React from "react";

const s = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const icons: Record<string, React.ReactNode> = {
  sparkle: (
    <svg {...s}>
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
    </svg>
  ),
  cpu: (
    <svg {...s}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  ),
  server: (
    <svg {...s}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  globe: (
    <svg {...s}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  database: (
    <svg {...s}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  layers: (
    <svg {...s}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  activity: (
    <svg {...s}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  grid: (
    <svg {...s}>
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  user: (
    <svg {...s}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  book: (
    <svg {...s}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  search: (
    <svg {...s} width={16} height={16}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  chevronRight: (
    <svg {...s} width={14} height={14}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  chevronLeft: (
    <svg {...s} width={14} height={14}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  close: (
    <svg {...s} width={14} height={14}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  send: (
    <svg {...s} width={18} height={18}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  settings: (
    <svg {...s}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  bell: (
    <svg {...s}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  minimize: (
    <svg {...s} width={16} height={16}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  assistant: (
    <svg {...s}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  check: (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg {...s}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  plus: (
    <svg {...s} width={16} height={16}>
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  plusBold: (
    <svg width={12} height={12} viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7 0C7.55228 0 8 0.447715 8 1V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H8V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V8H1C0.447716 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6H6V1C6 0.447715 6.44772 0 7 0Z" />
    </svg>
  ),
  arrowLeft: (
    <svg width={14} height={10} viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 11L1 6m0 0l5-5M1 6h14" />
    </svg>
  ),
  searchSm: (
    <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 13A6 6 0 107 1a6 6 0 000 12zM15 15l-3.5-3.5" />
    </svg>
  ),
  sparkles: (
    <svg width={14} height={10} viewBox="0 0 17.9999 12.8251" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.64746 7.30089C2.69451 7.04883 3.05396 7.04424 3.10742 7.29503L3.33496 8.36437C3.45162 8.91107 3.88111 9.33694 4.42871 9.44933L5.64648 9.69933C5.89618 9.7507 5.89618 10.107 5.64648 10.1583L4.43652 10.4064C3.88492 10.5195 3.45398 10.9514 3.34082 11.503L3.10742 12.6378C3.05541 12.8907 2.6931 12.8862 2.64746 12.6319L2.44922 11.5294C2.34771 10.9639 1.91213 10.5163 1.34961 10.3995L0.186523 10.1583C-0.0621769 10.1063 -0.0621715 9.75131 0.186523 9.69933L1.35644 9.45617C1.91555 9.34007 2.34939 8.89741 2.4541 8.33605L2.64746 7.30089ZM12.6729 2.25304C12.7321 1.93524 13.1845 1.92906 13.252 2.24523L13.4961 3.38683C13.8052 4.83695 14.9431 5.96672 16.3955 6.26476L17.7637 6.54503C18.0787 6.60966 18.0787 7.06048 17.7637 7.12511L16.3623 7.41222C14.9269 7.70681 13.7965 8.81413 13.4727 10.2433L13.251 11.2208C13.1802 11.5319 12.7351 11.526 12.6729 11.213L12.4961 10.3214C12.2046 8.85121 11.0622 7.69751 9.59473 7.39269L8.30078 7.12414C7.98703 7.05869 7.98691 6.61034 8.30078 6.54503L9.56445 6.28331C11.047 5.97546 12.1969 4.80209 12.4746 3.31359L12.6729 2.25304ZM6.35937 0.129018C6.38947 -0.0391764 6.62893 -0.0444476 6.66601 0.122182L6.8623 1.01671C6.94169 1.37578 7.22427 1.65505 7.58398 1.73156L8.58301 1.94445C8.74934 1.97982 8.74784 2.21807 8.58105 2.25109L7.61719 2.44152C7.24407 2.51526 6.95263 2.80667 6.87891 3.1798L6.69824 4.09386C6.66486 4.26281 6.4223 4.26119 6.39062 4.09191L6.21777 3.16906C6.14813 2.79763 5.86263 2.50441 5.49316 2.42492L4.53223 2.21789C4.36637 2.1822 4.36782 1.94453 4.53418 1.91124L5.46875 1.72472C5.84688 1.64905 6.14002 1.34942 6.20801 0.969838L6.35937 0.129018Z" />
    </svg>
  ),
};
