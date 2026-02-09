from fastapi import APIRouter
from app.services.movie_service import get_movies
from app.recommender.similarity import get_similar_movies

# Define the API router for movies
router = APIRouter(
    prefix="/movies",
    tags=["movies"]
)

@router.get("/")
def read_movies():
    df = get_movies()
    return df.to_dict(orient="records")

@router.get("/{movie_id}/recommendations")
def get_recommendations(movie_id: int):
    return get_similar_movies(movie_id, k=15)