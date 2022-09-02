import React from "react";
import { FormattedRoute, FormattedRouteParam } from "@apollo-api/core";
import { Table } from "../Generic/Table/Table";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import "./RouteDetails.scss";

interface IRouteDetails {
    route :FormattedRoute
}
export const RouteDetails = ({route}:IRouteDetails) => {
    const tableColumns :Array<keyof FormattedRouteParam> = ["name", "type", "description", "required"];
    return (
        <div className="bg-base-300 rounded-b-md">
            <div className="px-5 pt-2 pb-3">
                <p className="text-lg">{route.description}</p>
            </div>
            {
                route.pathParams ?
                    <div className="px-5 pt-2 pb-3">
                        <div className="rounded-md inline-block bg-neutral text-neutral-content p-1 px-2 mb-3">
                            Route Params
                        </div>
                        <div className="overflow-x-auto">
                            <Table
                                headerColumns={tableColumns}
                                headerClasses={["bg-neutral", "text-neutral-content"]}
                                params={route.pathParams}
                            />
                        </div>
                    </div> :
                    null
            }
            {
                route.queryParams ?
                    <div className="px-5 pt-2 pb-3">
                        <div className="rounded-md inline-block bg-neutral text-neutral-content p-1 px-2 mb-3">
                            Query Params
                        </div>
                        <div className="overflow-x-auto">
                            <Table
                                headerColumns={tableColumns}
                                headerClasses={["bg-neutral", "text-neutral-content"]}
                                params={route.queryParams}
                            />
                        </div>
                    </div> :
                    null
            }
            {
                route.exampleResponse ?
                    <div className="px-5 pt-2 pb-4">
                        <div className="rounded-md inline-block bg-neutral text-neutral-content p-1 px-2 mb-3">
                            Example Response
                        </div>
                        <div className="overflow-x-auto">
                            <SyntaxHighlighter
                                language="json"
                                className="bg-neutral text-neutral-content w-1/2 p-3 rounded-md overflow-x-auto"
                                useInlineStyles={false}
                            >
                                {JSON.stringify(route.exampleResponse, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    </div> :
                    null
            }
        </div>
    );
};
