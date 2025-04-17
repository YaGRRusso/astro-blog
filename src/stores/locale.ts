import { atom } from "nanostores"

import type { Locale } from "@/utils/i18n"

/**
 * Stores the current UI language locale.
 * Initialized on the server using Astro.currentLocale for SSG,
 * and potentially updated on the client if needed.
 */
export const $locale = atom<Locale>("en")

/**
 * Sets the initial locale, primarily for server-side rendering during SSG.
 * Should be called once per request/page generation using Astro.currentLocale.
 * @param locale The current locale string (e.g., 'en', 'pt').
 */
export function initializeLocale(locale: string | undefined): void {
  if (locale && locale !== $locale.get()) {
    $locale.set(locale as Locale)
  }
}
