import React, { useState } from 'react';
import axios from 'axios'
import './Registerscreen.css'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success'

function RegisterScreen() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password == cpassword) {
            const user = {
                name,
                email,
                phone,
                password,
                cpassword
            }
            try {
                setloading(true);
                const result = await axios.post('/api/users/register', user).data
                setloading(false);
                setsuccess(true);

                setname('')
                setemail('')
                setphone('')
                setpassword('')
                setcpassword('')
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(true);
            }
        }
        else {
            alert("Passwords not matched")
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            
            <div className="box">
                <div className="register-box">
                {success && (<Success message="Registration success" />)}

                    <h2>Register</h2>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                    <input type="text" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type="text" placeholder='Contact' value={phone} onChange={(e) => { setphone(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    <input type="password" placeholder='Confirm password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                    <button onClick={register}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen