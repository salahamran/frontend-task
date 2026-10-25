'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

/* Auth-aware platform CTA for the landing headers/heroes.
   Reads the `lemonai_session` presence marker cookie that the platform web app
   writes on the shared `Domain=.lemonai.ru` (set on login, cleared on logout).
   The cookie is a presence marker only — never a secret.

   Two modes:
   - "auth"  (header): anonymous → [Log in][Try Lemon AI]; session → [profile icon][Open platform].
   - "cta"   (single button: hero/final CTA, mobile drawer): anonymous → primary deep
              link; session → [Open platform].

   The cookie carries presence only, so the logged-in state can't show a name or
   photo — the profile icon is a generic link into the app. Real sign-out happens
   inside the app (dashboard), which is why there is no Log out here.

   SSR renders the anonymous state; the cookie is read on mount and re-checked on
   window focus/pageshow so a returning user sees the right CTA without a reload.

   ── Why there is no longer a `tone` prop ────────────────────────────────────────────────────

   This component used to carry two palettes: a `design` tone for the redesigned header, hero
   and closing panels, and a `legacy` tone (the `pill` / `logIn` / `avatar` strings, in the
   cream-and-green system) for the templated pages. Every page is `.lp` now, so the legacy tone
   had no callers left that wanted it — and a second palette inside a client component is
   shipped to the browser whether or not a page uses it. Collapsing it to the one palette is what
   removes the last of the old system from the client bundle. */

/* The redesigned chrome: a 12px-rounded 44px button on the acid lime, a white hairlined
   secondary, and a matching avatar tile. */
const design = {
  acid: 'inline-flex h-11 items-center justify-center rounded-xl bg-acid px-4 text-sm font-medium text-ink-strong transition-colors hover:brightness-[1.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
  outline: 'inline-flex h-11 items-center justify-center rounded-xl border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
  avatar: 'grid h-11 w-11 place-items-center rounded-xl border border-line text-ink-soft transition-colors hover:border-ink/30 hover:text-ink',
}
const userIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" />
  </svg>
)

export default function PlatformCta({
  primaryHref,
  primaryLabel,
  openLabel,
  logInHref,
  logInLabel,
  mode = 'auth',
  variant = 'acid',
  className,
}: {
  primaryHref: string
  primaryLabel: string
  openLabel: string
  logInHref?: string
  logInLabel?: string
  mode?: 'auth' | 'cta'
  /** The nav fills its primary button with acid lime; the hero sets the same button as
      white-with-a-hairline. Only the *look* differs — the auth behaviour is identical, so the
      hero keeps showing "Открыть платформу" to a signed-in visitor instead of offering them a
      signup they already completed. */
  variant?: 'acid' | 'outline'
  className?: string
}) {
  const [inSession, setInSession] = useState(false)

  useEffect(() => {
    const check = () => setInSession(document.cookie.split(';').some((c) => c.trim().startsWith('lemonai_session=')))
    check()
    window.addEventListener('focus', check)
    window.addEventListener('pageshow', check)
    return () => {
      window.removeEventListener('focus', check)
      window.removeEventListener('pageshow', check)
    }
  }, [])

  const cta = (href: string, label: string) => <Link href={href} className={design[variant]}>{label}</Link>

  if (inSession) {
    const open = cta('https://app.lemonai.ru', openLabel)
    if (mode === 'auth') {
      return (
        <div className={className}>
          <Link href="https://app.lemonai.ru" className={design.avatar} aria-label={openLabel} title={openLabel}>{userIcon}</Link>
          {open}
        </div>
      )
    }
    return open
  }
  if (mode === 'auth') {
    return (
      <div className={className}>
        {logInHref && logInLabel && <Link href={logInHref} className={design.outline}>{logInLabel}</Link>}
        {cta(primaryHref, primaryLabel)}
      </div>
    )
  }
  return cta(primaryHref, primaryLabel)
}
