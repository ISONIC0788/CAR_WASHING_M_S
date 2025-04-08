// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        color : 'black',
        backgroundColor: (theme) => theme.palette.grey[200], // Set background to light grey for both modes
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://ebedcarwashingmanagementsystem.vercel.app/">
            Car Wash Ms
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;