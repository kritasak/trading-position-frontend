import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Logo from "../../components/logo";

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
            <div className="pic">
                <Logo />
            </div>

            <button className="logInButton" onClick={navigateToLogin}>
                Log In
            </button>
            <button className="signUpButton" onClick={navigateToSignup}>
                Sign Up
            </button>
        </div>
    );
}
