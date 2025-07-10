import { fetchPopularMovies } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"

// Define the type for a movie object based on TMDB API response
interface Movie {
  id: number
  title: string
  poster_path: string | null
}

export default async function HomePage() {
  const movies: Movie[] | null = await fetchPopularMovies()

  if (!movies) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-xl">Failed to load movies. Please try again later.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="group">
            <div className="aspect-[2/3] overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
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
                // Optional: Add placeholder for better perceived loading
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII="
              />
            </div>
            <h2 className="mt-2 text-lg font-semibold truncate group-hover:text-primary">{movie.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}
