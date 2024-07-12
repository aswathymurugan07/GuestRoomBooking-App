import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import './HouseownerRegister.css'; 

function HouseownerRegister() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

    async function register() {
        if (password === cpassword) {
            const houseowner = {
                name: name.trim(),
                email: email.trim(),
                phone,
                password: password.trim()
            };
            try {
                setloading(true);
                await axios.post('/api/houseowners/register', houseowner);
                setloading(false);
                setsuccess(true);
                setname('');
                setemail('');
                setphone('');
                setpassword('');
                setcpassword('');
                window.location.href = '/houseowner/login';
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true);
            }
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div className="register-container">
            {loading && <Loader />}
            {error && <Error />}
            <div className="register-form">
                {success && <Success message="Houseowner Registration successful" />}
                <h2>Register</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value.trim())} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value.trim())} />
                <input type="text" placeholder="Contact" value={phone} onChange={(e) => setphone(e.target.value.trim())} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value.trim())} />
                <input type="password" placeholder="Confirm password" value={cpassword} onChange={(e) => setcpassword(e.target.value.trim())} />
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default HouseownerRegister;
