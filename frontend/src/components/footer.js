/** 
 * Footer component with copyright and credits
 */ 

export default function Footer() {
  return (
    <footer className="mt-8 bg-gray-900 p-4 text-center text-gray-400">
      <p>&copy; 2024 Film Finder — Personal Project. All rights reserved.</p>
      <p className="mt-1">
        Built with Next.js · Tailwind CSS · FastAPI
      </p>

      <p className="mt-1">
        <a 
          href="https://github.com/AleSigno4/movie-recommender" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        {" · "}
        <a 
          href="https://www.linkedin.com/in/alessandro-signori-ba7294307/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        {" · "}
        Data from TMDB
      </p>

      {/* TMDB API credit as required by their terms of use */ }
      <p className="mt-2 text-xs opacity-60">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}