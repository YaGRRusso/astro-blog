import { useStore } from "@nanostores/react"
import { MoonStars, Sun } from "@phosphor-icons/react"
import { useEffect, useState, type LabelHTMLAttributes } from "react"

import { $theme } from "@/stores/theme"
import { cn } from "@/utils/cn"

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export function ThemeSwitch({ className, ...props }: Props) {
  const theme = useStore($theme)

  const [checked, setChecked] = useState(false)
  useEffect(() => setChecked(theme === "dark"), [theme])

  return (
    <label className={cn("toggle border-input text-base-content", className)} {...props}>
      <span className="hidden">Theme Switcher</span>
      <input type="checkbox" checked={checked} onChange={(ev) => $theme.set(ev.target.checked ? "dark" : "light")} />
      <Sun />
      <MoonStars />
    </label>
  )
}
