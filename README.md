# Film Finder: Full-Stack Recommendation System

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)

A full-stack movie discovery platform that combines a **Next.js** frontend with a **FastAPI** backend and a **Data Science** engine. This project demonstrates a complete end-to-end pipeline: from raw data cleaning and API-based enrichment to a modern, responsive user interface.

## Key Features

### Backend & Data Science
* **Hybrid Recommendation Engine**: Uses **Cosine Similarity** on genre vectors combined with a popularity bias (average ratings).
* **Automated Data Enrichment**: Custom Python scripts to fetch high-resolution posters, runtimes, and overviews via **TMDb API**.
* **Clean Data Pipeline**: Comprehensive preprocessing of the MovieLens dataset using **Pandas**.
* **API Documentation**: Built with FastAPI, featuring auto-generated Swagger documentation at `/docs`.

### Frontend & UX
* **Infinite Scrolling**: Efficiently handles large datasets by loading movies in chunks as the user scrolls.
* **Dynamic Filtering**: Real-time client-side filtering by title, genre, and release year.
* **Interactive Details Page**: A dynamic routing system (`/movies/[id]`) showing deep-dive metadata and a custom-built recommendation carousel.
* **Skeleton Loading**: Professional "Skeleton" placeholders to prevent layout shift during data fetching.
* **Midnight UI**: A custom-designed dark theme using **Tailwind CSS** with glassmorphism effects and smooth transitions.

## Tech Stack

| Area | Technologies |
| :--- | :--- |
| **Frontend** | Next.js, React 19, Tailwind CSS, FontAwesome |
| **Backend** | Python 3.x, FastAPI, Uvicorn, Pydantic |
| **Data Science** | Pandas, Scikit-Learn, NumPy, Matplotlib, Seaborn |
| **Tools** | TMDb API, Pathlib, Regex, Jupyter Notebooks |

## Project Architecture

```text
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI Routers (Endpoints)
│   │   ├── models/       # Pydantic Schemas
│   │   ├── recommender/  # Cosine Similarity Engine
│   │   └── services/     # Data cleaning & business logic
│   ├── data/             # Raw & Enriched CSV datasets
│   └── notebooks/        # EDA & Preprocessing insights
└── frontend/
    ├── src/components/   # Reusable UI (Cards, Skeletons, SearchBar)
    ├── src/pages/        # Next.js Pages & Dynamic Routes
    └── src/services/     # API integration (Fetch client)
    └── src/styles/       # CSS global styles
```

## Getting Started

### 1. Initial Data Setup (Mandatory)
Since large datasets and local configurations are excluded from the repository, follow these steps to initialize the data:
1. Create a `backend/data/raw/` folder and place the MovieLens `movies.csv` and `ratings.csv` inside.
2. Ensure you have a **TMDb API Key** configured in your environment variables.
3. Run the enrichment script to generate the final dataset:
   ```bash
   python -m app.utils.enrich_data
   ```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate  
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` to explore the app.

## Data Exploration & Engineering
The project includes Jupyter Notebooks in the `backend/notebooks` folder that showcase:
* **EDA**: Visualizing genre distribution and rating trends.
* **Feature Engineering**: The process of transforming categorical genres into binary feature vectors for the recommender.

## License
This project is licensed under the MIT License. Created by Alessandro Signori.
