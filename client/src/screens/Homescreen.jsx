import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [fromdate, setFromdate] = useState();
    const [todate, setTodate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                setFilteredRooms(response.data);
                setDuplicateRooms(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterRooms();
    }, [searchTerm, fromdate, todate]);

    const filterRooms = () => {
        let tempRooms = duplicateRooms;

        if (searchTerm) {
            tempRooms = tempRooms.filter(room =>
                room.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (fromdate && todate) {
            const startDate = moment(fromdate, 'DD-MM-YYYY');
            const endDate = moment(todate, 'DD-MM-YYYY');

            tempRooms = tempRooms.map((room) => {
                let isAvailable = true;
                for (const booking of room.currentbookings) {
                    const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
                    const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');

                    if (
                        startDate.isBetween(bookingStart, bookingEnd, null, '[]') ||
                        endDate.isBetween(bookingStart, bookingEnd, null, '[]') ||
                        bookingStart.isBetween(startDate, endDate, null, '[]') ||
                        bookingEnd.isBetween(startDate, endDate, null, '[]')
                    ) {
                        isAvailable = false;
                        break;
                    }
                }
                return { ...room, isAvailable };
            });
        }

        setFilteredRooms(tempRooms);
    };

    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            setFromdate(dates[0].format('DD-MM-YYYY'));
            setTodate(dates[1].format('DD-MM-YYYY'));
        } else {
            setFromdate(null);
            setTodate(null);
        }
    };

    const disabledDate = (current) => {
        // Disable dates before today
        return current && current < moment().startOf('day');
    };

    return (
        <div>
            <div className='row'>
                <div className='col-md-5 mt-5'>
                    <RangePicker format='DD-MM-YYYY' onChange={handleDateChange} disabledDate={disabledDate} />
                </div>
                <div className='col-md-5 mt-5 ml-auto d-flex justify-content-end'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: '200px' }}
                    />
                </div>
                <div className='col-md-2 mt-5'>
                    <button className="btn btn-primary" onClick={filterRooms}>Search</button>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message="Something went wrong" />
            ) : (
                <div className="rooms-container">
                    {filteredRooms.map((room) => (
                        <Room key={room._id} room={room} fromdate={fromdate} todate={todate} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Homescreen;
