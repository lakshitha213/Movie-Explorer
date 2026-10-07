import React, { useEffect, useState } from "react";
import {Box,Button,Chip,CircularProgress,Container,Rating,Stack,Typography,} from "@mui/material";
import {ArrowBackRounded,Favorite,FavoriteBorder,PlayArrowRounded,StarRounded} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, imageUrl } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";
import ErrorMessage from "../components/ErrorMessage";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite } = useMovies();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setMovie(null);
    setError("");

    getMovieDetails(id)
      .then(setMovie)
      .catch((e) => setError(e.message));
  }, [id]);


  // Loading

  if (!movie && !error) {
    return (
      <Box
        sx={{
          minHeight: "75vh",
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(circle at top, rgba(124,58,237,0.12), transparent 40%)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={42}
            thickness={4}
            sx={{ color: "#c084fc", mb: 2 }}
          />

          <Typography color="text.secondary">
            Loading movie details...
          </Typography>
        </Box>
      </Box>
    );
  }


  // Error

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            minHeight: "45vh",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <ErrorMessage message={error} />

            <Button
              variant="contained"
              startIcon={<ArrowBackRounded />}
              onClick={() => navigate("/")}
              sx={{
                mt: 3,
                minWidth: 150,
                height: 46,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #6d28d9 0%, #db2777 100%)",
                },
              }}
            >
              Back to Movies
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  
  // Movie data
  
  const trailer =
    movie.videos?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) ||
    movie.videos?.results?.find(
      (video) => video.site === "YouTube"
    );

  const cast = (movie.credits?.cast || []).slice(0, 8);

  const favorite = isFavorite(movie.id);

  const rating = movie.vote_average || 0;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <Box sx={{ minHeight: "100vh", pb: 8 }}>
      {/*HERO BACKDROP*/}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 620, md: 680 },
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Backdrop image */}
        {movie.backdrop_path && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.02)",
              filter: "brightness(0.65)",
            }}
          />
        )}

        {/* Dark gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(
                to top,
                rgba(7,7,12,1) 0%,
                rgba(7,7,12,0.92) 22%,
                rgba(7,7,12,0.55) 55%,
                rgba(7,7,12,0.2) 100%
              )
            `,
          }}
        />

        {/* Side gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(7,7,12,0.8), transparent 65%)",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            pb: { xs: 4, md: 7 },
          }}
        >
          {/* Back button */}
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackRounded />}
            sx={{
              mb: { xs: 4, md: 6 },
              color: "rgba(255,255,255,0.8)",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 3,
              px: 2,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Back to Movies
          </Button>

          {/* Movie information */}
          <Box
            sx={{
              maxWidth: 850,
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: {
                  xs: "2.3rem",
                  sm: "3rem",
                  md: "4.5rem",
                },
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#fff",
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              {movie.title}
            </Typography>

            {/* Meta */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {releaseYear && (
                <Typography fontWeight={600}>{releaseYear}</Typography>
              )}

              {movie.runtime && (
                <>
                  <Typography>•</Typography>
                  <Typography>{movie.runtime} min</Typography>
                </>
              )}

              {movie.status && (
                <>
                  <Typography>•</Typography>
                  <Typography>{movie.status}</Typography>
                </>
              )}
            </Stack>

            {/* Rating */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mt: 2 }}
            >
              <StarRounded
                sx={{
                  color: "#facc15",
                  fontSize: 28,
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#fff",
                }}
              >
                {rating.toFixed(1)}
              </Typography>

              <Typography color="rgba(255,255,255,0.55)">
                / 10
              </Typography>

              <Rating
                value={rating / 2}
                precision={0.1}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#facc15",
                  },
                }}
              />
            </Stack>

            {/* Genres */}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mt: 3, gap: 1 }}
            >
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                />
              ))}
            </Stack>

            {/* Overview */}
            <Typography
              sx={{
                mt: 3,
                maxWidth: 780,
                color: "rgba(255,255,255,0.72)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.8,
              }}
            >
              {movie.overview || "No overview available."}
            </Typography>

            {/* Buttons */}
            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              sx={{ mt: 4, gap: 1.5 }}
            >
              <Button
                variant="contained"
                startIcon={
                  favorite ? <Favorite /> : <FavoriteBorder />
                }
                onClick={() => toggleFavorite(movie)}
                sx={{
                  height: 48,
                  px: 2.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  background: favorite
                    ? "linear-gradient(135deg, #ec4899, #be185d)"
                    : "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 8px 25px rgba(124,58,237,0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    background: favorite
                      ? "linear-gradient(135deg, #db2777, #9d174d)"
                      : "linear-gradient(135deg, #6d28d9, #db2777)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                {favorite ? "Remove Favorite" : "Add Favorite"}
              </Button>

              {trailer && (
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowRounded />}
                  component="a"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    height: 48,
                    px: 2.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.12)",
                    },
                  }}
                >
                  Watch Trailer
                </Button>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/*DETAILS + POSTER*/}
      <Container maxWidth="xl" sx={{ mt: { xs: 4, md: 7 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "260px 1fr",
            },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          {/* Poster */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {movie.poster_path && (
              <Box
                component="img"
                src={imageUrl(movie.poster_path, "w780")}
                alt={movie.title}
                sx={{
                  width: "100%",
                  maxWidth: 260,
                  display: "block",
                  borderRadius: 3,
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.45)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              />
            )}
          </Box>

          {/* Additional information */}
          <Box
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(15px)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ mb: 3 }}
            >
              About This Movie
            </Typography>

            <Stack spacing={2.2}>
              {movie.original_title && (
                <DetailRow
                  label="Original Title"
                  value={movie.original_title}
                />
              )}

              {movie.original_language && (
                <DetailRow
                  label="Language"
                  value={movie.original_language.toUpperCase()}
                />
              )}

              {movie.popularity && (
                <DetailRow
                  label="Popularity"
                  value={movie.popularity.toFixed(1)}
                />
              )}

              {movie.vote_count && (
                <DetailRow
                  label="Vote Count"
                  value={movie.vote_count.toLocaleString()}
                />
              )}

              {movie.budget > 0 && (
                <DetailRow
                  label="Budget"
                  value={`$${movie.budget.toLocaleString()}`}
                />
              )}

              {movie.revenue > 0 && (
                <DetailRow
                  label="Revenue"
                  value={`$${movie.revenue.toLocaleString()}`}
                />
              )}
            </Stack>
          </Box>
        </Box>

        {/* CAST*/}
        <Box sx={{ mt: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ letterSpacing: "-0.02em" }}
            >
              Cast
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Meet the actors behind the characters
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(8, 1fr)",
              },
              gap: 2,
            }}
          >
            {cast.map((person) => (
              <Box
                key={person.credit_id || person.id}
                sx={{
                  minWidth: 0,
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(168,85,247,0.35)",
                  },
                }}
              >
                {person.profile_path ? (
                  <Box
                    component="img"
                    src={imageUrl(person.profile_path, "w342")}
                    alt={person.name}
                    sx={{
                      width: "100%",
                      aspectRatio: "2 / 3",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "2 / 3",
                      display: "grid",
                      placeItems: "center",
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))",
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    No photo
                  </Box>
                )}

                <Box sx={{ p: 1.5 }}>
                  <Typography
                    fontWeight={700}
                    sx={{
                      fontSize: "0.9rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {person.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {person.character || "Unknown role"}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


// Small reusable detail row

function DetailRow({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        pb: 1.5,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Typography color="text.secondary">
        {label}
      </Typography>

      <Typography
        fontWeight={600}
        sx={{
          textAlign: "right",
          textTransform: label === "Language" ? "uppercase" : "none",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}