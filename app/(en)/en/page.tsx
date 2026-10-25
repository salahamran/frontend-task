import LandingPage from '@/components/landing-page'

/* The English homepage. See the Russian page beside it for why the hreflang pair is a literal
 * here: `alternatesFor('en', '/')` lives in the CMS module, which this task copy does not have.
 * An English page canonicalises to itself; the pair is identical either side. */
export const metadata = {
  alternates: {
    canonical: 'https://lemonai.ru/en',
    languages: { ru: 'https://lemonai.ru', en: 'https://lemonai.ru/en', 'x-default': 'https://lemonai.ru' },
  },
}

export default function Page() {
  return <LandingPage />
}
