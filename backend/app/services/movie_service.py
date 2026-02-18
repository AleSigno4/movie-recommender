from app.utils.data_loader import load_movies_csv
import pandas as pd
import ast

def get_movies():
    """
    Retrieves, cleans, and formats the movie dataset.
    Performs data type conversion and genre string normalization 
    to ensure consistency for the frontend and recommender.
    """
    # Load raw movies data from CSV
    movies_df = load_movies_csv()

    # Helper function to normalize genre formatting
    def clean_genres(x):
        """
        Converts genres from stringified Python lists (e.g., "['Action', 'Sci-Fi']")
        or raw strings into a standardized pipe-separated format ("Action|Sci-Fi").
        """
        if pd.isna(x): return ""
        try:
            # Check if the genre field is a string representation of a list
            if isinstance(x, str) and x.startswith('['):
                genre_list = ast.literal_eval(x)
                return "|".join(genre_list)
            return str(x)
        except (ValueError, SyntaxError):
            # Fallback in case of malformed strings
            return str(x)
        
    # Apply genre cleaning
    movies_df['genres'] = movies_df['genres'].apply(clean_genres)

    # Standardize data types and handle missing values (NaN)
    # Using 0/0.0 as defaults for numeric fields to prevent frontend rendering issues
    movies_df['tmdb_id'] = movies_df['tmdb_id'].fillna(0).astype(int)
    movies_df['runtime'] = movies_df['runtime'].fillna(0).astype(int)
    movies_df['year'] = movies_df['year'].fillna(0).astype(int)
    movies_df['avg_rating'] = movies_df['avg_rating'].fillna(0.0)
    
    # Replace remaining NaN with None for JSON compatibility (converts to 'null' in JavaScript)
    movies_df = movies_df.where(pd.notnull(movies_df), None)

    # Select and order final columns for API delivery
    cols_to_keep = [
        'movieId', 'title', 'genres', 'year', 
        'avg_rating', 'poster_url', 'runtime', 'overview', 'tmdb_id'
    ]
    
    return movies_df[cols_to_keep]
