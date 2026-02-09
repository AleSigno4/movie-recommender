import Link from "next/link";

export default function MovieCard({
  movieId,
  title,
  year,
  poster_url,
  avg_rating,
  overview = "",
}) {
  return (
    <Link href={`/movies/${movieId}`} className="contents">
      <div className="group w-[200px] flex-shrink-0 mx-auto my-4 cursor-pointer transition-transform transform hover:scale-105 relative">
        {/* Poster */}
        <div className="bg-white/10 backdrop-blur-md p-2 w-full rounded-md rounded-b-none">
          <img
            src={poster_url}
            alt={title}
            className="w-full h-[280px] object-cover mx-auto rounded-sm shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="bg-white/20 mt-0 p-2 text-center rounded-md rounded-t-none min-h-[80px] flex flex-col justify-between transition-all duration-300 group-hover:bg-white/30">
          <div>
            <div className="text-white leading-tight font-semibold text-md line-clamp-2.5 h-[2rem] flex items-center justify-center">
              <span>
                {title} <span className="text-gray-400 font-normal text-sm ml-1">({year})</span>
              </span>
            </div>
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