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
            <div className="dashboard-topper">
                <p>Account: {userEmail}</p>

                <div>
                    <button className="button-top" onClick={navigateToSetting}>
                        Setting
                    </button>
                    <button className="button-top" onClick={clearStorage}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
