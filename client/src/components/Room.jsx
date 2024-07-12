import React from 'react';
import { Link } from 'react-router-dom';

function Room({ room, fromdate, todate }) {
    return (
        <div className="product-card">
            <img src={room.imageurls[0]} alt={room.name} />
            <div className="title">{room.name}</div>
            <div className="amenity">{room.amenity}</div>
            <div className="description">{room.description}</div>
            <div className="price">Rent: Rs {room.rentperday}</div>
            <div className="contact">Contact: {room.phonenumber}</div>
            <div className="buttons-container">
                <Link to={`/room/${room._id}/${fromdate}/${todate}`} className="add-to-cart-button">
                    View
                </Link>
                {room.isAvailable || (!fromdate && !todate) ? (
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`} className="buy-now-button">
                        Book Now
                    </Link>
                ) : null}
            </div>
        </div>
    );
}

export default Room;
