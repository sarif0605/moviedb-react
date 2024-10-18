import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/movie";
import { getMovieDetails } from "../../api/ApiMovie";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/"); // Navigasi kembali ke halaman utama
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) {
        console.error("Movie ID is not provided.");
        setIsLoading(false);
        return;
      }

      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <div className="loader">Loading...</div>; // Ganti dengan loader yang Anda suka
  }

  if (!movie) {
    return <div className="error">Movie not found</div>; // Ganti dengan pesan yang Anda suka
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={`${import.meta.env.VITE_APP_BASEIMGURL}/${movie.poster_path}`}
          alt={movie.title}
          className="max-w-sm rounded-lg shadow-2xl h-1/3"
        />
        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="pt-6 pb-1">{movie.overview}</p>
          <p>
            rating{" "}
            <span className="rating flex pb-3">
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
            </span>
          </p>
          <p>release date : {movie.release_date}</p>
          <p>popularity : {movie.popularity}</p>
          <p>vote count : {movie.vote_count}</p>
          <button className="btn btn-primary" onClick={handleGetStarted}>
            kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
