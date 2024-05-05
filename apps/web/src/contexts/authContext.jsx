import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { get } = useFetch();

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
        if (!router.pathname.startsWith("/auth/")) router.push("/auth/login");
      }
      setLoading(false);
      setToken(token);
    }
    loadUserFromCookies();
  }, []);
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, status } = await get("/user");
        if (status !== 200) {
          console.error("Failed to fetch user");
          return;
        }
        setUser(data.user);
        console.log("Fetched user", data.user);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, token, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
