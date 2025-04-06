import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StaffList = ({ staffList, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (staff) => {
    setSelectedStaff(staff); // Set the selected staff details
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null); // Reset the selected staff
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffList.map((staff, index) => (
            <TableRow key={index}>
              <TableCell><img src={URL.createObjectURL(staff.image)} alt="" width={40} /></TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleClickOpen(staff)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Responsive Dialog for Viewing Staff Details */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Staff Details"}
        </DialogTitle>
        <DialogContent>
          {selectedStaff ? (
            <>
              <DialogContentText>
                <strong>Name:</strong> {selectedStaff.name}
              </DialogContentText>
              <DialogContentText>
                <strong>Email:</strong> {selectedStaff.email}
              </DialogContentText>
              <DialogContentText>
                <strong>Image:</strong> <img src={URL.createObjectURL(selectedStaff.image)} alt="staff" width={100} />
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
    </>
  );
};

export default StaffList;
