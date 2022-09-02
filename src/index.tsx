import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import "./global-styles/tailwind.scss";
import { ConfigProvider } from "./modules/ConfigContext";
import { VisualizerConfig } from "./@types/VisualizerConfig";
import { devConfig } from "./DevConfig";

const renderApp = async () => {
    try {
        let config :VisualizerConfig = (window as any).visualizerConfig;
        if (!config && process.env.NODE_ENV == "development") {
            config = await devConfig();
        }

        const root = ReactDOM.createRoot(
            document.getElementById("root") as HTMLElement
        );

        return root.render(
            <React.StrictMode>
                <ConfigProvider {...config}>
                    <App />
                </ConfigProvider>
            </React.StrictMode>
        );
    }
    catch(err) {
        throw err;
    }
};

renderApp()
    .then(()=>{
        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();
    })
    .catch(err => {
        throw err;
    });
