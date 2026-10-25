/* The `.lp` vocabulary the SEO templates are built from, in one place.
 *
 * These strings already existed — every one of them is copied out of
 * components/knowledge-base/listing.tsx, which is the page that established the house idiom for a
 * content page on this site: `shell` for the frame, Onest throughout, one hairline rule, `→` on
 * hover. What is new is only that they are named.
 *
 * Naming them is the whole point. Nine section components are about to use this scale, and the way
 * this codebase has paid for drift before is exactly here: the header nav was written out
 * identically in four files, and the legacy breadcrumb in two. A heading that is 30px on one
 * section and 28px on the next is not a bug anyone files — it is just a page that looks slightly
 * wrong, which is worse, because it never gets fixed.
 *
 * This is NOT a second design system. Nothing here is a new value: every class is already in
 * app/globals.css and already used by the landing page and the knowledge base. If a value needs to
 * change, it changes in globals.css and this file follows. */

/** The 1200px page frame. */
export const shell = 'shell'

/** The article measure, for prose that is meant to be read top to bottom. */
export const column = 'mx-auto w-full max-w-[820px]'

/** A wider measure, for pages that lead somewhere rather than being read straight through. */
export const wide = 'mx-auto w-full max-w-[1000px]'

/** The small caps label above a heading. */
export const eyebrow = 'font-onest text-[13px] leading-4 text-ink-soft uppercase lg:text-[14px]'

/** The page's `h1`. */
export const pageTitle =
  'font-onest text-[32px] font-medium leading-[1.08] tracking-[-0.64px] text-ink sm:text-[40px] sm:tracking-[-0.8px] lg:text-[48px] lg:leading-[1.05] lg:tracking-[-0.96px]'

/** A section's `h2` — the knowledge base's group heading, and every section below one. */
export const sectionTitle =
  'font-onest text-[24px] leading-[1.15] font-medium tracking-[-0.48px] text-ink lg:text-[30px] lg:tracking-[-0.6px]'

/** A card or a row's own heading. */
export const cardTitle =
  'font-onest text-[17px] leading-[1.3] font-medium text-ink transition-colors lg:text-[19px]'

/** Running text. */
export const body = 'font-onest text-base leading-[23.2px] text-ink-soft'

/** The lead paragraph under a title. */
export const lead = 'font-onest text-[18px] leading-[27.9px] text-ink-soft'

/** The vertical rhythm between two sections of a page. One value, so a page cannot be tight in one
 *  place and loose in another depending on which section component was used. */
export const section = 'pb-16 lg:pb-24'

/** The two buttons in the `.lp` chrome, matching PlatformCta's `design` tone exactly. Held here
 *  because the closing panel and the hero both need them and neither owns them. */
export const buttonAcid =
  'inline-flex h-11 items-center justify-center rounded-xl bg-acid px-4 font-onest text-sm font-medium text-ink-strong transition-colors hover:brightness-[1.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

export const buttonOutline =
  'inline-flex h-11 items-center justify-center rounded-xl border border-line bg-white px-4 font-onest text-sm font-medium text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
