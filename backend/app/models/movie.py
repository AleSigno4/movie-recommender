from pydantic import BaseModel
from typing import List

# Define the Movie model
class Movie(BaseModel):
    id: int
    title: str
    genres: str
    poster_url: str
    year: int
    rating: float
    description: str
