/* The one place on this site that writes a JSON-LD `<script>`.
 *
 * The escaping is the entire reason this is a component and not a `JSON.stringify` at each call
 * site. `JSON.stringify` leaves `<` alone, so a CMS-authored string containing `</script>` — which
 * an editor can absolutely type into a headline — closes this tag early and spills the rest of the
 * object into the document as markup. `<` is the same character to every JSON parser and inert
 * to the HTML one.
 *
 * The same escape already existed, hand-written, in components/blog/article-page.tsx. A shared
 * component is what stops the next script from forgetting it: structured data is exactly the kind
 * of code added in a hurry at the end of a page, and a missing escape fails silently rather than
 * loudly. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
