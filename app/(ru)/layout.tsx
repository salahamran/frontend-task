import type { Metadata, Viewport } from 'next'
import { SiteSchema } from '@/components/seo/site-schema'
import { fontVars } from '../fonts'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lemonai.ru'),
  title: { default: 'Lemon AI — Ваш бизнес всегда готов ответить.', template: '%s — Lemon AI' },
  description: 'Lemon AI помогает бизнесу вести диалоги с клиентами, отвечать на вопросы, квалифицировать лиды и подключать менеджеров, когда это нужно.',
  keywords: ['AI-рецепционист', 'автоматизация бизнеса', 'диалоги с клиентами', 'Lemon AI'],
  openGraph: { title: 'Lemon AI', description: 'Ваш бизнес всегда готов ответить.', siteName: 'Lemon AI', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Lemon AI', description: 'Ваш бизнес всегда готов ответить.' },
}

/* The mobile browser chrome takes the colour of the new header, which is the redesign's
   #fafaf9 on every page — the cream here was the old palette's canvas. */
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#fafaf9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* The site-level structured data is rendered here rather than per page: it describes the
     publisher and the site, which are the same on every route, so a page that emitted it would be
     restating it. It sits before `children` so a parser reading the document in order meets the
     publisher before the page. */
  /* Production also mounts the cookie notice here. It is left out of this copy: it has nothing
     to do with the task and would appear in the corner of every screenshot of the diagram. */
  return <html lang="ru" className={`bg-surface ${fontVars}`}><body className="antialiased"><SiteSchema locale="ru" />{children}</body></html>
}
