import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from app.services.movie_service import get_movies # Importiamo la funzione che calcola i rating

def get_similar_movies(movie_id: int, k: int = 5):
    # 1. Recuperiamo i film già calcolati e puliti dal service
    # Questo DF ha già: avg_rating, year e genres puliti
    df = get_movies()

    # 2. Identifichiamo le colonne dei generi per la similarità
    # Poiché get_movies() restituisce solo colonne specifiche, 
    # carichiamo il DF originale solo per le feature binarie (0/1)
    from app.utils.data_loader import load_movies_csv
    full_df = load_movies_csv()
    
    # Identifichiamo le colonne binarie (Fantasy, Action, etc.)
    metadata_cols = [
        'movieId', 'title', 'genres', 'tmdb_id', 'poster_url', 
        'overview', 'year', 'imdbId'
    ]
    genre_columns = [col for col in full_df.columns if col not in metadata_cols]

    # Controllo esistenza film
    if movie_id not in df['movieId'].values:
        return []
    
    # 3. Preparazione matrice (usando le colonne 0/1 del file completo)
    genre_matrix = full_df[genre_columns].fillna(0).values
    
    # Troviamo l'indice del film target nel file originale
    target_idx = full_df.index[full_df['movieId'] == movie_id][0]
    target_vector = genre_matrix[target_idx].reshape(1, -1)
    
    # Calcolo similarità
    sim_scores = cosine_similarity(target_vector, genre_matrix).flatten()
    
    # 4. Punteggio Combinato (Similarità + Rating)
    # Ora df['avg_rating'] esiste perché viene dal service!
    # Riportiamo i rating nell'ordine del full_df se necessario, 
    # ma se i file sono allineati basta questo:
    ratings = df['avg_rating'].fillna(0).values
    combined_scores = sim_scores + (ratings / 50)
    
    # Escludiamo il film target
    combined_scores[target_idx] = -1
    
    # Top k
    top_indices = combined_scores.argsort()[::-1][:k]
    
    # Restituiamo i dati pronti per il frontend
    return df.iloc[top_indices].to_dict(orient='records')