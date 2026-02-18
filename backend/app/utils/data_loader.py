from pathlib import Path
import pandas as pd

# Define the root directory of the project for absolute path resolution
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Centralized paths to cleaned datasets
MOVIES_PATH = BASE_DIR / "data" / "cleaned" / "movies_enriched.csv"
RATINGS_PATH = BASE_DIR / "data" / "cleaned" / "ratings.csv"

def load_movies_csv():
    """
    Loads the enriched movies dataset.
    Raises: FileNotFoundError if the enrichment script has not been run yet.
    """
    if not MOVIES_PATH.exists():
        raise FileNotFoundError(f"File not found: {MOVIES_PATH}. Please run the enrichment script first!")
    return pd.read_csv(MOVIES_PATH)

def load_ratings_csv():
    """
    Loads the user ratings dataset.
    Used for calculating average scores and popularity metrics.
    """
    if not RATINGS_PATH.exists():
        raise FileNotFoundError(f"File not found: {RATINGS_PATH}.")
    return pd.read_csv(RATINGS_PATH)
