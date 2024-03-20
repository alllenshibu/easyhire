import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
useEffect(() => {
  async function loadUserFromCookies() {
    const token = window.localStorage.getItem("token");
    if (token) {
        //validate token
      console.log("Got a token in the cookies, let's see if it is valid");

      if (router.pathname.startsWith("/auth/")) {
        router.push("/");
      }
    } else {
      router.push("/auth/login");
    }
    setLoading(false);
    setToken(token);
  }
  loadUserFromCookies();
}, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
