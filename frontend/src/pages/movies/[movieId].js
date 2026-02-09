import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMovies } from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";

export default function MoviePage() {
  const router = useRouter();
  const { movieId } = router.query;
  const [recommendations, setRecommendations] = useState([]);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    getMovies()
      .then((movies) => {
        const found = movies.find((m) => String(m.movieId) === String(movieId));
        if (found) setMovie(found);
        else setError("Film non trovato");
      })
      .catch((err) => setError(err.message));

    // 2. Carica i film raccomandati (assumendo che l'api sia /recommender/movies/{id}/recommendations)
    fetch(`http://localhost:8000/movies/${movieId}/recommendations`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("Errore raccomandazioni:", err));
  }, [movieId]);

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!movie)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-midnight text-white">
      <Header />
      <main className="flex-1 p-8 pt-4 mx-12">
        <button
          onClick={() => router.back()}
          className="mb-2 text-xl font-bold text-orange-400 flex items-center group"
        >
          <span className="mr-2 no-underline">←</span>
          <span className="group-hover:underline">Back to Home</span>
        </button>

        <div className="flex flex-col md:flex-row gap-10 mt-4">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full md:w-80 rounded-xl shadow-2xl self-start"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-gray-400 text-xl leading-none">{movie.year}</p>
              <div className="bg-orange-500 flex items-center px-3 py-1.5 rounded-xl text-sm font-bold leading-none">
                ⭐ {movie.avg_rating}
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-md italic">
              {movie.overview || "Descrizione non disponibile."}
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex gap-2">
                {movie.genres?.split("|").map((g) => (
                  <span
                    key={g}
                    className="bg-gray-700 px-3 py-1 rounded-md text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Recommended films</h3>
              <div className="relative w-full">
                <div className="flex w-0 min-w-full overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {recommendations.length > 0 ? (
                    recommendations.map((rec) => (
                      <div
                        key={rec.movieId}
                        className="flex-shrink-0 -ml-12 first:ml-0 scale-75 hover:scale-80 transition-transform snap-center"
                      >
                        <div className="w-[200px]">
                          <MovieCard
                            movieId={rec.movieId}
                            title={rec.title}
                            year={rec.year}
                            poster_url={rec.poster_url}
                            avg_rating={rec.avg_rating}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No recommendations found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
