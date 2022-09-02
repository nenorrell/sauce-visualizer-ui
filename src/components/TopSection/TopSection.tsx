// eslint-disable-next-line
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { VisualizerConfig } from "../../@types/VisualizerConfig";
import { ConfigContext } from "../../modules/ConfigContext";
import { ThemeSelector } from "./ThemeSelector";

const isApiHealthy = async (url :string) => {
    try {
        const res = await fetch(url);
        return res.status === 200;
    }
    catch (e) {
        return false;
    }
};

export const TopSection = () => {
    const config = useContext<VisualizerConfig>(ConfigContext);
    const [isHealthy, setIsHealthy] = useState<boolean>(false);

    useEffect(()=>{
        if(config.apiBaseUrl && config.apiHealthcheckPath) {
            isApiHealthy(`${config.apiBaseUrl}${config.apiHealthcheckPath}`).then(result => setIsHealthy(result));
        }
    });

    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-none">
                    {
                        config.brandIcon ?
                            <div className="mr-2"><FontAwesomeIcon size="2x" icon={config.brandIcon}/></div> :
                            config.brandImageUrl ?
                                <div className="mr-2">
                                    <img className="h-10" src={config.brandImageUrl} />
                                </div> :
                                null
                    }
                    <p className="normal-case text-xl"><a href="#">{config.appName}</a></p>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <ThemeSelector />
                    </div>
                </div>
            </div>

            <div className="hero min-h-[25vh] bg-base-300 mb-20">
                <div className="hero-content">
                    <div className="max-w">
                        <h1 className="text-5xl font-bold">Welcome to the {config.appName || "API"} documentation</h1>
                        {config.welcomeMessage ? <p className="text-xl mt-2">{config.welcomeMessage}</p> : null}
                        {
                            config.apiBaseUrl && config.apiHealthcheckPath ? (
                                <>
                                    <div className="md:w-fit sm:w-full sm:text-center mt-3 p-3 bg-base-100 rounded-md">
                                        <h2 className="text-3xl inline-block">API Healthcheck:</h2>
                                        <div className={`p-1 ml-2 mr-1 inline-block rounded-full w-5 h-5 ${isHealthy ? "bg-success" : "bg-error"}`}></div>
                                        <h2 className={`text-3xl inline-block ${isHealthy ? "text-success" : "text-error"}`}>
                                            {isHealthy ? "Success" : "Failed"}
                                        </h2>
                                    </div>
                                </>
                            ) :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
