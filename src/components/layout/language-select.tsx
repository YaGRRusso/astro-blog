import { getRelativeLocaleUrl } from "astro:i18n"
import { useCallback, type HTMLAttributes } from "react"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props extends HTMLAttributes<HTMLDivElement> {
  currentPath?: string
}

export function LanguageSelect({ className, currentPath, ...props }: Props) {
  const { t, locale } = useTranslation()

  const getRedirect = useCallback(
    (newLocale: string) => {
      if (currentPath) {
        const parsedPath = currentPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")
        return getRelativeLocaleUrl(newLocale, parsedPath)
      }
    },
    [currentPath],
  )

  return (
    <div className={cn("dropdown dropdown-center sm:dropdown-end", className)} {...props}>
      <button tabIndex={0} role="button" className="btn rounded-xl border-input text-base-content btn-outline btn-xs">
        <span className="ellipsis">{t("layout.currentLanguage", { lang: locale.toUpperCase() })}</span>
      </button>
      <ul tabIndex={0} className="dropdown-content menu z-20 my-2 w-40 rounded-box border border-input bg-base-200 p-2">
        <li>
          <a href={getRedirect("pt")}>🇧🇷 Português (PT)</a>
        </li>
        <li>
          <a href={getRedirect("en")}>🇺🇸 English (EN)</a>
        </li>
      </ul>
    </div>
  )
}
