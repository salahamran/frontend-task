import { AtSign, Globe } from 'lucide-react'
import Link from 'next/link'
import NewsletterForm from './newsletter-form'

/* The redesigned footer (node 175:3733) — one implementation for the whole site.

   Geometry: a #f7f8f8 panel with a 16px radius inset 8px from the page edges, 64px top /
   32px bottom padding, a 1200px container, three 373px columns 40px apart, then a
   hairline-bounded newsletter band and the legal line.

   Deviations from the design, all deliberate and listed for the owner:
   - Three links are DROPPED because the design repeats them inside a single footer
     ("Политика конфиденциальности" in both Продукт and Компания, "Тарифные планы" in
     both Продукт and Ресурсы) and because "Newsletter" was authored as a link even
     though it is the label for the form below it.
   - The "We're hiring!" tag sat on "Безопасность данных", which is not a jobs link —
     a template leftover, so it is not shipped.
   - "© 2025" is stale (it is 2026) and "Email address*" / "Get updated" were untranslated
     on the Russian page; both are corrected per locale.
   - Instagram and LinkedIn have no destination anywhere in the repo, so they render as
     non-interactive placeholders rather than dead links. Add an href to switch them on.

   One addition to the design, flagged rather than slipped in: the Компания / Company column
   carries "Политика cookie" and "Пользовательское соглашение" beside "Конфиденциальность". The
   design has only the privacy link, and the rule above about not repeating a link does not apply
   here — these two appear nowhere else on the site, and a legal document nobody can reach is not
   published. Deleting them to restore the design would unpublish two documents.

   A third, at the owner's request (2026-10-16): «Публичная оферта» / "Public offer" joins them.
   It is the document that governs what a customer buys, it is the one the pricing page cites by
   clause number, and the offer's own §16.1 names https://lemonai.ru/rules as the place a new
   redaction is published — so a footer link to it is the document keeping its own promise. Note
   that /terms also describes itself as a публичная оферта; two documents claiming that role is the
   owner's call (see the note on `terms` in data/legal.ts), not a mistake here.

   A second addition, same reasoning, at the owner's request (2026-10-04): the Продукт / Product
   column carries «Обновления» / "Updates" as a fifth link. The design's column had four. It is
   here because the changelog at /updates is CMS-authored and shipped empty, and a page with no
   link to it from anywhere is a page that does not exist — the header nav does not carry it and
   the only other reference would be the sitemap, which is not a reader's route in. It sits with
   the product links and above «Тарифные планы», which stays last by convention. */

type FooterLink = { label: string; href: string; tag?: string }

const columns: Record<'ru' | 'en', { label: string; links: FooterLink[] }[]> = {
  ru: [
    {
      label: 'Продукт',
      links: [
        { label: 'Голосовой ресепшн', href: '/product/ai-receptionist' },
        { label: 'Синхронизация CRM', href: '/channels', tag: 'New' },
        { label: 'Аналитика диалогов', href: '/product/analytics' },
        { label: 'Обновления', href: '/updates' },
        { label: 'Тарифные планы', href: '/pricing' },
      ],
    },
    {
      label: 'Компания',
      links: [
        { label: 'О платформе', href: '/company/about' },
        { label: 'Безопасность данных', href: '/company' },
        { label: 'Конфиденциальность', href: '/privacy' },
        { label: 'Политика cookie', href: '/cookies' },
        { label: 'Пользовательское соглашение', href: '/terms' },
        { label: 'Публичная оферта', href: '/rules' },
        { label: 'Контакты', href: '/company/contact' },
      ],
    },
    {
      label: 'Ресурсы',
      links: [
        { label: 'Руководство по запуску', href: '/resources/guides' },
        { label: 'Блог и кейсы', href: '/blog' },
        { label: 'База знаний и FAQ', href: '/resources' },
      ],
    },
  ],
  en: [
    {
      label: 'Product',
      links: [
        { label: 'AI receptionist', href: '/en/product/ai-receptionist' },
        { label: 'CRM sync', href: '/en/channels', tag: 'New' },
        { label: 'Conversation analytics', href: '/en/product/analytics' },
        { label: 'Updates', href: '/en/updates' },
        { label: 'Pricing plans', href: '/en/pricing' },
      ],
    },
    {
      label: 'Company',
      links: [
        { label: 'About the platform', href: '/en/company/about' },
        { label: 'Data security', href: '/en/company' },
        { label: 'Privacy', href: '/en/privacy' },
        { label: 'Cookie policy', href: '/en/cookies' },
        { label: 'Terms of use', href: '/en/terms' },
        { label: 'Public offer', href: '/en/rules' },
        { label: 'Contact', href: '/en/company/contact' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { label: 'Launch guide', href: '/en/resources/guides' },
        { label: 'Blog and case studies', href: '/en/blog' },
        { label: 'Knowledge base and FAQ', href: '/en/resources' },
      ],
    },
  ],
}

/* The design ships these as exported SVGs from Figma. This account's Figma MCP quota is
   exhausted, so the two brand marks are authored inline here against `currentColor`
   (the same idiom as platform-cta.tsx) and the two generic marks reuse lucide, which is
   already a dependency. Swap in the exported originals once Figma access is restored. */
function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.98h3.4V21H3.3V8.98Zm5.6 0h3.26v1.64h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.07 2.26 4.07 5.2V21h-3.4v-5.9c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.11V21H8.9V8.98Z" />
    </svg>
  )
}

/* Order matches the design: Instagram, LinkedIn, globe, @. The first two have no
   destination anywhere in the repo, so they render inside a <span> — same box, no dead
   link. Add an href and they become real links with no other change. */
const social: { key: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; href: string | null; label: string }[] = [
  { key: 'instagram', Icon: InstagramMark, href: 'https://www.instagram.com/lemonai.ru/ ', label: 'Instagram' },
  { key: 'linkedin', Icon: LinkedInMark, href:'https://www.linkedin.com/company/lemonai-ru/', label: 'LinkedIn' },
  { key: 'site', Icon: Globe, href: 'https://lemonai.ru', label: 'lemonai.ru' },
  { key: 'email', Icon: AtSign, href: 'mailto:alexy@lemonai.ru', label: 'alexy@lemonai.ru' },
]

const socialBox =
  'grid h-8 w-8 place-items-center rounded-md border border-line text-ink-soft transition-colors'
const socialInteractive = `${socialBox} hover:border-ink/30 hover:text-ink`

export default function SiteFooter({ locale }: { locale: 'ru' | 'en' }) {
  const ru = locale === 'ru'
  return (
    <footer className="font-onest">
      <div className="p-2">
        <div className="rounded-2xl bg-surface-muted pb-8 pt-16">
          <div className="shell">
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-10">
              {columns[locale].map((column) => (
                <div key={column.label}>
                  <h2 className="text-xs font-medium uppercase leading-[12px] tracking-[0.72px] text-ink">{column.label}</h2>
                  <ul className="mt-8 flex flex-col gap-[14px]">
                    {column.links.map((link) => (
                      <li key={`${column.label}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-2 text-base leading-[23.2px] text-ink-soft transition-colors hover:text-ink"
                        >
                          {link.label}
                          {link.tag && (
                            <span className="rounded-[54px] bg-marker px-[6px] pb-[4px] pt-[5px] text-xs font-medium leading-[16.8px] text-ink">
                              {link.tag}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter band — hairlines top and bottom in the design. */}
            <div className="mt-16 grid items-center gap-8 border-y border-line pb-[72px] pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <Link href={ru ? '/' : '/en'} className="flex items-center gap-[10px]" aria-label={ru ? 'Lemon AI — на главную' : 'Lemon AI — home'}>
                <img src="/lemonai-logo.svg" alt="" className="h-[22px] w-[22px]" />
                <span className="text-[23px] font-medium leading-[27.6px] tracking-[-0.92px] text-ink">Lemon AI</span>
              </Link>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
                <p className="max-w-[363px] text-xl font-medium leading-[26px] text-ink">
                  {ru ? 'Интеллектуальная система активна 24/7' : 'An intelligent system, active 24/7'}
                </p>
                <NewsletterForm locale={locale} className="w-full md:w-[371px]" />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="text-sm leading-[21px] text-ink-soft">
                {ru ? '© 2026 Lemon AI Inc. Все права защищены.' : '© 2026 Lemon AI Inc. All rights reserved.'}
              </p>
              <div className="flex items-center gap-[6px]">
                {social.map(({ key, Icon, href, label }) =>
                  href ? (
                    <a key={key} href={href} className={socialInteractive} aria-label={label} title={label}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <span key={key} className={socialBox} title={`${label} — ${ru ? 'ссылка появится позже' : 'link coming soon'}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
