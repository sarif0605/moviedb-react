// import { useEffect, useState } from "react";
// import { getAccountDetails } from "../api/ApiAuth";

// export const useAuth = () => {
//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
//   const [accountId, setAccountId] = useState<string | null>(null);

//   const fetchAccountDetails = async (sessionId: string) => {
//     try {
//       const account = await getAccountDetails(sessionId);
//       setAccountId(account.id);
//     } catch (error) {
//       console.error("Failed to fetch account details:", error);
//       logout();
//     }
//   };

//   useEffect(() => {
//     const storedSessionId = localStorage.getItem("sessionId");
//     const storedGuestSessionId = localStorage.getItem("guestSessionId");

//     if (storedSessionId) {
//       setSessionId(storedSessionId);
//       fetchAccountDetails(storedSessionId);
//     } else if (storedGuestSessionId) {
//       setGuestSessionId(storedGuestSessionId);
//     }
//   }, []);

//   const login = (newSessionId: string) => {
//     localStorage.setItem("sessionId", newSessionId);
//     setSessionId(newSessionId);
//     fetchAccountDetails(newSessionId);
//   };

//   const logout = () => {
//     localStorage.removeItem("sessionId");
//     localStorage.removeItem("guestSessionId");
//     setSessionId(null);
//     setGuestSessionId(null);
//     setAccountId(null);
//   };

//   const isAuthenticated = Boolean(sessionId || guestSessionId);

//   return {
//     sessionId,
//     guestSessionId,
//     accountId,
//     isAuthenticated,
//     login,
//     logout,
//   };
// };

import { useEffect, useState } from "react";
import { getAccountDetails } from "../api/ApiAuth";

export const useAuth = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  const fetchAccountDetails = async (sessionId: string) => {
    try {
      const account = await getAccountDetails(sessionId);
      setAccountId(account.id);
    } catch (error) {
      console.error("Failed to fetch account details:", error);
      logout();
    }
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    const storedGuestSessionId = localStorage.getItem("guestSessionId");

    if (storedSessionId) {
      setSessionId(storedSessionId);
      fetchAccountDetails(storedSessionId);
    } else if (storedGuestSessionId) {
      setGuestSessionId(storedGuestSessionId);
    }
  }, []);

  const login = (newSessionId: string) => {
    localStorage.setItem("sessionId", newSessionId);
    setSessionId(newSessionId);
    fetchAccountDetails(newSessionId);
  };

  const logout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("guestSessionId");
    setSessionId(null);
    setGuestSessionId(null);
    setAccountId(null);
  };

  const isAuthenticated = Boolean(sessionId || guestSessionId);

  return {
    sessionId,
    guestSessionId,
    accountId,
    isAuthenticated,
    login,
    logout,
  };
};
