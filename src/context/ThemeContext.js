import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("movie_theme") || "dark");
  const toggleTheme = () => setMode(prev => {
    const next = prev === "dark" ? "light" : "dark";
    localStorage.setItem("movie_theme", next);
    return next;
  });

  const theme = useMemo(() => createTheme({
    palette: { mode, primary: { main: "#e50914" } },
    shape: { borderRadius: 12 }
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
export const useThemeMode = () => useContext(ThemeContext);