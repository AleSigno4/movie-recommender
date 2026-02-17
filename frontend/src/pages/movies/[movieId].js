// This file is the dynamic movie detail page. It fetches the movie details and recommendations based on the movieId from the URL.

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
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
  const scrollRef = useRef(null);

  // Fetch movie details and recommendations based on movieId
  useEffect(() => {
    if (!movieId) return;

    setMovie(null); 
    setError(null);

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }

    // API call to get movie details
    getMovies()
      .then((movies) => {
        const found = movies.find((m) => String(m.movieId) === String(movieId));
        if (found) setMovie(found);
        else setError("Film non trovato");
      })
      .catch((err) => setError(err.message));

    fetch(`http://localhost:8000/movies/${movieId}/recommendations`)
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("Errore raccomandazioni:", err));
  }, [movieId]);

  // Scroll function for recommendations carousel
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Render error, loading, or movie details
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!movie && !error) {
    return (
      <div className="flex flex-col min-h-screen bg-midnight text-white items-center justify-center">
        <div className="text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-midnight text-white">

      <Header />

      <main className="flex-1 px-8 pt-0 pb-0 mx-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-2 text-xl font-bold text-orange-400 flex items-center group"
        >
          <span className="mr-2 no-underline">←</span>
          <span className="group-hover:underline">Back</span>
        </button>

        {/* Movie details section */}
        <div className="flex flex-col md:flex-row gap-10 mt-4">
          {/* Movie poster */}          
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full md:w-80 rounded-xl shadow-2xl self-start"
          />
          {/* Movie info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="text-gray-400 text-md">{movie.runtime} min</p>
            </div>
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
                  <span key={g} className="bg-gray-700 px-3 py-1 rounded-md text-sm">{g}</span>
                ))}
              </div>
            </div>

            {/* Recommendations section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Recommended films</h3>
              <div className="relative w-full group/container -mt-10">
                {/* Left scroll button */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-all hover:bg-orange-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <div 
                  ref={scrollRef}
                  className="flex w-0 min-w-full overflow-x-auto pb-2 scrollbar-hide snap-x scroll-smooth"
                >
                  {/* Show recommendations */}
                  {recommendations.length > 0 ? (
                    recommendations.map((rec) => (
                      <div key={rec.movieId} className="flex-shrink-0 -ml-12 first:ml-0 scale-75 hover:scale-80 transition-transform snap-center">
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
                    <p className="text-gray-500 italic">No recommendations found.</p>
                  )}
                </div>
                {/* Right scroll button */}
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white opacity-0 group-hover/container:opacity-100 transition-all hover:bg-orange-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
    </div>
  );
}