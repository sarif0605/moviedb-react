import React, { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { getFavoriteMovies } from "../../api/ApiMovie";
import { useAuth } from "../../hooks/useAuth";

export const FavoriteMovies: React.FC = () => {
  const { sessionId, accountId, isAuthenticated } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (isAuthenticated && accountId && sessionId) {
        setIsLoading(true);
        try {
          const favorites = await getFavoriteMovies(accountId, sessionId);
          setFavoriteMovies(favorites);
        } catch (error) {
          console.error("Failed to fetch favorite movies:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavoriteMovies();
  }, [accountId, sessionId, isAuthenticated]);

  if (isLoading) {
    return <div>Loading favorite movies...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div key={movie.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg font-semibold">
                  {movie.title}
                </h3>
                <p className="text-gray-600">
                  {movie.overview.slice(0, 100)}...
                </p>{" "}
                {/* Tampilkan ringkasan film */}
                <div className="mt-2">
                  <button className="btn btn-primary btn-outline">
                    Details
                  </button>{" "}
                  {/* Tombol untuk detail film */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            No favorite movies found.
          </div>
        )}
      </div>
    </div>
  );
};
