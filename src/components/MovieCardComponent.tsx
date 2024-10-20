import React from "react";
import { Movie } from "../types/movie";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-40 sm:h-52">
        <img
          className="object-cover w-full h-full"
          src={`${import.meta.env.VITE_APP_BASEIMGURL}/${movie.poster_path}`}
          alt={movie.title}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-base sm:text-lg">{movie.title}</h3>
        <p className="text-sm sm:text-base">{movie.overview.slice(0, 70)}...</p>
        <p className="text-sm sm:text-base">
          Release Date:{" "}
          <span className="text-secondary">{movie.release_date}</span>
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            className="btn btn-outline btn-sm sm:btn-md"
            onClick={() => onToggleFavorite(movie.id)}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
          <button
            className="btn btn-accent btn-outline btn-sm sm:btn-md"
            onClick={goToDetails}
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
  );
};
