import { type FC } from "react"
import { type MediaItem } from "@/types/tmdb"
import { MovieCard } from "./movie-card"
import { Skeleton } from "@/components/ui/skeleton"

interface MovieGridProps {
  items?: MediaItem[]
  isLoading?: boolean
  skeletonCount?: number
}

const MovieGrid: FC<MovieGridProps> = ({
  items = [],
  isLoading = false,
  skeletonCount = 10,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-border/30 bg-card/30 p-2.5"
          >
            {/* Poster Skeleton */}
            <Skeleton className="aspect-[2/3] w-full rounded-md bg-muted/60" />

            {/* Content Skeleton */}
            <div className="space-y-2 p-1.5">
              <Skeleton className="h-4 w-4/5 bg-muted/60" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-1/3 bg-muted/60" />
                <Skeleton className="h-3 w-1/4 bg-muted/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/10 p-8 text-center backdrop-blur-sm">
        <p className="font-medium text-muted-foreground">
          Nenhum filme ou série encontrado.
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Tente alterar seus filtros ou termo de pesquisa.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
      ))}
    </div>
  )
}

export { MovieGrid, type MovieGridProps }
