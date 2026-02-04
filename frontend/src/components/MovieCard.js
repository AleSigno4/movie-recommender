export default function MovieCard() {
  return (
    <div className="w-[200px] flex-shrink-0 mx-auto my-4">
      {/* Poster */}
      <div className="bg-white/10 backdrop-blur-md p-2 w-full rounded-md rounded-b-none">
        <img
          src="https://a.ltrbxd.com/resized/film-poster/1/1/9/7/4/9/9/1197499-marty-supreme-0-2000-0-3000-crop.jpg?v=b14a26bb43"
          alt="Movie Poster"
          className="w-full h-auto mx-auto"
        />
      </div>

      {/* Info */}
      <div className="bg-white/20 mt-0 p-2 pt-1 text-center text-lg font-semibold rounded-md rounded-t-none">
        <div className="text-white">
          Marty Supreme <span className="text-sm text-gray-400">(2026)</span>
        </div>
        <div className="text-sm text-gray-400">
          Rating: 8.5/10 <span className="text-orange-400">★</span>
        </div>
        <div className="text-xs text-gray-400">
          Trama del film, molto interessatne e coinvolgente...
        </div>
      </div>
    </div>
  );
}
