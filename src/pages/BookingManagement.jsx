import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const BookingManagement = () => {
  const [bookingList, setBookingList] = useState([]);

  const addBooking = (booking) => setBookingList([...bookingList, booking]);

  const deleteBooking = (index) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updated = [...bookingList];
      updated.splice(index, 1);
      setBookingList(updated);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Booking Management</Typography>
      <BookingForm onAddBooking={addBooking} />
      <BookingList bookingList={bookingList} onDelete={deleteBooking} />
    </Container>
  );
};

export default BookingManagement;
