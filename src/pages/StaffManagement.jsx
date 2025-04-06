import React, { useState } from 'react';
// import StaffForm from '../components/staff/StaffForm';
// import StaffList from '../components/staff/StaffList';
import StaffForm from '../components/StaffForm';
import StaffList from '../components/StaffList';
import { Container, Typography } from '@mui/material';

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);

  const addStaff = (staff) => setStaffList([...staffList, staff]);

  const deleteStaff = (index) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      const updated = [...staffList];
      updated.splice(index, 1);
      setStaffList(updated);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Staff Management</Typography>
      <StaffForm onAddStaff={addStaff} />
      <StaffList staffList={staffList} onDelete={deleteStaff} />
    </Container>
  );
};

export default StaffManagement;
