import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BookingTable = ({ bookingList, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (booking) => {
    setSelectedBooking(booking); // Set the selected booking details
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null); // Reset the selected booking
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customerName', headerName: 'Customer Name', width: 180 },
    { field: 'serviceType', headerName: 'Service Type', width: 160 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleClickOpen(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = bookingList.map((booking, index) => ({
    id: index + 1,
    ...booking,
  }));

  return (
    <Paper sx={{ height: 400, width: '100%', mt: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {/* View Booking Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Booking Details"}
        </DialogTitle>
        <DialogContent>
          {selectedBooking ? (
            <>
              <DialogContentText>
                <strong>Customer Name:</strong> {selectedBooking.customerName}
              </DialogContentText>
              <DialogContentText>
                <strong>Service Type:</strong> {selectedBooking.serviceType}
              </DialogContentText>
              <DialogContentText>
                <strong>Date:</strong> {selectedBooking.date}
              </DialogContentText>
              <DialogContentText>
                <strong>Time:</strong> {selectedBooking.time}
              </DialogContentText>
            </>
          ) : (
            <DialogContentText>Loading...</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BookingTable;
