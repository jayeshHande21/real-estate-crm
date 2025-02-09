import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Paper, Typography } from "@mui/material";

interface Property {
  id: number;
  name: string;
  category: string;
  size: number;
  location: string;
  budget: number;
  availability: string;
}

const PropertyForm: React.FC<{ onAddProperty: (property: Property) => void }> = ({ onAddProperty }) => {
  const [formData, setFormData] = useState<Property>({
    id: Date.now(),
    name: "",
    category: "Residential",
    size: 0,
    location: "",
    budget: 0,
    availability: "Available",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name!]: name === "size" || name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProperty({ ...formData, id: Date.now() });
    setFormData({
      id: Date.now(),
      name: "",
      category: "Residential",
      size: 0,
      location: "",
      budget: 0,
      availability: "Available",
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add Property
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Property Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />

        <FormControl fullWidth>
          <InputLabel >Category</InputLabel>
          <Select name="category" value={formData.category} onChange={handleChange}>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Land">Land</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Size (sq ft)" name="size" type="number" value={formData.size} onChange={handleChange} required fullWidth />
        <TextField label="Location" name="location" value={formData.location} onChange={handleChange} required fullWidth />
        <TextField label="Budget ($)" name="budget" type="number" value={formData.budget} onChange={handleChange} required fullWidth />

        <FormControl fullWidth>
          <InputLabel>Availability</InputLabel>
          <Select name="availability" value={formData.availability} onChange={handleChange}>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="Rented">Rented</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Property
        </Button>
      </Box>
    </Paper>
  );
};

export default PropertyForm;
