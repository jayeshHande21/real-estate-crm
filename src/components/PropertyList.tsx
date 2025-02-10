import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Property {
  id: number;
  name: string;
  category: string;
  size: number;
  location: string;
  budget: number;
  availability: string;
}

const PropertyList: React.FC<{ properties?: Property[] }> = ({ properties = [] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProperty(null);
  };

  return (
    <Paper sx={{ width: "90%", margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Property List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Size (sq ft)</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Budget (Rs)</b></TableCell>
              <TableCell><b>Availability</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.category}</TableCell>
                <TableCell>{property.size}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>{property.budget}</TableCell>
                <TableCell>{property.availability}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(property)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={properties.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Category"
                defaultValue={selectedProperty.category}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Size"
                type="number"
                defaultValue={selectedProperty.size}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Budget"
                type="number"
                defaultValue={selectedProperty.budget}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleClose} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PropertyList;
