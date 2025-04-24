import { CharacterCard } from "./character-card"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState, type HTMLAttributes } from "react"
import { getCharacter } from "rickmortyapi"

import { QueryProvider } from "@/providers/query"
import { cn } from "@/utils/cn"
import { tc } from "@/utils/tc"

type Response = Awaited<ReturnType<typeof getCharacter>> | undefined
type Payload = Parameters<typeof getCharacter>[0]

export interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: Response
  initialPayload?: Payload
}

function CharacterInfoWithoutProvider({ initialData, initialPayload, className, ...props }: Props) {
  const [payload, setPayload] = useState<Payload>(initialPayload ?? 1)

  const character = useQuery({
    enabled: !!payload,
    initialData: payload === undefined ? initialData : undefined,
    queryKey: ["characters", payload],
    queryFn: () => tc(getCharacter(payload)),
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)

      const searchId = searchParams.get("id")
      const parsedSearchId = searchId ? parseInt(searchId, 10) : undefined

      if (parsedSearchId && !isNaN(parsedSearchId)) setPayload(parsedSearchId)
    }
  }, [])

  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-4", className)} {...props}>
      {character.isLoading && <div className="h-64 w-full skeleton"></div>}
      {character.data?.data && !Array.isArray(character.data.data) && <CharacterCard {...character.data.data} />}
    </div>
  )
}

export function CharacterInfo(props: Props) {
  return (
    <QueryProvider>
      <CharacterInfoWithoutProvider {...props} />
    </QueryProvider>
  )
}
