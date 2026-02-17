import { useState } from "react";

export default function SearchBar({ genres, years, filters, onChange }) {
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
      {/* Genre */}
      <label className="text-white text-lg">Genre:</label>
      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={() => {
            setGenreOpen(!genreOpen);
            setYearOpen(false);
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none flex items-center justify-between"
        >
          <span
            className="truncate whitespace-nowrap overflow-hidden block"
            title={filters.genre.join(", ")}
          >
            {filters.genre.length > 0 ? filters.genre.join(", ") : "All Genres"}
          </span>
          <span className="ml-2">▾</span>
        </div>

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
                      onChange("genre", []);
                    } else {
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
            <li
              className="sticky bottom-0 bg-midnight p-2 border-t border-gray-600 text-center bg-orange-600 hover:bg-orange-700 font-bold cursor-pointer transition-colors"
              onClick={() => setGenreOpen(false)}
            >
              Apply Filters
            </li>
          </ul>
        )}
      </div>

      {/* Year */}
      <label className="text-white text-lg">Year:</label>
      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={() => {
            setYearOpen(!yearOpen);
            setGenreOpen(false);
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none flex items-center justify-between"
        >
          <span
            className="truncate whitespace-nowrap overflow-hidden block"
            title={filters.year.length > 0 ? filters.year.map(String).join(", ") : "All Years"}
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

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for a movie..."
        className="flex-1 p-2 bg-midnight-light text-white placeholder-white/70 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ml-6"
        value={filters.query}
        onChange={(e) => onChange("query", e.target.value)}
        onFocus={() => {
          setGenreOpen(false);
          setYearOpen(false);
        }}
      />

      {/* Order filter */}
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
                  setSortOpen(false);
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
