import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import {
  FavoriteRounded,
  MovieRounded,
} from "@mui/icons-material";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 8,
        background:
          "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.12), transparent 35%)",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Header */}
        <Box
          sx={{
            mb: 5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
              boxShadow:
                "0 10px 30px rgba(124,58,237,0.3)",
              flexShrink: 0,
            }}
          >
            <FavoriteRounded
              sx={{
                color: "#fff",
                fontSize: 27,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "2.6rem",
                },
                lineHeight: 1.1,
                fontWeight: 900,
                letterSpacing: "-0.035em",
              }}
            >
              My Favorites
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Your personally saved movies
            </Typography>
          </Box>
        </Box>

        {/* Favorites count */}
        {favorites.length > 0 && (
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.95rem" }}
            >
              {favorites.length}{" "}
              {favorites.length === 1 ? "movie" : "movies"} saved
            </Typography>
          </Box>
        )}

        {/* Movies */}
        {favorites.length > 0 ? (
          <Box
            className="movie-grid"
            sx={{
              "& > *": {
                transition: "transform 0.25s ease",
              },
            }}
          >
            {favorites.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
              />
            ))}
          </Box>
        ) : (
          /* Empty state */
          <Box
            sx={{
              minHeight: 420,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              px: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: 500,
                width: "100%",
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(15px)",
              }}
            >
              <Box
                sx={{
                  width: 76,
                  height: 76,
                  mx: "auto",
                  mb: 3,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background:
                    "rgba(124,58,237,0.12)",
                  border:
                    "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <MovieRounded
                  sx={{
                    fontSize: 38,
                    color: "#c084fc",
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ mb: 1 }}
              >
                No Favorites Yet
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                  maxWidth: 380,
                  mx: "auto",
                }}
              >
                You haven't saved any movies yet.
                Explore movies and tap the heart icon
                to add your favorites here.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}