import { Onest } from 'next/font/google'

/* The only face this copy renders. Production also loads Inter for the hero's CRM mock and four
   wordmark families for the trust band; neither section is part of this task.
 *
 * `cyrillic` is not optional: without it the Russian page silently falls back to Arial while the
 * English one renders correctly — an asymmetry that is easy to miss. */
export const onest = Onest({ subsets: ['latin', 'cyrillic'], variable: '--font-onest-src', display: 'swap' })

export const fontVars = onest.variable
