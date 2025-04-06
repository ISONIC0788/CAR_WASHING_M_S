import React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BookingList = ({ bookingList, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Customer Name</TableCell>
          <TableCell>Service Type</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookingList.map((booking, index) => (
          <TableRow key={index}>
            <TableCell>{booking.customerName}</TableCell>
            <TableCell>{booking.serviceType}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.time}</TableCell>
            <TableCell>
              <IconButton><VisibilityIcon /></IconButton>
              <IconButton onClick={() => onDelete(index)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingList;
