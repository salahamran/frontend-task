import RussianHome from '@/components/russian-home'

/* The Russian homepage.
 *
 * In the production repo this file gets its hreflang pair from `alternatesFor()` in the CMS
 * module. That module imports the Payload config, and this task copy deliberately has no CMS,
 * no database and no `@payload-config` alias — so the same pair is written out literally here.
 * The values are the ones `alternatesFor('ru', '/')` produces: the Russian page owns the bare
 * origin, the English page sits behind `/en`, and Russian is the default for unmatched visitors. */
export const metadata = {
  alternates: {
    canonical: 'https://lemonai.ru',
    languages: { ru: 'https://lemonai.ru', en: 'https://lemonai.ru/en', 'x-default': 'https://lemonai.ru' },
  },
}

export default function Page() {
  return <RussianHome />
}
