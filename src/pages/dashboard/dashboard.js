import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    function navigateToSetting() {
        navigate("/setting");
    }
    function navigateToHome() {
        navigate("/");
    }
    return (
        <div>
            <div className="dashboard-wrapper">
                <h1>Dashboard</h1>
            </div>

            <div className="dashboardthree-wrapper"></div>
            <p>Account:</p>

            <div className="dashboardtwo-wrapper">
                <button onClick={navigateToSetting}>Setting</button>
                <button onClick={navigateToHome}>Log Out</button>
            </div>
        </div>
    );
}
