import { Skeleton } from "@/components/ui/skeleton"
import { Film, Sparkles } from "lucide-react"

interface LoadingSkeletonProps {
  title?: string
  description?: string
  count?: number
}

export default function LoadingSkeleton({ 
  title = "Loading Movies", 
  description = "Please wait while we fetch the latest movies...",
  count = 20 
}: LoadingSkeletonProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-12 w-80 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="group">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-6 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

// Enhanced loading component with animation and branding
export function EnhancedLoadingSkeleton({ 
  title = "Loading Movies", 
  description = "Please wait while we fetch the latest movies...",
  count = 20 
}: LoadingSkeletonProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Loading Header with Animation */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Film className="h-12 w-12 text-primary animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg animate-pulse">
          {description}
        </p>
      </div>
      
      {/* Loading Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="group" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-md relative bg-muted">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-6 bg-muted rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-muted rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="h-4 w-12 bg-muted rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

// Movie Card Loading Skeleton that matches the exact layout
export function MovieCardSkeleton() {
  return (
    <div className="group">
      <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
      <div className="mt-3">
        <div className="h-6 bg-muted rounded mb-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-muted rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 w-4 bg-muted rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 w-8 bg-muted rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Specific loading components for different pages
export function PopularMoviesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Film className="h-12 w-12 text-primary animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Popular Movies</h1>
        <p className="text-muted-foreground text-lg animate-pulse">
          Loading the most popular movies trending right now...
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TopRatedMoviesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Film className="h-12 w-12 text-primary animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Top Rated Movies</h1>
        <p className="text-muted-foreground text-lg animate-pulse">
          Loading the highest rated movies of all time...
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HomePageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Film className="h-12 w-12 text-primary animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-bounce" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Popular Movies</h1>
        <p className="text-muted-foreground text-lg animate-pulse">
          Loading popular movies for you...
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
} 