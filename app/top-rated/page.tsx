import { fetchTopRatedMovies } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Top Rated Movies - MovieExplorer',
  description: 'Discover the highest rated movies of all time',
}

// Define the type for a movie object based on TMDB API response
interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export default async function TopRatedPage() {
  const movies: Movie[] | null = await fetchTopRatedMovies()

  if (!movies) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-xl">Failed to load top-rated movies. Please try again later.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Top Rated Movies</h1>
        <p className="text-muted-foreground text-lg">
          The highest rated movies of all time, as voted by movie lovers worldwide
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="group">
            <div className="aspect-[2/3] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-md hover:shadow-lg">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.svg?width=500&height=750"
                }
                alt={`${movie.title} poster`}
                width={500}
                height={750}
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII="
              />
            </div>
            <div className="mt-3">
              <h2 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                {movie.title}
              </h2>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-muted-foreground">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
} 