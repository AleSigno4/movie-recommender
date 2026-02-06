import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

# Caricamento del dataset arricchito all'avvio del modulo
# In produzione, questo avviene una sola volta, rendendo l'API velocissima
DATA_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "cleaned" / "movies_enriched.csv"

if not DATA_PATH.exists():
    raise FileNotFoundError(f"Il file {DATA_PATH} non esiste. Esegui prima lo script di enrichment!")

MOVIES_DF = pd.read_csv(DATA_PATH)

def get_similar_movies(movie_id: int, k: int = 5):
    """
    Dato un ID film, restituisce i k film più simili basandosi sui generi.
    """
    input_file = "../data/cleaned/movies.csv"
    movies_df = pd.read_csv(input_file)

    # Retrieve genre columns
    non_genre_cols = ['movieId', 'title', 'genres']
    genre_columns = [col for col in movies_df.columns if col not in non_genre_cols]

    if movie_id not in movies_df['movieId'].values:
        raise ValueError(f"Movie ID {movie_id} not found in the dataset.")
    
    # Usiamo la variabile globale caricata all'inizio
    df = MOVIES_DF

    # 1. Identifichiamo le colonne dei generi (escludendo i metadati)
    # Aggiungiamo tutte le colonne che NON sono feature binarie (0/1) dei generi
    non_genre_cols = [
        'movieId', 'title', 'genres', 'tmdb_id', 'imdbId', 
        'year', 'poster_url', 'overview', 'avg_rating'
    ]
    genre_columns = [col for col in df.columns if col not in non_genre_cols]

    # Controllo esistenza film
    if movie_id not in df['movieId'].values:
        return {"error": f"Movie ID {movie_id} non trovato."}
    
    # 2. Preparazione matrice e calcolo similarità
    genre_matrix = df[genre_columns].values
    
    # Troviamo l'indice posizionale del film target
    target_index = df.index[df['movieId'] == movie_id][0] 
    target_vector = genre_matrix[target_index].reshape(1, -1)
    
    # Calcolo similarità del coseno tra il target e tutti gli altri
    similarities = cosine_similarity(target_vector, genre_matrix).flatten()
    
    # Escludiamo il film stesso impostando la sua similarità al valore minimo
    similarities[target_index] = -1
    
    # Prendiamo i k indici con il punteggio più alto
    top_indices = similarities.argsort()[::-1][:k]

    # 3. Estrazione dei risultati con i nuovi metadati
    # Selezioniamo le colonne utili per il frontend
    result_columns = ['movieId', 'title', 'year', 'poster_url', 'overview', 'avg_rating']
    top_movies = df.iloc[top_indices][result_columns]

    return top_movies.to_dict(orient='records')
