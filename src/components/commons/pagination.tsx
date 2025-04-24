import type { HTMLAttributes } from "react"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

export interface Props extends HTMLAttributes<HTMLDivElement> {
  count?: number
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export function Pagination({ count = 0, currentPage = 1, totalPages = 1, className, onPageChange, ...props }: Props) {
  const { t } = useTranslation()

  return totalPages > 1 ? (
    <div className={cn("flex w-full items-center justify-between gap-2 text-sm font-medium", className)} {...props}>
      <span>{t("commons.itemsCount", { count })}</span>
      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost btn-sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          «
        </button>
        <span>{t("commons.page", { page: currentPage })}</span>
        <button
          className="btn btn-ghost btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  ) : null
}
