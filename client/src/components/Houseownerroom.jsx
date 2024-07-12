import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import './Houseownerroom.css';

function Houseownerroom() {
    const houseowner = JSON.parse(localStorage.getItem('currentHouseowner'));
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedRoomData, setEditedRoomData] = useState({
        _id: '',
        name: '',
        amenity: '',
        floorsize: '',
        noofbeds: '',
        minstay: '',
        maxstay: '',
        rentperday: '',
        phonenumber: '',
        description: '',
        imageurls: [],
        houseownerid: ''
    });

    useEffect(() => {
        async function fetchRoomDetails() {            
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getdetailsbyownerid', { houseownerid: houseowner._id });
                setRooms(response.data);
                setLoading(false);
                setCurrentImageIndex(response.data.reduce((acc, room) => {
                    acc[room._id] = 0;
                    return acc;
                }, {}));
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        fetchRoomDetails();
    }, [houseowner._id]);

    const handleNextImage = (roomId) => {
        setCurrentImageIndex((prevIndex) => ({
            ...prevIndex,
            [roomId]: (prevIndex[roomId] + 1) % rooms.find(room => room._id === roomId).imageurls.length
        }));
    };

    const handlePrevImage = (roomId) => {
        setCurrentImageIndex((prevIndex) => ({
            ...prevIndex,
            [roomId]: (prevIndex[roomId] - 1 + rooms.find(room => room._id === roomId).imageurls.length) % rooms.find(room => room._id === roomId).imageurls.length
        }));
    };

    const openEditModal = (room) => {
        setEditedRoomData(room);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedRoomData({
            _id: '',
            name: '',
            amenity: '',
            floorsize: '',
            noofbeds: '',
            minstay: '',
            maxstay: '',
            rentperday: '',
            phonenumber: '',
            description: '',
            imageurls: [],
            houseownerid: ''
        });
        setEditModalOpen(false);
    };

    const handleEditRoom = async () => {
        try {
            const response = await axios.put(`/api/rooms/${editedRoomData._id}`, editedRoomData);
            const updatedRoomIndex = rooms.findIndex(room => room._id === editedRoomData._id);
            if (updatedRoomIndex !== -1) {
                const updatedRooms = [...rooms];
                updatedRooms[updatedRoomIndex] = response.data;
                setRooms(updatedRooms);
            }
            closeEditModal();
        } catch (error) {
            console.log('Error editing room:', error);
            // Handle error
        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            setLoading(true);
            await axios.delete(`/api/rooms/${roomId}`);
            setRooms(rooms.filter(room => room._id !== roomId));
            setLoading(false);
        } catch (error) {
            console.log('Error deleting room:', error);
            setLoading(false);
            setError(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRoomData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (loading) return <Loader />;
    if (error) return <Error />;

    return (
        <div className="room-details-container">
            <h2>My Rooms</h2>
            {rooms.length > 0 ? (
                rooms.map(room => (
                    <div key={room._id} className="room-details">
                        <div className="room-images">
                            <img src={room.imageurls[currentImageIndex[room._id]]} alt={room.name} />
                            <div className="carousel-controls">
                                <button className="carousel-control" onClick={() => handlePrevImage(room._id)}>‹</button>
                                <button className="carousel-control" onClick={() => handleNextImage(room._id)}>›</button>
                            </div>
                        </div>
                        <h3>{room.name}</h3>
                        <p>Amenity: {room.amenity}</p>
                        <p>Floor Size: {room.floorsize}</p>
                        <p>Number of Beds: {room.noofbeds}</p>
                        <p>Min Stay: {room.minstay}</p>
                        <p>Max Stay: {room.maxstay}</p>
                        <p>Rent per Day: {room.rentperday}</p>
                        <p>Phone Number: {room.phonenumber}</p>
                        <p>Description: {room.description}</p>
                        <button onClick={() => openEditModal(room)}>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No rooms available.</p>
            )}

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit Room</h2>
                        <form onSubmit={handleEditRoom}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={editedRoomData.name} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="amenity">Amenity:</label>
                            <input type="text" id="amenity" name="amenity" value={editedRoomData.amenity} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="floorsize">Floor Size:</label>
                            <input type="text" id="floorsize" name="floorsize" value={editedRoomData.floorsize} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="noofbeds">Number of Beds:</label>
                            <input type="number" id="noofbeds" name="noofbeds" value={editedRoomData.noofbeds} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="minstay">Min Stay:</label>
                            <input type="text" id="minstay" name="minstay" value={editedRoomData.minstay} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="maxstay">Max Stay:</label>
                            <input type="text" id="maxstay" name="maxstay" value={editedRoomData.maxstay} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="rentperday">Rent per Day:</label>
                            <input type="text" id="rentperday" name="rentperday" value={editedRoomData.rentperday} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="phonenumber">Phone Number:</label>
                            <input type="text" id="phonenumber" name="phonenumber" value={editedRoomData.phonenumber} onChange={handleChange} required /><br/><br/>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={editedRoomData.description} onChange={handleChange} required /><br/><br/>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Houseownerroom;
