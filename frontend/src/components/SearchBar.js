import { useState } from "react";

export default function SearchBar() {
  const genres = ["All Genres", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];
  const years = ["All Years", "2026", "2025", "2024", "2023", "2022"];
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [genreOpen, setGenreOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4 my-5 mt-2 mx-12">
      {/* Label */}
      <label className="text-white text-lg">Genre:</label>

      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={() => {
            setGenreOpen(!genreOpen);
            setYearOpen(false);
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {selectedGenre}
        </div>

        {genreOpen && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-midnight-light rounded-lg max-h-40 overflow-auto z-10">
            {genres.map((genre) => (
              <li
                key={genre}
                className="p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-200"
                onClick={() => {
                  setSelectedGenre(genre);
                  setGenreOpen(false);
                }}
              >
                {genre}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Label */}
      <label className="text-white text-lg">Year:</label>

      {/* Dropdown */}
      <div className="relative">
        <div
          onClick={() => {
            setYearOpen(!yearOpen);
            setGenreOpen(false);
          }}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 text-left focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {selectedYear}
        </div>

        {yearOpen && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-midnight-light rounded-lg backdrop-blur-md max-h-40 overflow-auto z-10">
            {years.map((year) => (
              <li
                key={year}
                className="p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-200"
                onClick={() => {
                  setSelectedYear(year);
                  setYearOpen(false);
                }}
              >
                {year}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input di ricerca */}
      <input
        type="text"
        placeholder="Search for a movie..."
        className="flex-1 p-2 bg-midnight-light text-white placeholder-white/70 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ml-6"
        onClick={() => {
                  setGenreOpen(false);
                  setYearOpen(false);
                }}
      />
    </div>
  );
}
