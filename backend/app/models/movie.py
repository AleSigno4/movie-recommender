from pydantic import BaseModel, Field
from typing import Optional

class Movie(BaseModel):
    """
    Pydantic model representing a Movie object.
    Used for data validation and auto-generating OpenAPI schema documentation.
    """
    id: int = Field(..., description="The unique identifier of the movie")
    title: str = Field(..., description="The title of the movie")
    genres: str = Field(..., description="Pipe-separated list of genres (e.g., Action|Sci-Fi)")
    poster_url: str = Field(..., description="The URL of the movie's poster image")
    year: int = Field(..., description="The release year of the movie")
    rating: float = Field(..., description="Average rating of the movie (0.0 to 10.0)")
    minutes: int = Field(..., description="The duration of the movie in minutes")
    description: str = Field(..., description="A brief description of the movie")

    class Config:
        """
        Pydantic configuration.
        from_attributes=True (formerly orm_mode) allows the model to work 
        smoothly with ORMs or dictionary-like objects.
        """
        from_attributes = True
