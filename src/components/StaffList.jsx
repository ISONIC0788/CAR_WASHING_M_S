// src/components/StaffList.jsx

import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { IconButton, Paper, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Default props ensure component doesn't break if props aren't passed
const StaffList = ({ staffList = [], onDelete = () => {}, onView = () => {} }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 }, // Use ID from data
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      renderCell: (params) => (
        // Directly use the image source (assuming it's an imported module or a URL string)
        <Avatar src={params.row.image} alt={params.row.name || 'staff'} />
      ),
       sortable: false,
       filterable: false,
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 150}, // Example column
    { field: 'role', headerName: 'Role', width: 130 },  // Example column
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <>
          {/* Pass the whole row object to onView */}
          <IconButton onClick={() => onView(params.row)} aria-label="View">
            <VisibilityIcon />
          </IconButton>
          {/* Pass only the ID to onDelete */}
          <IconButton onClick={() => onDelete(params.row.id)} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Rows are now directly from the staffList prop
  const rows = staffList;

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection={false}
        disableSelectionOnClick
        sx={{ border: 0 }}
        // Ensure rows have a unique 'id' prop for DataGrid
        getRowId={(row) => row.id}
      />
    </Paper>
  );
};

export default StaffList;