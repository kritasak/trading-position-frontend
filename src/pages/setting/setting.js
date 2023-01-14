import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./setting.css";
import {
    BsPersonCircle,
    BsFillPlusCircleFill,
    BsFillTrashFill,
    BsFillPenFill,
    BsCheckLg,
    BsXLg,
} from "react-icons/bs";

export default function Setting() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userData, setUserData] = useState();
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);

    const [isAdd, setIsAdd] = useState(false);
    const [editedKey, setEditedKey] = useState("");
    const [isAddBlank, setIsAddBlank] = useState(false);
    const [isEditBlank, setIsEditBlank] = useState(false);

    const oldPassword = useRef();
    const newPassword = useRef();
    const addedExchange = useRef();
    const addedPublicKey = useRef();
    const addedSecretKey = useRef();
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

    async function confirmAdd(exchange, publicKey, secretKey) {
        if (exchange === "" || publicKey === "" || secretKey === "") {
            setIsAddBlank(true);
        } else {
            await fetch("http://127.0.0.1:5000/addapi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userData["email"],
                    exchange: exchange,
                    publicKey: publicKey,
                    secretKey: secretKey,
                }),
            })
                .then((response) => response.json())
                .then((data) => setUserData(data));
            setIsAdd(false);
            setIsAddBlank(false);
        }
    }

    async function confirmEdit(key, publicKey, secretKey) {
        if (publicKey === "" || secretKey === "") {
            setIsEditBlank(true);
        } else {
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
            setIsEditBlank(false);
        }
    }

    async function deleteKey(key) {
        await fetch("http://127.0.0.1:5000/deleteapi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userData["email"],
                exchange: key,
            }),
        })
            .then((response) => response.json())
            .then((data) => setUserData(data));
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
                <div className="account-topper">
                    <BsPersonCircle className="person-icon" />
                    <text>Account: {userEmail}</text>
                </div>
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
                            <text>Password: </text>
                            <text className="hide-password">{userData["password"]}</text>
                            {!isPasswordChange ? (
                                <text
                                    className="password-change-button"
                                    onClick={() => {
                                        setIsPasswordChange(true);
                                    }}
                                >
                                    Change Password
                                </text>
                            ) : (
                                <></>
                            )}
                        </div>
                        {isPasswordChange ? (
                            <div className="password-change-tab">
                                <div className="right-space">
                                    <text>Old Password: </text>
                                    <input ref={oldPassword} />
                                </div>
                                <div className="right-space">
                                    <text>New Password: </text>
                                    <input ref={newPassword} />
                                </div>
                                <BsCheckLg
                                    className="confirm-icon"
                                    onClick={() => {
                                        changepassword(
                                            oldPassword.current.value,
                                            newPassword.current.value,
                                        );
                                    }}
                                />
                                <BsXLg
                                    className="cancel-icon"
                                    onClick={() => {
                                        setIsPasswordChange(false);
                                        setIsCorrect(true);
                                    }}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        {!isCorrect ? (
                            <div className="top-space">
                                <text className="warning-text">Mismatched Old Password!</text>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="seperator">
                        <text className="topic-seperator">Add Exchanges & API KEY</text>
                        <BsFillPlusCircleFill
                            className="add-icon"
                            onClick={() => {
                                setIsAdd(true);
                            }}
                        />
                    </div>
                    {isAdd ? (
                        <div>
                            <div className="api-list">
                                <div>
                                    <text>Exchange: </text>
                                    <input ref={addedExchange} />
                                </div>
                                <div>
                                    <text>Public API KEY: </text>
                                    <input ref={addedPublicKey} />
                                </div>
                                <div>
                                    <text>Secret API KEY: </text>
                                    <input ref={addedSecretKey} />
                                </div>
                                <div>
                                    <BsCheckLg
                                        className="confirm-icon"
                                        onClick={() => {
                                            confirmAdd(
                                                addedExchange.current.value,
                                                addedPublicKey.current.value,
                                                addedSecretKey.current.value,
                                            );
                                        }}
                                    />
                                    <BsXLg
                                        className="cancel-icon"
                                        onClick={() => {
                                            setIsAdd(false);
                                            setIsAddBlank(false);
                                        }}
                                    />
                                </div>
                            </div>
                            {isAddBlank ? (
                                <text className="warning-text">Please fill in the blank!</text>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                    {Object.entries(userData["api"]).map(([key, value]) => (
                        <div>
                            <div className="api-list">
                                <text className="api-exchange">{key}</text>
                                <div className="api-key">
                                    <div className="api-each-key">
                                        <text>Public API KEY: </text>
                                        {!(editedKey === key) ? (
                                            <text>{value["API_KEY"]}</text>
                                        ) : (
                                            <input
                                                defaultValue={value["API_KEY"]}
                                                ref={publicKey}
                                            />
                                        )}
                                    </div>
                                    <div className="api-each-key">
                                        <text>Secret API KEY: </text>
                                        {!(editedKey === key) ? (
                                            <text>{value["API_SECRET"]}</text>
                                        ) : (
                                            <input
                                                defaultValue={value["API_SECRET"]}
                                                ref={secretKey}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="api-button">
                                    {!(editedKey === key) ? (
                                        <div>
                                            <BsFillPenFill
                                                className="edit-icon"
                                                onClick={() => {
                                                    setEditedKey(key);
                                                }}
                                            />
                                            <BsFillTrashFill
                                                className="delete-icon"
                                                onClick={() => {
                                                    deleteKey(key);
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <BsCheckLg
                                                className="confirm-icon"
                                                onClick={() => {
                                                    confirmEdit(
                                                        editedKey,
                                                        publicKey.current.value,
                                                        secretKey.current.value,
                                                    );
                                                }}
                                            />
                                            <BsXLg
                                                className="cancel-icon"
                                                onClick={() => {
                                                    setEditedKey("");
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {editedKey === key && isEditBlank ? (
                                <text className="warning-text">Please fill in the key!</text>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <text>No User Data</text>
                </div>
            )}
        </div>
    );
}
