from app.utils.data_loader import load_movies_csv, load_ratings_csv
import pandas as pd
import ast

def get_movies():
    # Load movies data
    movies_df = load_movies_csv()

    # Clean genres: transform stringified lists into pipe-separated strings
    def clean_genres(x):
        if pd.isna(x): return ""
        try:
            if isinstance(x, str) and x.startswith('['):
                lista_generi = ast.literal_eval(x)
                return "|".join(lista_generi)
            return str(x)
        except:
            return str(x)

    movies_df['genres'] = movies_df['genres'].apply(clean_genres)

    movies_df['tmdb_id'] = movies_df['tmdb_id'].fillna(0).astype(int)
    movies_df['runtime'] = movies_df['runtime'].fillna(0).astype(int)
    movies_df['year'] = movies_df['year'].fillna(0).astype(int)

    movies_df['avg_rating'] = movies_df['avg_rating'].fillna(0.0)
    
    movies_df = movies_df.where(pd.notnull(movies_df), None)

    # Select only the columns we need and handle missing values
    cols_to_keep = [
        'movieId', 'title', 'genres', 'year', 
        'avg_rating', 'poster_url', 'runtime', 'overview', 'tmdb_id'
    ]
    
    return movies_df[cols_to_keep]
