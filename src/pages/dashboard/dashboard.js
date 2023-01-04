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
                            <th>Time</th>
                            <th>Buy/Sell</th>
                            <th>Price per Coin</th>
                            <th>Amount</th>
                            <th>Receive</th>
                        </tr>
                        <tr>
                            <td>2021-01-10 18:56:31</td>
                            <td>Buy</td>
                            <td>1,000,000 THB</td>
                            <td>100,000 THB</td>
                            <td>0.1 BTC</td>
                        </tr>
                        <tr>
                            <td>2021-02-10 12:24:39</td>
                            <td>Sell</td>
                            <td>1,200,000 THB</td>
                            <td>0.0833 BTC</td>
                            <td>100,000 THB</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}
