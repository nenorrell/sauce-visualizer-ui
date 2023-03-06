import React from "react";
import { RouteGrouping } from "@sauce-api/core";
import { Collapse, CollapseBody, CollapseTitle } from "daisy-ui-react-components";
import { RouteList } from "../RouteList/RouteList";
import { faChevronDown, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IRouteGroup {
    group :RouteGrouping
}
export const RouteGroup = ({group}:IRouteGroup) => {
    return (
        <div className="row-auto">
            <div className="mx-5 my-5 bg-neutral rounded-lg text-neutral-content">
                <Collapse
                    parentCollapse={true}
                    defaultExpand={true}
                >
                    <CollapseTitle
                        className="text-xl bg-primary text-primary-content"
                        RightIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faLayerGroup} />
                        <h2 className="w-full">{group.tag || ""}</h2>
                    </CollapseTitle>
                    <CollapseBody>
                        <div className="h-100%">
                            <RouteList routes={group.routes} />
                        </div>
                    </CollapseBody>
                </Collapse>
            </div>
        </div>
    );
};
