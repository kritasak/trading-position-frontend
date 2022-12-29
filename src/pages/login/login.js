import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";

async function loginUser(credentials) {
    return fetch("http://127.0.0.1:5000/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

async function checkLogin(credentials) {
    return fetch("http://127.0.0.1:5000/getinfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [warning, setWarning] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await checkLogin({
            email,
            password,
        });
        console.log(result.result);
        if (result.result === "Successfully Log In") {
            const token = await loginUser({
                email,
                password,
            });
            console.log(token);
            setToken(token);
            sessionStorage.setItem("email", email);
        } else {
            setWarning(result.result);
        }
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
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
                <div>
                    <button className="button" type="submit">
                        Submit
                    </button>
                </div>
                <h4>{warning}</h4>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
