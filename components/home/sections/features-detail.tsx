import Link from 'next/link'
import type { Locale } from '../mock-data'
import OmniFlow from '../mocks/omni-flow'
import { ScribbleRing, ScribbleWave } from '../scribble'
import { IconMonitor } from '../icons'

/* Section 5 — "Features Detail" (node 175:3905), 1440×1146.8.
 *
 * The last of the three heavy sections, and the only one whose heading is centred. It puts a
 * single person at the middle of the picture and the machinery on either side of them: the
 * request and the AI's handling on the left, the humans who might pick it up on the right.
 *
 * This is also the one section that carries the dots texture across its full 1440px, so the
 * pattern is painted as an absolutely-positioned layer behind the content rather than on a panel.
 *
 * Three deviations from the file, all reported to the owner:
 *  - The design loops a hand-drawn lime ellipse *around* "AI-менеджер" and paints a flat band
 *    behind "во всех ваших каналах". Those are two different devices, so the ring is a stroked
 *    SVG wrapping the word and only the second line uses the page's `.marker` band.
 *  - The button reads "Get a demo" in the otherwise fully-Russian design — an untranslated
 *    leftover from the template it was built on. Shipped as "Получить демо" / "Get a demo".
 *  - It points at /company/contact. Asking for a demo is a contact action and there is no demo
 *    page; the design gives no destination. */

type Copy = {
  l1: string
  ring: string
  l2: string
  sub: string
  cta: string
  ctaHref: string
}

const copy: Record<Locale, Copy> = {
  ru: {
    l1: 'Один ',
    ring: 'AI-менеджер',
    l2: 'во всех ваших каналах',
    sub: 'Единая база знаний и бесшовная сквозная история клиентов, где бы они ни написали.',
    cta: 'Получить демо',
    ctaHref: '/company/contact',
  },
  en: {
    l1: 'One ',
    ring: 'AI manager',
    l2: 'across all your channels',
    sub: 'A single knowledge base and one unbroken customer history, wherever they choose to write.',
    cta: 'Get a demo',
    ctaHref: '/en/company/contact',
  },
}

export default function FeaturesDetail({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative py-20 lg:py-[120px]">
      {/* The section-wide dot grid. It sits under everything, so it is a layer, not a background —
          and it needs `relative` on the section, or it would resolve against the page instead. */}
      <span className="dots pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative flex flex-col items-center">
        <div className="flex w-full flex-col items-center gap-6">
          <ScribbleWave className="h-[37px] w-[67px] text-ink" />

          <h2 className="max-w-[720px] text-center font-onest text-[28px] leading-[1.05] font-medium tracking-[-0.56px] text-ink sm:text-[36px] sm:tracking-[-0.72px] lg:text-[48px] lg:leading-[50.4px] lg:tracking-[-0.96px]">
            {t.l1}
            <ScribbleRing>{t.ring}</ScribbleRing>
            <br />
            <span className="marker">
              <span className="marker-bg" aria-hidden="true" />
              {t.l2}
            </span>
          </h2>

          <p className="max-w-[480px] text-center font-onest text-sm leading-[20.3px] text-ink-soft lg:text-base lg:leading-[23.2px]">
            {t.sub}
          </p>
        </div>

        <div className="mt-10 w-full">
          <OmniFlow locale={locale} />
        </div>

        <Link
          href={t.ctaHref}
          className="mt-10 inline-flex h-11 items-center gap-2 rounded-xl bg-ink pl-[14px] pr-4 font-onest text-sm leading-[21px] font-medium text-white transition-colors hover:bg-ink-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <IconMonitor className="h-4 w-4 shrink-0" />
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
