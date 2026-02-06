from app.utils.data_loader import load_movies_csv, load_ratings_csv
import pandas as pd

def get_movies():
    # 1. Carichiamo il CSV arricchito
    movies_df = load_movies_csv()

    # 2. Se manca la media dei voti, calcoliamola
    if 'avg_rating' not in movies_df.columns:
        ratings_df = load_ratings_csv()
        avg_ratings = ratings_df.groupby("movieId")["rating"].mean().round(1).reset_index()
        movies_df = movies_df.merge(avg_ratings, on="movieId", how="left")
        movies_df.rename(columns={"rating": "avg_rating"}, inplace=True)
        movies_df["year"] = movies_df["title"].str.extract(r"\((\d{4})\)$").fillna(0).astype(int)
        movies_df["title"] = movies_df["title"].str.replace(r"\s*\(\d{4}\)$", "", regex=True)

    # 3. Selezioniamo solo le colonne utili al frontend
    cols_to_keep = [
        'movieId', 'title', 'genres', 'year', 
        'avg_rating', 'poster_url', 'overview', 'tmdb_id'
    ]

    movies_df = movies_df.astype(object).where(pd.notnull(movies_df), None)
    
    return movies_df[cols_to_keep]
