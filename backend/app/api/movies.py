from fastapi import APIRouter, HTTPException
from app.services.movie_service import get_movies
from app.recommender.similarity import get_similar_movies

# Define the API router for movie-related endpoints
router = APIRouter(
    prefix="/movies",
    tags=["movies"]
)

@router.get("/")
def read_movies():
    """
    Fetch the complete list of movies.
    Converts the internal DataFrame to a list of dictionaries for JSON response.
    """
    try:
        df = get_movies()
        # 'records' orientation returns a list of dictionaries: [{col: val}, ...]
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving movies: {str(e)}")

@router.get("/{movie_id}/recommendations")
def get_recommendations(movie_id: int):
    """
    Get top-K similar movies based on the provided movie_id.
    This triggers the recommendation engine logic.
    """
    try:
        recommendations = get_similar_movies(movie_id, k=15)
        if not recommendations:
            raise HTTPException(status_code=404, detail="Movie not found or no recommendations available")
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommender system error: {str(e)}")