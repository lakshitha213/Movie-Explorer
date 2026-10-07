import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  const submit = e => {
    e.preventDefault();
    const q = value.trim();
    if (q) onSearch(q);
  };

  return (
    <form onSubmit={submit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <TextField
          fullWidth value={value} onChange={e => setValue(e.target.value)}
          placeholder="Search for a movie..."
          inputProps={{ "aria-label": "movie search" }}
        />
        <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>
    </form>
  );
}