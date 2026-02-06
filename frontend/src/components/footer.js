export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center p-4 mt-8">
      <p>&copy; 2024 Film Finder — Personal Project. All rights reserved.</p>
      <p className="mt-1">
        Built with Next.js · Tailwind CSS · FastAPI
      </p>

      <p className="mt-1">
        <a href="https://github.com/AleSigno4/movie-recommender" className="hover:text-white">
          GitHub
        </a>{" "}
        ·{" "}
        <a href="https://www.linkedin.com/in/alessandro-signori-ba7294307/" className="hover:text-white">
          LinkedIn
        </a>{" "}
        · Data from TMDB
      </p>

      <p className="mt-2 text-xs opacity-60">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}