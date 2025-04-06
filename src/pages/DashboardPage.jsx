// src/pages/DashboardPage.js
import React from 'react'; // Make sure to install recharts: npm install recharts
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// --- Sample Data (Replace with fetched data) ---
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
// ---

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>

        {/* Example Chart 1: Daily Bookings */}
        <Grid item xs={12} md={6} lg={7}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
            <Typography variant="h6" gutterBottom component="div">
              Daily Bookings Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyBookingsData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
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

         {/* Placeholder/Example: Recent Bookings Summary */}
         <Grid item xs={12} md={6} lg={5}>
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
             <Typography variant="h6" gutterBottom component="div">
               Recent Bookings
             </Typography>
             {/* TODO: Fetch and display actual recent bookings data */}
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

        {/* Example Chart 2: Revenue Trend */}
        <Grid item xs={12} md={6} lg={7}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Monthly Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5, }}
                    >
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

        {/* Placeholder: Staff Status / Assignments Summary */}
        <Grid item xs={12} md={6} lg={5}>
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 280 }}>
             <Typography variant="h6" gutterBottom component="div">
               Staff Status / Assignments
             </Typography>
             {/* TODO: Fetch and display staff status or assignment summaries */}
             <Typography variant="body1" sx={{ mt: 2 }}>
                (Staff assignment summaries and status tracking details would go here)
             </Typography>
             {/* Example: List available staff, staff assigned to ongoing jobs, etc. */}
           </Paper>
         </Grid>

        {/* Add more Grid items for other summaries or charts as needed */}

      </Grid>
    </Box>
  );
}