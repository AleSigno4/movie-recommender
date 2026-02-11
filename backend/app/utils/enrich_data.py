import pandas as pd
import requests
from tqdm import tqdm
from pathlib import Path
import time
import urllib3

# Warning disabled for unverified HTTPS requests since TMDb API is secure
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# CONFIGURATION
API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmE2N2MyYTRjMTE4MzYxYzNiMzI3NmRiMTI2NTk4ZSIsIm5iZiI6MTc3MDM3MTkwNi40NDQsInN1YiI6IjY5ODViYjQyZGI3N2IyZTk4YzZiNTcxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yETBI3prDZR7U1H-1TKPe7YX-CXezHIwAdq98aeivfo" 
BASE_URL = "https://api.themoviedb.org/3/movie/"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

# PATHS
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MOVIES_PATH = BASE_DIR / "data" / "cleaned" / "movies.csv"
LINKS_PATH = BASE_DIR / "data" / "cleaned" / "links.csv"
OUTPUT_PATH = BASE_DIR / "data" / "cleaned" / "movies_enriched.csv"

# Function to fetch poster URL and overview from TMDb API
def fetch_tmdb_details(tmdb_id):
    # CORRETTO: Ritorna 3 valori (aggiunto un None)
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
    except:
        return None, None, None

def main():
    print("Caricamento file CSV...")
    if not MOVIES_PATH.exists() or not LINKS_PATH.exists():
        print("Errore: movies.csv o links.csv mancanti!")
        return

    movies_df = pd.read_csv(MOVIES_PATH)
    links_df = pd.read_csv(LINKS_PATH)

    df = movies_df.merge(links_df[['movieId', 'tmdbId']], on='movieId', how='left')

    print(f"--- Inizio arricchimento di {len(df)} film ---")
    
    posters = []
    runtimes = []
    overviews = []

    # Processing each movie to fetch poster URL and overview
    for tmdb_id in tqdm(df['tmdbId'], desc="Scaricamento dati TMDb"):
        p_url, run, desc = fetch_tmdb_details(tmdb_id)
        posters.append(p_url)
        runtimes.append(run)
        overviews.append(desc)
        time.sleep(0.05) 

    df['poster_url'] = posters
    df['runtime'] = runtimes
    df['overview'] = overviews
    
    df.rename(columns={'tmdbId': 'tmdb_id'}, inplace=True)

    # Saving enriched dataset
    df.to_csv(OUTPUT_PATH, index=False)
    print(f"\n--- Completato con successo! ---")
    print(f"Dataset arricchito salvato in: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()