import FeaturesDetail from './sections/features-detail'
import type { Locale } from './mock-data'

/* The task copy of the homepage: one section, composed by the same file production uses, so the
   diagram is evaluated in its real page frame (header, section, footer) rather than in isolation. */
export default function HomePage({ locale }: { locale: Locale }) {
  return <FeaturesDetail locale={locale} />
}
