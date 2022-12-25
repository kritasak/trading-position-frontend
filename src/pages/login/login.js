import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();
    function navigateToDashboard() {
        navigate("/dashboard");
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit" onClick={navigateToDashboard}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
