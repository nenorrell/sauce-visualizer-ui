import React from "react";
import { FormattedRoute, FormattedRouteParam } from "@sauce-api/core";
import { Table } from "../Generic/Table/Table";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
SyntaxHighlighter.registerLanguage("json", json);
import "./RouteDetails.scss";
import { ObjectOfAnything } from "@sauce-api/core/dist/resources/Common";

interface IRouteDetails {
    route :FormattedRoute
}

function processBodySchema(schema :FormattedRoute["bodySchema"]) {
    if(Array.isArray(schema)) {
        return schema.map((item :any) => processBodySchemaItem(item));
    }
    return processBodySchemaItem(schema as any);
}

function processBodySchemaItem(schema :any) {
    const formattedObj :ObjectOfAnything = {};
    Object.keys(schema).forEach((key :any)=>{
        let formattedValue;
        switch(schema[key].type) {
            case "string":
                formattedValue = "string";
                break;

            case "number":
                formattedValue = 0;
                break;

            case "array":
                formattedValue = [];
                break;

            case "obj":
                formattedValue = {};
                break;

            case "boolean":
                formattedValue = true;
                break;
        }

        formattedObj[key] = formattedValue;
    });
    return formattedObj;
}

export const RouteDetails = ({route}:IRouteDetails) => {
    const tableColumns :Array<keyof FormattedRouteParam> = ["name", "type", "description", "required"];
    const bodySchema = route.bodySchema ? processBodySchema(route.bodySchema) : null;
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
                bodySchema ?
                    <div className="px-5 pt-2 pb-4">
                        <div className="rounded-md inline-block bg-neutral text-neutral-content p-1 px-2 mb-3">
                            Request Payload
                        </div>
                        <div className="overflow-x-auto">
                            <SyntaxHighlighter
                                language="json"
                                className="bg-neutral text-neutral-content w-1/2 p-3 rounded-md overflow-x-auto"
                                useInlineStyles={false}
                            >
                                {JSON.stringify(bodySchema, null, 2)}
                            </SyntaxHighlighter>
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
