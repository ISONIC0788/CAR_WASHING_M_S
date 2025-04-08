// src/pages/DashboardPage.js
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';

// Assuming you can somehow access these data arrays
const dailyBookingsData = [
  { name: 'Mon', bookings: 4 },
  { name: 'Tue', bookings: 6 },
  { name: 'Wed', bookings: 5 },
  { name: 'Thu', bookings: 8 },
  { name: 'Fri', bookings: 7 },
  { name: 'Sat', bookings: 10 },
  { name: 'Sun', bookings: 9 },
];

const revenueData = [
  { month: 'Jan', revenue: 400 },
  { month: 'Feb', revenue: 300 },
  { month: 'Mar', revenue: 500 },
  { month: 'Apr', revenue: 450 },
  { month: 'May', revenue: 600 },
  { month: 'Jun', revenue: 550 },
];

const recentBookingsSample = [
    { id: 101, customer: 'John Doe', service: 'Full Wash', status: 'Pending' },
    { id: 102, customer: 'Jane Smith', service: 'Interior Clean', status: 'In Progress' },
    { id: 103, customer: 'Bob Johnson', service: 'Exterior Wash', status: 'Completed' },
];

// --- Assuming you have access to customer and staff data ---
// You'll need to replace these with your actual data fetching or state management logic
const totalCustomers = 2; // Example: Get this from CustomerManagement state
const staffCountData = [ // Example: Get this from StaffManagement state
  { name: 'Start', staffCount: 3 },
  { name: 'Week 1', staffCount: 4 },
  { name: 'Week 2', staffCount: 5 },
];
// ---

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>

        {/* Example Chart 1: Daily Bookings */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography variant="h6" gutterBottom component="div">
              Daily Bookings
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyBookingsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Example Chart 2: Monthly Revenue Trend */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography variant="h6" gutterBottom component="div">
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* New Chart: Staff Count Trend */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography variant="h6" gutterBottom component="div">
              Staff Count Trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={staffCountData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="staffCount" stroke="#ffc658" /> 
                {/* blue  */}

              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Placeholder/Example: Recent Bookings Summary */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography variant="h6" gutterBottom component="div">
              Recent Bookings
            </Typography>
            <List dense sx={{ overflowY: 'auto', flexGrow: 1 }}>
              {recentBookingsSample.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${booking.customer} - ${booking.service}`}
                      secondary={`Status: ${booking.status}`}
                    />
                  </ListItem>
                  {index < recentBookingsSample.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* New Display: Total Customers */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 280 }}>
            <Typography variant="h5" component="div">
              Total Customers
            </Typography>
            <Typography variant="h2" component="div">
              {totalCustomers}
            </Typography>
          </Paper>
        </Grid>

        {/* Add more Grid items for other summaries or charts as needed */}

      </Grid>
      {/* <Footer></Footer> */}
    </Box>
  );
}