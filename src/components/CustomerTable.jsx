import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; // Note: @mui/x-data-grid needs installation
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Sample data - Replace with your actual data fetching
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@example.com', phone: '123-456-7890' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@example.com', phone: '123-456-7891' },
  // ... more customer data
];

export default function CustomerTable() {
  const [customerRows, setCustomerRows] = React.useState(rows); // Manage data state

  const handleViewClick = (id) => (event) => {
    event.stopPropagation(); // don't select row on button click
    console.log(`View customer ${id}`);
    // TODO: Implement view logic (e.g., open modal, navigate to detail page)
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    console.log(`Delete customer ${id}`);
    // TODO: Implement delete confirmation and logic
    // Example: setCustomerRows(customerRows.filter((row) => row.id !== id));
     if(window.confirm(`Are you sure you want to delete customer ${id}?`)) {
        setCustomerRows((prevRows) => prevRows.filter((row) => row.id !== id));
        // Add API call here to delete from backend
     }
  };

  const handleAddNew = () => {
      console.log("Add new customer");
      // TODO: Implement logic to add a new customer (e.g., open a form modal)
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: false },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 200, editable: false },
    { field: 'phone', headerName: 'Phone', width: 150, editable: false },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            onClick={handleViewClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Add New Button [cite: 16] */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
          >
            Add New Customer
          </Button>
        </Box>
      <DataGrid
        rows={customerRows}
        columns={columns}
        pageSize={5} // Or manage pageSize state
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection={false} // Disable if not needed
        disableSelectionOnClick
        // Features like sorting, filtering are often enabled by default in DataGrid
        // Check @mui/x-data-grid docs for specific configuration
        // [cite: 10, 23]
      />
    </Box>
  );
}
