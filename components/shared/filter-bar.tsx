"use client"

import { type FC, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { type Genre } from "@/types/tmdb"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  genres: Genre[]
}

const FilterBar: FC<FilterBarProps> = ({ genres }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get active genre ID from searchParams
  const activeGenreId = searchParams.get("genre") || ""

  // Render-sync pattern for active state to avoid useEffect eslint warning
  const [prevActiveGenreId, setPrevActiveGenreId] = useState(activeGenreId)
  const [selectedGenreId, setSelectedGenreId] = useState(activeGenreId)

  if (prevActiveGenreId !== activeGenreId) {
    setSelectedGenreId(activeGenreId)
    setPrevActiveGenreId(activeGenreId)
  }

  const handleGenreClick = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedGenreId === genreId) {
      // Toggle off if clicking the already selected genre
      params.delete("genre")
      setSelectedGenreId("")
    } else {
      params.set("genre", genreId)
      setSelectedGenreId(genreId)
    }

    // Reset pagination to page 1 on filter change
    params.delete("page")

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("genre")
    params.delete("page")
    setSelectedGenreId("")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-muted-foreground/80 uppercase">
          Filtrar por Gênero
        </span>
        {selectedGenreId && (
          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-primary transition-colors hover:underline"
          >
            Limpar Filtro
          </button>
        )}
      </div>

      {/* Horizontal Scrollable list of genres */}
      <div className="-mx-4 flex scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {/* 'Todos' Option */}
        <button
          onClick={handleClearAll}
          className={cn(
            "flex-shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
            !selectedGenreId
              ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "border-border/40 bg-card/35 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
          )}
        >
          Todos
        </button>

        {genres.map((genre) => {
          const idStr = String(genre.id)
          const isActive = selectedGenreId === idStr

          return (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(idStr)}
              className={cn(
                "flex-shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border-border/40 bg-card/35 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              )}
            >
              {genre.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { FilterBar, type FilterBarProps }
