import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CustomerForm = ({ onAddCustomer }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone || !/^07[2,3,8,9]\d{7}$/.test(form.phone)) {
        newErrors.phone = 'Phone must be a valid Rwandan number like 0788459217';
      }
      setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddCustomer(form);
      setForm({ firstName: '', lastName: '', email: '', phone: '' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Add New Customer</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />
     <TextField
  label="Phone"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  fullWidth
  error={!!errors.phone}
  helperText={errors.phone}
  sx={{ mb: 2 }}
/>

      <Button type="submit" variant="contained">Add Customer</Button>
    </Box>
  );
};

export default CustomerForm;
