"use client"

import { type FC, useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  StarIcon,
  Calendar01Icon,
  InformationCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Film01Icon,
  Tv01Icon,
} from "@hugeicons/core-free-icons"
import { type MediaItem } from "@/types/tmdb"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface HeroCarouselProps {
  items: MediaItem[]
}

const HeroCarousel: FC<HeroCarouselProps> = ({ items }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = items.length

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    // Set initial active index safely outside synchronous render/effects phase
    const handle = requestAnimationFrame(() => {
      setActiveIndex(api.selectedScrollSnap())
    })

    return () => {
      api.off("select", onSelect)
      cancelAnimationFrame(handle)
    }
  }, [api])

  const handlePrev = () => {
    if (!api) return
    api.scrollPrev()
    autoplay.reset()
  }

  const handleNext = () => {
    if (!api) return
    api.scrollNext()
    autoplay.reset()
  }

  const handleDotClick = (index: number) => {
    if (!api) return
    api.scrollTo(index)
    autoplay.reset()
  }

  const handleMouseEnter = () => {
    autoplay.stop()
  }

  const handleMouseLeave = () => {
    autoplay.play()
  }

  const handleFocus = () => {
    autoplay.stop()
  }

  const handleBlur = () => {
    autoplay.play()
  }

  if (totalSlides === 0) return null

  return (
    <div
      className="group/carousel relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {items.map((item, index) => {
            const isMovie = item.media_type === "movie"
            const title =
              (isMovie ? item.title : item.name) || "Título Desconhecido"
            const dateStr =
              (isMovie ? item.release_date : item.first_air_date) || ""
            const year = dateStr ? new Date(dateStr).getFullYear() : ""
            const rating = item.vote_average ? item.vote_average.toFixed(1) : ""
            const overview =
              item.overview || "Nenhuma sinopse disponível em português."
            const backdropUrl = item.backdrop_path
              ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
              : null
            const href = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`

            return (
              <CarouselItem
                key={`${item.media_type}-${item.id}`}
                className="relative pl-0"
              >
                <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-muted sm:h-[70vh] sm:min-h-[500px] md:h-[80vh] md:min-h-[600px]">
                  {/* Backdrop Image */}
                  <div className="absolute inset-0">
                    {backdropUrl ? (
                      <Image
                        src={backdropUrl}
                        alt={title}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        className="object-cover object-top transition-transform duration-700 group-hover/carousel:scale-102"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-900 via-slate-900 to-black">
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                        <HugeiconsIcon
                          icon={isMovie ? Film01Icon : Tv01Icon}
                          size={48}
                          className="text-zinc-700 opacity-40"
                        />
                      </div>
                    )}
                    {/* Gradients for readability and edge blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
                  </div>

                  {/* Hero Content */}
                  <div className="absolute bottom-0 left-0 z-10 flex w-full max-w-4xl flex-col justify-end space-y-4 p-6 sm:p-12 md:p-16 lg:p-20">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-primary uppercase backdrop-blur-md md:text-xs">
                        Destaque do Dia
                      </span>

                      {rating && (
                        <div className="flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2.5 py-0.5 text-[10px] font-bold text-yellow-400 backdrop-blur-md md:text-xs">
                          <HugeiconsIcon
                            icon={StarIcon}
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          {rating}
                        </div>
                      )}

                      {year && (
                        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md md:text-xs">
                          <HugeiconsIcon icon={Calendar01Icon} size={12} />
                          {year}
                        </div>
                      )}

                      <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md md:text-xs">
                        {isMovie ? "Filme" : "Série"}
                      </span>
                    </div>

                    <h1 className="line-clamp-2 font-heading text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-5xl lg:text-6xl">
                      {title}
                    </h1>

                    <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed font-normal text-zinc-300 drop-shadow-sm sm:text-base">
                      {overview}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
                      >
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          size={16}
                          className="fill-current text-zinc-950"
                        />
                        Mais Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      {/* Manual Navigation Controls - Arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 p-3 text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-105 hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95 md:flex"
        aria-label="Slide anterior"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={2} />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 p-3 text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-105 hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:scale-95 md:flex"
        aria-label="Próximo slide"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={2} />
      </button>

      {/* Position Indicators - Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
              activeIndex === index
                ? "w-6 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Ir para o slide ${index + 1} de ${totalSlides}`}
            aria-current={activeIndex === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}

export { HeroCarousel, type HeroCarouselProps }
