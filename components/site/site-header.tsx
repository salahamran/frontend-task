import Link from 'next/link'
import PlatformCta from '../platform-cta'
import MobileNav from './mobile-nav'

/* The redesigned header — one implementation for the whole site, replacing the four
   near-identical copies that used to live in landing-page / russian-home /
   marketing-site / russian-pages.

   Geometry and type are taken from the nav node (175:4282): 64px bar, solid white,
   hairline underline, 1200px container, 23px/-0.92px wordmark, 14px/21 links,
   44px 12px-radius buttons. The design has no language switch or mobile layout —
   both are ours, kept because the site is bilingual and must work at 390px.

   Server component: only the drawer (MobileNav) and the auth-aware PlatformCta are
   client-side, so the header costs almost nothing in the bundle. */

export type NavLink = { label: string; href: string }

export default function SiteHeader({ locale, links }: { locale: 'ru' | 'en'; links: NavLink[] }) {
  const ru = locale === 'ru'
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white font-onest">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href={ru ? '/' : '/en'}
          className="flex shrink-0 items-center gap-[10px]"
          aria-label={ru ? 'Lemon AI — на главную' : 'Lemon AI — home'}
        >
          <img src="/lemonai-logo.svg" alt="" className="h-[27px] w-[27px]" />
          <span className="text-[23px] font-medium leading-[27.6px] tracking-[-0.92px] text-ink">Lemon AI</span>
        </Link>

        {/* The row nav starts at `xl`, not `lg`, and the seventh item is why.
            Six fitted at 1024 only after the gap between links was halved for the sixth — the bar
            was full to the pixel there, and «Как это работает» had been breaking onto two lines
            inside its own 32px box. «База знаний» adds ~106px, and at 1024 that came straight out
            of the right-hand button: «Попробовать» was clipped off the edge of the viewport and
            unreachable, because these pages clip their own overflow.

            There was no room to buy it back. Narrowing the labels or the type was rejected when
            the sixth item went in, and squeezing the padding further would fit at 1024 and break
            at 1025 the first time a label grew. So the breakpoint moves instead: below 1280 the
            drawer carries the same links in the same order, and 1280 is where the bar has room
            again.

            `whitespace-nowrap` stays as the guard — if the nav is ever squeezed again it should
            overflow as a whole item, which is obvious, rather than silently break one label in
            half. */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label={ru ? 'Основная навигация' : 'Main navigation'}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-8 items-center whitespace-nowrap rounded-md px-3 text-sm leading-[21px] text-ink transition-colors hover:bg-surface-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={ru ? '/en' : '/'}
            /* `xl`, not `lg`, so it appears with the row nav it belongs to. Below that the drawer
               is showing, and the drawer has its own language switch — two of them side by side
               would be the same control twice. */
            className="mr-1 hidden text-sm text-ink-soft transition-colors hover:text-ink xl:block"
          >
            {ru ? 'EN' : 'RU'}
          </Link>
          <PlatformCta
            mode="auth"
            className="hidden items-center gap-2 md:flex"
            logInHref={ru ? 'https://app.lemonai.ru/login' : 'https://app.lemonai.ru/en/login'}
            logInLabel={ru ? 'Войти' : 'Log in'}
            primaryHref={ru ? 'https://app.lemonai.ru/register' : 'https://app.lemonai.ru/en/register'}
            primaryLabel={ru ? 'Попробовать' : 'Try Lemon AI'}
            openLabel={ru ? 'Открыть платформу' : 'Open platform'}
          />
          <MobileNav
            locale={locale}
            links={links}
            switchHref={ru ? '/en' : '/'}
            switchLabel={ru ? 'English version' : 'Русский'}
          />
        </div>
      </div>
    </header>
  )
}
