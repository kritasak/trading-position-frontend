import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TradingViewWidget from "../../components/TradingViewWidget";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userData, setUserData] = useState();

    function navigateToSetting() {
        navigate("/setting");
    }

    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
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
            <div className="dashboard-container">
                <div className="left-container">
                    <text>Price Chart</text>
                    <div className="graph-box">
                        <TradingViewWidget />
                    </div>
                </div>

                <div className="right-container">
                    <div className="filter-container">
                        <div className="filter-left-container">
                            <text>Exchange</text>
                            <text>Bitkub</text>
                        </div>
                        <div className="filter-right-container">
                            <text>Currency</text>
                            <text>BTC</text>
                        </div>
                    </div>
                    <h4>Trading History</h4>
                    <table id="customers">
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}
