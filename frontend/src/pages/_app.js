import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Movie Recommender</title>
        <meta name="description" content="Discover your next favorite movie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
