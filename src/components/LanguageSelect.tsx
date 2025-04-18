import { getRelativeLocaleUrl } from "astro:i18n"
import { useCallback, type HTMLAttributes } from "react"

import { useTranslation } from "@/utils/i18n"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props extends HTMLAttributes<HTMLSelectElement> {}

export function LanguageSelect({ className, ...rest }: Props) {
  const { t, locale } = useTranslation()

  const getRedirect = useCallback((newLocale: string) => {
    const fullPath = window.location.pathname
    const parsedPath = fullPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")

    return getRelativeLocaleUrl(newLocale, parsedPath)
  }, [])

  return (
    <div className="dropdown">
      <button tabIndex={0} role="button" className="btn rounded-xl border-input text-base-content btn-outline btn-xs">
        {t("currentLanguage", { lang: locale.toUpperCase() })}
      </button>
      <ul tabIndex={0} className="dropdown-content menu z-1 my-2 w-52 rounded-box bg-base-200 p-2 shadow-sm">
        <li>
          <a href={getRedirect("pt")}>PT</a>
        </li>
        <li>
          <a href={getRedirect("en")}>EN</a>
        </li>
      </ul>
    </div>
  )
}
