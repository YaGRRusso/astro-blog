import { getRelativeLocaleUrl } from "astro:i18n"

import type { HTMLAttributes } from "react"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

// Garantir que BASE_URL comece com / e termine sem / para consistência
// Embora import.meta.env.PUBLIC_BASE_URL já deva ser 'astro-blog/'
const rawBaseUrl = import.meta.env.PUBLIC_BASE_URL ?? ""
// Remover barras extras e garantir uma barra inicial e nenhuma final
const cleanBaseSegment = rawBaseUrl.replace(/^\/|\/$/g, "")
const basePrefix = cleanBaseSegment ? `/${cleanBaseSegment}` : ""

interface Props extends HTMLAttributes<HTMLSelectElement> {}

export function LanguageSelect({ className, ...rest }: Props) {
  const { t, locale } = useTranslation()

  const handleRedirect = (newLocale: string) => {
    const fullPath = window.location.pathname // Ex: /astro-blog/en/some/page or /astro-blog/en/

    // 1. Remover o basePrefix se existir
    let pathWithoutBase = fullPath
    if (basePrefix && fullPath.startsWith(basePrefix)) {
      pathWithoutBase = fullPath.substring(basePrefix.length) // Ex: /en/some/page or /en/
    }

    // 2. Remover o locale prefix (/en ou /pt) do início
    //    Certifique-se de que o locale atual (do hook) seja usado na regex
    const localePattern = new RegExp(`^\\/(${locale})(\\/|$)`)
    const pathWithoutBaseAndLocale = pathWithoutBase.replace(localePattern, "/") // Substitui /en/ ou /en por /

    // 3. Limpar barras duplicadas (caso a substituição deixe //) e garantir que comece com /
    let parsedPath = pathWithoutBaseAndLocale.replace(/\/{2,}/g, "/")
    if (!parsedPath.startsWith("/")) {
      parsedPath = "/" + parsedPath
    }
    // Se o resultado for apenas uma barra e o original não era só base+locale, pode precisar de ajuste
    // Mas getRelativeLocaleUrl geralmente lida bem com '/' para a raiz do locale

    console.log("Debug Redirect:", {
      fullPath,
      basePrefix,
      pathWithoutBase,
      locale,
      pathWithoutBaseAndLocale,
      parsedPath,
    }) // Adicionar log para depuração

    const targetUrl = getRelativeLocaleUrl(newLocale, parsedPath) // Ex: getRelativeLocaleUrl('pt', '/some/page') ou getRelativeLocaleUrl('pt', '/')
    window.location.href = targetUrl
  }

  return (
    <select
      className={cn("select rounded-xl select-xs", className)}
      value={locale ?? "unset"}
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
