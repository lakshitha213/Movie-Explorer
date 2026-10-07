import React from "react";
import { Card, CardActionArea, CardContent, IconButton, Rating, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useMovies();
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      <IconButton
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(movie); }}
        sx={{ position: "absolute", right: 6, top: 6, zIndex: 2, bgcolor: "rgba(0,0,0,.55)", color: "white" }}
        aria-label={isFavorite(movie.id) ? "remove favorite" : "add favorite"}
      >
        {isFavorite(movie.id) ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
      <CardActionArea component={Link} to={`/movie/${movie.id}`} sx={{ height: "100%" }}>
        {movie.poster_path
          ? <img className="poster" src={imageUrl(movie.poster_path)} alt={movie.title} />
          : <div className="poster" style={{ display:"grid", placeItems:"center" }}>No poster</div>}
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} noWrap>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">{year}</Typography>
          <Rating value={(movie.vote_average || 0) / 2} precision={0.1} readOnly size="small" />
          <Typography component="span" variant="body2" sx={{ ml: .5 }}>
            {(movie.vote_average || 0).toFixed(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}