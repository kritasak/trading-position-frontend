import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
    const onLoadScriptRef = useRef();

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement("script");
                script.id = "tradingview-widget-loading-script";
                script.src = "https://s3.tradingview.com/tv.js";
                script.type = "text/javascript";
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => (onLoadScriptRef.current = null);

        function createWidget() {
            if (document.getElementById("tradingview_f5dff") && "TradingView" in window) {
                new window.TradingView.widget({
                    width: "100%",
                    height: "100%",
                    symbol: "BITKUB:BTCTHB",
                    interval: "D",
                    timezone: "Asia/Bangkok",
                    theme: "light",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_f5dff",
                });
            }
        }
    }, []);

    return (
        <div className="tradingview-widget-container">
            <div id="tradingview_f5dff" />
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/symbols/BTCTHB/?exchange=BITKUB"
                    rel="noreferrer"
                    target="_blank"
                >
                    <span className="blue-text">BTCTHB chart</span>
                </a>{" "}
                by TradingView
            </div>
        </div>
    );
}
