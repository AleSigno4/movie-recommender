# Movie Recommender Web App

A modern, responsive movie discovery platform built with **Next.js** and **Tailwind CSS**. This application allows users to browse a library of films, view detailed information, and receive personalized movie recommendations powered by a dedicated backend.

## 🚀 Features

* **Dynamic Movie Gallery**: Browse an extensive collection of movies with high-quality posters and metadata.
* **Interactive Movie Details**: Detailed view for each film including overview, release year, genres, and ratings.
* **Smart Recommendations Carousel**: 
    * Horizontal scrolling "window" for similar titles.
    * Interactive navigation arrows with backdrop-blur effects.
    * "Snap-center" alignment for a premium feel.
* **Optimized UX**:
    * **Dynamic Loading States**: Prevents layout flickering during navigation.
    * **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
    * **Hover Animations**: Smooth scaling effects and overview reveals on movie cards.
* **Standardized UI**: Fixed-ratio posters and title alignment to ensure a clean, symmetrical layout regardless of content length.

## 🛠️ Tech Stack

* **Frontend**: [Next.js](https://nextjs.org/) (React)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
* **API**: Integration with a Python/FastAPI backend via Fetch API.

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/movie-recommender-web.git](https://github.com/your-username/movie-recommender-web.git)
    cd movie-recommender-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Endpoint:**
    Ensure your backend is running. The app connects to:
    -   `http://localhost:8000/movies` for the general list.
    -   `http://localhost:8000/movies/{id}/recommendations` for suggestions.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```text
├── components/
│   ├── Header.js         # Navigation and Logo
│   ├── Footer.js         # Site footer
│   └── MovieCard.js      # Reusable card with hover effects and standardized layout
├── pages/
│   ├── index.js          # Main landing page (Movie Grid)
│   └── movies/
│       └── [movieId].js  # Dynamic route for movie details & recommendations
├── services/
│   └── api.js            # Fetch logic for movie data
└── styles/
    └── globals.css       # Custom scrollbar-hide and global styles
```

## 🎨 Design Notes
* **Midnight Theme**: A custom deep dark-mode palette for better contrast.
* **Glassmorphism**: Use of backdrop-blur and semi-transparent backgrounds for a modern UI.
* **Custom Utilities**: Implementation of scrollbar-hide for a cleaner carousel look without losing scroll functionality.

## 📝 License
This project is licensed under the MIT License.
