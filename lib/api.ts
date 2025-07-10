const TMDB_API_URL = "https://api.themoviedb.org/3"

export async function fetchPopularMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    console.error("Missing TMDB API key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.")
    return null
  }
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    if (!response.ok) {
      // More specific error handling could be added here
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Failed to fetch popular movies:", error)
    // Return null or an empty array to handle the error gracefully in the UI
    return null
  }
}

export async function fetchTopRatedMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    console.error("Missing TMDB API key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.")
    return null
  }
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Failed to fetch top-rated movies:", error)
    return null
  }
}

export async function fetchUpcomingMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    console.error("Missing TMDB API key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.")
    return null
  }
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Failed to fetch upcoming movies:", error)
    return null
  }
}

export async function fetchNowPlayingMovies() {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    console.error("Missing TMDB API key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.")
    return null
  }
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Failed to fetch now playing movies:", error)
    return null
  }
}

// We will need this for the next step (Team Member 2's task)
export async function fetchMovieDetail(id: string) {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    console.error("Missing TMDB API key. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env.local file.")
    return null
  }
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    if (!response.ok) {
      return null // Movie not found
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch movie details for id ${id}:`, error)
    return null
  }
}
