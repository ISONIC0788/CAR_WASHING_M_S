import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; 
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingList';

const BookingManagement = () => {
  // Initial booking data
  const defaultBookingList = [
    { id: 1, customerName: 'Alice Brown', date: '2025-04-01', status: 'Completed' },
    { id: 2, customerName: 'Bob Green', date: '2025-04-02', status: 'Pending' },
    { id: 3, customerName: 'Charlie White', date: '2025-04-03', status: 'Completed' },
  ];

  const defaultBookingData = [
    { date: '2025-04-01', bookings: 1 },
    { date: '2025-04-02', bookings: 1 },
    { date: '2025-04-03', bookings: 1 },
  ];

  const [bookingList, setBookingList] = useState(defaultBookingList);
  const [bookingData, setBookingData] = useState(defaultBookingData);

  const addBooking = (booking) => {
    const newBookingList = [...bookingList, { ...booking, id: bookingList.length + 1 }];
    setBookingList(newBookingList);

    // Update booking chart data (e.g., track bookings by date)
    const date = new Date(booking.date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const updatedData = [...bookingData];
    const existingData = updatedData.find((entry) => entry.date === date);
    if (existingData) {
      existingData.bookings += 1;
    } else {
      updatedData.push({ date, bookings: 1 });
    }
    setBookingData(updatedData);
  };

  const deleteBooking = (id) => {
    const updated = bookingList.filter((_, index) => index + 1 !== id);
    setBookingList(updated);

    // Recalculate booking chart data
    setBookingData((prevData) => {
      const updatedData = [...prevData];
      const date = bookingList[id - 1].date; // Get the date of the booking being deleted
      const existingData = updatedData.find((entry) => entry.date === date);
      if (existingData && existingData.bookings > 0) {
        existingData.bookings -= 1;
      }
      return updatedData;
    });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Booking Management
      </Typography>
      
      {/* Booking Form */}
      <BookingForm onAddBooking={addBooking} />

      {/* Booking Table */}
      <BookingTable bookingList={bookingList} onDelete={deleteBooking} />

      {/* LineChart to track bookings */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={bookingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bookings" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default BookingManagement;
