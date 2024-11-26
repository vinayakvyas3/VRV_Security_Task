import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom'; // Import useHistory hook from React Router
import { useNavigate, Link } from "react-router-dom"
import './Signup.css'; // Import CSS file for styling

function Signup() {
  const history=useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSignIn, setIsSignIn] = useState(false);

    const validate = () => {
        let tempErrors = {};
        tempErrors.username = formData.username ? "" : "Username is required";
        tempErrors.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(formData.email) ? "" : "Email is not valid";
        tempErrors.password = formData.password.length > 6 ? "" : "Password must be at least 7 characters long";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                if (isSignIn) {
                    // Handle signin logic
                    // Assuming signin endpoint is http://localhost:5000/signin
                    const response = await axios.post('http://localhost:5000/signin', formData);
                    console.log('Success:', response);
                    alert('Login Successful!');
                    setFormData({ username: '', email: '', password: '' });
                } else {
                    // Handle signup logic
                    const response = await axios.post('http://localhost:5000/signup', formData);
                    console.log('Success:', response);
                    alert('Signup Successful!');
                    setFormData({ username: '', email: '', password: '' });
                    history("/signin");
                    // Redirect to /signin
                    // history.push('/signin');
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    };

    return (
        <div className="signup-container">
          <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                {!isSignIn && (
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'input-error' : 'input'}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}

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
                    </div>
                )}

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

                <button type="submit" className="submit-button">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
            </form>
            <p color='blue' className="toggle-signin" onClick={() =>   history("/signin")}>
                {'Already have an account? Sign in here'}
            </p>
        </div>
    );
}

export default Signup;
