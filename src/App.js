import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  const loggedIn = localStorage.getItem("movie_logged_in") === "true";

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {loggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/movie/:id" element={loggedIn ? <MovieDetails /> : <Navigate to="/login" replace />} />
        <Route path="/favorites" element={loggedIn ? <Favorites /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </Box>
  );
}