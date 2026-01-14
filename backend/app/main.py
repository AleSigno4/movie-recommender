from fastapi import FastAPI, HTTPException
from recommender import get_similar_movies

app = FastAPI()

@app.get("/recommend/{movie_id}")
def recommend(movie_id: int, k: int = 5):
    try:
        return get_similar_movies(movie_id, k)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
