import { getRelativeLocaleUrl } from "astro:i18n"

import type { HTMLAttributes } from "react"

import { cn } from "@/utils/cn"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props extends HTMLAttributes<HTMLSelectElement> {
  currentLocale?: string
}

export function LanguageSelect({ currentLocale, className, ...rest }: Props) {
  const handleRedirect = (locale: string) => {
    const fullPath = window.location.pathname
    const parsedPath = fullPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")

    const targetUrl = getRelativeLocaleUrl(locale, parsedPath)
    window.location.href = targetUrl
  }

  return (
    <select
      className={cn("select rounded-xl select-xs", className)}
      value={currentLocale ?? "unset"}
      onChange={(ev) => handleRedirect(ev.target.value)}
      {...rest}
    >
      <option value="unset" disabled={true}>
        Select a language
      </option>
      <option value="en">English (en)</option>
      <option value="pt">Portugues (pt)</option>
    </select>
  )
}
