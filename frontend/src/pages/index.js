import { useState, useEffect } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api";

const MOVIES_PER_PAGE = 20;

export default function Home() {
  // Filters state
  const [filters, setFilters] = useState({
    query: "",
    genre: "All Genres",
    year: "All Years",
    sortBy: "default",
  });

  // Movies and loading state
  const [movies, setMovies] = useState([]);
  const [allFilteredMovies, setAllFilteredMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Extract genres and years for dropdowns
  const sortedUniqueGenres = [
    ...new Set(
      movies.flatMap((m) => {
        if (!m.genres) return [];
        const genreData = Array.isArray(m.genres)
          ? m.genres
          : m.genres.split("|");
        return genreData;
      }),
    ),
  ]
    .filter((g) => g !== "(no genres listed)" && g.trim() !== "")
    .sort();
  const genres = ["All Genres", ...sortedUniqueGenres];

  const years = ["All Years", ...new Set(movies.map((m) => m.year))].sort(
    (a, b) => b - a,
  );

  // Update filter function
  function updateFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // Effect to filter movies when filters change (title, genre, year)
  useEffect(() => {
    let filtered = [...movies];

    if (filters.query) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(filters.query.toLowerCase()),
      );
    }

    if (filters.genre !== "All Genres") {
      filtered = filtered.filter((m) => {
        if (!m.genres) return false;
        return m.genres.split("|").includes(filters.genre);
      });
    }

    if (filters.year !== "All Years") {
      filtered = filtered.filter((m) => m.year === filters.year);
    }

    if (filters.sortBy === "rating_desc") {
      filtered.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
    } else if (filters.sortBy === "year_desc") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (filters.sortBy === "year_asc") {
      filtered.sort((a, b) => a.year - b.year);
    } else if (filters.sortBy === "title_asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setAllFilteredMovies(filtered);
    setDisplayedMovies(filtered.slice(0, MOVIES_PER_PAGE));
    setPage(1);
  }, [filters, movies]);

  // Initial load of movies (20 films)
  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setDisplayedMovies(data.slice(0, MOVIES_PER_PAGE));
      })
      .catch((err) => setError(err.message));
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedMovies, movies, page]);

  // Load more movies for infinite scroll
  const loadMore = () => {
    const start = page * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;

    const moreMovies = allFilteredMovies.slice(start, end);

    if (moreMovies.length > 0) {
      setDisplayedMovies((prev) => [...prev, ...moreMovies]);
      setPage((prev) => prev + 1);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Header />
      <SearchBar
        genres={genres}
        years={years}
        filters={filters}
        onChange={updateFilter}
      />
      <div className="flex flex-wrap justify-start gap-4 mx-12">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movieId={movie.movieId}
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
