/**
 * SearchBar Component
 * Provides multi-select filters for Genre and Year, a text search input, and a dropdown for sorting results.
 */
import { useState } from "react";

export default function SearchBar({ genres, years, filters, onChange }) {
  // Local state to manage dropdown visibility
  const [genreOpen, setGenreOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Alphabetic", value: "title_asc" },
    { label: "Top Rated", value: "rating_desc" },
    { label: "Newest", value: "year_desc" },
    { label: "Oldest", value: "year_asc" },
  ];

  return (
    <div className="flex items-center space-x-4 my-5 mt-2 mx-12">

      {/* --- GENRE FILTER --- */}
      <label className="text-white text-lg">Genre:</label>
      {/* Dropdown Trigger */}
      <div className="relative">
        <div
          onClick={() => {
            setGenreOpen(!genreOpen);
            setYearOpen(false); // Close other menus to avoid UI overlap
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none flex items-center justify-between"
        >
          <span
            className="truncate whitespace-nowrap overflow-hidden block"
            title={filters.genre.join(", ")} // Native tooltip for long selections
          >
            {filters.genre.length > 0 ? filters.genre.join(", ") : "All Genres"}
          </span>
          <span className="ml-2">▾</span>
        </div>

        {/* Multi-select Genre Menu */}
        {genreOpen && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-midnight-light rounded-lg max-h-60 overflow-auto z-10">
            {genres.map((genre) => {
              const isSelected = filters.genre.includes(genre);
              const isAllGenres = genre === "All Genres";

              return (
                <li
                  key={genre}
                  className={`p-2 cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500/50 text-gray-200"
                  }`}
                  onClick={() => {
                    if (isAllGenres) {
                      onChange("genre", []);  // Reset selection
                    } else {
                      // Toggle genre in selection array
                      const newGenres = isSelected
                        ? filters.genre.filter((g) => g !== genre)
                        : [...filters.genre, genre];
                      onChange("genre", newGenres);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    {genre}
                    {isSelected && !isAllGenres && <span>✓</span>}
                  </div>
                </li>
              );
            })}
            {/* Sticky Close Button for better UX on long lists */}
            <li
              className="sticky bottom-0 bg-midnight p-2 border-t border-gray-600 text-center bg-orange-600 hover:bg-orange-700 font-bold cursor-pointer transition-colors"
              onClick={() => setGenreOpen(false)}
            >
              Apply Filters
            </li>
          </ul>
        )}
      </div>

      {/* --- YEAR FILTER --- */}
      <label className="text-white text-lg">Year:</label>
      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={() => {
            setYearOpen(!yearOpen);
            setGenreOpen(false); // Close other menus to avoid UI overlap
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none flex items-center justify-between"
        >
          <span
            className="truncate whitespace-nowrap overflow-hidden block"
            title={
              filters.year.length > 0
                ? filters.year.map(String).join(", ")
                : "All Years"
            }
          >
            {filters.year.length > 0 ? filters.year.join(", ") : "All Years"}
          </span>
          <span className="ml-2">▾</span>
        </div>
        
        {yearOpen && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-midnight-light rounded-lg max-h-60 overflow-auto z-10">
            {years.map((year) => {
              const isSelected = filters.year.includes(year);
              const isAllYears = year === "All Years";
              return (
                <li
                  key={year}
                  className={`p-2 cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500/50 text-gray-200"
                  }`}
                  onClick={() => {
                    if (isAllYears) {
                      onChange("year", []);
                    } else {
                      const newYears = isSelected
                        ? filters.year.filter((y) => y !== year)
                        : [...filters.year, year];
                      onChange("year", newYears);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    {year}
                    {isSelected && !isAllYears && <span>✓</span>}
                  </div>
                </li>
              );
            })}
            <li
              className="sticky bottom-0 bg-midnight p-2 border-t border-gray-600 text-center bg-orange-600 hover:bg-orange-700 font-bold cursor-pointer transition-colors"
              onClick={() => setYearOpen(false)}
            >
              Apply Filters
            </li>
          </ul>
        )}
      </div>

      {/* --- TEXT SEARCH INPUT --- */}
      <div className="relative flex-1 ml-6">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-sm"></i>
        </div>
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-2 pl-10 pr-10 bg-midnight-light text-white placeholder-white/70 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={filters.query}
          onChange={(e) => onChange("query", e.target.value)}
          onFocus={() => {
            // Auto-close any open dropdown when typing
            setGenreOpen(false);
            setYearOpen(false);
            setSortOpen(false);
          }}
        />
        {/* Clear Search Button - Visible only when query exists */}
        {filters.query && (
          <button
            onClick={() => onChange("query", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-orange-400 transition-colors cursor-pointer"
            type="button"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* --- SORTING OPTIONS --- */}
      <div className="relative">
        <div
          onClick={() => {
            setSortOpen(!sortOpen);
            setYearOpen(false);
            setGenreOpen(false);
          }}
          className="p-2 bg-midnight-light text-white border-2 border-orange-400 rounded-lg cursor-pointer w-36 text-left focus:outline-none"
        >
          <span className="text-white text-xs block">
            Sort by:{" "}
            {sortOptions.find((o) => o.value === filters.sortBy)?.label ||
              "Default"}
          </span>
        </div>

        {sortOpen && (
          <ul className="absolute right-0 top-full mt-1 w-full bg-midnight-light rounded-lg border border-gray-600 shadow-xl z-20">
            {sortOptions.map((opt) => (
              <li
                key={opt.value}
                className="p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors"
                onClick={() => {
                  onChange("sortBy", opt.value);
                  setSortOpen(false); // Close after selection
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
