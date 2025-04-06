import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import {
  Grid, Paper, Typography, Box, List,
  ListItem, ListItemText, Divider
} from '@mui/material';

// Sample Data (Replace with real fetched data later)
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

const recentBookings = [
  { id: 101, customer: 'John Doe', service: 'Full Wash', status: 'Pending' },
  { id: 102, customer: 'Jane Smith', service: 'Interior Clean', status: 'In Progress' },
  { id: 103, customer: 'Bob Johnson', service: 'Exterior Wash', status: 'Completed' },
];

export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* Daily Bookings Chart */}
        <Grid item xs={12} md={6} lg={7}>
          <Paper sx={{ p: 2, height: 280 }}>
            <Typography variant="h6" gutterBottom>
              Daily Bookings Overview
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Bookings List */}
        <Grid item xs={12} md={6} lg={5}>
          <Paper sx={{ p: 2, height: 280 }}>
            <Typography variant="h6" gutterBottom>
              Recent Bookings
            </Typography>
            <List dense sx={{ overflowY: 'auto', maxHeight: 220 }}>
              {recentBookings.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${booking.customer} - ${booking.service}`}
                      secondary={`Status: ${booking.status}`}
                    />
                  </ListItem>
                  {index < recentBookings.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Monthly Revenue Chart */}
        <Grid item xs={12} md={6} lg={7}>
          <Paper sx={{ p: 2, height: 280 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2e7d32" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Staff Summary (Static Placeholder) */}
        <Grid item xs={12} md={6} lg={5}>
          <Paper sx={{ p: 2, height: 280 }}>
            <Typography variant="h6" gutterBottom>
              Staff Assignments
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              This section will show staff availability, ongoing jobs, and task distribution.
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}
