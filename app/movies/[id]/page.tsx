import React, {Suspense} from 'react';
import Image from "next/image";

interface Props {
    params: {
        id: string
    }
}

const Page: React.FC<Props> = ({params}) => {
  return (
   <div>
       <Suspense fallback={<Loading />}>
           <MovieDetails movieId={params.id} />
       </Suspense>
   </div>
  );
}
export default Page;

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="text-4xl mb-2">🌀</div>
                <h2 className="text-xl font-semibold">Loading movie details...</h2>
            </div>
        </div>
    )
}

// Replace the mock fetchMovieDetails function with this real implementation
async function fetchMovieDetails(movieId: string) {
    // Try both ways to access the API key
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY

    if (!apiKey) {
        throw new Error(`TMDB API key is not configured. 
    Please add TMDB_API_KEY=e5380df62a7ca1d7327025a899f50844 to your environment variables.
    Available env vars: ${
            Object.keys(process.env)
                .filter((key) => key.includes("TMDB"))
                .join(", ") || "none found"
        }`)
    }

    if (!movieId || movieId === "[id]") {
        throw new Error("Please provide a valid movie ID in the URL (e.g., /movies/550)")
    }

    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`

        const response = await fetch(url, {
            next: { revalidate: 3600 },
            headers: {
                Accept: "application/json",
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Movie with ID ${movieId} not found`)
            }
            throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

// This component will fetch the movie data
async function MovieDetails({ movieId }: { movieId: string }) {
    try {
        const movie = await fetchMovieDetails(movieId)
        return <MovieView movie={movie} />
    } catch (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold mb-2">Error Loading Movie</h2>
                    <p className="text-gray-600 mb-4">
                        {error instanceof Error ? error.message : "An unexpected error occurred"}
                    </p>
                    <div className="text-sm text-gray-500">
                        <p>Try visiting a specific movie like:</p>
                        <ul className="mt-2 space-y-1">
                            <li>
                                <a href="/movies/550" className="text-blue-500 hover:underline">
                                    /movies/550 (Fight Club)
                                </a>
                            </li>
                            <li>
                                <a href="/movies/13" className="text-blue-500 hover:underline">
                                    /movies/13 (Forrest Gump)
                                </a>
                            </li>
                            <li>
                                <a href="/movies/238" className="text-blue-500 hover:underline">
                                    /movies/238 (The Godfather)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function MovieView({
                       movie,
                   }: {
    movie: {
        id: number
        title: string
        poster_path: string | null
        overview: string
        release_date: string
        vote_average: number
        runtime: number
        genres: { id: number; name: string }[]
        backdrop_path: string | null
        tagline?: string
    }
}) {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Backdrop Image */}
            {movie.backdrop_path && (
                <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={`${movie.title} backdrop`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30" />
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Movie Poster */}
                <div className="md:col-span-1">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
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
                </div>

                {/* Movie Details */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                        {movie.tagline && <p className="text-lg text-gray-600 italic mb-4">"{movie.tagline}"</p>}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <span>•</span>
                            <span>{movie.runtime} min</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">⭐ {movie.vote_average.toFixed(1)}/10</span>
                        </div>
                    </div>

                    {movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span key={genre.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {genre.name}
                </span>
                            ))}
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Overview</h2>
                        <p className="text-gray-700 leading-relaxed">{movie.overview || "No overview available for this movie."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
