import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'; // Import Box

// This component receives the open state, close handler, and staff data as props
const ResponsiveDialogS = ({ open, onClose, staff }) => {
  // If no staff data is provided, don't render anything (or render null/placeholder)
  if (!staff) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="staff-details-dialog-title"
      maxWidth="xs" // Optional: set max width
      fullWidth    // Optional: make it use the full width up to max width
    >
      <DialogTitle id="staff-details-dialog-title">
        Staff Member Details
      </DialogTitle>
      <DialogContent>
        {/* Display details using List for better structure */}
        <List sx={{ pt: 0 }}> {/* Remove padding top */}
          <ListItem>
            <ListItemAvatar>
              {/* Display the staff image */}
              <Avatar src={staff.image} alt={staff.name} sx={{ width: 56, height: 56 }} />
            </ListItemAvatar>
            {/* Display Name prominently */}
            <ListItemText primary={staff.name || 'N/A'} primaryTypographyProps={{ variant: 'h6' }} />
          </ListItem>

          <Divider component="li" sx={{ my: 1 }}/>

          <ListItem>
            <ListItemText primary="ID" secondary={staff.id || 'N/A'} />
          </ListItem>
          <Divider component="li" />
           <ListItem>
            <ListItemText primary="Email" secondary={staff.email || 'N/A'} />
          </ListItem>
           <Divider component="li" />
           <ListItem>
            <ListItemText primary="Phone" secondary={staff.phone || 'N/A'} />
          </ListItem>
           <Divider component="li" />
           <ListItem>
            <ListItemText primary="Role" secondary={staff.role || 'N/A'} />
          </ListItem>
          {/* Add any other relevant staff fields here */}

        </List>
      </DialogContent>
      <DialogActions>
        {/* Close button */}
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialogS;