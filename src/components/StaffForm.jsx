import React, { useState } from 'react';
import {
  Button, TextField, Typography, Avatar, IconButton, Input, Box
} from '@mui/material';

const StaffForm = ({ onAddStaff }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', image: null });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Validate form data
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!form.name) newErrors.name = 'Name is required';

    // Email validation
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';

    // Password validation (min 8 chars, 1 uppercase, 1 digit, 1 special char)
    if (
      !form.password ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(form.password)
    ) {
      newErrors.password = 'Password must be 8+ chars, 1 uppercase, 1 number, 1 special char';
    }

    // Image validation (type and size)
    if (!form.image || !['image/jpeg', 'image/png'].includes(form.image.type)) {
      newErrors.image = 'Only JPEG or PNG allowed';
    }
    if (form.image && form.image.size > 1024 * 1024) { // 1MB limit
      newErrors.image = 'Image must be under 1MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form data change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image selection
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onAddStaff(form); // Pass form data to parent component
      setForm({ name: '', email: '', password: '', image: null }); // Reset form
      setPreview(null); // Clear image preview
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">Add New Staff</Typography>

      {/* Name Field */}
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
      />

      {/* Email Field */}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />

      {/* Password Field */}
      <TextField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        error={!!errors.password}
        helperText={errors.password}
        sx={{ mb: 2 }}
      />

      {/* Image Upload */}
      <Button variant="outlined" component="label">
        Upload Image
        <Input type="file" hidden onChange={handleImageChange} />
      </Button>
      {preview && <Avatar src={preview} alt="Preview" sx={{ width: 80, height: 80, mt: 2 }} />}
      {errors.image && <Typography color="error">{errors.image}</Typography>}

      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default StaffForm;
