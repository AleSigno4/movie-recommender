import Link from "next/link";

/**
 * Header component that displays the logo and title of the application. It is a link that redirects to the home page when clicked.
 */

export default function Header() {
  return (
    <header className="w-full">
      <Link href="/" className="flex items-center w-fit group" aria-label="Back to Home">
        {/* Film icon from Font Awesome */}
        <i className="fas fa-film fa-3x text-orange-400 m-5 transition-transform group-hover:scale-110"></i>
        <h1 className="text-4xl font-bold text-orange-400 my-5">
          Film<span className="text-white">Finder</span>
        </h1>
      </Link>
    </header>
  );
}
