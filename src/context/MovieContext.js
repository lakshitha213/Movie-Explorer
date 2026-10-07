import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { discoverMovies, getGenres, getTrendingMovies, searchMovies } from "../api/tmdb";

const MovieContext = createContext(null);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function MovieProvider({ children }) {
  const [trending, setTrending] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(() => read("movie_favorites", []));
  const [lastSearch, setLastSearch] = useState(() => localStorage.getItem("last_movie_search") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getTrendingMovies(), getGenres()])
      .then(([t, g]) => { setTrending(t.results || []); setGenres(g.genres || []); })
      .catch(e => setError(e.message));
  }, []);

  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const search = async (query, page = 1) => {
    setLoading(true); setError("");
    try {
      const data = await searchMovies(query, page);
      setLastSearch(query);
      localStorage.setItem("last_movie_search", query);
      return data;
    } catch (e) {
      setError(e.message); throw e;
    } finally { setLoading(false); }
  };

  const discover = async (filters, page = 1) => {
    setLoading(true); setError("");
    try { return await discoverMovies({ ...filters, page }); }
    catch (e) { setError(e.message); throw e; }
    finally { setLoading(false); }
  };

  const toggleFavorite = movie => {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const isFavorite = id => favorites.some(m => m.id === id);

  const value = useMemo(() => ({
    trending, genres, favorites, lastSearch, loading, error,
    search, discover, toggleFavorite, isFavorite
  }), [trending, genres, favorites, lastSearch, loading, error]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
export const useMovies = () => useContext(MovieContext);