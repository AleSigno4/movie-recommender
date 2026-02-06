from fastapi import FastAPI
from app.api import movies

app = FastAPI()

app.include_router(movies.router)
