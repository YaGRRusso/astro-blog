import type { HTMLAttributes } from "react"
import type { Character } from "rickmortyapi"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id">, Character {}

const textClass =
  "group-data-[status=alive]:text-success group-data-[status=dead]:text-error group-data-[status=unknown]:text-warning"
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
    <div className="@container h-full w-full max-w-3xl">
      <div
        className={cn("group card h-full w-full bg-base-200 @max-xl:card-side", className)}
        data-status={status.toLowerCase()}
        id={id.toString()}
        {...props}
      >
        <figure className="w-full @max-xl:max-w-20 @max-xl:sm:max-w-32">
          <img className="w-full object-cover @xl:max-h-96" src={image} alt={name} />
        </figure>
        <div className="card-body flex-1 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <a href={`character?id=${id}`} className="card-title link link-hover">
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
              origin: <span className={textClass}>{origin.name}</span>,
              episodes: (
                <span className={textClass}>{t("components.characterCard.episodes", { count: episode.length })}</span>
              ),
              location: <span className={textClass}>{location.name}</span>,
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
