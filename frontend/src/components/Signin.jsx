import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from "react-router-dom";

function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(formData.email) ? "" : "Email is not valid";
        tempErrors.password = formData.password ? "" : "Password is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const authenticateUser = async () => {
        try {
            const users = await axios.get('http://localhost:5000/signin/data');
            return users.data.find(user => user.email === formData.email && user.password === formData.password);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const user = await authenticateUser();
            if (user) {
                console.log('Authentication Successful:', user);
                alert('Login Successful!');
                navigate('/'); // Navigate to homepage or dashboard
            } else {
                console.error('Authentication Failed');
                alert('Invalid email or password');
                setFormData({ email: '', password: '' });
            }
        }
    };

    return (
        <div className="signup-container">
            <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : 'input'}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'input-error' : 'input'}
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <button type="submit" className="submit-button">Sign In</button>
            </form>
            <p className="toggle-signin" onClick={() => navigate("/signup")}>
                {'New user? Sign up here'}
            </p>
        </div>
    );
}

export default Signin;
