import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import StaffForm from '../components/StaffForm';
import StaffList from '../components/StaffList';
import ResponsiveDialog from '../components/ResponsiveDialog'; // Assuming a dialog component for viewing details
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [viewStaff, setViewStaff] = useState(null);
  const [staffCountData, setStaffCountData] = useState([]); // Store data for the chart

  // Add staff to the list
  const addStaff = (staff) => {
    const newStaffList = [...staffList, { ...staff, id: staffList.length + 1 }];
    setStaffList(newStaffList);

    // Add data for chart (example: track staff count over time)
    setStaffCountData((prevData) => [
      ...prevData,
      { name: `Day ${prevData.length + 1}`, staffCount: newStaffList.length },
    ]);
  };

  // Delete staff from the list
  const deleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updated = staffList.filter((staff) => staff.id !== id);
      setStaffList(updated);

      // Recalculate staff count data
      setStaffCountData((prevData) => [
        ...prevData,
        { name: `Day ${prevData.length + 1}`, staffCount: updated.length },
      ]);
    }
  };

  // Handle staff view action
  const onView = (staff) => {
    setViewStaff(staff);
  };

  // Close the view dialog
  const closeViewDialog = () => {
    setViewStaff(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Staff Management
      </Typography>
      <StaffForm onAddStaff={addStaff} />
      <StaffList staffList={staffList} onDelete={deleteStaff} onView={onView} />

      {/* LineChart to track staff count */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={staffCountData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="staffCount" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Display the view dialog when a staff member is selected */}
      {viewStaff && (
        <ResponsiveDialog
          open={!!viewStaff}
          onClose={closeViewDialog}
          staff={viewStaff}
        />
      )}
    </Container>
  );
};

export default StaffManagement;
