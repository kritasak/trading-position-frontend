import React from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function Signup() {
    const navigate = useNavigate();
    function navigateToLogin() {
        navigate("/login");
    }

    return (
        <div className="signup-wrapper">
            <h1>Please Sign Up</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit" onClick={navigateToLogin}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
