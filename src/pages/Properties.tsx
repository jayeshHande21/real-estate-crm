import React, { useState } from "react";
import PropertyForm from "../components/PropertyForm.tsx";
import PropertyList from "../components/PropertyList.tsx";
import PropertySearch from "../components/PropertySearch.tsx";

interface Property {
  id: number;
  name: string;
  category: string;
  size: number;
  location: string;
  budget: number;
  availability: string;
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

 
  const handleAddProperty = (property: Property) => {
    setProperties((prev) => [...prev, property]);
    setFilteredProperties((prev) => [...prev, property]); 
  };


  const handleSearch = (searchQuery: string, category: string, budgetRange: string) => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (budgetRange) {
      const [min, max] = budgetRange.split("-").map(Number);
      filtered = filtered.filter((p) => 
        max ? p.budget >= min && p.budget <= max : p.budget >= min
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div>
      <h1>Properties Page</h1>

      {/* Property Form */}
      <PropertyForm onAddProperty={handleAddProperty} />

      {/* Search & Filters */}
      <PropertySearch onSearch={handleSearch} />

      {/* Property List with Filtered Data */}
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Properties;
