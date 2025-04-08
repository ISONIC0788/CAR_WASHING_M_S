// src/pages/StaffManagement.jsx

import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import StaffForm from '../components/StaffForm'; // 
import StaffList from '../components/StaffList'; // 
import Footer from '../components/Footer';
// import ResponsiveDialog from '../components/ResponsiveDialog'; // Ensure this path is correct and component exists
import ResponsiveDialogS from '../components/ResponsiveDialogS';
// Import Recharts components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Import your sample image ---
import sampleImage from '../assets/react.svg'; 

// --- Define Initial Staff Data ---
const initialStaffData = [
  {
    id: 1, // Use unique IDs
    image: sampleImage, // Use the imported image variable
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    phone: '0788450003',
    role: 'Manager'
  },
  {
    id: 2,
    image: sampleImage,
    name: 'Bob Smith',
    email: 'bob@gmail.com',
    phone: '0788450003',
    role: 'Technician'
  },
  {
    id: 3,
    image: sampleImage,
    name: 'Charlie Brown',
    email: 'charlie@gmail.com',
    phone: '0788450034',
    role: 'Technician'
  },
];

const StaffManagement = () => {
  // --- Initialize state with initial data ---
  const [staffList, setStaffList] = useState(initialStaffData);
  const [viewStaff, setViewStaff] = useState(null);
  const [staffCountData, setStaffCountData] = useState([]); // Store data for the chart

  // --- Update chart data when staffList changes ---
  useEffect(() => {
    // Update chart data based on current staff count whenever list changes
    setStaffCountData((prevData) => [
         ...prevData,
         { name: `Time ${prevData.length + 1}`, staffCount: staffList.length }
    ]);
  }, [staffList]); // Rerun effect when staffList changes

  // Add staff to the list
  const addStaff = (staffFormData, imageFile) => {
    // In a real app: upload imageFile, get URL, store URL.
    // Using Object URL for temporary preview if new file exists, else default image.
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : sampleImage;

    const newStaffMember = {
        ...staffFormData,
        id: Date.now(), // Use timestamp for unique temporary ID
        image: imageUrl,
    };
    setStaffList((prevList) => [...prevList, newStaffMember]);
     // Revoke Object URL later if created to prevent memory leaks
     // if (imageFile) { /* add logic to revoke later, maybe on component unmount or after upload */ }
  };


  // Delete staff from the list
  const deleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updated = staffList.filter((staff) => staff.id !== id);
      setStaffList(updated);
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

      {/* Pass the addStaff function correctly */}
      {/* Ensure StaffForm calls onSubmit(formData, imageFile) */}
      <StaffForm onSubmit={addStaff} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}> {/* Added margin top */}
          Current Staff
      </Typography>
      <StaffList staffList={staffList} onDelete={deleteStaff} onView={onView} />

      {/* LineChart to track staff count */}
       <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>Staff Count Trend</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={staffCountData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="staffCount" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
       </Paper>

      {/* Display the view dialog when a staff member is selected */}
      {viewStaff && (
         <ResponsiveDialogS
         open={!!viewStaff}
         onClose={closeViewDialog} // Pass the close handler
         staff={viewStaff}        // Pass the selected staff data
       />
      )}
      {/* <Footer></Footer> */}
    </Container>
  );
};

export default StaffManagement;