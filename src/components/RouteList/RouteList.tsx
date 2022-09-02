import React, { } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormattedRoute } from "@apollo-api/core";
import { Route } from "../Route/Route";

interface IRouteList {
    routes :FormattedRoute[]
}
export const RouteList = ({routes}:IRouteList) => {
    return (
        <div className="mt-5 mb-2 ml-2 mr-2 pb-3">
            {
                routes.map(route => <Route key={uuidv4()} route={route} />)
            }
        </div>
    );
};
