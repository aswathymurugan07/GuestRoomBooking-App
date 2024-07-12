import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './HouseownerNavbar.css';

const HouseownerNavbar = () => {
  const houseowner = JSON.parse(localStorage.getItem('currentHouseowner'));
  
  function logout() {
    localStorage.removeItem('currentHouseowner');
    window.location.href = '/houseowner/login';
  }

  return (
    <nav className="houseowner-navbar">
      <ul>
        {houseowner ? (
          <>
            <li>
              <NavLink to="/houseowner/rooms" activeClassName="active">Add Room</NavLink>
            </li>
            <li>
              <NavLink to="/houseowner/roomdetails" activeClassName="active">Room Details</NavLink>
            </li>
            <div className="dropdown">
              <button className="dropbtn">
                <i className="fa fa-user"></i> {houseowner.name}
              </button>
              <div className="dropdown-content">
                <Link to="#" onClick={logout}>Logout</Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/houseowner/register" activeClassName="active">Register</NavLink>
            </li>
            <li>
              <NavLink to="/houseowner/login" activeClassName="active">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default HouseownerNavbar;
