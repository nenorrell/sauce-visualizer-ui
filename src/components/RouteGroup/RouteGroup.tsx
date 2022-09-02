import React from "react";
import { RouteGrouping } from "@apollo-api/core";
import { Collapse } from "../Generic/Collapse/Collapse";
import { RouteList } from "../RouteList/RouteList";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface IRouteGroup {
    group :RouteGrouping
}
export const RouteGroup = ({group}:IRouteGroup) => {
    return (
        <div className="row-auto">
            <div className="mx-5 my-5 bg-neutral rounded-lg text-neutral-content">
                <Collapse
                    defaultExpand={true}
                    headerContent={group.tag || ""}
                    headerClasses={["text-xl", "font-medium", "bg-primary", "text-primary-content"]}
                    leftIcon={faLayerGroup}
                >
                    <div className="h-100%">
                        <RouteList routes={group.routes} />
                    </div>
                </Collapse>
            </div>
        </div>
    );
};
