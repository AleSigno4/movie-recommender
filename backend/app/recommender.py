import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def get_similar_movies(movie_id: int, k: int):
    """
    Given a movie ID, return the top k similar movies based on similarity scores.
    Args:
        movie_id (int): The ID of the movie for which to find similar movies.
        k (int): The number of similar movies to return.
    Returns:
        List[int]: A list of movie IDs that are similar to the given movie ID.
    """

    input_file = "../data/cleaned/movies.csv"
    movies_df = pd.read_csv(input_file)
    links_df = pd.read_csv("../data/cleaned/links.csv")

    # Retrieve genre columns
    non_genre_cols = ['movieId', 'title', 'genres']
    genre_columns = [col for col in movies_df.columns if col not in non_genre_cols]

    if movie_id not in movies_df['movieId'].values:
        raise ValueError(f"Movie ID {movie_id} not found in the dataset.")
    
    # Compute cosine similarity matrix for the target movie and compare with all others
    genre_matrix = movies_df[genre_columns].values

    target_index = movies_df.index[movies_df['movieId'] == movie_id][0]
    target_vector = genre_matrix[target_index].reshape(1, -1)
    similarities = cosine_similarity(target_vector, genre_matrix).flatten()
    similarities[target_index] = -1
    top_indices = similarities.argsort()[::-1][:k]

    # Retrieve movieId and title for top k similar movies
    top_movies = movies_df.iloc[top_indices][['movieId', 'title']]

    # Merge with links_df to get tmdbId for the top movies
    top_movies_with_links = top_movies.merge(links_df[['movieId', 'tmdbId']], on='movieId', how='left')

    # Convert to list of dicts
    return top_movies.to_dict(orient='records')

# Example usage
print(get_similar_movies(1,5))

