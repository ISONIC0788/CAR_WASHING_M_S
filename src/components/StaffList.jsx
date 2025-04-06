import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StaffList = ({ staffList, onDelete, onView }) => {
  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => <img src={URL.createObjectURL(params.row.image)} alt="" width={40} />,
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Add unique IDs to staffList (if not already provided)
  const rows = staffList.map((staff, index) => ({
    id: index + 1,
    ...staff,
  }));

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default StaffList;
