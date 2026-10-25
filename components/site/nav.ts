import type { NavLink } from './site-header'

/* The header nav, in one place.
 *
 * These labels were written out identically in four files — components/landing-page.tsx,
 * components/marketing-site.tsx, components/russian-home.tsx and components/russian-pages.tsx.
 * That is the same drift the header component itself was extracted to stop, one level up, and
 * the failure mode is worse here: adding a seventh item meant remembering four files, and the
 * three-way duplicate was already the kind where one copy gets updated and the others do not.
 *
 * The labels are the design's. "Как это работает" points at /product rather than /how-it-works
 * because the latter exists only as a generic placeholder while /product is the real populated
 * listing. The design has no language switch; ours stays, and lives in the header. */

export const navRu: NavLink[] = [
  { label: 'Как это работает', href: '/product' },
  { label: 'Решения', href: '/solutions' },
  { label: 'Каналы', href: '/channels' },
  { label: 'Цены', href: '/pricing' },
  { label: 'Блог', href: '/blog' },
  /* After the blog and before the contact link: the knowledge base is reference material, and it
     belongs beside the other place a reader goes to learn something rather than beside the one
     place they go to get in touch. */
  { label: 'База знаний', href: '/knowledge-base' },
  { label: 'Контакты', href: '/company/contact' },
]

export const navEn: NavLink[] = [
  { label: 'How it works', href: '/en/product' },
  { label: 'Solutions', href: '/en/solutions' },
  { label: 'Channels', href: '/en/channels' },
  { label: 'Pricing', href: '/en/pricing' },
  { label: 'Blog', href: '/en/blog' },
  { label: 'Knowledge base', href: '/en/knowledge-base' },
  { label: 'Contact', href: '/en/company/contact' },
]

/** The nav for a locale. `SiteHeader` takes `locale` and `links` separately, so every call site
 *  would otherwise pair them by hand — and pairing them wrongly shows the English menu on the
 *  Russian page, which is a mistake that reads as a translation bug rather than a wiring one. */
export const navFor = (locale: 'ru' | 'en'): NavLink[] => (locale === 'ru' ? navRu : navEn)
