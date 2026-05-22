import Link from "next/link"
import Image from "next/image"
import { type FC } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  Calendar01Icon,
  Film01Icon,
  Tv01Icon,
} from "@hugeicons/core-free-icons"
import { type MediaItem } from "@/types/tmdb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface MovieCardProps {
  item: MediaItem
}

const MovieCard: FC<MovieCardProps> = ({ item }) => {
  const isMovie = item.media_type === "movie"
  const title = (isMovie ? item.title : item.name) || "Título Desconhecido"
  const dateStr = (isMovie ? item.release_date : item.first_air_date) || ""
  const year = dateStr ? new Date(dateStr).getFullYear() : "N/A"
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "0.0"
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null
  const href = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`

  return (
    <Link href={href} className="group block focus:outline-none">
      <Card className="overflow-hidden border border-border/30 bg-card/50 backdrop-blur-md transition-all duration-300 group-hover:scale-[1.03] group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] focus-visible:ring-2 focus-visible:ring-primary">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center text-muted-foreground">
              <HugeiconsIcon
                icon={isMovie ? Film01Icon : Tv01Icon}
                size={40}
                className="opacity-40"
              />
              <span className="px-2 text-xs font-medium">{title}</span>
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border-none bg-black/60 px-2 py-0.5 text-xs font-semibold text-white text-yellow-400 backdrop-blur-md"
            >
              <HugeiconsIcon
                icon={StarIcon}
                size={12}
                className="fill-yellow-400 text-yellow-400"
              />
              {rating}
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center gap-1 border-none bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md"
            >
              <HugeiconsIcon icon={isMovie ? Film01Icon : Tv01Icon} size={11} />
              {isMovie ? "Filme" : "Série"}
            </Badge>
          </div>
        </div>

        <CardContent className="flex flex-col gap-2 p-4.5">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Calendar01Icon} size={12} />
              <span>{year}</span>
            </div>

            {item.vote_average > 0 && (
              <span className="rounded bg-muted/30 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                Destaque
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { MovieCard, type MovieCardProps }
