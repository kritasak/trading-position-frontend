import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    function navigateToSetting() {
        navigate("/setting");
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={navigateToSetting}>Setting</button>
        </div>
    );
}
