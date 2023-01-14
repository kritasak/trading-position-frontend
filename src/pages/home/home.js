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
            <div className="pic">
                <img src="https://lh3.googleusercontent.com/xyhqSXZzpngB1xgolCHlmZE42u7Bp847BbBSdpMpwMrFESKAJycVLX5h3ToatOnQzbyU7LGbc-I8k4-zw1XiId0Q_Hmo3E4UetdjAcZPkoyl5szUmUQXD4QYV2ml720oga0RtF3Pnw=w600-h315-p-k" />
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
