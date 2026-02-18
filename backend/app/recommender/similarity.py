import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from app.services.movie_service import get_movies
from app.utils.data_loader import load_movies_csv

def get_similar_movies(movie_id: int, k: int = 15):
    """
    Computes movie recommendations based on content similarity and popularity.
    
    Args:
        movie_id (int): ID of the movie to find similarities for.
        k (int): Number of recommendations to return.
        
    Returns:
        list: A list of movie records in dictionary format.
    """

    # 1. Fetch pre-processed movies (with avg_rating, years, etc.)
    df = get_movies()

    # 2. Fetch the full dataset containing one-hot encoded genre columns
    full_df = load_movies_csv()
    
    # Identify binary genre columns for similarity calculation (excluding metadata)
    metadata_cols = [
        'movieId', 'title', 'genres', 'tmdb_id', 'poster_url', 
        'overview', 'year', 'imdbId'
    ]
    genre_columns = [col for col in full_df.columns if col not in metadata_cols]

    # Validate movie existence
    if movie_id not in df['movieId'].values:
        return []
    
    # 3. Content-Based Filtering: Cosine Similarity
    # Build the feature matrix using binary genre vectors
    genre_matrix = full_df[genre_columns].fillna(0).values
    
    # Identify the target movie index and feature vector
    target_idx = full_df.index[full_df['movieId'] == movie_id][0]
    target_vector = genre_matrix[target_idx].reshape(1, -1)
    
    # Compute similarity between the target movie and all others in the database
    sim_scores = cosine_similarity(target_vector, genre_matrix).flatten()
    
    # 4. Hybrid Scoring Logic: Combined Similarity + Normalized Rating
    # Adding a small popularity bias (avg_rating / 50) to the similarity score.
    # This ensures that among similar movies, the higher-rated ones surface first.
    ratings = df['avg_rating'].fillna(0).values
    combined_scores = sim_scores + (ratings / 50)
    
    # Exclude the target movie itself from results
    combined_scores[target_idx] = -1
    
    # 5. Result Extraction
    # Get the indices of the top-k scores
    top_indices = combined_scores.argsort()[::-1][:k]
    
    # Return results as a list of dictionaries for API response
    return df.iloc[top_indices].to_dict(orient='records')