import en from "@/messages/en.json"
import pt from "@/messages/pt.json"

export type Locale = "en" | "pt"
export type Translations = Record<string, any>

const translations: Record<Locale, Translations> = {
  en,
  pt,
}

export function getTranslationObject(locale: Locale = "en"): Translations {
  return translations[locale] || translations.en
}

function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj)
}

export function getTranslation(locale: string = "en") {
  const trans = getTranslationObject(locale as Locale)

  function t(key: string, defaultValue?: string): string {
    const value = getNestedValue(trans, key)
    if (typeof value === "string") return value
    return defaultValue || key
  }

  return t
}
