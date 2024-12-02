import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { Search, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';

function Home() {
  const { isAuthenticated, user, login, signup } = useAuth();
  const { getBookingsByUser, cancelBooking, updateBooking } = useBookings();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [action, setAction] = useState(null);
  const [password, setPassword] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        login(formData.email, formData.password);
      } else {
        signup(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAction = (booking, actionType) => {
    setSelectedBooking(booking);
    setAction(actionType);
    if (actionType === 'update') {
      setNewQuantity(booking.quantity);
    }
    setPassword('');
  };

  const handleConfirmAction = async () => {
    try {
      if (!selectedBooking || !action) return;

      if (action === 'cancel') {
        await cancelBooking(selectedBooking.id, password);
      } else {
        await updateBooking(selectedBooking.id, newQuantity, password);
      }

      setSelectedBooking(null);
      setAction(null);
      setPassword('');
    } catch (error) {
      toast.error(error.message || 'Action failed');
    }
  };

  const userBookings = user ? getBookingsByUser(user.email) : [];
  const filteredBookings = userBookings.filter(booking =>
    booking.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here are your upcoming events:</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No bookings found. Start exploring events!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900">{booking.eventName}</h3>
              <p className="mt-2 text-gray-600">Date: {booking.date}</p>
              <p className="text-gray-600">Tickets: {booking.quantity}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAction(booking, 'update')}
                  className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleAction(booking, 'cancel')}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Password Verification Modal */}
      {selectedBooking && action && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {action === 'cancel' ? 'Cancel Booking' : 'Update Booking'}
            </h2>
            
            {action === 'update' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Ticket Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password to confirm"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  setAction(null);
                  setPassword('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;