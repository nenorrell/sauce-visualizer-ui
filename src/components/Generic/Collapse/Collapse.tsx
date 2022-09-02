import React, { PropsWithChildren, ReactNode, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ICollapse {
    defaultExpand ?:boolean
    headerContent :string | ReactNode
    headerClasses ?:string[]
    leftIcon ?:IconDefinition
}
export const Collapse = (props :PropsWithChildren<ICollapse>) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(props.defaultExpand || false);
    return (
        <div className="w-100">
            <div className={`collapse-title cursor-pointer flex items-center justify-center
                ${props.headerClasses?.join(" ") || ""}`
            }
            onClick={()=> setIsExpanded(!isExpanded) }>
                {
                    props.leftIcon ? <FontAwesomeIcon icon={props.leftIcon} className="mr-2" /> : null
                }
                <div className="w-full">{props.headerContent}</div>
                <p className={`items-end transition ease-in-out ${isExpanded ? "" : "-rotate-90"}`}>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </p>
            </div>
            <div
                className={`ease-linear duration-[1000ms] transition-[height] overflow-hidden 
                    ${isExpanded ? "h-fit" : "h-0"}
                `}
            >
                {props.children}
            </div>
        </div>
    );
};
