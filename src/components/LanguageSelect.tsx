import { getRelativeLocaleUrl } from "astro:i18n"

import type { HTMLAttributes } from "react"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

// Cálculo do prefixo base (como antes)
const rawBaseUrl = import.meta.env.PUBLIC_BASE_URL ?? ""
const cleanBaseSegment = rawBaseUrl.replace(/^\/|\/$/g, "")
const basePrefix = cleanBaseSegment ? `/${cleanBaseSegment}` : "" // Ex: /astro-blog

interface Props extends HTMLAttributes<HTMLSelectElement> {}

export function LanguageSelect({ className, ...rest }: Props) {
  // Obtém a função t e o locale ATUAL reativamente
  const { t, locale: currentLocale } = useTranslation()

  const handleRedirect = (newLocale: string) => {
    const currentPathname = window.location.pathname // Ex: /astro-blog/en/about

    // 1. Construir o prefixo completo para o locale atual
    //    Ex: /astro-blog/en
    const currentLocalePrefix = `${basePrefix}/${currentLocale}`

    // 2. Determinar o caminho relativo dentro do locale atual
    let relativePath = "/" // Padrão é a raiz do locale
    if (currentPathname.startsWith(currentLocalePrefix)) {
      relativePath = currentPathname.substring(currentLocalePrefix.length) // Remove /astro-blog/en
      // Garante que o caminho resultante comece com / se não for vazio
      if (relativePath === "" || !relativePath.startsWith("/")) {
        relativePath = "/" + relativePath
      }
    }
    // Se o caminho não começar com o prefixo esperado (improvável com a config atual),
    // ele usará "/" como fallback, redirecionando para a raiz do novo locale.

    console.log("Debug Redirect (Simplified):", {
      currentPathname, // Ex: /astro-blog/en/about
      basePrefix, // Ex: /astro-blog
      currentLocale, // Ex: en
      currentLocalePrefix, // Ex: /astro-blog/en
      relativePath, // Ex: /about  (Este é o caminho que queremos)
    })

    // 3. Gerar a URL para o NOVO locale usando o caminho relativo extraído
    const targetUrl = getRelativeLocaleUrl(newLocale, relativePath)
    window.location.href = targetUrl
  }

  return (
    <select
      className={cn("select rounded-xl select-xs", className)}
      value={currentLocale ?? "unset"} // Usa o locale reativo do hook
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
