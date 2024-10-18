import React, { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import {
  getMoviePopularList,
  getFavoriteMovies,
  searchMovie,
} from "../../api/ApiMovie";
import { addFavoriteMovie } from "../../api/ApiAuth";
import { useAuth } from "../../hooks/useAuth";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LOAD_MORE_COUNT = 6;
const MAX_MOVIES = 30;

export const PopularMovies: React.FC = () => {
  const { sessionId, accountId, isAuthenticated } = useAuth();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const newMovies = await getMoviePopularList(page, LOAD_MORE_COUNT);
        const updatedMovies = [...popularMovies, ...newMovies];

        setPopularMovies(updatedMovies);

        if (updatedMovies.length >= MAX_MOVIES) {
          setHasMore(false);
        }
        if (newMovies.length < LOAD_MORE_COUNT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (isAuthenticated && accountId && sessionId) {
      const fetchFavoriteMovies = async () => {
        const favoriteList = await getFavoriteMovies(accountId, sessionId);
        setFavoriteMovies(favoriteList.map((movie: Movie) => movie.id));
      };
      fetchFavoriteMovies();
    }
  }, [accountId, sessionId, isAuthenticated]);

  const search = async (query: string) => {
    if (query.length > 3) {
      const results = await searchMovie(query);
      setPopularMovies(results.results);
    }
  };

  const toggleFavorite = async (movieId: number) => {
    if (!isAuthenticated || !accountId || !sessionId) return;
    const isFavorite = favoriteMovies.includes(movieId);

    try {
      await addFavoriteMovie(accountId, sessionId, movieId, !isFavorite);
      setFavoriteMovies((prev) =>
        isFavorite ? prev.filter((id) => id !== movieId) : [...prev, movieId]
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  const loadMoreMovies = () => {
    if (hasMore && popularMovies.length < MAX_MOVIES) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToDetails = (movieId: number) => {
    navigate(`/movies/${movieId}`); // Navigasi ke halaman detail
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow mb-4"
          placeholder="Search"
          onChange={(e) => search(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularMovies.map((movie) => (
          <div key={movie.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                  movie.poster_path
                }`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{movie.title}</h3>
              <p>{movie.overview.slice(0, 70)}</p>
              <p>
                Release Date:{" "}
                <span className="text-secondary">{movie.release_date}</span>
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="btn btn-outline"
                  onClick={() => toggleFavorite(movie.id)}
                >
                  {favoriteMovies.includes(movie.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
                <button
                  className="btn btn-accent btn-outline"
                  onClick={() => goToDetails(movie.id)} // Tambahkan fungsi ini
                >
                  <FaInfoCircle className="mr-2" /> Details
                </button>
                <div className="rating flex">
                  {[...Array(5)].map((_, index) => (
                    <FaInfoCircle
                      key={index}
                      className={`mask mask-star-2 ${
                        index < Math.round(movie.vote_average / 2)
                          ? "bg-orange-400"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            onClick={loadMoreMovies}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
