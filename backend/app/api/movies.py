from fastapi import APIRouter
from app.services.movie_service import get_movies

# Define the API router for movies
router = APIRouter(
    prefix="/movies",
    tags=["movies"]
)

@router.get("/")
def read_movies():
    df = get_movies()
    return df.to_dict(orient="records")
