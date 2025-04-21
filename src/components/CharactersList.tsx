import { CharacterCard } from "./CharacterCard"

import { useCallback, useEffect, useState, type HTMLAttributes } from "react"
import { getCharacters } from "rickmortyapi"

import { cn } from "@/utils/cn"
import { useTranslation } from "@/utils/i18n"
import { tc } from "@/utils/tc"

type Response = Awaited<ReturnType<typeof getCharacters>> | undefined
type Payload = Parameters<typeof getCharacters>[0]

export interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: Response
}

export function CharactersList({ initialData, className, ...props }: Props) {
  const { t } = useTranslation()

  const [characters, setCharacters] = useState<Response>(initialData)
  const [payload, setPayload] = useState<Payload>()

  const getCharactersClient = useCallback(async (data?: Payload) => {
    const res = await tc(getCharacters(data))
    if (res) setCharacters(res)
  }, [])

  useEffect(() => {
    getCharactersClient(payload)
  }, [getCharactersClient, payload])

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {characters?.data.results?.map((character) => <CharacterCard key={character.id} {...character} />)}
      </ul>
      {characters?.data.info?.pages && characters.data.info.pages > 1 && (
        <div className="flex w-full items-center justify-between gap-2 text-sm font-medium">
          <span>{t("commons.itemsCount", { count: characters.data.info.count })}</span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm"
              disabled={(payload?.page ?? 1) === 1}
              onClick={() => setPayload((old) => ({ ...old, page: (old?.page ?? 1) - 1 }))}
            >
              «
            </button>
            <span>{t("commons.page", { page: payload?.page ?? 1 })}</span>
            <button
              className="btn btn-ghost btn-sm"
              disabled={(payload?.page ?? 1) === characters.data.info.pages}
              onClick={() => setPayload((old) => ({ ...old, page: (old?.page ?? 1) + 1 }))}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
