import { useStore } from "@nanostores/react"

import type { HTMLAttributes } from "react"

import { $user } from "@/stores/user"
import { cn } from "@/utils/cn"

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export function User({ className, ...rest }: Props) {
  const user = useStore($user)

  return (
    <div className={cn("text-lg text-error", className)} {...rest}>
      {user.name ?? "ReactPlaceholder"}
    </div>
  )
}
