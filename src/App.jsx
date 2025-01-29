import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovie, updateSearchCount } from "./appwrite";
import { SpeedInsights } from "@vercel/speed-insights/react";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingErrorMessage, settrendingErrorMessage] = useState("");
  const [trendingIsLoading, settrendingIsLoading] = useState(true);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage(
          "Wait bro... it's loading or may have lost the way while fetching! 😅"
        );
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      // throw new Error("HAHA!");
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(
        "Wait bro... it's loading or may have lost the way while getting Movies! 😅"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    settrendingIsLoading(true);
    settrendingErrorMessage("");
    try {
      const movies = await getTrendingMovie();
      // throw new Error("JUST KIDDING!");

      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error loadTrendingMovies!!", error);
      settrendingErrorMessage(
        "Wait bro... it's loading or may have lost the way! 😅"
      );
    } finally {
      settrendingIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className=" lg:flex justify-around items-start">
          {/*  */}
          <div className="hero lg:w-[45vw] lg:h-[100vh] lg:overflow-hidden">
            <header>
              <img src="/hero-img.png" alt="hero img" />
              <h1>
                Find <span className="text-gradient">Movies</span>You'll Enjoy
                Without The Hassle
              </h1>
            </header>
          </div>

          <div className="content lg:w-[55vw] lg:h-[100vh] lg:overflow-y-scroll flex-col justify-between items-start">
            {/* Search Field */}
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {trendingMovies.length > 0 && (
              <section className="mt-5 trending lg:w-[50vw] mx-5">
                <h2>Most Searched Movies</h2>
                <ul className="flex flex-row overflow-y-auto gap-5  w-full hide-scrollbar">
                  {trendingIsLoading ? (
                    <Spinner />
                  ) : trendingErrorMessage ? (
                    <p className="text-yellow-500 mt-2">
                      {" "}
                      {trendingErrorMessage}
                    </p>
                  ) : (
                    trendingMovies.map((movie, index) => (
                      <li
                        key={movie.$id}
                        className="min-w-[230px] flex flex-row items-center "
                      >
                        <p>{index + 1}</p>
                        <img
                          className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5"
                          src={movie.poster_url}
                          alt={movie.title}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </section>
            )}

            <section className="my-2 flex-col items-start mx-5 h-full gap-5">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <div className="flex justify-center">
                  <p className="text-yellow-500"> {errorMessage}</p>
                </div>
              ) : (
                <ul className="md:flex justify-start items-center flex-wrap gap-5 my-5 ">
                  {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </div>
          {/*  */}
        </div>
      </div>
      <SpeedInsights />
    </main>
  );
};

export default App;
