import React, { useState } from 'react';
import {
  Button, TextField, Typography, Avatar, Input, Box, FormHelperText // Added FormHelperText
} from '@mui/material';

// Define image constraints (example: 2MB) - adjust as needed
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

// Changed prop name from onAddStaff to onSubmit for consistency
const StaffForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      phone: '', // Assuming phone is needed based on StaffManagement page
      role: ''   // Assuming role is needed based on StaffManagement page
      // Add other fields corresponding to your data structure
  });
  const [imageFile, setImageFile] = useState(null); // Store the actual File object
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';

    // Use consistent password regex from previous examples
    if (!form.password) {
         newErrors.password = 'Password is required.';
    } else {
        if (form.password.length < 8) {
            newErrors.password = (newErrors.password || '') + " Must be at least 8 characters.";
        }
        if (!/(?=.*[A-Z])/.test(form.password)) {
             newErrors.password = (newErrors.password || '') + " Must contain an uppercase letter.";
        }
        if (!/(?=.*\d)/.test(form.password)) {
             newErrors.password = (newErrors.password || '') + " Must contain a number.";
        }
        if (!/(?=.*[!@#$%^&*])/.test(form.password)) {
             newErrors.password = (newErrors.password || '') + " Must contain a special character (!@#$%^&*).";
        }
    }

    // Image validation - Check the imageFile state
    if (!imageFile) { // Check if a file has been selected and validated
      // You might make image optional or required depending on needs
      // newErrors.image = 'Image is required';
    }
    // Note: Type/Size validation is now done in handleImageChange

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form data change
  const handleChange = e => {
      setForm({ ...form, [e.target.name]: e.target.value });
      // Clear error on change
       if (errors[e.target.name]) {
           setErrors(prev => ({ ...prev, [e.target.name]: null }));
       }
  };

  // Handle image selection - Including validation from previous examples
  const handleImageChange = e => {
    const file = e.target.files[0];
    // Clear previous image errors/state
    setErrors(prev => ({...prev, image: null}));
    setPreview(null);
    setImageFile(null);

    if (file) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Invalid file type. Please upload JPEG or PNG.' }));
        return;
      }
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setErrors(prev => ({ ...prev, image: `File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` }));
        return;
      }
      // Store the valid file object
      setImageFile(file);
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Separate the image file from the rest of the form data
      const staffFormData = {
          name: form.name,
          email: form.email,
          password: form.password, // Be careful about sending raw passwords
          phone: form.phone,
          role: form.role
          // include other relevant fields from 'form' state
      };
      // Call the onSubmit prop with BOTH form data AND the image file
      onSubmit(staffFormData, imageFile);

      // Reset form after successful submission call
      setForm({ name: '', email: '', password: '', phone: '', role: '' });
      setImageFile(null);
      setPreview(null);
      setErrors({}); // Clear errors as well
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6">Add New Staff</Typography>

      {/* --- Fields --- */}
      <TextField required label="Name" name="name" value={form.name} onChange={handleChange} fullWidth error={!!errors.name} helperText={errors.name} sx={{ mb: 2 }} />
      <TextField required label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
      <TextField required label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth error={!!errors.password} helperText={errors.password || "Min 8 chars, 1 uppercase, 1 number, 1 special"} sx={{ mb: 2 }} />
      <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth error={!!errors.phone} helperText={errors.phone} sx={{ mb: 2 }} />
      <TextField label="Role" name="role" value={form.role} onChange={handleChange} fullWidth error={!!errors.role} helperText={errors.role} sx={{ mb: 2 }} />

      {/* Image Upload */}
      <Box sx={{ mb: 2 }}> {/* Wrap image upload in a Box for margin */}
          <Button variant="outlined" component="label">
            Upload Image
            {/* Using hidden input for styling flexibility */}
            <input type="file" hidden accept={ALLOWED_FILE_TYPES.join(',')} onChange={handleImageChange} />
          </Button>
          {preview && <Avatar src={preview} alt="Preview" sx={{ width: 80, height: 80, mt: 2 }} />}
          {/* Display image validation errors */}
          {errors.image && <FormHelperText error sx={{ mt: 1 }}>{errors.image}</FormHelperText>}
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Staff
      </Button>
    </Box>
  );
};

export default StaffForm;