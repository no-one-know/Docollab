import React, { useState } from 'react';
import './signin.css'
import { Oauth } from "./oauth";
import axios from "axios";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailHelper, setEmailHelper] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");

    const handleEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email.length === 0) {
            setEmailHelper("Please enter email");
            return;
        }
        if (password.length === 0) {
            setPasswordHelper("Please enter password");
            return;
        }
        if (!isEmailValid(email)) {
            setEmailHelper("Please enter valid email");
            return;
        }
        // request backend to verify the details
        axios.post("/api/verify", { email, password })
            .then(response => {
                console.log(response.data);
                // handle successful response
            })
            .catch(error => {
                console.error(error);
                // handle error response
            });
    }

    return (
        <div className="signin">
            <div className="signinHeading">SignIn</div>
            <div className="signinForm">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleEmail} value={email} required placeholder="example.com" />
                {emailHelper && <p className="error">{emailHelper}</p>}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handlePassword} value={password} required placeholder="a@49210fnvncj" />
                {passwordHelper && <p className="error">{passwordHelper}</p>}
                <a href="#" className="forgot-password">Forgot Password</a>
                <button onClick={handleSubmit}>SignIn</button>
            </div>
            <div className="or-separator">OR</div>
            <div className="oauthsignIn"><Oauth /></div>
        </div>
    )
}
