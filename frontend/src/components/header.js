import Link from "next/link";

export default function Header() {
  return (
    <Link href="/">
      <div className="flex mb-0">
        <i className="fas fa-film fa-3x text-orange-400 m-5"></i>
        <h1 className="text-4xl font-bold text-orange-400 my-5 mx-0">Film<span className="text-white">Finder</span></h1>
      </div>
    </Link>
  );
}
