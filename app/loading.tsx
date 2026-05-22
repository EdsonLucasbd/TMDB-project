import { MovieGrid } from "@/components/movies/movie-grid"

export default function Loading() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="mb-10 rounded-2xl border border-border/20 bg-card/10 p-6 backdrop-blur-md md:p-10">
        <div className="max-w-2xl space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-muted/60" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/60" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted/60" />
        </div>
      </div>

      {/* Grid Title Placeholder */}
      <div className="mb-6 space-y-2">
        <div className="h-7 w-56 animate-pulse rounded bg-muted/60" />
        <div className="h-4 w-72 animate-pulse rounded bg-muted/60" />
      </div>

      {/* Grid skeleton */}
      <MovieGrid isLoading skeletonCount={12} />
    </main>
  )
}
