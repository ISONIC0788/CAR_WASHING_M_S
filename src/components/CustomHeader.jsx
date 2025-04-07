// CustomHeader.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useThemeContext } from './ThemeContext';
import {useThemeContext} from '../ThemeContext'

export default function CustomHeader() {
  const { mode, toggleTheme } = useThemeContext();

  const themeToggleButton = (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );

  return (

    <AppBar position="static">
        {/* <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      <h1>Custom Header Works!</h1>
    </div> */}
      <Toolbar>
        {/* You can add your own elements here, like your app's name or logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Your App Name or leave it empty */}
          Car Wash App
        </Typography>
        {themeToggleButton}
      </Toolbar>
    </AppBar>
  );
}