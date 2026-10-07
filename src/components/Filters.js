import React from "react";
import { MenuItem, Stack, TextField } from "@mui/material";

export default function Filters({ genres, filters, setFilters }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mt: 2 }}>
      <TextField select label="Genre" value={filters.genre}
        onChange={e => setFilters(f => ({...f, genre:e.target.value}))} sx={{ minWidth: 180 }}>
        <MenuItem value="">All genres</MenuItem>
        {genres.map(g => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
      </TextField>
      <TextField label="Year" type="number" value={filters.year}
        onChange={e => setFilters(f => ({...f, year:e.target.value}))} />
      <TextField select label="Minimum rating" value={filters.rating}
        onChange={e => setFilters(f => ({...f, rating:e.target.value}))} sx={{ minWidth: 180 }}>
        <MenuItem value="">Any</MenuItem>
        {[5,6,7,8,9].map(n => <MenuItem key={n} value={n}>{n}.0+</MenuItem>)}
      </TextField>
    </Stack>
  );
}