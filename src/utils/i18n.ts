import { IntlMessageFormat } from "intl-messageformat"
import enMessages from "messages/en.json"
import ptMessages from "messages/pt.json"

import { $locale } from "@/stores/locale"

export type Locale = "en" | "pt"
export type Translations = Record<string, any>
export type InterpolationValues = Record<string, string | number | boolean | Date | null | undefined>

const translations: Record<Locale, Translations> = {
  en: enMessages,
  pt: ptMessages,
}

const messageCache: Record<string, IntlMessageFormat> = {}

function getTranslationObject(locale: Locale = "en"): Translations {
  return translations[locale] || translations.en
}

function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj)
}

function translate(locale: Locale, key: string, values?: InterpolationValues, defaultValue?: string): string {
  const trans = getTranslationObject(locale)
  const messageString = getNestedValue(trans, key)

  if (typeof messageString === "string") {
    try {
      const cacheKey = `${locale}:${key}`
      let msg = messageCache[cacheKey]

      if (!msg) {
        msg = new IntlMessageFormat(messageString, locale)
        messageCache[cacheKey] = msg
      }

      const formattedValues = values as Record<string, string | number | boolean | Date | null | undefined>
      return msg.format(formattedValues) as string
    } catch (error) {
      console.error(`Error formatting message key "${key}" for locale "${locale}":`, error)
      return defaultValue || key
    }
  }
  return defaultValue || key
}

/**
 * Global translation function that reads the current locale from the $locale store.
 * Use this in both Astro and React components.
 * @param key The translation key (e.g., "hello", "common.hello").
 * @param values Optional interpolation values (e.g., { name: "Astro" }).
 * @param defaultValue Optional fallback string if the key is not found.
 * @returns The translated and formatted string.
 */
export function t(key: string, values?: InterpolationValues, defaultValue?: string): string {
  const currentLocale = ($locale.get() ?? "en") as Locale
  return translate(currentLocale, key, values, defaultValue)
}
