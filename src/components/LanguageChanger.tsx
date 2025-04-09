import { getRelativeLocaleUrl } from "astro:i18n"

const BASE_URL = import.meta.env.PUBLIC_BASE_URL

interface Props {
  currentLocale?: string
}

export function LanguageSwitch({ currentLocale }: Props) {
  const handleRedirect = (locale: string) => {
    const fullPath = window.location.pathname
    const parsedPath = fullPath.replace(BASE_URL, "").replace(/^\/(en|pt)/, "")

    const targetUrl = getRelativeLocaleUrl(locale, parsedPath)
    window.location.href = targetUrl
  }

  return (
    <select className="select" value={currentLocale ?? "unset"} onChange={(ev) => handleRedirect(ev.target.value)}>
      <option value="unset" disabled={true}>
        Select a language
      </option>
      <option value="en">English (en)</option>
      <option value="pt">Portugues (pt)</option>
    </select>
  )
}
