import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TradingViewWidget from "../../components/TradingViewWidget";
import { BsPersonCircle } from "react-icons/bs";
import { bitkubSymbols, binanceSymbols } from "../../data/data";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState();
    const [userData, setUserData] = useState();
    const [exchange, setExchange] = useState("bitkub");
    const [currency, setCurrency] = useState({
        symbol: "THB_BTC",
        baseAsset: "BTC",
        quoteAsset: "THB",
    });
    const [historyData, setHistoryData] = useState();
    const [balanceData, setBalanceData] = useState();

    function navigateToSetting() {
        navigate("/setting");
    }

    function clearStorage() {
        sessionStorage.clear();
        window.location.reload();
    }

    function exchangeHandleChange(event) {
        console.log(event.target.value);
        setExchange(event.target.value);
        if (event.target.value === "bitkub") {
            getBalance("bitkub");
            getHistory("bitkub", "THB_BTC");
            setCurrency({ symbol: "THB_BTC", baseAsset: "BTC", quoteAsset: "THB" });
        } else {
            getBalance("binance");
            getHistory("binance", "ETHBTC");
            setCurrency({ symbol: "ETHBTC", baseAsset: "ETH", quoteAsset: "BTC" });
        }
    }

    function symbolHandleChange(event) {
        console.log(JSON.parse(event.target.value));
        getHistory(exchange, JSON.parse(event.target.value)["symbol"]);
        setCurrency(JSON.parse(event.target.value));
    }

    async function getHistory(exchange, sym) {
        await fetch("http://127.0.0.1:5000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userData["email"], exchange: exchange, sym: sym }),
        })
            .then((response) => response.json())
            .then((data) => setHistoryData(data));
    }

    async function getBalance(exchange) {
        await fetch("http://127.0.0.1:5000/balance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userData["email"], exchange: exchange }),
        })
            .then((response) => response.json())
            .then((data) => setBalanceData(data));
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
        fetch("http://127.0.0.1:5000/balance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.getItem("email"),
                exchange: "bitkub",
            }),
        })
            .then((response) => response.json())
            .then((data) => setBalanceData(data));
    }, []);

    // useEffect(() => {
    //     fetch("https://api.bitkub.com/api/market/symbols")
    //         .then((response) => response.json())
    //         .then((data) => setSymbol(data["result"]));
    // }, []);

    return (
        <div>
            <div className="dashboard-topper">
                <div className="account-topper">
                    <BsPersonCircle className="person-icon" />
                    <text>Account: {userEmail}</text>
                </div>
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
                    <h3>Balances</h3>
                    {balanceData && balanceData.length !== 0 ? (
                        <div className="balance-container">
                            {balanceData.map((oneData, index) => (
                                <div key={index} className="balance-row">
                                    <text className="asset-name">{oneData["asset"]}</text>
                                    <text className="asset-amount">
                                        {oneData["free"]} {oneData["asset"]}
                                    </text>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="right-container">
                    <div className="filter-container">
                        <div className="filter-left-container">
                            <text>Exchange</text>
                            <select onChange={exchangeHandleChange}>
                                <option value="bitkub">Bitkub</option>
                                <option value="binance">Binance</option>
                            </select>
                        </div>
                        <div className="filter-right-container">
                            <text>Currency</text>
                            <select onChange={symbolHandleChange}>
                                {exchange === "bitkub"
                                    ? bitkubSymbols.map((symInfo, index) => (
                                          <option key={index} value={JSON.stringify(symInfo)}>
                                              {symInfo["symbol"]}
                                          </option>
                                      ))
                                    : binanceSymbols.map((symInfo, index) => (
                                          <option key={index} value={JSON.stringify(symInfo)}>
                                              {symInfo["symbol"]}
                                          </option>
                                      ))}
                            </select>
                        </div>
                    </div>
                    <h3>Trading History</h3>
                    <table id="customers">
                        <tr>
                            <th>Time</th>
                            <th>Buy/Sell</th>
                            <th>Price per Coin</th>
                            <th>Amount {currency["baseAsset"]}</th>
                            <th>Amount {currency["quoteAsset"]}</th>
                        </tr>
                        {historyData && historyData.length !== 0 ? (
                            historyData.map((oneData, index) => (
                                <>
                                    {oneData["side"] === "buy" ? (
                                        <tr key={index} className="bg-buy-table">
                                            <td>{oneData["date"]}</td>
                                            <td>{oneData["side"]}</td>
                                            <td>
                                                {oneData["price"]} {currency["quoteAsset"]}
                                            </td>
                                            <td>
                                                {oneData["amountBase"]} {currency["baseAsset"]}
                                            </td>
                                            <td>
                                                {oneData["amountQuote"]} {currency["quoteAsset"]}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={index} className="bg-sell-table">
                                            <td>{oneData["date"]}</td>
                                            <td>{oneData["side"]}</td>
                                            <td>
                                                {oneData["price"]} {currency["quoteAsset"]}
                                            </td>
                                            <td>
                                                {oneData["amountBase"]} {currency["baseAsset"]}
                                            </td>
                                            <td>
                                                {oneData["amountQuote"]} {currency["quoteAsset"]}
                                            </td>
                                        </tr>
                                    )}
                                </>
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
