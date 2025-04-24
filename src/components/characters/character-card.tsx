import type { HTMLAttributes } from "react"
import type { Character } from "rickmortyapi"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id">, Character {}

const linkClass =
  "group-data-[status=alive]:link-success group-data-[status=dead]:link-error group-data-[status=unknown]:link-warning"
const statusClass =
  "group-data-[status=alive]:status-success group-data-[status=dead]:status-error group-data-[status=unknown]:status-warning"

export function CharacterCard({
  episode,
  gender,
  id,
  image,
  location,
  name,
  origin,
  species,
  status,
  className,
  ...props
}: Props) {
  const { t } = useTranslation()

  return (
    <div
      className={cn("group card card-side bg-base-200", className)}
      data-status={status.toLowerCase()}
      id={id.toString()}
      {...props}
    >
      <figure className="w-full max-w-20 sm:max-w-32">
        <img src={image} alt={name} />
      </figure>
      <div className="card-body flex-1 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <a href="" className="card-title link link-hover">
              {name}
            </a>
            <div className="tooltip">
              <div className="tooltip-content">
                {t("components.characterCard.status." + status.toLowerCase(), {}, t("commons.unknown"))}
              </div>
              <div className={cn("status", statusClass)}></div>
            </div>
          </div>
          <span className="text-muted">
            {t("components.characterCard.gender." + gender.toLowerCase(), {}, t("commons.unknown"))} -{" "}
            {t("components.characterCard.especies." + species.toLocaleLowerCase(), {}, t("commons.unknown"))}
          </span>
        </div>
        <p>
          {t("components.characterCard.description", {
            name,
            origin: (
              <a className={cn("link link-hover", linkClass)} href="">
                {origin.name}
              </a>
            ),
            episodes: (
              <button className={cn("link link-hover", linkClass)}>
                {t("components.characterCard.episodes", { count: episode.length })}
              </button>
            ),
            location: (
              <a className={cn("link link-hover", linkClass)} href="">
                {location.name}
              </a>
            ),
          })}
        </p>
      </div>
    </div>
  )
}
