import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import './Houseownerscreen.css';

function Houseownerscreen() {
  const [name, setName] = useState('');
  const [amenity, setAmenity] = useState('');
  const [floorsize, setFloorsize] = useState('');
  const [noofbeds, setNoofbeds] = useState(0);
  const [minstay, setMinstay] = useState(0);
  const [maxstay, setMaxstay] = useState(0);
  const [rentperday, setRentperday] = useState(0);
  const [phonenumber, setPhonenumber] = useState('');
  const [imageurls, setImageurls] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const houseowner = JSON.parse(localStorage.getItem('currentHouseowner'));

  async function addRoom() {
    const room = {
      name,
      amenity,
      floorsize,
      noofbeds,
      minstay,
      maxstay,
      rentperday,
      phonenumber,
      imageurls: imageurls.split(',').map(url => url.trim()), 
      description,
      houseownerid:houseowner._id
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/rooms/addroom', room);
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('lastAddedRoomId', response.data._id); 
      resetForm();
    } catch (error) {
      console.log("Error adding rooms",error.response.data.message);
      setLoading(false);
      setError(true);
    }
  }

  function resetForm() {
    setName('');
    setAmenity('');
    setFloorsize('');
    setNoofbeds(0);
    setMinstay(0);
    setMaxstay(0);
    setRentperday(0);
    setPhonenumber('');
    setImageurls('');
    setDescription('');
  }

  return (
    <div className="houseowner-container">
      {loading && <Loader />}
      {error && <Error />}
      <div className="houseowner-form">
        {success && <Success message="Room added successfully" />}
        <h2>Add Room</h2>
        <input type="text" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Amenity" value={amenity} onChange={(e) => setAmenity(e.target.value)} />
        <input type="text" placeholder="Floor Size" value={floorsize} onChange={(e) => setFloorsize(e.target.value)} />
        <input type="number" placeholder="Number of Beds" value={noofbeds} onChange={(e) => setNoofbeds(e.target.value)} />
        <input type="number" placeholder="Min Stay" value={minstay} onChange={(e) => setMinstay(e.target.value)} />
        <input type="number" placeholder="Max Stay" value={maxstay} onChange={(e) => setMaxstay(e.target.value)} />
        <input type="number" placeholder="Rent Per Day" value={rentperday} onChange={(e) => setRentperday(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
        <input type="text" placeholder="Image URLs (comma separated)" value={imageurls} onChange={(e) => setImageurls(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button onClick={addRoom}>Add Room</button>
      </div>
    </div>
  );
}

export default Houseownerscreen;
