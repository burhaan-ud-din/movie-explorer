import { Suspense } from "react"
import { PopularMoviesGrid } from "@/components/movie-grid"
import { HomePageLoading } from "@/components/loading-skeleton"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Popular Movies</h1>
        <p className="text-muted-foreground text-lg">Discover the most popular movies right now</p>
      </div>
      
      <Suspense fallback={<HomePageLoading />}>
        <PopularMoviesGrid />
      </Suspense>
    </main>
  )
}
