from fastapi import FastAPI
from app.api import movies
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI application
app = FastAPI(
    title="Film Finder API",
    description="Backend service for movie discovery and recommendations.",
    version="1.0.0"
)

# CORS (Cross-Origin Resource Sharing) Configuration
# This is essential to allow our Next.js frontend (running on port 3000) 
# to securely communicate with this FastAPI server.
app.add_middleware(
    CORSMiddleware,
    # In production, this should be replaced with the actual domain
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

# Registering API routes from the 'movies' router
app.include_router(movies.router)

@app.get("/")
def root():
    """
    Health check endpoint to verify the API is running correctly.
    """
    return {"status": "online", "message": "Film Finder API is operational"}
