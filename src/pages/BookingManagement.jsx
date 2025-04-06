import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
// import BookingForm from '../components/BookingForm';
// import BookingTable from '../components/BookingTable';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingList';
const BookingManagement = () => {
  const [bookingList, setBookingList] = useState([]);

  const addBooking = (booking) => {
    setBookingList([...bookingList, booking]);
  };

  const deleteBooking = (id) => {
    const updated = bookingList.filter((_, index) => index + 1 !== id);
    setBookingList(updated);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>Booking Management</Typography>
      <BookingForm onAddBooking={addBooking} />
      <BookingTable bookingList={bookingList} onDelete={deleteBooking} />
    </Container>
  );
};

export default BookingManagement;
