import React, { useState } from 'react';
import { Email } from './Email';
import { Password } from './Password';
import { ConfirmPassword } from './ConfirmPassword';

export const SetPassword = () => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    return (
        <div className="setpassword-container">
            <Password onPasswordChange={handlePasswordChange} />
            <ConfirmPassword password={password} />
        </div>
    );
};
