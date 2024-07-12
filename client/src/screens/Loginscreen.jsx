import React, { useState } from 'react';
import axios from 'axios';
import './Registerscreen.css';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function Login() {
        const user = { email, password };
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post('/api/users/login', user);
            const result = response.data;
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home';
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    return (
        <div>
            {loading && <Loader />}
            <div className="box">
                <div className="register-box">
                    {error && <Error message="Invalid Credentials" />}
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={Login}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Loginscreen;
