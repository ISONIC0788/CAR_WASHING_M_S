import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ResponsiveDialog = ({ open, onClose, staff }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Staff Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Name:</strong> {staff.name}
        </DialogContentText>
        <DialogContentText>
          <strong>Email:</strong> {staff.email}
        </DialogContentText>
        <DialogContentText>
          <strong>Image:</strong>
          <img src={URL.createObjectURL(staff.image)} alt="Staff" width={100} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
