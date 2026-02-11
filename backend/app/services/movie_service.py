from app.utils.data_loader import load_movies_csv, load_ratings_csv
import pandas as pd
import ast

def get_movies():
    # Load movies data
    movies_df = load_movies_csv()

    # Enrich data with avg rating and clean year and title
    if 'avg_rating' not in movies_df.columns:
        ratings_df = load_ratings_csv()
        avg_ratings = ratings_df.groupby("movieId")["rating"].mean().round(1).reset_index()
        movies_df = movies_df.merge(avg_ratings, on="movieId", how="left")
        movies_df.rename(columns={"rating": "avg_rating"}, inplace=True)
        movies_df["year"] = movies_df["title"].str.extract(r"\((\d{4})\)$").fillna(0).astype(int)
        movies_df["title"] = movies_df["title"].str.replace(r"\s*\(\d{4}\)$", "", regex=True)

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

    # Select only the columns we need and handle missing values
    cols_to_keep = [
        'movieId', 'title', 'genres', 'year', 
        'avg_rating', 'poster_url', 'runtime', 'overview', 'tmdb_id'
    ]

    movies_df = movies_df.astype(object).where(pd.notnull(movies_df), None)
    
    return movies_df[cols_to_keep]
