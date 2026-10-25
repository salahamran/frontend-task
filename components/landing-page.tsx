import HomePage from './home/home-page'
import SiteFooter from './site/site-footer'
import SiteHeader from './site/site-header'
import { navFor } from './site/nav'

/* The English homepage — now a thin wrapper, the mirror of russian-home.tsx.
 *
 * This file used to hold the whole old English homepage: a 58-line 'use client' component whose
 * nine sections were near-duplicates of the Russian ones, with its own header and footer. Those
 * sections came off the homepage when the new design landed (the owner's call: follow the design
 * exactly — the pricing band, FAQ accordion, solutions grid, stats band and chat demo are still
 * reachable at /en/pricing and the subpages, and their copy still lives in data/site-en.ts).
 *
 * All that is left for this file to own is the locale. The nav labels, which are the design's, in
 * English, moved to components/site/nav.ts — where the reasoning for why "How it works" points at
 * /en/product rather than /en/how-it-works is recorded once instead of in four files. The design
 * has no language switch; ours stays and lives in the header.
 *
 * `lp` is the redesign's scope class: it lays the flat #fafaf9 canvas over the legacy body glows
 * and switches the typeface to Onest. Nothing outside it changes, so subpage bodies still render
 * in the old palette. */

export default function LandingPage() {
  return (
    <div id="top" className="lp min-h-screen overflow-hidden">
      <SiteHeader locale="en" links={navFor('en')} />
      <main>
        <HomePage locale="en" />
      </main>
      <SiteFooter locale="en" />
    </div>
  )
}
