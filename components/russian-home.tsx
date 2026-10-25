import HomePage from './home/home-page'
import SiteFooter from './site/site-footer'
import SiteHeader from './site/site-header'
import { navFor } from './site/nav'

/* The Russian homepage — now a thin wrapper.
 *
 * The design itself lives in components/home (nine sections composed by HomePage), the header and
 * footer are shared with every other page, and the nav labels now live in components/site/nav.ts
 * alongside their English twins, so all that belongs here is the locale. This file used to be a
 * ~300-line 'use client' component holding the whole old homepage; the sections it held are not
 * deleted yet — they come out once the remaining designed sections are built, which is also when
 * the two 'use client' hooks this file owned (the pricing toggle and the FAQ accordion) go away
 * with their sections. */

export default function RussianHome() {
  return (
    <div id="top" className="lp min-h-screen overflow-hidden">
      <SiteHeader locale="ru" links={navFor('ru')} />
      <main>
        <HomePage locale="ru" />
      </main>
      <SiteFooter locale="ru" />
    </div>
  )
}
