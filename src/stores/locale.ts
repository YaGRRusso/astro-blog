import { atom } from "nanostores"

import type { Locale } from "@/utils/i18n"

/**
 * Stores the current UI language locale.
 * Initialized on the server using Astro.currentLocale for SSG,
 * and potentially updated on the client if needed.
 */
export const $locale = atom<Locale>("en")
