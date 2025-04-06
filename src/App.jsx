import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import CustomerTable from './components/CustomerTable';
import CustomerManagement from './pages/CustomerManagement';
import StaffForm from './components/StaffForm';
import DashboardPage from './pages/DashboardPage';
import StaffManagement from './pages/StaffManagement';
import BookingManagement from './pages/BookingManagement';
import { ThemeContextProvider } from './ThemeContext'; // Import context provider

import AppLayout from './AppLayout';

// --- Import Your Page Components ---
// Placeholder - Create these actual components
// const DashboardPage = () => <div>Dashboard Page Content</div>;
// const BookingManagementPage = () => <div>Booking Management Page Content</div>;
const StaffManagementPage = () => <div>Staff Management Page Content</div>;
const CustomerRecordsPage = () => <div>Customer Records Page Content</div>;
const NotFoundPage = () => <div>404 Not Found</div>;
// ---

export default function App() {
  return (
    // Wrap with Theme Context Provider
    <ThemeContextProvider>
      {/* CssBaseline provides baseline styling */}
      <CssBaseline />
      {/* BrowserRouter provides routing context */}
      <BrowserRouter>
        <Routes>
          {/* Use AppLayout as the parent route for dashboard views */}
          <Route path="/" element={<AppLayout />}>
            {/* Index route (optional, defaults to /dashboard maybe) */}
            <Route index element={<DashboardPage />} />
            {/* Define routes matching navigation segments [cite: 21] */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="booking" element={<BookingManagement />} />
            <Route path="StaffManagement" element={<StaffManagement />} />
            <Route path="customers" element={<CustomerTable />} />
            <Route path="customersms" element={<CustomerManagement />} />
            {/* Add nested routes if needed, e.g., /staff/:staffId */}
            {/* <Route path="StaffManagement" element={<StaffManagement />} /> */}
            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}