import React from "react";
import { v4 as uuidv4 } from "uuid";
import { FormattedRoute } from "@apollo-api/core";
import { Collapse } from "../Generic/Collapse/Collapse";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { RouteDetails } from "../RouteDetails/RouteDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IRoute {
    route :FormattedRoute
}
export const Route = ({route}:IRoute) => {
    const routeMethodClasses :string[] = [];
    const routeLink :string = `${route.method}${route.path.replaceAll(/\//g, "-").replaceAll(":", "")}`;
    const defaultExpand = location.hash === `#${routeLink}`;
    const isAdminRoute :boolean = route.policies?.includes("isAdmin");
    const isAuthRequired :boolean = route.policies?.includes("isAuthenticated");

    switch (route.method.toLowerCase()) {
        case "get":
            routeMethodClasses.push("bg-success", "text-success-content");
            break;

        case "put":
            routeMethodClasses.push("bg-warning", "text-warning-content");
            break;

        case "post":
            routeMethodClasses.push("bg-info", "text-info-content");
            break;

        case "delete":
            routeMethodClasses.push("bg-error", "text-error-content");
            break;
    }

    const formattedPath = route.path.split("/").map((fragment, i, arr) => {
        let isParam :boolean = false;
        if(fragment.includes(":")) {
            isParam = true;
        }
        const isLast = i+1 == arr.length;
        return <React.Fragment key={uuidv4()}>
            <span className={`${isParam ? "text-accent-focus" : ""}`}>
                {fragment}
            </span>
            {
                !isLast ? <span>/</span> : null
            }
        </React.Fragment>;
    });

    return (
        <div className="row-auto">
            <div className="mx-5 mt-5 bg-base-100 rounded-md text-base-content"
                id={routeLink}
                onClick={e=>{
                    history.pushState(null, "", `#${routeLink}`);
                }}
            >
                <Collapse
                    leftIcon={faSignsPost}
                    headerContent={
                        <div className="text-lg flex items-center">
                            <div className={`mx-2 p-1 px-2 w-20 text-center rounded-md inline-block ${routeMethodClasses.join(" ")}`}>
                                {route.method.toUpperCase()}
                            </div>
                            <div className="rounded-md inline-block bg-base-300 text-base-content p-1 px-2 w-100">{formattedPath}</div>
                            <div className="flex-1 text-right mr-4">
                                {
                                    isAdminRoute ? <FontAwesomeIcon icon={"shield"} className="mx-1" /> :
                                        isAuthRequired ? <FontAwesomeIcon icon={"lock"} className="mx-1" /> :
                                            null
                                }
                            </div>
                        </div>
                    }
                    defaultExpand={defaultExpand}
                >
                    <RouteDetails route={route} />
                </Collapse>
            </div>
        </div>
    );
};
