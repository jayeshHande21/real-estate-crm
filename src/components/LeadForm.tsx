import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

interface Lead {
  id: number;
  name: string;
  phone: string;
}

interface LeadFormProps {
  addLead: (newLead: Lead) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ addLead }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Both fields are required");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    const newLead: Lead = {
      id: Date.now(),
      name,
      phone,
    };
    addLead(newLead);
    setName("");
    setPhone("");
    setError("");
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h6">Add New Lead</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 10 }}>
          Add Lead
        </Button>
      </form>
    </Paper>
  );
};

export default LeadForm;
