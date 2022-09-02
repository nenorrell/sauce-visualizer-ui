import { FormattedRouteParam } from "@apollo-api/core";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface ITable {
    headerColumns :Array<keyof FormattedRouteParam>
    headerClasses ?:string[]
    params :FormattedRouteParam[]
}
export function Table({headerClasses, headerColumns, params} :ITable) {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    { headerColumns.map(field =>
                        <th key={uuidv4()} className={`${headerClasses?.length ? headerClasses.join(" ") : null}`}>
                            {field}
                        </th>
                    )}
                </tr>
            </thead>

            <tbody>
                {
                    params.map(item =>(
                        <tr key={uuidv4()}>
                            {
                                headerColumns.map((column, i) => (
                                    column =="description" && item.enumValues ?
                                        <td key={uuidv4()}>
                                            <div>
                                                <p>{item[column]?.toString()}</p>
                                                <ul className="list-disc">
                                                    <div className="mt-3 mb-2">
                                                        <span className="bg-accent text-accent-content p-1 px-2 rounded">
                                                        Possible Values
                                                        </span>
                                                    </div>
                                                    {
                                                        item.enumValues.map(item => <li key={uuidv4()} className="ml-4">
                                                            {item.toString()}
                                                        </li>)}
                                                </ul>
                                            </div>
                                        </td> :
                                        <td key={uuidv4()}>{item[column]?.toString()}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};
