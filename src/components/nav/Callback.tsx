// src/components/Callback.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createSession } from "../../api/ApiAuth";

export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestToken = searchParams.get("request_token");

    if (requestToken) {
      createSession(requestToken)
        .then((sessionId) => {
          if (sessionId) {
            localStorage.setItem("sessionId", sessionId);
            alert("You are now logged in.");
            navigate("/"); // Redirect to the home page or dashboard
          } else {
            setError("Failed to create a session.");
          }
        })
        .catch(() => {
          setError("An error occurred while creating a session.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Invalid request token.");
      setIsLoading(false);
    }
  }, [searchParams, navigate]);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
