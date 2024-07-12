import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }
    return (
        <header>
            <div className='navbar'>
                <div className='nav-logo'>
                    {/* <img src={logoImage} alt="Room Stay Logo" /> Use the imported image */}
                    <p>HOME STAY</p>
                </div>
                <ul className='nav-menu'>
              
                    <li><Link style={{ textDecoration: 'none' }} to='/about'>About</Link></li>
                    {user ? (
                        <>
                            <li><Link style={{ textDecoration: 'none' }} to='/home'>Rooms</Link></li>
                            <li><Link style={{ textDecoration: 'none' }} to='/contact'>Contact</Link></li>
                            <div className="dropdown">
                                <button className="dropbtn">
                                    <i class="fa fa-user"></i> {user.name} 
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/bookings">Bookings</Link>
                                    <Link to="#" onClick={logout}>Logout</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <li><Link style={{ textDecoration: 'none' }} to='/register'>Register</Link></li>
                            <li><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></li>

                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
