import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
    const navigate = useNavigate();
    function navigateToLogin() {
        navigate("/login");
    }
    function navigateToSignup() {
        navigate("/signup");
    }

    return (
        <div className="home-wrapper">
            <h1>Trading Position Management</h1>
            <button onClick={navigateToLogin}>Log In</button>
            <button onClick={navigateToSignup}>Sign Up</button>
        </div>
    );
}
