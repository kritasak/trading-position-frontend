import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();

    function navigateToSetting() {
        navigate("/setting");
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
            <div className="dashboard-wrapper">
                <h1>Dashboard</h1>
            </div>

            <div className="dashboardtwo-wrapper">
                <p>Account: {userEmail}</p>

                <div>
                    <button onClick={navigateToSetting}>Setting</button>
                    <button onClick={clearStorage}>Log Out</button>
                </div>
            </div>
        </div>
    );
}
