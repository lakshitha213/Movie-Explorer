import React, { useEffect, useRef, useState } from "react";
import {Box,Button,CircularProgress,Container,Typography} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ErrorMessage from "../components/ErrorMessage";
import { useMovies } from "../context/MovieContext";
import { useThemeMode } from "../context/ThemeContext";

export default function Home() {
  const { mode } = useThemeMode();

  const {
    trending = [],
    genres = [],
    search,
    discover,
    loading,
    error,
    lastSearch,
  } = useMovies();

  const isDark = mode === "dark";

 

  const theme = {
    pageBg: isDark ? "#08080d" : "#f7f7fb",

    pageBgSecondary: isDark ? "#0d0d14" : "#ffffff",

    text: isDark ? "#ffffff" : "#17171c",

    textSecondary: isDark
      ? "rgba(255,255,255,0.65)"
      : "rgba(20,20,30,0.65)",

    textMuted: isDark
      ? "rgba(255,255,255,0.45)"
      : "rgba(20,20,30,0.5)",

    cardBg: isDark
      ? "rgba(255,255,255,0.055)"
      : "rgba(255,255,255,0.9)",

    cardBgStrong: isDark
      ? "rgba(255,255,255,0.08)"
      : "#ffffff",

    border: isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(20,20,30,0.09)",

    borderStrong: isDark
      ? "rgba(255,255,255,0.14)"
      : "rgba(20,20,30,0.14)",

    inputBg: isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(20,20,30,0.045)",

    buttonText: "#ffffff",

    purple: "#7c3aed",
    purpleLight: "#c084fc",
    pink: "#ec4899",

    shadow: isDark
      ? "0 20px 50px rgba(0,0,0,0.25)"
      : "0 15px 40px rgba(30,20,60,0.08)",

    heroOverlay: isDark
      ? `
        linear-gradient(
          90deg,
          rgba(8,8,13,0.98) 0%,
          rgba(8,8,13,0.88) 35%,
          rgba(8,8,13,0.55) 65%,
          rgba(8,8,13,0.9) 100%
        ),
        linear-gradient(
          180deg,
          rgba(8,8,13,0.15) 50%,
          #08080d 100%
        )
      `
      : `
        linear-gradient(
          90deg,
          rgba(255,255,255,0.97) 0%,
          rgba(255,255,255,0.88) 35%,
          rgba(255,255,255,0.55) 68%,
          rgba(255,255,255,0.82) 100%
        ),
        linear-gradient(
          180deg,
          rgba(255,255,255,0.15) 45%,
          #f7f7fb 100%
        )
      `,
  };

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: "",
  });

  const [filterMode, setFilterMode] = useState(false);

  const lastLoadedSearch = useRef("");


  useEffect(() => {
    if (!lastSearch) return;

    if (lastLoadedSearch.current === lastSearch) {
      return;
    }

    lastLoadedSearch.current = lastSearch;

    let cancelled = false;

    const loadLastSearch = async () => {
      try {
        const data = await search(lastSearch, 1);

        if (cancelled) return;

        setQuery(lastSearch);
        setPage(1);
        setTotalPages(data?.total_pages || 1);
        setResults(data?.results || []);
        setFilterMode(false);
      } catch {
        
      }
    };

    loadLastSearch();

    return () => {
      cancelled = true;
    };
  }, [lastSearch, search]);

  

  const runSearch = async (q, p = 1, replace = true) => {
    const cleanQuery = q.trim();

    if (!cleanQuery) return;

    try {
      setFilterMode(false);

      if (replace) {
        setQuery(cleanQuery);
        setPage(1);
      }

      const data = await search(cleanQuery, p);

      setPage(p);
      setTotalPages(data?.total_pages || 1);

      setResults((previous) => {
        if (replace) {
          return data?.results || [];
        }

        return [
          ...previous,
          ...(data?.results || []),
        ];
      });
    } catch {
      // Error handled by MovieContext
    }
  };

 

  const runFilters = async (p = 1, replace = true) => {
    try {
      setFilterMode(true);
      setQuery("");

      if (replace) {
        setPage(1);
      }

      const cleanFilters = {
        genre: filters?.genre || "",
        year: filters?.year || "",
        rating: filters?.rating || "",
      };

      const data = await discover(cleanFilters, p);

      setPage(p);
      setTotalPages(data?.total_pages || 1);

      setResults((previous) => {
        if (replace) {
          return data?.results || [];
        }

        return [
          ...previous,
          ...(data?.results || []),
        ];
      });
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  

  const clearFilters = () => {
    setFilters({
      genre: "",
      year: "",
      rating: "",
    });

    setResults([]);
    setQuery("");
    setPage(1);
    setTotalPages(1);
    setFilterMode(false);
  };

  const hasResults = filterMode || query.length > 0;

 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(
          180deg,
          ${theme.pageBg} 0%,
          ${theme.pageBgSecondary} 45%,
          ${theme.pageBg} 100%
        )`,
        color: theme.text,
        transition:
          "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/*HERO*/}

      <Box
        sx={{
          position: "relative",
          minHeight: {
            xs: 560,
            md: 620,
          },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",

          backgroundImage: `
            ${theme.heroOverlay},
            url("https://image.tmdb.org/t/p/original/8btfz81aR7CR9EL1W3mL7ZbY5zB.jpg")
          `,

          backgroundSize: "cover",
          backgroundPosition: "center",

          transition: "all 0.3s ease",
        }}
      >
        {/* Purple glow */}

        <Box
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)",
            top: -150,
            left: -100,
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        {/* Pink glow */}

        <Box
          sx={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)",
            bottom: -150,
            right: -80,
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            py: 8,
          }}
        >
          <Box maxWidth={800}>
            {/* Label */}

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                px: 1.8,
                py: 0.8,
                borderRadius: 10,

                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.72)",

                border: `1px solid ${theme.border}`,

                backdropFilter: "blur(10px)",

                boxShadow: isDark
                  ? "none"
                  : "0 8px 25px rgba(20,20,30,0.08)",
              }}
            >
              <MovieRoundedIcon
                sx={{
                  fontSize: 18,
                  color: theme.purpleLight,
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: theme.text,
                }}
              >
                MOVIE EXPLORER
              </Typography>
            </Box>

            {/* Heading */}

            <Typography
              sx={{
                fontSize: {
                  xs: "2.8rem",
                  sm: "4rem",
                  md: "5.2rem",
                },
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                mb: 2,

                background:
                  "linear-gradient(135deg, #7c3aed 10%, #ec4899 90%)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover Your
              <br />
              Next Favorite Movie
            </Typography>

            <Typography
              sx={{
                maxWidth: 600,
                color: theme.textSecondary,
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Search thousands of movies,
              explore trending films,
              discover hidden gems, and
              find something perfect to
              watch tonight.
            </Typography>

            {/* Search */}

            <Box
              sx={{
                width: "100%",
                maxWidth: 700,
                p: 1.2,
                borderRadius: 4,

                background: isDark
                  ? "rgba(10,10,16,0.7)"
                  : "rgba(255,255,255,0.85)",

                border: `1px solid ${theme.border}`,

                backdropFilter: "blur(16px)",

                boxShadow: theme.shadow,
              }}
            >
              <SearchBar
                initialValue={lastSearch || ""}
                onSearch={(q) =>
                  runSearch(q, 1, true)
                }
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* MAIN CONTENT*/}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >
        {/*FILTERS*/}

        <Box
          sx={{
            mb: 7,
            p: {
              xs: 2.5,
              md: 3,
            },
            borderRadius: 4,

            background: theme.cardBg,

            border: `1px solid ${theme.border}`,

            backdropFilter: "blur(20px)",

            boxShadow: isDark
              ? "none"
              : "0 12px 35px rgba(20,20,30,0.06)",

            transition:
              "background 0.3s ease, border 0.3s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2.5,
            }}
          >
            <TuneRoundedIcon
              sx={{
                color: theme.purple,
              }}
            />

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: theme.text,
              }}
            >
              Find Your Movie
            </Typography>
          </Box>

          <Filters
            genres={genres}
            filters={filters}
            setFilters={setFilters}
          />

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 2.5,
              flexWrap: "wrap",
            }}
          >
            {/* APPLY */}

            <Button
              variant="contained"
              onClick={() => runFilters(1, true)}
              disabled={loading}
              sx={{
                width: 150,
                minWidth: 150,
                height: 46,

                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 3,

                textTransform: "none",
                fontWeight: 700,
                color: "#fff",

                background:
                  "linear-gradient(135deg,#7c3aed,#ec4899)",

                boxShadow:
                  "0 8px 20px rgba(124,58,237,0.22)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg,#6d28d9,#db2777)",
                },

                "&.Mui-disabled": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,#7c3aed,#ec4899)",
                  opacity: 0.65,
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={20}
                  thickness={4}
                  sx={{ color: "#fff" }}
                />
              ) : (
                "Apply Filters"
              )}
            </Button>

            {/* CLEAR */}

            <Button
              onClick={clearFilters}
              disabled={loading}
              sx={{
                width: 90,
                minWidth: 90,
                height: 46,

                borderRadius: 3,

                textTransform: "none",
                fontWeight: 700,

                color: theme.textSecondary,

                border:
                  `1px solid ${theme.border}`,

                "&:hover": {
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(20,20,30,0.05)",

                  color: theme.text,
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>

        <ErrorMessage message={error} />

        {/*SEARCH / FILTER RESULTS*/}

        {hasResults && (
          <Box sx={{ mb: 9 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 3,
              }}
            >
              {filterMode ? (
                <TuneRoundedIcon
                  sx={{
                    color: theme.purpleLight,
                    fontSize: 30,
                  }}
                />
              ) : (
                <SearchRoundedIcon
                  sx={{
                    color: theme.purpleLight,
                    fontSize: 30,
                  }}
                />
              )}

              <Typography
                sx={{
                  fontSize: {
                    xs: "1.6rem",
                    md: "2rem",
                  },
                  fontWeight: 850,
                  color: theme.text,
                }}
              >
                {filterMode
                  ? "Filtered Movies"
                  : "Search Results"}
              </Typography>
            </Box>

            {query && !filterMode && (
              <Typography
                sx={{
                  color: theme.textMuted,
                  mb: 3,
                }}
              >
                Showing results for{" "}
                <Box
                  component="span"
                  sx={{
                    color: theme.purpleLight,
                    fontWeight: 700,
                  }}
                >
                  "{query}"
                </Box>
              </Typography>
            )}

            {results.length > 0 ? (
              <>
                <Box sx={{ position: "relative" }}>
                  <Box
                    className="movie-grid"
                    sx={{
                      opacity: loading ? 0.6 : 1,
                      transition:
                        "opacity 0.2s ease",
                    }}
                  >
                    {results.map((movie) => (
                      <MovieCard
                        movie={movie}
                        key={movie.id}
                      />
                    ))}
                  </Box>

                  {loading && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        py: 2,
                        pointerEvents: "none",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          width: 42,
                          height: 42,

                          borderRadius: "50%",

                          background: isDark
                            ? "rgba(10,10,16,0.85)"
                            : "rgba(255,255,255,0.92)",

                          border:
                            `1px solid ${theme.borderStrong}`,

                          backdropFilter:
                            "blur(10px)",

                          boxShadow: theme.shadow,
                        }}
                      >
                        <CircularProgress
                          size={22}
                          thickness={4}
                          sx={{
                            color: theme.purple,
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* LOAD MORE */}

                {page < totalPages && (
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      disabled={loading}
                      onClick={() =>
                        filterMode
                          ? runFilters(
                              page + 1,
                              false
                            )
                          : runSearch(
                              query,
                              page + 1,
                              false
                            )
                      }
                      sx={{
                        width: 150,
                        minWidth: 150,
                        height: 46,

                        display:
                          "inline-flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        borderRadius: 3,

                        textTransform:
                          "none",

                        fontWeight: 700,

                        color: theme.text,

                        border:
                          `1px solid ${isDark
                            ? "rgba(168,85,247,0.5)"
                            : "rgba(124,58,237,0.35)"}`,

                        "&:hover": {
                          borderColor:
                            theme.purple,

                          background:
                            isDark
                              ? "rgba(168,85,247,0.1)"
                              : "rgba(124,58,237,0.07)",
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={21}
                          thickness={4}
                          sx={{
                            color:
                              theme.purple,
                          }}
                        />
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              !loading && (
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                  }}
                >
                  <MovieRoundedIcon
                    sx={{
                      fontSize: 55,
                      color: theme.textMuted,
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      color: theme.textMuted,
                    }}
                  >
                    No movies found.
                  </Typography>
                </Box>
              )
            )}
          </Box>
        )}

        {/*TRENDING*/}

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              mb: 3,
            }}
          >
            <LocalFireDepartmentRoundedIcon
              sx={{
                color: "#f97316",
                fontSize: 30,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "1.6rem",
                  md: "2rem",
                },

                fontWeight: 850,
                letterSpacing: "-0.02em",
                color: theme.text,
              }}
            >
              Trending This Week
            </Typography>
          </Box>

          {trending.length > 0 ? (
            <Box className="movie-grid">
              {trending
                .slice(0, 10)
                .map((movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.id}
                  />
                ))}
            </Box>
          ) : (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <CircularProgress
                size={28}
                sx={{
                  color: theme.purple,
                  mb: 2,
                }}
              />

              <Typography
                sx={{
                  color: theme.textMuted,
                }}
              >
                Loading trending movies...
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}