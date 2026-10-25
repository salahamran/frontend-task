'use client'

import { useState } from 'react'

/* Footer newsletter form (node 175:3857).

   There is no subscription backend yet, so this deliberately does NOT claim the address
   was stored: it validates locally and says so plainly. When an endpoint exists, replace
   the body of `onSubmit` with the POST and swap `done` for the real success copy — the
   markup and states stay as they are. */

export default function NewsletterForm({
  locale,
  className,
}: {
  locale: 'ru' | 'en'
  className?: string
}) {
  const ru = locale === 'ru'
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <form
      className={`relative flex items-center gap-0 rounded-xl border border-line bg-white p-1 ${className ?? ''}`}
      onSubmit={(event) => {
        event.preventDefault()
        setDone(true)
      }}
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        {ru ? 'Email для подписки' : 'Email address for the newsletter'}
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          setDone(false)
        }}
        placeholder={ru ? 'Ваш email*' : 'Email address*'}
        className="h-11 min-w-0 flex-1 rounded-[10px] px-3 text-sm leading-[21px] text-ink outline-none placeholder:text-placeholder focus-visible:bg-surface-3"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-xl bg-marker px-4 text-sm font-medium leading-[21px] text-ink-strong transition-[filter] hover:brightness-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {ru ? 'Получать обновления' : 'Get updated'}
      </button>

      <span aria-live="polite" className="sr-only">
        {done ? (ru ? 'Подписка пока не подключена.' : 'The newsletter is not connected yet.') : ''}
      </span>
      {done && (
        <span className="absolute left-0 top-full mt-2 text-xs text-ink-soft">
          {ru ? 'Подписка пока не подключена — форма заработает позже.' : 'The newsletter is not connected yet — this form will work later.'}
        </span>
      )}
    </form>
  )
}
