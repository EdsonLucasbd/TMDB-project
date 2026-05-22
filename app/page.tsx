import {
  getTrendingContent,
  searchContent,
  discoverMoviesByGenre,
  discoverTVShowsByGenre,
} from "@/services/movies"
import { getAllGenres } from "@/services/genres"
import { MovieGrid } from "@/components/movies/movie-grid"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterBar } from "@/components/shared/filter-bar"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, Calendar01Icon, PlayIcon } from "@hugeicons/core-free-icons"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

interface PageProps {
  searchParams: Promise<{
    search?: string
    genre?: string
    page?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  // Await searchParams in Next.js 16
  const params = await searchParams
  const searchQuery = params.search || ""
  const genreIdStr = params.genre || ""
  const pageNum = Number(params.page) || 1

  // Fetch genres for the FilterBar
  const genres = await getAllGenres()

  let title = "Em Alta Hoje"
  let subtitle = "Os filmes e séries mais populares do momento"
  let data

  if (searchQuery) {
    data = await searchContent(searchQuery, pageNum)
    title = `Resultados para "${searchQuery}"`
    subtitle = `Encontramos ${data.total_results || 0} títulos relacionados`
  } else if (genreIdStr) {
    const genreId = Number(genreIdStr)
    // Discover both movies and TV shows for this genre in parallel
    const [moviesData, tvData] = await Promise.all([
      discoverMoviesByGenre(genreId, pageNum),
      discoverTVShowsByGenre(genreId, pageNum),
    ])

    // Merge results and sort by rating/popularity
    const combinedResults = [...moviesData.results, ...tvData.results].sort(
      (a, b) => b.vote_average - a.vote_average
    )

    data = {
      page: pageNum,
      results: combinedResults,
      total_pages: Math.max(moviesData.total_pages, tvData.total_pages),
      total_results: moviesData.total_results + tvData.total_results,
    }

    const activeGenre = genres.find((g) => String(g.id) === genreIdStr)
    title = activeGenre ? `Gênero: ${activeGenre.name}` : "Explorar Gênero"
    subtitle = activeGenre
      ? `Filmes e séries de ${activeGenre.name.toLowerCase()} em destaque`
      : "Títulos recomendados nesta categoria"
  } else {
    data = await getTrendingContent(pageNum)
  }

  const items = data.results || []

  // Use the first item of the trending list as the featured hero item
  const featuredItem =
    !searchQuery && !genreIdStr && items.length > 0 ? items[0] : null
  const gridItems = featuredItem ? items.slice(1) : items

  // Prepare featured hero data
  const isMovie = featuredItem?.media_type === "movie"
  const featuredTitle = featuredItem
    ? isMovie
      ? featuredItem.title
      : featuredItem.name
    : ""
  const featuredDate = featuredItem
    ? isMovie
      ? featuredItem.release_date
      : featuredItem.first_air_date
    : ""
  const featuredYear = featuredDate ? new Date(featuredDate).getFullYear() : ""
  const featuredOverview = featuredItem?.overview || ""
  const featuredRating = featuredItem?.vote_average
    ? featuredItem.vote_average.toFixed(1)
    : ""
  const featuredBackdrop = featuredItem?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredItem.backdrop_path}`
    : null
  const featuredHref = featuredItem
    ? isMovie
      ? `/movie/${featuredItem.id}`
      : `/tv/${featuredItem.id}`
    : "#"

  return (
    <main className="container mx-auto max-w-7xl space-y-12 px-4 py-8">
      {/* Premium Hero Banner (Only shown in discovery mode) */}
      {featuredItem && featuredBackdrop && (
        <section className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border/20 bg-muted/20 shadow-2xl md:aspect-[2.4/1]">
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <Image
              src={featuredBackdrop}
              alt={featuredTitle || "Destaque"}
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            {/* Gradients to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 z-10 flex w-full max-w-3xl flex-col justify-end space-y-4 p-6 md:p-12">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase backdrop-blur-md md:text-xs">
                Destaque do Dia
              </span>

              {featuredRating && (
                <div className="flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2.5 py-0.5 text-[10px] font-bold text-yellow-400 backdrop-blur-md md:text-xs">
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  {featuredRating}
                </div>
              )}

              {featuredYear && (
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md md:text-xs">
                  <HugeiconsIcon icon={Calendar01Icon} size={12} />
                  {featuredYear}
                </div>
              )}
            </div>

            <h1 className="line-clamp-1 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm md:line-clamp-2 md:text-4xl lg:text-5xl">
              {featuredTitle}
            </h1>

            <p className="line-clamp-3 hidden text-sm leading-relaxed font-normal text-zinc-300 drop-shadow-sm md:block">
              {featuredOverview}
            </p>

            <div className="pt-2">
              <Link
                href={featuredHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-black/10 transition-colors duration-200 hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <HugeiconsIcon
                  icon={PlayIcon}
                  size={16}
                  className="fill-current text-current"
                />
                Assistir Trailer
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section className="space-y-6">
        {/* Toolbar Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1 border-l-4 border-primary pl-4">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground md:text-sm">
              {subtitle}
            </p>
          </div>

          <Suspense
            fallback={
              <div className="h-10 w-full max-w-md animate-pulse rounded-xl bg-card/45" />
            }
          >
            <SearchBar />
          </Suspense>
        </div>

        {/* Genre Filter Bar */}
        <Suspense
          fallback={
            <div className="h-8 w-full animate-pulse rounded bg-muted" />
          }
        >
          <FilterBar genres={genres} />
        </Suspense>

        <MovieGrid items={gridItems} />
      </section>
    </main>
  )
}
