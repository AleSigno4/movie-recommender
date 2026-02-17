/**
 * MovieCardSkeleton Component
 * Provides a placeholder UI that mimics the MovieCard structure during data fetching.
 * Uses Tailwind's 'animate-pulse' for a smooth loading transition.
 */

export default function MovieCardSkeleton() {
  return (
    // We match the exact width and margins of the real MovieCard to prevent layout jumping
    <div className="w-[200px] flex-shrink-0 mx-auto my-4 animate-pulse">

      {/* Poster Skeleton */}
      <div className="bg-gray-700/50 p-2 w-full rounded-md rounded-b-none">
        <div className="w-full h-[280px] bg-gray-600 rounded-sm"></div>
      </div>

      {/* Info Skeleton - Structured to mirror titles, overviews, and ratings */}
      <div className="bg-gray-700/30 mt-0 p-2 rounded-md rounded-t-none min-h-[80px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"></div>
        </div>

        {/* Rating star */}
        <div className="h-3 bg-gray-600 rounded w-1/4 mx-auto mt-4"></div>
      </div>
    </div>
  );
}