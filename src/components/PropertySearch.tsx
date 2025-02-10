import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Box, SelectChangeEvent } from "@mui/material";

interface PropertySearchProps {
  onSearch: (searchQuery: string, category: string, budgetRange: string) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [budgetRange, setBudgetRange] = useState("");

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value, category, budgetRange);
  };

  // Handle Category Change
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value as string);
    onSearch(searchQuery, e.target.value as string, budgetRange);
  };

  // Handle Budget Range Change
  const handleBudgetChange = (e: SelectChangeEvent<string>) => {
    setBudgetRange(e.target.value as string);
    onSearch(searchQuery, category, e.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3, mb: 3 }}>
      {/* Search Input */}
      <TextField 
        label="Search by Name or Location" 
        variant="outlined" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        fullWidth
      />

      {/* Category Filter */}
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Residential">Residential</MenuItem>
          <MenuItem value="Commercial">Commercial</MenuItem>
          <MenuItem value="Land">Land</MenuItem>
        </Select>
      </FormControl>

      {/* Budget Filter */}
      <FormControl fullWidth>
        <InputLabel>Budget Range</InputLabel>
        <Select value={budgetRange} onChange={handleBudgetChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="0-500000">0 - 5 Lakhs</MenuItem>
          <MenuItem value="500000-1000000">5 - 10 Lakhs</MenuItem>
          <MenuItem value="1000000-2000000">10 - 20 Lakhs</MenuItem>
          <MenuItem value="2000000+">20+ Lakhs</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PropertySearch;
