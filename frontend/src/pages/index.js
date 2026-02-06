import { useState, useEffect } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api";

const MOVIES_PER_PAGE = 20;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setDisplayedMovies(data.slice(0, MOVIES_PER_PAGE));
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedMovies, movies, page]);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = page * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;
    const moreMovies = movies.slice(start, end);
    if (moreMovies.length > 0) {
      setDisplayedMovies([...displayedMovies, ...moreMovies]);
      setPage(nextPage);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Header />
      <SearchBar />
      <div className="flex flex-wrap justify-start gap-4 mx-12">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            title={movie.title}
            year={movie.year}
            poster_url={movie.poster_url}
            avg_rating={movie.avg_rating}
            overview={movie.overview}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
