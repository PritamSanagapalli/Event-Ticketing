import React from 'react';
import { Ticket, Users, Calendar, Shield } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About EventHub</h1>
        <p className="text-xl text-gray-600">Your premier destination for discovering and booking amazing events</p>
      </div>

      <div className="prose prose-lg max-w-none text-gray-600">
        <p className="mb-8">
          EventHub is your one-stop platform for discovering, booking, and managing event tickets. 
          Whether you're looking for concerts, comedy shows, conferences, or sporting events, 
          we've got you covered with a seamless booking experience and the best selection of events in your area.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Ticket className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book your tickets in just a few clicks with our user-friendly interface and secure payment system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Diverse Events</h3>
            <p className="text-gray-600">
              From intimate gatherings to large-scale festivals, find events that match your interests.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Stay informed with instant notifications about your bookings and event updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Your data and transactions are protected with industry-standard security measures.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At EventHub, we're passionate about connecting people with unforgettable experiences. 
            Our mission is to make event discovery and booking as simple and enjoyable as possible, 
            while providing exceptional value to both event organizers and attendees.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;