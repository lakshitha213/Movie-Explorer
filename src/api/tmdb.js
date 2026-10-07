import axios from "axios";

const token = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

console.log("TMDb token loaded:", Boolean(token));

const api = axios.create({
  baseURL:
    process.env.REACT_APP_TMDB_BASE_URL ||
    "https://api.themoviedb.org/3",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },

  params: {
    language: "en-US",
  },
});

const unwrap = (request) =>
  request.catch((error) => {
    console.error("TMDb ERROR:", error.response?.data);
    throw new Error(
      error.response?.data?.status_message ||
        "Unable to contact TMDb."
    );
  });

export const getTrendingMovies = () =>
  unwrap(
    api.get("/trending/movie/week").then((response) => response.data)
  );

export const searchMovies = (query, page = 1) =>
  unwrap(
    api
      .get("/search/movie", {
        params: {
          query,
          page,
          include_adult: false,
        },
      })
      .then((response) => response.data)
  );

export const getMovieDetails = (id) =>
  unwrap(
    api
      .get(`/movie/${id}`, {
        params: {
          append_to_response: "credits,videos",
        },
      })
      .then((response) => response.data)
  );

export const getGenres = () =>
  unwrap(
    api.get("/genre/movie/list").then((response) => response.data)
  );

export const discoverMovies = ({
  page = 1,
  genre,
  year,
  rating,
} = {}) =>
  unwrap(
    api
      .get("/discover/movie", {
        params: {
          page,
          include_adult: false,
          sort_by: "popularity.desc",
          with_genres: genre || undefined,
          primary_release_year: year || undefined,
          "vote_average.gte": rating || undefined,
        },
      })
      .then((response) => response.data)
  );

export const imageUrl = (path, size = "w500") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : null;