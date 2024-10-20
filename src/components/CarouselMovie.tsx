import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { getMovieList } from "../services/ApiMovie";
import { useAuth } from "../hooks/useAuth";
import { addFavoriteMovie } from "../services/ApiAuth";
import { MovieCard } from "./MovieCardComponent";

export const CarouselMovie: React.FC = () => {
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

  return (
    <div className="grid gap-8 lg:gap-24 lg:grid-cols-2 items-center">
      <div className="m-10">
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Movie Favorite
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 sm:text-lg lg:mt-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam
          officia ducimus mollitia eius odio! Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Necessitatibus eveniet adipisci fuga!
          Quisquam, quod. Voluptate voluptates nulla animi accusamus in.
        </p>
      </div>
      <div className="carousel carousel-center bg-accent rounded-box space-x-4 p-4 m-4">
        {popularMovies.map((movie) => (
          <div className="carousel-item w-full md:w-72 lg:w-96" key={movie.id}>
            <MovieCard
              movie={movie}
              isFavorite={favoriteMovies.includes(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
