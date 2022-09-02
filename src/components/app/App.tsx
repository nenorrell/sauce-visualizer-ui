import React, { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TopSection } from "../TopSection/TopSection";
import { FormattedRoute, RouteGrouping } from "@apollo-api/core";
import { VisualizerConfig } from "../../@types/VisualizerConfig";
import { ConfigContext } from "../../modules/ConfigContext";
import { RouteGroup } from "../RouteGroup/RouteGroup";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const categorizeRoutes = (appRoutes :VisualizerConfig["appRoutes"]):RouteGrouping[] => {
    const ungroupedRoutes: RouteGrouping = {
        tag: "Untagged Routes",
        routes: []
    };
    let groupedRoutes: RouteGrouping[] = [];

    appRoutes.forEach((item) => {
        if ((item as RouteGrouping).tag) {
            item = item as RouteGrouping;
            item.tag?.toLowerCase() === "authentication" ?
                groupedRoutes = [item, ...groupedRoutes] :
                groupedRoutes.push(item);
        }
        else {
            ungroupedRoutes.routes.push(item as FormattedRoute);
        }
    });
    return [...groupedRoutes, ungroupedRoutes];
};


export const App = () => {
    const {appRoutes} = useContext<VisualizerConfig>(ConfigContext);
    const routeGroups = categorizeRoutes(appRoutes);
    useEffect(()=>{
        document.getElementById(`${location.hash.replace("#", "")}`)?.scrollIntoView();
    });

    return (
        <div className="mb-2">
            <TopSection />
            {
                routeGroups.length ? routeGroups.map(routeGroup =>
                    <RouteGroup group={routeGroup} key={uuidv4()} />
                ) : null
            }
        </div>
    );
};
