import React, { useState } from 'react';
import './password.css';

export const ConfirmPassword = ({ password }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword === '') {
            setError('Please confirm your password.');
        } else if (newConfirmPassword !== password) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    return (
        <div className="password-container">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleChange}
                className={error ? 'input-error' : ''}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};
