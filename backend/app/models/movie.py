from pydantic import BaseModel

# Define the Movie model
class Movie(BaseModel):
    id: int
    title: str
    genres: str
    poster_url: str
    year: int
    rating: float
    minutes: int
    description: str
