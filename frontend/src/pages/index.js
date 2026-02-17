/**
 * Home Page Component
 * Core functionality: Client-side filtering, dynamic metadata extraction (genres/years),
 * and manual infinite scrolling for performance optimization.
 */
import { useState, useEffect } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { getMovies } from "../services/api";
import BtnToTop from "../components/BtnToTop";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

// Pagination constant to manage batch rendering
const MOVIES_PER_PAGE = 20;

export default function Home() {
  /* --- STATE MANAGEMENT --- */
  const [filters, setFilters] = useState({
    query: "",
    genre: [],
    year: [],
    sortBy: "default",
  });

  const [movies, setMovies] = useState([]); // Master list from API
  const [allFilteredMovies, setAllFilteredMovies] = useState([]); // Results after applying filters
  const [displayedMovies, setDisplayedMovies] = useState([]); // Subset for infinite scroll
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /* --- DATA EXTRACTION --- */

  // Dynamically extract unique genres from the movie dataset
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

  // Extract unique years for the filter dropdown
  const uniqueYears = [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a,);
  const years = ["All Years", ...uniqueYears];

  /* --- FILTER LOGIC --- */
  function updateFilter(key, value) {
    setFilters((prev) => ({...prev, [key]: value,}));
  }

  // Effect: Handles multi-criteria filtering and sorting on the client side
  useEffect(() => {
    let filtered = [...movies];

    // 1. Filter by search query
    if (filters.query) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(filters.query.toLowerCase()),
      );
    }

    // 2. Filter by multiple genres (OR logic)
    if (filters.genre.length > 0) {
      filtered = filtered.filter((m) => {
        if (!m.genres) return false;
        return filters.genre.some((g) => m.genres.split("|").includes(g));
      });
    }

    // 3. Filter by year
    if (filters.year.length > 0) {
      filtered = filtered.filter((m) => filters.year.includes(m.year));
    }

    // 4. Handle Sorting
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
    setDisplayedMovies(filtered.slice(0, MOVIES_PER_PAGE)); // Reset scroll to page 1
    setPage(1);
  }, [filters, movies]);

  /* --- API FETCHING --- */

  useEffect(() => {
    setLoading(true);
    getMovies()
      .then((data) => {
        setMovies(data);
        setDisplayedMovies(data.slice(0, MOVIES_PER_PAGE));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /* --- INFINITE SCROLL --- */

  useEffect(() => {
    const handleScroll = () => {
      // Trigger loadMore when user reaches 300px from the bottom
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allFilteredMovies, page]);

  const loadMore = () => {
    const start = page * MOVIES_PER_PAGE;
    const end = start + MOVIES_PER_PAGE;
    const moreMovies = allFilteredMovies.slice(start, end);

    if (moreMovies.length > 0) {
      setDisplayedMovies((prev) => [...prev, ...moreMovies]);
      setPage((prev) => prev + 1);
    }
  };

  if (error) return <div className="text-red-500 mt-20">{error}</div>;

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
        {/* Render Skeleton placeholders during initial load */}
        {loading
          ?
            Array.from({ length: 10 }).map((_, i) => (<MovieCardSkeleton key={i} />))
          : displayedMovies.map((movie) => (
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
          
        {/* Empty State: Displayed when filters return no results */}
        {!loading && displayedMovies.length === 0 && (
          <div className="text-gray-500 text-xl mt-10">
            <i className="fa-solid fa-ghost"></i> Ops! No movies found with these filters. Try resetting them!
          </div>
        )}
      </div>
      <BtnToTop />
      <Footer />
    </>
  );
}
