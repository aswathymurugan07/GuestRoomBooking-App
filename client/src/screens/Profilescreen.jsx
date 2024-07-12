import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import './Profilescreen.css';

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
                const rooms = response.data;
                console.log(rooms);
                setBookings(rooms);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        };

        fetchBookings();
    }, [user._id]);

    return (
        <div className="profilescreen-container">
            {loading && (
                <div className="loader-container">
                    <Loader />
                </div>
            )}
            {error && (
                <div className="error-container">
                    <Error />
                </div>
            )}
            {!loading && !error && bookings.length === 0 && (
                <div className="no-bookings-message">
                    <p>No bookings available.</p>
                </div>
            )}
            {!loading && bookings.length > 0 && bookings.map(booking => (
                <div className="booking">
                    <p>{booking.room}</p>
                    <p>BookingId: {booking._id}</p>
                    <p>Check In: {booking.fromdate}</p>
                    <p>Check out: {booking.todate}</p>
                    <p>Total Days: {booking.totaldays}</p>
                    <p>Amount: {booking.totalamount}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Profilescreen;
