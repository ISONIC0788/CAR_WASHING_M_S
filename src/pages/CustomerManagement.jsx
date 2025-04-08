import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import Footer from '../components/Footer';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, firstName: 'Jon', lastName: 'Snow', email: 'jon@example.com', phone: '123-456-7890' },
    { id: 2, firstName: 'Cersei', lastName: 'Lannister', email: 'cersei@example.com', phone: '123-456-7891' },
  ]);

  const addCustomer = (customer) => {
    const newCustomer = { id: customers.length + 1, ...customer };
    setCustomers([...customers, newCustomer]);
  };

  const deleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const viewCustomer = (customer) => {
    alert(`Customer Details:\n${customer.firstName} ${customer.lastName}\n${customer.email}\n${customer.phone}`);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 , color: '', fontWeight: 'bold'}}>Customer Management</Typography>
      <CustomerForm onAddCustomer={addCustomer} />
      <CustomerList customers={customers} onDelete={deleteCustomer} onView={viewCustomer} />
      {/* <Footer></Footer> */}
    </Container>
  );
};

export default CustomerManagement;
