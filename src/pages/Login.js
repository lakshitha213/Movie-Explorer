import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  MovieOutlined,
  Visibility,
  VisibilityOff,
  PersonOutline,
  LockOutlined,
  PlayArrowRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const submit = (e) => {
  e.preventDefault();
  setError("");

  const envUsername = process.env.REACT_APP_AUTH_USERNAME;
  const envPassword = process.env.REACT_APP_AUTH_PASSWORD;

  if (!username.trim() || !password) {
    setError("Please enter both username and password.");
    return;
  }

  if (
    username.trim() !== envUsername ||
    password !== envPassword
  ) {
    setError("Invalid username or password.");
    return;
  }

  localStorage.setItem("movie_logged_in", "true");
  localStorage.setItem("movie_username", username.trim());

  navigate("/", { replace: true });
  window.location.reload();
};

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      borderRadius: "12px",
      backgroundColor: "rgba(255,255,255,0.06)",

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.15)",
      },

      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.3)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#8b5cf6",
        borderWidth: "1px",
      },

      "& input": {
        color: "#fff",
      },

      // Remove browser autofill color
      "& input:-webkit-autofill": {
        WebkitBoxShadow:
          "0 0 0 1000px #17171f inset",
        WebkitTextFillColor: "#fff",
        caretColor: "#fff",
      },
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.55)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a78bfa",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",

        backgroundImage: `
          linear-gradient(
            rgba(5,5,10,0.78),
            rgba(5,5,10,0.94)
          ),
          url("https://image.tmdb.org/t/p/original/8btfz81aR7CR9EL1W3mL7ZbY5zB.jpg")
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.18)",
          filter: "blur(120px)",
          top: "-250px",
          right: "-150px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(236,72,153,0.12)",
          filter: "blur(120px)",
          bottom: "-250px",
          left: "-150px",
        }}
      />

      {/* Login Card */}
      <Card
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,

          width: "100%",
          maxWidth: 440,

          mx: 2,

          borderRadius: "24px",

          background: "rgba(15,15,22,0.78)",

          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",

          border:
            "1px solid rgba(255,255,255,0.12)",

          boxShadow:
            "0 30px 100px rgba(0,0,0,0.65)",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 3.5,
              sm: 5,
            },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "20px",

                background:
                  "linear-gradient(135deg,#7c3aed,#ec4899)",

                boxShadow:
                  "0 15px 40px rgba(124,58,237,0.4)",
              }}
            >
              <MovieOutlined
                sx={{
                  fontSize: 38,
                  color: "#fff",
                }}
              />
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            align="center"
            sx={{
              color: "#fff",
              fontSize: {
                xs: "1.8rem",
                sm: "2rem",
              },
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to Movie Explorer
          </Typography>

          <Typography
            align="center"
            sx={{
              mt: 1,
              mb: 4,
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.95rem",
            }}
          >
            Discover movies you'll love.
          </Typography>

          {/* Error */}
          {error && (
            <Alert
              severity="warning"
              sx={{
                mb: 2,
                borderRadius: "10px",
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={submit}>
            {/* Username */}
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
              margin="normal"
              sx={fieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline
                      sx={{
                        color:
                          "rgba(255,255,255,0.45)",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type={
                showPassword ? "text" : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              margin="normal"
              sx={fieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined
                      sx={{
                        color:
                          "rgba(255,255,255,0.45)",
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      edge="end"
                      sx={{
                        color:
                          "rgba(255,255,255,0.45)",

                        "&:hover": {
                          color: "#a78bfa",
                        },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Login */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              endIcon={<PlayArrowRounded />}
              sx={{
                mt: 3,

                height: 54,

                borderRadius: "12px",

                textTransform: "none",

                fontSize: "1rem",
                fontWeight: 700,

                background:
                  "linear-gradient(90deg,#7c3aed,#ec4899)",

                boxShadow:
                  "0 12px 30px rgba(124,58,237,0.3)",

                transition: "all 0.25s ease",

                "&:hover": {
                  background:
                    "linear-gradient(90deg,#6d28d9,#db2777)",

                  transform:
                    "translateY(-2px)",

                  boxShadow:
                    "0 18px 40px rgba(124,58,237,0.4)",
                },
              }}
            >
              Start Exploring
            </Button>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              my: 3,
            }}
          >
            <Divider
              sx={{
                flex: 1,
                borderColor:
                  "rgba(255,255,255,0.08)",
              }}
            />

            <Typography
              sx={{
                fontSize: "0.75rem",
                color:
                  "rgba(255,255,255,0.3)",
              }}
            >
              MOVIE EXPLORER
            </Typography>

            <Divider
              sx={{
                flex: 1,
                borderColor:
                  "rgba(255,255,255,0.08)",
              }}
            />
          </Box>

          {/* Footer */}
          <Typography
            align="center"
            sx={{
              fontSize: "0.75rem",
              color:
                "rgba(255,255,255,0.35)",
            }}
          >
            Your gateway to trending movies,
            <br />
            popular releases and hidden gems.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}