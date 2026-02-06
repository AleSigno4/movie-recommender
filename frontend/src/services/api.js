// Function to fetch movies from the backend API
export async function getMovies() {
  try {
    const response = await fetch("http://127.0.0.1:8000/movies/");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}
