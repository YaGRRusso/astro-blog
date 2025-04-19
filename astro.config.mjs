// @ts-check
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"

// eslint-disable-next-line
const { PUBLIC_SITE_URL, PUBLIC_BASE_URL } = loadEnv("NODE_ENV", process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  site: PUBLIC_SITE_URL,
  base: PUBLIC_BASE_URL,

  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt"],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false, fallbackType: "rewrite" },
  },
})
