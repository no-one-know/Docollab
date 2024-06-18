import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

export const Navbar = () => {
    return (
        <nav>
            <div className="navbar-left">
                <Link to="/">
                    <img src="../public/AppIcon.svg" alt="Docollab Icon" />
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="/signin">
                    <button>Sign In</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </nav>
    );
};