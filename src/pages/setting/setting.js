import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./setting.css";

export default function Setting() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userData, setUserData] = useState();
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);

    const [editedKey, setEditedKey] = useState("");

    const oldPassword = useRef();
    const newPassword = useRef();
    const publicKey = useRef();
    const secretKey = useRef();

    function navigateToDashboard() {
        navigate("/dashboard");
    }

    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
    }

    async function changepassword(oldPassword, newPassword) {
        if (oldPassword === userData["password"]) {
            await fetch("http://127.0.0.1:5000/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userData["email"],
                    old: oldPassword,
                    new: newPassword,
                }),
            })
                .then((response) => response.json())
                .then((data) => setUserData(data));
            setIsCorrect(true);
            setIsPasswordChange(false);
        } else {
            setIsCorrect(false);
        }
    }

    function openEdit(key) {
        setEditedKey(key);
    }

    async function closeEdit(key, publicKey, secretKey) {
        await fetch("http://127.0.0.1:5000/editapi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userData["email"],
                exchange: key,
                publicKey: publicKey,
                secretKey: secretKey,
            }),
        })
            .then((response) => response.json())
            .then((data) => setUserData(data));
        setEditedKey("");
    }

    useEffect(() => {
        setUserEmail(sessionStorage.getItem("email"));
        console.log("useEffect is call");
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/getinfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sessionStorage.getItem("email") }),
        })
            .then((response) => response.json())
            .then((data) => setUserData(data));
    }, []);

    return (
        <div>
            <div className="setting-topper">
                <p>Account: {userEmail}</p>

                <div>
                    <button className="button-top" onClick={navigateToDashboard}>
                        Dashboard
                    </button>
                    <button className="button-top" onClick={clearStorage}>
                        Log Out
                    </button>
                </div>
            </div>
            {userData ? (
                <div className="container">
                    <div className="user-info">
                        <text>User: {userData["email"]}</text>
                        <div className="top-space">
                            <text className="right-space">Password: {userData["password"]}</text>
                            {!isPasswordChange ? (
                                <button
                                    onClick={() => {
                                        setIsPasswordChange(true);
                                    }}
                                >
                                    Change Password
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                        {isPasswordChange ? (
                            <div className="password-change">
                                <div className="right-space">
                                    <text>Old Password: </text>
                                    <input ref={oldPassword} />
                                </div>
                                <div className="right-space">
                                    <text>New Password: </text>
                                    <input ref={newPassword} />
                                </div>
                                <button
                                    onClick={() => {
                                        changepassword(
                                            oldPassword.current.value,
                                            newPassword.current.value,
                                        );
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => {
                                        setIsPasswordChange(false);
                                        setIsCorrect(true);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                        {!isCorrect ? (
                            <div className="top-space">
                                <text>Mismatched Old Password!</text>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        <text className="seperator">Add Exchanges & API KEY</text>
                        <button>Add</button>
                    </div>
                    {Object.entries(userData["api"]).map(([key, value]) => (
                        <div className="api-info">
                            <text>{key}</text>
                            <div>
                                <text>Public API KEY: </text>
                                {!(editedKey === key) ? (
                                    <text>{value["API_KEY"]}</text>
                                ) : (
                                    <input defaultValue={value["API_KEY"]} ref={publicKey} />
                                )}
                            </div>
                            <div>
                                <text>Secret API KEY: </text>
                                {!(editedKey === key) ? (
                                    <text>{value["API_SECRET"]}</text>
                                ) : (
                                    <input defaultValue={value["API_SECRET"]} ref={secretKey} />
                                )}
                            </div>
                            <div>
                                {!(editedKey === key) ? (
                                    <div>
                                        <button
                                            onClick={() => {
                                                openEdit(key);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button>Delete</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            closeEdit(
                                                editedKey,
                                                publicKey.current.value,
                                                secretKey.current.value,
                                            );
                                        }}
                                    >
                                        Confirm
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
