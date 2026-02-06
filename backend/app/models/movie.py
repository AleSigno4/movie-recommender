from pydantic import BaseModel
from typing import List

class Movie(BaseModel):
    id: int
    title: str
    genres: List[str]
    poster_url: str
    year: int
    rating: float
    description: str
