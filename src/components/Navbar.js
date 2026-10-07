import React from "react";
import { AppBar,Box,Button,IconButton,Toolbar,Tooltip,Typography,} from "@mui/material";
import { DarkModeRounded,FavoriteRounded,LightModeRounded,LogoutRounded,MovieRounded,} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";

export default function Navbar() {
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("movie_logged_in");
    localStorage.removeItem("movie_username");

    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(8, 8, 14, 0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, sm: 3, md: 4 },
          gap: 1,
        }}
      >
        {/*LOGO*/}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            flexGrow: 1,
            textDecoration: "none",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              background:
                "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)",
              boxShadow:
                "0 7px 22px rgba(124,58,237,0.35)",
            }}
          >
            <MovieRounded
              sx={{
                color: "#fff",
                fontSize: 22,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.05rem", sm: "1.25rem" },
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            Movie Explorer
          </Typography>
        </Box>

        {/*FAVORITES*/}
        <Button
          component={Link}
          to="/favorites"
          startIcon={<FavoriteRounded />}
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            height: 42,
            px: 2,
            borderRadius: 3,
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.25s ease",

            "& .MuiSvgIcon-root": {
              color: "#f472b6",
              fontSize: 20,
            },

            "&:hover": {
              background: "rgba(236,72,153,0.12)",
              borderColor: "rgba(236,72,153,0.3)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Favorites
        </Button>

        {/*MOBILE FAVORITES*/}
        <Tooltip title="Favorites">
          <IconButton
            component={Link}
            to="/favorites"
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "#f472b6",
              width: 42,
              height: 42,
              borderRadius: 3,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <FavoriteRounded />
          </IconButton>
        </Tooltip>

        {/*THEME*/}
        <Tooltip
          title={
            mode === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label="toggle theme"
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              color: "#fff",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.25s ease",

              "&:hover": {
                background: "rgba(124,58,237,0.15)",
                borderColor: "rgba(168,85,247,0.3)",
                transform: "rotate(8deg)",
              },
            }}
          >
            {mode === "dark" ? (
              <LightModeRounded />
            ) : (
              <DarkModeRounded />
            )}
          </IconButton>
        </Tooltip>

        {/* LOGOUT */}
        <Tooltip title="Logout">
          <IconButton
            color="inherit"
            onClick={logout}
            aria-label="logout"
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.25s ease",

              "&:hover": {
                color: "#f87171",
                background: "rgba(239,68,68,0.1)",
                borderColor: "rgba(239,68,68,0.25)",
              },
            }}
          >
            <LogoutRounded />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}