import type { CSSProperties } from "react";

/* ============================================================
   Hand-drawn doodle SVGs — notebook-sketch style decorations.
   All strokes use currentColor so sections can pick red/charcoal.
   ============================================================ */

interface DoodleProps {
  className?: string;
  style?: CSSProperties;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------- coffee cup with animated steam ---------- */
export function CoffeeCupDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden="true">
      <path
        className="steam steam--1"
        d="M25 16c0-3 2.5-3.5 2.5-6.5"
        {...stroke}
        strokeWidth={1.3}
      />
      <path
        className="steam steam--2"
        d="M33 15c0-3 2.5-3.5 2.5-6.5"
        {...stroke}
        strokeWidth={1.3}
      />
      <path
        className="steam steam--3"
        d="M41 16c0-3 2.5-3.5 2.5-6.5"
        {...stroke}
        strokeWidth={1.3}
      />
      <path d="M16 25h30v12a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12V25Z" {...stroke} />
      <path d="M46 28h4a5 5 0 0 1 0 10h-4" {...stroke} />
      <path d="M13 53h36" {...stroke} />
    </svg>
  );
}

/* ---------- steaming noodle bowl ---------- */
export function NoodleBowlDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 72 64" aria-hidden="true">
      <path className="steam steam--1" d="M30 14c0-3 2.5-3.5 2.5-6.5" {...stroke} strokeWidth={1.3} />
      <path className="steam steam--2" d="M40 13c0-3 2.5-3.5 2.5-6.5" {...stroke} strokeWidth={1.3} />
      <path d="M8 30h50a25 25 0 0 1-25 24h0A25 25 0 0 1 8 30Z" {...stroke} />
      <path d="M20 30c2-6 6-9 10-8s5 5 4 8" {...stroke} />
      <path d="M36 30c1-5 5-8 9-7s4 5 3 7" {...stroke} />
      <path d="M22 54h24" {...stroke} />
      <path d="M46 12 62 6M48 17l14-5" {...stroke} strokeWidth={1.3} />
    </svg>
  );
}

/* ---------- small heart ---------- */
export function HeartDoodle({
  className,
  style,
  filled,
}: DoodleProps & { filled?: boolean }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 30" aria-hidden="true">
      <path
        d="M16 26C9 21 3 16.5 3 10.5A7.5 7.5 0 0 1 16 6a7.5 7.5 0 0 1 13 4.5C29 16.5 23 21 16 26Z"
        {...stroke}
        strokeWidth={1.7}
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

/* ---------- four point sparkle ---------- */
export function SparkleDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2c.7 5.6 3.7 8.6 9.3 9.3C15.7 12 12.7 15 12 20.6 11.3 15 8.3 12 2.7 11.3 8.3 10.6 11.3 7.6 12 2Z"
        {...stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
}

/* ---------- radiating sparkle burst ---------- */
export function StarburstDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6v9M24 33v9M6 24h9M33 24h9M11.5 11.5l6.4 6.4M30.1 30.1l6.4 6.4M36.5 11.5l-6.4 6.4M17.9 30.1l-6.4 6.4" {...stroke} />
    </svg>
  );
}

/* ---------- little five-point star ---------- */
export function StarDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5c.6 4.2 2.2 6.3 6.5 6.9-4.3.6-5.9 2.7-6.5 6.9-.6-4.2-2.2-6.3-6.5-6.9 4.3-.6 5.9-2.7 6.5-6.9Z"
        {...stroke}
        strokeWidth={1.4}
      />
      <path d="M19 3v3M17.5 4.5h3" {...stroke} strokeWidth={1.2} />
    </svg>
  );
}

/* ---------- hand-drawn curved arrow (self drawing) ---------- */
export function CurvedArrowDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={`draw ${className ?? ""}`} style={style} viewBox="0 0 90 56" aria-hidden="true">
      <path d="M4 8c14 26 40 36 74 30" {...stroke} strokeWidth={1.7} />
      <path d="M66 30l13 7-9 11" {...stroke} strokeWidth={1.7} />
    </svg>
  );
}

/* ---------- squiggly arrow with loop ---------- */
export function LoopArrowDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={`draw ${className ?? ""}`} style={style} viewBox="0 0 96 52" aria-hidden="true">
      <path d="M6 40c8-20 24-30 40-24 12 4 10 20-2 20-9 0-12-11-4-15 10-5 24 0 34 8" {...stroke} strokeWidth={1.6} />
      <path d="M70 32l10-3-2 11" {...stroke} strokeWidth={1.6} />
    </svg>
  );
}

/* ---------- simple smiley face ---------- */
export function SmileyDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 56 56" aria-hidden="true">
      <path d="M28 6c12 0 22 9.6 22 22S40 50 28 50 6 40 6 28 16 6 28 6Z" {...stroke} strokeWidth={1.7} />
      <path d="M19 23.5v2M37 23.5v2" {...stroke} strokeWidth={2.4} />
      <path d="M18 33c3.4 5 7 7.5 10 7.5s6.6-2.5 10-7.5" {...stroke} strokeWidth={1.7} />
    </svg>
  );
}

/* ---------- fork + spoon cross ---------- */
export function CutleryDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 6v14M10 6v9a4 4 0 0 0 8 0V6M14 20v22" {...stroke} strokeWidth={1.5} />
      <path d="M34 6c-3.4 0-6 4.5-6 10.5 0 5 2 7.5 5 8.2V42M34 6v18.7" {...stroke} strokeWidth={1.5} />
    </svg>
  );
}

/* ---------- doodle underline (self drawing) ---------- */
export function UnderlineDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={`draw ${className ?? ""}`} style={style} viewBox="0 0 220 18" aria-hidden="true" preserveAspectRatio="none">
      <path d="M4 10c40-6 90-8 140-5 28 1.7 50 5 72 8" {...stroke} strokeWidth={3} />
      <path d="M10 15c46-4 100-6 150-3" {...stroke} strokeWidth={2} />
    </svg>
  );
}

/* ---------- tiny cloud/scribble swirl ---------- */
export function SwirlDoodle({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 40" aria-hidden="true">
      <path
        d="M6 30c-4-8 2-16 10-14 2-8 14-10 19-3 7-2 13 4 11 10-1.6 5-8 7-13 5"
        {...stroke}
        strokeWidth={1.5}
      />
    </svg>
  );
}

/* ---------- bowl of noodles mascot (filled, for chatbot) ---------- */
export function NoodleMascot({ className, style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 64" aria-hidden="true">
      {/* steam */}
      <path
        className="steam steam--1"
        d="M27 15c0-2.6 2.2-3 2.2-5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        className="steam steam--2"
        d="M36 14c0-2.6 2.2-3 2.2-5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* bowl */}
      <path
        d="M8 30h48a24 24 0 0 1-24 22A24 24 0 0 1 8 30Z"
        fill="currentColor"
        opacity={0.16}
      />
      <path
        d="M8 30h48a24 24 0 0 1-24 22A24 24 0 0 1 8 30Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      {/* noodles peeking */}
      <path
        d="M20 30c1.6-5 5-7.6 8.4-6.8 3 .8 4.4 3.8 3.8 6.8M35 30c1-4.2 4-6.6 7.2-5.8 2.8.8 4 3.4 3.4 5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {/* face */}
      <path d="M24 38.5v.2M40 38.5v.2" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" />
      <path
        d="M27 43.5c2 1.8 4 2.7 5 2.7s3-.9 5-2.7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {/* chopsticks */}
      <path d="M46 14 60 8M48 19l13-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
}
