import React, { useState } from 'react';
import './email.css';

export const Email = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (newEmail === '') {
            setError('Email is required.');
        } else if (!validateEmail(newEmail)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    return (
        <div className="email-container">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};
