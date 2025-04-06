import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StaffList = ({ staffList, onDelete }) => {
  return (
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
              <IconButton><VisibilityIcon /></IconButton>
              <IconButton onClick={() => onDelete(index)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StaffList;
