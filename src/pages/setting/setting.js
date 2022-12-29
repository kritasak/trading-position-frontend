import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./setting.css";

export default function Setting() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();

    function navigateToDashboard() {
        navigate("/dashboard");
    }

    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        setUserEmail(sessionStorage.getItem("email"));
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
        </div>
    );
}
