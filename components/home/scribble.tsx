/* The hand-drawn accents the design sprinkles beside its headings.
 *
 * They are ink drawings, not icons — a rough stroke that overshoots its own corner, deliberately
 * uneven. That is why they are inline paths rather than lucide glyphs: no icon set draws a line
 * that wobbles. Keeping them here means the whole page's hand-drawn voice is one file to tune. */

/** The little wave above the "Один AI-менеджер" heading (design node 175:3914). */
export function ScribbleWave({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 67 37" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 31c2-9 7.4-15.4 12.6-14.6 5.2.8 5.4 9.6 1.6 13.6-2.6 2.7-1.2 4.6 2.4 3.9 6.4-1.2 11.6-9.4 15.4-16.5 2.3-4.3 5.4-5.6 7.4-3.4"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* The hand-drawn lime loop the design draws around "AI-менеджер" (design node 175:3922).
 *
 * It is an annotation, not a highlighter: the brush loops *around* the word and the letters sit
 * on top of it, marking where it crosses. The shape is the design's own artwork, exported from
 * that node and used as a CSS mask — the same device as `.marker-bg`, and for the same reason.
 * Drawing it as an SVG path was the first attempt and it read as a thick wedge, because a stroke
 * stretched over a box this wide is not what the brush does; the painted tail and the overshoot
 * where the loop crosses itself are the whole character of it and no path reproduces them.
 *
 * Geometry lives in `.ring-bg`, next to `.marker-bg`, because it is measured in percentages of
 * this inline-block's line box. The wrapper is the shape's positioning context and nothing else;
 * `isolate` there is load-bearing (see `.marker-bg`), or the negative z-index sinks the loop
 * behind the page background instead of behind the letters.
 *
 * One asset covers both languages: English "AI manager" is shorter, and the mask stretches to
 * whatever the word measures. */
export function ScribbleRing({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative isolate inline-block">
      <span className="ring-bg" aria-hidden="true" />
      {children}
    </span>
  )
}

/** The upward swoosh that sits above the "Он знает ваш бизнес" heading (design node 175:3388). */
export function ScribbleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13 55c1.2-8.4 4.6-16.2 10-23.4 4.9-6.5 11.1-11.9 18.4-15.8"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M30 13.5c4.6-1.1 9.3-1.2 14-.4" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M44.5 12.6c.9 4.7.7 9.4-.5 14" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M17 47.5c-.6 1.9-.5 3.8.4 5.6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
