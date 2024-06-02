import React, { useState } from 'react';
import './signin.css'
import { Oauth } from "./oauth";
import axios from "axios";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");

    const handleEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
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
        if (!isEmailValid(email)) {
            setEmailHelper("Please enter valid email");
            return;
        }
        // request backend to verify the details
        axios.post("/api/verify", { email })
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
            <div className="signinHeading">SignUp</div>
            <div className="signinForm">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleEmail} value={email} required placeholder="example.com" />
                {emailHelper && <p className="error">{emailHelper}</p>}
                <button onClick={handleSubmit}>SignUp</button>
            </div>
            <div className="or-separator">OR</div>
            <div className="oauthsignIn"><Oauth /></div>
        </div>
    )
}
