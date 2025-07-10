import { Suspense } from "react"
import { TopRatedMoviesGrid } from "@/components/movie-grid"
import { TopRatedMoviesLoading } from "@/components/loading-skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Top Rated Movies - MovieExplorer',
  description: 'Discover the highest rated movies of all time',
}

export default function TopRatedPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Top Rated Movies</h1>
        <p className="text-muted-foreground text-lg">
          The highest rated movies of all time, as voted by movie lovers worldwide
        </p>
      </div>
      
      <Suspense fallback={<TopRatedMoviesLoading />}>
        <TopRatedMoviesGrid showRating={true} showYear={true} />
      </Suspense>
    </main>
  )
} 