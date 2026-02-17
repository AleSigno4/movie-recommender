/**
 * Fetches the full list of movies from the FastAPI backend.
 * @returns {Promise<Array>} A promise that resolves to the movie data array.
 * @throws Will throw an error if the network request fails or the server returns a non-200 status.
 */
export async function getMovies() {
  try {
    // Note: Using absolute URL for local development with FastAPI
    const response = await fetch("http://127.0.0.1:8000/movies/");

    // Check if the response status is in the range 200-299
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Logging the error for debugging while re-throwing it to allow the calling component to handle UI states (e.g., showing an error message)
    console.error("Error fetching movies:", error);
    throw error;
  }
}
