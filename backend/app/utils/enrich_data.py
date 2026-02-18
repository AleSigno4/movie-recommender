import pandas as pd
import requests
from tqdm import tqdm
from pathlib import Path
import time
import urllib3
import re
import os
from dotenv import load_dotenv

# Disable warnings for unverified HTTPS requests (common when testing TMDb locally)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# API Configuration
load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")
if not API_KEY:
    raise ValueError("Missing TMDB_API_KEY! Please check your .env file.")

BASE_URL = "https://api.themoviedb.org/3/movie/"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

# Path Setup
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MOVIES_PATH = BASE_DIR / "data" / "cleaned" / "movies.csv"
LINKS_PATH = BASE_DIR / "data" / "cleaned" / "links.csv"
RATINGS_PATH = BASE_DIR / "data" / "cleaned" / "ratings.csv"
OUTPUT_PATH = BASE_DIR / "data" / "cleaned" / "movies_enriched.csv"

def clean_title_and_year(title):
    """
    Extracts the release year from movie titles formatted as 'Title (YYYY)'.
    Returns: (Cleaned Title, Integer Year)
    """
    title = str(title).strip()
    match = re.search(r'\((\d{4})\)\s*$', title)
    if match:
        year = int(match.group(1))
        # Remove the year from the title for cleaner UI display
        clean_title = re.sub(r'\s*\((\d{4})\)\s*$', '', title).strip()
        return clean_title, year
    return title, 0

def fetch_tmdb_details(tmdb_id):
    """
    Calls the TMDb API to fetch additional metadata: poster_url, runtime, and overview.
    Uses Bearer token authentication.
    """
    if pd.isna(tmdb_id) or tmdb_id == 0:
        return None, None, None
    
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    params = {"language": "en-US"}
    
    try:
        response = requests.get(
            f"{BASE_URL}{int(tmdb_id)}", 
            headers=headers, 
            params=params, 
            timeout=5,
            verify=False
        )
        if response.status_code == 200:
            data = response.json()
            p_path = data.get('poster_path')
            poster_url = f"{IMAGE_BASE_URL}{p_path}" if p_path else None
            minutes = data.get('runtime')
            overview = data.get('overview')
            return poster_url, minutes, overview
        
        return None, None, None
    except requests.exceptions.RequestException:
        return None, None, None

def main():
    """
    Orchestrates the data enrichment process:
    1. Aggregates average user ratings.
    2. Merges movie, link, and rating data.
    3. Cleans metadata and fetches external details via API.
    4. Saves the final 'enriched' dataset.
    """
    print("Loading CSV files...")
    if not MOVIES_PATH.exists() or not LINKS_PATH.exists():
        print("Error: Essential CSV files are missing!")
        return

    movies_df = pd.read_csv(MOVIES_PATH)
    links_df = pd.read_csv(LINKS_PATH)
    ratings_df = pd.read_csv(RATINGS_PATH)

    # Calculate mean ratings per movie
    print("Calculating average ratings...")
    avg_ratings = ratings_df.groupby("movieId")["rating"].mean().round(1).reset_index()
    avg_ratings.rename(columns={"rating": "avg_rating"}, inplace=True)
    
    # Merge datasets
    df = movies_df.merge(links_df[['movieId', 'tmdbId']], on='movieId', how='left')
    df = df.merge(avg_ratings, on='movieId', how='left')

    # Data Cleaning
    print("Cleaning titles and extracting release years...")
    temp_titles_years = df['title'].apply(clean_title_and_year)
    df['title'] = [t[0] for t in temp_titles_years]
    df['year'] = [t[1] for t in temp_titles_years]

    print(f"--- Starting enrichment for {len(df)} movies ---")
    
    posters, runtimes, overviews = [], [], []

    # API Loop with progress bar (tqdm)
    for tmdb_id in tqdm(df['tmdbId'], desc="Scaricamento dati TMDb"):
        p_url, run, desc = fetch_tmdb_details(tmdb_id)
        posters.append(p_url)
        runtimes.append(run)
        overviews.append(desc)
        # Rate-limiting compliance
        time.sleep(0.05) 

    df['poster_url'] = posters
    df['runtime'] = runtimes
    df['overview'] = overviews
    df.rename(columns={'tmdbId': 'tmdb_id'}, inplace=True)

    # Save final output
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"\n--- Process completed successfully! ---")
    print(f"Dataset enriched and saved to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()