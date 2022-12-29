import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard(props) {
    const navigate = useNavigate();
    function navigateToSetting() {
        navigate("/setting");
    }
    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <div className="dashboard-wrapper">
                <h1>Dashboard</h1>
            </div>

            <div className="dashboardtwo-wrapper">
                <p>Account: {props.userEmail}</p>

                <div>
                    <button onClick={navigateToSetting}>Setting</button>
                    <button onClick={clearStorage}>Log Out</button>
                </div>
            </div>
        </div>
    );
}
