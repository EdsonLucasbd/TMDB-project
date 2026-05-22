import { getTVShowDetails } from "@/services/movies"
import { CastList } from "@/components/movies/cast-list"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  Calendar01Icon,
  Tv01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TVShowPage({ params }: PageProps) {
  const { id } = await params

  let tvShow
  try {
    tvShow = await getTVShowDetails(id)
  } catch (error) {
    console.error("Failed to fetch TV show details:", error)
    return notFound()
  }

  if (!tvShow) {
    return notFound()
  }

  const rating = tvShow.vote_average ? tvShow.vote_average.toFixed(1) : "0.0"
  const year = tvShow.first_air_date
    ? new Date(tvShow.first_air_date).getFullYear()
    : "N/A"

  // Format launch date
  const formattedDate = tvShow.first_air_date
    ? new Date(tvShow.first_air_date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A"

  const backdropUrl = tvShow.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
    : null

  const posterUrl = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : null

  // Find executive producers / creators in crew
  const creators =
    tvShow.credits?.crew
      .filter((c) => c.job === "Executive Producer" || c.job === "Creator")
      .map((c) => c.name)
      .slice(0, 3)
      .join(", ") || "N/A"

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-16">
      {/* Background Backdrop Banner with Gradients */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 z-0 h-[55vh] w-full md:h-[65vh]">
          <Image
            src={backdropUrl}
            alt={tvShow.name}
            fill
            priority
            className="object-cover object-top opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto max-w-6xl space-y-8 px-4 pt-6 md:pt-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-border/20 bg-card/40 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur-md transition-all duration-200 hover:bg-card/75 hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Voltar para Início
        </Link>

        {/* Media Sheet details */}
        <section className="grid grid-cols-1 items-start gap-8 pt-4 md:grid-cols-[300px_1fr] md:gap-12">
          {/* TV Show Poster */}
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-2xl border border-border/25 bg-muted shadow-2xl md:mx-0">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={tvShow.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted/80 text-muted-foreground">
                <HugeiconsIcon
                  icon={Tv01Icon}
                  size={48}
                  className="opacity-40"
                />
                <span className="text-xs font-semibold">Sem Pôster</span>
              </div>
            )}
          </div>

          {/* Info Details Section */}
          <div className="flex flex-col gap-6">
            {/* Badges / Header info */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase md:text-xs">
                Série de TV
              </span>

              <div className="flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2.5 py-0.5 text-[10px] font-bold text-yellow-400 md:text-xs">
                <HugeiconsIcon
                  icon={StarIcon}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                {rating}
              </div>

              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 md:text-xs">
                <HugeiconsIcon icon={Calendar01Icon} size={12} />
                {year}
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 md:text-xs">
                {tvShow.number_of_seasons}{" "}
                {tvShow.number_of_seasons === 1 ? "Temporada" : "Temporadas"}
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 md:text-xs">
                {tvShow.number_of_episodes}{" "}
                {tvShow.number_of_episodes === 1 ? "Episódio" : "Episódios"}
              </div>
            </div>

            {/* Title / Tagline */}
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
                {tvShow.name}
              </h1>
              {tvShow.tagline && (
                <p className="text-base font-medium text-muted-foreground/90 italic md:text-lg">
                  &ldquo;{tvShow.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Genres Pills */}
            <div className="flex flex-wrap gap-2">
              {tvShow.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-border/30 bg-card/45 px-3 py-1.5 text-xs font-semibold text-foreground/90 transition-all hover:border-primary/30"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview / Synopsis */}
            <div className="space-y-2.5">
              <h2 className="text-lg font-bold text-foreground">Sinopse</h2>
              <p className="text-sm leading-relaxed font-normal text-zinc-300 md:text-base">
                {tvShow.overview ||
                  "Nenhuma sinopse disponível para esta série."}
              </p>
            </div>

            {/* Producers and First Air Date Grid */}
            <div className="grid grid-cols-1 gap-4 border-t border-border/20 pt-6 sm:grid-cols-2">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Produção Executiva
                </p>
                <p
                  className="truncate text-sm font-medium text-foreground"
                  title={creators}
                >
                  {creators}
                </p>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Estreia
                </p>
                <p className="text-sm font-medium text-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cast List Section */}
        <section className="mt-4 border-t border-border/20 pt-8">
          <CastList cast={tvShow.credits?.cast || []} />
        </section>
      </div>
    </main>
  )
}
