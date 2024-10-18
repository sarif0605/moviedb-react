import React, { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { getMovieList } from "../../api/ApiMovie";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { addFavoriteMovie } from "../../api/ApiAuth";

export const CarouselMovie: React.FC = () => {
  const navigate = useNavigate();
  const { sessionId, accountId, isAuthenticated } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieList().then((movies) => {
      setPopularMovies(movies);
    });
  }, []);

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

  const goToDetails = (movieId: number) => {
    navigate(`/movies/${movieId}`); // Navigasi ke halaman detail
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Movie Favorite
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam vel
            error cupiditate tempore soluta veritatis!
          </p>
        </div>
        <div className="hidden lg:carousel carousel-center bg-accent rounded-box space-x-4 p-4">
          {popularMovies.map((movie) => (
            <div className="carousel-item" key={movie.id}>
              <div className="card bg-base-100 w-96 shadow-xl">
                <figure className="h-52">
                  <img
                    src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                      movie.poster_path
                    }`}
                    alt={movie.title}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
