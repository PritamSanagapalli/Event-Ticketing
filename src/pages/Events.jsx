import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';

const events = [
  {
    id: '1',
    name: 'Summer Music Festival',
    date: '2024-07-15',
    description: 'A day of amazing live music performances',
    price: 89.99,
    category: 'Concert',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: '2',
    name: 'Comedy Night',
    date: '2024-06-20',
    description: 'An evening of laughter with top comedians',
    price: 49.99,
    category: 'Comedy',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    id: '3',
    name: 'Tech Conference 2024',
    date: '2024-08-10',
    description: 'The biggest tech conference of the year',
    price: 299.99,
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1712&q=80'
  }
];

function Events() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { isAuthenticated, user } = useAuth();
  const { addBooking } = useBookings();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBooking = (event) => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    setSelectedEvent(event);
  };

  const confirmBooking = () => {
    if (selectedEvent && user) {
      addBooking({
        eventId: selectedEvent.id,
        userId: user.email,
        eventName: selectedEvent.name,
        date: selectedEvent.date,
        quantity: quantity
      });
      setSelectedEvent(null);
      setQuantity(1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
              <p className="mt-2 text-gray-600">{event.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">${event.price}</span>
                <span className="text-gray-600">{event.date}</span>
              </div>
              <button
                onClick={() => handleBooking(event)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book {selectedEvent.name}</h2>
            <p className="text-gray-600 mb-4">Date: {selectedEvent.date}</p>
            <p className="text-gray-600 mb-4">Price: ${selectedEvent.price}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;