class Movie():
    def __init__(self, id: int, title: str, genres: list, url: str, year: int, rating: float):
        self.id = id
        self.title = title
        self.genres = genres
        self.poster_url = url
        self.year = year
        self.rating = rating
    