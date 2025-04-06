import React, { useState } from 'react';
import {
  Button, TextField, Typography, Avatar, IconButton, Input, Box
} from '@mui/material';

const StaffForm = ({ onAddStaff }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', image: null });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (
      !form.password ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(form.password)
    ) {
      newErrors.password = 'Password must be 8+ chars, 1 uppercase, 1 number, 1 special char';
    }
    if (!form.image || !['image/jpeg', 'image/png'].includes(form.image.type)) {
      newErrors.image = 'Only JPEG or PNG allowed';
    }
    if (form.image && form.image.size > 1024 * 1024) {
      newErrors.image = 'Image must be under 1MB';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onAddStaff(form);
      setForm({ name: '', email: '', password: '', image: null });
      setPreview(null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">Add New Staff</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth error={!!errors.name} helperText={errors.name} sx={{ mb: 2 }} />
      <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
      <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth error={!!errors.password} helperText={errors.password} sx={{ mb: 2 }} />

      <Button variant="outlined" component="label">
        Upload Image
        <Input type="file" hidden onChange={handleImageChange} />
      </Button>
      {preview && <Avatar src={preview} alt="Preview" sx={{ width: 80, height: 80, mt: 2 }} />}
      {errors.image && <Typography color="error">{errors.image}</Typography>}

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
};

export default StaffForm;
