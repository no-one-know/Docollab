import React from 'react';
import {Navbar} from './navbar';
import "./home.css"

export const Home=()=>{
    return (
        <div>
            <Navbar />
            <section>
                <h2>Welcome to Docollab!</h2>
                <p>Docollab is a collaborative document editing platform that allows multiple users to work together on the same document in real-time.</p>
                <p>With Docollab, you can easily share and collaborate on documents with your team, making it a breeze to work together and stay organized.</p>
            </section>
        </div>
    );
}