import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

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

          background: "rgba(255, 255, 255, 0.10)",

          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",

          border: "1px solid rgba(255, 255, 255, 0.22)",

          boxShadow:
            "0 15px 45px rgba(0, 0, 0, 0.18)",

          transition: "all 0.3s ease",

          "&:hover": {
            background: "rgba(255, 255, 255, 0.14)",
            borderColor: "rgba(255, 255, 255, 0.30)",
          },

          "&:focus-within": {
            background: "rgba(255, 255, 255, 0.13)",

            borderColor: "rgba(124, 58, 237, 0.65)",

            boxShadow:
              "0 18px 50px rgba(0, 0, 0, 0.22), 0 0 0 4px rgba(124, 58, 237, 0.12)",
          },
        }}
      >
        {/* INPUT */}
        <TextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
              background: "transparent !important",
            },

            "& .MuiInputBase-input": {
              background: "transparent !important",

              color: "#ffffff",

              fontSize: {
                xs: "14px",
                sm: "16px",
              },

              fontWeight: 500,

              padding: {
                xs: "0 10px",
                sm: "0 16px",
              },

              "&::placeholder": {
                color: "rgba(255,255,255,0.65)",
                opacity: 1,
              },

              "&:-webkit-autofill": {
                WebkitBoxShadow:
                  "0 0 0 100px transparent inset",

                WebkitTextFillColor: "#ffffff",
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
              "0 8px 22px rgba(124, 58, 237, 0.35)",

            transition:
              "transform 0.2s ease, box-shadow 0.2s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg, #6D28D9 0%, #7C3AED 45%, #DB2777 100%)",

              transform: "translateY(-2px)",

              boxShadow:
                "0 12px 28px rgba(124, 58, 237, 0.45)",
            },

            "&:active": {
              transform: "translateY(0)",
            },

            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.55)",

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