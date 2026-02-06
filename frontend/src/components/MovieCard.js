export default function MovieCard({ title, year, poster_url, avg_rating, overview }) {
  return (
    <div className="w-[200px] flex-shrink-0 mx-auto my-4">
      {/* Poster */}
      <div className="bg-white/10 backdrop-blur-md p-2 w-full rounded-md rounded-b-none">
        <img
          src={poster_url}
          alt="Movie Poster"
          className="w-full h-auto mx-auto"
        />
      </div>

      {/* Info */}
      <div className="bg-white/20 mt-0 p-2 pt-1 text-center text-lg font-semibold rounded-md rounded-t-none">
        <div className="text-white leading-tight">
          {title} <span className="text-sm text-gray-400">({year})</span>
        </div>
        <div className="text-sm text-gray-200">
          Rating: {avg_rating}/10 <span className="text-orange-400">★</span>
        </div>
        <div className="text-xs text-gray-400">
          {overview.length > 100
            ? overview.slice(0, 100) + "..."
            : overview}
        </div>
      </div>
    </div>
  );
}
