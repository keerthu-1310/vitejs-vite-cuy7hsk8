
import { useState } from "react";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A journey beyond the stars."
  },
  {
    id: 2,
    title: "The Notebook",
    genre: "Romance",
    year: 2004,
    rating: 7.8,
    image: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6e4hY.jpg",
    description: "A beautiful story of love."
  },
  {
    id: 3,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description: "Dreams within dreams."
  },
  {
    id: 4,
    title: "Finding Nemo",
    genre: "Animation",
    year: 2003,
    rating: 8.2,
    image: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    description: "An adventure under the sea."
  },
  {
    id: 5,
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    rating: 7.5,
    image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    description: "A terrifying supernatural story."
  },
  {
    id: 6,
    title: "La La Land",
    genre: "Romance",
    year: 2016,
    rating: 8.0,
    image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    description: "Music, dreams and love."
  },
  {
    id: 7,
    title: "Coco",
    genre: "Animation",
    year: 2017,
    rating: 8.4,
    image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    description: "A colourful musical adventure."
  },
  {
    id: 8,
    title: "A Quiet Place",
    genre: "Horror",
    year: 2018,
    rating: 7.5,
    image: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    description: "Stay quiet to survive."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = ["All", "Sci-Fi", "Romance", "Animation", "Horror"];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  const recommendations = selectedGenre
    ? movies.filter((movie) => movie.genre === selectedGenre)
    : [];

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="app">

      <header className="navbar">
        <h2>🎬 CineMatch</h2>
        <span>Discover your next favourite movie</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR PERSONAL MOVIE GUIDE</p>

        <h1>Find movies you'll love.</h1>

        <p>
          Explore movies and discover recommendations
          based on your favourite genre.
        </p>

        <input
          className="search"
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main>

        <section className="section">
          <h2>Explore Movies 🍿</h2>

          <div className="filters">
            {genres.map((item) => (
              <button
                key={item}
                className={genre === item ? "active" : ""}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>

                <div className="poster">
                  <img
                    src={movie.image}
                    alt={movie.title + " poster"}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>

                  <p>{movie.genre} · {movie.year}</p>

                  <p>⭐ {movie.rating}/10</p>

                  <p>{movie.description}</p>

                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(movie.id)}
                  >
                    {favorites.includes(movie.id)
                      ? "♥ Saved"
                      : "♡ Add to favourites"}
                  </button>
                </div>

              </article>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <p className="empty">
              No movies found. Try another search!
            </p>
          )}
        </section>

        <section className="section recommend">
          <h2>Get Recommendations ✨</h2>

          <p>
            Choose your favourite genre to discover
            matching movies.
          </p>

          <div className="filters">
            {genres.slice(1).map((item) => (
              <button
                key={item}
                className={
                  selectedGenre === item ? "active" : ""
                }
                onClick={() => setSelectedGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {recommendations.length > 0 && (
            <div className="recommend-result">
              <h3>Recommended for you</h3>

              {recommendations.map((movie) => (
                <div className="recommend-item" key={movie.id}>
                  <img src={movie.image} alt={movie.title} />
                  <div>
                    <strong>{movie.title}</strong>
                    <p>⭐ {movie.rating}/10 · {movie.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>My Favourites ❤️</h2>

          {favorites.length === 0 ? (
            <p>Your saved movies will appear here.</p>
          ) : (
            <div className="movie-grid">
              {movies
                .filter((movie) => favorites.includes(movie.id))
                .map((movie) => (
                  <article className="movie-card" key={movie.id}>
                    <div className="poster">
                      <img src={movie.image} alt={movie.title} />
                    </div>

                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p>⭐ {movie.rating}/10</p>

                      <button
                        className="favorite"
                        onClick={() => toggleFavorite(movie.id)}
                      >
                        ♥ Remove from favourites
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>

      </main>

      <footer>
        Made with ❤️ using React | CineMatch © 2026
      </footer>

    </div>
  );
}

export default App;
