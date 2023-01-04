import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

async function signupUser(credentials) {
    return fetch("http://127.0.0.1:5000/adduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default function Signup() {
    const navigate = useNavigate();
    function navigateToLogin() {
        navigate("/login");
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [conPassword, setConPassword] = useState();
    const [warning, setWarning] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === conPassword && isValidEmail(email)) {
            const result = await signupUser({
                email,
                password,
            });
            console.log(result);
            setWarning(result.result);
            if (result.result === "Sucessfully Sign Up") {
                setTimeout(() => {
                    navigateToLogin();
                }, 1000);
            }
        } else if (!isValidEmail(email)) {
            setWarning("Invalid Email!");
        } else {
            setWarning("Passwords are not matched!");
        }
    };

    return (
        <div className="signup-wrapper">
            <h1>Please Sign Up</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        className="input-form"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        className="input-form"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input
                        className="input-form"
                        type="password"
                        onChange={(e) => setConPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button className="button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <text className="warning-text">{warning}</text>
            <div>
                <text>Already have an account?</text>
                <button className="loginButton" onClick={navigateToLogin}>
                    Log in
                </button>
            </div>
        </div>
    );
}
