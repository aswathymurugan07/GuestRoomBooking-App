import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import './Bookingscreen.css';
import moment from 'moment';

function Bookingscreen() {
    const navigate = useNavigate(); 
    const { id, fromdate, todate } = useParams(); 

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const fromDateFormatted = moment(fromdate, 'DD-MM-YYYY');
    const toDateFormatted = moment(todate, 'DD-MM-YYYY');

    const totaldays = moment.duration(toDateFormatted.diff(fromDateFormatted)).asDays() + 1;
    const totalamount = room ? totaldays * room.rentperday : 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getallroombyid', { id });
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [id]);

    async function bookRoom() {
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate: fromDateFormatted.format('YYYY-MM-DD'),
            todate: toDateFormatted.format('YYYY-MM-DD'), 
            totalamount,
            totaldays
        };

        try {
            const res = await axios.post('/api/bookings/bookroom', bookingDetails);
            setShowPopup(true);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/home'); 
    };

    return (
        <div className="con">
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <div className="roomDetails">
                    <div className="roomHeader">
                        <h1>{room.name}</h1>
                        <img className="roomImage" src={room.imageurls[0]} alt={room.name} />
                    </div>
                    <div className="bookingDetails">
                        <div className="detailsSection">
                            <h1>Booking Details</h1>
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {fromDateFormatted.format('DD-MM-YYYY')} </p>
                                <p>To Date: {toDateFormatted.format('DD-MM-YYYY')} </p>
                            </b>
                        </div>

                        <div className="amountSection">
                            <h1>Amount</h1>
                            <p>Total days: {totaldays}</p>
                            <p>Rent per day: {room.rentperday}</p>
                            <p>Total Amount: {totalamount}</p>
                        </div>
                    </div>
                    <div className="bookButton">
                        <button onClick={bookRoom}>Book now</button>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Your booking is successful!</p>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
