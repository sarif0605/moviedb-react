import axios from "axios";
import { Movie } from "../types/movie";
const apiKey = import.meta.env.VITE_APP_APIKEY;
const baseUrl = import.meta.env.VITE_APP_BASEURL;

export const getMovieList = async (): Promise<Movie[]> => {
  const { data } = await axios.get(
    `${baseUrl}/movie/now_playing?page=1&api_key=${apiKey}`
  );
  console.log({ movies: data });
  return data.results.slice(0, 6);
};

export const getMoviePopularList = async (
  page: number = 1,
  limit: number = 6
): Promise<Movie[]> => {
  const { data } = await axios.get(
    `${baseUrl}/movie/popular?page=${page}&api_key=${apiKey}`
  );
  console.log({ movies: data });
  const movies: Movie[] = data.results.slice(0, limit);
  return movies;
};

export const searchMovie = async (
  query: string
): Promise<{ results: Movie[] }> => {
  const response = await axios.get(
    `${baseUrl}/search/movie?query=${query}&page=1&api_key=${apiKey}`
  );
  return response.data;
};

export const addFavorite = async (
  accountId: string,
  sessionId: string,
  movieId: number,
  isFavorite: boolean
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: isFavorite,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const getFavoriteMovies = async (
  accountId: string,
  sessionId: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};

// ApiMovie.ts
export const getMovieDetails = async (movieId: string) => {
  const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
};
