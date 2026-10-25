import type { Metadata, Viewport } from 'next'
import { SiteSchema } from '@/components/seo/site-schema'
import { fontVars } from '../fonts'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lemonai.ru'),
  title: { default: 'Lemon AI — Your business, always ready to respond.', template: '%s — Lemon AI' },
  description: 'Lemon AI helps businesses handle customer conversations, answer questions, qualify leads and involve managers when needed.',
  keywords: ['AI receptionist', 'business automation', 'customer conversations', 'Lemon AI'],
  openGraph: { title: 'Lemon AI', description: 'Your business, always ready to respond.', siteName: 'Lemon AI', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Lemon AI', description: 'Your business, always ready to respond.' },
}

/* The mobile browser chrome takes the colour of the new header, which is the redesign's
   #fafaf9 on every page — the cream here was the old palette's canvas. */
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#fafaf9', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* See the Russian layout for why the site-level schema lives here and not on each page. The only
     difference between the two is the language the description is written in. */
  /* See the Russian layout for why the cookie notice is not mounted in this copy. */
  return <html lang="en" className={`bg-surface ${fontVars}`}><body className="antialiased"><SiteSchema locale="en" />{children}</body></html>
}
