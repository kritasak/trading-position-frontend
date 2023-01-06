import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TradingViewWidget from "../../components/TradingViewWidget";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userData, setUserData] = useState();
    const [currency, setCurrency] = useState("BTC");
    const [symbol, setSymbol] = useState([]);
    const [historyData, setHistoryData] = useState();

    function navigateToSetting() {
        navigate("/setting");
    }

    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
    }

    function handleChange(event) {
        console.log(event.target.value);
        getHistory(event.target.value);
        setCurrency(event.target.value.substring(4));
    }

    async function getHistory(sym) {
        await fetch("http://127.0.0.1:5000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userData["email"], exchange: "bitkub", sym: sym }),
        })
            .then((response) => response.json())
            .then((data) => setHistoryData(data));
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
        fetch("http://127.0.0.1:5000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.getItem("email"),
                exchange: "bitkub",
                sym: "THB_BTC",
            }),
        })
            .then((response) => response.json())
            .then((data) => setHistoryData(data));
    }, []);

    useEffect(() => {
        fetch("https://api.bitkub.com/api/market/symbols")
            .then((response) => response.json())
            .then((data) => setSymbol(data["result"]));
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
                            <select onChange={handleChange}>
                                {symbol.map((sym, index) => (
                                    <option key={index} value={sym["symbol"]}>
                                        {sym["symbol"].substring(4)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <h4>Trading History</h4>
                    <table id="customers">
                        <tr>
                            <th>Time</th>
                            <th>Buy/Sell</th>
                            <th>Price per Coin</th>
                            <th>Amount</th>
                            <th>Amount THB</th>
                        </tr>
                        {historyData && historyData.length !== 0 ? (
                            historyData.map((oneData, index) => (
                                <tr key={index}>
                                    <td>{oneData["date"]}</td>
                                    <td>
                                        {oneData["side"]}, {oneData["type"]}
                                    </td>
                                    <td>{oneData["rate"]} THB</td>
                                    <td>
                                        {oneData["amount"]} {currency}
                                    </td>
                                    <td>
                                        {(
                                            parseFloat(oneData["rate"]) *
                                            parseFloat(oneData["amount"])
                                        ).toFixed(4)}{" "}
                                        THB
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </table>
                    {!historyData || historyData.length === 0 ? (
                        <text className="no-data">No History Data!</text>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}
