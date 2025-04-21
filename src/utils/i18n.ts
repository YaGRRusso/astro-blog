import { useStore } from "@nanostores/react"
import { IntlMessageFormat } from "intl-messageformat"
import enMessages from "messages/en.json"
import ptMessages from "messages/pt.json"

import type { ReactElement } from "react"

import { $locale } from "@/stores/locale"

export type Locale = "en" | "pt"
export type Translations = Record<string, any>
export type InterpolationValues = Record<
  string,
  Element | ReactElement | string | number | boolean | Date | null | undefined
>

const translations: Record<Locale, Translations> = {
  en: enMessages,
  pt: ptMessages,
}

const messageCache: Record<string, IntlMessageFormat> = {}

function getTranslationObject(locale: Locale = "en") {
  return translations[locale] || translations.en
}

function getNestedValue(obj: any, key: string) {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj)
}

function translate(locale: Locale, key: string, values?: InterpolationValues, defaultValue?: string) {
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

      const formattedValues = values as InterpolationValues
      return msg.format(formattedValues) as string
    } catch (error) {
      console.error(`Error formatting message key "${key}" for locale "${locale}":`, error)
      return defaultValue || key
    }
  }

  return defaultValue || key
}

export function getTranslation(lang?: string) {
  const locale = lang ?? $locale.get() ?? "en"
  const t = (key: string, values?: InterpolationValues, defaultValue?: string) => {
    return translate(locale as Locale, key, values, defaultValue)
  }

  return { t, locale }
}

export function useTranslation() {
  const lang = useStore($locale)
  return getTranslation(lang)
}
