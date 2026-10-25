/* The only thing this copy needs from production's mock-data module: the locale union.
 *
 * The rest of that module is the CRM mock's data and strings for the hero and the other feature
 * sections. Those sections are not part of this task, and keeping their data here would be noise
 * in a repository that is meant to be read. */
export type Locale = 'ru' | 'en'
