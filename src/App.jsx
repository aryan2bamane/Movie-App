import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Loading = () => {
  return <p className="text-white">Loading...</p>;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage("Error fetching movies. Please try again later.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/hero-img.png" alt="hero img" />
            <h1>
              Find <span className="text-gradient">Movies</span>You'll Enjoy
              Without The Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500"> {errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <li key={movie.id} className="text-white">
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
