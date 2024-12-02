import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    toast.success('Booking confirmed!');
  };

  const verifyPassword = (providedPassword) => {
    if (!user || user.password !== providedPassword) {
      throw new Error('Invalid password');
    }
    return true;
  };

  const cancelBooking = (id, password) => {
    try {
      verifyPassword(password);
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
      throw error;
    }
  };

  const updateBooking = (id, quantity, password) => {
    try {
      verifyPassword(password);
      const updatedBookings = bookings.map(booking =>
        booking.id === id ? { ...booking, quantity } : booking
      );
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      toast.success('Booking updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update booking');
      throw error;
    }
  };

  const getBookingsByUser = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      cancelBooking, 
      updateBooking, 
      getBookingsByUser
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}