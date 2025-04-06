import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const BookingForm = ({ onAddBooking }) => {
  const [form, setForm] = useState({
    customerName: '',
    serviceType: '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.customerName) errs.customerName = 'Customer name required';
    if (!form.serviceType) errs.serviceType = 'Service type required';
    if (!form.date) errs.date = 'Date required';
    if (!form.time) errs.time = 'Time required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onAddBooking(form);
      setForm({ customerName: '', serviceType: '', date: '', time: '' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">Book New Service</Typography>
      <TextField
        label="Customer Name"
        name="customerName"
        value={form.customerName}
        onChange={handleChange}
        fullWidth
        error={!!errors.customerName}
        helperText={errors.customerName}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Service Type"
        name="serviceType"
        value={form.serviceType}
        onChange={handleChange}
        fullWidth
        error={!!errors.serviceType}
        helperText={errors.serviceType}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.date}
        helperText={errors.date}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Time"
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={!!errors.time}
        helperText={errors.time}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default BookingForm;
