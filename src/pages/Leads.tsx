import React, { useState } from "react";
import LeadForm from "../components/LeadForm.tsx";
import { 
  TextField, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, 
  Button, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";

interface Lead {
  id: number;
  name: string;
  phone: string;
  documents: string[]; // Stores uploaded file names
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: "John Doe", phone: "1234567890", documents: [] },
    { id: 2, name: "Jane Smith", phone: "9876543210", documents: [] },
    { id: 3, name: "Alice Johnson", phone: "4567891230", documents: [] },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Open Edit Dialog
  const handleEdit = (lead: Lead) => {
    setEditLead(lead);
    setOpenEditDialog(true);
  };

  // Save Edited Lead
  const handleSaveEdit = () => {
    if (editLead) {
      setLeads(leads.map(lead => lead.id === editLead.id ? editLead : lead));
    }
    setOpenEditDialog(false);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, leadId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setLeads(leads.map(lead =>
        lead.id === leadId ? { ...lead, documents: [...lead.documents, file.name] } : lead
      ));
    }
  };

  // Handle pagination
  const handlePageChange = (_: unknown, newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter leads based on search query
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
  );

  return (
    <div>
      <h1>Leads Page</h1>
      <LeadForm />

      {/* Search Bar */}
      <TextField
        label="Search Leads"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Leads Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Documents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                {lead.documents.length > 0 ? lead.documents.join(", ") : "No documents"}
              </TableCell>
              <TableCell>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, lead.id)}
                  style={{ display: "none" }}
                  id={`upload-${lead.id}`}
                />
                <label htmlFor={`upload-${lead.id}`}>
                  <Button variant="outlined" component="span">Upload</Button>
                </label>
                &nbsp;
                <Button variant="contained" color="primary" onClick={() => handleEdit(lead)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={filteredLeads.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Edit Lead Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Lead</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={editLead?.name || ""}
            onChange={(e) => setEditLead((prev) => (prev ? { ...prev, name: e.target.value } : null))}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="dense"
            value={editLead?.phone || ""}
            onChange={(e) => setEditLead((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Leads;
