import * as React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CustomHeader from './components/CustomHeader';

import { useThemeContext } from './ThemeContext';
import { NAVIGATION } from './navigation';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();

  // Create the router object for AppProvider
  const router = React.useMemo(() => ({
    pathname: location.pathname,
    navigate: navigate,
  }), [location.pathname, navigate]);

  // Header toggle button [cite: 12, 25]
  const themeToggleButton = (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );

  // Aside buttons [cite: 13, 25] - Example, adjust placement as needed in sidebar/drawer
   const asideThemeButtons = (
     <Box sx={{ p: 1 }}>
       <Button variant={mode === 'light' ? 'contained' : 'outlined'} onClick={() => mode === 'dark' && toggleTheme()} fullWidth sx={{ mb: 1 }}>Light</Button>
       <Button variant={mode === 'dark' ? 'contained' : 'outlined'} onClick={() => mode === 'light' && toggleTheme()} fullWidth>Dark</Button>
     </Box>
   );

  return (
    // AppProvider requires the theme context *outside* of it if its components
    // need to trigger the theme change. Here ThemeContextProvider is wrapping App.
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      // theme prop can be omitted if using ThemeProvider outside
      // Integrate theme toggle button into AppBar actions or similar
       actions={[themeToggleButton]} // Example: Pass button to AppProvider actions
      // You might need to customize DashboardLayout's Drawer/Sidebar to add asideThemeButtons
    >
      <DashboardLayout
       // You might pass asideThemeButtons to a custom sidebar component if needed   
       header={<CustomHeader />} 
      >
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}