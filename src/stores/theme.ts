import { persistentAtom } from "@nanostores/persistent"

export type Theme = "light" | "dark"

/**
 * Stores the current UI theme.
 * Initialized on CSS load using the user's preference (e.g., prefers-color-scheme),
 * and potentially updated on the client if needed.
 */
export const $theme = persistentAtom<Theme>("theme", "light")

/**
 * Toggles the current theme between light and dark.
 * Should be called when the user interacts with a theme switcher.
 */
export function toggleTheme() {
  $theme.set($theme.get() === "light" ? "dark" : "light")
}
