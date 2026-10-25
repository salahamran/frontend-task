import { Crown, ScanFace, Sparkles } from 'lucide-react'
import type { Locale } from '../mock-data'

/* Section 5's graphic (design node 175:3935) — the omni-channel flow around a portrait.
 *
 * One exchange, read left to right: a request arrives, Lemon resolves it, replies, and routes it
 * on. The portrait is the customer at the centre of that; the two columns overlap it by 30px each
 * side, so the UI reads as laid *over* the person rather than beside them.
 *
 * Three things worth knowing before editing:
 *  - The left column is not a uniform stack. Its second group is indented 50px, which pushes those
 *    cards 20px past the column's own right edge and onto the photo. That stagger is the design's,
 *    not a bug — do not "fix" it by widening the column.
 *  - The right list fades its first two rows. Only the on-duty manager is at full contrast, which
 *    is the point of the list: one of these three is actually available right now. The fade is
 *    45% at `lg` and 60% below it, for the reason given at the map below.
 *  - Below `lg` the absolute composition is dropped and the pieces stack — but not all three the
 *    same way. A 1200px diagram scaled to 390px would be an unreadable smear, so the small-screen
 *    version is a different layout rather than a shrunken one: the exchange becomes a plain column
 *    under the photo, while the three people stay on the photo, frosted and faded exactly as they
 *    are at 1440. See the note at the top of the component for why.
 *
 * Everything is inert — the cards are pictures of a workflow, not controls. */

type Note = { lead: string; strong?: string; tail?: string }

type Copy = {
  trigger: string
  route: { title: string; channel: string }
  reply: Note
  omni: { title: string; channel: string }
  fast: string
  saved: string
  people: [Person, Person, Person]
}

type Person = { name: string; role: string; avatar: string; badge: 'crown' | 'check' }

const copy: Record<Locale, Copy> = {
  ru: {
    trigger: 'Новое обращение клиента',
    route: { title: 'Расп. запроса', channel: 'Канал: Telegram & WhatsApp' },
    reply: { lead: 'Да, в наличии ', strong: 'iPhone 15 Pro', tail: ', доставка доступна сегодня' },
    omni: { title: 'Омниканальность', channel: 'Синхронизация: Авито & Сайт' },
    fast: 'Ответ за 1.8 сек в любом канале',
    saved: 'История диалога сохранена',
    people: [
      { name: 'Анна Смирнова', role: 'Руководитель продаж', avatar: '/avatars/anna.jpg', badge: 'crown' },
      { name: 'Михаил Орлов', role: 'Telegram / WhatsApp', avatar: '/avatars/mikhail.jpg', badge: 'crown' },
      { name: 'Екатерина Власова', role: 'Дежурный менеджер', avatar: '/avatars/ekaterina.jpg', badge: 'check' },
    ],
  },
  en: {
    trigger: 'New customer enquiry',
    route: { title: 'Request routing', channel: 'Channel: Telegram & WhatsApp' },
    reply: { lead: 'Yes, we have the ', strong: 'iPhone 15 Pro', tail: ' in stock — delivery available today' },
    omni: { title: 'Omnichannel', channel: 'Synced: marketplace & website' },
    fast: 'Replied in 1.8s on any channel',
    saved: 'Conversation history saved',
    people: [
      { name: 'Anna Smirnova', role: 'Head of sales', avatar: '/avatars/anna.jpg', badge: 'crown' },
      { name: 'Mikhail Orlov', role: 'Telegram / WhatsApp', avatar: '/avatars/mikhail.jpg', badge: 'crown' },
      { name: 'Ekaterina Vlasova', role: 'On-duty manager', avatar: '/avatars/ekaterina.jpg', badge: 'check' },
    ],
  },
}

/* The white routing card: an icon tile, a title, an "AI" stamp pushed to the far edge, then a
   hairline and the channel it came in on. Both occurrences are the same card with different
   words, so it takes the strings rather than the node. */
function RouteCard({ title, channel }: { title: string; channel: string }) {
  return (
    <div className="flex w-full flex-col gap-[10px] rounded-2xl border border-line bg-white p-3 shadow-[0_1px_2px_rgba(34,36,42,0.05)] lg:w-[230px]">
      <div className="flex h-5 items-center gap-2">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] bg-marker">
          <ScanFace className="h-3.5 w-3.5 text-ink" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <span className="truncate font-onest text-sm leading-5 font-medium text-ink">{title}</span>
        <span className="ml-auto grid h-5 shrink-0 place-items-center rounded-[4px] border border-line px-[6px] font-onest text-[11px] leading-[17px] text-ink-soft">
          AI
        </span>
      </div>
      <span className="h-px w-full bg-line" aria-hidden="true" />
      <span className="font-onest text-[11px] leading-3 text-ink-soft">{channel}</span>
    </div>
  )
}

/* The grey notes the AI leaves behind — one line or two, same card. */
function NoteCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start gap-2 rounded-2xl bg-surface-muted px-[10px] py-2 lg:w-[230px]">
      <Sparkles className="mt-px h-4 w-4 shrink-0 text-ink" strokeWidth={1.9} aria-hidden="true" />
      <p className="font-onest text-[13px] leading-[15.6px] text-ink-soft">{children}</p>
    </div>
  )
}

function Note({ note }: { note: Note }) {
  return (
    <>
      {note.lead}
      {note.strong && <strong className="font-semibold text-ink">{note.strong}</strong>}
      {note.tail}
    </>
  )
}

function PersonRow({ person }: { person: Person }) {
  return (
    /* Translucent with a blur behind it, because below `lg` these rows sit on the photograph:
       an opaque grey card there reads as a hole punched in the picture. At `lg` the row is back
       on the flat page and goes fully opaque, which is the design's own card. */
    <div className="flex items-center gap-[10px] rounded-2xl bg-surface-muted/85 p-[10px] backdrop-blur-sm lg:bg-surface-muted">
      <span className="relative h-[46px] w-[46px] shrink-0">
        <img src={person.avatar} alt="" className="h-[46px] w-[46px] rounded-full object-cover" />
        {/* The availability stamp: a supervisor's crown, or a tick for whoever is on duty. */}
        <span className="absolute top-6 left-7 grid h-[22px] w-[22px] place-items-center rounded-full bg-marker ring-2 ring-surface-muted">
          {person.badge === 'crown' ? (
            <Crown className="h-3 w-3 text-ink" strokeWidth={2.1} aria-hidden="true" />
          ) : (
            <span className="grid h-2.5 w-2.5 place-items-center rounded-full bg-ink text-white" aria-hidden="true">
              <svg viewBox="0 0 10 10" fill="none" className="h-2 w-2">
                <path d="M1.5 5.4 3.8 7.7 8.5 2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </span>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-onest text-[15px] leading-[20.6px] font-medium text-ink">{person.name}</span>
        <span className="truncate font-onest text-[15px] leading-[20.6px] text-ink-soft">{person.role}</span>
      </span>
    </div>
  )
}

export default function OmniFlow({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="relative flex flex-col gap-5 lg:block lg:h-[550px]">
      {/* The customer and the people who might pick the conversation up, kept as one picture.
          At 1440 the list is a column beside the portrait; on a phone it sits *on* the photo
          instead of under it, which is how the design's own mobile treatment reads — pulled
          out into its own block, the list became a third unrelated panel and the portrait lost
          the reason it is there. The photo is taller below `lg` so the three rows have somewhere
          to land, and at `lg` the wrapper dissolves (`contents`) so the photo and the list go
          back to being positioned against the frame, exactly as before. */}
      <div className="relative lg:contents">
        <img
          src="/sections/omni-photo.jpg"
          alt=""
          /* 550 is the design's own portrait height (340×550), and a phone column is 350 wide —
             so at the base width the box is the source's aspect to within a percent and
             `object-cover` crops essentially nothing. That is what keeps the three rows on the
             lower third, below her face, instead of across it: at 420 the rows covered half the
             photo and reached her chin. */
          className="h-[550px] w-full rounded-2xl object-cover object-top sm:h-[620px] lg:absolute lg:top-0 lg:left-1/2 lg:h-[550px] lg:w-[340px] lg:-translate-x-1/2 lg:rounded-3xl"
        />

        {/* Right: who is on the other end. Rows 1–2 faded — only the third is available.
            `left/right` rather than `inset-x` so the lg overrides are plain: a variant beats its
            base class, but two classes of the same variant are ordered by the stylesheet, not by
            the order they are written here.
            The width cap and the left anchor start at `sm`: a phone-width photo is 350px and the
            rows fill it, but the tablet photo is 728px and the same rows stretched the full way
            become frosted bands with an empty right half rather than a stack of cards. Anchored
            left they stay a column, which is also what they are at 1440. */}
        <div className="absolute right-2 bottom-2 left-2 flex flex-col gap-1.5 sm:right-auto sm:left-3 sm:max-w-[380px] lg:top-8 lg:bottom-auto lg:left-[740px] lg:w-[260px]">
          {t.people.map((person, i) => (
            /* 45% is the design's fade and it stays the value at `lg`, where the rows sit on a
               flat page. On the photo below `lg` that same 45% compounds with the translucent
               card behind it and the first two names stop being readable at all — the point is
               a step down, not a disappearance — so the phone eases off to 60%. */
            <div key={person.name} className={i < 2 ? 'opacity-60 lg:opacity-45' : undefined}>
              <PersonRow person={person} />
            </div>
          ))}
        </div>
      </div>

      {/* Left: the exchange. Absolute only at `lg`, where the geometry is the design's. */}
      <div className="mx-auto flex w-full max-w-[340px] flex-col gap-7 lg:absolute lg:top-[107px] lg:left-[200px] lg:mx-0 lg:w-[260px] lg:max-w-none lg:gap-0">
        {/* The connectors that tie the trigger back to the reply. Decorative, 1px, barely there. */}
        <span className="pointer-events-none absolute top-[33px] left-[14px] hidden h-[229px] w-[37px] rounded-lg border border-line-soft lg:block" aria-hidden="true" />
        <span className="pointer-events-none absolute top-[33px] left-[14px] hidden h-[68px] w-[17px] rounded-lg border border-line-soft lg:block" aria-hidden="true" />

        <span className="inline-flex h-[35px] w-fit items-center gap-1 rounded-full bg-marker pr-3 pl-[10px]">
          <ScanFace className="h-4 w-4 shrink-0 text-ink" strokeWidth={1.9} aria-hidden="true" />
          <span className="font-onest text-[13px] leading-[19px] font-medium text-ink">{t.trigger}</span>
        </span>

        <div className="flex flex-col gap-2 lg:mt-7 lg:pl-[30px]">
          <RouteCard title={t.route.title} channel={t.route.channel} />
          <NoteCard>
            <Note note={t.reply} />
          </NoteCard>
        </div>

        <div className="flex flex-col gap-2 lg:mt-7 lg:pl-[50px]">
          <RouteCard title={t.omni.title} channel={t.omni.channel} />
          <NoteCard>{t.fast}</NoteCard>
          <NoteCard>{t.saved}</NoteCard>
        </div>
      </div>
    </div>
  )
}
