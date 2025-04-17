import { useStore } from "@nanostores/react"
import { getRelativeLocaleUrl } from "astro:i18n"

import type { HTMLAttributes } from "react"

import { $locale } from "@/stores/locale"
import { cn } from "@/utils/cn"
import { t } from "@/utils/i18n"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props extends HTMLAttributes<HTMLSelectElement> {}

export function LanguageSelect({ className, ...rest }: Props) {
  const currentLocale = useStore($locale)

  const handleRedirect = (newLocale: string) => {
    const fullPath = window.location.pathname
    const parsedPath = fullPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")

    const targetUrl = getRelativeLocaleUrl(newLocale, parsedPath)
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
        {t("selectLanguage")}
      </option>
      <option value="en">English (en)</option>
      <option value="pt">Portugues (pt)</option>
    </select>
  )
}
