import { JsonLd } from './json-ld'

/* What the site is, as opposed to what a page on it is.
 *
 * Every other script this site emits describes one document — an article, a trail, a set of
 * questions — and belongs on the page that document is. These two describe the publisher and the
 * site itself, so they belong in the layout and appear once on every public page rather than being
 * repeated per route.
 *
 * `Organization` and `WebSite` go out as one `@graph` with cross-references, not as two scripts.
 * That is what makes the relationship between them a relationship rather than a coincidence of two
 * objects spelling the name the same way: `WebSite.publisher` points at the organization's `@id`,
 * and nothing else connects them.
 *
 * There is no `SearchAction`, which the usual template includes. It would be a lie — this site has
 * no search — and a `potentialAction` for a feature that does not exist is the exact kind of
 * schema added to increase the amount of schema.
 *
 * `logo` is left off for the reason already recorded in components/blog/article-page.tsx: the only
 * logo is an SVG, and Google's publisher-logo guidance is written around raster sizes, so pointing
 * at it is a claim that fails validation more often than it passes.
 *
 * `Organization` carries only what the site already publishes about itself. `sameAs` lists the two
 * profiles the footer links to, so this is the footer's own statement in machine-readable form
 * rather than a new claim about where the company lives. */

const ORIGIN = 'https://lemonai.ru'

/** The organization node's `@id`.
 *
 *  Exported so that other scripts on a page can point at this node instead of describing a second
 *  Organization of their own. JSON-LD `@id` references resolve across every script block in the
 *  document, and this one is in the layout, so it is present wherever that reference is made — but
 *  a page that spelled out its own organization anyway would leave an engine holding two entities
 *  that happen to share a name, which is the ambiguity a shared `@id` exists to avoid. */
export const ORGANIZATION_ID = `${ORIGIN}/#organization`

/* The description is the layout's own, repeated rather than paraphrased. Two descriptions of one
   organisation that differ by a word is how a knowledge panel ends up with the vaguer of them. */
const copy = {
  ru: {
    description:
      'Lemon AI помогает бизнесу вести диалоги с клиентами, отвечать на вопросы, квалифицировать лиды и подключать менеджеров, когда это нужно.',
    inLanguage: 'ru-RU',
  },
  en: {
    description:
      'Lemon AI helps businesses handle customer conversations, answer questions, qualify leads and involve managers when needed.',
    inLanguage: 'en',
  },
} as const

export function SiteSchema({ locale }: { locale: 'ru' | 'en' }) {
  const { description, inLanguage } = copy[locale]

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': ORGANIZATION_ID,
            name: 'Lemon AI',
            /* The brand is written both ways — 'Lemon AI' in copy, 'LemonAI' in the code and the
               domain. Naming both is what lets an engine treat them as one entity rather than two
               with a shared website. */
            alternateName: 'LemonAI',
            url: ORIGIN,
            description,
            sameAs: [
              'https://www.instagram.com/lemonai.ru/',
              'https://www.linkedin.com/company/lemonai-ru/',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${ORIGIN}/#website`,
            name: 'Lemon AI',
            url: ORIGIN,
            inLanguage,
            publisher: { '@id': `${ORIGIN}/#organization` },
          },
        ],
      }}
    />
  )
}
