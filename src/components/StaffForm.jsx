import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';

export default function StaffForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = React.useState({
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      password: '', // Don't prefill password typically
      // Add other fields as needed
  });
  const [imagePreview, setImagePreview] = React.useState(initialData.imageUrl || null);
  const [errors, setErrors] = React.useState({}); // For validation errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Basic clearing of error on change
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          // TODO: Add file type and size validation [cite: 20]
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result); // [cite: 15, 32]
          };
          reader.readAsDataURL(file);
          // Store the file object itself if needed for submission
          // setFormData(prev => ({ ...prev, imageFile: file }));
      } else {
          setImagePreview(null);
           // setFormData(prev => ({ ...prev, imageFile: null }));
      }
  };

  const validateForm = () => {
      let tempErrors = {};
      // Empty checks [cite: 18]
      if (!formData.firstName) tempErrors.firstName = "First name is required.";
      if (!formData.lastName) tempErrors.lastName = "Last name is required.";
      if (!formData.email) tempErrors.email = "Email is required.";
      // Email format check [cite: 18]
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          tempErrors.email = "Email format is invalid.";
      }
      // Password check [cite: 19] - Example, adjust regex as needed
      if (!formData.password) tempErrors.password = "Password is required.";
      else if (formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters.";
      else if (!/(?=.*[A-Z])/.test(formData.password)) tempErrors.password = "Password must contain an uppercase letter.";
      else if (!/(?=.*\d)/.test(formData.password)) tempErrors.password = "Password must contain a number.";
      else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) tempErrors.password = "Password must contain a special character.";

      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        console.log("Form data submitted:", formData);
        // TODO: Implement actual submission logic (e.g., API call)
        // onSubmit(formData); // Pass data to parent component if needed
    } else {
        console.log("Form validation failed:", errors);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
      noValidate // Disable browser validation, rely on custom
    >
      <Typography variant="h6" gutterBottom>
        Staff Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
             value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
             value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
         <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="new-password"
             value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>
        {/* Add other fields like phone, role etc. */}
         <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Staff Image</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                 <Avatar src={imagePreview} sx={{ width: 56, height: 56 }}/>
                 <Button variant="outlined" component="label">
                    Upload Image
                    <input
                        type="file"
                        hidden
                        accept="image/jpeg, image/png" // [cite: 20]
                        onChange={handleImageChange}
                    />
                 </Button>
            </Box>
             {/* TODO: Add image validation errors if needed */}
         </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Staff Member {/* Button text could be dynamic */}
      </Button>
    </Box>
  );
}