import DashboardIcon from '@mui/icons-material/Dashboard';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'bookings', title: 'Booking Management', icon: <BookOnlineIcon /> },
  { segment: 'staff', title: 'Staff Management', icon: <AssignmentIndIcon /> },
  { segment: 'customers', title: 'Customer Records', icon: <PeopleIcon /> },
  // Add other items, headers, dividers as needed
];
