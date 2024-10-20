import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { getFavoriteMovies, addFavorite } from "../services/ApiMovie";
import { useAuth } from "../hooks/useAuth";
import { MovieCard } from "./MovieCardComponent";

export const FavoriteMovies: React.FC = () => {
  const { sessionId, accountId, isAuthenticated } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (isAuthenticated && accountId && sessionId) {
        try {
          const favorites = await getFavoriteMovies(accountId, sessionId);
          setFavoriteMovies(favorites);
        } catch (error) {
          console.error("Failed to fetch favorite movies:", error);
        }
      }
    };

    fetchFavoriteMovies();
  }, [accountId, sessionId, isAuthenticated]);

  const toggleFavorite = async (movieId: number) => {
    if (!isAuthenticated || !accountId || !sessionId) return;

    try {
      const isFavorite = favoriteMovies.some((movie) => movie.id === movieId);
      // Update the favorite status
      await addFavorite(accountId, sessionId, movieId, !isFavorite);

      // Fetch the updated list of favorite movies
      const updatedFavorites = await getFavoriteMovies(accountId, sessionId);
      setFavoriteMovies(updatedFavorites);
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(movie.id)}
            />
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
