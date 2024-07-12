import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { NavLink , Link} from 'react-router-dom';

function HouseownerLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function login() {
        const houseowner = { email: email.trim(), password: password.trim() };
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post('/api/houseowners/login', houseowner);
            const result = response.data;
            setLoading(false);
            localStorage.setItem('currentHouseowner', JSON.stringify(result));
            window.location.href = '/houseowner/rooms';
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    return (
        <div className="register-container">
            {loading && <Loader />}
            <div className="register-form">
                
                    {error && <Error message="Invalid Credentials" />}
                    <h2>Login</h2>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.trim())} />
                    <button onClick={login}>Login</button>
                    <p>Don't have an account? <NavLink to="/houseowner/register">Register now</NavLink></p>
                
            </div>
        </div>
    );
}

export default HouseownerLogin;
