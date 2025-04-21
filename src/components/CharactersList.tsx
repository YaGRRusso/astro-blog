import { CharacterCard } from "./CharacterCard"
import { Pagination } from "./Pagination"

import { useQuery } from "@tanstack/react-query"
import { useState, type HTMLAttributes } from "react"
import { getCharacters } from "rickmortyapi"

import { QueryProvider } from "@/providers/query"
import { cn } from "@/utils/cn"
import { tc } from "@/utils/tc"

type Response = Awaited<ReturnType<typeof getCharacters>> | undefined
type Payload = Parameters<typeof getCharacters>[0]

export interface Props extends HTMLAttributes<HTMLDivElement> {
  initialData?: Response
}

function CharactersListWithoutProvider({ initialData, className, ...props }: Props) {
  const [payload, setPayload] = useState<Payload>()

  const characters = useQuery({
    initialData: payload === undefined ? initialData : undefined,
    queryKey: ["characters", payload],
    queryFn: () => tc(getCharacters(payload)),
  })

  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {characters.isLoading
          ? [...Array(9)].map((index) => <div key={index} className="h-64 w-full skeleton"></div>)
          : characters.data?.data.results?.map((character) => <CharacterCard key={character.id} {...character} />)}
      </ul>
      <Pagination
        count={characters.data?.data.info?.count}
        currentPage={payload?.page}
        totalPages={characters.data?.data.info?.pages}
        onPageChange={(page) => setPayload({ ...payload, page })}
      />
    </div>
  )
}

export function CharactersList(props: Props) {
  return (
    <QueryProvider>
      <CharactersListWithoutProvider {...props} />
    </QueryProvider>
  )
}
