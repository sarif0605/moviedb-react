// src/api/ApiAuth.ts
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_APIKEY;
const baseUrl = import.meta.env.VITE_APP_BASEURL;

/**
 * Get a request token for TMDb authentication.
 */
export const getRequestToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${baseUrl}/authentication/token/new`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.request_token;
  } catch (error) {
    console.error("Error fetching request token:", error);
    return null;
  }
};

/**
 * Create a session ID with the request token.
 */
export const createSession = async (
  requestToken: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${baseUrl}/authentication/session/new`,
      {
        request_token: requestToken,
      },
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    return response.data.session_id;
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
};

/**
 * Create a guest session.
 */
export const createGuestSession = async (): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${baseUrl}/authentication/guest_session/new`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    return response.data.guest_session_id;
  } catch (error) {
    console.error("Error creating guest session:", error);
    return null;
  }
};

/**
 * Add or remove a movie from the user's favorite list.
 */
export const addFavoriteMovie = async (
  accountId: string,
  sessionId: string,
  movieId: number,
  favorite: boolean
): Promise<void> => {
  try {
    await axios.post(
      `${baseUrl}/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite,
      },
      {
        params: {
          api_key: apiKey,
          session_id: sessionId,
        },
      }
    );
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    throw error;
  }
};

/**
 * Get the list of favorite movies for a user.
 */
export const getFavoriteMovies = async (
  accountId: string,
  sessionId: string,
  page: number = 1
): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${baseUrl}/account/${accountId}/favorite/movies`,
      {
        params: {
          api_key: apiKey,
          session_id: sessionId,
          page,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
};

/**
 * Get the account details using the session ID.
 */
export const getAccountDetails = async (sessionId: string): Promise<any> => {
  try {
    const response = await axios.get(`${baseUrl}/account`, {
      params: {
        api_key: apiKey,
        session_id: sessionId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};
