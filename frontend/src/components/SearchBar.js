/**
 * SearchBar Component
 * Provides multi-select filters for Genre and Year, a text search input, and a dropdown for sorting results.
 */
import { use, useState, useRef, useEffect } from "react";
import DropdownFilter from "./DropdownFilter";
import useClickOutside from "../hooks/useClickOutside";

export default function SearchBar({ genres, years, filters, onChange }) {
  // Local state to manage dropdown visibility
  const [sortOpen, setSortOpen] = useState(false);

  // Ref for detecting clicks outside the sort dropdown
  const sortRef = useRef(null);

  useClickOutside(sortRef, () => setSortOpen(false));
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
      <DropdownFilter label="Genre" options={genres} selected={filters.genre} onChange={(newGenre) => onChange("genre", newGenre)} placeholder="All Genres" />

      {/* --- YEAR FILTER --- */}
      <DropdownFilter label="Year" options={years} selected={filters.year} onChange={(newYear) => onChange("year", newYear)} placeholder="All Years" />


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
      <div className="relative" ref={sortRef}>
        <div
          onClick={() => {
            setSortOpen(!sortOpen);
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
