import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useThemeMode } from "../context/ThemeContext";

export default function SearchBar({
  initialValue = "",
  onSearch,
}) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const theme = {
    inputText: isDark
      ? "#ffffff"
      : "#17171c",

    placeholder: isDark
      ? "rgba(255,255,255,0.65)"
      : "rgba(20,20,30,0.55)",

    searchBackground: isDark
      ? "rgba(255,255,255,0.10)"
      : "rgba(255,255,255,0.92)",

    searchBackgroundHover: isDark
      ? "rgba(255,255,255,0.14)"
      : "#ffffff",

    border: isDark
      ? "rgba(255,255,255,0.22)"
      : "rgba(20,20,30,0.12)",

    borderHover: isDark
      ? "rgba(255,255,255,0.30)"
      : "rgba(124,58,237,0.30)",

    focusBackground: isDark
      ? "rgba(255,255,255,0.13)"
      : "#ffffff",

    autofillBackground: isDark
      ? "#17171c"
      : "#ffffff",
  };

  const submit = (e) => {
    e.preventDefault();

    const q = value.trim();

    if (q) {
      onSearch(q);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",

          height: {
            xs: 58,
            sm: 66,
          },

          p: "6px",

          borderRadius: "20px",

          background: theme.searchBackground,

          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",

          border: `1px solid ${theme.border}`,

          boxShadow: isDark
            ? "0 15px 45px rgba(0,0,0,0.18)"
            : "0 15px 45px rgba(30,20,60,0.10)",

          transition: "all 0.3s ease",

          "&:hover": {
            background:
              theme.searchBackgroundHover,

            borderColor:
              theme.borderHover,
          },

          "&:focus-within": {
            background:
              theme.focusBackground,

            borderColor:
              "rgba(124,58,237,0.65)",

            boxShadow: isDark
              ? "0 18px 50px rgba(0,0,0,0.22), 0 0 0 4px rgba(124,58,237,0.12)"
              : "0 18px 50px rgba(30,20,60,0.12), 0 0 0 4px rgba(124,58,237,0.10)",
          },
        }}
      >
        {/* INPUT */}
        <TextField
          fullWidth
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder="Search for movies, actors, genres..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          inputProps={{
            "aria-label": "movie search",
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: "100%",
              background:
                "transparent !important",
            },

            "& .MuiInputBase-input": {
              background:
                "transparent !important",

              color: theme.inputText,

              WebkitTextFillColor:
                theme.inputText,

              fontSize: {
                xs: "14px",
                sm: "16px",
              },

              fontWeight: 500,

              padding: {
                xs: "0 10px",
                sm: "0 16px",
              },

              caretColor:
                isDark
                  ? "#c084fc"
                  : "#7c3aed",

              "&::placeholder": {
                color:
                  theme.placeholder,

                opacity: 1,
              },

              "&:-webkit-autofill": {
                WebkitBoxShadow:
                  `0 0 0 100px ${theme.autofillBackground} inset`,

                WebkitTextFillColor:
                  theme.inputText,

                caretColor:
                  theme.inputText,
              },
            },
          }}
        />

        {/* SEARCH BUTTON */}
        <Button
          type="submit"
          disabled={!value.trim()}
          startIcon={<SearchRoundedIcon />}
          sx={{
            height: "52px",

            minWidth: {
              xs: 52,
              sm: 135,
            },

            px: {
              xs: 1.5,
              sm: 2.8,
            },

            borderRadius: "15px",

            textTransform: "none",

            fontSize: "15px",
            fontWeight: 700,

            color: "#ffffff",

            background:
              "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 45%, #EC4899 100%)",

            boxShadow:
              "0 8px 22px rgba(124,58,237,0.35)",

            transition:
              "transform 0.2s ease, box-shadow 0.2s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg, #6D28D9 0%, #7C3AED 45%, #DB2777 100%)",

              transform:
                "translateY(-2px)",

              boxShadow:
                "0 12px 28px rgba(124,58,237,0.45)",
            },

            "&:active": {
              transform:
                "translateY(0)",
            },

            "&.Mui-disabled": {
              color:
                "rgba(255,255,255,0.65)",

              background:
                "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 45%, #EC4899 100%)",

              opacity: 0.55,
            },

            "& .MuiButton-startIcon": {
              marginRight: {
                xs: 0,
                sm: 1,
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline",
              },
            }}
          >
            Search
          </Box>
        </Button>
      </Box>
    </Box>
  );
}