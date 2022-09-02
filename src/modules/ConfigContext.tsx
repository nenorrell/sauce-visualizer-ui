import React from "react";
import { VisualizerConfig } from "../@types/VisualizerConfig";

const configContext :VisualizerConfig = {
    appRoutes: [],
    appName: "Visualizer UI"
};
const ConfigContext = React.createContext<VisualizerConfig>(configContext);

const ConfigProvider = (props :React.PropsWithChildren<VisualizerConfig>) => {
    return (
        <ConfigContext.Provider value={props}>
            {props.children}
        </ConfigContext.Provider>
    );
};

export { ConfigContext, ConfigProvider };
