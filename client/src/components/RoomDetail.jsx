import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import './RoomDetail.css';

function RoomDetail() {
    const { id, fromdate, todate } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`/api/rooms/getroom/${id}`);
                const roomData = response.data;
                setRoom(roomData);

                // Check availability for the given dates
                if (fromdate && todate) {
                    const startDate = moment(fromdate, 'DD-MM-YYYY');
                    const endDate = moment(todate, 'DD-MM-YYYY');
                    let available = true;

                    for (const booking of roomData.currentbookings) {
                        const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
                        const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');

                        if (
                            startDate.isBetween(bookingStart, bookingEnd, null, '[]') ||
                            endDate.isBetween(bookingStart, bookingEnd, null, '[]') ||
                            bookingStart.isBetween(startDate, endDate, null, '[]') ||
                            bookingEnd.isBetween(startDate, endDate, null, '[]')
                        ) {
                            available = false;
                            break;
                        }
                    }

                    setIsAvailable(available);
                }
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id, fromdate, todate]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error fetching room details</h1>;
    }

    if (!room) {
        return <h1>Room not found</h1>;
    }

    return (
        <div className="room-detail">
            <div className="image-container">
                {room.imageurls && room.imageurls.length > 0 ? (
                    <img src={room.imageurls[0]} alt={room.name} />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="details-container">
                <h1>{room.name}</h1>
                <p>Amenities: <span className='colr'>{room.amenity}</span></p>
                <p>Floor Size: <span className='colr'>{room.floorsize}</span></p>
                <p>No of Beds: <span className='colr'>{room.noofbeds}</span></p>
                <p>Minimum Stay: <span className='colr'>{room.minstay}</span> days</p>
                <p>Maximum Stay: <span className='colr'>{room.maxstay}</span> days</p>
                <p>Rent per Day: <span className='colr'>Rs {room.rentperday}</span></p>
                <p>Contact: <span className='colr'>{room.phonenumber}</span></p>
                <p>{room.description}</p>
                {isAvailable ? (
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`} className="book-now-button">
                        Book Now
                    </Link>
                ) : null}
            </div>
        </div>
    );
}

export default RoomDetail;
