// Component for displaying a movie card with poster, title, year, rating, and overview.

import Link from "next/link";

/**
 * MovieCard Component
 * Renders a movie preview with a hover-active scale effect and line-clamped text.
 * Uses Next.js Link for client-side navigation to movie details.
 */

export default function MovieCard({
  movieId,
  title,
  year,
  poster_url,
  avg_rating,
  overview = "",
}) {
  return (
    // "contents" ensures the Link doesn't break the flex/grid layout of the parent
    <Link href={`/movies/${movieId}`} className="contents">
      <div className="group w-[200px] flex-shrink-0 mx-auto my-4 cursor-pointer transition-transform transform hover:scale-105 relative">
        {/* Poster */}
        <div className="bg-white/10 backdrop-blur-md p-2 w-full rounded-md rounded-b-none">
          <img
            src={poster_url}
            alt={`${title} poster`}
            className="w-full h-[280px] object-cover mx-auto rounded-sm shadow-lg"
          />
        </div>

        {/* Movie Details: Info and rating */}
        <div className="bg-white/20 mt-0 p-2 text-center rounded-md rounded-t-none min-h-[80px] flex flex-col justify-between transition-all duration-300 group-hover:bg-white/30">
          <div>
            {/* Title & Year - Clamped to 2.5 lines to prevent layout shift */}
            <div className="text-white leading-tight font-semibold text-md line-clamp-2.5 h-[2rem] flex items-center justify-center">
              <span>
                {title} <span className="text-gray-400 font-normal text-sm ml-1">({year})</span>
              </span>
            </div>
            {/* Conditional Overview - Shown on hover via opacity/group states */}
            {overview && (
              <p className="text-[11px] text-gray-300 mt-1 line-clamp-3 group-hover:opacity-100 transition-opacity duration-300 leading-snug">
                {overview}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-200 font-bold mt-1">
            ⭐ {avg_rating}
          </div>
        </div>
      </div>
    </Link>
  );
}