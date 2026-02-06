import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="flex flex-wrap justify-start gap-4 mx-12">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <Footer />

    </>
  );
}
