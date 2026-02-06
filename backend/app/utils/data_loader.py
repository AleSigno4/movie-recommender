from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent.parent

MOVIES_PATH = BASE_DIR / "data" / "cleaned" / "movies_enriched.csv"
RATINGS_PATH = BASE_DIR / "data" / "cleaned" / "ratings.csv"

def load_movies_csv():
    if not MOVIES_PATH.exists():
        raise FileNotFoundError(f"File non trovato: {MOVIES_PATH}. Esegui prima lo script di enrichment!")
    return pd.read_csv(MOVIES_PATH)

def load_ratings_csv():
    if not RATINGS_PATH.exists():
        raise FileNotFoundError(f"File non trovato: {RATINGS_PATH}.")
    return pd.read_csv(RATINGS_PATH)
