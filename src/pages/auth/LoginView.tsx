// src/components/Login.tsx
import React, { useState } from "react";
import { getRequestToken, createGuestSession } from "../../api/ApiAuth";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/"); // Navigasi kembali ke halaman utama
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requestToken = await getRequestToken();
      if (requestToken) {
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/callback`;
      } else {
        setError("Failed to get request token");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const guestSessionId = await createGuestSession();
      if (guestSessionId) {
        localStorage.setItem("guestSessionId", guestSessionId);
        navigate("/");
      } else {
        setError("Failed to create guest session");
      }
    } catch (err) {
      console.error("Guest session error:", err);
      setError("An error occurred while creating a guest session.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-4 m-5  py-3">
            <button
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              Log in with TMDb
            </button>
            <button className="btn btn-primary" onClick={handleGetStarted}>
              kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
