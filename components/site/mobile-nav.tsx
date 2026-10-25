'use client'

import Link from 'next/link'
import { useState } from 'react'
import PlatformCta from '../platform-cta'

/* Client-only sibling of SiteHeader: the drawer is the one piece of the new chrome that
   needs state, so the header itself stays a server component. The design only covers
   1440px, so this is an interpretation — same links, same order, stacked. */

export default function MobileNav({
  locale,
  links,
  switchHref,
  switchLabel,
}: {
  locale: 'ru' | 'en'
  links: { label: string; href: string }[]
  switchHref: string
  switchLabel: string
}) {
  const [open, setOpen] = useState(false)
  const ru = locale === 'ru'

  return (
    /* `xl:hidden`, mirroring the row nav's `xl:flex` in site-header.tsx. The two breakpoints have
       to move together: at any width where both were hidden the site would have no navigation at
       all, and nothing would look broken enough to notice. */
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink transition-colors hover:bg-surface-2"
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={open ? (ru ? 'Закрыть меню' : 'Close menu') : (ru ? 'Открыть меню' : 'Open menu')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
          {open ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
        </svg>
      </button>

      {open && (
        <nav
          id="site-mobile-nav"
          className="absolute inset-x-0 top-16 border-b border-line bg-white px-5 py-6 shadow-[0_24px_48px_-32px_rgba(34,36,42,.4)]"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center rounded-lg px-3 text-base text-ink transition-colors hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
            <Link href={switchHref} onClick={() => setOpen(false)} className="text-sm text-ink-soft transition-colors hover:text-ink">
              {switchLabel}
            </Link>
            <PlatformCta
              mode="cta"
              primaryHref={ru ? 'https://app.lemonai.ru/register' : 'https://app.lemonai.ru/en/register'}
              primaryLabel={ru ? 'Попробовать' : 'Try Lemon AI'}
              openLabel={ru ? 'Открыть платформу' : 'Open platform'}
            />
          </div>
        </nav>
      )}
    </div>
  )
}
