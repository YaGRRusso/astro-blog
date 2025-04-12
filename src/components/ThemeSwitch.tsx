import { useStore } from "@nanostores/react"
import { MoonStars, Sun } from "@phosphor-icons/react"

import type { LabelHTMLAttributes } from "react"

import { $theme } from "@/stores/theme"
import { cn } from "@/utils/cn"

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export function ThemeSwitch({ className, ...rest }: Props) {
  const theme = useStore($theme)

  return (
    <label className={cn("toggle border-input text-base-content", className)} {...rest}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(ev) => $theme.set(ev.target.checked ? "dark" : "light")}
      />
      <Sun />
      <MoonStars />
    </label>
  )
}
