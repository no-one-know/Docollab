import React, { useState, useEffect } from 'react';
import './password.css';

export const Password = ({ onPasswordChange }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        onPasswordChange(password);
    }, [password, onPasswordChange]);

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword === '') {
            setError('Password is required.');
        } else if (!validatePassword(newPassword)) {
            setError('Password must be at least 8 characters long.');
        } else {
            setError('');
        }
    };

    return (
        <div className="password-container">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};
