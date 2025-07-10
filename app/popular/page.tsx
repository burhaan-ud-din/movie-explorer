import { Suspense } from "react"
import { PopularMoviesGrid } from "@/components/movie-grid"
import { PopularMoviesLoading } from "@/components/loading-skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Popular Movies - MovieExplorer',
  description: 'Discover the most popular movies trending right now',
}

export default function PopularPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Popular Movies</h1>
        <p className="text-muted-foreground text-lg">
          The most popular movies trending right now, updated daily
        </p>
      </div>
      
      <Suspense fallback={<PopularMoviesLoading />}>
        <PopularMoviesGrid showRating={true} showYear={true} />
      </Suspense>
    </main>
  )
} 