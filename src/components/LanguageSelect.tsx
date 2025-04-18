import { getRelativeLocaleUrl } from "astro:i18n"
import { useCallback, type HTMLAttributes } from "react"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function LanguageSelect({ className, ...props }: Props) {
  const { t, locale } = useTranslation()

  const getRedirect = useCallback((newLocale: string) => {
    const fullPath = window.location.pathname
    const parsedPath = fullPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")

    return getRelativeLocaleUrl(newLocale, parsedPath)
  }, [])

  return (
    <div className={cn("dropdown", className)} {...props}>
      <button tabIndex={0} role="button" className="btn rounded-xl border-input text-base-content btn-outline btn-xs">
        {t("currentLanguage", { lang: locale.toUpperCase() })}
      </button>
      <ul tabIndex={0} className="dropdown-content menu z-20 my-2 w-52 rounded-box border border-input bg-base-200 p-2">
        <li>
          <a href={getRedirect("pt")}>Português (PT)</a>
        </li>
        <li>
          <a href={getRedirect("en")}>English (EN)</a>
        </li>
      </ul>
    </div>
  )
}
